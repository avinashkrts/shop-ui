import React, { Component } from "react";
import { View, Text } from "react-native";
import { Divider, styled, ThemedComponentProps } from "react-native-ui-kitten";
import { AdminBillBookScreenProps } from "../../../navigation/home.navigator";
import { SafeAreaLayout } from "../../../components/safe-area-layout.component";
import { Toolbar } from "../../../components/toolbar.component";
import { MenuIcon } from "../../../assets/icons";
import { Styles } from "../../../assets/styles";
import { AppConstants, LabelConstants, LableText } from "../../../constants";
import axios from "axios";
import moment from "moment";

export class AdminBillBookScreen extends Component<AdminBillBookScreenProps, ThemedComponentProps & any> {
    constructor(props) {
        super(props);
        this.state = {
            transactionData: [],
            transactionType: [],
            onlinePay: "",
            refund: "",
            cashPay: "",
            userData: []
        }

        this.onRefresh = this.onRefresh.bind(this);
    }

    async componentDidMount() {
        axios(AppConstants.API_BASE_URL + "/api/transaction/gettransactionbyshopid/" + "MILAAN721")
            .then(res => this.setState({ transactionData: res.data }))
        axios(AppConstants.API_BASE_URL + "/api/admin/get/" + "1")
            .then(res => this.setState({ userData: res.data }))
        axios(AppConstants.API_BASE_URL + "/api/lookup/getalllookup")
            //.then(res => this.setState({ transactionType: res.data.PAYMENT_MODE }))
            .then((res) =>
                res.data.PAYMENT_MODE.map((data) => data.lookUpName == "ONLINE_PAYMENT" ?
                    this.setState({ onlinePay: data.lookUpId }) : data.lookUpName == "REFUND" ? this.setState({ refund: data.lookUpId }) : data.lookUpName == "CASH" ? this.setState({ cashPay: data.lookUpId }) : null)
            )
            .catch(error => console.log(error))
    }

    onRefresh() {
        this.setState({ refreshing: true });
        this.componentDidMount().then(() => {
            this.setState({ refreshing: false });
        });
    }

    render() {
        return (
            <SafeAreaLayout>
                <Toolbar
                    title='Bill Book'
                    backIcon={MenuIcon}
                    onBackPress={this.props.navigation.openDrawer}
                    style={{ marginTop: -5, marginLeft: -5 }}
                />
                <Divider />
                {/* <Content style={styles.content}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                > */}


                <View style={Styles.bill_main}>
                    <View style={Styles.bill_row}>
                        <View style={Styles.bill_column_1}>
                            <View style={Styles.bill_box}>
                                <Text style={Styles.head_design}>{LabelConstants.customer_bill_serial_number}</Text>
                            </View>
                        </View>
                        <View style={Styles.bill_column_2}>
                            <View style={Styles.bill_box}>
                                <Text style={Styles.head_design}>{LabelConstants.customer_bill_date}</Text>
                            </View>
                        </View>
                        <View style={Styles.bill_column_3}>
                            <View style={Styles.bill_box}>
                                <Text style={Styles.head_design}>{LabelConstants.customer_bill_transactinId}</Text>
                            </View>
                        </View>
                        <View style={Styles.bill_column_4}>
                            <View style={Styles.bill_box}>
                                <Text style={Styles.head_design}>{LabelConstants.customer_bill_debit}</Text>
                            </View>
                        </View>
                        <View style={Styles.bill_column_5}>
                            <View style={Styles.bill_box}>
                                <Text style={Styles.head_design}>{LabelConstants.customer_bill_credit}</Text>
                            </View>
                        </View>
                        {/* <View style={Styles.bill_column_6}>
                            <View style={Styles.bill_box}>
                                <Text style={Styles.head_design}>{LabelConstants.customer_bill_dues}</Text>
                            </View>
                        </View> */}
                    </View>


                    {this.state.transactionData.map((data, index) =>
                        //data.paymentMode== this.state.onlinePay || data.paymentMode== this.state.refund? 
                        <View>
                            <Divider />
                            <View style={Styles.wallet_row}>
                                {/* <View style={{ height: 10, width: '100%' }} /> */}
                                <View style={Styles.bill_row_1}>
                                    <View style={Styles.bill_column_1}>
                                        <View style={Styles.bill_box}>
                                            <Text style={Styles.text_design}>{index + 1}</Text>
                                        </View>
                                    </View>
                                    <View style={Styles.bill_column_2}>
                                        <View style={Styles.bill_box}>
                                            <Text style={Styles.text_design}> {moment(data.createdOn).format('DD-MM-YYYY')}  </Text>
                                        </View>
                                    </View>
                                    <View style={Styles.bill_column_3}>
                                        <View style={Styles.bill_box}>
                                            <Text style={Styles.text_design}>{data.transactionId}</Text>
                                        </View>
                                    </View>
                                    <View style={Styles.bill_column_4}>
                                        <View style={Styles.bill_box}>
                                            {/* <Text style={Styles.text_design_red}> */}
                                            {data.paymentMode == this.state.refund ? <Text style={Styles.text_design_red}>{data.amount}</Text> : <Text style={Styles.text_design}> -- </Text>}
                                            {/* </Text> */}
                                        </View>
                                    </View>
                                    <View style={Styles.bill_column_5}>
                                        <View style={Styles.bill_box}>
                                            <Text style={Styles.text_design_green}>
                                                {data.paymentMode == this.state.onlinePay || data.paymentMode == this.state.cashPay ?
                                                    <Text style={Styles.text_design_green}>{data.amount}</Text> : <Text style={Styles.text_design}> -- </Text>}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        //:null
                    )}


                    <View style={Styles.bill_box}>
                        <View style={Styles.bill_row}>
                            <Text style={Styles.bill_bottom_text}>Total :- </Text>
                            <Text style={Styles.bill_amount}>{null != this.state.userData ? Math.round(this.state.userData.wallet) : null}</Text>
                            {/* <Text style={Styles.bill_paid}>85000</Text> */}
                            {/* <Text style={Styles.bill_due}>15000</Text> */}
                        </View>
                    </View>

                </View>

                {/* 
                <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>This page will be added soon.</Text>
                </View> */}
                {/* </Content> */}
            </SafeAreaLayout>
        );
    }

}