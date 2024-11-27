import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/AuthScreens/LoginScreen/Login';
import ForgotPassword from '../screens/AuthScreens/ForgotPassword/ForgotPassword';

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
