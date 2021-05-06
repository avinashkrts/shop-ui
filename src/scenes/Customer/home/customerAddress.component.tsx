import React, { Component } from "react";
import { View, Text, RefreshControl, Alert } from "react-native";
import { Avatar, Divider, ThemedComponentProps } from "react-native-ui-kitten";
import { CustomerAddressScreenProps } from "../../../navigation/customer-navigator/customerHome.navigator";
import { SafeAreaLayout, SaveAreaInset } from "../../../components/safe-area-layout.component";
import { Toolbar } from "../../../components/toolbar.component";
import { AddressEditIcon, BackIcon, CancelIcon, MenuIcon, PencilIcon } from "../../../assets/icons";
import { Styles } from "../../../assets/styles";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Color, LableText } from "../../../constants";
import { Content } from "native-base";
import Modal from "react-native-modal";
import Axios from "axios";


export class CustomerAddressScreen extends Component<CustomerAddressScreenProps, ThemedComponentProps & any> {
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            postOffice: '',
            landMark: '',
            policeStation: '',
            district: '',
            pinCode: '',
            state: '',
            country: '',
            shopId: '',
            userId: '',
            userType: '',
            isEditable: true,
            modalVisible: true,
        }

        this.onRefresh = this.onRefresh.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleSubmit() {
        // Alert.alert("Clicked")
        const { city, shopId, userId, postOffice, policeStation, district, landMark, pinCode, state, country } = this.state
        // console.log("This is user's address", isEditable, city, postOffice, policeStation, district, landMark, pinCode, state, country);
        Axios({
            method: 'POST',
            url: '',
            data: {
                city: city,
                postOffice: postOffice,
                landMark: landMark,
                policeStation: policeStation,
                district: district,
                pinCode: pinCode,
                state: state,
                country: country,
                shopId: shopId,
                userId: userId,
            }
        }).then((response) => {
            Alert.alert("Address added.");
        }, (error) => {
            Alert.alert("Server error!");
        })

    }

    handleEdit() {
        this.toggleModal();
    }

    toggleModal() {
        const { modalVisible } = this.state;
        this.setState({
            modalVisible: !modalVisible
        })
    }

    onRefresh() {
        this.setState({ refreshing: true });
        this.componentDidMount().then(() => {
            this.setState({ refreshing: false });
        });
    }

    render() {
        const { modalVisible, isEditable, city, postOffice, policeStation, district, landMark, pinCode, state, country } = this.state
        return (
            <SafeAreaLayout
                style={Styles.safeArea}
                insets={SaveAreaInset.TOP}>
                <Toolbar
                    title='Address'
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



                    <View style={Styles.address_container}>
                        <View style={Styles.address_edit_pen}>
                            <View>
                                <Text style={Styles.address_text}>Name :- Avinash Kumar</Text>
                                <Text style={Styles.address_text}>City :- Hajipur</Text>
                                <Text style={Styles.address_text}>District :- Vaishali </Text>
                                <Text style={Styles.address_text}>Pincode :- 800350 </Text>
                            </View>

                            <TouchableOpacity style={{ padding: 5 }} onPress={() => { this.handleEdit() }}>
                                <Text style={Styles.address_text}><AddressEditIcon fontSize={20} />
                                </Text>
                            </TouchableOpacity>
                        </View>


                    </View>

                    <View style={{ marginHorizontal: '10%' }}>
                        <TouchableOpacity style={[Styles.buttonBox, Styles.center]} onPress={() => { this.toggleModal() }}>
                            <Text style={[{ fontSize: 18, color: 'white' }]}>{LableText.ADDNEWADDRESS}</Text>
                        </TouchableOpacity>
                    </View>

                    <Modal style={Styles.modal} isVisible={modalVisible}>
                        <View style={Styles.modalHeader}>
                            <TouchableOpacity>
                                <Text onPress={() => { this.toggleModal() }}><CancelIcon fontSize={25} /></Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView>
                            <View style={Styles.user_detail}>
                                <View style={Styles.user_detail_header}>
                                    <Text style={Styles.user_detail_header_text}>{LableText.VILLAGE}</Text>
                                </View>
                                <View style={Styles.user_detail_data}>
                                    <TextInput
                                        editable={isEditable}
                                        style={Styles.cash_pay_input}
                                        placeholder={LableText.VILLAGE}
                                        value={city}
                                        onChangeText={(value) => { this.setState({ city: value }) }}
                                    />
                                </View>
                            </View>

                            <View style={Styles.user_detail}>
                                <View style={Styles.user_detail_header}>
                                    <Text style={Styles.user_detail_header_text}>{LableText.POST_OFFICE}</Text>
                                </View>
                                <View style={Styles.user_detail_data}>
                                    <TextInput
                                        editable={isEditable}
                                        style={Styles.cash_pay_input}
                                        placeholder={LableText.POST_OFFICE}
                                        value={postOffice}
                                        onChangeText={(value) => { this.setState({ postOffice: value }) }}
                                    />
                                </View>
                            </View>

                            <View style={Styles.user_detail}>
                                <View style={Styles.user_detail_header}>
                                    <Text style={Styles.user_detail_header_text}>{LableText.LAND_MARK}</Text>
                                </View>
                                <View style={Styles.user_detail_data}>
                                    <TextInput
                                        editable={isEditable}
                                        style={Styles.cash_pay_input}
                                        placeholder={LableText.LAND_MARK}
                                        value={landMark}
                                        onChangeText={(value) => { this.setState({ landMark: value }) }}
                                    />
                                </View>
                            </View>

                            <View style={Styles.user_detail}>
                                <View style={Styles.user_detail_header}>
                                    <Text style={Styles.user_detail_header_text}>{LableText.POLICE_STATION}</Text>
                                </View>
                                <View style={Styles.user_detail_data}>
                                    <TextInput
                                        editable={isEditable}
                                        style={Styles.cash_pay_input}
                                        placeholder={LableText.POLICE_STATION}
                                        value={policeStation}
                                        onChangeText={(value) => { this.setState({ policeStation: value }) }}
                                    />
                                </View>
                            </View>

                            <View style={Styles.user_detail}>
                                <View style={Styles.user_detail_header}>
                                    <Text style={Styles.user_detail_header_text}>{LableText.DISTRICT}</Text>
                                </View>
                                <View style={Styles.user_detail_data}>
                                    <TextInput
                                        editable={isEditable}
                                        style={Styles.cash_pay_input}
                                        placeholder={LableText.DISTRICT}
                                        value={district}
                                        onChangeText={(value) => { this.setState({ district: value }) }}
                                    />
                                </View>
                            </View>

                            <View style={Styles.user_detail}>
                                <View style={Styles.user_detail_header}>
                                    <Text style={Styles.user_detail_header_text}>{LableText.PIN_CODE}</Text>
                                </View>
                                <View style={Styles.user_detail_data}>
                                    <TextInput
                                        editable={isEditable}
                                        style={Styles.cash_pay_input}
                                        placeholder={LableText.PIN_CODE}
                                        value={pinCode}
                                        onChangeText={(value) => { this.setState({ pinCode: value }) }}
                                    />
                                </View>
                            </View>

                            <View style={Styles.user_detail}>
                                <View style={Styles.user_detail_header}>
                                    <Text style={Styles.user_detail_header_text}>{LableText.STATE}</Text>
                                </View>
                                <View style={Styles.user_detail_data}>
                                    <TextInput
                                        editable={isEditable}
                                        style={Styles.cash_pay_input}
                                        placeholder={LableText.STATE}
                                        value={state}
                                        onChangeText={(value) => { this.setState({ state: value }) }}
                                    />
                                </View>
                            </View>

                            <View style={Styles.user_detail}>
                                <View style={Styles.user_detail_header}>
                                    <Text style={Styles.user_detail_header_text}>{LableText.COUNTRY}</Text>
                                </View>
                                <View style={Styles.user_detail_data}>
                                    <TextInput
                                        editable={isEditable}
                                        style={Styles.cash_pay_input}
                                        placeholder={LableText.COUNTRY}
                                        value={country}
                                        onChangeText={(value) => { this.setState({ country: value }) }}
                                    />
                                </View>
                            </View>


                            <View style={{ marginHorizontal: '10%' }}>
                                <View style={[{ marginVertical: 20 }, Styles.center]} >
                                    <Text onPress={() => { this.handleSubmit() }} style={[Styles.buttonName, { backgroundColor: Color.COLOR, paddingHorizontal: '30%', paddingVertical: 10, borderRadius: 40 }]}>{LableText.SAVE}</Text>
                                </View>
                            </View>
                        </ScrollView>
                    </Modal>
                    <View style={Styles.bottomSpace}></View>
                </Content>

            </SafeAreaLayout>
        );
    }

}