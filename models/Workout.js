const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const WorkoutSchema = new Schema({
  data_work:{
    type: Date,
    default: Date.now
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  exercise_in: [
    {
      exercise_ID: {
        type: Schema.Types.ObjectId,
        ref: 'exercises',        
      },
      repeats:{
        type: Number,
        required: true
      },
      quantity:{
        type: Number,
        required: true
      }
    }
  ]
  
});

module.exports = Workout = mongoose.model('workouts', WorkoutSchema);