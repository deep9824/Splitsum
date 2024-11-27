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
  header: {
    width: '100%',
    backgroundColor: lightColors.blue,
    height: responsiveHeight(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: {
    width: responsiveWidth(90),
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveHeight(2),
  },
  appIcon: {
    resizeMode: 'contain',
    height: responsiveHeight(8),
    width: responsiveWidth(16),
  },
  userIcon: {
    resizeMode: 'contain',
    height: responsiveHeight(5),
    width: responsiveHeight(5),
  },
  title: {
    fontFamily: fontFamily.A_bold,
    fontSize: fontSize.large,
    alignSelf: 'center',
    marginTop: responsiveHeight(2),
    textAlign: 'center',
  },
  productName: {
    fontFamily: fontFamily.R_regular,
    fontSize: 15,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: responsiveHeight(2),
  },
  subtitle: {
    fontFamily: fontFamily.R_regular,
    fontSize: 15,
    textAlign: 'center',
    alignSelf: 'center',
  },
  amountLabel: {
    fontFamily: fontFamily.A_semiBold,
    fontSize: fontSize.mediumLarge,
    alignSelf: 'center',
    marginTop: responsiveHeight(5),
    color: lightColors.black,
  },
  amountContainer: {
    width: responsiveWidth(40),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  currencySymbol: {
    fontFamily: fontFamily.R_regular,
    fontSize: 44,
    color: lightColors.grey,
  },
  amountInput: {
    fontFamily: fontFamily.R_regular,
    fontSize: 80,
    color: lightColors.black,
    alignSelf: 'center',
  },
  cancelButtonContainer: {
    position: 'absolute',
    bottom: responsiveHeight(5),
    alignSelf: 'center',
  },
  cancelButtonText: {
    fontFamily: fontFamily.A_semiBold,
    fontSize: fontSize.medium,
    alignSelf: 'center',
    color: lightColors.black,
  },
});
