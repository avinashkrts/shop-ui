import React, { Component } from "react";
import { View, Text, RefreshControl, Alert, AsyncStorage } from "react-native";
import { Avatar, Divider, ThemedComponentProps } from "react-native-ui-kitten";
import { CustomerProfileScreenProps } from "../../../navigation/customer-navigator/customerHome.navigator";
import { SafeAreaLayout, SaveAreaInset } from "../../../components/safe-area-layout.component";
import { Toolbar } from "../../../components/toolbar.component";
import { BackIcon, MenuIcon } from "../../../assets/icons";
import { Styles } from "../../../assets/styles";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { AppConstants, LableText } from "../../../constants";
import { Content } from "native-base";
import Axios from "axios";
import { getFirstInstallTime } from "react-native-device-info";

export class CustomerProfileScreen extends Component<CustomerProfileScreenProps, ThemedComponentProps & any> {
    constructor(props) {
        super(props);
        this.state = {
            isEditable: false,
            userId: '',
            emailId: '',
            firstName: '',
            lastName: '',
            lastLoginDate: '',
            dob: '',
            mobileNo: '',
            city: '',
            pinCode: '',
            state: '',
            country: '',
            longitude: '',
            latitude: '',
            userType: '',
            shopId: '',
            district: '',
            postOffice: '',
            policeStation: '',
            landmark: '',
            id: ''
        }

        this.onRefresh = this.onRefresh.bind(this);
    }

    async componentDidMount() {
        let userDetail = await AsyncStorage.getItem('userDetail');
        let logedIn = await AsyncStorage.getItem('logedIn');
        let userData = JSON.parse(userDetail);
        // Alert.alert(userData.userId)

        if (userData) {
            // Alert.alert(''+userData.userId)
            Axios({
                method: 'GET',
                url: AppConstants.API_BASE_URL + '/api/user/get/' + userData.userId
            }).then((response) => {
                this.setState({
                    firstName: response.data.firstName,
                    emailId: response.data.emailId,
                    lastName: response.data.lastName,
                    lastLoginDate: response.data.lastLoginDate,
                    dob: response.data.dob,
                    mobileNo: String(response.data.mobileNo),
                })
            }, (error) => {

            });

            Axios({
                method: 'GET',
                url: AppConstants.API_BASE_URL + '/api/address/getby/userid/' + userData.userId
            }).then((response) => {
                this.setState({
                    mobileNo: response.data[0].mobileNo,
                    city: String(response.data[0].city),
                    pinCode: String(response.data[0].pinCode),
                    state: response.data[0].state,
                    country: response.data[0].country,
                    longitude: response.data[0].longitude,
                    latitude: response.data[0].latitude,
                    userType: response.data[0].userType,
                    shopId: response.data[0].shopId,
                    district: response.data[0].district,
                    postOffice: response.data[0].postOffice,
                    policeStation: response.data[0].policeStation,
                    landmark: response.data[0].landmark,
                    userId: response.data[0].userId,
                    id: response.data[0].id
                })
            }, (error) => {

            });
        }
    }

    handleEditSubmit() {
        const { isEditable, firstName,mobileNo, lastName, id, city, emailId, shopId, userId, postOffice, policeStation, district, landmark, pinCode, state, country, latitude, longitude, userType } = this.state
        // Alert.alert("Clicked"+ userId)
        console.log(isEditable, city, postOffice, policeStation, district, landmark, pinCode, state, country, latitude, longitude, userType);
        Axios({
            method: 'PUT',
            url: AppConstants.API_BASE_URL + '/api/address/update',
            data: {
                id: id,
                city: city,
                postOffice: postOffice,
                landMark: landmark,
                policeStation: policeStation,
                district: district,
                pinCode: pinCode,
                state: state,
                country: country,
                shopId: shopId,
                userId: String(userId),
                userType: userType,
                emailId: emailId
            }
        }).then((response) => {

            this.setState({
                isEditable: false
            })
            this.onRefresh()
        }, (error) => {
            Alert.alert("Server error!");
        })

        Axios({
            method: 'PUT',
            url: AppConstants.API_BASE_URL + '/api/user/update',
            data: {
                id: String(userId),               
                emailId: emailId,
                firstName: firstName,
                lastName: lastName,
            }
        }).then((response) => {
            
            this.setState({
                isEditable: false
            })
            this.onRefresh()
        }, (error) => {
            Alert.alert("Server error!");
        })

    }

    onRefresh() {
        this.setState({ refreshing: true });
        this.componentDidMount().then(() => {
            this.setState({ refreshing: false });
        });
    }

    render() {
        const { street, firstName, isEditable, lastName, city, mobileNo, pinCode, state, country, userType, shopId, district, postOffice, policeStation, landmark, userId, emailId } = this.state
        return (
            <SafeAreaLayout
                style={Styles.safeArea}
                insets={SaveAreaInset.TOP}>
                <Toolbar
                    title='Profile'
                    backIcon={BackIcon}
                    onBackPress={this.props.navigation.goBack}
                    style={{ marginTop: -5, marginLeft: -5 }}
                />
                <Divider />
                <Content style={Styles.content}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                >
                    <View style={[Styles.profile, Styles.center]}>
                        <View style={Styles.profile_image}>
                            <Avatar source={require("../../../assets/profile.jpeg")} style={Styles.profile_avatar} />
                        </View>
                    </View>

                    <Divider />

                    <View>
                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.FIRST_NAME}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput
                                    editable={isEditable}
                                    value={firstName}
                                    onChangeText={(value) => { this.setState({ firstName: value }) }}
                                    style={Styles.cash_pay_input}
                                    placeholder={LableText.FIRST_NAME}
                                />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.LAST_NAME}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable}
                                    value={lastName}
                                    style={Styles.cash_pay_input}
                                    placeholder={LableText.LAST_NAME}
                                    onChangeText={(value) => { this.setState({ lastName: value }) }}
                                />
                            </View>
                        </View>


                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.PHONE}</Text>
                            </View>
                            <View
                                style={Styles.user_detail_data}>
                                <TextInput editable={false}
                                    value={mobileNo}
                                    style={Styles.cash_pay_input}
                                    placeholder={LableText.PHONE}
                                    onChangeText={(value) => { this.setState({ mobileNo: value }) }}
                                />
                            </View>
                        </View>

                        <View
                            style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.EMAIL_ID}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable}
                                    value={emailId}
                                    style={Styles.cash_pay_input}
                                    placeholder={LableText.EMAIL_ID}
                                    onChangeText={(value) => { this.setState({ emailId: value }) }}

                                />
                            </View>
                        </View>

                        {/* <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.STREET}</Text>
                            </View>
                            <View
                                style={Styles.user_detail_data}>
                                <TextInput editable={isEditable}
                                    style={Styles.cash_pay_input}
                                    placeholder={LableText.STREET}
                                    value={street}
                                    onChangeText={(value) => { this.setState({ street: value }) }}
                                />
                            </View>
                        </View> */}

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.LAND_MARK}</Text>
                            </View>
                            <View
                                style={Styles.user_detail_data}>
                                <TextInput editable={isEditable}
                                    style={Styles.cash_pay_input}
                                    placeholder={LableText.LAND_MARK}
                                    value={landmark}
                                    onChangeText={(value) => { this.setState({ landmark: value }) }}
                                />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.VILLAGE}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput
                                    editable={isEditable}
                                    style={Styles.cash_pay_input}
                                    placeholder={LableText.VILLAGE}
                                    value={city}
                                    onChangeText={(value) => { this.setState({ city: value }) }}

                                />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.POST_OFFICE}</Text>
                            </View>
                            <View
                                style={Styles.user_detail_data}>
                                <TextInput editable={isEditable}
                                    style={Styles.cash_pay_input}
                                    placeholder={LableText.POST_OFFICE}
                                    value={postOffice}
                                    onChangeText={(value) => { this.setState({ postOffice: value }) }}
                                />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.POLICE_STATION}</Text>
                            </View>
                            <View
                                style={Styles.user_detail_data}>
                                <TextInput editable={isEditable}
                                    style={Styles.cash_pay_input}
                                    placeholder={LableText.POLICE_STATION}
                                    value={policeStation}
                                    onChangeText={(value) => { this.setState({ policeStation: value }) }}
                                />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.DISTRICT}</Text>
                            </View>
                            <View
                                style={Styles.user_detail_data}>
                                <TextInput editable={isEditable}
                                    style={Styles.cash_pay_input}
                                    placeholder={LableText.DISTRICT}
                                    value={district}
                                    onChangeText={(value) => { this.setState({ district: value }) }}
                                />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.PIN_CODE}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable}
                                    style={Styles.cash_pay_input}
                                    placeholder={LableText.PIN_CODE}
                                    value={pinCode}
                                    onChangeText={(value) => { this.setState({ pinCode: value }) }}
                                />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.STATE}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput
                                    editable={isEditable}
                                    style={Styles.cash_pay_input}
                                    placeholder={LableText.STATE}
                                    value={state}
                                    onChangeText={(value) => { this.setState({ state: value }) }}
                                />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.COUNTRY}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput
                                    editable={isEditable}
                                    style={Styles.cash_pay_input}
                                    placeholder={LableText.COUNTRY}
                                    value={country}
                                    onChangeText={(value) => { this.setState({ country: value }) }}
                                />
                            </View>
                        </View>






                    </View>

                    {!isEditable ?
                        <View style={{ marginHorizontal: '10%' }}>
                            <TouchableOpacity style={[Styles.buttonBox, Styles.center]} onPress={() => { this.setState({ isEditable: !isEditable }) }}>
                                <Text style={Styles.buttonName}>{LableText.EDIT}</Text>
                            </TouchableOpacity>
                        </View> : null}

                    <View style={{ marginHorizontal: '10%' }}>
                        <TouchableOpacity style={[Styles.buttonBox, Styles.center]} onPress={() => { this.handleEditSubmit() }}>
                            <Text style={Styles.buttonName}>{LableText.SAVE}</Text>
                        </TouchableOpacity>
                    </View>



                    <View style={Styles.bottomSpace}></View>
                </Content>

            </SafeAreaLayout>
        );
    }

}