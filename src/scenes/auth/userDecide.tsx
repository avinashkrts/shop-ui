import React, { Component } from 'react';
import { View, Alert, Image, Text, ActivityIndicator, } from 'react-native';
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
        }
    }

    async componentDidMount() {
        const value = await AsyncStorage.getItem('userDetail');
        const value1 = await AsyncStorage.getItem('adminType');
        const logedIn = await AsyncStorage.getItem('logedIn');
        const value2 = await AsyncStorage.getItem('customerType');
        if (value && (value1 || value2)) {
            const user = JSON.parse(value);
            const admin = Number(JSON.parse(value1));
            const customer = Number(JSON.parse(value2));
            // console.log('UserType' + 'admin: ', admin + "customer", customer)
            console.log('UserType' + 'admin: ', admin + "customer", customer, logedIn)
            if (logedIn === 'true') {
                // console.log('User Type in' + ' admin: ', admin + "customer", customer)    
                const userType = Number(user.userType);
                const token = user.token;
                if (token !== '' && token.length !== null) {
                    if (token.length > 30) {
                        // console.log('User Type in admin:', admin, isAuthorized, isUser, isAdmin, userType )    
                        if (userType == customer) {
                            this.props.navigation.navigate(AppRoute.CUSTOMER_HOME)
                            //   console.log('User Type in customer:' + customer, userType)
                        } else if (userType == admin) {
                            this.props.navigation.navigate(AppRoute.HOME)
                            //   console.log('User Type in admin' + admin, userType)
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
        // const options = {
        //     description: "AppConstants.RAZOR_DESCRIPTION",
        //     image: 'http://ec2-65-0-32-190.ap-south-1.compute.amazonaws.com/shop/61_4_MILAAN661_shop.png',
        //     currency: "INR",
        //     key: 'rzp_test_WHYgLdAAnKqBLN',
        //     amount: 500,
        //     name: 'MILAAN IT',
        //     prefill: {
        //         email: 'admin@milaan.com',
        //         contact: '7903032346',
        //         name: 'Avinash'
        //     },
        //     theme: { color: '#53a20e' }
        // }
        // RazorpayCheckout.open(options).then((data) => {
        //     console.log(data.razorpay_payment_id);
        // })
    }


    render() {
        const { otp } = this.state;
        return (
            // <SafeAreaLayout
            //     style={Styles.safeArea}
            //     insets={SaveAreaInset.TOP} >
            < View style={[Styles.center, { flex: 1 }]} >
                {/* <ActivityIndicator size='large' /> */}
            </ View>
            // </SafeAreaLayout >
        );
    }
};

