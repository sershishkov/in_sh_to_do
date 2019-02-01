import { GET_ALL_EXERCISE_TYPE, DELETE_ONE_TYPE_EXERCISE, GET_ONE_EXERCISE_TYPE, UPDATE_ONE_EXERCISE_TYPE } from '../actions/types';

const initialState = {
  typeExers: [] ,
  oneTypeExers:{}
};

export default function(state = initialState, action) {   
  switch (action.type) {
    case GET_ALL_EXERCISE_TYPE:
      return {
        ...state,
        typeExers: action.payload,
        
      };
      case DELETE_ONE_TYPE_EXERCISE:
      return {
        ...state,
        typeExers: state.typeExers.filter(typeE =>{
                          return typeE._id !== action.payload;
                        })  
        
      };
      case GET_ONE_EXERCISE_TYPE:
      return {
        ...state,
        oneTypeExers: action.payload,
        
      };
      case UPDATE_ONE_EXERCISE_TYPE:
      return {
        ...state,
        typeExers:  state.typeExers.map(type =>
          type._id === action.payload.id ? (type = action.payload): type
        )
        
      };
      
    default:
      return state;
  }
}
