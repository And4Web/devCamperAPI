const mongoose = require('mongoose');

const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Name is required'],
    minlenght: [10, 'Name must be at least 10 characters long.'],
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
      required: true
    },
    coordinates: {
      type: [Number],
      required: true,
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
})

module.exports = mongoose.model('Bootcamp', BootcampSchema);