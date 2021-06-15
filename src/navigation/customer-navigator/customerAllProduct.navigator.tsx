import React from 'react';
import { CompositeNavigationProp, RouteProp,} from '@react-navigation/core';
import { createStackNavigator, StackNavigationProp, } from '@react-navigation/stack';
import { CustomerAllProductTabNavigationProps } from './customerHome.navigator';
import { AppRoute } from '../app-routes';
import { CartScreen, CustomerAllProductScreen, CustomerAllShopScreen, CustProductDetailScreen, PaymentScreen, ShopDetailScreen } from '../../scenes/Customer/allProduct';
type CustomerAllProductNavigatorParams = {
    [AppRoute.CUSTOMER_ALL_PRODUCT]: undefined;   
    [AppRoute.CUSTOMER_ALL_SHOP]: undefined;   
    [AppRoute.CUSTOMER_PRODUCT_DETAIL]: undefined;   
    [AppRoute.CUSTOMER_CART]: undefined;   
    [AppRoute.SHOP_DETAIL]: undefined;   
    [AppRoute.PAYMENT]: undefined;   
}

export interface CustomerAllProductScreenProps {
    navigation: CompositeNavigationProp<
    CustomerAllProductTabNavigationProps,
        StackNavigationProp<CustomerAllProductNavigatorParams, AppRoute.CUSTOMER_ALL_PRODUCT>
    >;
    route: RouteProp<CustomerAllProductNavigatorParams, AppRoute.CUSTOMER_ALL_PRODUCT>;
}

export interface CustomerAllShopScreenProps {
    navigation: CompositeNavigationProp<
    CustomerAllProductTabNavigationProps,
        StackNavigationProp<CustomerAllProductNavigatorParams, AppRoute.CUSTOMER_ALL_SHOP>
    >;
    route: RouteProp<CustomerAllProductNavigatorParams, AppRoute.CUSTOMER_ALL_SHOP>;
}

export interface CartScreenProps {
    navigation: CompositeNavigationProp<
    CustomerAllProductTabNavigationProps,
        StackNavigationProp<CustomerAllProductNavigatorParams, AppRoute.CUSTOMER_CART>
    >;
    route: RouteProp<CustomerAllProductNavigatorParams, AppRoute.CUSTOMER_CART>;
}

export interface CustProductDetailScreenProps {
    navigation: CompositeNavigationProp<
    CustomerAllProductTabNavigationProps,
        StackNavigationProp<CustomerAllProductNavigatorParams, AppRoute.CUSTOMER_PRODUCT_DETAIL>
    >;
    route: RouteProp<CustomerAllProductNavigatorParams, AppRoute.CUSTOMER_PRODUCT_DETAIL>;
}

export interface ShopDetailScreenProps {
    navigation: CompositeNavigationProp<
    CustomerAllProductTabNavigationProps,
        StackNavigationProp<CustomerAllProductNavigatorParams, AppRoute.SHOP_DETAIL>
    >;
    route: RouteProp<CustomerAllProductNavigatorParams, AppRoute.SHOP_DETAIL>;
}

export interface PaymentScreenProps {
    navigation: CompositeNavigationProp<
    CustomerAllProductTabNavigationProps,
        StackNavigationProp<CustomerAllProductNavigatorParams, AppRoute.PAYMENT>
    >;
    route: RouteProp<CustomerAllProductNavigatorParams, AppRoute.PAYMENT>;
}


const Stack = createStackNavigator<CustomerAllProductNavigatorParams>();

export const CustomerAllProductNavigator = (): React.ReactElement => (
    <Stack.Navigator initialRouteName={AppRoute.CUSTOMER_ALL_SHOP} headerMode='none'>
        <Stack.Screen name={AppRoute.CUSTOMER_ALL_SHOP} component={CustomerAllShopScreen} />        
        <Stack.Screen name={AppRoute.CUSTOMER_ALL_PRODUCT} component={CustomerAllProductScreen} />        
        <Stack.Screen name={AppRoute.CUSTOMER_CART} component={CartScreen} />        
        <Stack.Screen name={AppRoute.SHOP_DETAIL} component={ShopDetailScreen} />        
        <Stack.Screen name={AppRoute.CUSTOMER_PRODUCT_DETAIL} component={CustProductDetailScreen} />        
        <Stack.Screen name={AppRoute.PAYMENT} component={PaymentScreen} />        
    </Stack.Navigator>
);
