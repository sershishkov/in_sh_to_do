import { SET_VISIBLE_PAGE } from './types';


export const setVisiblePage = (visiblePage) => dispatch => {
  dispatch({
    type: SET_VISIBLE_PAGE,
    payload: visiblePage
  })
};
