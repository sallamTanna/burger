import * as actions from '../actions/action';
import { updateObject } from '../utility';

const initalState = {
  token: null,
  userId: null,
  loading: false,
  error: null,
}

const authStart = (state, action) => updateObject(state, {loading: true, error: null});

const authSuccess = (state, action) => {
  return updateObject(state, {token: action.data.idToken, userId: action.data.localId, error: null, loading: false })
}

const authFail = (state, action) => updateObject(state, {error: action.error, loading: false})

const authLogout = (state, action) => updateObject(state, {userId: null, token: null});

const logout = () => {
  return {
    type: actions.AUTH_LOGOUT
  }
}

const authReducer = (state=initalState, action) => {
  switch(action.type) {
    case(actions.AUTH_START): return authStart(state, action)
    case(actions.AUTH_SUCCESS): return authSuccess(state, action)
    case(actions.AUTH_FAIL): return authFail(state, action)
    case(actions.AUTH_LOGOUT): return authLogout(state, action)
    default: return state
  }
}

export default authReducer;
