import React from 'react';
import {
    CompositeNavigationProp,
    RouteProp,
} from '@react-navigation/core';
import {
    createStackNavigator,
    StackNavigationProp,
} from '@react-navigation/stack';
import { CustomerTabNavigationProp } from './home.navigator';
import { AppRoute } from './app-routes';
import { JobDetailScreen } from '../scenes/myJobs';
import { CustomerDetailScreen, CustomerScreen } from '../scenes/shopkeeper/customer';

type CustomerNavigatorParams = {
    [AppRoute.SHOP_CUSTOMER]: undefined;   
    [AppRoute.SHOP_CUSTOMER_DETAIL]: undefined;   
}

export interface CustomerScreenProps {
    navigation: CompositeNavigationProp<
    CustomerTabNavigationProp,
        StackNavigationProp<CustomerNavigatorParams, AppRoute.SHOP_CUSTOMER>
    >;
    route: RouteProp<CustomerNavigatorParams, AppRoute.SHOP_CUSTOMER>;
}

export interface CustomerDetailScreenProps {
    navigation: CompositeNavigationProp<
    CustomerTabNavigationProp,
        StackNavigationProp<CustomerNavigatorParams, AppRoute.SHOP_CUSTOMER_DETAIL>
    >;
    route: RouteProp<CustomerNavigatorParams, AppRoute.SHOP_CUSTOMER_DETAIL>;
}


const Stack = createStackNavigator<CustomerNavigatorParams>();

export const CustomerNavigator = (): React.ReactElement => (
    <Stack.Navigator headerMode='none'>
        <Stack.Screen name={AppRoute.SHOP_CUSTOMER} component={CustomerScreen} />        
        <Stack.Screen name={AppRoute.SHOP_CUSTOMER_DETAIL} component={CustomerDetailScreen} />        
    </Stack.Navigator>
);
