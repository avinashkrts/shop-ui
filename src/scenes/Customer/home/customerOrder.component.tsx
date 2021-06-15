import React, { Component } from "react";
import { View, Text, RefreshControl, Alert, AsyncStorage } from "react-native";
import { Avatar, Divider, ThemedComponentProps } from "react-native-ui-kitten";
import { CustomerOrderScreenProps } from "../../../navigation/customer-navigator/customerHome.navigator";
import { SafeAreaLayout, SaveAreaInset } from "../../../components/safe-area-layout.component";
import { Toolbar } from "../../../components/toolbar.component";
import { BackIcon, MenuIcon } from "../../../assets/icons";
import { Styles } from "../../../assets/styles";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { AppConstants, LableText } from "../../../constants";
import { Content, Image } from "native-base";
import Axios from "axios";
import { AppRoute } from "../../../navigation/app-routes";

export class CustomerOrderScreen extends Component<CustomerOrderScreenProps, ThemedComponentProps & any> {
    constructor(props) {
        super(props);
        this.state = {}

        this.onRefresh = this.onRefresh.bind(this);
    }

    async componentDidMount() {
        let userDetail = await AsyncStorage.getItem('userDetail');
        let logedIn = await AsyncStorage.getItem('logedIn');
        let userData = JSON.parse(userDetail);
        if (null != logedIn && logedIn === 'true') {
            // Alert.alert("" + userData.userId)
            Axios({
                method: 'GET',
                url: AppConstants.API_BASE_URL + '/api/cart/get/placed/order/MILAAN721/' + userData.userId
            }).then((response) => {
                this.setState({
                    cartData: response.data[0],
                })
            }, (error) => {
                // Alert.alert("Server problem")
            })            
        } else {
            this.props.navigation.navigate(AppRoute.AUTH)
        }
    }

    onRefresh() {
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
                    title='My Order'
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
                    {/* <View style={[Styles.profile, Styles.center]}>
                        <View style={Styles.profile_image}>
                            <Avatar source={require("../../../assets/profile.jpeg")} style={Styles.profile_avatar} />
                        </View>
                    </View> */}

                    <Divider />






                    <View style={Styles.order_main}>
                        <Text style={Styles.order_text}>Orders</Text>
                        <View style={Styles.order_row}>

                            <Avatar source={require("../../../assets/hp-laptop.jpg")} style={Styles.order_cart} />
                            <View style={Styles.order_column}>
                                <Text style={Styles.order_text}>H P Laptop</Text>
                                <Text style={Styles.order_column}> Price :- 45000</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={[Styles.center, Styles.order_bar_main_1]}>
                                <View style={Styles.order_bar_ordered1} />
                                <View style={Styles.order_bar_ordered2} />
                                <View style={Styles.order_bar_ordered3} />

                                <View style={Styles.order_bar_accepted1} />
                                <View style={Styles.order_bar_accepted2} />
                                <View style={Styles.order_bar_accepted3} />

                                <View style={Styles.order_bar_packed1} />
                                <View style={Styles.order_bar_packed2} />
                                <View style={Styles.order_bar_packed3} />

                                <View style={Styles.order_bar_shipped1} />
                                <View style={Styles.order_bar_shipped2} />
                                <View style={Styles.order_bar_shipped3} />

                                <View style={Styles.order_bar_delevered1} />
                                {/* <View style={Styles.order_bar_delevered2}/>
                                <View style={Styles.order_bar_delevered3}/> */}
                            </View>

                            <View style={Styles.order_bar_main_2}>
                                <View style={[Styles.order_bar_ordered_text_box]}>
                                    <Text style={[Styles.order_bar_ordered_text]}>Ordered</Text>
                                </View>
                                <View style={[Styles.order_bar_ordered_text_box]}>
                                    <Text style={[Styles.order_bar_ordered_text]}>Accepted</Text>
                                </View>
                                <View style={[Styles.order_bar_ordered_text_box]}>
                                    <Text style={[Styles.order_bar_ordered_text]}>Packed</Text>
                                </View>
                                <View style={[Styles.order_bar_ordered_text_box]}>
                                    <Text style={[Styles.order_bar_ordered_text]}>Shipped</Text>
                                </View>
                                <View style={[Styles.order_bar_ordered_text_box]}>
                                    <Text style={[Styles.order_bar_ordered_text]}>Delivered</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={Styles.order_main}>
                        <Text style={Styles.order_text}>Orders</Text>
                        <View style={Styles.order_row}>

                            <Avatar source={require("../../../assets/hp-laptop.jpg")} style={Styles.order_cart} />
                            <View style={Styles.order_column}>
                                <Text style={Styles.order_text}>H P Laptop</Text>
                                <Text style={Styles.order_column}> Price :- 45000</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={[Styles.center, Styles.order_bar_main_1]}>
                                <View style={Styles.order_bar_ordered1} />
                                <View style={Styles.order_bar_ordered2} />
                                <View style={Styles.order_bar_ordered3} />

                                <View style={Styles.order_bar_accepted1} />
                                <View style={Styles.order_bar_accepted2} />
                                <View style={Styles.order_bar_accepted3} />

                                <View style={Styles.order_bar_packed1} />
                                <View style={Styles.order_bar_packed2} />
                                <View style={Styles.order_bar_packed3} />

                                <View style={Styles.order_bar_shipped1} />
                                <View style={Styles.order_bar_shipped2} />
                                <View style={Styles.order_bar_shipped3} />

                                <View style={Styles.order_bar_delevered1} />
                                {/* <View style={Styles.order_bar_delevered2}/>
                                <View style={Styles.order_bar_delevered3}/> */}
                            </View>

                            <View style={Styles.order_bar_main_2}>
                                <View style={[Styles.order_bar_ordered_text_box]}>
                                    <Text style={[Styles.order_bar_ordered_text]}>Ordered</Text>
                                </View>
                                <View style={[Styles.order_bar_ordered_text_box]}>
                                    <Text style={[Styles.order_bar_ordered_text]}>Accepted</Text>
                                </View>
                                <View style={[Styles.order_bar_ordered_text_box]}>
                                    <Text style={[Styles.order_bar_ordered_text]}>Packed</Text>
                                </View>
                                <View style={[Styles.order_bar_ordered_text_box]}>
                                    <Text style={[Styles.order_bar_ordered_text]}>Shipped</Text>
                                </View>
                                <View style={[Styles.order_bar_ordered_text_box]}>
                                    <Text style={[Styles.order_bar_ordered_text]}>Delivered</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={Styles.order_main}>
                        <Text style={Styles.order_text}>Orders</Text>
                        <View style={Styles.order_row}>

                            <Avatar source={require("../../../assets/hp-laptop.jpg")} style={Styles.order_cart} />
                            <View style={Styles.order_column}>
                                <Text style={Styles.order_text}>H P Laptop</Text>
                                <Text style={Styles.order_column}> Price :- 45000</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={[Styles.center, Styles.order_bar_main_1]}>
                                <View style={Styles.order_bar_ordered1} />
                                <View style={Styles.order_bar_ordered2} />
                                <View style={Styles.order_bar_ordered3} />

                                <View style={Styles.order_bar_accepted1} />
                                <View style={Styles.order_bar_accepted2} />
                                <View style={Styles.order_bar_accepted3} />

                                <View style={Styles.order_bar_packed1} />
                                <View style={Styles.order_bar_packed2} />
                                <View style={Styles.order_bar_packed3} />

                                <View style={Styles.order_bar_shipped1} />
                                <View style={Styles.order_bar_shipped2} />
                                <View style={Styles.order_bar_shipped3} />

                                <View style={Styles.order_bar_delevered1} />
                                {/* <View style={Styles.order_bar_delevered2}/>
                                <View style={Styles.order_bar_delevered3}/> */}
                            </View>

                            <View style={Styles.order_bar_main_2}>
                                <View style={[Styles.order_bar_ordered_text_box]}>
                                    <Text style={[Styles.order_bar_ordered_text]}>Ordered</Text>
                                </View>
                                <View style={[Styles.order_bar_ordered_text_box]}>
                                    <Text style={[Styles.order_bar_ordered_text]}>Accepted</Text>
                                </View>
                                <View style={[Styles.order_bar_ordered_text_box]}>
                                    <Text style={[Styles.order_bar_ordered_text]}>Packed</Text>
                                </View>
                                <View style={[Styles.order_bar_ordered_text_box]}>
                                    <Text style={[Styles.order_bar_ordered_text]}>Shipped</Text>
                                </View>
                                <View style={[Styles.order_bar_ordered_text_box]}>
                                    <Text style={[Styles.order_bar_ordered_text]}>Delivered</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* <View style={[Styles.order_status_box]}>

                    </View> */}







                    {/* <View>
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
                        </View> */}








                    {/* 
                    <View style={{ marginHorizontal: '10%' }}>
                        <TouchableOpacity style={[Styles.buttonBox, Styles.center]} onPress={() => { }}>
                            <Text style={Styles.buttonName}>{LableText.EDIT}</Text>
                        </TouchableOpacity>
                        </View> */}

                    {/* 
                    <View style={{ marginHorizontal: '10%' }}>
                        <TouchableOpacity style={[Styles.buttonBox, Styles.center]} onPress={() => { }}>
                            <Text style={Styles.buttonName}>{LableText.SAVE}</Text>
                        </TouchableOpacity>
                    </View>
                     */}

                    <View style={Styles.bottomSpace}></View>
                </Content>

            </SafeAreaLayout>
        );
    }

}