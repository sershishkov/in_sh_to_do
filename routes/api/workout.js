const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Workout = require('../../models/Workout');

// Validation
const validateWorkoutInput = require('../../validation/workout');

// @route   GET api/workout/test
// @desc    Tests workout route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Workout Works' }));

// @route   GET api/workout
// @desc    GET all workouts
// @access  Private
router.get('/',passport.authenticate('jwt', { session: false }),
  (req, res)=>{    
    Workout.find({user_id:req.user._id}) // Выбираем воркауты только текущего юзера  
      .populate('exercise_in.exercise_ID')//Показываем поля из связанной таблицы "exercises" 

      .then(works =>{
        res.json(works);
      })
  }
);

// @route   GET api/workout
// @desc    GET  workout BY ID
// @access  Private
router.get('/:id',passport.authenticate('jwt', { session: false }),
  (req, res)=>{
    Workout.findById(req.params.id)
      .populate('exercise_in.exercise_ID')//Показываем поля из связанной таблицы "exercises"
      .then(work =>{
        res.json(work);
      })
  }
);

// @route   POST api/workout
// @desc    Create workout 
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }),
(req, res) =>{
  

  const newWorkout = new Workout ({
    data_work:req.body.data_work,
    user_id:req.body.user_id,
    exercise_in:req.body.exercise_in
  });

  newWorkout.save().then(work=>{
    res.json(work);
  }).catch(err => {
    res.json({success:false});
  })
});

// @route   PUT api/workout
// @desc    Update workout 
// @access  Private

router.put('/:id', passport.authenticate('jwt', { session: false }),
  (req, res)=>{

    
    const newWorkout = {
      data_work:req.body.data_work,
      exercise_in:req.body.exercise_in
    };

    Workout.findOneAndUpdate({_id:req.params.id}, { $set: newWorkout }, {new:true})
    .then(work=>{
      res.json(work);
    })
    .catch(err =>{
      res.status(400).json({now_work_found:"Not found the workout with that ID"});
    })
  }
);

// @route   DELETE api/workout
// @desc    DELETE workout 
// @access  Private

router.delete('/:id', passport.authenticate('jwt', { session: false }),
  (req,res)=>{
    Workout.findByIdAndDelete(req.params.id)
      .then(work =>{
        res.json(work);
      })
      .catch(err =>{
        res.status(400).json({now_work_found:"Not found the workout with that ID"});
      })
  }


);







module.exports = router;