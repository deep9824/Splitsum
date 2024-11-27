export enum LoginTypes {
    TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  }
  export function tokenExpiredToggle(data: any) {
    return (dispatch: any) => {
      dispatch({
        type: LoginTypes.TOKEN_EXPIRED,
        payload: data,
      });
    };
  }