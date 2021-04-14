import { Content } from "native-base";
import React, { Component } from "react";
import { RefreshControl, View, Text } from "react-native";
import { Divider, ThemedComponentProps } from "react-native-ui-kitten";
import { ValidityScreenProps } from "../../../navigation/home.navigator";
import { SafeAreaLayout } from "../../../components/safe-area-layout.component";
import { Toolbar } from "../../../components/toolbar.component";
import { BackIcon } from "../../../assets/icons";
import { Styles } from "../../../assets/styles";
import { TouchableOpacity } from "react-native-gesture-handler";

export class ValidityScreen extends Component<ValidityScreenProps, ThemedComponentProps & any> {
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
        return (
            <SafeAreaLayout style={Styles.content}>
                <Toolbar
                    title='Validity'
                    backIcon={BackIcon}
                    onBackPress={this.props.navigation.goBack}
                    style={{ marginTop: -5, marginLeft: -5 }}
                />
                <Divider />
                {/* <Content style={styles.content}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                > */}
                <View style={Styles.validity}>
                    <Text style={Styles.validity_text}>Validity of Your Subscription Will Expire in 10 days</Text>
                </View>

                <TouchableOpacity style={Styles.validity_button}>
                    <Text style={Styles.validity_text}>Recharge</Text>
                </TouchableOpacity>

                {/* </Content> */}
            </SafeAreaLayout>
        );
    }

}