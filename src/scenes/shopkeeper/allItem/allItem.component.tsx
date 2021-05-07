import React from 'react';
import {
    ListRenderItemInfo, View, StyleSheet, TouchableOpacity,
    ActivityIndicator, Image, Alert, FlatList, ScrollView, RefreshControl, TextInput
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
import { ScrollableTab, Tab, Item, Container, Content, Tabs, Header, TabHeading, Thumbnail, Input, Label, Footer, FooterTab } from 'native-base';
import { AllItemScreenProps } from '../../../navigation/shopKeeperNavigator/allItem.Navigator';
import { AppRoute } from '../../../navigation/app-routes';
import { ProgressBar } from '../../../components/progress-bar.component';
import { SearchIcon, CartIcon, PlusCircle } from '../../../assets/icons';
import { TimeLineData } from '../../../data/TimeLineData.model';
import { AppConstants } from '../../../constants/AppConstants';
import { Toolbar } from '../../../components/toolbar.component';
import {
    SafeAreaLayout,
    SafeAreaLayoutElement,
    SaveAreaInset,
} from '../../../components/safe-area-layout.component';
import { MenuIcon, ExperienceIcon, LocationIcon, PublicIcon, PencilIcon } from '../../../assets/icons';
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
import { Styles } from '../../../assets/styles'
import { Color } from '../../../constants/LabelConstants';
// import axios from 'axios';  
// import Container from '@react-navigation/core/lib/typescript/NavigationContainer';

const allTodos: TimeLineData[] = [
    TimeLineData.getAllTimelineData()
];

type MyState = {
    displayName: String,
    dataSource: [],
    userId: String,
    likeCount: number,
    dislikeCount: number,
    liked: boolean[],
    disliked: boolean[],
    categories: [],
    textShown: -1,
    selectedIndex: number;
}


const renderItem = ({ item, index }) => (
    <ListItem title={`${item.title} ${index + 1}`} />
);

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 70;
const PROFILE_IMAGE_MAX_HEIGHT = 80;
const PROFILE_IMAGE_MIN_HEIGHT = 40;


export class AllItemScreen extends React.Component<AllItemScreenProps & ThemedComponentProps, MyState & any> {
    constructor(props) {
        super(props);
        this.state = {
            allProduct: [],
            allCategory: [],
            allBrand: [],
            selectedCategory: '',
            selectedBrand: '',

            allData: [{
                url: 'http://192.168.0.106:8082/api/product/getallproduct',
                method: 'GET',
                variable: 'allProduct',
            },
            {
                url: 'http://192.168.0.106:8082/api/category/getallcategory',
                method: 'GET',
                variable: 'allCategory',
            },
            {
                url: 'http://192.168.0.106:8082/api/brand/getallbrand',
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
                        selectedCategory: response.data[0].id
                    })
                } else if (data.variable === 'allBrand') {
                    console.log(data.variable, response.data)
                    this.setState({
                        allBrand: response.data,
                        selectedBrand: response.data[0].id
                    })
                }
            }, (error) => {
                Alert.alert("Please enter a valid email ID and password.")
            });
        })
    }

    addToCart(id) {
        axios({
            method: 'GET',
            url: '',
        }).then((response) => {

        }, (error) => {

        });
    }

    navigateToCart() {
        this.props.navigation.navigate(AppRoute.CUSTOMER_CART)
    }

    onRefresh() {
        this.setState({ refreshing: true });
        this.componentDidMount().then(() => {
            this.setState({ refreshing: false });
        });

    }

    selectCategory(id) {
        this.setState({ selectedCategory: id })
    }

    selectBrand(id) {
        this.setState({ selectedBrand: id })
    }

    navigateProductDetail(id) {
        Alert.alert(id)
    }

    render() {
        const { allProduct, allCategory, allBrand, selectedBrand, selectedCategory } = this.state;
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

                <Animated.View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    height: HEADER_MIN_HEIGHT,
                    zIndex: headerZIndex,
                    transform: [{ translateY: headerY }]
                }}>
                    <Toolbar
                        title='Product'
                        backIcon={MenuIcon}
                        onBackPress={this.props.navigation.openDrawer}
                        onRightPress={() => { this.navigateToCart() }}
                        menuIcon={CartIcon}
                        style={{ marginTop: -5, marginLeft: -5 }}
                    />
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
                                            <TouchableOpacity onPress={() => { this.selectCategory(item.id) }}>
                                                <View style={selectedCategory == item.id ? Styles.product_nav_button_selected : Styles.product_nav_button}>
                                                    <Text style={selectedCategory == item.id ? Styles.product_nav_button_selected_text : Styles.product_nav_button_text}>{item.name}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    }}
                                >
                                </FlatList>
                            </View>
                        </View>
                    </Header>
                    <Divider />
                    <Header style={{ backgroundColor: '#ffffff', height: 30, marginTop: 15 }}>

                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <View style={{ marginTop: -10 }}>
                                <FlatList
                                    style={{}}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    data={allBrand}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <TouchableOpacity onPress={() => { this.selectBrand(item.id) }}>
                                                <View style={selectedBrand == item.id ? Styles.product_nav_button_selected : Styles.product_nav_button}>
                                                    <Text style={selectedBrand == item.id ? Styles.product_nav_button_selected_text : Styles.product_nav_button_text}>{item.name}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    }}
                                >
                                </FlatList>
                            </View>
                        </View>
                    </Header>
                </Animated.View>
                <Animated.ScrollView style={{ flex: 1 }}
                    bounces={false}
                    scrollEventThrottle={16}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }])}>
                    <Animated.View style={{
                        height: '100%',
                        width: '100%',
                        marginTop: profileImageMarginTop
                    }}>
                        <Content style={[Styles.customer_content, { marginTop: 110 }]} showsVerticalScrollIndicator={false}
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
                                                </View>

                                                <View style={Styles.all_Item_Detail}>
                                                    <View style={{ backgroundColor: '#fff', paddingHorizontal: 5 }}>
                                                        {/* {allBrand.map((brand, index) => {
                                                            if (brand.id == data.brand) {
                                                                return (
                                                                    <> */}
                                                        <Text style={{ color: '#000', marginTop: 5, fontWeight: 'bold' }}>{data.name}</Text>
                                                        {/* </>
                                                                );
                                                            }
                                                        })} */}
                                                        {allBrand.map((brand, index) => {
                                                            if (brand.id == data.brand) {
                                                                return (
                                                                    <>
                                                                        <Text style={{ color: Color.COLOR_ITEM_NAME, marginTop: 5 }}>{brand.name}</Text>
                                                                    </>
                                                                );
                                                            }
                                                        })}
                                                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginVertical: 5 }}>
                                                            <Text style={{ color: '#000', fontSize: 18, fontWeight: 'bold' }}>Rs. {data.price}</Text>
                                                            {data.offerActiveInd ?
                                                                <Text style={{ color: Color.COLOR, fontSize: 20, textDecorationLine: 'line-through' }}>{data.oldPrice}</Text>
                                                                : null
                                                            }
                                                        </View>
                                                        {data.offerActiveInd ?
                                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                                                <Text style={{ color: Color.COLOR }}>{data.offerPercent} % off</Text>
                                                                <Text style={{ color: Color.COLOR }}>{data.offerTo.substr(8, 2) + "/" + data.offerTo.substr(5, 2) + "/" + data.offerTo.substr(0, 4)}</Text>
                                                            </View> : null
                                                        }

                                                    </View>
                                                    {/* <TouchableOpacity onPress={() => { this.addToCart(data.id) }}> */}
                                                        <View style={[{ backgroundColor: Color.COLOR, marginVertical: 10, alignSelf: 'center', paddingVertical: 5, borderRadius: 5, width: '90%' }, Styles.center]}>
                                                            <Text style={{ color: Color.BUTTON_NAME_COLOR }}>Available {data.quantity}</Text>
                                                        </View>
                                                    {/* </TouchableOpacity> */}
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })}
                            </View>
                            <View style={{ height: 10, width: '100%' }} />
                        </Content>
                    </Animated.View>
                </Animated.ScrollView>

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