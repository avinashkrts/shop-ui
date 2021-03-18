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
import { ScrollableTab, Tab, Item, Container, Content, Tabs, Header, TabHeading, Thumbnail, Input, Label, Footer, FooterTab, Picker } from 'native-base';
import { ProductDetailScreenProps } from '../../../navigation/shopKeeperNavigator/allItem.Navigator';
import { AppRoute } from '../../../navigation/app-routes';
import { ProgressBar } from '../../../components/progress-bar.component';
import { SearchIcon, EditIcon, PlusCircle, BackIcon } from '../../../assets/icons';
import { TimeLineData } from '../../../data/TimeLineData.model';
import { AppConstants } from '../../../constants/AppConstants';
import { Toolbar } from '../../../components/toolbar.component';
import {
    SafeAreaLayout,
    SafeAreaLayoutElement,
    SaveAreaInset,
} from '../../../components/safe-area-layout.component';
import { MenuIcon, ExperienceIcon, LocationIcon, PublicIcon, WishIcon } from '../../../assets/icons';
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
import { Color, LableText } from '../../../constants/LabelConstants';
import ImageResizer from 'react-native-image-resizer';
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


export class ProductDetailScreen extends React.Component<ProductDetailScreenProps & ThemedComponentProps, MyState & any> {
    constructor(props) {
        super(props)
        this.state = {
            isSelectedWish: false
        }
        this._onRefresh = this._onRefresh.bind(this);
        this.handleWishList = this.handleWishList.bind(this);
        this.navigationCart = this.navigationCart.bind(this);
        this.handleCart = this.handleCart.bind(this);
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.componentDidMount().then(() => {
            this.setState({ refreshing: false });
        });
    }

    // renderMyJob = ({ item }: any): ListItemElement => (
    //     <ListItem style={{ borderBottomColor: 'rgba(2,15,20,0.10)', borderBottomWidth: 10 }}>
    //         {item != null ?
    //             <View>
    //                 <TouchableOpacity onPress={(e) => this.handleJobSubmit(e, item.id, item.userId)}>
    //                     <View style={styles.card}>
    //                         <View style={styles.card1}>
    //                             <View style={styles.card1_1}></View>
    //                             <View style={styles.card1_2}>
    //                                 <Text style={styles.softwareEngineer}>{item.jobTitle}</Text>
    //                             </View>
    //                             <View style={styles.card1_3}>
    //                                 <Image
    //                                     source={require("../../../assets/logo.png")}
    //                                     resizeMode="contain"
    //                                     style={styles.image}
    //                                 />
    //                             </View>
    //                         </View>

    //                         <View style={styles.card1}>
    //                             <View style={styles.card1_1}>
    //                                 <Text><ExperienceIcon /></Text>
    //                             </View>
    //                             <View style={styles.card2}>
    //                                 {this.state.experience_Required.map((data, index) => {
    //                                     if (data.lookUpId == item.experienceRequired)
    //                                         return (
    //                                             <Text style={styles.loremIpsum}>{data.lookUpLabel}</Text>
    //                                         )
    //                                 })}

    //                             </View>
    //                         </View>

    //                         <View style={styles.card1}>
    //                             <View style={styles.card1_1}>
    //                                 <Text><LocationIcon /></Text>
    //                             </View>
    //                             <View style={styles.card2}>
    //                                 <Text style={styles.bangalore}>{item.location}</Text>
    //                             </View>
    //                         </View>

    //                         <View style={styles.card1}>
    //                             <View style={styles.card1_1}>
    //                                 <Text><PencilIcon /></Text>
    //                             </View>
    //                             <View style={[styles.card2, { flexWrap: 'wrap', flexDirection: 'row' }]}>
    //                                 {this.state.skill.map((data, index) => {
    //                                     return (
    //                                         <View>
    //                                             {item.skill.split(',').map((data1, index) => {
    //                                                 if (data1 == data.lookUpId)
    //                                                     return (
    //                                                         <View style={styles.skill}>
    //                                                             <Text style={styles.loremIpsum2}>{data.lookUpLabel}</Text>
    //                                                         </View>
    //                                                     )
    //                                             })
    //                                             }
    //                                         </View>
    //                                     )
    //                                 })}

    //                             </View>
    //                         </View>

    //                         <View style={styles.card1}>
    //                             <View style={styles.card1_1}>
    //                                 <Text><PublicIcon /></Text>
    //                             </View>
    //                             <View style={styles.card2}>
    //                                 <Text style={styles.loremIpsum5}>5 Mar 2020</Text>
    //                             </View>
    //                         </View>

    //                         <View style={[styles.card1, { marginTop: 15 }]}>
    //                             <View style={styles.card1_1}></View>
    //                             <View style={styles.card2}>
    //                                 <Text style={styles.softwareEngineer}>{item.companyName}</Text>
    //                             </View>
    //                         </View>
    //                     </View>

    //                     {/* <View style={styles.card1}>
    //                     <View style={styles.cardInner1}>
    //                         <View>
    //                             <Avatar source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/mobile.jpeg' }} style={styles.image} />
    //                         </View>
    //                     </View>

    //                     <View style={styles.cardInner2}>
    //                         <View style={styles.cardInner2_1}>
    //                             <Text style={styles.jobType}>{item.jobTitle}</Text>
    //                             <Text style={styles.companyName}>{item.companyName}</Text>
    //                             <Text style={styles.location}>{item.location}</Text>
    //                         </View>

    //                         <View style={styles.cardInner2_1}>
    //                             <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10 }}>

    //                                 {this.state.salary_Type.map((data, index) => {
    //                                     if (data.lookUpId == item.salaryType)
    //                                         return (
    //                                             <View style={{ flexDirection: 'column' }}>
    //                                                 <Text style={styles.subHeading}>Salary {data.lookUpLabel}</Text>
    //                                                 <Text style={styles.subData}>{item.salaryFrom} - {item.salaryTo}</Text>
    //                                             </View>
    //                                         )
    //                                 })}

    //                                 {this.state.experience_Required.map((data, index) => {
    //                                     if (data.lookUpId == item.experienceRequired)
    //                                         return (
    //                                             <View style={{ flexDirection: 'column' }}>
    //                                                 <Text style={styles.subHeading}>Experience</Text>
    //                                                 <Text style={styles.subData}>{data.lookUpLabel}</Text>
    //                                             </View>
    //                                         )
    //                                 })}

    //                                 {this.state.employment_Type.map((data, index) => {
    //                                     if (data.lookUpId == item.employmentType)
    //                                         return (
    //                                             <View style={{ flexDirection: 'column' }}>
    //                                                 <Text style={styles.subHeading}>Employment</Text>
    //                                                 <Text style={styles.subData}>{data.lookUpLabel}</Text>
    //                                             </View>
    //                                         )
    //                                 })}


    //                             </View>
    //                             {this.state.job_Industry.map((data, index) => {
    //                                 if (data.lookUpId == item.jobIndustry)
    //                                     return (
    //                                         <View style={{ flexDirection: 'column' }}>
    //                                             <Text style={styles.subHeading}>Job Category</Text>
    //                                             <Text style={styles.subData}>{data.lookUpLabel}</Text>
    //                                         </View>
    //                                     )
    //                             })}

    //                             {this.state.skill.map((data, index) => {
    //                                 if (data.lookUpId == item.skill)
    //                                     return (
    //                                         <View>
    //                                             <Text style={styles.skill}>Skills: {data.lookUpLabel}</Text>
    //                                         </View>
    //                                     )
    //                             })}


    //                         </View>

    //                         <View style={styles.cardInner2_2}>
    //                             <Text style={styles.subHeading}>30 Applicants</Text>
    //                             <Text style={styles.subHeading}>30 days ago</Text>
    //                         </View>

    //                     </View>
    //                 </View> */}
    //                 </TouchableOpacity>

    //                 {/* <Footer>
    //                 <FooterTab style={styles.footerTab}>
    //                     <TouchableOpacity style={styles.applyButton} onPress={() => this.props.navigation.navigate(AppRoute.HOME)}>
    //                         <Text style={styles.applyButtonText}>Apply Now</Text>
    //                     </TouchableOpacity>
    //                 </FooterTab>
    //             </Footer> */}

    //             </View> :
    //             <ActivityIndicator size='large' color='green' />}

    //     </ListItem>
    // )

    navigationCart() {
        this.props.navigation.navigate(AppRoute.CART)
    }

    navigationItemList() {
        // this.props.navigation.navigate(AppRoute.ITEMLIST)
    }

    //     ImageResizer.createResizedImage(path: "../../../assets/profile.jpeg", maxWidth: 100, maxHeight: 200, compressFormat, quality, rotation, outputPath)
    //   .then(response => {
    //         // response.uri is the URI of the new image that can now be displayed, uploaded...
    //         // response.path is the path of the new image
    //         // response.name is the name of the new image with the extension
    //         // response.size is the size of the new image
    //     })
    //   .catch(err => {
    //         // Oops, something went wrong. Check that the filename is correct and
    //         // inspect err to get more details.
    //     });

    addItem() { }

    handleCart() {
        this.navigationCart();
    }

    handleWishList() {
        const { isSelectedWish } = this.state
        this.setState({
            isSelectedWish: !isSelectedWish
        })
    }


    render() {
        const { isSelectedWish } = this.state
        return (
            <SafeAreaLayout
                style={Styles.safeArea}
                insets={SaveAreaInset.TOP}>
                <Toolbar
                    title='Product Details'
                    backIcon={BackIcon}
                    onBackPress={this.props.navigation.goBack}
                    style={{ marginTop: -5, marginLeft: -5 }}
                />

                <Divider />

                <Content style={Styles.customer_content} showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                >
                    {/* <Header style={styles.header}> */}
                    {/* <View style={Styles.searchBox}>
                        <Text style={Styles.searchIcon}><SearchIcon /></Text>
                        <TextInput
                            placeholder="Search"
                            style={Styles.searchInput}
                        />
                    </View> */}
                    {/* </Header> */}

                    <View style={[Styles.product_view, Styles.center]}>
                        <View style={[Styles.product_image, Styles.center]}>
                            <Avatar source={require("../../../assets/dawat_rice.jpg")} style={Styles.product_avatar} />
                        </View>
                    </View>

                    <View style={Styles.product_2nd_view}>
                        <View style={Styles.product_2nd_view_1}>
                            <View style={Styles.product_2nd_quantity_view}>
                                <Picker
                                    note
                                    mode="dropdown"
                                    style={[Styles.center, { marginVertical: -8, color: Color.COLOR, width: 80 }]}
                                    selectedValue={this.state.selected}
                                    onValueChange={() => { }}
                                >
                                    <Picker.Item label="1" value="key0" />
                                    <Picker.Item label="2" value="key1" />
                                </Picker>
                            </View>

                            <TouchableOpacity style={[Styles.product_2nd_buy_view, Styles.center]}>
                                <View>
                                    <Text style={Styles.product_2nd_buy_text}>{LableText.CART}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={[Styles.product_2nd_buy_view, Styles.center]}>
                                <View>
                                    <Text style={Styles.product_2nd_buy_text} onPress={() => {this.handleCart()}}>{LableText.BUY}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={Styles.product_2nd_wish_view}>
                            <Text onPress={() => { this.handleWishList() }} style={isSelectedWish ? Styles.selected_wish_icon : Styles.wish_icon}><WishIcon /></Text>
                        </View>


                    </View>

                    <View style={Styles.product_3rd_view}>
                        <View style={{ backgroundColor: '#fff', paddingHorizontal: 5 }}>
                            <Text style={{ color: '#000', paddingVertical: 20, fontWeight: 'bold', fontSize: 20 }}>Dawat Basmati Rice</Text>

                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginVertical: 5 }}>
                            <Text style={{ color: Color.COLOR_ITEM_NAME, marginTop: 5 }}>25 Kg.</Text>
                                <Text style={{ color: '#000', fontSize: 18, fontWeight: 'bold' }}>Rs. 1,100</Text>
                                <Text style={{ color: Color.COLOR, fontSize: 20, textDecorationLine: 'line-through' }}>1,150</Text>
                                <Text style={{ color: Color.COLOR }}>3.5 % off</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                <Text style={{ color: Color.COLOR }}>Offer till Tue.</Text>
                            </View>
                        </View>
                        <View style={Styles.product_3rd_view_1}>
                            <Text style={Styles.product_name_heading}>Dawat Basmati Rice</Text>
                            <Text style={Styles.product_name_text}></Text>
                        </View>

                        <View style={Styles.product_3rd_view_1}>
                            <Text style={Styles.product_name_heading}>{LableText.PRICE}</Text>
                            <Text style={Styles.product_name_text}>1,100</Text>
                        </View>
                    </View>
                    <View style={{ height: 10, width: '100%' }} />
                </Content>

            </SafeAreaLayout>
        )
    }

}