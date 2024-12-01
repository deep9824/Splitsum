import React, { useEffect } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from '../screens/HomeScreens/Dashboard/Dashboard';
import PaymentScreen from '../screens/HomeScreens/PaymentScreen/PaymentScreen';
import CompleteScreen from '../screens/HomeScreens/CompleteScreen/CompleteScreen';
import { useStripeTerminal } from '@stripe/stripe-terminal-react-native';

const Stack = createStackNavigator();

const HomeNavigation = () => {
  const {initialize} = useStripeTerminal();

  useEffect(() => {
    initialize();
  }, [initialize]);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="CompleteScreen" component={CompleteScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
