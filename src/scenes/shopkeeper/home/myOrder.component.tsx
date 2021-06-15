import { Content } from "native-base";
import React, { Component } from "react";
import { RefreshControl, View, Text, TouchableOpacity, TextInput, AsyncStorage, Alert } from "react-native";
import { Divider, ThemedComponentProps, Avatar, ListItem, ListItemElement, List } from "react-native-ui-kitten";
import { MyOrderScreenProps } from "../../../navigation/home.navigator";
import { SafeAreaLayout } from "../../../components/safe-area-layout.component";
import { Toolbar } from "../../../components/toolbar.component";
import { Styles } from "../../../assets/styles";
import { Color, LableText } from '../../../constants/LabelConstants';
import { SearchIcon, MinusIcon, RupeeIcon, PlusCircle, BackIcon, CancelIcon, PlusIcon, AddIcon, RightArrowIcon } from '../../../assets/icons';
import { AppConstants } from "../../../constants";
import Axios from "axios";


export class MyOrderScreen extends Component<MyOrderScreenProps, ThemedComponentProps & any> {
    constructor(props) {
        super(props);
        this.state = {
            cartData: []
        }
    }
    async componentDidMount() {
        let userDetail = await AsyncStorage.getItem('userDetail');
        let userData = JSON.parse(userDetail);

        if (null != userData) {
            Axios({
                method: 'GET',
                url: AppConstants.API_BASE_URL + '/api/cart/get/placed/order/foradmin/' + userData.shopId,
            }).then((response) => {
                if (null != response.data) {
                    this.setState({
                        cartData: response.data
                    })
                }
            }, (error) => {
                Alert.alert("Server error!.")
            });
        }
    }

    handleOrderStatus(cartId) {

    }

    handleCartSubmit(cartId) {

    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.componentDidMount().then(() => {
            this.setState({ refreshing: false });
        });
    }

    renderCart = ({ item }: any): ListItemElement => (
        <ListItem style={{ borderBottomColor: 'rgba(2,15,20,0.10)', borderBottomWidth: 1 }}>
            {item != null ?
                <View>
                    <View style={Styles.customer_list}>

                        <View style={[Styles.customer_list_image, Styles.center]}>
                            <TouchableOpacity onPress={() => { this.handleCartSubmit(item.cartId) }}>
                                <Avatar source={require("../../../assets/profile.jpeg")} style={Styles.image} />
                                {/* <View>
                                <Avatar source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/mobile.jpeg' }} style={styles.image} />
                            </View> */}
                            </TouchableOpacity>
                        </View>

                        <View style={Styles.list_name}>
                            <View style={[Styles.list_price, { width: '96%' }]}>
                                <Text style={Styles.customer_list_name_text}>{item.name != null || item.name !== '' ? item.name : 'Avinash'}</Text>
                                <Text onPress={() => { this.handleOrderStatus(item.id) }} style={[{ backgroundColor: Color.COLOR, fontSize: 18, color: '#fff', padding: 10, borderRadius: 5, marginBottom: 3 }]}>{LableText.ACCEPT}</Text>
                            </View>

                            <View style={[Styles.list_price, { width: '96%' }]}>
                                <Text style={Styles.customer_list_price_text}>{item.mobileNo != null || item.mobileNo !== '' ? item.mobileNo : '1234567899'}</Text>
                                <Text style={Styles.customer_list_price_text}>Rs: {item.totalAmount}</Text>
                                <Text onPress={() => { this.handleOrderStatus(item.id) }} style={[{ backgroundColor: Color.COLOR, fontSize: 18, color: '#fff', padding: 10, borderRadius: 5, marginTop: 3 }]}>{LableText.REJECT}</Text>
                            </View>
                        </View>
                    </View>
                </View> : null}
        </ListItem>
    )

    render() {
        const { cartData } = this.state
        return (
            <SafeAreaLayout
                style={Styles.safeArea} >

                <Toolbar
                    title='My Order'
                    backIcon={BackIcon}
                    onBackPress={this.props.navigation.goBack}
                    style={{ marginTop: -5, marginLeft: -5 }}
                />
                <Divider />
                <Content style={Styles.customer_content}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                >

                    <List data={cartData}
                        renderItem={this.renderCart}
                    />
                    <View style={{ height: 10, width: '100%' }}></View>

                </Content>
            </SafeAreaLayout>
        )
    }

}