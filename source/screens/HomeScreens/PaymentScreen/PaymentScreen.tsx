import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import {
  darkColors,
  fontFamily,
  fontSize,
  lightColors,
  responsiveHeight,
  responsiveWidth,
} from '../../../styles/variables';
import Buttons from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import { styles } from './PaymentScreenstyles';

const PaymentScreen = () => {
  const navigation:any = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            style={styles.appIcon}
            source={require('../../../assets/images/app-icon.png')}
          />
          <Image
            style={styles.userIcon}
            source={require('../../../assets/images/user.png')}
          />
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>Add Tap to Pay Payment</Text>
      <Text style={styles.productName}>Leopard and butterfly T-shirt</Text>
      <Text style={styles.subtitle}>Add Tap to Pay Payment</Text>

      {/* Amount Input */}
      <View>
        <Text style={styles.amountLabel}>Amount:*</Text>
        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>£</Text>
          <TextInput
            maxLength={3}
            multiline={false}
            placeholder="125"
            style={styles.amountInput}
          />
        </View>
      </View>

      {/* Send Payment Button */}
      <Buttons
        name="SEND PAYMENT"
        loaderColor={darkColors.white}
        buttonTextColor={lightColors.black}
        backgroundColor={lightColors.green}
        position="absolute"
        bottom={responsiveHeight(10)}
        onPress={() => {
          // Handle payment logic
          navigation.navigate('CompleteScreen')
        }}
        width={responsiveWidth(90)}
      />

      {/* Cancel Button */}
      <Pressable
        style={styles.cancelButtonContainer}
        onPress={() => navigation.replace('Dashboard')}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default PaymentScreen;
