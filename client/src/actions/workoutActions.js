import {ADD_ONE_WORKOUT, SWAP_WORKOUT_UP, SWAP_WORKOUT_DOWN, DELETE_WORKOUT ,  GET_ONE_WORKOUT, UPDATE_ONE_WORKOUT, GET_WORKS_IN_TRAINING, CLEAR_ALL_WORKS} from '../actions/types';



export const createOneWorkout = (workData, history, link) => dispatch => {
  dispatch({
    type: ADD_ONE_WORKOUT,
    payload: workData
  });
  history.push(link);  
};

export const clearAllWorkouts = () => dispatch => {
  dispatch({
    type: CLEAR_ALL_WORKS,
    payload: []
  });
   
};

export const updateOneWorkout = (workData, works, history, link) => dispatch => {
  const arr =  works.map(work =>
    work.id_workout === workData.id_workout? (work = workData): work);   
  dispatch({
    type: UPDATE_ONE_WORKOUT,
    payload: arr
  });
  history.push(link);
};

export const getWorkoutById = (id, works) => dispatch => {  

  const singleWorkout = works.filter(item=>{
    return item.id_workout === id;
  })  

  dispatch({
    type: GET_ONE_WORKOUT,
    payload: singleWorkout[0]
  })
  
};

export const getWorksInTraining = (training) => dispatch => {  

  const worksIn = training.exercise_in;
  //  console.log(worksIn);

  dispatch({
    type: GET_WORKS_IN_TRAINING,
    payload: worksIn
  })
  
};

export const swapWorkoutUp = (workData, index) => dispatch => {
  const tempArr = workData; 
  const temp = tempArr[index];
  tempArr[index]= tempArr[index-1];
  tempArr[index-1] = temp
  dispatch({
    type: SWAP_WORKOUT_UP,
    payload: tempArr
  });
  
};

export const swapWorkoutDown = (workData, index) => dispatch => {
  const tempArr = workData; 
  let temp = tempArr[index];
  tempArr[index]= tempArr[index+1];
  tempArr[index+1] = temp;  
  dispatch({
    type: SWAP_WORKOUT_DOWN,
    payload: tempArr
  });
  
};

export const deleteWorkout = (workData, index) => dispatch => {
  const filteredArr = workData.filter((item, i)=>{
    return i !== index;
  })
  console.log(filteredArr);
  dispatch({
    type: DELETE_WORKOUT,
    payload: filteredArr
  });
  
};