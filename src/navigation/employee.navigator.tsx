import React from 'react';
import {
    CompositeNavigationProp,
    RouteProp,
} from '@react-navigation/core';
import {
    createStackNavigator,
    StackNavigationProp,
} from '@react-navigation/stack';
import { EmployeeTabNavigationProp } from './home.navigator';
import { AppRoute } from './app-routes';
import { EmployeeScreen, AddEmployeeScreen } from '../scenes/shopkeeper/Employee';
// import { ProfileScreen, EditProfileScreen, ResumeScreen, AddAchivementScreen, AddEducationScreen, AddCertificateScreen, AddExperienceScreen, LogoutScreen } from '../scenes/profile';

type EmployeeNavigatorParams = {
    [AppRoute.EMPLOYEE]: undefined; 
    [AppRoute.ADDEMPLOYEE]: undefined; 
      
}

export interface EmployeeScreenProps {
    navigation: CompositeNavigationProp<
    EmployeeTabNavigationProp,
        StackNavigationProp<EmployeeNavigatorParams, AppRoute.EMPLOYEE>
    >;
    route: RouteProp<EmployeeNavigatorParams, AppRoute.EMPLOYEE>;
}

export interface AddEmployeeScreenProps {
    navigation: CompositeNavigationProp<
    EmployeeTabNavigationProp,
        StackNavigationProp<EmployeeNavigatorParams, AppRoute.ADDEMPLOYEE>
    >;
    route: RouteProp<EmployeeNavigatorParams, AppRoute.ADDEMPLOYEE>;
}

const Stack = createStackNavigator<EmployeeNavigatorParams>();

export const EmployeeNavigator = (): React.ReactElement => (
    <Stack.Navigator headerMode='none'>
        <Stack.Screen name={AppRoute.EMPLOYEE} component={EmployeeScreen} />        
         <Stack.Screen name={AppRoute.ADDEMPLOYEE} component={AddEmployeeScreen} />        
        {/*<Stack.Screen name={AppRoute.EDITPROFILE} component={EditProfileScreen} />        
        <Stack.Screen name={AppRoute.ADDACHIVEMENT} component={AddAchivementScreen} />        
        <Stack.Screen name={AppRoute.ADDCERTIFICATE} component={AddCertificateScreen} />        
        <Stack.Screen name={AppRoute.ADDEDUCATION} component={AddEducationScreen} />        
        <Stack.Screen name={AppRoute.ADDEXPERIENCE} component={AddExperienceScreen} />        
        <Stack.Screen name={AppRoute.LOGOUT} component={LogoutScreen} />         */}
    </Stack.Navigator>
);
