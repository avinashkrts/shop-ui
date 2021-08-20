import React, { Component } from 'react';
import { Alert, View, Image, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import { Text } from 'react-native-ui-kitten';
import { SafeAreaLayout, SaveAreaInset, } from '../../components/safe-area-layout.component';
import { Content } from 'native-base';
import { SignUpScreenProps } from '../../navigation/auth.navigator';
import { AppRoute } from '../../navigation/app-routes';
import { EyeIcon, EyeOffIcon, } from '../../assets/icons';
import axios from 'axios';
import { Styles } from '../../assets/styles'
import { AppConstants, Color, LableText, Placeholder } from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { scale } from 'react-native-size-matters';

const data = [
  { text: 'Candidate' },
  { text: 'HR' },
];

type State = {}
export class SignUpScreen extends Component<SignUpScreenProps, any & State, any> {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      mobileNo: '',
      pwd: '',
      userType: '2',
      passwordVisible: true,
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onPasswordIconPress = this.onPasswordIconPress.bind(this);
  }

  componentDidMount() {
    let deviceId = DeviceInfo.getUniqueId();
    axios({
      method: 'GET',
      url: AppConstants.API_BASE_URL + '/api/lookup/getallusertype',
    }).then((response) => {

    }, (error) => {
      Alert.alert("Didn't got data from server")
    });
  }

  onFormSubmit() {
    const { firstName, lastName, userType, pwd, mobileNo } = this.state
    if (firstName === " " || firstName.length === 0) {
      Alert.alert("Enter First Name");
    } else if (lastName === "" || lastName.length === 0) {
      Alert.alert("Enter Last Name");
    } else if (mobileNo === "" || mobileNo.length === 0 || mobileNo.lenght < 10 || mobileNo.length > 10) {
      Alert.alert("Enter Mobile Number");
    } else if (pwd === "" || pwd.length === 0 || pwd.length < 8) {
      Alert.alert("Password Length Must Be More Than 8 Digits");
    } else {
      axios({
        method: 'post',
        url: AppConstants.API_BASE_URL + '/api/user/create/signup',
        data: {
          firstName: firstName,
          lastName: lastName,
          mobileNo: mobileNo,
          pwd: pwd,
          userType: userType,
        }
      }).then((response) => {
        if (response.data.status === "false") {
          Alert.alert(response.data.description);
        } else {
          AsyncStorage.setItem('phoneForOtp', JSON.stringify(mobileNo), () => {
            this.props.navigation.navigate(AppRoute.OTP);
          })
        }
      }, (error) => {
        console.log(error);
      });
    }
  };

  onPasswordIconPress() {
    this.setState({ passwordVisible: !this.state.passwordVisible })
  };

  navigateSignIn() {
    this.props.navigation.navigate(AppRoute.SIGN_IN);
  };

  render() {
    const { firstName,passwordVisible, lastName, mobileNo, pwd } = this.state;
    return (
      <SafeAreaLayout
        style={Styles.safeArea}
        insets={SaveAreaInset.TOP} >
        < Content style={Styles.content} >
          <View>
            <Image
              source={require('../../assets/logo.png')}
              resizeMode="contain"
              style={[Styles.loginImage, {marginBottom: scale(50), marginTop: scale(70)}]}
            />
            {/* <View style={Styles.center}>
              <Text style={[Styles.loginWelcome, { paddingTop: 10 }]}>{LableText.WELCOME_TEXT}</Text>
            </View> */}

            <View style={Styles.inputTextView}>
              <TextInput
                style={Styles.inputText}
                placeholder={Placeholder.FIRSTNAME}
                value={firstName}
                onChangeText={(value) => { this.setState({ firstName: value }) }}
              />
            </View>

            <View style={Styles.inputTextView}>
              <TextInput
                style={Styles.inputText}
                placeholder={Placeholder.LASTNAME}
                value={lastName}
                onChangeText={(value) => { this.setState({ lastName: value }) }}
              />
            </View>

            <View style={Styles.inputTextView}>
              <TextInput
                style={Styles.inputText}
                placeholder={Placeholder.PHONE}
                value={mobileNo}
                onChangeText={(value) => { this.setState({ mobileNo: value }) }}
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
                <Text style={Styles.buttonName}>{LableText.SIGN_UP}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => { this.props.navigation.navigate(AppRoute.SIGN_IN) }}>
              <Text style={[Styles.dontHaveAccount, { marginTop: 5 }]}>{LableText.ALREADY_HAVE_ACCOUNT}</Text>
            </TouchableOpacity>

          </View>
          <View style={Styles.bottomSpace}></View>
        </Content>
      </SafeAreaLayout >
    );
  }
};