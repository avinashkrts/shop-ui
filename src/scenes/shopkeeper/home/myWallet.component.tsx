import { Content } from "native-base";
import React, { Component } from "react";
import { RefreshControl, View, Text, SafeAreaView} from "react-native";
import { Divider, ThemedComponentProps } from "react-native-ui-kitten";
import { MywalletScreenProps } from "../../../navigation/home.navigator";
import { SafeAreaLayout } from "../../../components/safe-area-layout.component";
import { Toolbar } from "../../../components/toolbar.component";
import { AddIcon, BackIcon, CancelIcon, MinusIcon } from "../../../assets/icons";
import { Styles } from "../../../assets/styles";
import { LabelConstants } from "../../../constants/LabelConstants";
import { TouchableOpacity } from "react-native-gesture-handler";

export class MyWalletScreen extends Component<MywalletScreenProps, ThemedComponentProps & any> {
    constructor(props) {
        super(props);
        this.state = {}

        this.onRefresh = this.onRefresh.bind(this);
    }

    componentDidMount(){

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
                    title='Wallet'
                    backIcon={BackIcon}
                    onBackPress={this.props.navigation.goBack}
                    style={{ marginTop: -5, marginLeft: -5 }}
                />
                <Divider/>
                {/* <Content style={styles.content}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                > */}
         
                {/* <Content style={Styles.cart_content} showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                > */}
                    {/* <Header style={styles.header}> */}
                    {/* <View style={Styles.searchBox}>
                        <Text style={Styles.searchIcon}><SearchIcon /></Text>
                        <TextInput
                            placeholder="Search"
                            style={Styles.searchInput}
                        />
                    </View> */}
                    
                    {/* <List data={my_Jobs}
                        renderItem={this.renderMyJob}
                    /> */}
                    <View style={{ height: 10, width: '100%' }} />
                {/* </Content> */}
              <View style={Styles.wallet_main}>
                    <View style={Styles.wallet_row}>
                        <View style={Styles.wallet_column_1}>
                           
                                <Text style={Styles.wallet_design1}>{LabelConstants.wallet_serial_number}</Text>
                           
                        </View>
                        <View style={Styles.wallet_column_2}>
                           
                                <Text style={Styles.wallet_design1}>{LabelConstants.wallet_date}</Text>
                           
                        </View>
                        <View style={Styles.wallet_column_3}>
                           
                                <Text style={Styles.wallet_design1}>{LabelConstants.wallet_transactionid}</Text>
                           
                        </View>
    
                        <View style={Styles.wallet_column_4}>
                           
                                <Text style={Styles.head_design}>{LabelConstants.wallet_debit}</Text>
                           
                        </View>
                        <View style={Styles.wallet_column_5}>
                           
                                <Text style={Styles.head_design}>{LabelConstants.wallet_credit}</Text>
                           
                        </View>
                    </View>
                



                    <View style={Styles.wallet_row_1}>
                        <View style={Styles.wallet_column_1}>
                          
                                <Text style={Styles.text_design}> 1</Text>
                          
                        </View>
                        <View style={Styles.wallet_column_2}>
                           
                                <Text style={Styles.text_design}> 01-03-2021</Text>
                          
                        </View>
                        <View style={Styles.wallet_column_3}>
                            
                                <Text style={Styles.text_design}> 5</Text>
                           
                        </View>
                 
                        <View style={Styles.wallet_column_4}>
                           
                                <Text style={Styles.text_design}>--</Text>
                           
                        </View>
                        <View style={Styles.wallet_column_5}>
                            
                                <Text style={Styles.text_design}> 40000</Text>
                            
                        </View>
                    </View>


                    <View style={Styles.wallet_row_2}>
                        <View style={Styles.wallet_column_1}>
                           
                                <Text style={Styles.text_design}> 2</Text>
                            
                        </View>
                        <View style={Styles.wallet_column_2}>
                            
                                <Text style={Styles.text_design}> 01-04-2021</Text>
                            
                        </View>
                        <View style={Styles.wallet_column_3}>
                           
                                <Text style={Styles.text_design}> 8</Text>
                          
                        </View>
                 
                        <View style={Styles.wallet_column_4}>
                           
                                <Text style={Styles.text_design}> 50000</Text>
                         
                        </View>
                        <View style={Styles.wallet_column_5}>
                            
                                <Text style={Styles.text_design}> 60000</Text>
                           
                        </View>
                    </View>






                    
                        <View style={Styles.wallet_row}>
                            <Text style={Styles.wallet_bottom_text}>Total :- </Text>
                           
                            <Text style={Styles.wallet_paid}>--</Text>
                            <Text style={Styles.wallet_due}>50000</Text>
                        </View>
                    </View>

                


           

                {/* </Content> */}
            </SafeAreaLayout>
        );
    }

}