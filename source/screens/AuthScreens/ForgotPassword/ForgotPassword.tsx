import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  Keyboard,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {validateEmail} from '../../../utils/validations';
import {styles} from '../styles';
import {axiosInstance} from '../../../config/setupAxios';
import {endPoint, showToast} from '../../../utils/commonUtils';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Buttons from '../../../components/Button';
import {
  darkColors,
  lightColors,
  responsiveHeight,
  responsiveWidth,
} from '../../../styles/variables';

const ForgotPassword = () => {
  const navigation: any = useNavigation();
  const [loader, setLoader] = useState(false);
  const [userDetails, setUserDetails]: any = useState({
    email: '',
  });
  const [requiredFields, setRequiredFields]: any = useState({
    emailRegexError: false,
  });
  useFocusEffect(
    React.useCallback(() => {
      setUserDetails({userDetails, email: ''});
      setRequiredFields({requiredFields, emailRegexError: false});
    }, [navigation]),
  );
  const handleSubmit = async () => {
    setLoader(true);
    if (!validateEmail(userDetails?.email) || userDetails?.email === '') {
      setRequiredFields({...requiredFields, emailRegexError: true});
      setLoader(false);
      setUserDetails({userDetails, email: ''});
      return;
    }
    let payload = {
      email: userDetails?.email,
    };
    axiosInstance
      .post(endPoint.forgot_password, payload)
      .then(res => {
        if (res.data.status == 'success') {
          showToast(res.data.message);
          setLoader(false);
        }
      })
      .catch(error => {
        console.log(error);
        setLoader(false);
        setRequiredFields({requiredFields, emailRegexError: true});
        setUserDetails({
          ...userDetails,
          email: '',
        });
      });
  };
  return (
    <SafeAreaView style={styles.forgotContainer}>
      <ImageBackground
        style={styles.container}
        source={require('../../../assets/images/bgimg.png')}>
        <View style={styles.imageView}>
          <Image
            style={styles.tinyLogo}
            source={require('../../../assets/images/login-logo.png')}
          />
        </View>

        <View style={styles.forgotTitleInfo}>
          <Text style={styles.forgotLabel}>Forgot your password?</Text>
          <Text style={styles.forgotInfo}>
            You will be emailed instructions on
          </Text>
          <Text style={styles.forgotInfo}>how to reset your password.</Text>
        </View>
        {requiredFields.emailRegexError && (
          <View style={styles.forgotErrorTitle}>
            <Text style={styles.errorLabel}>Email Address is incorrect.</Text>
          </View>
        )}
        <View style={styles.inputContainer}>
          <View style={styles.inputTitle}>
            <Text style={styles.label}>Email Address on account</Text>
            <Text style={styles.star}>*</Text>
          </View>
          <TextInput
            style={[
              styles.input,
              requiredFields.emailRegexError && styles.inputError,
            ]}
            onChangeText={value => {
              if (value) {
                setRequiredFields({
                  ...requiredFields,
                  emailRegexError: false,
                });
              }
              setUserDetails({
                ...userDetails,
                email: value.replace(/\s/g, ''),
              });
            }}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            value={userDetails?.email}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
        </View>
        <Buttons
          name={'SUBMIT'}
          loaderColor={darkColors.white}
          needLoading={loader}
          disabled={loader}
          buttonTextColor={lightColors.black}
          backgroundColor={lightColors.green}
          marginTop={responsiveHeight(4)}
          onPress={() => {
            handleSubmit();
          }}
          width={responsiveWidth(90)}
        />
        <TouchableOpacity
          style={styles.forgotDiv}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.forgotText}>Sign In</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default ForgotPassword;
