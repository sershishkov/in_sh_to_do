const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Exercise = require('../../models/Exercise');

// Validation
const validateExerciseInput = require('../../validation/exercise');

// @route   GET api/exercise/test
// @desc    Tests exercise route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Exercise Works' }));

// @route   Exercise api/exercise
// @desc    GET ALL Exercises
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Exercise.find()
      .then(exercises =>{
        res.json(exercises);
      });
  }
  );

// @route   Exercise api/exercise
// @desc    GET  Exercises BY ID
// @access  Private
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Exercise.findById(req.params.id)
      .then(exercise =>{
        res.json(exercise);
      })
      .catch(err => {        
        res.status(400).json({now_exerc_found:"Not found the exercise with that ID"});
      });   
  }
  );


// @route   Exercise api/exercise
// @desc    Create Exercise
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExerciseInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newExercise = new Exercise({
      name_exercise: req.body.name_exercise,
      meauserement: req.body.meauserement      
    });

    newExercise.save().then(exercise => res.json(exercise));
  }
);

// @route   Exercise api/exercise
// @desc    Update Exercise
// @access  Private
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExerciseInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newExercise = {
      name_exercise: req.body.name_exercise,
      meauserement: req.body.meauserement      
    };
    Exercise.findOneAndUpdate({_id:req.params.id}, { $set: newExercise },{new:true})
      .then(exerc =>{
        res.json(exerc);
      })
      .catch(err => {        
        res.status(400).json({now_exerc_found:"Not found the exercise with that ID"});
      });    
  }
);

// @route   DELETE api/exercise/:id
// @desc    Delete exerscise
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors={};
    Exercise.findByIdAndDelete(req.params.id)
      .then(exers=>{
        res.json(exers);
      })
      .catch(err => {
        errors.del_exercise = 'THis exercise not found';
        res.status(400).json(errors);
      });    
  }
);


module.exports = router;

