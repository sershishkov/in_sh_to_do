import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import exercReducer from './exercTypeReducer';
import workoutReducer from './workoutReducer';
import trainigReducer from './trainigReducer';
import displayPageReducer from './displayPageReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  typeExers:exercReducer,
  workouts:workoutReducer,
  trainigs:trainigReducer,
  displayPage:displayPageReducer
});
