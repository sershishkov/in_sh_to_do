const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ExerciseSchema = new Schema({
  name_exercise: {
    type: String,
    required: true
  },
  meauserement: {
    type: String,
    required: true
  }
});

module.exports = Exercise = mongoose.model('exercises', ExerciseSchema);