import { StyleSheet } from "react-native";
import { borderRadius, darkColors, fontFamily, fontSize, lightColors, responsiveHeight, responsiveWidth } from "../../../styles/variables";

export const styles = StyleSheet.create({
    maincontainer:{flex:1,backgroundColor:darkColors.white},
    colorAll: {
      color: lightColors.black
    },
    container: {
      alignItems: 'center',
      backgroundColor: darkColors.white,
      paddingTop: responsiveWidth(7),
    },
    paymentBox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 20,
      margin: 20,
      borderRadius: borderRadius.semiLarge,
      elevation:2,backgroundColor:darkColors.white
    },
 
    paymentLogo: {
      width: responsiveHeight(5),
      height: responsiveHeight(5),
    },
    paymentTitle: {
      fontSize: fontSize.large,
      color: lightColors.black,
     fontFamily:fontFamily.A_bold,
      letterSpacing: 1,
    },
    paymentInfo: {
      fontSize: fontSize.medium,
      fontFamily:fontFamily.R_regular,
      color:lightColors.grey,
      letterSpacing: 0.5,
    },
    addMore: {
      borderBottomColor: '#F8F1F9',
      borderBottomWidth: 0.2,
      marginTop: responsiveHeight(2),
      paddingBottom: 10,
    },
    paymentDetailsTitle: {
      fontSize: 22,
      fontWeight: '500',
      letterSpacing: 1,
    },
    paymentDetails: {
      padding: 25,
    },
    LogoutContainer: {
      position: 'absolute',
      bottom: 30,
      width: '100%',
      alignItems: 'center',
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#B7EB6F',
      width: '90%',
      paddingVertical: 15,
      borderRadius: 30,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 5, // For Android shadow
    },
    btnIcon: {
      marginRight: 8,
    },
    logoutBtnText: {
      color: '#000',
      fontSize: 18,
      fontWeight: '600',
    },
    dropDown: {
      width: '85%',
    },
    paymentInput: {
      height: responsiveHeight(6),
      backgroundColor:darkColors.white,
      color: lightColors.black,
      borderRadius: 5,
      fontFamily:fontFamily.L_regular,
      paddingHorizontal: 10,
      borderWidth: 0.5,
      marginTop:responsiveHeight(2)
    },
    placeholder:{
        color:lightColors.black,
        fontFamily:fontFamily.R_regular,
        fontSize:fontSize.normal
    }
  });
  