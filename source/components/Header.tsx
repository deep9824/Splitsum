import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {lightColors, responsiveHeight} from '../styles/variables';

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <Image
        style={styles.headerlogo}
        source={require('../assets/images/login-logo.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    backgroundColor: lightColors.blue,
    height: responsiveHeight(18),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerlogo: {
    marginTop: responsiveHeight(5),
    width: '50%',
    height: '50%',
  },
});
