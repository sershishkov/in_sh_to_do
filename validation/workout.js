const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateWorkoutInput(data) {
  let errors = {};

  data.exercise_in = !isEmpty(data.exercise_in) ? data.exercise_in : '';
   

  
  if (Validator.isEmpty(data.exercise_in)) {
    errors.exercise_in = 'Exercises fields is required';

    }

   
  

  return {
    errors,
    isValid: isEmpty(errors)
  };
};