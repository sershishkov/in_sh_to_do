import {GET_ERRORS,GET_ALL_TRAINIGS, DELETE_ONE_TRAINIG, GET_ONE_TRAINIG, UPDATE_ONE_TRAINIG} from '../actions/types';
import axios from 'axios';

export const getAllTrainigs = () => dispatch => {
  axios
    .get('/api/workout')
    .then(trainings =>{
      // console.log(trainings.data);
      dispatch({
        type: GET_ALL_TRAINIGS,
        payload: trainings.data
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteOneTrainig = (id) => dispatch => {
  axios
    .delete(`/api/workout/${id}`)
    .then(res =>
      dispatch({
      type: DELETE_ONE_TRAINIG,
      payload: id
    }) )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const updateOneTrainig = (trainData,  history) => dispatch => {
  axios
    .put(`/api/workout/${trainData._id}`, trainData)
    .then(train =>{
      // console.log(train.data);
      dispatch({
        type: UPDATE_ONE_TRAINIG,
        payload: train.data
      })
      history.push('/list-of-training');
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getTrainingById = (id) => dispatch => {  

  axios
    .get(`/api/workout/${id}`)
    .then(train =>{
      // console.log(train.data);
      dispatch({
        type: GET_ONE_TRAINIG,
        payload: train.data
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
  
};



export const createOneTraining = ( trainData, history) => dispatch => {
 
  axios
  .post('/api/workout', trainData)
  .then(res => history.push('/dashboard'))
  .catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
 
};

