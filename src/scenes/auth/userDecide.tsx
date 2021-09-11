import React, { Component } from 'react';
import { View, Alert, Image, Text, ActivityIndicator, PermissionsAndroid, } from 'react-native';
import { UserDecideProps } from '../../navigation/userDecide.navigator';
import { AppRoute } from '../../navigation/app-routes';
import { Placeholder, LableText } from '../../constants';
import axios from 'axios';
import { SafeAreaLayout, SaveAreaInset, } from '../../components/safe-area-layout.component';
import { Content } from 'native-base';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Styles } from '../../assets/styles';
import { AsyncStorage } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import RazorpayCheckout from 'react-native-razorpay';
import OneSignal from 'react-native-onesignal';
import Geolocation from '@react-native-community/geolocation';

interface State {
    email: string | undefined;
    password: string | undefined;
    token: string | undefined;
}

export class UserDecide extends Component<UserDecideProps, any & State & any> {
    constructor(props) {
        super(props);

        this.state = {
            mobileNo: '',
            otp: '',
            data: [],
            playerId: '8a6d8667-7422-4bad-b9e6-5d5625f73a96'
        }
    }

    async componentDidMount() {
        const { data, playerId } = this.state;
        OneSignal.setLogLevel(6, 0);
        OneSignal.setAppId("43e3395b-0019-492b-b999-4321444f25ad");

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Milaan Location Permission",
                    message:
                        "Milaan needs access to your Location " +
                        "so you can get your nearest shop.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.getCurrentPosition((position) => {
                    var lat = position.coords.latitude
                    var long = position.coords.longitude
                    AsyncStorage.setItem('latitude', String(lat))
                    AsyncStorage.setItem('longitude', String(long))
                    AsyncStorage.setItem('location', 'Current Location')
                    console.log('location', lat, position.coords.accuracy)
                }, (err) => {

                }, { enableHighAccuracy: true })
            } else {
                console.log("Location permission denied");
            }
        } catch (err) {
            console.warn(err);
        }

        const contents = 'You are first in line';
        // const playerId = '8a6d8667-7422-4bad-b9e6-5d5625f73a96';
        // OneSignal.postNotification(contents, data, playerId);
        const deviceState = await OneSignal.getDeviceState();
        console.log('one signal', deviceState)

        AsyncStorage.setItem('productCount', '0');
        AsyncStorage.setItem('wishCount', '0');
        AsyncStorage.setItem('billCount', '0');
        AsyncStorage.setItem('offerCount', '0');

        const value = await AsyncStorage.getItem('userDetail');
        const value1 = await AsyncStorage.getItem('adminType');
        const logedIn = await AsyncStorage.getItem('logedIn');
        const value2 = await AsyncStorage.getItem('customerType');
        if (value && (value1 || value2)) {
            const user = JSON.parse(value);
            const admin = Number(JSON.parse(value1));
            const customer = Number(JSON.parse(value2));
            console.log('UserType' + 'admin: ', admin + "customer", customer, logedIn)
            if (logedIn === 'true') {
                const userType = Number(user.userType);
                const token = user.token;
                if (token !== '' && token.length !== null) {
                    if (token.length > 30) {
                        if (userType == customer) {
                            this.props.navigation.navigate(AppRoute.CUSTOMER_HOME)
                        } else if (userType == admin) {
                            this.props.navigation.navigate(AppRoute.HOME)
                        } else {
                            this.props.navigation.navigate(AppRoute.CUSTOMER_HOME)
                        }
                    } else {
                        this.props.navigation.navigate(AppRoute.CUSTOMER_HOME)
                    }
                } else {
                    this.props.navigation.navigate(AppRoute.CUSTOMER_HOME)
                }
            } else {
                this.props.navigation.navigate(AppRoute.CUSTOMER_HOME)
            }
        } else {
            this.props.navigation.navigate(AppRoute.CUSTOMER_HOME)
        }

        SplashScreen.hide();
    }


    render() {
        const { otp } = this.state;
        return (
            < View style={[Styles.center, { flex: 1 }]} >
            </ View>
        );
    }
};

