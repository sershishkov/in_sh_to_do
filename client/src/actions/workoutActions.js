import {
  ADD_ONE_WORKOUT,
  SWAP_WORKOUT_UP,
  SWAP_WORKOUT_DOWN,
  DELETE_WORKOUT,
  GET_ONE_WORKOUT,
  UPDATE_ONE_WORKOUT,
  GET_ERRORS,
  CLEAR_ALL_WORKS,
  ADD_ARRAY_OF_WORKOUTS
} from "../actions/types";

import axios from "axios";

export const createOneWorkout = (workData, history, link) => dispatch => {
  dispatch({
    type: ADD_ONE_WORKOUT,
    payload: workData
  });
  history.push(link);
};

export const addArrayOfWorkouts = arrWorkouts => dispatch => {
  dispatch({
    type: ADD_ARRAY_OF_WORKOUTS,
    payload: arrWorkouts
  });
};

export const clearAllWorkouts = () => dispatch => {
  dispatch({
    type: CLEAR_ALL_WORKS,
    payload: []
  });
};

export const updateOneWorkout = (
  workData,
  works,
  history,
  link
) => dispatch => {
  const arr = works.map(work =>
    work.id_workout === workData.id_workout ? (work = workData) : work
  );
  dispatch({
    type: UPDATE_ONE_WORKOUT,
    payload: arr
  });
  history.push(link);
};

export const getWorkoutById = (id, works) => dispatch => {
  const singleWorkout = works.filter(item => {
    return item.id_workout === id;
  });

  dispatch({
    type: GET_ONE_WORKOUT,
    payload: singleWorkout[0]
  });
};

export const getWorksInTraining = id => dispatch => {
  axios
    .get(`/api/workout/${id}`)
    .then(train => {
      const newArrWork = train.data.exercise_in.map(item => {
        const newItem = {
          id_selected_type: item.exercise_ID,
          id_workout: item._id,
          name_exercise: item.exercise_ID.name_exercise,
          quantity: item.quantity,
          repeats: item.repeats
        };

        return newItem;
      });

      dispatch({
        type: ADD_ARRAY_OF_WORKOUTS,
        payload: newArrWork
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const swapWorkoutUp = (workData, index) => dispatch => {
  const tempArr = workData;
  const temp = tempArr[index];
  tempArr[index] = tempArr[index - 1];
  tempArr[index - 1] = temp;
  dispatch({
    type: SWAP_WORKOUT_UP,
    payload: tempArr
  });
};

export const swapWorkoutDown = (workData, index) => dispatch => {
  const tempArr = workData;
  let temp = tempArr[index];
  tempArr[index] = tempArr[index + 1];
  tempArr[index + 1] = temp;
  dispatch({
    type: SWAP_WORKOUT_DOWN,
    payload: tempArr
  });
};

export const deleteWorkout = (workData, index) => dispatch => {
  const filteredArr = workData.filter((item, i) => {
    return i !== index;
  });
 
  dispatch({
    type: DELETE_WORKOUT,
    payload: filteredArr
  });
};
