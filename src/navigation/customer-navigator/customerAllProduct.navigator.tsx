import React from 'react';
import { CompositeNavigationProp, RouteProp,} from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp, } from '@react-navigation/stack';
import { CustomerAllProductTabNavigationProps } from './customerHome.navigator';
import { AppRoute } from '../app-routes';
import { CartScreen, CustomerAllProductScreen } from '../../scenes/Customer/allProduct';
type CustomerAllProductNavigatorParams = {
    [AppRoute.CUSTOMER_ALL_PRODUCT]: undefined;   
    [AppRoute.CUSTOMER_CART]: undefined;   
}

export interface CustomerAllProductScreenProps {
    navigation: CompositeNavigationProp<
    CustomerAllProductTabNavigationProps,
        StackNavigationProp<CustomerAllProductNavigatorParams, AppRoute.CUSTOMER_ALL_PRODUCT>
    >;
    route: RouteProp<CustomerAllProductNavigatorParams, AppRoute.CUSTOMER_ALL_PRODUCT>;
}

export interface CartScreenProps {
    navigation: CompositeNavigationProp<
    CustomerAllProductTabNavigationProps,
        StackNavigationProp<CustomerAllProductNavigatorParams, AppRoute.CUSTOMER_CART>
    >;
    route: RouteProp<CustomerAllProductNavigatorParams, AppRoute.CUSTOMER_CART>;
}

const Stack = createStackNavigator<CustomerAllProductNavigatorParams>();

export const CustomerAllProductNavigator = (): React.ReactElement => (
    <Stack.Navigator headerMode='none'>
        <Stack.Screen name={AppRoute.CUSTOMER_ALL_PRODUCT} component={CustomerAllProductScreen} />        
        <Stack.Screen name={AppRoute.CUSTOMER_CART} component={CartScreen} />        
    </Stack.Navigator>
);
