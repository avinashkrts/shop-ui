import React, { Component } from 'react';
import { StyleSheet, Alert } from 'react-native';
import {
  Divider,
  Layout,
  Text,
  Avatar,
  Button,
  Input
} from 'react-native-ui-kitten';
// import { ProfileScreenProps } from '../../navigation/home.navigator';
import { Toolbar } from '../../components/toolbar.component';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';
import { AppConstants } from '../../constants/AppConstants';
import { Separator, Container, Content, View, Footer, FooterTab, Form, Picker, Icon } from 'native-base';
import Axios from 'axios';
import { LabelConstants } from '../../constants/LabelConstants';
import { AsyncStorage } from 'react-native';
import { AppNavigator } from '../../navigation/app.navigator';
import { AppRoute } from '../../navigation/app-routes';
import { SignInScreen } from '.'
import { LogoutScreenProps } from '../../navigation/auth.navigator';
import { StackActions } from '@react-navigation/core';
import DeviceInfo from 'react-native-device-info';

type Mystate = {

}
// const prop = (props: AboutScreenProps):
export class LogoutScreen extends Component<LogoutScreenProps & SafeAreaLayoutElement & any, Mystate & any> {
  constructor(props) {
    super(props)
    this.state = {}


  }

  async componentDidMount() {
    let deviceId = DeviceInfo.getUniqueId();
    const data = {};
    var emailId;
    const pushAction = StackActions.push(AppRoute.AUTH);
    let userDetail = await AsyncStorage.getItem('userDetail');
    let userData = JSON.parse(userDetail);
    var admin = await AsyncStorage.getItem('adminType')
    var customer = await AsyncStorage.getItem('customerType')
    if (userData.userType == admin) {
      emailId = userData.emailId;
    } else if (userData.userType == customer) {
      emailId = userData.mobileNo;
    }
    Axios({
      method: 'POST',
      url: AppConstants.API_BASE_URL + '/api/user/logout',
      data: {
        emailId: emailId,
        deviceId: deviceId,
      }
    }).then((response) => {
      AsyncStorage.setItem('logedIn', JSON.stringify(''))
      AsyncStorage.setItem('userId', JSON.stringify(''))
      AsyncStorage.setItem('userDetail', JSON.stringify(data), () => {
        this.props.navigation.dispatch(pushAction)
      });
    }, (error) => {
      Alert.alert("Server error!.")
    });

  }

  render() {
    return (
      <View>

      </View>
    )
  }
}