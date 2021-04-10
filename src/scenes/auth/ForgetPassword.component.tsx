import React, { Component } from 'react';
import { StyleSheet, View, Alert, Image, Text, } from 'react-native';
import { ForgetPasswordScreenProps } from '../../navigation/auth.navigator';
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

export class ForgetPasswordScreen extends Component<ForgetPasswordScreenProps, any & State & any> {
    constructor(props) {
        super(props);

        this.state = {
            mobileNo: 'admin214573@milaan.com',
            passwordVisible: true
        }

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onPasswordIconPress = this.onPasswordIconPress.bind(this);
        this.navigateHRHome = this.navigateHRHome.bind(this);
        this.navigateHRINFORMATION = this.navigateHRINFORMATION.bind(this);
        this.navigateHome = this.navigateHome.bind(this);
        this.navigateINFORMATION = this.navigateINFORMATION.bind(this);
        this.navigateSignUp = this.navigateSignUp.bind(this);
        this.navigateOtp = this.navigateOtp.bind(this);
    }



    onFormSubmit() {
        const { mobileNo } = this.state
        console.log(mobileNo)
        if (mobileNo === '' || mobileNo == null) {
            Alert.alert('Please Enter Mobile Number');
        } else if (!mobileNo.includes("@") ? (mobileNo.length < 10 || mobileNo.length > 10) : !mobileNo.includes("@milaan.com")) {
            Alert.alert('Please Enter Correct Mobile Number');
        } else {
            axios({
                method: 'GET',
                url: 'http://192.168.0.106:8091/api/user/sendotp/' + mobileNo,
            }).then((response) => {
                console.log(response.data)
                if (response.data.status === "false") {
                    Alert.alert(response.data.description);
                } else {
                    AsyncStorage.setItem('mobileForOtp', JSON.stringify(mobileNo), () => {
                        this.props.navigation.navigate(AppRoute.OTP);
                    })
                    this.props.navigation.navigate(AppRoute.OTP);
                }
            }, (error) => {
                console.log(error);
            });
        }

        // axios({
        //     method: 'post', url: AppConstants.API_BASE_URL + '/api/user/validate',
        //     data: {
        //         emailId: emailId,
        //         pwd: pwd
        //     }
        // }).then((response) => {
        //     this.navigateHRINFORMATION();

        //     //   if (response.data.token.length > 30) {
        //     //     console.log(response.data);
        //     //     // AsyncStorage.setItem('userDetail', JSON.stringify(response.data), () => {
        //     //     //  navigateHome();
        //     //     // });
        //     //     if (response.data.userType == 28) {
        //     //       console.log(response.data);
        //     //       if (response.data.profileCreated === 'false') {
        //     //         AsyncStorage.setItem('userDetail', JSON.stringify(response.data), () => {
        //     //           this.navigateHRINFORMATION();
        //     //         });
        //     //       } else if (response.data.profileCreated === 'true') {
        //     //         AsyncStorage.setItem('userDetail', JSON.stringify(response.data), () => {
        //     //           this.navigateHRHome();
        //     //         });
        //     //       }

        //     //     }

        //     //     else if (response.data.userType == 29) {
        //     //       console.log(response.data);
        //     //       if (response.data.profileCreated === 'false') {
        //     //         AsyncStorage.setItem('userDetail', JSON.stringify(response.data), () => {
        //     //           this.navigateINFORMATION();
        //     //         });
        //     //       } else if (response.data.profileCreated === 'true') {
        //     //         AsyncStorage.setItem('userDetail', JSON.stringify(response.data), () => {
        //     //           this.navigateHome();
        //     //         });
        //     //       }
        //     //     }

        //     //   } else {
        //     //     Alert.alert(LabelConstants.com_alert_invalid_email_or_password);
        //     //   }
        //     // }, (error) => {
        //     //   Alert.alert(LabelConstants.com_alert_error_alert);
        //     //   console.log(error);
        // });

    };

    navigateHome() {
        this.props.navigation.navigate(AppRoute.HOME);
    };

    navigateOtp() {
        this.props.navigation.navigate(AppRoute.OTP);
    };

    navigateHRHome() {
        this.props.navigation.navigate(AppRoute.HRHOME);
    };

    navigateINFORMATION() {
        this.props.navigation.navigate(AppRoute.INFORMATION);
    };

    navigateHRINFORMATION() {
        this.props.navigation.navigate(AppRoute.HRINFORMATION);
    };

    navigateSignUp() {
        this.props.navigation.navigate(AppRoute.SIGN_UP);
    };

    onPasswordIconPress() {
        this.setState({ passwordVisible: !this.state.passwordVisible })
    };

    render() {
        const { mobileNo } = this.state;
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
                            <Text style={Styles.loginWelcome}>{LableText.RESET_PASSWORD}</Text>
                        </View>

                        <View style={Styles.inputTextView}>
                            <TextInput
                                style={Styles.inputText}
                                placeholder={Placeholder.PHONE}
                                value={mobileNo}
                                onChangeText={(value) => { this.setState({ mobileNo: value }) }}

                            />
                        </View>

                        {/* <View style={Styles.inputTextView}>
                            <TextInput
                                style={Styles.inputTextWithIcon}
                                placeholder={Placeholder.PASSWORD}
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
                        </View> */}

                        <View style={{ marginHorizontal: '10%' }}>
                            <TouchableOpacity style={[Styles.buttonBox, Styles.center]} onPress={() => { this.onFormSubmit() }}>
                                <Text style={Styles.buttonName}>{LableText.RESET_PASSWORD}</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={() => { this.props.navigation.navigate(AppRoute.SIGN_IN) }}>
                            <Text style={[Styles.dontHaveAccount, { marginTop: 5 }]}>{LableText.BACK_TO_SIGN_IN}</Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacity>
                            <Text style={Styles.forgotPassword}>{LableText.FORGOT_PASSWORD}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { this.props.navigation.navigate(AppRoute.SIGN_UP) }}>
                            <Text style={Styles.dontHaveAccount}>{LableText.DONT_HAVE_ACCOUNT}</Text>
                        </TouchableOpacity> */}

                    </View>
                    <View style={Styles.bottomSpace}></View>
                </Content>

            </SafeAreaLayout >
        );
    }
};

