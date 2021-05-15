import React from 'react';
import {
    ListRenderItemInfo, View, StyleSheet, TouchableOpacity,
    ActivityIndicator, Image, Alert, FlatList, ScrollView, RefreshControl, TextInput
} from 'react-native';
import {
    // Input,
    Layout,
    List,
    ListElement,
    ListItem,
    ListItemElement,
    Text,
    ThemedComponentProps,
    withStyles, TabBar,
    styled, Divider, Avatar, Icon, Button
} from 'react-native-ui-kitten';
import { ScrollableTab, Tab, Item, Container, Content, Tabs, Header, TabHeading, Thumbnail, Input, Label, Footer, FooterTab } from 'native-base';
import { EditEmployeeScreenProps } from '../../../navigation/employee.navigator';
import { AppRoute } from '../../../navigation/app-routes';
import { ProgressBar } from '../../../components/progress-bar.component';
import { BackIcon, SearchIcon } from '../../../assets/icons';
import { TimeLineData } from '../../../data/TimeLineData.model';
import { AppConstants } from '../../../constants/AppConstants';
import { Toolbar } from '../../../components/toolbar.component';
import {
    SafeAreaLayout,
    SafeAreaLayoutElement,
    SaveAreaInset,
} from '../../../components/safe-area-layout.component';
import { MenuIcon, ExperienceIcon, LocationIcon, PublicIcon, PencilIcon } from '../../../assets/icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { any } from 'prop-types';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { truncate, open } from 'fs';
// import VideoPlayer from 'react-native-video-player';
// import { FlatList } from 'react-native-gesture-handler';
import Share from 'react-native-share';
import { pathToFileURL, fileURLToPath } from 'url';
// import SwipeHiddenHeader from 'react-native-swipe-hidden-header';
import Animated, { Value } from 'react-native-reanimated';
import { Styles } from '../../../assets/styles'
import { Color, LableText, Placeholder } from '../../../constants';
import Axios from 'axios';
// import axios from 'axios';  
// import Container from '@react-navigation/core/lib/typescript/NavigationContainer';

const allTodos: TimeLineData[] = [
    TimeLineData.getAllTimelineData()
];

type MyState = {
    displayName: String,
    dataSource: [],
    userId: String,
    likeCount: number,
    dislikeCount: number,
    liked: boolean[],
    disliked: boolean[],
    categories: [],
    textShown: -1,
    selectedIndex: number;
}


const renderItem = ({ item, index }) => (
    <ListItem title={`${item.title} ${index + 1}`} />
);

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 70;
const PROFILE_IMAGE_MAX_HEIGHT = 80;
const PROFILE_IMAGE_MIN_HEIGHT = 40;


export class EditEmployeeScreen extends React.Component<EditEmployeeScreenProps & ThemedComponentProps, MyState & any> {
    constructor(props) {
        super(props)
        this.state = {
            isEditable: false,
            id: '',
            firstName: '',
            lastName: '',
            father: '',
            shopId: 'AVI123',
            adharNumber: '',
            panNumber: '',
            salary: '',
            salaryType: '',
            workingDays: '',
            designation: '',
            employeeId: '',
            mobileNo: '',
            emailId: '',
            street: '',
            absent: '0',
            present: '0',
            attendance: []
        }

        this._onRefresh = this._onRefresh.bind(this);
    }

    async componentDidMount() {
        const value = await AsyncStorage.getItem('userDetail');
        const employeeId = this.props.route.params.employeeId;
        this.setState({
            id: employeeId
        })
        // Alert.alert(employeeId)
        if (value) {
            // console.log('user Details all data', value);
            const user = JSON.parse(value);
            this.setState({
                userType: user.userType,
                token: user.token,
                userId: user.userId,
            })
            // console.log('user data id', this.state.userId);      
        }

        axios({
            method: 'get',
            url: AppConstants.API_BASE_URL + '/api/employee/get/' + employeeId,

        }).then((response) => {
            this.setState({
                ...this.state,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                father: response.data.father,
                mobileNo: response.data.mobileNo,
                emailId: response.data.emailId,
                street: response.data.street,
                designation: response.data.designation,
                salary: String(response.data.salary),
                salaryType: String(response.data.salaryType),
                workingDays: String(response.data.workingDays),
                panNumber: String(response.data.panNumber),
                adharNumber: String(response.data.adharNumber),
                employeeId: String(response.data.employeeId)
            })
            // console.log("Profile Data", response.data);
        },
            (error) => {
                console.log(error);
                if (error) {
                    Alert.alert("Server error.");
                }
            }
        );

        axios({
            method: 'get',
            url: AppConstants.API_BASE_URL + '/api/attendance/get/' + employeeId,

        }).then((response) => {
            this.setState({
                ...this.state,
                attendance: response.data
            })
            // console.log("Profile Data", response.data);
        },
            (error) => {
                console.log(error);
                if (error) {
                    Alert.alert("Server error.");
                }
            }
        );
    }

    handleSummit() {
        const { isEditable, id, firstName, lastName, father, shopId, adharNumber, panNumber, salary, salaryType, workingDays, designation, employeeId, mobileNo, emailId, street } = this.state
        console.log(id, firstName, lastName, father, shopId, adharNumber, panNumber, salary, salaryType, workingDays, designation, employeeId, mobileNo, emailId, street)
        if (firstName == null || firstName === '') {
            Alert.alert("Please enter first name.");
        } else if (lastName == null || lastName === '') {
            Alert.alert("Please enter last name.");
        } else if (father == null || father === '') {
            Alert.alert("Please enter father's name.");
        } else if (mobileNo == null || mobileNo === '') {
            Alert.alert("Please enter mobile number.");
        } else if (emailId == null || emailId === '') {
            Alert.alert("Please enter email_id.");
        } else if (street == null || street === '') {
            Alert.alert("Please enter street name.");
        } else if (designation == null || designation === '') {
            Alert.alert("Please enter designation.");
        } else if (salary == null || salary === '') {
            Alert.alert("Please enter salary.");
        } else if (salaryType == null || salaryType === '') {
            Alert.alert("Please enter designation.");
        } else if (workingDays == null || workingDays === '') {
            Alert.alert("Please enter working days.");
        } else if (employeeId == null || employeeId === '') {
            Alert.alert("Please enter employeeId.");
        } else if (panNumber == null || panNumber === '') {
            Alert.alert("Please enter pan number.");
        } else if (adharNumber == null || adharNumber === '') {
            Alert.alert("Please enter adhar number.");

        } else {
            Axios({
                method: 'PUT',
                url: AppConstants.API_BASE_URL + '/api/employee/update',
                data: {
                    id: id,
                    firstName: firstName,
                    lastName: lastName,
                    father: father,
                    mobileNo: mobileNo,
                    emailId: emailId,
                    street: street,
                    designation: designation,
                    salary: salary,
                    salaryType: salaryType,
                    workingDays: workingDays,
                    employeeId: employeeId,
                    panNumber: panNumber,
                    adharNumber: adharNumber,
                    shopId: shopId
                }
            }).then((response) => {
                if (null != response.data) {
                    if (response.data.status === 'true') {
                        Alert.alert("Employee edited.")
                        this.props.navigation.goBack()
                    } else if (response.data.status === 'false') {
                        Alert.alert("Something went wrong!")
                    }
                }
            }, (error) => {
                Alert.alert("Server error!.")
            });
        }
    }





    handleJobSubmit(e, jobId, jobUserId) {
        const jobData = {
            jobId: jobId,
            jobUserId: jobUserId
        }
        AsyncStorage.setItem('jobId', JSON.stringify(jobData), () => {
            AsyncStorage.getItem('jobId', (err, result) => {
                console.log('Job Id is', result);
            })
            // this.props.navigation.navigate(AppRoute.JOBDETAIL);
        })
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.componentDidMount().then(() => {
            this.setState({ refreshing: false });
        });
    }

    handleAttendance(employeeId) {
        this.props.navigation.navigate(AppRoute.ATTENDANCE, {employeeId: String(employeeId)})
    }

    render() {
        const { isEditable, id, attendance, firstName, lastName, father, shopId, adharNumber, panNumber, salary, salaryType, workingDays, designation, employeeId, mobileNo, emailId, street } = this.state
        return (
            <SafeAreaLayout
                style={Styles.safeArea}
                insets={SaveAreaInset.TOP}>
                <Toolbar
                    title='Add Employee'
                    backIcon={BackIcon}
                    onBackPress={this.props.navigation.goBack}
                    style={{ marginTop: -5, marginLeft: -5 }}
                />
                <Divider />
                <Content style={Styles.content}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
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
                                    style={Styles.cash_pay_input}
                                    placeholder={LableText.FIRST_NAME}
                                    value={firstName}
                                    onChangeText={(value) => { this.setState({ firstName: value }) }}
                                />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.LAST_NAME}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable}
                                    style={Styles.cash_pay_input}
                                    placeholder={LableText.LAST_NAME}
                                    value={lastName}
                                    onChangeText={(value) => { this.setState({ lastName: value }) }}
                                />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.FATHER_NAME}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable}
                                    style={Styles.cash_pay_input}
                                    placeholder={LableText.FATHER_NAME}
                                    value={father}
                                    onChangeText={(value) => { this.setState({ father: value }) }}
                                />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.PHONE}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable}
                                    style={Styles.cash_pay_input}
                                    placeholder={LableText.PHONE}
                                    value={mobileNo}
                                    onChangeText={(value) => { this.setState({ mobileNo: value }) }}
                                />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.EMAIL_ID}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable}
                                    style={Styles.cash_pay_input}
                                    placeholder={LableText.EMAIL_ID}
                                    value={emailId}
                                    onChangeText={(value) => { this.setState({ emailId: value }) }}
                                />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.STREET}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable}
                                    style={Styles.cash_pay_input}
                                    placeholder={LableText.STREET}
                                    value={street}
                                    onChangeText={(Value) => { this.setState({ street: Value }) }}

                                />
                            </View>
                        </View>

                        {/* <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.LAND_MARK}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable} style={Styles.cash_pay_input} placeholder={LableText.LAND_MARK} />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.VILLAGE}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable} style={Styles.cash_pay_input} placeholder={LableText.VILLAGE} />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.POST_OFFICE}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable} style={Styles.cash_pay_input} placeholder={LableText.POST_OFFICE} />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.POLICE_STATION}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable} style={Styles.cash_pay_input} placeholder={LableText.POLICE_STATION} />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.DISTRICT}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable} style={Styles.cash_pay_input} placeholder={LableText.DISTRICT} />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.PIN_CODE}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable} style={Styles.cash_pay_input} placeholder={LableText.PIN_CODE} />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.STATE}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable} style={Styles.cash_pay_input} placeholder={LableText.STATE} />
                            </View>
                        </View> */}

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.DESIGNATION}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable}
                                    style={Styles.cash_pay_input}
                                    placeholder={LableText.DESIGNATION}
                                    value={designation}
                                    onChangeText={(value) => { this.setState({ designation: value }) }}
                                />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.SALARY}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable}
                                    style={Styles.cash_pay_input}
                                    placeholder={LableText.SALARY}
                                    value={salary}
                                    onChangeText={(value) => { this.setState({ salary: value }) }}
                                />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.SALARY_TYPE}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable}
                                    style={Styles.cash_pay_input}
                                    placeholder={LableText.SALARY_TYPE}
                                    value={salaryType}
                                    onChangeText={(value) => { this.setState({ salaryType: value }) }}
                                />
                            </View>
                        </View>

                        {/* <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.ADVANCE_SALARY}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable} style={Styles.cash_pay_input} placeholder={LableText.ADVANCE_SALARY} />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.BONUS}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable} style={Styles.cash_pay_input} placeholder={LableText.BONUS} />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.INCENTIVE}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable} style={Styles.cash_pay_input} placeholder={LableText.INCENTIVE} />
                            </View>
                        </View> */}
                        {attendance != null ? attendance.map((data, index) => {
                            return (
                                <>
                                    <View style={Styles.user_detail}>
                                        <View style={Styles.user_detail_header}>
                                            <Text style={Styles.user_detail_header_text}>{LableText.PRESENT}</Text>
                                        </View>
                                        <View style={Styles.user_detail_data}>
                                            <TextInput
                                                value={null != data.attendance ? data.attendance == 1 ? "1" : "0" : "0"}
                                                editable={false}
                                                style={Styles.cash_pay_input}
                                                placeholder={LableText.PRESENT}
                                            />
                                        </View>
                                    </View>

                                    <View style={Styles.user_detail}>
                                        <View style={Styles.user_detail_header}>
                                            <Text style={Styles.user_detail_header_text}>{LableText.ABSENT}</Text>
                                        </View>
                                        <View style={Styles.user_detail_data}>
                                            <TextInput
                                                value={null != data.attendance ? data.attendance == 2 ? "1" : "0" : "0"}
                                                editable={false}
                                                style={Styles.cash_pay_input}
                                                placeholder={LableText.ABSENT}
                                            />
                                        </View>
                                    </View>

                                </>
                            )
                        }) : null}

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.WORKING_DAYS}</Text>
                            </View>
                            <TouchableOpacity onPress={() => { this.handleAttendance(id)}} style={Styles.user_detail_data}>
                                <Text
                                    style={Styles.cash_pay_input}
                                    
                                >{LableText.WORKING_DAYS}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.EMPLOYEE_ID}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable}
                                    style={Styles.cash_pay_input}
                                    placeholder={LableText.EMPLOYEE_ID}
                                    value={employeeId}
                                    onChangeText={(value) => { this.setState({ employeeId: value }) }}
                                />
                            </View>
                        </View>
                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.PAN_NUMBER}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable}
                                    style={Styles.cash_pay_input}
                                    placeholder={LableText.PAN_NUMBER}
                                    value={panNumber}
                                    onChangeText={(value) => { this.setState({ panNumber: value }) }}
                                />
                            </View>
                        </View>
                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.ADHAR_NUMBER}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable}
                                    style={Styles.cash_pay_input}
                                    placeholder={LableText.ADHAR_NUMBER}
                                    value={adharNumber}
                                    onChangeText={(value) => { this.setState({ adharNumber: value }) }}
                                />
                            </View>
                        </View>

                        {/* <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.PRESENT}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable} style={Styles.cash_pay_input} placeholder={LableText.PRESENT} />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.ABSENT}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable} style={Styles.cash_pay_input} placeholder={LableText.ABSENT} />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.LEAVE_FROM}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable} style={Styles.cash_pay_input} placeholder={LableText.LEAVE_FROM} />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.LEAVE_TO}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable} style={Styles.cash_pay_input} placeholder={LableText.LEAVE_TO} />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.LEAVE_TYPE}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable} style={Styles.cash_pay_input} placeholder={LableText.LEAVE_TYPE} />
                            </View>
                    </View>*/}

                    </View>
                    {isEditable ? null :
                        <View style={{ marginHorizontal: '10%' }}>
                            <TouchableOpacity style={[Styles.buttonBox, Styles.center]} onPress={() => { this.setState({ isEditable: !isEditable }) }}>
                                <Text style={Styles.buttonName}>{LableText.EDIT}</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    <View style={{ marginHorizontal: '10%' }}>
                        <TouchableOpacity style={[Styles.buttonBox, Styles.center]} onPress={() => { this.handleSummit() }}>
                            <Text style={Styles.buttonName}>{LableText.SAVE}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={Styles.bottomSpace}></View>
                </Content>

            </SafeAreaLayout>
        );
    }

}