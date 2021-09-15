import React, { Component } from "react";
import { View, Text, RefreshControl, AsyncStorage, Alert, StyleSheet, PermissionsAndroid } from "react-native";
import { Avatar, Divider, ThemedComponentProps } from "react-native-ui-kitten";
import { SafeAreaLayout, SaveAreaInset } from "../../../components/safe-area-layout.component";
import { Toolbar } from "../../../components/toolbar.component";
import { BackIcon, CartIcon, CancelIcon, SearchIcon, WishIcon, MenuIcon } from "../../../assets/icons";
import { FlatList, ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { AppConstants, Color } from "../../../constants";
import { Styles } from "../../../assets/styles";
import axios from 'axios';
import Animated from "react-native-reanimated";
import { AppRoute } from "../../../navigation/app-routes";
import Axios from "axios";
import { CombinedProductScreenProps } from "../../../navigation/combined-navigator/combinedAllProduct.navigator";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geolocation from 'react-native-geolocation-service';
import Modal from "react-native-modal";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Header } from 'native-base';
import { StackActions } from "@react-navigation/native";
import { scale } from "react-native-size-matters";
import {LableText} from '../../../constants/LabelConstants';

const HEADER_MAX_HEIGHT = 205;
const HEADER_MIN_HEIGHT = 0;

export class CombinedProductScreen extends Component<CombinedProductScreenProps, ThemedComponentProps & any> {
    constructor(props) {
        super(props);
        this.state = {
            allProduct: [],
            allCategory: [],
            allBrand: [],
            selectedCategory: '',
            selectedBrand: '',
            userData: [],
            shopId: '',
            allMeasurement: [],
            wishList: '',
            search: '',
            lat: '',
            long: '',
            searchVisible: '',
            refreshing: false,
            location: '',
            allData: [
                {
                    url: '/api/lookup/getallmeasurementtype',
                    method: 'GET',
                    variable: 'allMeasurement',
                }
               ],
            scrollY: new Animated.Value(0),
            single: false,
            shopName: '',
        }

        this._onRefresh = this._onRefresh.bind(this);
        this.handleAddToCart = this.handleAddToCart.bind(this);
    }

    // UNSAFE_componentWillMount() {
    //     // const { shopId } = this.props.route.params
    //     // Alert.alert(""+shopId)
    //     console.log('route DAta', this.props.route.params)
    // }

    async componentDidMount() {
        const { allData } = this.state;

        let userDetail = await AsyncStorage.getItem('userDetail');
        let userData = JSON.parse(userDetail);

        const logedIn = await AsyncStorage.getItem('logedIn');
        const shopIdAsync = await AsyncStorage.getItem('shopId')
        const shopName = await AsyncStorage.getItem('shopName')
        this.setState({
            userData: userData
        })
        if (null != logedIn && logedIn === 'true') {
            axios({
                method: 'GET',
                url: AppConstants.API_BASE_URL + '/api/user/get/' + userData.userId,
            }).then((response) => {
                this.setState({
                    userData: response.data,
                    wishList: response.data.wishList
                })
            }, (error) => {
                Alert.alert("Server error.")
            });
        }
        if (null != shopIdAsync && shopIdAsync !== '') {
            this.setState({ single: true, shopName: shopName, shopId: shopIdAsync })
            axios({
                method: 'GET',
                url: AppConstants.API_BASE_URL + '/api/product/getproductbyshopid/' + shopIdAsync,
            }).then((response) => {
                if (null != response.data) {
                    this.setState({
                        allProduct: response.data,
                    })
                }
            }, (error) => {
                Alert.alert("Server error!.")
            });
            axios({
                method: 'GET',
                url: AppConstants.API_BASE_URL + '/api/category/getcategorybyshopid/' + shopIdAsync,
            }).then((response) => {
                if (null != response.data) {
                    this.setState({
                        allCategory: response.data,
                        selectedCategory: response.data[0].id
                    })
                }
            }, (error) => {
                Alert.alert("Server error!.")
            });
            axios({
                method: 'GET',
                url: AppConstants.API_BASE_URL + '/api/brand/getbrandbyshopid/' + shopIdAsync,
            }).then((response) => {
                if (null != response.data) {
                    this.setState({
                        allBrand: response.data,
                        selectedBrand: response.data[0].id
                    })
                }
            }, (error) => {
                Alert.alert("Server error!.")
            });
        } else {
            try {
                var lat = await AsyncStorage.getItem('latitude')
                var long = await AsyncStorage.getItem('longitude')
                var location = await AsyncStorage.getItem('location')
    
                axios({
                    method: 'GET',
                    url: AppConstants.API_BASE_URL + '/api/product/getbylocation/' + lat + '/' + long,
                }).then((response) => {
                    this.setState({
                        allProduct: response.data,
                        lat:lat,
                        long: long,
                        location: location,
                        single: false
                    })
                }, (error) => {
                    Alert.alert("Server error.")
                });
            } catch (err) {
                console.warn(err);
            }

            axios({
                method: 'GET',
                url: AppConstants.API_BASE_URL + '/api/category/getallcategory',
            }).then((response) => {
                if (null != response.data) {
                    this.setState({
                        allCategory: response.data,
                        selectedCategory: response.data[0].id
                    })
                }
            }, (error) => {
                Alert.alert("Server error!.")
            });
            axios({
                method: 'GET',
                url: AppConstants.API_BASE_URL + '/api/brand/getallbrand/',
            }).then((response) => {
                if (null != response.data) {
                    this.setState({
                        allBrand: response.data,
                        selectedBrand: response.data[0].id
                    })
                }
            }, (error) => {
                Alert.alert("Server error!.")
            });
        }

        allData.map((data, index) => {
            // console.log(allData)
            axios({
                method: data.method,
                url: AppConstants.API_BASE_URL + data.url,
            }).then((response) => {
               if (data.variable === 'allMeasurement') {
                    console.log(data.variable, response.data)
                    this.setState({
                        allMeasurement: response.data,
                    })
                } else if (data.variable === 'user') {
                    console.log(data.variable, response.data)
                    this.setState({
                        userData: response.data,
                        wishList: response.data.wishList
                    })
                }
            }, (error) => {
                Alert.alert("Server error.")
            });
        })
    }

    addToCart(id) {

    }

    navigateToCart() {
        const pushAction = StackActions.push(AppRoute.CUSTOMER_CART)
        this.props.navigation.dispatch(pushAction);
    }

    selectCategory(id) {
        const { shopId } = this.state;
        axios({
            method: 'GET',
            url: AppConstants.API_BASE_URL + '/api/brand/getallDeactivebrandbyshopid/' + id,
        }).then((response) => {
            if (null != response.data) {
                this.setState({
                    allBrand: response.data,
                    selectedCategory: id
                })
            }
        }, (error) => {
            Alert.alert("Server error!.")
        });

        axios({
            method: 'GET',
            url: AppConstants.API_BASE_URL + '/api/product/getproductbyshopidandcategory/' + shopId + '/' + id,
        }).then((response) => {
            if (null != response.data) {
                this.setState({
                    allProduct: response.data,
                })
            }
        }, (error) => {
            Alert.alert("Server error!.")
        });
        // this.setState({ selectedCategory: id })
    }

    selectBrand(id, brandName) {
        const { shopId } = this.state
        axios({
            method: 'GET',
            url: AppConstants.API_BASE_URL + '/api/product/getproduct/shopid/brand/' + shopId + '/' + id,
        }).then((response) => {
            if (null != response.data) {
                this.setState({
                    allProduct: response.data,
                    selectedBrand: id
                })
            }
        }, (error) => {
            Alert.alert("Server error!.")
        });
        // this.setState({ selectedBrand: id })
    }

    navigateProductDetail(id, shopId) {
        const pushAction = StackActions.push(AppRoute.CUSTOMER_PRODUCT_DETAIL, { productId: String(id), shopId: String(shopId) });
        this.props.navigation.dispatch(pushAction)
    }

    async handleAddToCart(productId, shopId) {
        const { userData } = this.state;
        // console.log('data in add to cart', productId, shopId, userData.userId)
        const logedIn = await AsyncStorage.getItem('logedIn');
        if (null != logedIn && logedIn === 'true') {
            // Alert.alert(''+ userData.userId + productId + logedIn + shopId)
            Axios({
                method: 'POST',
                url: AppConstants.API_BASE_URL + '/api/cart/create',
                data: {
                    shopId: shopId,
                    userId: userData.userId,
                    productId: productId,
                    productQuantity: 1
                }
            }).then((response) => {
                if (null != response.data) {
                    if (response.data.status === 'true') {
                        Alert.alert("Product added to cart.")
                    } else {
                        Alert.alert("Product allready exists in your cart.")
                    }
                }
            }, (error) => {
                // Alert.alert("Server error.")
            });
        } else {
            this.props.navigation.navigate(AppRoute.AUTH);
        }
    }

    async handleWishList(productId) {
        const { isSelectedWish, userData } = this.state
        const logedIn = await AsyncStorage.getItem('logedIn');
        if (null != logedIn && logedIn === 'true') {
            axios({
                method: "GET",
                url: AppConstants.API_BASE_URL + '/api/user/wishlist/add/' + userData.userId + "/" + productId,
            }).then((response) => {
                this.setState({
                    isSelectedWish: !isSelectedWish
                })
                this._onRefresh();
            }, (error) => {
                Alert.alert("Server error.")
            });
        } else {
            this.props.navigation.navigate(AppRoute.AUTH);
        }
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.componentDidMount().then(() => {
            this.setState({ refreshing: false });
        });

    }

    shopSearch() {
        // Alert.alert('')
        const { search, single, shopId, lat, long } = this.state;
        single ?
        axios({
            method: 'GET',
            url: AppConstants.API_BASE_URL + '/api/product/search/offer/shopId/' + shopId + '/'  + search
        }).then((response) => {
            this.setState({
                allProduct: response.data,
                search: ''
            })
        }, (error) => {
            // Alert.alert("Server error.")
        })
        : axios({
            method: 'GET',
            url: AppConstants.API_BASE_URL + '/api/product/search/' + search + '/' + lat + '/' + long,
        }).then((response) => {
            this.setState({
                allProduct: response.data,
                search: ''
            })
        }, (error) => {
            // Alert.alert("Server error.")
        });
    }

    toggleModal() {
        this.setState({
            searchVisible: false
        })
    }

    handleSearchLatLong(data, details) {
        this.toggleModal();

        Axios({
            url: 'https://maps.googleapis.com/maps/api/place/details/json?key=' + AppConstants.GOOGLE_MAP_KEY + '&place_id=' + data.place_id
        }).then((response) => {
            const { data: { result: { geometry: { location } } } } = response
            const { lat, lng } = location
            AsyncStorage.setItem('latitude', String(lat))
            AsyncStorage.setItem('longitude', String(lng))
            AsyncStorage.setItem('location', String(data.structured_formatting.main_text))

            console.log('Location', data.structured_formatting.main_text)
            axios({
                method: 'GET',
                url: AppConstants.API_BASE_URL + '/api/product/getbylocation/' + lat + '/' + lng,
            }).then((response) => {
                this.setState({
                    allProduct: response.data,
                    lat: lat,
                    long: lng,
                    searchVisible: false,
                    location: data.structured_formatting.main_text
                })
            }, (error) => {
                Alert.alert("Server error.")
            });

        }, (error) => {
            console.log(error);
        })
    }

    async onCurrentLocation() {
        console.log('Map Clicked')
        this.toggleModal();
        // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition((position) => {
            var lat = position.coords.latitude
            var long = position.coords.longitude
            console.log('location', lat, position.coords.accuracy)
            AsyncStorage.setItem('latitude', String(lat))
            AsyncStorage.setItem('longitude', String(long))
            AsyncStorage.setItem('location', 'Current Location')

            axios({
                method: 'GET',
                url: AppConstants.API_BASE_URL + '/api/product/getbylocation/' + lat + '/' + long,
            }).then((response) => {
                this.setState({
                    allProduct: response.data,
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                    searchVisible: false,
                    location: 'Current Location'
                })
            }, (error) => {
                Alert.alert("Server error.")
            });
        }, (erroe) => {

        }, { enableHighAccuracy: true })
        // } else {
        //     console.log("Camera permission denied");
        // }
    }

    render() {
        const { allProduct, shopName, single, searchVisible, location, lat, long, refreshing, shopId, search, allCategory, allMeasurement, wishList, allBrand, selectedBrand, selectedCategory } = this.state;
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
                <Modal style={Styles.modal} isVisible={searchVisible}>
                    <View style={Styles.modalHeader}>
                        <TouchableOpacity>
                            <Text onPress={() => { this.toggleModal() }}><CancelIcon fontSize={25} /></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <View>
                            <Text onPress={() => { this.onCurrentLocation() }} style={{ color: Color.BUTTON_NAME_COLOR, padding: 10, backgroundColor: Color.COLOR, opacity: 0.8, borderRadius: 10, marginTop: 10 }}>{LableText.USE_CURRENT_LOCATION}</Text>
                        </View>
                        <GooglePlacesAutocomplete
                            placeholder='Search'
                            styles={{}}
                            onPress={(data, details = null) => {
                                // 'details' is provided when fetchDetails = true
                                this.handleSearchLatLong(data, details)
                                console.log('New Location', data);
                            }}
                            query={{
                                key: AppConstants.GOOGLE_MAP_KEY,
                                language: 'en',
                            }}
                        // currentLocation={true}
                        // currentLocationLabel=LableText.USE_CURRENT_LOCATION
                        />
                        {lat !== '' && long !== '' ?
                            <>
                                <MapView
                                    style={{ flex: 1 }}
                                    provider={PROVIDER_GOOGLE}
                                    showsUserLocation={true}
                                    initialRegion={{
                                        latitude: Number(lat),
                                        longitude: Number(long),
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421,
                                    }}

                                    region={{
                                        latitude: Number(lat),
                                        longitude: Number(long),
                                        latitudeDelta: 0.0922,
                                        longitudeDelta: 0.0421,
                                    }}
                                >

                                    <Marker
                                        coordinate={{
                                            latitude: Number(lat),
                                            longitude: Number(long),
                                        }
                                        }
                                    >
                                    </Marker>

                                </MapView>
                            </> : null}
                    </View>
                </Modal>
                <Toolbar
                    title={single ? shopName : 'All Shop Product'}
                    backIcon={MenuIcon}
                    onBackPress={this.props.navigation.openDrawer}
                    onRightPress={() => { this.navigateToCart() }}
                    menuIcon={CartIcon}
                    style={{ marginTop: -5, marginLeft: -5 }}
                />

                <Divider />
                <Divider />
                <Divider />
                {!single ?
                    <View style={{ padding: 5 }}>
                        <Text onPress={() => { this.setState({ searchVisible: true }) }} style={{ fontWeight: 'bold', fontSize: 18, color: Color.COLOR }}>Location: <Text style={{ fontSize: 16, fontWeight: '100' }}>{location}</Text></Text>
                    </View> : null}
                {/* <Header style={styles.header}> */}
                <View style={[Styles.searchBox, { marginBottom: 0 }]}>

                    <TextInput
                        placeholder="Search"
                        style={[Styles.searchInput]}
                        value={search}
                        onChangeText={(value) => { this.setState({ search: value }) }}
                    />
                    <View style={[{ width: '10%', }, Styles.center]}>
                        <TouchableOpacity onPress={() => { this.shopSearch() }}>
                            <Text style={Styles.searchIcon}><SearchIcon /></Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <Divider />
                {/* </Header> */}
                {single ?
                    <>
                        <Header style={{ backgroundColor: '#ffffff', height: 50, marginTop: 0 }}>

                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                <View style={{ marginTop: 10 }}>
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
                        <Header style={{ backgroundColor: '#ffffff', height: 50, marginTop: 0 }}>

                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                <View style={{ marginTop: 10 }}>
                                    <FlatList
                                        style={{}}
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        data={allBrand}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <TouchableOpacity onPress={() => { this.selectBrand(item.id, item.name) }}>
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
                    </> : null}
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
                        <ScrollView style={[Styles.customer_content, { marginTop: 10 }]} showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={this._onRefresh.bind(this)}
                                />
                            }
                        >

                            <View style={Styles.all_Item_Main_View}>
                                {null != allProduct ? allProduct.map((data, index) => {
                                    return (
                                        <View style={Styles.all_Item_List}>
                                            <View style={{ height: 200 }}>
                                                <TouchableOpacity onPress={() => { this.navigateProductDetail(data.productId, data.shopId) }}>
                                                    <View style={[Styles.all_Item_Image_1, Styles.center]}>
                                                        <Avatar source={{ uri: AppConstants.IMAGE_BASE_URL + '/product/' + data.productId + '_' + 1 + "_" + data.shopId + '_product.png' }} style={Styles.product_avatar} />
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                            {/* <TouchableOpacity onPress={() => { this.navigateProductDetail(data.productId) }}>
                                                <View style={[Styles.all_Item_Image_1, Styles.center]}>
                                                    <Avatar source={require("../../../assets/dawat_rice.jpg")} style={Styles.all_Item_Image} />
                                                </View>

                                            </TouchableOpacity> */}

                                            <View style={Styles.all_Item_Detail}>
                                                <View style={{ backgroundColor: '#fff', paddingHorizontal: 5 }}>
                                                    <View style={{ flexDirection: 'row'}}>
                                                        {null != allBrand ? allBrand.map((brand, index) => {
                                                            if (brand.id == data.brand) {
                                                                return (
                                                                    <View style={{width: '80%', flexWrap: 'wrap'}}>
                                                                        <Text style={{ color: '#000', marginTop: scale(5), fontWeight: 'bold' }}>{data.name} {`\n`} {brand.name}</Text>
                                                                    </View>
                                                                );
                                                            }
                                                        }) : null}
                                                        {null !== wishList ?
                                                            <View style={[Styles.product_2nd_wish_view]}>
                                                                <TouchableOpacity onPress={() => { this.handleWishList(data.productId) }}>
                                                                    <Text
                                                                        style={wishList.includes(data.productId) ?
                                                                            Styles.selected_wish_icon :
                                                                            Styles.wish_icon
                                                                        }
                                                                    >
                                                                        <WishIcon />
                                                                    </Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                            : null
                                                        }
                                                    </View>
                                                    {null != allMeasurement ? allMeasurement.map((brand, index) => {
                                                        if (brand.lookUpId == data.measurement) {
                                                            return (
                                                                <>
                                                                    <Text style={{ color: Color.COLOR_ITEM_NAME, marginTop: 5 }}>{data.quantity} {brand.lookUpName}</Text>
                                                                </>
                                                            );
                                                        }
                                                    }) : null}
                                                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginVertical: 5 }}>
                                                        <Text style={{ color: '#000', fontSize: 18, fontWeight: 'bold' }}>Rs. {data.price}</Text>
                                                        {data.offerActiveInd ?
                                                            <Text style={{ color: Color.COLOR, fontSize: 20, textDecorationLine: 'line-through' }}>{data.oldPrice}</Text>
                                                            : null
                                                        }
                                                    </View>
                                                    {null != data.offerActiveInd ? data.offerActiveInd ?
                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                                            <Text style={{ color: Color.COLOR }}>{data.offerPercent} % off</Text>
                                                            <Text style={{ color: Color.COLOR }}>{data.offerActiveInd && data.offerTo ? data.offerTo.substr(8, 2) + "/" + data.offerTo.substr(5, 2) + "/" + data.offerTo.substr(0, 4) : null}</Text>
                                                        </View> :
                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                                            <Text style={{ color: Color.COLOR, marginTop: 2.5 }}></Text>
                                                            <Text style={{ color: Color.COLOR }}></Text>
                                                        </View> : null
                                                    }

                                                </View>
                                                {data.stock ? data.stock > 0 ? 
                                                <TouchableOpacity onPress={() => { this.handleAddToCart(data.productId, data.shopId) }}>
                                                    <View style={[{ backgroundColor: Color.COLOR, marginVertical: 10, alignSelf: 'center', paddingVertical: 5, borderRadius: 5, width: '90%' }, Styles.center]}>
                                                        <Text style={{ color: Color.BUTTON_NAME_COLOR }}>Add to cart</Text>
                                                    </View>
                                                </TouchableOpacity>:

                                                <TouchableOpacity >
                                                    <View style={[{ backgroundColor: Color.COLOR, marginVertical: 10, alignSelf: 'center', paddingVertical: 5, borderRadius: 5, width: '90%' }, Styles.center]}>
                                                        <Text style={{ color: Color.BUTTON_NAME_COLOR }}>Out of Stock</Text>
                                                    </View>
                                                </TouchableOpacity>: 
                                                 <TouchableOpacity >
                                                 <View style={[{ backgroundColor: Color.COLOR, marginVertical: 10, alignSelf: 'center', paddingVertical: 5, borderRadius: 5, width: '90%' }, Styles.center]}>
                                                     <Text style={{ color: Color.BUTTON_NAME_COLOR }}>Out of Stock</Text>
                                                 </View>
                                             </TouchableOpacity>
                                                }
                                            </View>
                                        </View>
                                    )
                                }) : null}
                            </View>
                            <View style={{ height: 10, width: '100%' }} />
                        </ScrollView>
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