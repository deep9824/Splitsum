import React, {useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
  StyleSheet,
  Alert,
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
import {styles} from './PaymentScreenstyles';
import {useStripeTerminal} from '@stripe/stripe-terminal-react-native';
import {axiosInstance} from '../../../config/setupAxios';
import {endPoint, showToast} from '../../../utils/commonUtils';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaymentScreen = ({route}:any) => {
  const params=route.params;
  const locationMockID=params.locationMockID
  
  const navigation: any = useNavigation();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('Test');
  const [contractorAccount, setContractorAccount] = useState('');
  const [paymentLoader, setPaymentLoader] = useState(false);
  const handleReader = (getData: any) => {
    if (getData) {
      const dataRead = getData[0];
      // setCardReaders(JSON.stringify(dataRead));
      // setItem('cardReaders', getData[0]);
    }
  };
  const {collectPaymentMethod, confirmPaymentIntent, retrievePaymentIntent} =
    useStripeTerminal({
      onUpdateDiscoveredReaders: readers => {
        if (readers && readers.length > 0) {
          handleReader(readers);
        }
      },
      onDidRequestReaderInput: options => {
        // Placeholder for updating your app's checkout UI
      },
      onDidRequestReaderDisplayMessage: message => {},
    });
  const handlePaymentIntent = async () => {
    try {
      setTimeout(() => {
        paymentIntentMethod();
      }, 1000);
    } catch (err) {
      console.log(err);
      setPaymentLoader(false);
    } finally {
      setPaymentLoader(false);
    }
  };
  async function paymentIntentMethod() {
    setPaymentLoader(true);
    let payload = {
      description: description,
      amount: amount,
      connect_id: contractorAccount,
    };
    try {
      axiosInstance
        .post(endPoint.paymentCreate, payload)
        .then(res => {
          if (res.data.status == 'success') {
            retrievePayment(res.data.data.client_secret);
          }
        })
        .catch(error => {
          console.log(error);
          setPaymentLoader(false);
        });
    } catch (error) {
      console.log(error);
      setPaymentLoader(false);
    }
  }

  async function retrievePayment(clientSecret: any) {
    try {
      let {paymentIntent, error} = await retrievePaymentIntent(clientSecret);

      if (error) {
        console.log('Error collecting payment', error);
        setPaymentLoader(false);
        return;
      } else {
        collectPayment(paymentIntent);
        return;
      }
    } catch (error) {
      console.log('Error retrieving payment intent:', error);
      setPaymentLoader(false);
    }
  }

  async function collectPayment(paymentCP: any) {
    try {
      const {error, paymentIntent} = await collectPaymentMethod({
        paymentIntent: paymentCP,
      });

      if (error) {
        console.log(error);
        setPaymentLoader(false);
        Alert.alert('Error collecting payment', error?.message);
        return;
      }
      Alert.alert('Payment successfully collected', '', [
        {
          text: 'Ok',
          onPress: async () => {
            await AsyncStorage.setItem('locationMockID',locationMockID);
            await confirmPayment(paymentIntent);
            setPaymentLoader(false);
            
          },
        },
      ]);
    } catch (error) {
      console.log('Error collecting payment method:', error);
      setPaymentLoader(false);
    }
  }

  async function confirmPayment(payment: any) {
    try {
      let {error, paymentIntent} = await confirmPaymentIntent({
        paymentIntent: payment,
      });

      if (error) {
        setPaymentLoader(false);
        Alert.alert('Error confirming payment', error.message);
        console.log('Error confirm payment', error);
        navigation.goBack();
        return;
      }
      Alert.alert('Payment successfully confirmed!', 'Congratulations');
      setPaymentLoader(false);
    } catch (error) {
      console.log('Error confirming payment:', error);
    } finally {
      setPaymentLoader(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
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
      <Text style={styles.title}>Add Tap to Pay Payment</Text>
      <View>
        <Text style={styles.amountLabel}>Enter Amount :</Text>
        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>£</Text>
          <TextInput
            maxLength={5}
            multiline={false}
            placeholder="00"
            keyboardType="numeric"
            style={styles.amountInput}
            onChangeText={(value: any) => {
              setAmount(value?.toString());
            }}
          />
        </View>
      </View>

      {/* Send Payment Button */}
      <Buttons
        name="SEND PAYMENT"
        loaderColor={darkColors.white}
        needLoading={paymentLoader}
        disabled={paymentLoader}
        buttonTextColor={lightColors.black}
        backgroundColor={lightColors.green}
        position="absolute"
        bottom={responsiveHeight(10)}
        onPress={() => {
          if (amount) {
            handlePaymentIntent();
          } else {
            showToast('Please add amount.');
          }
        }}
        width={responsiveWidth(90)}
      />

      {/* Cancel Button */}
      <Pressable
        style={styles.cancelButtonContainer}
        onPress={() => navigation.goBack()}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </Pressable>
      <Spinner visible={paymentLoader} color={lightColors.blue} size="large" />
    </SafeAreaView>
  );
};

export default PaymentScreen;
