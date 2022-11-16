const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required.']
  },
  description: {
    type: String,
    required: [true, 'Course description is required.'],
    minlength: [100, 'Description must have at least 100 characters.']
  },
  weeks: {
    type: String,
    required: [true, 'Completion period of the course is required.']
  },
  tuition: {
    type: String,
    required: [true, 'Tuition fee is required.']
  },
  minimumSkill: {
    type: String,
    required: [true, 'Minimum skill to learn this course must be provided.'],
    enum: ['beginner', 'intermediate', 'advance']
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Course', CourseSchema );