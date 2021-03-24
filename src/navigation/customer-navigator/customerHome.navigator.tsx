import React from 'react';
import {
  CompositeNavigationProp,
  RouteProp,
} from '@react-navigation/core';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import {
  BottomTabBarProps,
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { AppRoute } from '../app-routes';
import {
  HomeDrawer,
  HomeTabBar,
} from '../../scenes/home';
import {
  HomeIcon,
  CandidateIcon,
  ProfileIcon,
  LogoutIcon,
  PostJobIcon,
  CameraIcon,
  AddressIcon,
  WalletIcon,
  CartNavIcon,
  NotificationIcon,
  HelpIcon,
  MyOrderIcon,
} from '../../assets/icons';
import { AuthNavigator } from '../auth.navigator';
import { CustomerAllProductNavigator } from './customerAllProduct.navigator';
import { WishListNavigator } from './wishList.navigator';
import { BillBookNavigator } from './billBook.navigator';
import { OffersNavigator } from './offers.navigator';
import { CustomerProfileScreen } from '../../scenes/Customer/home/customerProfile.component';

type CustomerHomeDrawerNavigatorParams = {
  [AppRoute.CUSTOMER_HOME]: undefined;
  [AppRoute.CUSTOMER_ADDRESS]: undefined;
  [AppRoute.CUSTOMER_CART]: undefined;
  [AppRoute.CUSTOMER_CONTACT]: undefined;
  [AppRoute.CUSTOMER_NOTIFICATION]: undefined;
  [AppRoute.CUSTOMER_ORDER]: undefined;
  [AppRoute.CUSTOMER_WALLET]: undefined;
  [AppRoute.WALLET]: undefined;
  [AppRoute.IMAGEUPLOAD]: undefined;
  [AppRoute.LOGOUT]: undefined;
  [AppRoute.CUSTOMER_PROFILE]: undefined;
  [AppRoute.TRANSACTIONHISTORY]: undefined;
  [AppRoute.MORE]: undefined;
  [AppRoute.SETTING]: undefined;
  [AppRoute.INFORMATION]: undefined;


}

type HomeBottomTabsNavigatorParams = {
  [AppRoute.CUSTOMER_ALL_PRODUCT]: undefined;
  [AppRoute.BILL_BOOK]: undefined;
  [AppRoute.OFFERS_TAB]: undefined;
  [AppRoute.WISH_LIST]: undefined;
}

export type CustomerAllProductTabNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<HomeBottomTabsNavigatorParams, AppRoute.CUSTOMER_ALL_PRODUCT>,
  DrawerNavigationProp<CustomerHomeDrawerNavigatorParams, AppRoute.CUSTOMER_HOME>
>;

export type BillBookTabNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<HomeBottomTabsNavigatorParams, AppRoute.BILL_BOOK>,
  DrawerNavigationProp<CustomerHomeDrawerNavigatorParams, AppRoute.CUSTOMER_HOME>
>;

export type OffersTabNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<HomeBottomTabsNavigatorParams, AppRoute.OFFERS_TAB>,
  DrawerNavigationProp<CustomerHomeDrawerNavigatorParams, AppRoute.CUSTOMER_HOME>
>;

export type WishListTabNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<HomeBottomTabsNavigatorParams, AppRoute.WISH_LIST>,
  DrawerNavigationProp<CustomerHomeDrawerNavigatorParams, AppRoute.CUSTOMER_HOME>
>;

export interface CustomerProfileScreenProps {
  navigation: DrawerNavigationProp<CustomerHomeDrawerNavigatorParams, AppRoute.CUSTOMER_PROFILE>;
  route: RouteProp<CustomerHomeDrawerNavigatorParams, AppRoute.CUSTOMER_PROFILE>;
}

// export interface ProfileEditScreenProps {
//   navigation: DrawerNavigationProp<CustomerHomeDrawerNavigatorParams, AppRoute.PROFILEEDIT>;
//   route: RouteProp<CustomerHomeDrawerNavigatorParams, AppRoute.PROFILEEDIT>;
// }

// export interface ImageUploadScreenProps {
//   navigation: DrawerNavigationProp<CustomerHomeDrawerNavigatorParams, AppRoute.IMAGEUPLOAD>;
//   route: RouteProp<CustomerHomeDrawerNavigatorParams, AppRoute.IMAGEUPLOAD>;
// }


// export interface WalletScreenProps {
//   navigation: DrawerNavigationProp<CustomerHomeDrawerNavigatorParams, AppRoute.WALLET>;
//   route: RouteProp<CustomerHomeDrawerNavigatorParams, AppRoute.WALLET>;
// }

// export interface SettingScreenProps {
//   navigation: DrawerNavigationProp<CustomerHomeDrawerNavigatorParams, AppRoute.SETTING>;
//   route: RouteProp<CustomerHomeDrawerNavigatorParams, AppRoute.SETTING>;
// }

// export interface TransactionHistoryScreenProps {
//   navigation: DrawerNavigationProp<CustomerHomeDrawerNavigatorParams, AppRoute.TRANSACTIONHISTORY>;
//   route: RouteProp<CustomerHomeDrawerNavigatorParams, AppRoute.TRANSACTIONHISTORY>;
// }

// export interface ChangepasswordScreenProps {
//   navigation: DrawerNavigationProp<CustomerHomeDrawerNavigatorParams, AppRoute.CHANGEPASSWORD>;
//   route: RouteProp<CustomerHomeDrawerNavigatorParams, AppRoute.CHANGEPASSWORD>;
// }

// export interface AuthNavigatorScreenProps {
//   navigation: DrawerNavigationProp<CustomerHomeDrawerNavigatorParams, AppRoute.AUTH>;
//   route: RouteProp<CustomerHomeDrawerNavigatorParams, AppRoute.AUTH>;
// }

// export interface InformaionNavigatorScreenProps {
//   navigation: DrawerNavigationProp<CustomerHomeDrawerNavigatorParams, AppRoute.INFORMATION>;
//   route: RouteProp<CustomerHomeDrawerNavigatorParams, AppRoute.INFORMATION>;
// }

// export interface AskFreeQuestionScreenprops {
//   navigation: DrawerNavigationProp<CustomerHomeDrawerNavigatorParams, AppRoute.ASKFREEQUESTION>;
//   route: RouteProp<CustomerHomeDrawerNavigatorParams, AppRoute.ASKFREEQUESTION>;
// }

// export interface MoreScreenProps {
//   navigation: DrawerNavigationProp<CustomerHomeDrawerNavigatorParams, AppRoute.MORE>;
//   route: RouteProp<CustomerHomeDrawerNavigatorParams, AppRoute.MORE>;
// }


// export interface AccountsScreenProps {
//   navigation: DrawerNavigationProp<CustomerHomeDrawerNavigatorParams, AppRoute.ACCOUNTS>;
//   route: RouteProp<CustomerHomeDrawerNavigatorParams, AppRoute.ACCOUNTS>;
// }

// export type BottomHomeScreenProps = BottomTabBarProps & {
//   navigation: TodoTabNavigationProp;
// };

// export type DrawerHomeScreenProps = DrawerContentComponentProps & {
//   navigation: DrawerNavigationProp<CustomerHomeDrawerNavigatorParams, AppRoute.CUSTOMER_HOME>;
// };



const Drawer = createDrawerNavigator<CustomerHomeDrawerNavigatorParams>();
const BottomTab = createBottomTabNavigator<HomeBottomTabsNavigatorParams>();

// FIXME(REACT-NAVIGATION-5): Not able to disable a pan gesture.
//
// In v4, it was possible with `navigationOptions: { gesturesEnabled: false }`
// Basically, I want to do this to disable `back` navigation from home screen to auth
// For Android, it can be covered with custom BackHandler.
//
// I'm not sure if it is a "true way", but I find it better
// rather than hard-coding business logic in navigators
// like it is described in https://reactnavigation.org/docs/en/next/auth-flow.html

const CustomerHomeBottomNavigator = (): React.ReactElement => (
  // @ts-ignore: `tabBar` also contains a DrawerNavigationProp
  <BottomTab.Navigator tabBar={props => <HomeTabBar{...props} />}>

    <BottomTab.Screen
      name={AppRoute.CUSTOMER_ALL_PRODUCT}
      component={CustomerAllProductNavigator}
      options={{ title: 'Home', tabBarIcon: HomeIcon }}
    />

    <BottomTab.Screen
      name={AppRoute.WISH_LIST}
      component={WishListNavigator}
      options={{ title: 'Wish List', tabBarIcon: CandidateIcon }}
    />

    <BottomTab.Screen
      name={AppRoute.BILL_BOOK}
      component={BillBookNavigator}
      options={{ title: 'Bill Book', tabBarIcon: PostJobIcon }}
    />

    <BottomTab.Screen
      name={AppRoute.OFFERS_TAB}
      component={OffersNavigator}
      options={{ title: 'Offers', tabBarIcon: ProfileIcon }}
    />

  </BottomTab.Navigator>
);

export const CustomerHomeNavigator = (): React.ReactElement => (
  // @ts-ignore: `drawerContent` also contains a DrawerNavigationProp
  <Drawer.Navigator drawerContent={props => <HomeDrawer{...props} />}>
    <Drawer.Screen
      name={AppRoute.CUSTOMER_HOME}
      component={CustomerHomeBottomNavigator}
      options={{ title: 'Home', drawerIcon: HomeIcon }}
    />

    <Drawer.Screen
      name={AppRoute.CUSTOMER_PROFILE}
      component={CustomerProfileScreen}
      options={{ title: 'Profile', drawerIcon: ProfileIcon }}
    />

    <Drawer.Screen
      name={AppRoute.CUSTOMER_ADDRESS}
      component={CustomerHomeBottomNavigator}
      options={{ title: 'Address', drawerIcon: AddressIcon }}
    />
    <Drawer.Screen
      name={AppRoute.CUSTOMER_WALLET}
      component={CustomerHomeBottomNavigator}
      options={{ title: 'My wallet', drawerIcon: WalletIcon }}
    />
    <Drawer.Screen
      name={AppRoute.CUSTOMER_ORDER}
      component={CustomerHomeBottomNavigator}
      options={{ title: 'My Order', drawerIcon: MyOrderIcon }}
    />

    <Drawer.Screen
      name={AppRoute.CUSTOMER_CART}
      component={CustomerHomeBottomNavigator}
      options={{ title: 'My cart', drawerIcon: CartNavIcon }}
    />

    <Drawer.Screen
      name={AppRoute.CUSTOMER_NOTIFICATION}
      component={CustomerHomeBottomNavigator}
      options={{ title: 'Notification', drawerIcon: NotificationIcon }}
    />

    <Drawer.Screen
      name={AppRoute.CUSTOMER_CONTACT}
      component={CustomerHomeBottomNavigator}
      options={{ title: 'Contact Us', drawerIcon: HelpIcon }}
    />

    <Drawer.Screen
      name={AppRoute.LOGOUT}
      component={CustomerHomeBottomNavigator}
      options={{ title: 'Logout', drawerIcon: LogoutIcon }}
    />

  </Drawer.Navigator>
);

