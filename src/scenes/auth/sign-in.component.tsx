import React, { Component } from 'react';
import { StyleSheet, View, Alert, Image, Text, } from 'react-native';
import { SignInScreenProps } from '../../navigation/auth.navigator';
import { AppRoute } from '../../navigation/app-routes';
import { LabelConstants, AppConstants, Placeholder, LableText, Color } from '../../constants';
import { EyeIcon, EyeOffIcon, } from '../../assets/icons';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { SafeAreaLayout, SaveAreaInset, } from '../../components/safe-area-layout.component';
import { Content } from 'native-base';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Styles } from '../../assets/styles'

interface State {
  email: string | undefined;
  password: string | undefined;
  token: string | undefined;
}
// const [shouldRemember, setShouldRemember] = React.useState<boolean>(false);
// const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

export class SignInScreen extends Component<SignInScreenProps, any & State & any> {
  constructor(props) {
    super(props);

    this.state = {
      emailId: '',
      pwd: '',
      passwordVisible: true
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onPasswordIconPress = this.onPasswordIconPress.bind(this);
    this.navigateHRHome = this.navigateHRHome.bind(this);
    // this.navigateHRINFORMATION = this.navigateHRINFORMATION.bind(this);
    this.navigateHome = this.navigateHome.bind(this);
    this.navigateINFORMATION = this.navigateINFORMATION.bind(this);
    this.navigateSignUp = this.navigateSignUp.bind(this);
  }



  onFormSubmit() {
    const { emailId, pwd } = this.state

    if (emailId == null || emailId === '') {
      Alert.alert("Please enter Email Id.");
    } else if (pwd == null || pwd === '') {
      Alert.alert("Please enter Password.");
    } else {
    this.navigateHome();

      // axios ({
      //   method: 'POST',
      //   url: 'http://192.168.0.105:8081/api/user/login',
      //   data: {
      //     "emailId": emailId,
      //     "pwd": pwd
      //   },
      // }).then((response) => {
      //   console.log(response.data);
      // }, (error) => {
      //   console.log(error);
      //   Alert.alert("Please enter a valid email ID and password.")
      // });
    }
    // this.navigateHome();
    // this.navigateHRHome();

    // axios({
    //   method: 'post', url: AppConstants.API_BASE_URL + '/api/user/validate',
    //   data: {
    //     emailId: emailId,
    //     pwd: pwd
    //   }
    // }).then((response) => {
    //   this.navigateHRINFORMATION();

    //   //   if (response.data.token.length > 30) {
    //   //     console.log(response.data);
    //   //     // AsyncStorage.setItem('userDetail', JSON.stringify(response.data), () => {
    //   //     //  navigateHome();
    //   //     // });
    //   //     if (response.data.userType == 28) {
    //   //       console.log(response.data);
    //   //       if (response.data.profileCreated === 'false') {
    //   //         AsyncStorage.setItem('userDetail', JSON.stringify(response.data), () => {
    //   //           this.navigateHRINFORMATION();
    //   //         });
    //   //       } else if (response.data.profileCreated === 'true') {
    //   //         AsyncStorage.setItem('userDetail', JSON.stringify(response.data), () => {
    //   //           this.navigateHRHome();
    //   //         });
    //   //       }

    //   //     }

    //   //     else if (response.data.userType == 29) {
    //   //       console.log(response.data);
    //   //       if (response.data.profileCreated === 'false') {
    //   //         AsyncStorage.setItem('userDetail', JSON.stringify(response.data), () => {
    //   //           this.navigateINFORMATION();
    //   //         });
    //   //       } else if (response.data.profileCreated === 'true') {
    //   //         AsyncStorage.setItem('userDetail', JSON.stringify(response.data), () => {
    //   //           this.navigateHome();
    //   //         });
    //   //       }
    //   //     }

    //   //   } else {
    //   //     Alert.alert(LabelConstants.com_alert_invalid_email_or_password);
    //   //   }
    //   // }, (error) => {
    //   //   Alert.alert(LabelConstants.com_alert_error_alert);
    //   //   console.log(error);
    // });

  };

  navigateHome() {
    this.props.navigation.navigate(AppRoute.HOME);
  };

  navigateHRHome() {
    this.props.navigation.navigate(AppRoute.HRHOME);
  };

  navigateINFORMATION() {
    this.props.navigation.navigate(AppRoute.INFORMATION);
  };

  // navigateHRINFORMATION() {
  //   this.props.navigation.navigate(AppRoute.HRINFORMATION);
  // };

  navigateSignUp() {
    this.props.navigation.navigate(AppRoute.SIGN_UP);
  };

  onPasswordIconPress() {
    this.setState({ passwordVisible: !this.state.passwordVisible })
  };

  render() {
    const {emailId, pwd} = this.state;
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
                onChangeText={(value) => {this.setState({emailId: value})}}
              />
            </View>

            <View style={Styles.inputTextView}>
              <TextInput
                style={Styles.inputTextWithIcon}
                placeholder={Placeholder.PASSWORD}
                value={pwd}
                onChangeText={(value) => {this.setState({pwd: value})}}
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

