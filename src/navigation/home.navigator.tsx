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
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { EmployeeNavigator } from './employee.navigator';
import { CustomerNavigator } from './Customer.navigator';
import { StockNavigator } from './stock.navigator';
import { AppRoute } from './app-routes';
import {
  ContactUsScreen,
  AccountsScreen,
  ProfileScreen,
  HomeDrawer,
  HomeTabBar,
  ChangepasswordScreen,
  LogoutScreen,
  SettingScreen
} from '../scenes/home';
import {
  StockIcon, AddEmployeeIcon,
  ProfileIcon,
  HomeIcon,
  InfoIcon,
  AccountsIcon,
  ChangePasswordIcon,
  LogoutIcon,
  AddCustomerIcon,
  NotificationIcon,
  WalletIcon,
  PayNowIcon,
  CustomerIcon,
  MyOrderIcon,
  ValidityIcon,
  AddProductIcon,
} from '../assets/icons';
import { AllItemNavigator } from './shopKeeperNavigator/allItem.Navigator';

type HomeDrawerNavigatorParams = {
  [AppRoute.HOME]: undefined;
  [AppRoute.CONTACT]: undefined;
  [AppRoute.ACCOUNTS]: undefined;
  [AppRoute.CHANGEPASSWORD]: undefined;
  [AppRoute.IMAGEUPLOAD]: undefined;
  [AppRoute.LOGOUT]: undefined;
  [AppRoute.AUTH]: undefined;
  [AppRoute.PROFILE]: undefined;
  [AppRoute.MY_WALLET]: undefined;
  [AppRoute.MY_ORDER]: undefined;
  [AppRoute.VALIDITY]: undefined;
  [AppRoute.NOTIFICATION]: undefined;
  [AppRoute.PAY_NOW]: undefined;
  [AppRoute.ADD_PRODUCT]: undefined;
  [AppRoute.ADD_CUSTOMER]: undefined;
  [AppRoute.ADD_EMPLOYEE]: undefined;
  [AppRoute.CUSTOMER_LIST]: undefined;
  [AppRoute.STOCK_LIST]: undefined;
  [AppRoute.OUT_OF_STOCK]: undefined;
  [AppRoute.OFFERS]: undefined;
  [AppRoute.DAILY_MESSAGE]: undefined;

}

type HomeBottomTabsNavigatorParams = {
  [AppRoute.ALLITEM]: undefined;
  [AppRoute.CUSTOMER]: undefined;
  [AppRoute.STOCK]: undefined;
  [AppRoute.EMPLOYEE]: undefined;
}

export type AllItemTabNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<HomeBottomTabsNavigatorParams, AppRoute.ALLITEM>,
  DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.HOME>
>;

export type CustomerTabNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<HomeBottomTabsNavigatorParams, AppRoute.CUSTOMER>,
  DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.HOME>
>;

export type EmployeeTabNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<HomeBottomTabsNavigatorParams, AppRoute.EMPLOYEE>,
  DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.HOME>
>;

// export type TimelineTabNavigationProp = CompositeNavigationProp<
//   BottomTabNavigationProp<HomeBottomTabsNavigatorParams, AppRoute.TIMELINE>,
//   DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.HOME>
// >;

export type StockTabNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<HomeBottomTabsNavigatorParams, AppRoute.STOCK>,
  DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.HOME>
>;

export interface AboutScreenProps {
  navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.CONTACT>;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.CONTACT>;
}

// export interface ProfileScreenProps {
//   navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.PROFILE>;
//   route: RouteProp<HomeDrawerNavigatorParams, AppRoute.PROFILE>;
// }

// export interface ProfileEditScreenProps {
//   navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.PROFILEEDIT>;
//   route: RouteProp<HomeDrawerNavigatorParams, AppRoute.PROFILEEDIT>;
// }

export interface ImageUploadScreenProps {
  navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.IMAGEUPLOAD>;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.IMAGEUPLOAD>;
}


// export interface WalletScreenProps {
//   navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.WALLET>;
//   route: RouteProp<HomeDrawerNavigatorParams, AppRoute.WALLET>;
// }

// export interface SettingScreenProps {
//   navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.SETTING>;
//   route: RouteProp<HomeDrawerNavigatorParams, AppRoute.SETTING>;
// }

// export interface TransactionHistoryScreenProps {
//   navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.TRANSACTIONHISTORY>;
//   route: RouteProp<HomeDrawerNavigatorParams, AppRoute.TRANSACTIONHISTORY>;
// }

export interface ChangepasswordScreenProps {
  navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.CHANGEPASSWORD>;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.CHANGEPASSWORD>;
}

export interface AuthNavigatorScreenProps {
  navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.AUTH>;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.AUTH>;
}

// export interface ProfileNavigatorScreenProps {
//   navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.PROFILE>;
//   route: RouteProp<HomeDrawerNavigatorParams, AppRoute.PROFILE>;
// }

// export interface InformaionNavigatorScreenProps {
//   navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.INFORMATION>;
//   route: RouteProp<HomeDrawerNavigatorParams, AppRoute.INFORMATION>;
// }

// export interface AskFreeQuestionScreenprops {
//   navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.ASKFREEQUESTION>;
//   route: RouteProp<HomeDrawerNavigatorParams, AppRoute.ASKFREEQUESTION>;
// }

export interface ProfileScreenProps {
  navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.PROFILE>;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.PROFILE>;
}


export interface AccountsScreenProps {
  navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.ACCOUNTS>;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.ACCOUNTS>;
}

// export type BottomHomeScreenProps = BottomTabBarProps & {
//   navigation: TodoTabNavigationProp;
// };

export type DrawerHomeScreenProps = DrawerContentComponentProps & {
  navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.HOME>;
};



const Drawer = createDrawerNavigator<HomeDrawerNavigatorParams>();
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

const HomeBottomNavigator = (): React.ReactElement => (
  // @ts-ignore: `tabBar` also contains a DrawerNavigationProp
  <BottomTab.Navigator tabBar={props => <HomeTabBar{...props} />}>
    <BottomTab.Screen
      name={AppRoute.ALLITEM}
      component={AllItemNavigator}
      options={{ title: 'Home', tabBarIcon: HomeIcon }}
    />

    <BottomTab.Screen
      name={AppRoute.CUSTOMER}
      component={CustomerNavigator}
      options={{ title: 'Customer', tabBarIcon: CustomerIcon }}
    />

    {/* <BottomTab.Screen
      name={AppRoute.TIMELINE}
      component={TimelineNavigator}
      options={{ title: 'TIMELINE', tabBarIcon: TimeLineIcon }}
    /> */}
    <BottomTab.Screen
      name={AppRoute.STOCK}
      component={StockNavigator}
      options={{ title: 'Stock', tabBarIcon: StockIcon }}
    />

    <BottomTab.Screen
      name={AppRoute.EMPLOYEE}
      component={EmployeeNavigator}
      options={{ title: 'Employee', tabBarIcon: ProfileIcon }}
    />

  </BottomTab.Navigator>
);

export const HomeNavigator = (): React.ReactElement => (
  // HomeBottomNavigator()
  // @ts-ignore: `drawerContent` also contains a DrawerNavigationProp
  <Drawer.Navigator drawerContent={props => <HomeDrawer{...props} />}>
    <Drawer.Screen
      name={AppRoute.HOME}
      component={HomeBottomNavigator}
      options={{ title: 'Home', drawerIcon: HomeIcon }}
    />

    <Drawer.Screen
      name={AppRoute.PROFILE}
      component={ProfileScreen}
      options={{ title: 'Profile', drawerIcon: AccountsIcon }}
    />

    <Drawer.Screen
      name={AppRoute.MY_WALLET}
      component={ProfileScreen}
      options={{ title: 'My Wallet', drawerIcon: WalletIcon }}
    />

    <Drawer.Screen
      name={AppRoute.MY_ORDER}
      component={ProfileScreen}
      options={{ title: 'My Order', drawerIcon: MyOrderIcon }}
    />

    <Drawer.Screen
      name={AppRoute.VALIDITY}
      component={ProfileScreen}
      options={{ title: 'Validity', drawerIcon: ValidityIcon }}
    />

    <Drawer.Screen
      name={AppRoute.NOTIFICATION}
      component={ProfileScreen}
      options={{ title: 'Notification', drawerIcon: NotificationIcon }}
    />

    <Drawer.Screen
      name={AppRoute.PAY_NOW}
      component={ProfileScreen}
      options={{ title: 'Pay Now', drawerIcon: PayNowIcon }}
    />

    <Drawer.Screen
      name={AppRoute.ADD_PRODUCT}
      component={ProfileScreen}
      options={{ title: 'Add Product', drawerIcon: AddProductIcon }}
    />

    <Drawer.Screen
      name={AppRoute.ADD_CUSTOMER}
      component={ProfileScreen}
      options={{ title: 'Add Customer', drawerIcon: AddCustomerIcon }}
    />

    <Drawer.Screen
      name={AppRoute.ADD_EMPLOYEE}
      component={ProfileScreen}
      options={{ title: 'Add Employee', drawerIcon: AddEmployeeIcon }}
    />

    <Drawer.Screen
      name={AppRoute.CUSTOMER_LIST}
      component={ProfileScreen}
      options={{ title: 'Customer List', drawerIcon: AccountsIcon }}
    />

    <Drawer.Screen
      name={AppRoute.STOCK_LIST}
      component={ProfileScreen}
      options={{ title: 'Stock List', drawerIcon: AccountsIcon }}
    />

    <Drawer.Screen
      name={AppRoute.OUT_OF_STOCK}
      component={ProfileScreen}
      options={{ title: 'Out of Stock', drawerIcon: AccountsIcon }}
    />

    <Drawer.Screen
      name={AppRoute.OFFERS}
      component={ProfileScreen}
      options={{ title: 'Offers', drawerIcon: AccountsIcon }}
    />

    <Drawer.Screen
      name={AppRoute.DAILY_MESSAGE}
      component={ProfileScreen}
      options={{ title: 'Daily Message', drawerIcon: AccountsIcon }}
    />

    <Drawer.Screen
      name={AppRoute.LOGOUT}
      component={LogoutScreen}
      options={{ title: 'Logout', drawerIcon: LogoutIcon }}
    />
    {/* <Drawer.Screen
      name={AppRoute.SETTING}
      component={SettingScreen}
      options={{ title: 'Setting', drawerIcon: AccountsIcon }}
    /> */}

    {/* <Drawer.Screen
      name={AppRoute.PROFILEEDIT}
      component={ProfileEditScreen}
      options={{ title: 'Profile', drawerIcon: PersonIcon }}
    />      */}


    {/*     
     <Drawer.Screen
      name={AppRoute.WALLET}
      component={WalletScreen}
      options={{ title: 'Wallet', drawerIcon: WalletIcon }}
    /> */}

    {/* <Drawer.Screen
      name={AppRoute.TRANSACTIONHISTORY}
      component={TransactionHistoryScreen}
      options={{ title: 'All Transactions', drawerIcon: TransactionHistoryIcon }}
    />
     */}


    {/* <Drawer.Screen
      name={AppRoute.CHANGEPASSWORD}
      component={ChangepasswordScreen}
      options={{ title: 'Change password', drawerIcon: ChangePasswordIcon }}
    /> */}

    {/* <Drawer.Screen
      name={AppRoute.CONTACT}
      component={ContactUsScreen}
      options={{ title: 'Contact Us', drawerIcon: InfoIcon }}
    /> */}
    {/* <Drawer.Screen
      name={AppRoute.LOGOUT}
      component={LogoutScreen}
      options={{ title: 'Logout', drawerIcon: LogoutIcon }}
    /> */}
    {/* <Drawer.Screen
      name={AppRoute.IMAGEUPLOAD}
      component={ImageUploadScreen}
      options={{ title: 'ImageUpload', drawerIcon: InfoIcon}}
    /> */}



    {/* <Drawer.Screen
      name={AppRoute.PROFILE}
      component={ProfileScreen}
      // options={{ }}
    /> */}

    {/* <Drawer.Screen
      name={AppRoute.ASKFREEQUESTION}
      component={AskFreeQuestionScreen}
      // options={{ }}
    /> */}

    {/* <Drawer.Screen
      name={AppRoute.MORE}
      component={MoreScreen}
      // options={{ }}
    /> */}

  </Drawer.Navigator>
);

