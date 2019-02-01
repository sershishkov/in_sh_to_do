import isEmpty from '../validation/is-empty';

import { SET_CURRENT_USER, VERIFY_EMAIL_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
  verifyEmailUser:{}
};

export default function(state = initialState, action) {   
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
      case VERIFY_EMAIL_USER:
      return {
        ...state,        
        verifyEmailUser: action.payload
      };
    default:
      return state;
  }
}
