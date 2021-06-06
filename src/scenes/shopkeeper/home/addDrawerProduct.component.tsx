import React, { Component } from "react";
import { View, Text, RefreshControl, Alert, AsyncStorage } from "react-native";
import { Avatar, Divider, ThemedComponentProps } from "react-native-ui-kitten";
import { AddDrawerProductScreenProps } from "../../../navigation/home.navigator";
import { SafeAreaLayout, SaveAreaInset } from "../../../components/safe-area-layout.component";
import { Toolbar } from "../../../components/toolbar.component";
import { BackIcon, CancelIcon, MenuIcon } from "../../../assets/icons";
import { Styles } from "../../../assets/styles";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { AppConstants, Color, LableText, Placeholder } from "../../../constants";
import { CheckBox, Content, Picker } from "native-base";
import Axios from "axios";
import DatePicker from 'react-native-datepicker'
import { AppRoute } from "../../../navigation/app-routes";
import Modal from "react-native-modal";

export class AddDrawerProductScreen extends Component<AddDrawerProductScreenProps, ThemedComponentProps & any> {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            category: '',
            brand: '',
            shopId: '',
            avatar: '123asd',
            price: '',
            quantity: '',
            description: '',
            barcode: '',
            stock: '',
            sellingPrice: '',
            costPrice: '',
            oldPrice: '',
            offerPercent: '',
            offerFrom: String(new Date().getFullYear() + '-' + Number(new Date().getMonth() + 1) + '-' + new Date().getDate()),
            offerTo: String(new Date().getFullYear() + '-' + Number(new Date().getMonth() + 1) + '-' + new Date().getDate()),
            offerActiveInd: false,
            gstAmount: '',
            measurement: '',
            deliveryCharge: '',
            gstPercent: '',
            minDate: String(new Date().getFullYear() + '-' + Number(new Date().getMonth() + 1) + '-' + new Date().getDate()),
            allCategory: [],
            allBrand: [],
            allMeasurement: [],
            categoryVisible: false,
            BrandVisible: false,
            catImage: false,
            catName: '',
            brandVisible: false,
            brandName: '',
            brandCatId: '',
            allData: [{
                url: '/api/lookup/getallmeasurementtype',
                method: 'GET',
                variable: 'allMeasurement',
            }
           ],
        }
        this.onRefresh = this.onRefresh.bind(this);
    }

    async componentDidMount() {
        const { allData } = this.state;

        const value = await AsyncStorage.getItem('userDetail');
        if (value) {
            const user = JSON.parse(value);
            // Alert.alert(user.shopId)

            this.setState({
                shopId: user.shopId,
            })

            Axios({
                method: 'GET',
                url: AppConstants.API_BASE_URL + '/api/category/getcategoryforuserbyshopid/' + user.shopId,
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

            // Axios({
            //     method: 'GET',
            //     url: AppConstants.API_BASE_URL + '/api/brand/getbrandforuserbyshopid/' + user.shopId,
            // }).then((response) => {
            //     if (null != response.data) {
            //         this.setState({
            //             allBrand: response.data,
            //             selectedBrand: response.data[0].id
            //         })
            //     }
            // }, (error) => {
            //     Alert.alert("Server error!.")
            // });
        }


        allData.map((data, index) => {
            // console.log(allData)
            Axios({
                method: data.method,
                url: AppConstants.API_BASE_URL + data.url,
            }).then((response) => {
                if (data.variable === 'allMeasurement') {
                    console.log(data.variable, response.data)
                    this.setState({
                        allMeasurement: response.data,
                    })
                }
            }, (error) => {
                Alert.alert("Please enter a valid email ID and password.")
            });
        })
    }

    handleSubmit() {
        const { isEditable, name, category, brand, shopId, avatar, price, quantity, description, barcode,
            stock, sellingPrice, costPrice, oldPrice, offerPercent, offerFrom, offerTo, offerActiveInd,
            gstAmount, measurement, deliveryCharge, gstPercent } = this.state

        // console.log('Product Data', name, category, brand, shopId, avatar, price, quantity, description, barcode,
        //     stock, sellingPrice, costPrice, oldPrice, offerPercent, offerFrom, offerTo, offerActiveInd,
        //     gstAmount, measurement, deliveryCharge, gstPercent);

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
        } else if (stock == null || stock === '') {
            Alert.alert("Please enter stock.");
        } else if (quantity == null || quantity === '') {
            Alert.alert("Please enter quantity.");
        } else if (measurement == null || measurement === '') {
            Alert.alert("Please select measurement.");
        } else if (barcode == null || barcode === '') {
            Alert.alert("Please enter barcode.");
        } else if (description == null || description === '') {
            Alert.alert("Please enter description.");
        } else if (offerActiveInd && (offerPercent == null || offerPercent === '')) {
            Alert.alert("Please enter offer percent.");
        } else {
            Axios({
                method: 'POST',
                url: AppConstants.API_BASE_URL + '/api/product/create',
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
                    stock: stock,
                    offerPercent: offerPercent,
                    offerFrom: offerActiveInd ? offerFrom : '',
                    offerTo: offerActiveInd ? offerTo : '',
                    offerActiveInd: offerActiveInd,
                    measurement: measurement,
                    gstPercent: gstPercent,
                }
            }).then((response) => {
                if (null != response.data) {
                    if (response.data.status === 'true') {
                        Alert.alert("Product created.")
                        console.log("product Created Id", response.data.productId)
                        this.props.navigation.navigate(AppRoute.ADD_DRAWER_PRODUCT_IMAGE, { productId: response.data.productId })
                    } else if (response.data.status === 'false') {
                        Alert.alert("Product allready exists.")
                    }
                }
            }, (error) => {
                Alert.alert("Server error!.")
            });
        }
    }

    handleAddCategory(value) {
        const { categoryVisible } = this.state
        if (value === 'add') {
            this.setState({
                categoryVisible: !categoryVisible
            })
            // this.props.navigation.navigate(AppRoute.ADD_CATEGORY)
        } else {            
            Axios({
                method: 'GET',
                url: AppConstants.API_BASE_URL + '/api/brand/getallDeactivebrandbyshopid/' + value,
            }).then((response) => {
                if (null != response.data) {
                    this.setState({
                        category: value,
                        allBrand: response.data
                    })
                }
            }, (error) => {
                Alert.alert("Server error!.")
            });           
        }
    }

    handleAddBrand(value) {
        const { brandVisible } = this.state;
        if (value === 'add') {
            this.setState({
                brandVisible: !brandVisible
            })
            // this.props.navigation.navigate(AppRoute.ADD_BRAND)
        } else {
            this.setState({
                brand: value
            })
        }
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
                    isVisible: true
                });
            }
        });
    }

    oploadImage() {
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);
        console.log(this.state.userId);
        fetch(AppConstants.API_BASE_URL + '/api/file/upload/avatar/' + this.state.userId, {
            method: 'post',
            body: formData
        }).then(res => {
            if (res.ok) {
                //   console.log(res.data);
                Alert.alert("File uploaded successfully.");
                //   window.location.reload(false);
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

    categoryModal() {
        const {categoryVisible} = this.state;
        this.setState({categoryVisible: !categoryVisible});
    }

    brandModal() {
        const {brandVisible} = this.state;
        this.setState({brandVisible: !brandVisible});
    }

    handleAddImageCategory() {
        const { catImage, catName, categoryVisible, shopId } = this.state;
        // Alert.alert(shopId)
        if (catName == null || catName === '') {
            Alert.alert("Please enter category name.");
        } else if (shopId == null || shopId === '') {
            this.props.navigation.navigate(AppRoute.AUTH)
        } else {
            console.log(catName.toUpperCase(), catName.replace(" ", "_"),)
            const categoryName = catName.toUpperCase();
            const catTitle = categoryName.replace(" ", "_");
            Axios({
                method: 'POST',
                url: AppConstants.API_BASE_URL + '/api/category/create',
                data: {
                    name: categoryName,
                    shopId: shopId,
                    title: catTitle
                }
            }).then((response) => {
                if (null != response.data) {
                    if (response.data.status === 'true') {
                        this.setState({
                            ...this.state,
                            categoryVisible: !categoryVisible
                        })
                        this.onRefresh();
                    } else if (response.data.status === 'false') {
                        Alert.alert("Category allready exists.")
                    }
                }
            }, (error) => {
                Alert.alert("Server error!.")
            });
        }
        // this.setState({
        //     catImage: !catImage
        // })
    }

    handleAddImageBrand() {
        const { brandVisible, shopId, category, brandName } = this.state
        if (category == null || category === '') {
            Alert.alert("Please select category.");
        } else if (brandName == null || brandName === '') {
            Alert.alert("Please enter brand name.");
        } else {
            console.log(brandName.toUpperCase(), brandName.replace(" ", "_"),)
            const catName = brandName.toUpperCase();
            const catTitle = catName.replace(" ", "_");
            Axios({
                method: 'POST',
                url: AppConstants.API_BASE_URL + '/api/brand/create',
                data: {
                    name: catName,
                    category: category,
                    shopId: shopId,
                    title: catTitle
                }
            }).then((response) => {
                if (null != response.data) {
                    if (response.data.status === 'true') {
                        this.setState({
                            ...this.state,
                            brandVisible: !brandVisible
                        })
                        this.handleAddCategory(category)
                    } else if (response.data.status === 'false') {
                        Alert.alert("Category allready exists.")
                    }
                }
            }, (error) => {
                Alert.alert("Server error!.")
            });
        }

    }

    render() {
        const { isEditable, brandVisible, brandName, brandCatId, catImage, catName, categoryVisible, allCategory, allBrand, name, category, brand, shopId, avatar, price, quantity, description, barcode,
            stock, sellingPrice, costPrice, oldPrice, offerPercent, offerFrom, offerTo, offerActiveInd,
            gstAmount, measurement, gstPercent, minDate, allMeasurement } = this.state
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
                    {/* <View style={[Styles.profile, Styles.center]}>
                        <View style={Styles.profile_image}>
                            <Avatar source={require("../../../assets/profile.jpeg")} style={Styles.profile_avatar} />
                        </View>
                    </View> */}

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
                                    onValueChange={(value) => { this.handleAddCategory(value) }}
                                >
                                    <Picker.Item label="Select category" value="" />
                                    {null != allCategory ? allCategory.map((data, index) => {
                                        return (
                                            <Picker.Item label={data.name} value={data.id} />
                                        )
                                    }) : null}
                                    <Picker.Item label="Add category" value="add" />

                                    {/* <Picker.Item label="Mobile" value="1" />
                                        <Picker.Item label="Laptop" value="2" /> */}
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
                                    onValueChange={(value) => { this.handleAddBrand(value) }}
                                >
                                    <Picker.Item label="Select category" value="" />
                                    {null != allBrand ? allBrand.map((data, index) => {
                                        return (
                                            <Picker.Item label={data.name} value={data.id} />
                                        )
                                    }) : null}
                                    <Picker.Item label="Add Brand" value="add" />

                                    {/* <Picker.Item label="Mobile" value="1" />
                                        <Picker.Item label="Laptop" value="2" /> */}
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

                        <View style={Styles.user_detail}>
                            <View style={Styles.user_detail_header}>
                                <Text style={Styles.user_detail_header_text}>{LableText.STOCK}</Text>
                            </View>
                            <View style={Styles.user_detail_data}>
                                <TextInput
                                    editable={isEditable}
                                    value={stock}
                                    onChangeText={(value) => { this.setState({ stock: value }) }}
                                    style={Styles.cash_pay_input}
                                    placeholder={LableText.STOCK}
                                />
                            </View>
                        </View>

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
                                    onValueChange={(value) => { this.handleAddMeasurement(value) }}
                                >
                                    <Picker.Item label="Select measurement" value="" />
                                    {null != allMeasurement ? allMeasurement.map((data, index) => {
                                        return (
                                            <Picker.Item label={data.lookUpName} value={data.lookUpId} />
                                        )
                                    }) : null}
                                    <Picker.Item label="Add measurement" value="add" />

                                    {/* <Picker.Item label="Mobile" value="1" />
                                        <Picker.Item label="Laptop" value="2" /> */}
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

                        <View style={Styles.user_detail}>
                            <View style={[Styles.user_detail_header, { flexDirection: 'row' }]}>
                                <Text style={Styles.user_detail_header_text}>{LableText.OFFER}</Text>
                                <CheckBox style={{ marginLeft: 10 }} checked={offerActiveInd} onPress={(value) => { this.setState({ offerActiveInd: !offerActiveInd }) }} />
                            </View>
                        </View>

                        {offerActiveInd ?
                            <View style={Styles.user_detail_data}>
                                <View style={Styles.user_detail}>
                                    <View style={Styles.user_detail_header}>
                                        <Text style={Styles.user_detail_header_text}>{LableText.OFFER_PERCENT}</Text>
                                    </View>
                                    <View style={Styles.user_detail_data}>
                                        <TextInput
                                            multiline={true}
                                            editable={isEditable}
                                            value={offerPercent}
                                            onChangeText={(value) => { this.setState({ offerPercent: value }) }}
                                            style={Styles.cash_pay_input}
                                            placeholder={LableText.OFFER_PERCENT}
                                        />
                                    </View>
                                </View>

                                <View style={Styles.user_detail}>
                                    <View style={Styles.user_detail_header}>
                                        <Text style={Styles.user_detail_header_text}>{LableText.OFFER_FROM}</Text>
                                    </View>
                                    <View style={Styles.user_detail_data}>
                                        <DatePicker
                                            style={{ width: '100%' }}
                                            date={offerFrom}
                                            mode="date"
                                            placeholder="select date"
                                            format="YYYY-MM-DD"
                                            minDate={minDate}
                                            // maxDate="2016-06-01"
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            customStyles={{
                                                dateIcon: {
                                                    position: 'absolute',
                                                    left: 0,
                                                    top: 5,
                                                    marginLeft: 0
                                                },
                                                dateInput: {
                                                    borderColor: '#fff'
                                                }
                                            }}
                                            onDateChange={(date) => { this.setState({ offerFrom: date }) }}
                                        />
                                    </View>
                                </View>

                                <View style={Styles.user_detail}>
                                    <View style={Styles.user_detail_header}>
                                        <Text style={Styles.user_detail_header_text}>{LableText.OFFER_TO}</Text>
                                    </View>
                                    <View style={Styles.user_detail_data}>
                                        <DatePicker
                                            style={{ width: '100%' }}
                                            date={offerTo}
                                            mode="date"
                                            placeholder="select date"
                                            format="YYYY-MM-DD"
                                            minDate={minDate}
                                            // maxDate="2016-06-01"
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            customStyles={{
                                                dateIcon: {
                                                    position: 'absolute',
                                                    left: 0,
                                                    top: 5,
                                                    marginLeft: 0
                                                },
                                                dateInput: {
                                                    borderColor: '#fff'
                                                }
                                            }}
                                            onDateChange={(date) => { this.setState({ offerTo: date }) }}
                                        />
                                    </View>
                                </View>


                            </View>
                            : null}

                    </View>


                    {/* <View style={{ marginHorizontal: '10%' }}>
                        <TouchableOpacity style={[Styles.buttonBox, Styles.center]} onPress={() => { }}>
                            <Text style={Styles.buttonName}>{LableText.EDIT}</Text>
                        </TouchableOpacity>
                    </View> */}


                    <View style={{ marginHorizontal: '10%' }}>
                        <TouchableOpacity style={[Styles.buttonBox, Styles.center]} onPress={() => { this.handleSubmit() }}>
                            <Text style={Styles.buttonName}>{LableText.NEXT}</Text>
                        </TouchableOpacity>
                    </View>

                    <Modal style={Styles.modal} isVisible={categoryVisible}>
                        <View style={Styles.modalHeader}>
                            <TouchableOpacity>
                                <Text onPress={() => { this.categoryModal() }}><CancelIcon fontSize={25} /></Text>
                            </TouchableOpacity>
                        </View>

                        <View style={Styles.center}>
                            <View style={[Styles.center, { width: '100%' }]}>
                                {/* {catImage && categoryVisible ?
                                    <View style={[Styles.profile, Styles.center]}>
                                        <View style={Styles.categoryImage}>
                                            <View>
                                                <TouchableOpacity onPress={() => { this.selectPhoto() }}>
                                                    <View style={Styles.ImgBgOne} />
                                                    <View style={Styles.ImgBgTwo} />
                                                     <Avatar source={imageSource} style={Styles.profile_avatar} /> 
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={[Styles.center, { marginHorizontal: '10%', width: '100%' }]}>
                                                <TouchableOpacity style={[Styles.buttonBox, Styles.center, { width: '50%' }]} >
                                                    <Text style={[Styles.buttonName, { paddingHorizontal: 30 }]} onPress={() => { this.handleAddImageCategory() }}>{LableText.UPLOAD}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View> : */}
                                <View style={[Styles.center, { width: '100%' }]}>
                                    <View style={[{ width: '100%' }]}>
                                        <Text style={[{ paddingHorizontal: 30 }]}>{LableText.CATEGORY}</Text>
                                    </View>

                                    <View style={[Styles.inputTextView, { width: '90%' }]}>
                                        <TextInput
                                            style={[Styles.inputText, { width: '90%' }]}
                                            placeholder={Placeholder.NAME}
                                            value={catName}
                                            onChangeText={(value) => { this.setState({ catName: value }) }}
                                        />
                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={[Styles.center, { marginHorizontal: '10%', width: '100%' }]}>
                                            <TouchableOpacity style={[Styles.buttonBox, Styles.center, { width: '50%' }]} >
                                                <Text style={[Styles.buttonName, { paddingHorizontal: 30 }]} onPress={() => { this.handleAddImageCategory() }}>{LableText.NEXT}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                {/* }  */}
                            </View>
                        </View>
                    </Modal>

                    <Modal style={Styles.modal} isVisible={brandVisible}>
                        <View style={Styles.modalHeader}>
                            <TouchableOpacity>
                                <Text onPress={() => { this.brandModal() }}><CancelIcon fontSize={25} /></Text>
                            </TouchableOpacity>
                        </View>

                        <View style={Styles.center}>
                            <View style={[Styles.center, { width: '100%' }]}>
                                {/* {catImage && categoryVisible ?
                                    <View style={[Styles.profile, Styles.center]}>
                                        <View style={Styles.categoryImage}>
                                            <View>
                                                <TouchableOpacity onPress={() => { this.selectPhoto() }}>
                                                    <View style={Styles.ImgBgOne} />
                                                    <View style={Styles.ImgBgTwo} />
                                                     <Avatar source={imageSource} style={Styles.profile_avatar} /> 
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={[Styles.center, { marginHorizontal: '10%', width: '100%' }]}>
                                                <TouchableOpacity style={[Styles.buttonBox, Styles.center, { width: '50%' }]} >
                                                    <Text style={[Styles.buttonName, { paddingHorizontal: 30 }]} onPress={() => { this.handleAddImageCategory() }}>{LableText.UPLOAD}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View> : */}


                                <View style={[{ width: '100%' }]}>
                                    {/* <View style={[Styles.center, { width: '100%' }]}> */}

                                        <View style={[{ width: '90%' }]}>
                                            <Text style={[{ paddingHorizontal: 30 }]}>{LableText.CATEGORY}</Text>
                                        </View>
                                        <View style={[Styles.inputTextView, { width: '90%' }]}>
                                            <Picker
                                                note
                                                mode="dropdown"
                                                style={[Styles.center, { marginVertical: -8, color: Color.COLOR, width: '100%' }]}
                                                selectedValue={category}
                                                onValueChange={(value) => { this.setState({ category: value }) }}
                                            >
                                                <Picker.Item label="Select category" value="" />
                                                {null != allCategory ? allCategory.map((data, index) => {
                                                    return (
                                                        <Picker.Item label={data.name} value={data.id} />
                                                    )
                                                }) : null}
                                            </Picker>
                                        </View>
                                    {/* </View> */}

                                    <View style={[{ width: '90%' }]}>
                                        <Text style={[{ paddingHorizontal: 30 }]}>{LableText.BRAND}</Text>
                                    </View>
                                    <View style={[Styles.inputTextView, { width: '90%' }]}>
                                        <TextInput
                                            style={[Styles.inputText, { width: '90%' }]}
                                            placeholder={Placeholder.NAME}
                                            value={brandName}
                                            onChangeText={(value) => { this.setState({ brandName: value }) }}
                                        />
                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={[Styles.center, { marginHorizontal: '10%', width: '100%' }]}>
                                            <TouchableOpacity style={[Styles.buttonBox, Styles.center, { width: '50%' }]} >
                                                <Text style={[Styles.buttonName, { paddingHorizontal: 30 }]} onPress={() => { this.handleAddImageBrand() }}>{LableText.NEXT}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                {/* }  */}
                            </View>
                        </View>
                    </Modal>
                    <View style={Styles.bottomSpace}></View>
                </Content>

            </SafeAreaLayout>
        );
    }

}