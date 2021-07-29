import React, { Component } from 'react';
import { View, Alert, Image, Text, } from 'react-native';
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

interface State {
  email: string | undefined;
  password: string | undefined;
  token: string | undefined;
}

export class SignInScreen extends Component<SignInScreenProps, any & State & any> {
  constructor(props) {
    super(props);

    this.state = {
      emailId: '7677256089',
      pwd: 'Milaan@123',
      passwordVisible: true,
      allUserType: [],
      deviceId: '',
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onPasswordIconPress = this.onPasswordIconPress.bind(this);
    this.navigateCustomerHome = this.navigateCustomerHome.bind(this);
    this.navigateHome = this.navigateHome.bind(this);
    this.navigateINFORMATION = this.navigateINFORMATION.bind(this);
    this.navigateSignUp = this.navigateSignUp.bind(this);
  }


  componentDidMount() {
    let deviceId = DeviceInfo.getUniqueId();
    axios({
      method: 'GET',
      url: AppConstants.API_BASE_URL + '/api/lookup/getallusertype',
    }).then((response) => {
      console.log('LookUp', response.data);
      this.setState({
        allUserType: response.data,
        deviceId: deviceId
      })
    },
      (error) => {
        Alert.alert("Didn't got data from server")
      });
  }
  onFormSubmit() {
    const { emailId, pwd, allUserType, deviceId } = this.state
    if (emailId == null || emailId === '') {
      Alert.alert("Please enter Email Id.");
    } else if (pwd == null || pwd === '') {
      Alert.alert("Please enter Password.");
    } else {
      axios({
        method: 'POST',
        url: AppConstants.API_BASE_URL + '/api/user/login',
        data: {
          "emailId": emailId,
          "pwd": base64.encode(pwd),
          "deviceId": deviceId,
        },
      }).then((response) => {
        if (response.data) {
          if (response.data.token.length >= 30) {
            allUserType.map((data, index) => {
              if (response.data.userType == data.lookUpId) {
                console.log('LookUp Name', data.lookUpName)
                if (data.lookUpName == 'ADMIN') {
                  AsyncStorage.setItem("logedIn", JSON.stringify(true))
                  AsyncStorage.setItem('adminType', JSON.stringify(data.lookUpId));
                  AsyncStorage.setItem('userDetail', JSON.stringify(response.data), () => {
                    this.navigateHome();
                  })
                } else if (data.lookUpName == 'CUSTOMER') {
                  AsyncStorage.setItem("logedIn", JSON.stringify(true))
                  AsyncStorage.setItem('customerType', JSON.stringify(data.lookUpId));
                  AsyncStorage.setItem('userDetail', JSON.stringify(response.data), () => {
                    this.navigateCustomerHome();
                  })
                }
              }
            })

          }
        } else {
          Alert.alert("Please enter a valid email ID and password.")
        }
      }, (error) => {
        Alert.alert("Server error.")
      });
    }
  };

  navigateHome() {
    this.props.navigation.navigate(AppRoute.HOME);
  };

  navigateCustomerHome() {
    this.props.navigation.navigate(AppRoute.CUSTOMER_HOME);
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
    const { emailId, pwd } = this.state;
    return (
      <SafeAreaLayout
        style={Styles.safeArea}
        insets={SaveAreaInset.TOP} >
        < Content style={Styles.content} >
          <View>
            <Image
              source={require('../../assets/logo.png')}
              resizeMode="contain"
              style={Styles.loginImage}
            />

            <View style={Styles.center}>
              <Text style={Styles.loginWelcome}>{LableText.WELCOME_TEXT}</Text>
            </View>

            <View style={Styles.inputTextView}>
              <TextInput
                style={Styles.inputText}
                placeholder={Placeholder.PHONE}
                value={emailId}
                onChangeText={(value) => { this.setState({ emailId: value }) }}
              />
            </View>

            <View style={Styles.inputTextView}>
              <TextInput
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

          </View>
          <View style={Styles.bottomSpace}></View>
        </Content>

      </SafeAreaLayout >
    );
  }
};

