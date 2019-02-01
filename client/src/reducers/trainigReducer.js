import {GET_ALL_TRAINIGS,GET_ONE_TRAINIG, ADD_ONE_TRAINIG,UPDATE_ONE_TRAINIG, DELETE_ONE_TRAINIG } from '../actions/types';

const initialState = {
  trainigs: [],
  oneTrainig:{}
};

export default function(state = initialState, action) { 
  // console.log(action.payload)  ;
  switch (action.type) {
    case GET_ALL_TRAINIGS:
      return {
        ...state,
        trainigs: action.payload,
        
      };
      case ADD_ONE_TRAINIG:
      return {
        ...state,
        trainigs: [...state.trainigs, action.payload],
        
      };    

      case DELETE_ONE_TRAINIG:
      return {
        ...state,
        trainigs: state.trainigs.filter(train =>{
          return train._id !== action.payload;
        })  
        
      };

      case GET_ONE_TRAINIG:
      return {
        ...state,
        oneTrainig: action.payload,
        
      };
      case UPDATE_ONE_TRAINIG:
      return {
        ...state,
        trainigs:  state.trainigs.map(train =>
          train._id === action.payload.id ? (train = action.payload): train
        )
        
      };
      
    default:
      return state;
  }
}