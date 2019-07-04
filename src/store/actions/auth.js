import * as actions from './action';
import axios from 'axios';

// Action creators
const authStartActionCreator = () => {
  return {
    type: actions.AUTH_START,
  }
}

const authSuccessActionCreator = (data) => {
  return {
    type: actions.AUTH_SUCCESS,
    data: data
  }
}

const authFailActionCreator = (error) => {
  return {
    type: actions.AUTH_FAIL,
    error: error
  }
}

export const logout = () => {
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('expiresInDate')
  window.localStorage.removeItem('userId')
  return {
    type: actions.AUTH_LOGOUT
  }
}

//Async actions
const increazeExpiresInTime = (data) => {
  return dispatch => {
    setTimeout(()=> {
      dispatch(logout())
    }, data.expiresIn*1000)
  }
}

export const authStart = (email, password, method) => {
  return (dispatch) => {
    dispatch(authStartActionCreator());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC8OKqRr4q-N_1pkFrKPLIeW9C65i7J4xc';

    if(!method) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyC8OKqRr4q-N_1pkFrKPLIeW9C65i7J4xc'
    }

    axios.post(url, authData)
            .then(response => {
              const expiresInDate = new Date(new Date().getTime() + response.data.expiresIn*1000);
              window.localStorage.setItem('token', response.data.idToken)
              window.localStorage.setItem('expiresInDate', expiresInDate)
              window.localStorage.setItem('userId', response.data.localId)
              dispatch(authSuccessActionCreator(response.data))
              dispatch(increazeExpiresInTime(response.data))
            })
            .catch(error => {
              dispatch(authFailActionCreator(error))
            })

  }
}

export const authCheckState = () => {
  let data;
  const token = window.localStorage.getItem('token');
  const userId = window.localStorage.getItem('userId');
  const expiresInDate = window.localStorage.getItem('expiresInDate');

  return dispatch => {
    if(!token) {
      dispatch(logout())
    } else {
      const expiresInDate = new Date(window.localStorage.getItem('expiresInDate'));
      if(expiresInDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch (authSuccessActionCreator({
          idToken: token,
          localId: userId,
          expiresInDate: expiresInDate,
        }))
        const expiresIn = (expiresInDate.getTime() - new Date().getTime())/1000;
        const data = {
          expiresIn: expiresIn,
        };
        dispatch(increazeExpiresInTime(data))
      }
    }
  }
}
