import React, { Component } from "react";
import { View, Text, RefreshControl, Alert } from "react-native";
import { Avatar, Divider, ThemedComponentProps } from "react-native-ui-kitten";
import { AddProductScreenProps } from "../../../navigation/stock.navigator";
import { SafeAreaLayout, SaveAreaInset } from "../../../components/safe-area-layout.component";
import { Toolbar } from "../../../components/toolbar.component";
import { BackIcon, MenuIcon } from "../../../assets/icons";
import { Styles } from "../../../assets/styles";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Color, LableText } from "../../../constants";
import { Content, Picker } from "native-base";
import Axios from "axios";

export class AddProductScreen extends Component<AddProductScreenProps, ThemedComponentProps & any> {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            category: '1',
            brand: '1',
            shopId: 'AVI123',
            avatar: '123asd',
            price: '',
            quantity: '',
            description: '',
            barcode: '',
            stock: '',
            sellingPrice: '',
            costPrice: '',
            oldPrice: '',
            offerPercent: '5',
            offerFrom: '',
            offerTo: '',
            offerActiveInd: false,
            gstAmount: '',
            measurement: '1',
            deliveryCharge: '',
            gstPercent: '',
        }
        this.onRefresh = this.onRefresh.bind(this);
    }

    componentDidMount() {
        // Axios({
        //     method: 'GET',
        //     url: 'http://192.168.0.106:8091/api/user/get/51'
        // }).then((response) => {
        //     this.setState({
        //         firstName: response.data.firstName,
        //         emailId: response.data.emailId,
        //         lastName: response.data.lastName,
        //         lastLoginDate: response.data.lastLoginDate,
        //         dob: response.data.dob,
        //         mobileNo: response.data.mobileNo,
        //         city: response.data.city,
        //     })
        // }, (error) => {

        // });
    }

    handleSubmit() {
        const { isEditable, name, category, brand, shopId, avatar, price, quantity, description, barcode,
            stock, sellingPrice, costPrice, oldPrice, offerPercent, offerFrom, offerTo, offerActiveInd,
            gstAmount, measurement, deliveryCharge, gstPercent, review } = this.state

        console.log('Product Data', name, category, brand, shopId, avatar, price, quantity, description, barcode,
            stock, sellingPrice, costPrice, oldPrice, offerPercent, offerFrom, offerTo, offerActiveInd,
            gstAmount, measurement, deliveryCharge, gstPercent, review);

        if (name == null || name === '') {
            Alert.alert("Please enter product name.");
        } else if (category == null || category === '') {
            Alert.alert("Please select category.");
        } else if (brand == null || brand === '') {
            Alert.alert("Please select brand.");
        } else if (costPrice == null || costPrice === '') {
            Alert.alert("Please enter cost price.");
        } else if (sellingPrice == null || sellingPrice === '') {
            Alert.alert("Please enter selling price.");
        } else if (gstPercent == null || gstPercent === '') {
            Alert.alert("Please enter GST percent.");
        } else if (quantity == null || quantity === '') {
            Alert.alert("Please enter quantity.");
        } else if (measurement == null || measurement === '') {
            Alert.alert("Please select measurement.");
        } else if (barcode == null || barcode === '') {
            Alert.alert("Please select category.");
        } else if (description == null || description === '') {
            Alert.alert("Please enter description.");
        } else {
            Axios({
                method: 'POST',
                url: 'http://192.168.0.106:8082/api/product/create',
                data: {
                    name: name,
                    category: category,
                    brand: brand,
                    shopId: shopId,
                    quantity: quantity,
                    description: description,
                    barcode: barcode,
                    sellingPrice: sellingPrice,
                    costPrice: costPrice,
                    offerPercent: offerPercent,
                    offerFrom: "2021-05-01",
                    offerTo: "2021-06-01",
                    offerActiveInd: true,
                    measurement: measurement,
                    gstPercent: gstPercent,
                }
            }).then((response) => {
                if (null != response.data) {
                    if (response.data.status === 'true') {
                        Alert.alert("Product created.")
                    } else if (response.data.status === 'false') {
                        Alert.alert("Product allready exists.")
                    }
                }
            }, (error) => {
                Alert.alert("Server error!.")
            });
        }
    }

    onRefresh() {
        this.setState({ refreshing: true });
        this.componentDidMount().then(() => {
            this.setState({ refreshing: false });
        });
    }

    render() {
        const { isEditable, name, category, brand, shopId, avatar, price, quantity, description, barcode,
            stock, sellingPrice, costPrice, oldPrice, offerPercent, offerFrom, offerTo, offerActiveInd,
            gstAmount, measurement, deliveryCharge, gstPercent, review } = this.state
        return (
            <SafeAreaLayout
                style={Styles.safeArea}
                insets={SaveAreaInset.TOP}>
                <Toolbar
                    title='Add Product'
                    backIcon={BackIcon}
                    onBackPress={this.props.navigation.goBack}
                    style={{ marginTop: -5, marginLeft: -5 }}
                />
                <Divider />
                <Content style={Styles.content}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                >
                    <View style={[Styles.profile, Styles.center]}>
                        <View style={Styles.profile_image}>
                            <Avatar source={require("../../../assets/profile.jpeg")} style={Styles.profile_avatar} />
                        </View>
                    </View>

                    <Divider />

                    <View>
                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.PRODUCT_NAME}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput
                                    editable={isEditable}
                                    value={name}
                                    onChangeText={(value) => { this.setState({ name: value }) }}
                                    style={Styles.cash_pay_input}
                                    placeholder={LableText.PRODUCT_NAME}
                                />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.CATEGORY}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <Picker
                                    note
                                    mode="dropdown"
                                    style={[Styles.center, { marginVertical: -8, color: Color.COLOR, width: '100%' }]}
                                    selectedValue={category}
                                    onValueChange={(value) => { this.setState({ category: value }) }}
                                >
                                    <Picker.Item label="Mobile" value="1" />
                                    <Picker.Item label="Laptop" value="2" />
                                </Picker>
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.BRAND}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <Picker
                                    note
                                    mode="dropdown"
                                    style={[Styles.center, { marginVertical: -8, color: Color.COLOR, width: '100%' }]}
                                    selectedValue={brand}
                                    onValueChange={(value) => { this.setState({ brand: value }) }}
                                >
                                    <Picker.Item label="Samsung" value="1" />
                                    <Picker.Item label="Apple" value="2" />
                                </Picker>
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.COST_PRICE}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput
                                    editable={isEditable}
                                    value={costPrice}
                                    onChangeText={(value) => { this.setState({ costPrice: value }) }}
                                    style={Styles.cash_pay_input}
                                    placeholder={LableText.COST_PRICE}
                                />
                            </View>
                        </View>


                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.SELLING_PRICE}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput
                                    editable={isEditable}
                                    value={sellingPrice}
                                    onChangeText={(value) => { this.setState({ sellingPrice: value }) }}
                                    style={Styles.cash_pay_input}
                                    placeholder={LableText.SELLING_PRICE}
                                />
                            </View>
                        </View>

                        {/* <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.OLD_PRICE}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput
                                    editable={isEditable}
                                    value={oldPrice}
                                    onChangeText={(value) => { this.setState({ oldPrice: value }) }}
                                    style={Styles.cash_pay_input}
                                    placeholder={LableText.OLD_PRICE}
                                />
                            </View>
                        </View> */}

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.GST_PERCENT}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput
                                    editable={isEditable}
                                    value={gstPercent}
                                    onChangeText={(value) => { this.setState({ gstPercent: value }) }}
                                    style={Styles.cash_pay_input}
                                    placeholder={LableText.GST_PERCENT}
                                />
                            </View>
                        </View>

                        {/* <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.GST_AMOUNT}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput
                                    editable={isEditable}
                                    value={gstAmount}
                                    onChangeText={(value) => { this.setState({ gstAmount: value }) }}
                                    style={Styles.cash_pay_input}
                                    placeholder={LableText.GST_AMOUNT}
                                />
                            </View>
                        </View> */}

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.QUANTITY}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput
                                    editable={isEditable}
                                    value={quantity}
                                    onChangeText={(value) => { this.setState({ quantity: value }) }}
                                    style={Styles.cash_pay_input}
                                    placeholder={LableText.QUANTITY}
                                />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.MEASUREMENT}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <Picker
                                    note
                                    mode="dropdown"
                                    style={[Styles.center, { marginVertical: -8, color: Color.COLOR, width: '100%' }]}
                                    selectedValue={measurement}
                                    onValueChange={(value) => { this.setState({ measurement: value }) }}
                                >
                                    <Picker.Item label="Pcs" value="1" />
                                    <Picker.Item label="K.G" value="2" />
                                </Picker>
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.BARCODE}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput
                                    editable={isEditable}
                                    value={barcode}
                                    onChangeText={(value) => { this.setState({ barcode: value }) }}
                                    style={Styles.cash_pay_input}
                                    placeholder={LableText.BARCODE}
                                />
                            </View>
                        </View>

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.DESCRIPTION}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput
                                    multiline={true}
                                    editable={isEditable}
                                    value={description}
                                    onChangeText={(value) => { this.setState({ description: value }) }}
                                    style={Styles.cash_pay_input}
                                    placeholder={LableText.DESCRIPTION}
                                />
                            </View>
                        </View>

                        {/* <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.OLD_PRICE}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput
                                    editable={isEditable}
                                    value={oldPrice}
                                    onChangeText={(value) => { this.setState({ oldPrice: value }) }}
                                    style={Styles.cash_pay_input}
                                    placeholder={LableText.OLD_PRICE}
                                />
                            </View>
                        </View> */}
                        <View>

                        </View>

                    </View>


                    {/* <View style={{ marginHorizontal: '10%' }}>
                        <TouchableOpacity style={[Styles.buttonBox, Styles.center]} onPress={() => { }}>
                            <Text style={Styles.buttonName}>{LableText.EDIT}</Text>
                        </TouchableOpacity>
                    </View> */}


                    <View style={{ marginHorizontal: '10%' }}>
                        <TouchableOpacity style={[Styles.buttonBox, Styles.center]} onPress={() => { this.handleSubmit() }}>
                            <Text style={Styles.buttonName}>{LableText.SAVE}</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={Styles.bottomSpace}></View>
                </Content>

            </SafeAreaLayout>
        );
    }

}