import axios from "axios";
import {
  GET_ERRORS,
  GET_ALL_EXERCISE_TYPE,
  DELETE_ONE_TYPE_EXERCISE,
  GET_ONE_EXERCISE_TYPE,
  UPDATE_ONE_EXERCISE_TYPE
} from "./types";

// Create Exercise
export const createExerciseType = (exercData, history) => dispatch => {
  axios
    .post("/api/exercise", exercData)
    .then(res => history.push("/list-of-type-exercise"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getAllExercisesTypes = () => dispatch => {
  axios
    .get("/api/exercise")
    .then(exerscises => {
      dispatch({
        type: GET_ALL_EXERCISE_TYPE,
        payload: exerscises.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteExerciseType = id => dispatch => {
  axios
    .delete(`/api/exercise/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_ONE_TYPE_EXERCISE,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getTypeExersById = id => dispatch => {
  axios
    .get(`/api/exercise/${id}`)
    .then(exerscise => {
      dispatch({
        type: GET_ONE_EXERCISE_TYPE,
        payload: exerscise.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
export const updateTypeExers = (oneTypeExers, history) => dispatch => {
  axios
    .put(`/api/exercise/${oneTypeExers.id}`, oneTypeExers)
    .then(type => {
      dispatch({
        type: UPDATE_ONE_EXERCISE_TYPE,
        payload: type.data
      });
      history.push("/list-of-type-exercise");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
