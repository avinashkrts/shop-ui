import React, { Component } from "react";
import { View, Text } from "react-native";
import { Divider, styled, ThemedComponentProps } from "react-native-ui-kitten";
import { BillBookScreenProps } from "../../../navigation/customer-navigator/billBook.navigator";
import { SafeAreaLayout } from "../../../components/safe-area-layout.component";
import { Toolbar } from "../../../components/toolbar.component";
import { MenuIcon } from "../../../assets/icons";
import { Styles } from "../../../assets/styles";
import { AppConstants, LabelConstants, LableText } from "../../../constants";
import axios from "axios";
export class BillBookScreen extends Component<BillBookScreenProps, ThemedComponentProps & any> {
    constructor(props) {
        super(props);
        this.state = {
            transactionData: [],
            transactionType: [],
            onlinePay:"",
            refund:"",
            cashPay:"",
            userData:[]
        }

        this.onRefresh = this.onRefresh.bind(this);
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
                                <Text style={Styles.head_design}>{LabelConstants.customer_bill_item}</Text>
                            </View>
                        </View>
                        <View style={Styles.bill_column_4}>
                            <View style={Styles.bill_box}>
                                <Text style={Styles.head_design}>{LabelConstants.customer_bill_amount}</Text>
                            </View>
                        </View>
                        <View style={Styles.bill_column_5}>
                            <View style={Styles.bill_box}>
                                <Text style={Styles.head_design}>{LabelConstants.customer_bill_paid}</Text>
                            </View>
                        </View>
                        <View style={Styles.bill_column_6}>
                            <View style={Styles.bill_box}>
                                <Text style={Styles.head_design}>{LabelConstants.customer_bill_dues}</Text>
                            </View>
                        </View>
                    </View>




                    <View style={Styles.bill_row_1}>
                        <View style={Styles.bill_column_1}>
                            <View style={Styles.bill_box}>
                                <Text style={Styles.text_design}> 1</Text>
                            </View>
                        </View>
                        <View style={Styles.bill_column_2}>
                            <View style={Styles.bill_box}>
                                <Text style={Styles.text_design}> 01-03-2021</Text>
                            </View>
                        </View>
                        <View style={Styles.bill_column_3}>
                            <View style={Styles.bill_box}>
                                <Text style={Styles.text_design}> 5</Text>
                            </View>
                        </View>
                        <View style={Styles.bill_column_4}>
                            <View style={Styles.bill_box}>
                                <Text style={Styles.text_design}> 40000</Text>
                            </View>
                        </View>
                        <View style={Styles.bill_column_5}>
                            <View style={Styles.bill_box}>
                                <Text style={Styles.text_design}> 35000</Text>
                            </View>
                        </View>
                        <View style={Styles.bill_column_6}>
                            <View style={Styles.bill_box}>
                                <Text style={Styles.text_design}> 5000</Text>
                            </View>
                        </View>
                    </View>


                    <View style={Styles.bill_row_2}>
                        <View style={Styles.bill_column_1}>
                            <View style={Styles.bill_box}>
                                <Text style={Styles.text_design}> 2</Text>
                            </View>
                        </View>
                        <View style={Styles.bill_column_2}>
                            <View style={Styles.bill_box}>
                                <Text style={Styles.text_design}> 01-04-2021</Text>
                            </View>
                        </View>
                        <View style={Styles.bill_column_3}>
                            <View style={Styles.bill_box}>
                                <Text style={Styles.text_design}> 8</Text>
                            </View>
                        </View>
                        <View style={Styles.bill_column_4}>
                            <View style={Styles.bill_box}>
                                <Text style={Styles.text_design}> 60000</Text>
                            </View>
                        </View>
                        <View style={Styles.bill_column_5}>
                            <View style={Styles.bill_box}>
                                <Text style={Styles.text_design}> 50000</Text>
                            </View>
                        </View>
                        <View style={Styles.bill_column_6}>
                            <View style={Styles.bill_box}>
                                <Text style={Styles.text_design}> 10000</Text>
                            </View>
                        </View>
                    </View>






                    <View style={Styles.bill_box}>
                        <View style={Styles.bill_row}>
                            <Text style={Styles.bill_bottom_text}>Total :- </Text>
                            <Text style={Styles.bill_amount}>100000</Text>
                            <Text style={Styles.bill_paid}>85000</Text>
                            <Text style={Styles.bill_due}>15000</Text>
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