import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Keyboard,
  PermissionsAndroid,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from '../styles';
import {emailRegex, validateEmail} from '../../../utils/validations';
import Buttons from '../../../components/Button';
import {
  darkColors,
  lightColors,
  responsiveHeight,
  responsiveWidth,
} from '../../../styles/variables';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../../utils/authContext';

const Login = () => {
  const navigation: any = useNavigation();
  const {userloginAction}: any = React.useContext(AuthContext);
  const [userDetails, setUserDetails]: any = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [userAccessLocaion, setUserAccessLocaion] = useState(false);
  const [iserror, setIserror] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setUserDetails({...userDetails, email: '', password: ''});
      setIserror(false);
    }, [navigation]),
  );

  async function init() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'Stripe Terminal needs access to your location',
          buttonPositive: 'Accept',
        },
      );
      console.log(
        PermissionsAndroid.RESULTS.GRANTED,
        'PermissionsAndroid.RESULTS.GRANTED',
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setUserAccessLocaion(true);
      } else {
        setUserAccessLocaion(false);
        Alert.alert(
          'Location services are required in order to connect to a reader.',
        );
      }
    } catch {}
  }

  useEffect(() => {
    if (!userAccessLocaion) {
      init();
    }
  }, [userAccessLocaion]);
  const handleSubmit = async () => {
   
    setLoading(true);
    if (!userDetails?.email && !userDetails?.password) {
      setLoading(false);
      setIserror(true);
      return;
    }

    if (!userDetails?.email) {
      setLoading(false);
      setIserror(true);
      return;
    } else {
      if (!userDetails?.email.match(emailRegex)) {
        setLoading(false);
        setIserror(true);
        return;
      }
    }
    if (!userDetails?.password) {
      setLoading(false);
      setIserror(true);
      return;
    }
    setIserror(false);
    let payload = {
      email: userDetails?.email,
      password: userDetails?.password,
    };
    userloginAction(payload, setLoading);
  };
  return (
    <SafeAreaView style={[styles.container, iserror && styles.signContainer]}>
      <ImageBackground
        style={styles.container}
        source={require('../../../assets/images/bgimg.png')}>
        <View style={styles.imageView}>
          <Image
            style={styles.tinyLogo}
            source={require('../../../assets/images/login-logo.png')}
          />
        </View>
        {iserror && (
          <View style={styles.errorTitle}>
            <Text style={styles.errorLabel}>
              Email Address or Password are incorrect.
            </Text>
          </View>
        )}

        <View style={styles.inputContainer}>
          <View style={styles.inputTitle}>
            <Text style={styles.label}>Email Address </Text>
            <Text style={styles.star}>*</Text>
          </View>
          <TextInput
            style={[styles.input, iserror && styles.inputError]}
            onChangeText={value => {
              if (value) {
                setIserror(false);
              }
              setUserDetails({
                ...userDetails,
                email: value.replace(/\s/g, ''),
              });
            }}
            value={userDetails?.email}
            placeholder="Enter your email"
            keyboardType="email-address"
            onSubmitEditing={() => Keyboard.dismiss()}
          />
          <View style={styles.inputTitle}>
            <Text style={styles.label}>Password </Text>
            <Text style={styles.star}>*</Text>
          </View>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={[styles.input, iserror && styles.inputError]}
              onChangeText={value => {
                if (value) {
                  setIserror(false);
                }
                setUserDetails({
                  ...userDetails,
                  password: value.replace(/\s/g, ''),
                });
              }}
              value={userDetails?.password}
              placeholder="Enter your password"
              secureTextEntry={true}
              onSubmitEditing={() => Keyboard.dismiss()}
            />
          </View>
        </View>

        <Buttons
          name={'SIGN IN'}
          loaderColor={darkColors.white}
          needLoading={loading}
          disabled={loading}
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
          onPress={() => navigation.replace('ForgotPassword')}>
          <Text style={styles.forgotText}>Forgot your password?</Text>
        </TouchableOpacity>

        <View style={styles.signUpDiv}>
          <Text style={[styles.signUpText, iserror && styles.signUpErrorText]}>
            Looking to Sign up?
          </Text>
          <Text style={styles.signUpInfo}>
            SplitSum's full features are not yet available in the app. Visit the
            website to sign up for an account.
          </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default Login;
