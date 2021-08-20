import React, { Component } from "react";
import { View, Text, RefreshControl, Alert, AsyncStorage } from "react-native";
import { Avatar, Divider, ThemedComponentProps } from "react-native-ui-kitten";
import { AddCustomerImageScreenProps } from "../../../navigation/customer-navigator/customerProfile.Navigator";
import { SafeAreaLayout, SaveAreaInset } from "../../../components/safe-area-layout.component";
import { Toolbar } from "../../../components/toolbar.component";
import { BackIcon, MenuIcon } from "../../../assets/icons";
import { Styles } from "../../../assets/styles";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { AppConstants, Color, LableText } from "../../../constants";
import { CheckBox, Content, Picker } from "native-base";
import Axios from "axios";
import DatePicker from 'react-native-datepicker'
import { AppRoute } from "../../../navigation/app-routes";
import ImagePicker from 'react-native-image-picker';

const options = {
    title: 'Select a Photo',
    takePhoto: 'Take Photo',
    chooseFromLibraryButtonTitle: 'Choose from gallery',
    quality: 1,
    type: 'image'
}

export class AddCustomerImageScreen extends Component<AddCustomerImageScreenProps, ThemedComponentProps & any> {
    constructor(props) {
        super(props);
        this.state = {
            shopId: '',
            productId: '',
            imageSource: '',
            file: null,
            name: '',
            title: '',
            imageUploaded: false
        }
        this.onRefresh = this.onRefresh.bind(this);
    }

    async componentDidMount() {
        const value = await AsyncStorage.getItem('userDetail');
        const userId = await AsyncStorage.getItem('userId');
        const user = JSON.parse(value);

        this.setState({
            shopId: user.shopId,
            userType: user.userType,
            userId: userId
        })
    }

    selectPhoto() {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled Image picker');
            } else if (response.error) {
                console.log('Image Picker Error: ', response.error);
            } else {
                const source = { uri: response.uri };
                const file = { name: 'shop' + response.fileName, uri: response.uri, type: response.type, size: response.readableSize, path: response.path }

                this.setState({
                    imageSource: source,
                    file: file,
                });
            }
        });
    }

    uploadImage() {
        const { shopId, userType, userId, productId, imageUploaded, file } = this.state;
        console.log(userId, userType)
        const formData = new FormData();
        formData.append('file', file);
        console.log(productId);
        fetch(AppConstants.API_BASE_URL + '/api/file/upload/avatar/' + userType + '/' + userId + '/' + 'avatar', {
            method: 'post',
            body: formData
        }).then(res => {
            if (res.ok) {
                this.setState({
                    imageSource: '',
                    file: null,
                    imageUploaded: !imageUploaded
                });
                Alert.alert("File uploaded successfully.");
            }
        });
    }

    handleAddMeasurement(value) {
        if (value === 'add') {
            // this.props.navigation.navigate(AppRoute.ADD_CATEGORY)
        } else {
            this.setState({
                measurement: value
            })
        }
    }

    onRefresh() {
        this.setState({ refreshing: true });
        this.componentDidMount().then(() => {
            this.setState({ refreshing: false });
        });
    }

    render() {
        const { imageUploaded, imageSource, isEditable, allCategory, allBrand, name, category, brand, shopId, avatar, price, quantity, description, barcode,
            stock, sellingPrice, costPrice, oldPrice, offerPercent, offerFrom, offerTo, offerActiveInd,
            gstAmount, measurement, gstPercent, minDate, allMeasurement } = this.state
        return (
            <SafeAreaLayout
                style={Styles.safeArea}
                insets={SaveAreaInset.TOP}>
                <Toolbar
                    title='Add Image'
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
                    <View style={[Styles.product_view]}>
                        <TouchableOpacity style={[{ justifyContent: 'flex-end', marginTop: 5, marginRight: 5, alignItems: 'flex-end' }]} onPress={() => { this.selectPhoto() }}>
                            {/* <Text><EditIcon /></Text> */}
                        </TouchableOpacity>
                        <View style={[Styles.product_image, Styles.center]}>
                            {/* <View style={Styles.ImgBgOne} />
                            <View style={Styles.ImgBgTwo} /> */}
                            <Avatar source={imageSource} style={Styles.product_avatar} />
                        </View>
                    </View>

                    <Divider />

                    <View>


                    </View>

                    <View style={{ marginHorizontal: '10%' }}>
                        <TouchableOpacity style={[Styles.buttonBox, Styles.center]} onPress={() => { this.selectPhoto() }}>
                            <Text style={Styles.buttonName}>{LableText.CHOOSE_IMAGE}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginHorizontal: '10%' }}>
                        <TouchableOpacity style={[Styles.buttonBox, Styles.center]} onPress={() => { this.uploadImage() }}>
                            <Text style={Styles.buttonName}>{LableText.UPLOAD}</Text>
                        </TouchableOpacity>
                    </View>
                    {null != imageUploaded ? imageUploaded ?
                        <View style={{ marginHorizontal: '10%' }}>
                            <TouchableOpacity style={[Styles.buttonBox, Styles.center]} onPress={() => { this.props.navigation.navigate(AppRoute.ITEMLIST) }}>
                                <Text style={Styles.buttonName}>{LableText.SAVE}</Text>
                            </TouchableOpacity>
                        </View> : null : null}


                    <View style={Styles.bottomSpace}></View>
                </Content>

            </SafeAreaLayout>
        );
    }

}