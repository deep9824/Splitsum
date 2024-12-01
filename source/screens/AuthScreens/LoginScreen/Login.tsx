import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Keyboard,
  Linking,
  PermissionsAndroid,
  Platform,
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
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import NfcManager from 'react-native-nfc-manager';

const Login = () => {
  const navigation: any = useNavigation();
  const {userloginAction}: any = React.useContext(AuthContext);
  const [userDetails, setUserDetails]: any = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [userAccessLocation, setUserAccessLocation] = useState(false);
  const [userAccessNfc, setuserAcessNfc] = useState(false);

  const [iserror, setIserror] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setUserDetails({...userDetails, email: '', password: ''});
      setIserror(false);
    }, [navigation]),
  );

  const checkAndEnablePermissions = async () => {
    try {
      // Android or iOS NFC Check
      const nfcSupported = await NfcManager.isSupported();
      if (nfcSupported) {
        const nfcEnabled: any = await NfcManager.isEnabled();
        if (!nfcEnabled) {
          Alert.alert(
            'NFC Disabled',
            'Please enable NFC in your device settings.',
            [
              {text: 'Cancel', style: 'cancel'},
              {text: 'Open Settings', onPress: () => Linking.openSettings()},
            ],
          );
        } else {
          setuserAcessNfc(true);
        }
      } else {
        Alert.alert('NFC Not Supported', 'Your device does not support NFC.');
      }

      // Location Permission
      if (Platform.OS === 'android') {
        const locationGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'Stripe Terminal needs access to your location.',
            buttonPositive: 'Accept',
          },
        );

        if (locationGranted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Location Permission Denied',
            'Location services are required to connect to a reader.',
            [
              {text: 'Cancel', style: 'cancel'},
              {text: 'Open Settings', onPress: () => Linking.openSettings()},
            ],
          );
        } else {
          setUserAccessLocation(true);
        }
      } else if (Platform.OS === 'ios') {
        const locationStatus = await check(
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        );
        if (locationStatus === RESULTS.GRANTED) {
          setUserAccessLocation(true);
        } else if (locationStatus === RESULTS.DENIED) {
          const requestStatus = await request(
            PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          );
          if (requestStatus !== RESULTS.GRANTED) {
            Alert.alert(
              'Location Permission Denied',
              'Location services are required to connect to a reader.',
              [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Open Settings', onPress: () => Linking.openSettings()},
              ],
            );
          }
        } else if (locationStatus === RESULTS.BLOCKED) {
          Alert.alert(
            'Permission Blocked',
            'Please enable location services in Settings.',
            [
              {text: 'Cancel', style: 'cancel'},
              {text: 'Open Settings', onPress: () => Linking.openSettings()},
            ],
          );
        }
      }
    } catch (error) {
      console.error('Error checking permissions:', error);
    }
  };
  useEffect(() => {
    if (!userAccessLocation || !userAccessNfc) {
      checkAndEnablePermissions();
    }
  }, [userAccessLocation,userAccessNfc]);
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
