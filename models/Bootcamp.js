const mongoose = require('mongoose');
const slugify = require('slugify');
const geoCoder = require('../utils/geocoder');

const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
    trim: true,
    minlength: [10, 'Name must be at least 10 characters long.'],
    maxlength: [50, 'Name can\'t be more than 50 characters.']
  },
  slug: String,
  description: {
    type: String,
    minlength: [100, 'Description must be at least 100 characters long.'],
    maxlength: [1000, 'Description can\'t be more than 500 characters.']
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, 'Please use a valid url.'
    ]
  },
  email: {
    type: String,
    match: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email.'
    ]
  },
  phone:{
    type: String,
    required: [true, 'Phone number is required.'],
    maxlength: [20, 'Phone number must not exceed 20 characters.']
  },
  address: {
    type: String,
    required: [true, 'Address is required.']
  },
  location: {
    //GeoJSON Point
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String
  },
  careers: {
    //Array of strings
    type: [String],
    required: [true, 'Career field is required.'],
    enum: [
      'Web Development',
      'Mobile Development',
      'UI/UX',
      'Data Science',
      'Business',
      'Blockchain Development',
      'Other'
    ]
  },
  averageRating: {
    type: Number,
    min: [1, 'Rating must be at least 1.'],
    max: [10, 'Rating can not exceed 10.']
  },
  averageCost: Number,
  photo: {
    type: String,
    default: 'no-photo.jpg'
  },
  housing:{
    type: Boolean,
    default: false
  },
  jobAssistance: {
    type: Boolean,
    default: false
  },
  jobGuarantee: {
    type: Boolean,
    default: false
  },
  acceptGi: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
})

//Reverse Populate with virtuals
BootcampSchema.virtual('courses', {
  ref: 'Course',
  localField: '_id',
  foreignField: 'bootcamp',
  justOne: false
})

//Create bootcamp slug from the name using mongoose middleware
BootcampSchema.pre('save', function(next){
  this.slug = slugify(this.name, {lower: true}); 
  next();
})

//Geocode and create location field
BootcampSchema.pre('save', async function(next){
  const location = await geoCoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [location[0].longitude, location[0].latitude],
    formattedAddress: location[0].formattedAddress,
    street: location[0].streetName,
    city: location[0].city,
    state: location[0].stateCode,
    zipcode: location[0].zipcode,
    country: location[0].countryCode
  }

  //Do not save address in DB
  this.address = undefined
  next();
})

//Cascade delete courses when a bootcamp is deleted
BootcampSchema.pre('remove', async function(next){
  console.log(`Courses removed from bootcamp ${this._id}`)
  await this.model('Course').deleteMany({bootcamp: this._id});
  next()
})

module.exports = mongoose.model('Bootcamp', BootcampSchema);