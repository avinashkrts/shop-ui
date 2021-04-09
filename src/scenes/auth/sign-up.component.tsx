import React, { Component } from 'react';
import {
  ImageBackground,
  StyleSheet, Alert,
  KeyboardAvoidingView, View, Image, TextInput, TouchableOpacity, AsyncStorage
} from 'react-native';
import {
  EdgeInsets,
  useSafeArea,
} from 'react-native-safe-area-context';
import {
  Formik,
  FormikProps,
} from 'formik';
import {
  Button,
  Layout, Select,
  LayoutElement,
  Text,
} from 'react-native-ui-kitten';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';
import { Item, Picker, Form, Icon, Content, List, ListItem } from 'native-base';
import { SignUpScreenProps } from '../../navigation/auth.navigator';
import { AppRoute } from '../../navigation/app-routes';
import { Toolbar } from '../../components/toolbar.component';
import { FormInput } from '../../components/form-input.component';
import {
  SignUpData,
  SignUpSchema,
} from '../../data/sign-up.model';
import {
  EyeIcon,
  EyeOffIcon,
} from '../../assets/icons';
import axios from 'axios';
import { Styles } from '../../assets/styles'
import { AppConstants, Color, LableText, Placeholder } from '../../constants';
const data = [
  { text: 'Candidate' },
  { text: 'HR' },
];
import DeviceInfo from 'react-native-device-info';
// const useSelectChanges = (initialSelection = null) => {
//   const [selectedOption, setSelectedOption] = React.useState(initialSelection);
//   return {
//     selectedOption,
//     onSelect: setSelectedOption,
//   };
// };

// const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
// const insets: EdgeInsets = useSafeArea();
// const largeSelectChanges = useSelectChanges();

type State = {}
export class SignUpScreen extends Component<SignUpScreenProps, any & State, any> {
  constructor(props) {
    super(props);

    this.state = {
      firstName: 'Aniket ',
      lastName: 'Kumar',
      mobileNo: '9835664127',
      pwd: 'MilaanITProjects',
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
      url: 'http://192.168.0.106:8091/api/lookup/getallusertype',
    }).then((response) => {
      // this.setState({ userType: response.data. })
    }, 
    (error) => {
      Alert.alert("Didn't got data from server")
    });
  }

  onFormSubmit() {
    const { firstName, lastName, userType, pwd, mobileNo } = this.state
    //this.props.navigation.navigate(AppRoute.OTP);



    // let userName = values.username.split(" ", 2);
    // let userRole = largeSelectChanges.selectedOption != undefined && largeSelectChanges.selectedOption.text === 'HR' ? 28 :  29;
    //  console.log('User Role',userRole)
    if (firstName === " " || firstName.length === 0) {
      Alert.alert("Enter First Name");
    } else if (lastName === "" || lastName.length === 0) {
      Alert.alert("Enter Last Name");
    } else if (mobileNo === "" || mobileNo.length === 0 || mobileNo.lenght < 10 || mobileNo.length > 10) {
      Alert.alert("Enter Mobile Number");
    } else if (pwd === "" || pwd.length === 0 || pwd.length < 8) {
      Alert.alert("Password Length Must Be More Than 8 Digits");
    } else {

    //  console.log('User Role',firstName, lastName, mobileNo, pwd, userType)

      // this.props.navigation.navigate(AppRoute.OTP);

      axios({
        method: 'post',
        url: 'http://192.168.0.106:8091/api/user/create/signup',
        data: {
          firstName: firstName,
          lastName: lastName,
          mobileNo: mobileNo,
          pwd: pwd,
          userType: userType,
        }
      }).then((response) => {
          // this.props.navigation.navigate(AppRoute.OTP);

        if (response.data.status === "false") {
          Alert.alert(response.data.description);
        } else {
          AsyncStorage.setItem('phoneForOtp', JSON.stringify(mobileNo), () => {        
          this.props.navigation.navigate(AppRoute.OTP);
          })
        }

        //   this.props.navigation.navigate('Login');
        //  alert("SignUp Successfull \n"+"\nLogin With Your Credential");

      }, (error) => {
        console.log(error);
      });
      //   // Alert.alert("SignUp Successfull Login With Your Credential");
      //   // navigateHome();
    }
  };

  onPasswordIconPress() {
    this.setState({ passwordVisible: !this.state.passwordVisible })
  };

  // const navigateHome = (): void => {
  //   props.navigation.navigate(AppRoute.HOME);
  // };

  navigateSignIn() {
    this.props.navigation.navigate(AppRoute.SIGN_IN);
  };

  // const onPasswordIconPress = (): void => {
  //   setPasswordVisible(!passwordVisible);
  // };


  // const renderForm = (props: FormikProps<SignUpData>): React.ReactFragment => (
  //   <KeyboardAvoidingView style={styles.container} enabled>
  //     <React.Fragment>
  //       <ImageBackground
  //         style={[styles.appBar, { paddingTop: insets.top }]}
  //         source={require('../../assets/image-background.jpeg')}>

  //       </ImageBackground>
  //       <FormInput
  //         padding={0}
  //         id='email'
  //         style={styles.formControl}
  //         placeholder='Email'
  //         keyboardType='email-address'
  //       />
  //       <FormInput
  //         padding={0}
  //         id='password'
  //         style={styles.formControl}
  //         placeholder='Password'
  //         secureTextEntry={!passwordVisible}
  //         icon={passwordVisible ? EyeIcon : EyeOffIcon}
  //         onIconPress={onPasswordIconPress}
  //       />
  //       <FormInput
  //         padding={0}
  //         id='firstName'
  //         style={styles.formControl}
  //         placeholder='First Name'
  //       />
  //       <FormInput
  //         padding={0}
  //         id='lastName'
  //         style={styles.formControl}
  //         placeholder='Last Name'
  //       />
  //       <Select
  //         style={styles.select}
  //         data={data}
  //         size='large'
  //         placeholder='Candidate'
  //         {...largeSelectChanges}
  //       />
  //       <Button
  //         style={styles.submitButton}
  //         onPress={props.handleSubmit}>
  //         SIGN UP
  //     </Button><Button
  //         style={styles.haveAccountButton}
  //         appearance='ghost'
  //         status='basic'
  //         onPress={navigateSignIn}>
  //         Already have an account?
  //       </Button>
  //       <View style={{ height: 100 }}></View>

  //     </React.Fragment>
  //   </KeyboardAvoidingView>
  // );

  render() {
    const { firstName, lastName, mobileNo, pwd } = this.state;
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
              <Text style={[Styles.loginWelcome, { paddingTop: 10 }]}>{LableText.WELCOME_TEXT}</Text>
            </View>

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
            {/* <View style={Styles.inputTextView}>
              <Picker
                note
                mode="dropdown"
                style={{marginVertical: -8}}
                selectedValue={this.state.selected}
                onValueChange={() => { }}
              >
                <Picker.Item label="Shop Keeper" value="key0" />
                <Picker.Item label="Customer" value="key1" />
              </Picker>
            </View> */}

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