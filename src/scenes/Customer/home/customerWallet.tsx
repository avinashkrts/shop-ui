import React, { Component } from "react";
import { View, Text, AsyncStorage, RefreshControl, Alert } from "react-native";
import { Divider, ThemedComponentProps } from "react-native-ui-kitten";
import { SafeAreaLayout } from "../../../components/safe-area-layout.component";
import { Toolbar } from "../../../components/toolbar.component";
import { BackIcon, MenuIcon } from "../../../assets/icons";
import { Styles } from "../../../assets/styles";
import { AppConstants, LabelConstants } from "../../../constants";
import axios from "axios";
import moment from "moment";
import { ScrollView } from "react-native-gesture-handler";
import { CustomerWalletScreenProps } from "../../../navigation/customer-navigator/customerHome.navigator";
import { AppRoute } from "../../../navigation/app-routes";

export class CustomerWalletScreen extends Component<CustomerWalletScreenProps, ThemedComponentProps & any> {
    constructor(props) {
        super(props);
        this.state = {
            transactionData: [],
            transactionType: [],
            onlinePay: "",
            refund: "",
            cashPay: "",
            userData: [],
            single: false,
            shopName: '',
            shopId: ''
        }

        this.onRefresh = this.onRefresh.bind(this);
    }

    async componentDidMount() {
        let userDetail = await AsyncStorage.getItem('userDetail');
        let userData = JSON.parse(userDetail);
        // Alert.alert(""+userData.userId);
        // console.log("User Data",userData.userId)


        const logedIn = await AsyncStorage.getItem('logedIn');
        if (null != logedIn && logedIn === 'true') {
            const shopIdAsync = await AsyncStorage.getItem('shopId')
            const shopName = await AsyncStorage.getItem('shopName')

            if (null != shopIdAsync && shopIdAsync !== '') {
                // Alert.alert('')
                this.setState({ single: true, shopName: shopName, shopId: shopIdAsync })
                axios(AppConstants.API_BASE_URL + "/api/transaction/get/transactionby/userId/shopId/" + userData.userId + '/' + shopIdAsync)
                    .then(res => this.setState({ transactionData: res.data }))
            } else {
                axios({
                    method: 'GET',
                    url: AppConstants.API_BASE_URL + '/api/transaction/gettransactionbyuserid/' + userData.userId,
                }).then((response) => {
                    if (null != response.data) {
                        this.setState({
                            transactionData: response.data,
                        })
                    }
                }, (error) => {
                    Alert.alert("Server error!.")
                });
            }
            axios(AppConstants.API_BASE_URL + "/api/lookup/getalllookup")
                //.then(res => this.setState({ transactionType: res.data.PAYMENT_MODE }))
                .then((res) =>
                    res.data.PAYMENT_MODE.map((data) => data.lookUpName == "ONLINE_PAYMENT" ?
                        this.setState({ onlinePay: data.lookUpId }) : data.lookUpName == "REFUND" ? this.setState({ refund: data.lookUpId }) : data.lookUpName == "CASH" ? this.setState({ cashPay: data.lookUpId }) : null)
                )
                .catch(error => console.log(error))
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
        const { transactionData, onlinePay, cashPay, refund } = this.state;
        let total = 0
        let slNo = 0
        return (
            <SafeAreaLayout style={Styles.safeArea}>
                <Toolbar
                    title='Wallet'
                    backIcon={BackIcon}
                    onBackPress={this.props.navigation.goBack}
                    style={{ marginTop: -5, marginLeft: -5 }}
                />
                <Divider />
                <View style={[Styles.bill_main]}>
                    <View style={Styles.bill_row}>
                        <View style={Styles.bill_column_1}>
                            {/* <View style={Styles.bill_box}> */}
                            <Text style={Styles.head_design}>{LabelConstants.customer_bill_serial_number}</Text>
                            {/* </View> */}
                        </View>
                        <View style={Styles.bill_column_2}>
                            {/* <View style={Styles.bill_box}> */}
                            <Text style={Styles.head_design}>{LabelConstants.customer_bill_date}</Text>
                            {/* </View> */}
                        </View>
                        <View style={Styles.bill_column_3}>
                            {/* <View style={Styles.bill_box}> */}
                            <Text style={Styles.head_design}>{LabelConstants.customer_bill_transactinId}</Text>
                            {/* </View> */}
                        </View>
                        <View style={Styles.Cu_wallet_column_4}>
                            {/* <View style={Styles.bill_box}> */}
                            <Text style={Styles.head_design}>{LabelConstants.REFUND}</Text>
                            {/* </View> */}
                        </View>
                    </View>
                    {/* <View style={Styles.bill_main}> */}
                    <ScrollView style={Styles.content}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh.bind(this)}
                            />
                        }
                    >
                        {null != transactionData ? transactionData.map((data, index) => {
                           data.paymentMode == refund ? total = total + data.amount : null
                           data.paymentMode == refund ? slNo = slNo + 1 : null
                           if(data.paymentMode == refund ) {
                            return (
                                <View>
                                    <Divider />
                                    <View style={Styles.wallet_row}>
                                        <View style={index % 2 == 1 ? Styles.bill_row_1 : Styles.bill_row_2}>
                                            <View style={Styles.bill_column_1}>
                                                {/* <View style={Styles.bill_box}> */}
                                                <Text style={Styles.text_design}>{slNo}</Text>
                                                {/* </View> */}
                                            </View>
                                            <View style={Styles.bill_column_2}>
                                                {/* <View style={Styles.bill_box}> */}
                                                <Text style={Styles.text_design}> {moment(data.createdOn).format('DD-MM-YYYY')}  </Text>
                                                {/* </View> */}
                                            </View>
                                            <View style={Styles.bill_column_3}>
                                                {/* <View style={Styles.bill_box}> */}
                                                <Text style={Styles.text_design}>{data.transactionId}</Text>
                                                {/* </View> */}
                                            </View>
                                            <View style={Styles.Cu_wallet_column_4}>
                                                {/* <View style={Styles.bill_box}> */}
                                                {data.paymentMode == refund ? <Text style={Styles.text_design_green}>{data.amount}</Text> : <Text style={Styles.text_design}> -- </Text>}
                                                {/* </View> */}
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )
                           }
                        }
                        ) : null}
                    </ScrollView>
                    <View style={[Styles.bill_box]}>
                        <View style={[Styles.bill_row, { justifyContent: 'space-between' }]}>
                            <Text style={[Styles.bill_bottom_text]}>Total :- </Text>
                            <Text style={Styles.bill_amount}>{total}</Text>
                        </View>
                    </View>

                </View>
            </SafeAreaLayout>
        );
    }
}