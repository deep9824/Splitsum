import Toast from 'react-native-root-toast';
import {fontFamily, fontSize} from '../styles/variables';
import {store} from '../redux/store';
import {tokenExpiredToggle} from '../redux/actions/logoutAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const DEFAULT_LANGUAGE = 'en';
export const SELECTED_LANGUAGE = 'LANGUAGE';
export const THEME_MODE = 'THEMEMODE';

export const API_URL = `https://uat.splitsum.co/api/`;

export const endPoint = {
  login: 'login',
  forgot_password: 'forgot-password',
  paymentCreate: 'stripe/device/payment-intent/create',
  fetchContractor: 'contractors',
  fetchLocationList: 'locations',
};
export const showToast = (ToastPageMsg: any) => {
  Toast.show(ToastPageMsg, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.CENTER,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    opacity: 1,
    textStyle: {
      fontSize: fontSize.extraSmall,
      fontFamily: fontFamily.A_bold,
    },
  });
};
export const tokenExpiredflagChange = async (data: any) => {
  store.dispatch(tokenExpiredToggle(data));
};

