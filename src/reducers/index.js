import {combineReducers} from 'redux';
import accountForm from './accountForm';

const rootReducer = combineReducers({
  accountForm
});

export default rootReducer;

/* it is helpful if you draw the structor tree of the store before you build it.
  {
    accountForm: {
      username: '',
      password: '',
      phoneNumber: '',
      repeatPassword: '',
    }
  }
*/