import { GET_ALL_WORKOUTS,ADD_ONE_WORKOUT, SWAP_WORKOUT_UP, SWAP_WORKOUT_DOWN, DELETE_WORKOUT, GET_ONE_WORKOUT,UPDATE_ONE_WORKOUT,GET_WORKS_IN_TRAINING, CLEAR_ALL_WORKS } from '../actions/types';

const initialState = {
  workouts: [],
  oneWorkout:{}  
};

export default function(state = initialState, action) { 
  // console.log(action.payload)  ;
  switch (action.type) {
    case GET_ALL_WORKOUTS:
      return {
        ...state,
        workouts: action.payload,
        
      };
      case CLEAR_ALL_WORKS:
      return {
        ...state,
        workouts: action.payload,
        
      };
      case ADD_ONE_WORKOUT:
      return {
        ...state,
        workouts: [...state.workouts, action.payload],
        
      };

      case SWAP_WORKOUT_UP:
      return {
        ...state,
        workouts:  action.payload        
      };

      case SWAP_WORKOUT_DOWN:
      return {
        ...state,
        workouts:  action.payload
        
      };

      case DELETE_WORKOUT:
      return {
        ...state,
        workouts: action.payload 
        
      };

      case GET_ONE_WORKOUT:
      return {
        ...state,
        oneWorkout: action.payload,
        
      };
      case UPDATE_ONE_WORKOUT:
      return {
        ...state,
        workouts:  action.payload
        
      };
      case GET_WORKS_IN_TRAINING:
      return {
        ...state,
        workouts: action.payload,
        
      };
      
    default:
      return state;
  }
}