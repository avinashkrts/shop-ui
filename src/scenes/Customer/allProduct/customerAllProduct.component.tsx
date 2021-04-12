import React, { Component } from "react";
import { View, Text, RefreshControl, AsyncStorage, Alert, StyleSheet } from "react-native";
import { Avatar, List, Divider, ListItemElement, ThemedComponentProps } from "react-native-ui-kitten";
import { CustomerAllProductScreenProps } from "../../../navigation/customer-navigator/customerAllProduct.navigator";
import { SafeAreaLayout, SaveAreaInset } from "../../../components/safe-area-layout.component";
import { Toolbar } from "../../../components/toolbar.component";
import { CartIcon, MenuIcon, SearchIcon } from "../../../assets/icons";
import { FlatList, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Color } from "../../../constants";
import { Styles } from "../../../assets/styles";
import { Content, Header, ListItem } from "native-base";
import axios from 'axios';
import Animated from "react-native-reanimated";

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 70;

export class CustomerAllProductScreen extends Component<CustomerAllProductScreenProps, ThemedComponentProps & any> {
    constructor(props) {
        super(props);
        this.state = {
            allProduct: [],
            allCategory: [],
            allBrand: [],
            selectedCategory: 1,

            allData: [{
                url: 'http://192.168.0.104:8091/api/product/getallproduct',
                method: 'GET',
                variable: 'allProduct',
            },
            {
                url: 'http://192.168.0.104:8091/api/category/getallcategory',
                method: 'GET',
                variable: 'allCategory',
            },
            {
                url: 'http://192.168.0.104:8091/api/brand/getallbrand',
                method: 'GET',
                variable: 'allBrand',
            }],
            scrollY: new Animated.Value(0),
        }

        this.onRefresh = this.onRefresh.bind(this);
    }

    async componentDidMount() {
        const { allData } = this.state;

        allData.map((data, index) => {
            // console.log(allData)
            axios({
                method: data.method,
                url: data.url,
            }).then((response) => {
                if (data.variable === 'allProduct') {
                    console.log(data.variable, response.data)
                    this.setState({ allProduct: response.data })
                } else if (data.variable === 'allCategory') {
                    console.log(data.variable, response.data)
                    this.setState({
                        allCategory: response.data,
                        // selectedCategory: response.data[0].id
                    })
                } else if (data.variable === 'allBrand') {
                    console.log(data.variable, response.data)
                    this.setState({ allBrand: response.data })
                }
            }, (error) => {
                Alert.alert("Please enter a valid email ID and password.")
            });
        })
    }

    onRefresh() {
        this.setState({ refreshing: true });
        this.componentDidMount().then(() => {
            this.setState({ refreshing: false });
        });

    }

    navigateProductDetail(id) {
        Alert.alert(id)
    }

    render() {
        const { allProduct, allCategory, allBrand } = this.state;
        const diffClamp = Animated.diffClamp(this.state.scrollY, 0, HEADER_MAX_HEIGHT)
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp'
        })

        const headerZIndex = Animated.interpolate(diffClamp, {
            inputRange: [0, 1000],
            outputRange: [1000, 0]
        })

        const containtZIndex = Animated.interpolate(diffClamp, {
            inputRange: [1000, 1000],
            outputRange: [1000, 1000]
        })


        // const scrollY = new Animated.Value(0);

        const headerY = Animated.interpolate(diffClamp, {
            inputRange: [0, HEADER_MAX_HEIGHT],
            outputRange: [0, -HEADER_MAX_HEIGHT],
        })

        const profileImageMarginTop = Animated.interpolate(diffClamp, {
            inputRange: [0, HEADER_MIN_HEIGHT],
            outputRange: [HEADER_MIN_HEIGHT, HEADER_MIN_HEIGHT]
        })
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
                {/* <Animated.View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: 'lightskyblue',
          height: HEADER_MIN_HEIGHT,
          zIndex: headerZIndex,
          transform: [{ translateY: headerY }]
        }}> */}
                {/* <Header style={styles.header}> */}
                <View style={Styles.searchBox}>
                    <Text style={Styles.searchIcon}><SearchIcon /></Text>
                    <TextInput
                        placeholder="Search"
                        style={Styles.searchInput}
                    />
                </View>
                {/* </Header> */}
                <Header style={{ backgroundColor: '#ffffff', height: 30, marginTop: -5 }}>

                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <View style={{ marginTop: -10 }}>
                            <FlatList
                                style={{}}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                data={allCategory}
                                renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity onPress={e => { }}>
                                            <View style={{ padding: 10, marginTop: 5, backgroundColor: '#ffffff' }}>
                                                <Text style={this.state.selectedCategory == item.id ? styles.selected : styles.notSelected}>{item.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }}
                            >
                            </FlatList>
                        </View>
                    </View>
                </Header>
                {/* <Header style={{ backgroundColor: '#ffffff', height: 30, marginTop: -5 }}>

                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <View style={{ marginTop: -10 }}>
                            <FlatList
                                style={{}}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                data={allBrand}
                                renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity onPress={e => { }}>
                                            <View style={{ padding: 10, marginTop: 5, backgroundColor: '#ffffff' }}>
                                                <Text style={{}}>{item.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }}
                            >
                            </FlatList>
                        </View>
                    </View>
                </Header> */}
                {/* </Animated.View> */}
                <Content style={Styles.customer_content} showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                >

                    <View style={Styles.all_Item_Main_View}>
                        {allProduct.map((data, index) => {
                            return (
                                <View style={Styles.all_Item_List}>
                                    <TouchableOpacity onPress={() => { }}>
                                        <View style={[Styles.all_Item_Image_1, Styles.center]}>
                                            <Avatar source={require("../../../assets/dawat_rice.jpg")} style={Styles.all_Item_Image} />
                                            {/* <View>
                                        <Avatar source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/mobile.jpeg' }} style={styles.image} />
                                    </View> */}
                                        </View>
                                        <View style={Styles.all_Item_Detail}>
                                            <View style={{ backgroundColor: '#fff', paddingHorizontal: 5 }}>
                                                <Text style={{ color: '#000', marginTop: 5, fontWeight: 'bold' }}></Text>
                                                <Text style={{ color: Color.COLOR_ITEM_NAME, marginTop: 5 }}></Text>

                                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginVertical: 5 }}>
                                                    <Text style={{ color: '#000', fontSize: 18, fontWeight: 'bold' }}>Rs. 1,100</Text>
                                                    <Text style={{ color: Color.COLOR, fontSize: 20, textDecorationLine: 'line-through' }}>1,150</Text>
                                                </View>

                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                                    <Text style={{ color: Color.COLOR }}>3.5 % off</Text>
                                                    <Text style={{ color: Color.COLOR }}>Offer till Tue.</Text>
                                                </View>
                                            </View>
                                            <TouchableOpacity onPress={() => { }}>
                                                <View style={[{ backgroundColor: Color.COLOR, marginVertical: 10, alignSelf: 'center', paddingVertical: 5, borderRadius: 5, width: '90%' }, Styles.center]}>
                                                    <Text style={{ color: Color.BUTTON_NAME_COLOR }}>Add to cart</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </View>
                    <View style={{ height: 10, width: '100%' }} />
                </Content>

            </SafeAreaLayout>
        );
    }
}

const styles = StyleSheet.create({
    ImgBgTwo: {
        position: 'absolute',
        borderRadius: 55,
        alignSelf: 'center',
        height: 11, width: 11,
        transform: [{ scaleX: 2 }],
        backgroundColor: 'white',
        marginTop: 20
    },
    ImgBgOne: {
        height: 9,
        width: 9,
        backgroundColor: 'white',
        borderRadius: 50,
        alignSelf: 'center',
        marginTop: 9,
        position: 'absolute'
    },
    askButton: {
        backgroundColor: '#D8D8D899',
        width: 50,
        height: 50,
        borderRadius: 30,
        position: 'absolute',
        alignSelf: 'flex-end',
        zIndex: 100,
        bottom: 0,
        right: 0,
        marginBottom: 2,
        marginRight: 2
    },
    Search: {
        width: '88%', alignSelf: 'flex-end',
        position: 'absolute', zIndex: 100, marginTop: 5, borderRadius: 25
    },

    name: {
        fontSize: 12,
        marginRight: 5,
        marginTop: -5,
        marginLeft: 10,
        fontWeight: 'bold',
        marginBottom: 2
    },

    TextView: {
        width: '85%'
    },
    text: {
        textAlign: 'justify',
        fontSize: 15,
        color: 'black',
        marginRight: 5
    },
    safeArea: {
        flex: 1,
        paddingBottom: 0,
        // paddingHorizontal: 16,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },

    selected: {
        color: 'blue',
        borderBottomColor: 'blue',
        borderBottomWidth: 2,
        fontSize: 16,
        fontWeight: 'bold'
    },

    notSelected: {
        color: 'silver'
    }

});