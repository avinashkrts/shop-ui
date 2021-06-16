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
import Modal from "react-native-modal";

export class MyOrderScreen extends Component<MyOrderScreenProps, ThemedComponentProps & any> {
    constructor(props) {
        super(props);
        this.state = {
            cartData: [],
            userData: [],
            modalVisible: false,
            description: '',
            orderstatusData: []
        }
    }
    async componentDidMount() {
        let userDetail = await AsyncStorage.getItem('userDetail');
        let userData = JSON.parse(userDetail);
        this.setState({ userData: userData })

        if (null != userData) {
            Axios({
                method: 'GET',
                url: AppConstants.API_BASE_URL + '/api/cart/get/byshopId/' + userData.shopId,
            }).then((response) => {
                if (null != response.data) {
                    this.setState({
                        cartData: response.data
                    })
                }
            }, (error) => {
                Alert.alert("Server error!.")
            });

            Axios({
                method: 'GET',
                url: AppConstants.API_BASE_URL + '/api/lookup/getallorderstatus',
            }).then((response) => {
                if (null != response.data) {
                    console.log(response.data);
                    this.setState({
                        orderstatusData: response.data
                    })
                }
            }, (error) => {
                Alert.alert("Server error!.")
            });
        }
    }

    handleOrderStatus(orderStatus, cartId) {
        const { userData, description } = this.state;
        // Alert.alert(userData.shopId + cartId + orderStatus)
        switch (orderStatus) {
            case 'ACCEPT':
                // Alert.alert( orderStatus)

                Axios({
                    method: 'GET',
                    url: AppConstants.API_BASE_URL + '/api/cart/order/accept/' + cartId + '/' + userData.shopId,
                }).then((response) => {
                    if (null != response.data) {
                        this._onRefresh();
                    }
                }, (error) => {
                    Alert.alert("Server error!.")
                });
                break;
            case 'REJECT':
                // Alert.alert(orderStatus)
                Axios({
                    method: 'POST',
                    url: AppConstants.API_BASE_URL + '/api/cart/order/reject',
                    data: {
                        cartId: cartId,
                        shopId: userData.shopId,
                        description: description
                    }
                }).then((response) => {
                    if (null != response.data) {
                        this._onRefresh();
                        this.toggleModal();
                    }
                }, (error) => {
                    Alert.alert("Server error!.")
                });
                break;
            default:
                Alert.alert("Cart ID not found.");
                break;
        }
    }

    handleCartSubmit(cartId) {

    }

    toggleModal() {
        const { modalVisible } = this.state;
        this.setState({ modalVisible: !modalVisible })
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
                                <Avatar source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/' + item.userId + '_avatar.png' }} style={Styles.image} />
                                {/* <View>
                                <Avatar source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/mobile.jpeg' }} style={styles.image} />
                            </View> */}
                            </TouchableOpacity>
                        </View>

                        <View style={Styles.list_name}>
                            <View style={[Styles.list_price, { width: '96%' }]}>
                                <Text style={Styles.customer_list_name_text}>{item.userName}</Text>
                                {null != this.state.orderstatusData ? this.state.orderstatusData.map((orderStatus, oIndex) => {
                                    if (orderStatus.lookUpName === "PLACED") {
                                        // Alert.alert(''+ item.orderStatus)
                                        if (orderStatus.lookUpId == item.orderStatus) {
                                            return (
                                                <Text onPress={() => { this.handleOrderStatus('ACCEPT', item.cartId) }} style={[{ backgroundColor: Color.COLOR, fontSize: 18, color: '#fff', padding: 10, borderRadius: 5, marginBottom: 3 }]}>{LableText.ACCEPT}</Text>
                                            )
                                        }
                                    }
                                }) : null}
                            </View>

                            <View style={[Styles.list_price, { width: '96%' }]}>
                                <Text style={Styles.customer_list_price_text}>{item.mobileNo}</Text>
                                <Text style={Styles.customer_list_price_text}>Rs: {item.totalAmount}</Text>
                                {null != this.state.orderstatusData ? this.state.orderstatusData.map((orderStatus, oIndex) => {
                                    if (orderStatus.lookUpName === "PLACED") {
                                        if (orderStatus.lookUpId == item.orderStatus) {
                                            return (
                                                <Text onPress={() => { this.toggleModal() }} style={[{ backgroundColor: Color.COLOR, fontSize: 18, color: '#fff', padding: 10, borderRadius: 5, marginTop: 3 }]}>{LableText.REJECT}</Text>
                                            )
                                        }
                                    } else if (orderStatus.lookUpName === "REJECTED") {
                                        if (orderStatus.lookUpId == item.orderStatus) {
                                            return (
                                                <Text style={[{ backgroundColor: Color.COLOR, fontSize: 18, color: '#fff', padding: 10, borderRadius: 5, marginTop: 3 }]}>Rejected</Text>
                                            )
                                        }
                                    } else if (orderStatus.lookUpName === "ACCEPTED") {
                                        if (orderStatus.lookUpId == item.orderStatus) {
                                            return (
                                                <Text style={[{ backgroundColor: Color.COLOR, fontSize: 18, color: '#fff', padding: 10, borderRadius: 5, marginTop: 3 }]}>Accepted</Text>
                                            )
                                        }
                                    }
                                }) : null}
                            </View>
                        </View>
                    </View>
                    <Modal style={Styles.modal} isVisible={this.state.modalVisible}>
                        <View style={Styles.modalHeader}>
                            <TouchableOpacity>
                                <Text onPress={() => { this.toggleModal() }}><CancelIcon fontSize={25} /></Text>
                            </TouchableOpacity>
                        </View>
                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.REJECTION_CAUSE}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput
                                    style={Styles.cash_pay_input}
                                    placeholder={LableText.REJECTION_CAUSE}
                                    multiline={true}
                                    value={this.state.description}
                                    onChangeText={(value) => { this.setState({ description: value }) }}
                                />
                            </View>
                            <View style={[Styles.center, { marginTop: 30 }]}>
                                <Text onPress={() => { this.handleOrderStatus('REJECT', item.cartId) }} style={[{ backgroundColor: Color.COLOR, fontSize: 18, color: '#fff', padding: 10, borderRadius: 5, marginTop: 3 }]}>{LableText.SUBMIT}</Text>
                            </View>
                        </View>
                    </Modal>
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