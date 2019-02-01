import {SET_VISIBLE_PAGE} from '../actions/types';
const initialState = {
  displayPage:'' 
};

export default function(state = initialState, action) { 
  
  switch (action.type) {
    case SET_VISIBLE_PAGE:
      return {
        ...state,
        displayPage: action.payload,
        
      };      
      
    default:
      return state;
  }
}