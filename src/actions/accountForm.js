import { ACCOUNT_FORM_SUBMIT, ON_FIELD_CHANGE } from '../actionTypes'

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
