import React, { Component } from "react";
import { View, Text } from "react-native";
import { Divider, ThemedComponentProps } from "react-native-ui-kitten";
import { WishListScreenProps } from "../../../navigation/customer-navigator/wishList.navigator";
import { SafeAreaLayout } from "../../../components/safe-area-layout.component";
import { Toolbar } from "../../../components/toolbar.component";
import { MenuIcon } from "../../../assets/icons";

export class WishListScreen extends Component<WishListScreenProps, ThemedComponentProps & any> {
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
                    title='Wish List'
                    backIcon={MenuIcon}
                    onBackPress={this.props.navigation.openDrawer}
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
                <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>This page will be added soon.</Text>
                </View>
                {/* </Content> */}
            </SafeAreaLayout>
        );
    }

}