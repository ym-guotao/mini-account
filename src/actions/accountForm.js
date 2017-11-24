import {ACCOUNT_FORM_SUBMIT, ON_FIELD_CHANGE, ON_REPEAT_PASSWORD_FIELD_BLUR} from '../actionTypes';

export function accountFormSubmit(formData) {
  return {
    type: ACCOUNT_FORM_SUBMIT,
    payload: formData
  }
}

export function onFieldChange(fieldData) {
  return {
    type: ON_FIELD_CHANGE,
    payload: fieldData
  }
}

export function onRepeatPasswordFieldBlur(value) {
  return {
    type: ON_REPEAT_PASSWORD_FIELD_BLUR,
    payload: value
  }
}