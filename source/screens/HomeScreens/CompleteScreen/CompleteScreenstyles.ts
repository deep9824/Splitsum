import {StyleSheet} from 'react-native';
import {
  darkColors,
  fontFamily,
  fontSize,
  lightColors,
  responsiveHeight,
  responsiveWidth,
} from '../../../styles/variables';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkColors.white,
  },
  contentContainer: {
    width: responsiveWidth(90),
    alignSelf: 'center',
    marginTop: responsiveHeight(2),
  },
  title: {
    fontFamily: fontFamily.L_semiBold,
    fontSize: fontSize.large,
    color: lightColors.black,
  },
  amount: {
    fontFamily: fontFamily.L_regular,
    fontSize: 60,
    color: lightColors.black,
    marginTop: responsiveHeight(2),
  },
  info: {
    fontFamily: fontFamily.R_regular,
    fontSize: 18,
    color: lightColors.black,
  },
});
