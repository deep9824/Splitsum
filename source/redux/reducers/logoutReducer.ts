import {LoginTypes} from '../actions/logoutAction';

let TokenExpiredFlag: boolean = false;

const initialState: any = {
  tokenExpiredFlag: false,
};

function logoutReducers(state = initialState, action: any) {
  switch (action.type) {
    case LoginTypes.TOKEN_EXPIRED:
      TokenExpiredFlag = action.payload;
      return {...state, tokenExpiredFlag: action.payload};
    default:
      return state;
  }
}

export default logoutReducers;
