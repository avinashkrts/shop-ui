import React, { Component } from "react";
import { View, Text, RefreshControl } from "react-native";
import { Avatar, Divider, ThemedComponentProps } from "react-native-ui-kitten";
import { CustomerContactScreenProps } from "../../../navigation/customer-navigator/customerHome.navigator";
import { SafeAreaLayout, SaveAreaInset } from "../../../components/safe-area-layout.component";
import { Toolbar } from "../../../components/toolbar.component";
import { BackIcon, MenuIcon } from "../../../assets/icons";
import { Styles } from "../../../assets/styles";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { LableText } from "../../../constants";
import { Content } from "native-base";

export class CustomerContactScreen extends Component<CustomerContactScreenProps, ThemedComponentProps & any> {
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
        const { isEditable } = this.state
        return (
            <SafeAreaLayout
                style={Styles.safeArea}
                insets={SaveAreaInset.TOP}>
                <Toolbar
                    title='Contact Us'
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

                    <Divider />
                    <View style={Styles.about_main}>
                        <Text style={Styles.about_text}>About Us</Text>
                    </View>
                    <View style={Styles.about_proprety}>
                        <Text style={Styles.about_us}>address</Text>
                        <Text style={Styles.about_content}>
                            The fact that you are seeing this page indicates that the website you just visited is either experiencing problems, or is undergoing routine maintenance.
                            If you would like to let the administrators of this website know that you've seen this page instead of the page you expected, you should send them e-mail. In general, mail sent to the name "webmaster" and directed to the website's domain should reach the appropriate person.
                            For example, if you experienced problems while visiting www.example.com, you should send e-mail to "webmaster@example.com".</Text>
                    </View>
                    
                    <View style={Styles.about_proprety}>
                        <Text style={Styles.about_contact}>about</Text>
                        <Text style={Styles.about_content}>
                            The fact that you are seeing this page indicates that the website you just visited is either experiencing problems, or is undergoing routine maintenance.
                            If you would like to let the administrators of this website know that you've seen this page instead of the page you expected, you should send them e-mail. In general, mail sent to the name "webmaster" and directed to the website's domain should reach the appropriate person.
                            For example, if you experienced problems while visiting www.example.com, you should send e-mail to "webmaster@example.com".</Text>
                    </View>
                    <View style={Styles.about_conta}>
                        <Text>fdsf</Text>
                    </View>
                    <View style={Styles.bottomSpace}></View>
                </Content>

            </SafeAreaLayout>
        );
    }

}