import React from 'react';
import {SafeAreaView, Text, View, StyleSheet} from 'react-native';
import {
  darkColors,
  fontFamily,
  fontSize,
  lightColors,
  responsiveHeight,
  responsiveWidth,
} from '../../../styles/variables';
import Header from '../../../components/Header';
import Buttons from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import { styles } from './CompleteScreenstyles';

const CompleteScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Payment Complete</Text>
        <Text style={styles.amount}>£100.00</Text>
        <Text style={styles.info}>4 April 2024 - 13:55</Text>
        <Text style={styles.info}>Description on Payment item</Text>
        <Text style={styles.info}>Contractor account</Text>
      </View>
      <Buttons
        name="GO BACK"
        loaderColor={darkColors.white}
        buttonTextColor={lightColors.black}
        backgroundColor={lightColors.green}
        position="absolute"
        bottom={responsiveHeight(10)}
        onPress={() => navigation.goBack()}
        width={responsiveWidth(90)}
      />
    </SafeAreaView>
  );
};

export default CompleteScreen;
