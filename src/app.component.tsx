import React, { Component, useEffect } from 'react';
import { YellowBox, AsyncStorage, Alert, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  light,
  mapping,
  dark,
} from '@eva-design/eva';
import {
  ApplicationProvider,
  IconRegistry,
  Text,
} from 'react-native-ui-kitten';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './navigation/app.navigator';
import { AppRoute } from './navigation/app-routes';
import SplashScreen from 'react-native-splash-screen';
import OneSignal from 'react-native-onesignal';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store';

// This value is used to determine the initial screen
// const isAuthorized: boolean = false;
// const [isAuthorized, setIsAuthorized] = React.useState<boolean>(false);
// const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
// const [isUser, setIsUser] = React.useState<boolean>(false);
// const [userTypea, setUserTypea] = React.useState<String>('');
// const [wait, setWait] = React.useState<String>('');



export default class App extends Component<any, any>{
  constructor(props) {
    super(props);

    this.state = {
      isAuthorized: false
    }

    this.check = this.check.bind(this);
  }

  async componentDidMount() {
    // const value = await AsyncStorage.getItem('userDetail');
    // const value1 = await AsyncStorage.getItem('adminType');
    // const logedIn = await AsyncStorage.getItem('logedIn');
    // const value2 = await AsyncStorage.getItem('customerType');
    // if (value && (value1 || value2)) {
    //   const user = JSON.parse(value);
    //   const admin = Number(JSON.parse(value1));
    //   const customer = Number(JSON.parse(value2));
    //   // console.log('UserType' + 'admin: ', admin + "customer", customer)
    //   console.log('UserType' + 'admin: ', admin + "customer", customer, logedIn)
    //   if (logedIn === 'true') {
    //     // console.log('User Type in' + ' admin: ', admin + "customer", customer)    
    //     const userType = Number(user.userType);
    //     const token = user.token;
    //     if (token !== '' && token.length !== null) {
    //       if (token.length > 30) {
    //         // console.log('User Type in admin:', admin, isAuthorized, isUser, isAdmin, userType )    
    //         if (userType == customer) {
    //           this.props.navigation.navigate(AppRoute.CUSTOMER_HOME)
    //           //   console.log('User Type in customer:' + customer, userType)
    //         } else if (userType == admin) {
    //           this.props.navigation.navigate(AppRoute.HOME)
    //           //   console.log('User Type in admin' + admin, userType)
    //         } else {
    //           this.props.navigation.navigate(AppRoute.CUSTOMER_HOME)
    //         }
    //       } else {
    //         this.props.navigation.navigate(AppRoute.CUSTOMER_HOME)
    //       }
    //     } else {
    //       this.props.navigation.navigate(AppRoute.CUSTOMER_HOME)
    //     }
    //   } else {
    //     this.props.navigation.navigate(AppRoute.CUSTOMER_HOME)
    //   }
    // } else {
    //   this.props.navigation.navigate(AppRoute.CUSTOMER_HOME)
    // }
    SplashScreen.hide();
  }

  async check() {
    const { isAuthorized } = this.state
    const value = await AsyncStorage.getItem('userDetail');
    if (value) {
      const user = JSON.parse(value);
      if (user) {
        if (user.isActive && isAuthorized != true) {
          this.setState({ isAuthorized: true });
        }
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider
              mapping={mapping}
              theme={light}>
              <SafeAreaProvider>
                <NavigationContainer>
                  <AppNavigator initialRouteName={AppRoute.USER_DECIDE} />
                </NavigationContainer>
              </SafeAreaProvider>
            </ApplicationProvider>
          </PersistGate>
        </Provider>
      </React.Fragment>
    );
  }
}
// For some reason, starting from 0.61, react-native-gesture-handler throws this warning
// https://github.com/facebook/react-native/issues/26226
YellowBox.ignoreWarnings([
  'RCTRootView cancelTouches',
]);