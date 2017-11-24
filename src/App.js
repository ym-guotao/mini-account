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
import {
  accountFormSubmit,
  onFieldChange,
  onRepeatPasswordFieldBlur
} from './actions/accountForm'
import './App.css'

const mapStateToProps = state => ({
  accountForm: state.accountForm
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      accountFormSubmit,
      onFieldChange,
      onRepeatPasswordFieldBlur
    },
    dispatch
  )

class App extends Component {
  constructor(props) {
    super(props)

    // you can put the state that ONLY used in this component here
    this.state = {
      showJSON: false
    }
  }

  static propTypes = {
    accountForm: PropTypes.object.isRequired,
    accountFormSubmit: PropTypes.func.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    onRepeatPasswordFieldBlur: PropTypes.func.isRequired
  }

  onFieldChange(fieldName, value) {
    this.props.onFieldChange({ [fieldName]: value.trim() })
  }

  onRepeatPasswordFieldBlur(value) {
    this.props.onRepeatPasswordFieldBlur(value.trim())
  }

  onSubmit(event) {
    event.preventDefault()
    const { accountForm } = this.props
    this.props.accountFormSubmit({
      userName: accountForm.userName,
      password: accountForm.password,
      phoneNumber: accountForm.phoneNumber
    })
    this.setState({ showJSON: true })
  }

  render() {
    // validation
    const { accountForm } = this.props
    const btnDisable =
      !accountForm.userName ||
      !/[a-z]+/.test(accountForm.password) ||
      !/[A-Z]+/.test(accountForm.password) ||
      accountForm.password.length < 8 ||
      accountForm.repeatPassword !== accountForm.password ||
      !/^1[3,5,6,8]\d{9}$/.test(accountForm.phoneNumber)
    return (
      <div className="App">
        <Form onSubmit={event => this.onSubmit(event)}>
          <FormGroup>
            <Label for="userName">User Name</Label>
            <Input
              type="text"
              name="userName"
              id="userName"
              placeholder="please input your name"
              onInput={event =>
                this.onFieldChange('userName', event.target.value)
              }
            />
            <FormText color="muted">can not be empty.</FormText>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="please input your password"
              onInput={event =>
                this.onFieldChange('password', event.target.value)
              }
            />
            <FormText color="muted">
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
                this.onRepeatPasswordFieldBlur(event.target.value)
              }
            />
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
                onInput={event =>
                  this.onFieldChange('phoneNumber', event.target.value)
                }
              />
            </InputGroup>
            <FormText color="muted">
              must be numbers and length equal to 11.
            </FormText>
          </FormGroup>
          <Button color="success" type="submit" disabled={btnDisable}>
            Submit
          </Button>
          <Card className={this.state.showJSON ? 'card' : 'card hide'}>
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
