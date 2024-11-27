import {StyleSheet} from 'react-native';
import {
  borderRadius,
  darkColors,
  fontFamily,
  fontSize,
  lightColors,
  responsiveHeight,
  responsiveWidth,
} from '../../styles/variables';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  signContainer: {
    paddingTop: 0,
  },
  imageView: {
    width: responsiveWidth(90),
    alignSelf: 'center',
    marginTop: responsiveHeight(10),
  },
  tinyLogo: {
    width: '100%',
    height: responsiveHeight(15),
    resizeMode: 'contain',
  },
  inputTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveHeight(2),
  },
  star: {
    color: lightColors.pink,
    fontSize: fontSize.semiLarge,
  },
  label: {
    fontSize: fontSize.mediumLarge,
    color: darkColors.white,
    fontFamily: fontFamily.A_semiBold,
    marginTop: responsiveHeight(1),
  },
  inputContainer: {
    width: responsiveWidth(90),
    alignSelf: 'center',
    alignItems: 'center',
  },
  errorTitle: {
    width: responsiveWidth(90),
    height: responsiveHeight(8),
    backgroundColor: lightColors.pink,
    marginTop: responsiveHeight(2),
    justifyContent: 'center',
    alignSelf:'center'
  },
  errorLabel: {
    fontSize: fontSize.mediumLarge,
    color: darkColors.white,
    fontFamily: fontFamily.A_regular,
    alignSelf: 'center',
    textAlign: 'center',
  },
  input: {
    marginTop: responsiveHeight(1),
    height: responsiveHeight(7),
    borderColor: darkColors.white,
    borderWidth: 1,
    fontSize: fontSize.normal,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: lightColors.black,
    fontFamily: fontFamily.R_regular,
    width: '100%',
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: 'red',
    color: lightColors.black,
  },
  signButtonDiv: {
    width: responsiveWidth(90),
    padding: 30,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(4),
    borderRadius: borderRadius.circle,
    backgroundColor: lightColors.green,
  },
  pressedBox: {
    backgroundColor: '#54D561',
    color: '#fff',
  },
  signInButton: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotDiv: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(1),
  },
  forgotText: {
    color: darkColors.white,
    marginTop: responsiveHeight(2),
    fontSize: fontSize.medium,
    fontFamily: fontFamily.R_regular,
    textDecorationLine: 'underline',
  },
  signUpDiv: {alignItems: 'flex-start', justifyContent: 'flex-start',width:responsiveWidth(90),alignSelf:'center'},
  signUpText: {
    color: darkColors.white,
    marginTop: responsiveHeight(5),
    fontSize: fontSize.mediumLarge,
    fontFamily: fontFamily.L_semiBold,
  },
  signUpErrorText: {
    marginTop: 25,
  },
  signUpInfo: {
    marginTop:5,
    color: darkColors.white,
    fontSize: fontSize.medium,
    fontFamily:fontFamily.R_regular ,
  },
  // forgot password
  forgotContainer: {
    flex: 1,
  },
  forgotTitleInfo: {
    alignItems: 'center',
  },
  forgotLabel: {
    fontSize: 28,
    color:darkColors.white,
    fontFamily:fontFamily.R_semiBold,
    marginTop: responsiveHeight(2),
  },
  forgotErrorTitle: {
    height: responsiveHeight(6),
    color: 'white',
    width: '90%',
    alignSelf:'center',
    justifyContent:'center',
    backgroundColor: lightColors.pink,
    marginTop:responsiveHeight(2)
  },
  forgotInfo: {
    fontSize: fontSize.normal,
    color: 'white',
    fontFamily:fontFamily.R_regular
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'grey',
    paddingRight: 10,
  },
});
