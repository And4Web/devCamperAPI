const express = require("express");
const router = express.Router();

const {
  getBootcamps,
  getBootcamp,
  postBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius
} = require("../controllers/bootcamps");

//include other resource router
const courseRouter = require('./courses');

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

//Re-route into other resource router
router.use('/:bootcampId/courses', courseRouter);

router.route("/").get(getBootcamps).post(postBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
