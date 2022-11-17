const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const Course = require("../models/Course");

//@desc     get all courses
//@route    GET /api/v1/courses
//@route    GET /api/v1/bootcamps/:bootcampId/courses
//@access   public

exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;
  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find().populate({
      path: "bootcamp",
      select: "name description averageCost",
    });
  }
  const courses = await query;

  res.status(200).json({ success: true, count: courses.length, data: courses });
});

//@desc     get a single course
//@route    GET /api/v1/courses/:courseId
//@access   private

exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = Course.findById(req.params.courseId).populate({
    path: 'bootcamp',
    select: 'name description'
  })

  if(!course){
    return next(new ErrorResponse(`No course with the id ${req.params.courseId} found.`, 404))
  }

  res.status(200).json({success: true, data: course});
})