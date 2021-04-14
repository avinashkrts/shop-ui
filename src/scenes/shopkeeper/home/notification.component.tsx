import { Content } from "native-base";
import React, { Component } from "react";
import { RefreshControl, View, Text } from "react-native";
import { Divider, ThemedComponentProps } from "react-native-ui-kitten";
import { NotificationScreenProps } from "../../../navigation/home.navigator";
import { SafeAreaLayout } from "../../../components/safe-area-layout.component";
import { Toolbar } from "../../../components/toolbar.component";
import { BackIcon } from "../../../assets/icons";
import { Styles } from "../../../assets/styles";

export class NotificationScreen extends Component<NotificationScreenProps, ThemedComponentProps & any> {
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
            <SafeAreaLayout>
                <Toolbar
                    title='Notification'
                    backIcon={BackIcon}
                    onBackPress={this.props.navigation.goBack}
                    style={{ marginTop: -5, marginLeft: -5 }}
                />
                <Divider/>
                {/* <Content style={styles.content}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                > */}
                 <View style={Styles.notification_main}>
                    
                        <Text style={Styles.notification_text}>One Order Received From Avinash Kumar</Text>
                   
                </View>



                {/* </Content> */}
            </SafeAreaLayout>
        );
    }

}