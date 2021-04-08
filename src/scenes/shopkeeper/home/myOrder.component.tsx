import { Content } from "native-base";
import React, { Component } from "react";
import { RefreshControl, View, Text,TouchableOpacity, TextInput} from "react-native";
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


    }
    
    render() {
        const { my_Jobs } = this.state
        return (
            <SafeAreaLayout
                style={Styles.safeArea} >
                
                    {/* <Header style={styles.header}> */}
                    <View style={Styles.searchBox}>
                        <Text style={Styles.searchIcon}><SearchIcon /></Text>
                        <TextInput
                            placeholder="Search"
                            style={Styles.searchInput}
                        />
                    </View>
                    {/* </Header> */}
                    <TouchableOpacity onPress={() => { this.handleJobSubmit() }}>
                        <View style={Styles.customer_list}>
                            <View style={[Styles.customer_list_image, Styles.center]}>
                                <Avatar source={require("../../../assets/profile.jpeg")} style={Styles.image} />
                                {/* <View>
                                <Avatar source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/mobile.jpeg' }} style={styles.image} />
                            </View> */}
                            </View>

                            <View style={Styles.list_name}>
                                <View style={{ width: '80%' }}>
                                    <Text style={Styles.customer_list_name_text}>Ramanand</Text>
                                </View>
                                <View>
                                    
                                </View>
                                <View style={Styles.list_price}>
                                    <View>
                                        <Text style={Styles.customer_list_price_text}>1234567890</Text>
                                    </View>

                                    <View>
                                        <Text style={Styles.customer_list_price_text}>Rs: 15,000</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <Divider />

                    <View style={Styles.customer_list}>
                        <View style={[Styles.customer_list_image, Styles.center]}>
                            <Avatar source={require("../../../assets/profile.jpeg")} style={Styles.image} />
                            {/* <View>
                                <Avatar source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/mobile.jpeg' }} style={styles.image} />
                            </View> */}
                        </View>

                        <View style={Styles.list_name}>
                            <View style={{ width: '80%' }}>
                                <Text style={Styles.customer_list_name_text}>Mohan</Text>
                            </View>

                            <View style={Styles.list_price}>
                                <View>
                                    <Text style={Styles.customer_list_price_text}>1234567890</Text>
                                </View>

                                <View>
                                    <Text style={Styles.customer_list_price_text}>Rs: 55,000</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <Divider />

                    <View style={Styles.customer_list}>
                        <View style={[Styles.customer_list_image, Styles.center]}>
                            <Avatar source={require("../../../assets/profile.jpeg")} style={Styles.image} />
                            {/* <View>
                                <Avatar source={{ uri: AppConstants.IMAGE_BASE_URL + '/avatar/mobile.jpeg' }} style={styles.image} />
                            </View> */}
                        </View>

                        <View style={Styles.list_name}>
                            <View style={{ width: '80%' }}>
                                <Text style={Styles.customer_list_name_text}>Alok</Text>
                            </View>

                            <View style={Styles.list_price}>
                                <View>
                                    <Text style={Styles.customer_list_price_text}>1234567890</Text>
                                </View>

                                <View>
                                    <Text style={Styles.customer_list_price_text}>Rs: 10,000</Text>
                                </View>
                            </View>
                        </View>
                    </View>


                    {/* <List data={my_Jobs}
                        renderItem={this.renderMyJob}
                    /> */}
                    <View style={{ height: 10, width: '100%' }}></View>
             

            </SafeAreaLayout>
        )
    }

}  