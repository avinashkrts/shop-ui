import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthNavigator } from './auth.navigator';
import { UserDecideNavigator } from './userDecide.navigator';
import { AddProductNavigator } from './addProductNavigator.navigator';
import { HomeNavigator } from './home.navigator';
import { InformaionNavigator } from './information.navigator';
import { AppRoute } from './app-routes';
import { CustomerHomeNavigator } from './customer-navigator/customerHome.navigator';

type StackNavigatorProps = React.ComponentProps<typeof Stack.Navigator>;

export type AppNavigatorParams = {
  [AppRoute.AUTH]: undefined;
  [AppRoute.USER_DECIDE]: undefined;
  [AppRoute.ADD_PRODUCT_NAVIGATOR]: undefined;
  [AppRoute.CUSTOMER_HOME]: undefined;
  [AppRoute.INFORMATION]: undefined;
  [AppRoute.HOME]: undefined;
  [AppRoute.HRHOME]: undefined;
}

const Stack = createStackNavigator<AppNavigatorParams>();

export const AppNavigator = (props: Partial<StackNavigatorProps>): React.ReactElement => (
  <Stack.Navigator {...props} headerMode='none'>
    <Stack.Screen name={AppRoute.AUTH} component={AuthNavigator}/>
    <Stack.Screen name={AppRoute.USER_DECIDE} component={UserDecideNavigator}/>
    <Stack.Screen name={AppRoute.ADD_PRODUCT_NAVIGATOR} component={AddProductNavigator}/>
    <Stack.Screen name={AppRoute.CUSTOMER_HOME} component={CustomerHomeNavigator}/>
    <Stack.Screen name={AppRoute.INFORMATION} component={InformaionNavigator}/>
    <Stack.Screen name={AppRoute.HOME} component={HomeNavigator}/>
  </Stack.Navigator>
);
