const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const geocoder = require('../utils/geocoder');
const Bootcamp = require("../models/Bootcamp");

//@desc     get all the bootcamps
//@route    GET /api/v1/bootcamps
//@access   public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  // const bootcamps = await Bootcamp.find({}, { __v: 0, _id: 0 });
  let query;
  //copying req.query
  const reqQuery = {...req.query};

  //Fields to exclude
  const removeFields = ['select', 'sort'];
  //loop over removeField and delete field from req.query
  removeFields.forEach(field => delete reqQuery[field]);
  
  //Create query String
  let queryStr = JSON.stringify(req.query);
  //Create operators {$gt, $gte, $lt, $lte, $in}
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
  //Finding resource
  query = Bootcamp.find(JSON.parse(queryStr)).populate('courses')

  //Select Fields
  if(req.query.select){
    const fields = req.query.select.split(',').join(' ');
    // console.log(fields)
    query = query.select(fields);
  }

  //Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  //Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Bootcamp.countDocuments();

  query = query.skip(startIndex).limit(limit);

  //executing query
  const bootcamps = await query;

  //Pagination result
  const pagination = {};

  if(endIndex < total){
    pagination.next = {
      page: page + 1,
      limit
    };
  }
  if(startIndex > 0){
    pagination.previous = {
      page: page - 1,
      limit
    };
  }

  res
    .status(200)
    .json({ success: true, count: bootcamps.length, pagination, data: bootcamps });
});

//@desc     get a single bootcamp
//@route    GET /api/v1/bootcamps/:id
//@access   public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id, { _id: 0, __v: 0 });
    if (!bootcamp) {
      // return res.status(400).json({success: false, error: 'No bootcamp with that id exists.'})
      return next(
        new ErrorResponse(
          `Bootcamp not found with the id of ${req.params.id}`,
          404
        )
      );
    }
    res.status(200).json({ success: true, data: bootcamp });
  } catch (error) {
    // res.status(400).json({success: false, error: error.message});
    // next(new ErrorResponse(`Bootcamp not found with the id of ${req.params.id}`, 404));
    next(error);
  }
};

//@desc     create a new bootcamp
//@route    POST /api/v1/bootcamps
//@access   private
exports.postBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({ success: true, data: bootcamp });
});

//@desc     update a bootcamp
//@route    Put /api/v1/bootcamps/:id
//@access   private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bootcamp) {
    // return res.status(400).json({success: false, error: 'no bootcamp with this id exists.'})
    return next(
      new ErrorResponse(
        `Bootcamp not found with the id of ${req.params.id}`,
        404
      )
    );
  }
  res
    .status(201)
    .json({ success: true, data: bootcamp, changedField: req.body });
});

//@desc     delete a bootcamp
//@route    DELETE /api/v1/bootcamps/:id
//@access   private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    // const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      // return res.status(400).json({success: false, error: 'No bootcamp with that id found in database.'})
      return next(
        new ErrorResponse(
          `Bootcamp not found with the id of ${req.params.id}`,
          404
        )
      );
    }
    bootcamp.remove();

    res.status(200).json({
      success: true,
      data: {},
      message: `Bootcamp with id ${req.params.id} deleted`,
    });
  } catch (error) {
    // res.status(400).json({success: false, error: error.message});
    next(error);
  }
};

//@desc     Get a bootcamp within a radius
//@route    GET /api/v1/bootcamps/radius/:zipcode/:distance
//@access   private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const {zipcode, distance} = req.params;

  const location = await geocoder.geocode(zipcode);

  const lat =  location[0].latitude;
  const long = location[0].longitude;
  
  //Calc radius using the radius of earth
  //Divide the distance by Earth's radius
  //Earth Radius = 3963 Mi or 6378 km
  const radius = distance/3963;

  const bootcamps = await Bootcamp.find({location: {
    $geoWithin: {$centerSphere: [[long, lat], radius]}
  }});

  res.status(200).json({ success: true, count: bootcamps.length,  data: bootcamps });
});