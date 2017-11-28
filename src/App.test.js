import React, { Component } from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'

import App from './App'
import configureStore from './store'
import { onFieldChange, accountFormSubmit } from './actions/accountForm'

const exampleJSON = {
  username: 'Mike',
  password: 'Mike_is_good',
  phoneNumber: '13344445555',
  repeatPassword: 'Mike_is_good'
}
const store = configureStore()
const subject = (
  <Provider store={store}>
    <App />
  </Provider>
)
const wrapper = mount(subject)

it('should insert a stringify JSON to page', () => {
  store.dispatch(onFieldChange(exampleJSON))
  it('renders without crashing', () => {
    wrapper
  })
  expect(wrapper.find('.json-card .card-text').text()).toEqual(
    JSON.stringify(exampleJSON)
  )
})

it('should have 4 type fields', () => {
  expect(wrapper.find('input').length).toEqual(4)
})

it('should have page title', () => {
  expect(wrapper.contains(<h2>Register</h2>)).toEqual(true)
})

const exampleJSON2 = {
  username: 'Tom',
  password: 'Tom_is_good',
  phoneNumber: '13344446666',
  repeatPassword: '13344446666'
}

it('should save state to store when click submit', () => {
  store.dispatch(accountFormSubmit(exampleJSON2))
  expect(wrapper.find('.json-card .card-text').text()).toEqual(
    JSON.stringify(exampleJSON2)
  )
})
