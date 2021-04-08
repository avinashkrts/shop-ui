import { Content } from "native-base";
import React, { Component } from "react";
import { RefreshControl, View, Text,TouchableOpacity } from "react-native";
import { Divider, ThemedComponentProps, Avatar } from "react-native-ui-kitten";
import { MyOrderScreenProps } from "../../../navigation/home.navigator";
import { SafeAreaLayout } from "../../../components/safe-area-layout.component";
import { Toolbar } from "../../../components/toolbar.component";
import { Styles } from "../../../assets/styles";
import { Color } from '../../../constants/LabelConstants';
import { SearchIcon, MinusIcon, RupeeIcon, PlusCircle, BackIcon, CancelIcon, PlusIcon, AddIcon, RightArrowIcon } from '../../../assets/icons';


export class MyOrderScreen extends Component<MyOrderScreenProps, ThemedComponentProps & any> {
    constructor(props) {
        super(props);
        this.state = {}

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
                    title= 'Order Recieved'
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
            

                    <View style={{ backgroundColor: '#fff', borderColor: Color.BORDER, borderWidth: 0.5, padding: 20, marginBottom: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Address</Text>

                        <Text style={{ marginVertical: 5 }}>101, InOrbit Complex, Near B.M.P. 16, Phulwari Khagaul Road, Patna, 801505</Text>

                        <View style={{width: '100%', alignItems: 'flex-end'}}>
                            <TouchableOpacity style={[Styles.center, {paddingVertical: 10, width: 100, borderRadius: 5, backgroundColor: Color.COLOR}]}>
                                <Text style={{color: Color.BUTTON_NAME_COLOR}}>Change</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={Styles.cart_main_view}>

                        <View style={Styles.cart_view_1}>
                            <View style={Styles.cart_view_1_1}>
                                <View style={[Styles.cart_avatar_view, Styles.center]}>
                                    <Avatar source={require("../../../assets/sweets.png")} style={Styles.cart_avatar} />
                                </View>
                            </View>

                            <View style={Styles.cart_view_1_2}>
                                <Text style={Styles.cart_name_text}>Sweets</Text>
                                <View style={Styles.cart_price_view}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={Styles.price_text}><RupeeIcon /> 1100</Text>
                                        <Text style={Styles.offer_price_text}>1,150</Text>
                                    </View>

                                    <View style={Styles.cart_quantity_view}>
                                        <TouchableOpacity style={Styles.cart_button} onPress={() => { }}>
                                            <Text style={Styles.cart_button_text}><MinusIcon /></Text>
                                        </TouchableOpacity>

                                        <View style={Styles.cart_quantity_text_view}>
                                            <Text style={Styles.cart_quantity_text}>3</Text>
                                        </View>

                                        <TouchableOpacity style={Styles.cart_button} onPress={() => { }}>
                                            <Text style={Styles.cart_button_text}><AddIcon /></Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View>
                                    <Text style={Styles.cart_offer_text}>25% off</Text>
                                </View>
                            </View>
                        </View>

                        <View>
                            <Text style={[Styles.cart_offer_text, { marginLeft: 10 }]}>5 offers available</Text>
                        </View>
                    </View>




































               
                {/* </Content> */}
            </SafeAreaLayout>
        );
    }

}