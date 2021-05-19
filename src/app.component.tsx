import React, { useEffect } from 'react';
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

export default (): React.ReactFragment => {

  // This value is used to determine the initial screen
  // const isAuthorized: boolean = false;
  const [isAuthorized, setIsAuthorized] = React.useState<boolean>(false);
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
  const [isUser, setIsUser] = React.useState<boolean>(false);
  const [userTypea, setUserTypea] = React.useState<String>('');
  const [wait, setWait] = React.useState<String>('');



  useEffect(() => {
    // Alert.alert("HI")
    // check();
  })

  const check = async () => {
    const value = await AsyncStorage.getItem('userDetail');
    const value1 = await AsyncStorage.getItem('adminType');
    const value2 = await AsyncStorage.getItem('customerType');
    if (value && (value1 || value2)) {
      const user = JSON.parse(value);
      const admin = Number(JSON.parse(value1));
      const customer = Number(JSON.parse(value2));
      // console.log('UserType' + 'admin: ', admin + "customer", customer)
      if (user) {
        // console.log('User Type in' + ' admin: ', admin + "customer", customer)

        const userType = Number(user.userType);
        const token = user.token;
        if (token !== '' && token.length !== null) {
          if (token.length > 30 && isAuthorized !== true) {
            // console.log('User Type in admin:', admin, isAuthorized, isUser, isAdmin, userType )

            setIsAuthorized(!isAuthorized);
            if (userType == customer && isUser == false) {
              setIsUser(!isUser);
              setUserTypea("user")
              console.log('User Type in customer:' + customer, isAuthorized, isUser, isAdmin, userType)
            } if (userType == admin && isAdmin == false) {
              setIsAdmin(!isAdmin);
              setUserTypea("admin")
              console.log('User Type in admin' + admin, isAuthorized, isUser, isAdmin, userType)
            }
          }
        }
      }
    }
    setWait('Milaan')
  }

  // check();

  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        mapping={mapping}
        theme={light}>
        <SafeAreaProvider>
          {/* <Text>{userTypea}</Text> */}
          <NavigationContainer>
            {/* {wait !== '' ? */}
              <AppNavigator initialRouteName={AppRoute.HOME} />
              {/* : <ActivityIndicator style={{flex: 1,justifyContent: 'center', alignItems: 'center'}} size='large'/>
            } */}
          </NavigationContainer>
        </SafeAreaProvider>
      </ApplicationProvider>
    </React.Fragment>
  );
};

// For some reason, starting from 0.61, react-native-gesture-handler throws this warning
// https://github.com/facebook/react-native/issues/26226
YellowBox.ignoreWarnings([
  'RCTRootView cancelTouches',
]);