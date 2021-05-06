import React from 'react';
import {
    CompositeNavigationProp,
    RouteProp,
} from '@react-navigation/core';
import {
    createStackNavigator,
    StackNavigationProp,
} from '@react-navigation/stack';
import { StockTabNavigationProp } from './home.navigator';
import { AppRoute } from './app-routes';
import { ItemCategoryScreen, AddCategoryScreen, BrandListScreen, ItemListScreen, AddProductScreen } from '../scenes/shopkeeper/stock';

type StockNavigatorParams = {
    [AppRoute.ITEM_CATEGORY]: undefined;
    [AppRoute.ADD_CATEGORY]: undefined;
    [AppRoute.BRANDLIST]: undefined;
    [AppRoute.ITEMLIST]: undefined;
    [AppRoute.ADD_PRODUCT]: undefined;
}

export interface ItemCategoryScreenProps {
    navigation: CompositeNavigationProp<
        StockTabNavigationProp,
        StackNavigationProp<StockNavigatorParams, AppRoute.ITEM_CATEGORY>
    >;
    route: RouteProp<StockNavigatorParams, AppRoute.ITEM_CATEGORY>;
}

export interface BrandListScreenProps {
    navigation: CompositeNavigationProp<
        StockTabNavigationProp,
        StackNavigationProp<StockNavigatorParams, AppRoute.BRANDLIST>
    >;
    route: RouteProp<StockNavigatorParams, AppRoute.BRANDLIST>;
}

export interface ItemListScreenProps {
    navigation: CompositeNavigationProp<
        StockTabNavigationProp,
        StackNavigationProp<StockNavigatorParams, AppRoute.ITEMLIST>
    >;
    route: RouteProp<StockNavigatorParams, AppRoute.ITEMLIST>;
}

export interface AddCategoryScreenProps {
    navigation: CompositeNavigationProp<
        StockTabNavigationProp,
        StackNavigationProp<StockNavigatorParams, AppRoute.ADD_CATEGORY>
    >;
    route: RouteProp<StockNavigatorParams, AppRoute.ADD_CATEGORY>;
}

export interface AddProductScreenProps {
    navigation: CompositeNavigationProp<
        StockTabNavigationProp,
        StackNavigationProp<StockNavigatorParams, AppRoute.ADD_PRODUCT>
    >;
    route: RouteProp<StockNavigatorParams, AppRoute.ADD_PRODUCT>;
}

const Stack = createStackNavigator<StockNavigatorParams>();

export const StockNavigator = (): React.ReactElement => (
    <Stack.Navigator headerMode='none'>
        <Stack.Screen name={AppRoute.ITEM_CATEGORY} component={ItemCategoryScreen} />
        <Stack.Screen name={AppRoute.ADD_CATEGORY} component={AddCategoryScreen} />
        <Stack.Screen name={AppRoute.BRANDLIST} component={BrandListScreen} />
        <Stack.Screen name={AppRoute.ITEMLIST} component={ItemListScreen} />
        <Stack.Screen name={AppRoute.ADD_PRODUCT} component={AddProductScreen} />
    </Stack.Navigator>
);
