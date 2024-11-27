import {configureStore} from '@reduxjs/toolkit';
 import logoutReducers from './reducers/logoutReducer';

export const store = configureStore({
  reducer: {
     logoutReducers: logoutReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
