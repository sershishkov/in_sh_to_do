const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExerciseInput(data) {
  let errors = {};

  data.name_exercise = !isEmpty(data.name_exercise) ? data.name_exercise : '';
  

  if (!Validator.isLength(data.name_exercise, { min: 5, max: 30 })) {
    errors.name_exercise = 'Name must be between 5 and 30 characters';
  }

  if (Validator.isEmpty(data.name_exercise)) {
    errors.name_exercise = 'Name field is required';
    }
    if (Validator.isEmpty(data.meauserement)) {
      errors.meauserement = 'Meauserement field is required';
      }
  

  return {
    errors,
    isValid: isEmpty(errors)
  };
};