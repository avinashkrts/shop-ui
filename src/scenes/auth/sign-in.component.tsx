import React, { Component } from 'react';
import { View, Alert, Image, Text, PermissionsAndroid } from 'react-native';
import { SignInScreenProps } from '../../navigation/auth.navigator';
import { AppRoute } from '../../navigation/app-routes';
import { Placeholder, LableText, Color, AppConstants } from '../../constants';
import { EyeIcon, EyeOffIcon, } from '../../assets/icons';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { SafeAreaLayout, SaveAreaInset, } from '../../components/safe-area-layout.component';
import { Content } from 'native-base';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Styles } from '../../assets/styles'
import DeviceInfo from 'react-native-device-info';
import base64 from 'react-native-base64'
import OneSignal from 'react-native-onesignal';
import { StackActions } from '@react-navigation/core';
import { scale } from 'react-native-size-matters';
import Geolocation from 'react-native-geolocation-service';

interface State {
  email: string | undefined;
  password: string | undefined;
  token: string | undefined;
}

export class SignInScreen extends Component<SignInScreenProps, any & State & any> {
  constructor(props) {
    super(props);

    this.state = {
      emailId: 'v23@milaan.com',
      pwd: 'Milaan@v2',
      passwordVisible: true,
      allUserType: [],
      deviceId: '',
      admin: '',
      customer: '',
      regImage: '',
      regAddress: '',
      regCompleted: ''
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onPasswordIconPress = this.onPasswordIconPress.bind(this);
    this.navigateCustomerHome = this.navigateCustomerHome.bind(this);
    this.navigateHome = this.navigateHome.bind(this);
    this.navigateINFORMATION = this.navigateINFORMATION.bind(this);
    this.navigateSignUp = this.navigateSignUp.bind(this);
  }


  async componentDidMount() {
    let deviceId = DeviceInfo.getUniqueId();
    OneSignal.setAppId("43e3395b-0019-492b-b999-4321444f25ad");
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Sone Biryani Location Permission",
          message:
            "Sone Biryani needs access to your Location " +
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
          // console.log('location', lat, position.coords.accuracy)
        }, (err) => {

        }, { enableHighAccuracy: true })
      } else {
        console.log("Location permission denied");
        Alert.alert("Please give location permition to use this application.")
      }
    } catch (err) {
      console.warn(err);
    }

    axios({
      method: 'GET',
      url: AppConstants.API_BASE_URL + '/api/lookup/getalllookup',
    }).then((response) => {

      response.data.USER_TYPE.map((data, index) => {
        if (data.lookUpName === 'ADMIN') {
          AsyncStorage.setItem('adminType', JSON.stringify(data.lookUpId));
          this.setState({
            allUserType: response.data.USER_TYPE,
            deviceId: deviceId,
            admin: data.lookUpId
          })
        } else if (data.lookUpName === 'CUSTOMER') {
          AsyncStorage.setItem('customerType', JSON.stringify(data.lookUpId));
          this.setState({
            allUserType: response.data.USER_TYPE,
            deviceId: deviceId,
            customer: data.lookUpId
          })
        }
      })

      // response.data.REGISTRATION_STATUS.map((data, index) => {
      //   if (data.lookUpName === 'REG_ADDRESS') {
      //     this.setState({
      //       regAddress: data.lookUpId
      //     })
      //   } else if (data.lookUpName === 'REG_IMAGE') {
      //     this.setState({
      //       regImage: data.lookUpId
      //     })
      //   } else if (data.lookUpName === 'REG_COMPLETED') {
      //     this.setState({
      //       regCompleted: data.lookUpId
      //     })
      //   }
      // })

    }, (error) => {
      Alert.alert("Didn't got data from server")
    });
  }

  async onFormSubmit() {
    const { emailId, pwd, admin, customer, allUserType, regAddress, regImage, regCompleted } = this.state
    const deviceState = await OneSignal.getDeviceState();
    let deviceId = DeviceInfo.getUniqueId();
    // console.log('Res', emailId, pwd, deviceId, deviceState.userId)

    if (emailId == null || emailId === '') {
      Alert.alert("Please enter Email Id.");
    } else if (pwd == null || pwd === '') {
      Alert.alert("Please enter Password.");
    } else {
      axios({
        method: 'POST',
        url: AppConstants.API_BASE_URL + '/api/user/login',
        data: {
          emailId: emailId,
          pwd: base64.encode(pwd),
          deviceId: deviceId,
          playerId: deviceState.userId,
          shopId: AppConstants.SHOP_ID
        },
      }).then((response) => {
        // console.log('Res', response.data)
        if (response.data) {
          // console.log('ssssss', response.data);
          // console.log('Resdddd', response.data)

          if (response.data.status === 'false') {
            // console.log('ssssss', response.data);

            Alert.alert("Please enter a valid email ID and password.")
          } else {
            if (response.data.token && response.data.token.length > 30) {
              // console.log('Resdddd', response.data)
              if (response.data.shopId === 'MILAAN63') {
                // console.log('Resdddd', response.data)        
                if (response.data.userType == admin) {
                  AsyncStorage.setItem("logedIn", JSON.stringify(true))
                  AsyncStorage.setItem("userId", JSON.stringify(response.data.adminId))
                  AsyncStorage.setItem('userDetail', JSON.stringify(response.data), () => {
                    this.navigateHome();
                  })
                } else if (response.data.userType == customer) {
                  AsyncStorage.setItem("logedIn", JSON.stringify(true))
                  AsyncStorage.setItem("userId", JSON.stringify(response.data.userId))
                  AsyncStorage.setItem('userDetail', JSON.stringify(response.data), () => {
                    this.navigateCustomerHome();
                  })
                }
              } else {
                Alert.alert("Please enter a valid email ID and password.")
              }
            } else {
              Alert.alert("Please enter a valid email ID and password.")
            }
          }
        } else {
          Alert.alert("Please enter a valid email ID and password.")
        }
      }, (error) => {
        Alert.alert("Please enter a valid email ID and password.")
      });
    }
  };

  navigateHome() {
    const pushAction = StackActions.push(AppRoute.HOME);
    this.props.navigation.dispatch(pushAction);
  };

  navigateCustomerHome() {
    const pushAction = StackActions.push(AppRoute.CUSTOMER_HOME);
    this.props.navigation.dispatch(pushAction);
  };

  navigateINFORMATION() {
    this.props.navigation.navigate(AppRoute.INFORMATION);
  };

  navigateSignUp() {
    this.props.navigation.navigate(AppRoute.SIGN_UP);
  };

  onPasswordIconPress() {
    this.setState({ passwordVisible: !this.state.passwordVisible })
  };

  render() {
    const { emailId, passwordVisible, pwd } = this.state;
    return (
      <SafeAreaLayout
        style={Styles.safeArea}
        insets={SaveAreaInset.TOP} >
        < Content style={[Styles.content, { backgroundColor: '#e6e6e6' }]} >
          <View>
            <Image
              source={require('../../assets/logo.png')}
              resizeMode="contain"
              style={[Styles.loginImage, { marginBottom: scale(50), marginTop: scale(80) }]}
            />

            {/* <View style={Styles.center}>
              <Text style={Styles.loginWelcome}>{LableText.WELCOME_TEXT}</Text>
            </View> */}

            <View style={Styles.inputTextView}>
              <TextInput
                style={Styles.inputText}
                placeholder={Placeholder.PHONE_EMAIL}
                value={emailId}
                onChangeText={(value) => { this.setState({ emailId: value }) }}
              />
            </View>

            <View style={Styles.inputTextView}>
              <TextInput
                secureTextEntry={passwordVisible}
                style={Styles.inputTextWithIcon}
                placeholder={Placeholder.PASSWORD}
                value={pwd}
                onChangeText={(value) => { this.setState({ pwd: value }) }}
              />
              <View style={[Styles.inputTextIcon, Styles.center]}>
                {this.state.passwordVisible ?
                  <TouchableOpacity onPress={this.onPasswordIconPress}>
                    <Text style={{ color: Color.COLOR }}> <EyeOffIcon /></Text>
                  </TouchableOpacity> :
                  <TouchableOpacity onPress={this.onPasswordIconPress}>
                    <Text style={{ color: Color.COLOR }}> <EyeIcon /> </Text>
                  </TouchableOpacity>
                }
              </View>
            </View>

            <View style={{ marginHorizontal: '10%' }}>
              <TouchableOpacity style={[Styles.buttonBox, Styles.center]} onPress={() => { this.onFormSubmit() }}>
                <Text style={Styles.buttonName}>{LableText.SIGN_IN}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => { this.props.navigation.navigate(AppRoute.FORGET_PASSWORD) }}>
              <Text style={Styles.forgotPassword}>{LableText.FORGOT_PASSWORD}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { this.props.navigation.navigate(AppRoute.SIGN_UP) }}>
              <Text style={Styles.dontHaveAccount}>{LableText.DONT_HAVE_ACCOUNT}</Text>
            </TouchableOpacity>

            <View style={{ marginHorizontal: '10%' }}>
              <TouchableOpacity style={[Styles.skip_buttonBox, Styles.center]} onPress={() => { this.navigateCustomerHome() }}>
                <Text style={Styles.skip_buttonName}>{LableText.SKIP_LOGIN}</Text>
              </TouchableOpacity>
            </View>

          </View>
          <View style={Styles.bottomSpace}></View>
        </Content>

      </SafeAreaLayout >
    );
  }
};

