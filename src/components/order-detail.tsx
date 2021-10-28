import React, { Component } from 'react';
import {
    ListRenderItemInfo, View, StyleSheet, TouchableOpacity,
    ActivityIndicator, Image, Alert, FlatList, ScrollView, RefreshControl, TextInput, Dimensions
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
import { ScrollableTab, Tab, Item, Container, Content, Tabs, Header, TabHeading, Thumbnail, Input, Label, Footer, FooterTab, Col } from 'native-base';
import { CartScreenProps } from '../navigation/shopKeeperNavigator/allItem.Navigator';
import { AppRoute } from '../navigation/app-routes';
import { ProgressBar } from '../components/progress-bar.component';
import { SearchIcon, MinusIcon, RupeeIcon, PlusCircle, BackIcon, CancelIcon, PlusIcon, AddIcon, RightArrowIcon } from '../../../assets/icons';
import { TimeLineData } from '../data/TimeLineData.model';
import { AppConstants } from '../constants/AppConstants';
import { Toolbar } from '../components/toolbar.component';
import {
    SafeAreaLayout,
    SafeAreaLayoutElement,
    SaveAreaInset,
} from '../components/safe-area-layout.component';
import { MenuIcon, ExperienceIcon, LocationIcon, PublicIcon, PencilIcon } from '../assets/icons';
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
import { Styles } from '../assets/styles'
import { Color, LableText } from '../constants/LabelConstants';
import Axios from 'axios';
import Modal from "react-native-modal";
import { CustomerOrderDetailScreenProps } from '../navigation/customer-navigator/customerOrder.navigator';
// import axios from 'axios';  
// import Container from '@react-navigation/core/lib/typescript/NavigationContainer';

export class OrderDetailScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cartData: [],
            productList: [],
            shopId: '',
            cartId: '',
            addressData: [],
            orderstatusData: [],
            modalVisible: false,
            description: '',
            userData: [],
            cashPay: '',
            onlinePay: '',
            walletPay: ''
        }
        this._onRefresh = this._onRefresh.bind(this);
        this.navigationProductDetail = this.navigationProductDetail.bind(this);
    }



    async componentDidMount() {

        let userDetail = await AsyncStorage.getItem('userDetail');
        let logedIn = await AsyncStorage.getItem('logedIn');
        let shopId = await AsyncStorage.getItem('shopId');
        let userData = JSON.parse(userDetail);
        const cartId = this.props.cartId;
        // Alert.alert("" + userData.adminId, cartId)

        this.setState({
            shopId: shopId,
            cartId: cartId,
            userData: userData
        })
        if (null != logedIn && logedIn === 'true') {
            // Alert.alert("" + userData.adminId, cartId)
            axios({
                method: 'GET',
                url: AppConstants.API_BASE_URL + '/api/cart/get/' + cartId
            }).then((response) => {
                axios({
                    method: 'GET',
                    url: AppConstants.API_BASE_URL + '/api/address/get/' + response.data.addressId
                }).then((response) => {
                    if (response.data) {
                        this.setState({
                            addressData: response.data
                        })
                    }

                }, (error) => {
                    Alert.alert("Server problem")
                })
                this.setState({
                    cartData: response.data,
                    productList: response.data.productList
                })
            }, (error) => {
                Alert.alert("Server problem")
            })

            Axios({
                method: 'GET',
                url: AppConstants.API_BASE_URL + '/api/lookup/getalllookup',
            }).then((response) => {
                if (null != response.data) {
                    console.log(response.data);
                    this.setState({
                        orderstatusData: response.data.ORDER_STATUS
                    })
                    response.data.PAYMENT_MODE.map((data, index) => {
                        data.lookUpName === "CASH" ?
                            this.setState({ cashPay: data.lookUpId }) :
                            data.lookUpName === "ONLINE_PAYMENT" ?
                                this.setState({ onlinePay: data.lookUpId }) :
                                data.lookUpName === "WALLET_PAYMENT" ?
                                    this.setState({ walletPay: data.lookUpId }) :
                                    null
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
        } else {
            this.props.navigation.navigate(AppRoute.AUTH)
        }
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.componentDidMount().then(() => {
            this.setState({ refreshing: false });
        });
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
            case 'PACK':
                // Alert.alert( orderStatus)
                Axios({
                    method: 'GET',
                    url: AppConstants.API_BASE_URL + '/api/cart/packedorder/' + cartId,
                }).then((response) => {
                    if (null != response.data) {
                        this._onRefresh();
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

    toggleModal() {
        const { modalVisible } = this.state;
        this.setState({ modalVisible: !modalVisible })
    }

    renderCart = ({ item }: any): ListItemElement => (
        <ListItem style={{ borderBottomColor: 'rgba(2,15,20,0.10)', borderBottomWidth: 1 }}>
            {item != null ?

                <View style={Styles.cart_main_view}>

                    <View style={Styles.cart_view_1}>
                        <View style={Styles.cart_view_1_1}>
                            <View style={[Styles.cart_avatar_view, Styles.center]}>
                                <Avatar source={{ uri: AppConstants.IMAGE_BASE_URL + '/product/' + item.productId + '_1_' + item.shopId + '_product.png' }} style={Styles.product_avatar} />
                            </View>
                        </View>

                        <View style={Styles.cart_view_1_2}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={Styles.cart_name_text}>{item.productName}</Text>
                                {/* <TouchableOpacity  onPress={() => { this.handleDelete(item.id) }}>
                                    <Text style={Styles.cart_name_text}><CancelIcon fontSize={25} /></Text>
                                </TouchableOpacity> */}
                            </View>
                            <View style={Styles.cart_price_view}>
                                <View style={{ flexDirection: 'row', width: '55%', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                    <Text style={Styles.price_text}><RupeeIcon /> {item.price.toFixed(2)}</Text>
                                    <Text style={Styles.offer_price_text}>{item.offersAvailable && item.oldPrice ? item.oldPrice.toFixed(2) : null}</Text>
                                </View>

                                <View style={[Styles.cart_quantity_view, Styles.center]}>
                                    {/* <TouchableOpacity style={Styles.cart_button} onPress={() => { this.handleDecrease(item.productId, item.productQuantity) }}>
                                        <Text style={Styles.cart_button_text}><MinusIcon /></Text>
                                    </TouchableOpacity> */}

                                    <View style={[Styles.cart_quantity_text_view]}>
                                        <Text style={[{ color: Color.BUTTON_NAME_COLOR }, Styles.cart_quantity_text]}>{item.productQuantity}</Text>
                                    </View>

                                    {/* <TouchableOpacity style={Styles.cart_button} onPress={() => { this.handleIncrease(item.productId) }}>
                                        <Text style={Styles.cart_button_text}><AddIcon /></Text>
                                    </TouchableOpacity> */}
                                </View>
                            </View>

                            <View>
                                <Text style={Styles.cart_offer_text}>{item.offersAvailable && item.offer ? item.offer : null} {item.offersAvailable && item.offer ? '% off' : null}</Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <Text style={[Styles.cart_offer_text, { marginLeft: 10 }]}>{item.offersAvailable ? item.offersAvailable : null} {item.offersAvailable ? 'offers available' : null}</Text>
                    </View>
                </View>
                :
                <ActivityIndicator size='large' color='green' />}

        </ListItem>
    )

    navigationItemList() {
        // this.props.navigation.navigate(AppRoute.ITEMLIST)
    }

    navigationProductDetail() {
        this.props.navigation.navigate(AppRoute.PRODUCT_DETAIL)
    }

    continiueShopping() {
        this.props.navigation.navigate(AppRoute.CUSTOMER_ALL_PRODUCT)
    }



    render() {
        const { cartData, cashPay, onlinePay, walletPay, cartId, addressData, orderstatusData, productList } = this.state
        return (
            <SafeAreaLayout
                style={Styles.safeArea}
                insets={SaveAreaInset.TOP}>
                <Toolbar
                    title='Order Detail'
                    backIcon={BackIcon}
                    onBackPress={this.props.navigation.goBack}
                    style={{ marginTop: -5, marginLeft: -5 }}
                />
                <Divider />

                <Content style={Styles.cart_content} showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                >

                    <View style={{ backgroundColor: '#fff', borderColor: Color.BORDER, borderWidth: 0.5, padding: 20, marginBottom: 10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Payment Mode:</Text>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}> {cartData.transactionType ? cartData.transactionType == cashPay ? 'COD' : cartData.transactionType == onlinePay ? 'Online Payment' : cartData.transactionType == walletPay ? 'Wallet Payment' : null : null}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Address</Text>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Order Id: {cartData.cartId ? cartData.cartId : null} </Text>
                        </View>
                        {null != addressData ?
                            <Text style={{ marginVertical: 5 }}>{addressData.city}, {addressData.landmark}, {addressData.district}, {addressData.state}, {addressData.pinCode}</Text>
                            : null}
                        <View style={{ width: '100%', alignItems: 'flex-end' }}>
                            {/* <TouchableOpacity onPress={() => { this.props.navigation.navigate(AppRoute.CUSTOMER_ADDRESS) }} style={[Styles.center, { paddingVertical: 10, width: 100, borderRadius: 5, backgroundColor: Color.COLOR }]}>
                                <Text style={{ color: Color.BUTTON_NAME_COLOR }}>Change</Text>
                            </TouchableOpacity> */}
                        </View>
                    </View>

                    <List data={productList.slice(0).reverse()}
                        renderItem={this.renderCart}
                    />

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
                                <Text onPress={() => { this.handleOrderStatus('REJECT', cartId) }} style={[{ backgroundColor: Color.COLOR, fontSize: 18, color: '#fff', padding: 10, borderRadius: 5, marginTop: 3 }]}>{LableText.SUBMIT}</Text>
                            </View>
                        </View>
                    </Modal>

                    <View style={Styles.price_detail_1}>
                        <Text style={Styles.cart_price_detail_1_text}>PRICE DETAILS</Text>

                        <View style={Styles.price_detail_2}>
                            <View style={Styles.price_detail_2_1}>
                                <Text style={Styles.cart_price_text_head}>Price ({null != productList ? productList.length : null} items)</Text>
                                <Text style={Styles.cart_price_text_head}><RupeeIcon fontSize={18} />{null != cartData.price ? (cartData.price).toFixed(2) : null}</Text>
                            </View>

                            <View style={Styles.price_detail_2_1}>
                                <Text style={Styles.cart_price_text_head}>Discount</Text>
                                <Text style={Styles.cart_price_text_data}>-<RupeeIcon fontSize={18} />{null != cartData.discount ? cartData.discount.toFixed(2) : null}</Text>
                            </View>

                            <View style={Styles.price_detail_2_1}>
                                <Text style={Styles.cart_price_text_head}>GST Amount</Text>
                                <Text style={Styles.cart_price_text_data}><RupeeIcon fontSize={18} />{null != cartData.gstAmount ? cartData.gstAmount.toFixed(2) : null}</Text>
                            </View>

                            {/* <View style={Styles.price_detail_2_1}>
                                <Text style={Styles.cart_price_text_head}>Delevery Charges</Text>
                                <Text style={Styles.cart_price_text_data}>FREE</Text>
                            </View> */}
                        </View>

                        <View style={Styles.cart_total_view}>
                            <Text style={Styles.cart_total_text_head}>Total Amount</Text>
                            <Text style={Styles.cart_total_text_head}><RupeeIcon fontSize={18} />{null != cartData ? cartData.payableAmount : null}</Text>
                        </View>
                    </View>

                    <View style={{ height: 10, width: '100%' }} />
                </Content>


                {null != orderstatusData ? orderstatusData.map((orderStatus, oIndex) => {
                    if (orderStatus.lookUpName === "PLACED") {
                        if (orderStatus.lookUpId == cartData.orderStatus) {
                            return (
                                <Text style={[{ alignSelf: 'center', backgroundColor: Color.COLOR, fontSize: 18, color: '#fff', padding: 10, borderRadius: 5, marginTop: 3 }]}>Placed</Text>
                            )
                        }
                    } else if (orderStatus.lookUpName === "REJECTED") {
                        if (orderStatus.lookUpId == cartData.orderStatus) {
                            return (
                                <Text style={[{ alignSelf: 'center', backgroundColor: Color.COLOR, fontSize: 18, color: '#fff', padding: 10, borderRadius: 5, marginTop: 3 }]}>Rejected</Text>
                            )
                        }
                    } else if (orderStatus.lookUpName === "ACCEPTED") {
                        if (orderStatus.lookUpId == cartData.orderStatus) {
                            return (
                                <Text style={[{ alignSelf: 'center', backgroundColor: Color.COLOR, fontSize: 18, color: '#fff', padding: 10, borderRadius: 5, marginTop: 3 }]}>Accepted</Text>
                            )
                        }
                    } else if (orderStatus.lookUpName === "PACKED") {
                        if (orderStatus.lookUpId == cartData.orderStatus) {
                            return (
                                <Text style={[{ alignSelf: 'center', backgroundColor: Color.COLOR, fontSize: 18, color: '#fff', padding: 10, borderRadius: 5, marginTop: 3 }]}>Packed</Text>
                            )
                        }
                    } else if (orderStatus.lookUpName === "SHIPPED") {
                        if (orderStatus.lookUpId == cartData.orderStatus) {
                            return (
                                <Text style={[{ alignSelf: 'center', backgroundColor: Color.COLOR, fontSize: 18, color: '#fff', padding: 10, borderRadius: 5, marginTop: 3 }]}>shipped</Text>
                            )
                        }
                    } else if (orderStatus.lookUpName === "DELIVERED") {
                        if (orderStatus.lookUpId == cartData.orderStatus) {
                            return (
                                <Text style={[{ alignSelf: 'center', backgroundColor: Color.COLOR, fontSize: 18, color: '#fff', padding: 10, borderRadius: 5, marginTop: 3 }]}>Delivered</Text>
                            )
                        }
                    }
                }) : null}

                <Divider />
                <Divider />
            </SafeAreaLayout>
        )
    }
}