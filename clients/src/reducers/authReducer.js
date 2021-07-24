import { SIGN_IN, SIGN_OUT } from "../actions/types";
//initiate authReducer state
const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, useId: null };
    default:
      return state;
  }
};
