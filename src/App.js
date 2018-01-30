import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  InputGroup,
  InputGroupAddon,
  Card,
  CardText,
  CardBody,
  CardTitle
} from 'reactstrap'

import Dialog from './components/Dialog'
import FiberString from './components/FiberString'
import { accountFormSubmit, onFieldChange } from './actions/accountForm'

import style from './App.css'

const mapStateToProps = state => ({
  accountForm: state.accountForm
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      accountFormSubmit,
      onFieldChange
    },
    dispatch
  )

class App extends Component {
  state: {
    showJSON: boolean,
    userNameFieldHandled: boolean,
    passwordFieldHandled: boolean,
    repeatPasswordFieldHandled: boolean,
    phoneNumberFieldHandled: boolean
  }
  constructor(props) {
    super(props)

    // you can put the state that ONLY used in this component here
    this.state = {
      showJSON: false,
      userNameFieldHandled: false,
      passwordFieldHandled: false,
      repeatPasswordFieldHandled: false,
      phoneNumberFieldHandled: false
    }
  }

  static propTypes = {
    accountForm: PropTypes.object.isRequired,
    accountFormSubmit: PropTypes.func.isRequired,
    onFieldChange: PropTypes.func.isRequired
  }

  onFieldChange(fieldName, value) {
    this.props.onFieldChange({ [fieldName]: value.trim() })
    this.setState(() => ({
      [`${fieldName}FieldHandled`]: true
    }))
  }

  onSubmit(event) {
    event.preventDefault()
    const { accountForm } = this.props
    this.props.accountFormSubmit({
      userName: accountForm.userName,
      password: accountForm.password,
      phoneNumber: accountForm.phoneNumber
    })
    this.setState(() => ({
      showJSON: true
    }))
  }

  render() {
    // validation
    const {
      userName,
      password,
      repeatPassword,
      phoneNumber
    } = this.props.accountForm
    const wrongUserName = !userName
    const wrongPassword =
      !/[a-z]+/.test(password) ||
      !/[A-Z]+/.test(password) ||
      password.length < 8
    const wrongRepeatPassword = repeatPassword !== password
    const wrongPhoneNumber = !/^1[3,5,6,8]\d{9}$/.test(phoneNumber)
    const btnDisable =
      !userName || wrongPassword || wrongRepeatPassword || wrongPhoneNumber
    return (
      <div className="App">
        <FiberString />
        {/* <Dialog>
          <h4>呵呵哒</h4>
        </Dialog> */}
        <h2>Register</h2>
        <Form
          onSubmit={event => this.onSubmit(event)}
          className={style.register_form}
        >
          <FormGroup>
            <Label for="userName">User Name</Label>
            <Input
              type="text"
              name="userName"
              id="userName"
              placeholder="please input your name"
              onBlur={event =>
                this.onFieldChange('userName', event.target.value)
              }
            />
            <FormText
              color="muted"
              className={`${
                wrongUserName && this.state.userNameFieldHandled
                  ? 'error'
                  : 'error hide'
              }`}
            >
              can not be empty.
            </FormText>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="please input your password"
              onBlur={event =>
                this.onFieldChange('password', event.target.value)
              }
            />
            <FormText
              color="muted"
              className={`${
                wrongPassword && this.state.passwordFieldHandled
                  ? 'error'
                  : 'error hide'
              }`}
            >
              must be at least 8 characters, contain upper and lower case
              letters.
            </FormText>
          </FormGroup>
          <FormGroup>
            <Label for="repeatPassword">Repeat Password</Label>
            <Input
              type="password"
              name="repeatPassword"
              id="repeatPassword"
              placeholder="please input your password again"
              onBlur={event =>
                this.onFieldChange('repeatPassword', event.target.value)
              }
            />
            <FormText
              color="muted"
              className={`${
                wrongRepeatPassword && this.state.repeatPasswordFieldHandled
                  ? 'error'
                  : 'error hide'
              }`}
            >
              must be the same as password field.
            </FormText>
          </FormGroup>

          <FormGroup>
            <Label for="phoneNumber">PhoneNumber</Label>
            <InputGroup>
              <InputGroupAddon>+86</InputGroupAddon>
              <Input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="please input your phone number"
                onBlur={event =>
                  this.onFieldChange('phoneNumber', event.target.value)
                }
              />
            </InputGroup>
            <FormText
              color="muted"
              className={`${
                wrongPhoneNumber && this.state.phoneNumberFieldHandled
                  ? 'error'
                  : 'error hide'
              }`}
            >
              must match Chinese cellphone number format.
            </FormText>
          </FormGroup>
          <Button color="success" type="submit" disabled={btnDisable}>
            Submit
          </Button>
          <Card
            className={
              this.state.showJSON
                ? `${style.json_card} result`
                : `${style.json_card} ${style.hide} result`
            }
          >
            <CardBody>
              <CardTitle>JSON format of form data</CardTitle>
              <CardText>{JSON.stringify(this.props.accountForm)}</CardText>
            </CardBody>
          </Card>
        </Form>
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
