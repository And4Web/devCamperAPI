const express = require("express");
const {getCourses, getCourse} = require("../controllers/courses");
const router = express.Router({mergeParams: true});

router.route('/').get(getCourses);
router.route('/:courseId').get(getCourse);

module.exports = router;
