import {ACCOUNT_FORM_SUBMIT, ON_FIELD_CHANGE, ON_REPEAT_PASSWORD_FIELD_BLUR} from '../actionTypes';


export default function accountFormReducer(state={}, action) {
  switch(action.type) {
    case ACCOUNT_FORM_SUBMIT:
      return Object.assign({}, state, action.payload);
    case ON_FIELD_CHANGE:
      return Object.assign({}, state, action.payload);
    case ON_REPEAT_PASSWORD_FIELD_BLUR:
      return Object.assign({}, state, {repeatPassword: action.payload});
    default:
      return state;
  }
}