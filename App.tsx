import {StripeTerminalProvider} from '@stripe/stripe-terminal-react-native';
import React, {useEffect, useMemo, useReducer} from 'react';
import {useStripeTerminal} from '@stripe/stripe-terminal-react-native';
import {Provider} from 'react-redux';
import {store} from './source/redux/store';
import {Keyboard, LogBox, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigation from './source/navigation/authNavigation';
import SplashScreen from 'react-native-splash-screen';
import {lightColors} from './source/styles/variables';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from './source/utils/authContext';
import {axiosInstance} from './source/config/setupAxios';
import {endPoint, showToast} from './source/utils/commonUtils';
import HomeNavigation from './source/navigation/homeNavigation';

LogBox.ignoreAllLogs(true);

const App = () => {
  const token = '144|IT4xULMpIxycG1Bau9RVGBghj9qtqNa1HLQjgcJ4f1eb9b5e'; 
  const {initialize} = useStripeTerminal();

  useEffect(() => {
    console.log("clear");
    
    initialize();
  }, [initialize]);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
  }, []);

  const appUser = async () => {
    let userToken = await AsyncStorage.getItem('Verify_Token');
    console.log('token', userToken);
    let initialRoute = 'App';
    dispatch({
      type: 'RESTORE_TOKEN',
      token: userToken,
      initialRoute,
    });
  };
  React.useEffect(() => {
    appUser();
  }, []);
  const [state, dispatch] = useReducer(
    (prevstate: any, action: any) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevstate,
            userToken: action.token,
            initialRoute: action.initialRoute,
            isLoading: false,
          };
        case 'USERLOGIN':
          return {
            ...prevstate,
            isSignout: false,
            userToken: action.data.token,
            initialRoute: action.data.initialRoute,
          };

        case 'SIGNOUT':
          return {
            ...prevstate,
            userToken: null,
            isSignout: true,
            isLoading: false,
          };
      }
    },
    {
      isLoading: true,
      userToken: null,
      initialRoute: 'Login',
    },
  );
  const authContext = useMemo(
    () => ({
      userloginAction: async (requestData: any, setLoading: any) => {
        axiosInstance
          .post(endPoint.login, requestData)
          .then(async res => {
            if (res.data.status == 'success') {
              setLoading(false);
              const user_token = res?.data?.data?.token;
              await AsyncStorage.setItem('Verify_Token', user_token);
              let initialRoute = 'App';
              dispatch({
                type: 'USERLOGIN',
                data: {token: user_token, initialRoute},
              });
              showToast(res?.data?.message);
            } else {
              setLoading(false);
            }
            Keyboard.dismiss();
          })
          .catch(error => {
            showToast(error.message);
            setLoading(false);
          });
      },

      signoutAction: async () => {
        await AsyncStorage.removeItem('Verify_Token');
        AsyncStorage.clear();
        dispatch({
          type: 'SIGNOUT',
        });
      },
    }),
    [],
  );
  // This function will return a Promise<string> which is expected by the StripeTerminalProvider

  const fetchTokenProvider = async () => {
    console.log('initialize', initialize);

    const response = await fetch(
      `https://uat.splitsum.co/api/stripe/device/connection-token`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Send token in headers if needed
        },
      },
    );
    const {data} = await response.json();
    console.log('connectionToken', data);

    const {secret_token} = data;
    return secret_token;
  };

  return (
    <StripeTerminalProvider
      logLevel="verbose"
      tokenProvider={fetchTokenProvider}>
      <Provider store={store}>
        <AuthContext.Provider value={{...authContext, ...state}}>
          <NavigationContainer>
            <StatusBar
              barStyle="light-content"
              hidden={false}
              backgroundColor={lightColors.blue}
              translucent={true}
            />
            {state?.userToken == null ? <AuthNavigation /> : <HomeNavigation />}
          </NavigationContainer>
        </AuthContext.Provider>
      </Provider>
    </StripeTerminalProvider>
  );
};

export default App;
