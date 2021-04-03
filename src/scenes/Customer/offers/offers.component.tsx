import React, { Component } from "react";
import { View, Text, RefreshControl } from "react-native";
import { Avatar, Divider, ThemedComponentProps } from "react-native-ui-kitten";
import { OffersScreenProps } from "../../../navigation/customer-navigator/offers.navigator";
import { SafeAreaLayout, SaveAreaInset } from "../../../components/safe-area-layout.component";
import { Toolbar } from "../../../components/toolbar.component";
import { CartIcon, MenuIcon, SearchIcon } from "../../../assets/icons";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Color } from "../../../constants";
import { Styles } from "../../../assets/styles";
import { Content } from "native-base";

export class OffersScreen extends Component<OffersScreenProps, ThemedComponentProps & any> {
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
            <SafeAreaLayout
                style={Styles.safeArea}
                insets={SaveAreaInset.TOP}>
                <Toolbar
                    title='Item'
                    backIcon={MenuIcon}
                    onBackPress={this.props.navigation.openDrawer}
                    onRightPress={() => { }}
                    menuIcon={CartIcon}
                    style={{ marginTop: -5, marginLeft: -5 }}
                />
                <Content style={Styles.customer_content} showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                >
                    {/* <Header style={styles.header}> */}
                    <View style={Styles.searchBox}>
                        <Text style={Styles.searchIcon}><SearchIcon /></Text>
                        <TextInput
                            placeholder="Search"
                            style={Styles.searchInput}
                        />
                    </View>
                    {/* </Header> */}
                    <View style={Styles.all_Item_Main_View}>

                        <View style={Styles.all_Item_List}>
                            <TouchableOpacity onPress={() => this.navigationProductDetail()}>
                                <View style={[Styles.all_Item_Image_1, Styles.center]}>
                                    <Avatar source={require("../../../assets/dawat_rice.jpg")} style={Styles.all_Item_Image} />
                                    {/* <View>
                                        <Avatar source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/mobile.jpeg' }} style={styles.image} />
                                    </View> */}
                                </View>
                                <View style={Styles.all_Item_Detail}>
                                    <View style={{ backgroundColor: '#fff', paddingHorizontal: 5 }}>
                                        <Text style={{ color: '#000', marginTop: 5, fontWeight: 'bold' }}>Dawat Basmati Rice</Text>
                                        <Text style={{ color: Color.COLOR_ITEM_NAME, marginTop: 5 }}>25 Kg.</Text>

                                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginVertical: 5 }}>
                                            <Text style={{ color: '#000', fontSize: 18, fontWeight: 'bold' }}>Rs. 1,100</Text>
                                            <Text style={{ color: Color.COLOR, fontSize: 20, textDecorationLine: 'line-through' }}>1,150</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                            <Text style={{ color: Color.COLOR }}>3.5 % off</Text>
                                            <Text style={{ color: Color.COLOR }}>Offer till Tue.</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={() => { this.handleAddCart() }}>
                                        <View style={[{ backgroundColor: Color.COLOR, marginVertical: 10, alignSelf: 'center', paddingVertical: 5, borderRadius: 5, width: '90%' }, Styles.center]}>
                                            <Text style={{ color: Color.BUTTON_NAME_COLOR }}>Add to cart</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={Styles.all_Item_List}>
                            <View style={[Styles.all_Item_Image_1, Styles.center]}>
                                <Avatar source={require("../../../assets/wire.jpg")} style={Styles.all_Item_Image} />
                                {/* <View>
                                        <Avatar source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/mobile.jpeg' }} style={styles.image} />
                                    </View> */}
                            </View>
                            <View style={Styles.all_Item_Detail}>
                                <View style={{ backgroundColor: '#fff', paddingHorizontal: 5 }}>
                                    <Text style={{ color: '#000', marginTop: 5, fontWeight: 'bold' }}>V-Guard Copper Wire</Text>
                                    <Text style={{ color: Color.COLOR_ITEM_NAME, marginTop: 5 }}>1 Mtr.</Text>

                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginVertical: 5 }}>
                                        <Text style={{ color: '#000', fontSize: 18, fontWeight: 'bold' }}>Rs. 20</Text>
                                        <Text style={{ color: Color.COLOR, fontSize: 20, textDecorationLine: 'line-through' }}>22</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                        <Text style={{ color: Color.COLOR }}>2.5 % off</Text>
                                        <Text style={{ color: Color.COLOR }}>Offer till Mon.</Text>
                                    </View>
                                </View>
                                <TouchableOpacity>
                                    <View style={[{ backgroundColor: Color.COLOR, marginVertical: 10, alignSelf: 'center', paddingVertical: 5, borderRadius: 5, width: '90%' }, Styles.center]}>
                                        <Text style={{ color: Color.BUTTON_NAME_COLOR }}>Add to cart</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={Styles.all_Item_List}>
                            <View style={[Styles.all_Item_Image_1, Styles.center]}>
                                <Avatar source={require("../../../assets/hp-laptop.jpg")} style={Styles.all_Item_Image} />
                                {/* <View>
                                        <Avatar source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/mobile.jpeg' }} style={styles.image} />
                                    </View> */}
                            </View>
                            <View style={Styles.all_Item_Detail}>
                                <View style={{ backgroundColor: '#fff', paddingHorizontal: 5 }}>
                                    <Text style={{ color: '#000', marginVertical: 5, fontWeight: 'bold' }}>Hp Probook 6460b</Text>
                                    <Text style={{ color: Color.COLOR_ITEM_NAME }}>1 Pc.</Text>

                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginVertical: 5 }}>
                                        <Text style={{ color: '#000', fontSize: 18, fontWeight: 'bold' }}>Rs. 64,999</Text>
                                        <Text style={{ color: Color.COLOR, fontSize: 20, textDecorationLine: 'line-through' }}>67,999</Text>
                                    </View>
                                </View>
                                <TouchableOpacity>
                                    <View style={[{ backgroundColor: Color.COLOR, marginVertical: 10, alignSelf: 'center', paddingVertical: 5, borderRadius: 5, width: '90%' }, Styles.center]}>
                                        <Text style={{ color: Color.BUTTON_NAME_COLOR }}>Add to cart</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={Styles.all_Item_List}>
                            <View style={[Styles.all_Item_Image_1, Styles.center]}>
                                <Avatar source={require("../../../assets/vivo_mobile.jpeg")} style={Styles.all_Item_Image} />
                                {/* <View>
                                        <Avatar source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/mobile.jpeg' }} style={styles.image} />
                                    </View> */}
                            </View>
                            <View style={Styles.all_Item_Detail}>
                                <View style={{ backgroundColor: '#fff', paddingHorizontal: 5 }}>
                                    <Text style={{ color: '#000', marginVertical: 5, fontWeight: 'bold' }}>Vivo V 17</Text>
                                    <Text style={{ color: Color.COLOR_ITEM_NAME }}>1 Pcs.</Text>

                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginVertical: 5 }}>
                                        <Text style={{ color: '#000', fontSize: 18, fontWeight: 'bold' }}>Rs. 21,999</Text>
                                        <Text style={{ color: Color.COLOR, fontSize: 20, textDecorationLine: 'line-through' }}>24,999</Text>
                                    </View>
                                </View>
                                <TouchableOpacity>
                                    <View style={[{ backgroundColor: Color.COLOR, marginVertical: 10, alignSelf: 'center', paddingVertical: 5, borderRadius: 5, width: '90%' }, Styles.center]}>
                                        <Text style={{ color: Color.BUTTON_NAME_COLOR }}>Add to cart</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={Styles.all_Item_List}>
                            <View style={[Styles.all_Item_Image_1, Styles.center]}>
                                <Avatar source={require("../../../assets/chair.jpg")} style={Styles.all_Item_Image} />
                                {/* <View>
                                        <Avatar source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/mobile.jpeg' }} style={styles.image} />
                                    </View> */}
                            </View>
                            <View style={Styles.all_Item_Detail}>
                                <View style={{ backgroundColor: '#fff', paddingHorizontal: 5 }}>
                                    <Text style={{ color: '#000', marginVertical: 5, fontWeight: 'bold' }}>Nilkamal Chair</Text>
                                    <Text style={{ color: Color.COLOR_ITEM_NAME }}>1 Pc.</Text>

                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginVertical: 5 }}>
                                        <Text style={{ color: '#000', fontSize: 18, fontWeight: 'bold' }}>Rs. 1,500</Text>
                                        <Text style={{ color: Color.COLOR, fontSize: 20, textDecorationLine: 'line-through' }}>1,700</Text>
                                    </View>
                                </View>
                                <TouchableOpacity>
                                    <View style={[{ backgroundColor: Color.COLOR, marginVertical: 10, alignSelf: 'center', paddingVertical: 5, borderRadius: 5, width: '90%' }, Styles.center]}>
                                        <Text style={{ color: Color.BUTTON_NAME_COLOR }}>Add to cart</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>


                    {/* <List data={my_Jobs}
                        renderItem={this.renderMyJob}
                    /> */}
                    <View style={{ height: 10, width: '100%' }} />
                </Content>

            </SafeAreaLayout>
        );
    }
}