import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Buttons from '../../../components/Button';
import {
  darkColors,
  lightColors,
  responsiveHeight,
  responsiveWidth,
} from '../../../styles/variables';
import {AuthContext} from '../../../utils/authContext';
import Header from '../../../components/Header';
import {styles} from './Dashboardstyles';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import {useStripeTerminal} from '@stripe/stripe-terminal-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NfcManager from 'react-native-nfc-manager';
import {axiosInstance} from '../../../config/setupAxios';
import {endPoint} from '../../../utils/commonUtils';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigation: any = useNavigation();
  const [isPressed, setIsPressed] = useState(false);
  const [cardReaders, setCardReaders] = useState();
  const [loadingConnectingReader, setLoadingConnectingReader] = useState(false);
  const [tapToPayEnable, setTapToPayEnable] = useState(false);
  const [locationMockID, setLocationMockID] = useState('');
  const [locationList, setLocationList] = useState([]);
  const [open, setOpen] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const {signoutAction}: any = React.useContext(AuthContext);

  const {
    discoverReaders,
    connectLocalMobileReader,
    connectedReader,
    disconnectReader,
  } = useStripeTerminal({
    onUpdateDiscoveredReaders: async readers => {
      if (readers && readers.length > 0) {
        const dataRead = readers[0];
        const readerData: any = JSON.stringify(dataRead);
        setCardReaders(readerData);
        await AsyncStorage.setItem('cardReaders', JSON.stringify(dataRead));
      }
    },
  });

  useEffect(() => {
    const checkNfcSupport = async () => {
      try {
        const supported = await NfcManager.isSupported();
        console.log(supported, '____________________supported');
        setIsSupported(supported);

        if (!supported) {
          Alert.alert('NFC Not Supported', 'Your device does not support NFC.');
        }
        if (supported) {
          // const result = await check(PERMISSIONS.ANDROID.NFC);
          // console.log(result, 'result');
          // if (result === RESULTS.GRANTED) {
          //   console.log('NFC is enabled');
          // } else {
          //   console.log('NFC is not enabled');
          // }
        }
      } catch (error) {
        console.error('Error checking NFC support:', error);
      }
    };

    checkNfcSupport();
  }, []);

  const handleReader = async () => {
    const readerData = cardReaders && JSON.parse(cardReaders);
    setTapToPayEnable(true);
    disconnectReader();
    connectReader(readerData);
  };

  useEffect(() => {
    handleReader();
  }, [locationMockID]);

  useEffect(() => {
    const fetchLocationList = async () => {
      axiosInstance
        .get(endPoint.fetchLocationList)
        .then(res => {
          console.log('location res', res);

          if (res.data.status == 'success') {
            if (res.data?.length > 0) {
              setLocationList(
                res.data.map(item => ({
                  ...item,
                  label: item.name,
                  value: item.stripe_location_id,
                })),
              );
            } else {
              setLocationList([]);
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    };

    fetchLocationList();
  }, [dispatch]);

  useEffect(() => {
    discoverReaders({
      discoveryMethod: 'localMobile',
      simulated: true,
    });
  }, [discoverReaders]);

  const connectReader = async (cardReaderData: any) => {
    setLoadingConnectingReader(true);
    try {
      disconnectReader();

      cardReaderData.locationId = locationMockID;

      const {error} = await connectLocalMobileReader({
        reader: cardReaderData,
        locationId: locationMockID,
        autoReconnectOnUnexpectedDisconnect: true,
      });
      setTapToPayEnable(true);
      if (error) {
        console.log('connectLocalMobileReader error:', error);
        return;
      }
    } catch (error) {
      setLoadingConnectingReader(false);
    }
  };

  return (
    <SafeAreaView style={styles.maincontainer}>
      <Header />
      <View style={styles.container}>
        <View style={styles.dropDown}>
          <Text style={styles.paymentTitle}>Location</Text>
          <DropDownPicker
            open={open}
            style={styles.paymentInput}
            value={locationMockID}
            placeholderStyle={styles.placeholder}
            textStyle={styles.placeholder}
            items={locationList}
            setOpen={setOpen}
            setValue={setLocationMockID}
            placeholder="Select Location"
          />
        </View>
        {/* add ! here */}
        {locationMockID && tapToPayEnable && (
          <View style={styles.addMore}>
            <TouchableOpacity
              style={styles.paymentBox}
              onPress={() => {
                navigation.navigate('Payment');
              }}
              activeOpacity={1}>
              <View>
                <Text style={[styles.paymentTitle, styles.colorAll]}>
                  Tap to Pay Payment
                </Text>
                <Text style={styles.paymentInfo}>
                  Send a payment to this device.
                </Text>
              </View>
              <View>
                <Image
                  style={styles.paymentLogo}
                  source={require('../../../assets/images/plus.png')}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Buttons
        name={'LOG OUT'}
        loaderColor={darkColors.white}
        needLoading={loading}
        disabled={loading}
        buttonTextColor={lightColors.black}
        backgroundColor={lightColors.green}
        position={'absolute'}
        bottom={responsiveHeight(3)}
        onPress={() => {
          signoutAction();
        }}
        width={responsiveWidth(90)}
      />
    </SafeAreaView>
  );
};
export default Dashboard;
