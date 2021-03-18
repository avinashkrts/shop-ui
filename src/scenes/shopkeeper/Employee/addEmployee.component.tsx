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
import { AddEmployeeScreenProps } from '../../../navigation/employee.navigator';
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
import Animated from 'react-native-reanimated';
import { Styles } from '../../../assets/styles'
import { Color, LableText, Placeholder } from '../../../constants';
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


export class AddEmployeeScreen extends React.Component<AddEmployeeScreenProps & ThemedComponentProps, MyState & any> {
    constructor(props) {
        super(props)
        this.state = {
            isEditable: false
        }

        this.submitFresher = this.submitFresher.bind(this);
        this.submitExperienced = this.submitExperienced.bind(this);
        this.submitQButton = this.submitQButton.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
    }

    submitFresher() {
        this.setState(
            {
                isFresher: true,
                isExperience: false
            }
        )
    }

    submitExperienced() {
        this.setState(
            {
                isExperience: true,
                isFresher: false
            }
        )
    }

    submitQButton(e, selected) {
        // console.log(selected)
        this.setState(
            {
                qButton: selected
            }
        )
    }

    // async componentDidMount() {
    //     const value = await AsyncStorage.getItem('userDetail');
    //     if (value) {
    //         // console.log('user Details all data', value);
    //         const user = JSON.parse(value);
    //         this.setState({
    //             userType: user.userType,
    //             token: user.token,
    //             userId: user.userId,
    //         })
    //         // console.log('user data id', this.state.userId);      
    //     }

    //     axios({
    //         method: 'get',
    //         url: AppConstants.API_BASE_URL + '/api/job/getalljob',

    //     }).then((response) => {
    //         this.setState({
    //             ...this.state,
    //             my_Jobs: response.data
    //         })
    //         console.log("Profile Data", response.data);
    //     },
    //         (error) => {
    //             console.log(error);
    //             if (error) {
    //                 Alert.alert("UserId or Password is invalid");
    //             }
    //         }
    //     );

    //     axios({
    //         method: 'get',
    //         url: AppConstants.API_BASE_URL + '/api/lookup/getalllookup',
    //     }).then((response) => {
    //         this.setState({
    //             ...this.state,
    //             salary_Type: response.data.SALARY_TYPE,
    //             job_Industry: response.data.JOB_CATEGORY,
    //             min_Qualification: response.data.QUALIFICATION,
    //             experience_Required: response.data.EXPERIENCE,
    //             employment_Type: response.data.EMPLOYMENT_TYPE,
    //             skill: response.data.SKILL
    //         })
    //         // console.log("Profile Data", response.data);
    //     },
    //         (error) => {
    //             console.log(error);
    //             if (error) {
    //                 Alert.alert("UserId or Password is invalid");
    //             }
    //         }
    //     );
    // }

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

    render() {
        const { isEditable } = this.state
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
                                <TextInput editable={isEditable} style={Styles.cash_pay_input} placeholder={LableText.FIRST_NAME} />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.LAST_NAME}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable} style={Styles.cash_pay_input} placeholder={LableText.LAST_NAME} />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.FATHER_NAME}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable} style={Styles.cash_pay_input} placeholder={LableText.FATHER_NAME} />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.PHONE}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable} style={Styles.cash_pay_input} placeholder={LableText.PHONE} />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.EMAIL_ID}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable} style={Styles.cash_pay_input} placeholder={LableText.EMAIL_ID} />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.STREET}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable} style={Styles.cash_pay_input} placeholder={LableText.STREET} />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
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
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.DESIGNATION}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable} style={Styles.cash_pay_input} placeholder={LableText.DESIGNATION} />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.SALARY}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable} style={Styles.cash_pay_input} placeholder={LableText.SALARY} />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.SALARY_TYPE}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable} style={Styles.cash_pay_input} placeholder={LableText.SALARY_TYPE} />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
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
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.ATTENDANCE}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable} style={Styles.cash_pay_input} placeholder={LableText.ATTENDANCE} />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.WORKING_DAYS}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput editable={isEditable} style={Styles.cash_pay_input} placeholder={LableText.WORKING_DAYS} />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
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
                        </View>
                                             
                    </View>

                    <View style={{ marginHorizontal: '10%' }}>
                        <TouchableOpacity style={[Styles.buttonBox, Styles.center]} onPress={() => { }}>
                            <Text style={Styles.buttonName}>{LableText.PAYMENT}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={Styles.bottomSpace}></View>
                </Content>

            </SafeAreaLayout>
        )
    }

}