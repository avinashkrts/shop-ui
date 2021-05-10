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
  ProfileScreen,
  HomeDrawer,
  HomeTabBar,
} from '../scenes/home';
import {LogoutScreen} from '../scenes/auth';
import {
  StockIcon, AddEmployeeIcon,
  ProfileIcon,
  HomeIcon,
  AccountsIcon,
  LogoutIcon,
  AddCustomerIcon,
  NotificationIcon,
  WalletIcon,
  PayNowIcon,
  CustomerIcon,
  MyOrderIcon,
  ValidityIcon,
  AddProductIcon,
  HelpIcon,
  CustomerListIcon,
  StockListIcon,
  OutOfStockIcon,
  OfferIcon,
  DailyMessageIcon,
} from '../assets/icons';
import { AllItemNavigator } from './shopKeeperNavigator/allItem.Navigator';
import { DailyMessageScreen, MyOrderScreen,MyWalletScreen, NotificationScreen, OffersScreen, OutOfStockScreen, PayNowScreen, StockListScreen, ValidityScreen } from '../scenes/shopkeeper/home';
// import { AddProductScreen } from '../scenes/home/addproduct.component';
import { AddCustomerScreen, CustomerDetailScreen, CustomerScreen } from '../scenes/shopkeeper/customer';
import { AddEducationScreen } from '../scenes/profile';
import { AddEmployeeScreen } from '../scenes/shopkeeper/Employee';
import { CustomerContactScreen } from '../scenes/Customer/home';

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
  [AppRoute.CONTACTUS]: undefined;
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

export interface MyOrderScreenProps {
  navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.MY_ORDER>;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.MY_ORDER>;
}

export interface ValidityScreenProps {
  navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.VALIDITY>;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.VALIDITY>;
}

export interface NotificationScreenProps {
  navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.NOTIFICATION>;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.NOTIFICATION>;
}

// export interface PayNowScreenProps {
//   navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.PAY_NOW>;
//   route: RouteProp<HomeDrawerNavigatorParams, AppRoute.PAY_NOW>;
// }

export interface StockListScreenProps {
  navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.STOCK_LIST>;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.STOCK_LIST>;
}

export interface OutOfStockScreenProps {
  navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.OUT_OF_STOCK>;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.OUT_OF_STOCK>;
}

export interface OffersScreenProps {
  navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.OFFERS>;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.OFFERS>;
}

export interface MyWalletScreenProps {
  navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.MY_WALLET>;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.MY_WALLET>;
}

export interface DailyMessageScreenProps {
  navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.DAILY_MESSAGE>;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.DAILY_MESSAGE>;
}

export interface ContactUsScreenProps {
  navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.CONTACTUS>;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.CONTACTUS>;
}

export interface AccountsScreenProps {
  navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.ACCOUNTS>;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.ACCOUNTS>;
}

export interface AddProductScreenProps {
  navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.ADD_PRODUCT>;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.ADD_PRODUCT>;
}

export interface AddCustomerScreenProps {
  navigation: DrawerNavigationProp<HomeDrawerNavigatorParams, AppRoute.ADD_CUSTOMER>;
  route: RouteProp<HomeDrawerNavigatorParams, AppRoute.ADD_CUSTOMER>;
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
      component={MyWalletScreen}
      options={{ title: 'My Wallet', drawerIcon: WalletIcon }}
    />

    <Drawer.Screen
      name={AppRoute.MY_ORDER}
      component={MyOrderScreen}
      options={{ title: 'My Order', drawerIcon: MyOrderIcon }}
    />

    <Drawer.Screen
      name={AppRoute.VALIDITY}
      component={ValidityScreen}
      options={{ title: 'Validity', drawerIcon: ValidityIcon }}
    />

    <Drawer.Screen
      name={AppRoute.NOTIFICATION}
      component={NotificationScreen}
      options={{ title: 'Notification', drawerIcon: NotificationIcon }}
    />

    {/* <Drawer.Screen
      name={AppRoute.PAY_NOW}
      component={PayNowScreen}
      options={{ title: 'Pay Now', drawerIcon: PayNowIcon }}
    /> */}

    {/* <Drawer.Screen
      name={AppRoute.ADD_PRODUCT}
      component={AddProductScreen}
      options={{ title: 'Add Product', drawerIcon: AddProductIcon }}
    /> */}

    <Drawer.Screen
      name={AppRoute.ADD_CUSTOMER}
      component={AddCustomerScreen}
      options={{ title: 'Add Customer', drawerIcon: AddCustomerIcon }}
    />

    <Drawer.Screen
      name={AppRoute.ADD_EMPLOYEE}
      component={AddEmployeeScreen}
      options={{ title: 'Add Employee', drawerIcon: AddEmployeeIcon }}
    />

    <Drawer.Screen
      name={AppRoute.CUSTOMER_LIST}
      component={CustomerScreen}
      options={{ title: 'Customer List', drawerIcon: CustomerListIcon }}
    />

    <Drawer.Screen
      name={AppRoute.STOCK_LIST}
      component={StockListScreen}
      options={{ title: 'Stock List', drawerIcon: StockListIcon }}
    />

    <Drawer.Screen
      name={AppRoute.OUT_OF_STOCK}
      component={OutOfStockScreen}
      options={{ title: 'Out of Stock', drawerIcon: OutOfStockIcon }}
    />

    {/* <Drawer.Screen
      name={AppRoute.OFFERS}
      component={OffersScreen}
      options={{ title: 'Offers', drawerIcon: OfferIcon }}
    /> */}

    <Drawer.Screen
      name={AppRoute.DAILY_MESSAGE}
      component={DailyMessageScreen}
      options={{ title: 'Daily Message', drawerIcon: DailyMessageIcon }}
    />

    <Drawer.Screen
      name={AppRoute.CONTACTUS}
      component={ContactUsScreen}
      options={{ title: 'Contact Us', drawerIcon: HelpIcon }}
    />

    <Drawer.Screen
      name={AppRoute.LOGOUT}
      component={LogoutScreen}
      options={{ title: 'Logout', drawerIcon: LogoutIcon }}
    />

  </Drawer.Navigator>
);

