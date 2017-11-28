import { ACCOUNT_FORM_SUBMIT, ON_FIELD_CHANGE } from '../actionTypes'

import { accountFormSubmit, onFieldChange } from './accountForm'

it('should create an action to change controlled form', () => {
  const str = 'example_string'
  const action = onFieldChange(str)

  expect(action.payload).toBe(str)
  expect(action.type).toBe(ON_FIELD_CHANGE)
})

it('should have different type for different actions', () => {
  const str = 'example_string'
  const formData = {
    username: 'Mike',
    phoneNumber: '13399999999'
  }

  const action1 = onFieldChange(str)
  const action2 = accountFormSubmit(formData)

  expect(action1.type !== action2.type).toBe(true)
})
