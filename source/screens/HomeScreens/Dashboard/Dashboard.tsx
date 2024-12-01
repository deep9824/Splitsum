import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Linking,
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
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import {useStripeTerminal} from '@stripe/stripe-terminal-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {axiosInstance} from '../../../config/setupAxios';
import {endPoint} from '../../../utils/commonUtils';
import Spinner from 'react-native-loading-spinner-overlay';

interface LocationItem {
  label: string;
  value: string;
  [key: string]: any;
}

const Dashboard = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [cardReaders, setCardReaders] = useState<any>(null);
  const [loadingConnectingReader, setLoadingConnectingReader] = useState(false);
  const [tapToPayEnable, setTapToPayEnable] = useState(false);
  const [locationMockID, setLocationMockID] = useState<string>('');
  const [locationList, setLocationList] = useState<LocationItem[]>([]);
  const [open, setOpen] = useState(false);
  const {signoutAction}: any = React.useContext(AuthContext);

  const {discoverReaders, connectLocalMobileReader, disconnectReader} =
    useStripeTerminal({
      onUpdateDiscoveredReaders: async readers => {
        if (readers && readers?.length > 0) {
          const dataRead = readers[0];
          const readerData: any = JSON.stringify(dataRead);
          setCardReaders(readerData);
          await AsyncStorage.setItem('cardReaders', JSON.stringify(dataRead));
        }
      },
    });
  useEffect(() => {
    const fetchLocationList = async () => {
      setLoadingConnectingReader(true);
      const locationId: any = await AsyncStorage.getItem('locationMockID');
      if (locationId) {
        setLocationList([]);
        setTimeout(() => {
          setLocationMockID(locationId);
        }, 5000);
        setLoadingConnectingReader(false);
        return;
      }
      axiosInstance
        .get(endPoint.fetchLocationList)
        .then(res => {
          if (res.data.status == 'success') {
            if (res.data.data?.length > 0) {
              setLocationList(
                res.data.data.map((item: any) => ({
                  ...item,
                  label: item.name,
                  value: item.stripe_location_id,
                })),
              );
            } else {
              setLocationList([]);
            }
            setLoadingConnectingReader(false);
          }
        })
        .catch(error => {
          console.log(error);
          setLoadingConnectingReader(false);
        });
    };

    fetchLocationList();
  }, []),
    useEffect(() => {
      setLoadingConnectingReader(true);
      discoverReaders({
        discoveryMethod: 'localMobile',
        simulated: true,
      });
      setLoadingConnectingReader(false);
    }, [discoverReaders]);

  useEffect(() => {
    handleReader();
  }, [locationMockID]);

  const handleReader = async () => {
    const readerData = cardReaders && JSON.parse(cardReaders);
    setTapToPayEnable(true);
    disconnectReader();
    connectReader(readerData);
  };

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
      setLoadingConnectingReader(false);
    } catch (error) {
      setLoadingConnectingReader(false);
    }
  };

  return (
    <SafeAreaView style={styles.maincontainer}>
      <Header />
      <View style={styles.container}>
        {locationList?.length > 0 ? (
          <View style={styles.dropDown}>
            <Text style={styles.paymentTitle}>Location</Text>
            <DropDownPicker
              open={open}
              style={styles.paymentInput}
              value={locationMockID}
              placeholderStyle={styles.placeholder}
              textStyle={styles.placeholder}
              dropDownContainerStyle={{marginTop: responsiveHeight(2)}}
              items={locationList}
              setOpen={setOpen}
              setValue={setLocationMockID}
              placeholder="Select Location"
            />
          </View>
        ) : null}
        {locationMockID && tapToPayEnable && (
          <View style={styles.addMore}>
            <TouchableOpacity
              style={styles.paymentBox}
              onPress={() => {
                navigation.navigate('Payment', {
                  locationMockID: locationMockID,
                });
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
                  source={require('../../../assets/images/nfc.png')}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Buttons
        name={'LOG OUT'}
        loaderColor={darkColors.white}
        buttonTextColor={lightColors.black}
        backgroundColor={lightColors.green}
        position={'absolute'}
        bottom={responsiveHeight(3)}
        onPress={() => {
          signoutAction();
          disconnectReader();
        }}
        width={responsiveWidth(90)}
      />
      <Spinner
        visible={loadingConnectingReader}
        color={lightColors.blue}
        size="large"
      />
    </SafeAreaView>
  );
};
export default Dashboard;
