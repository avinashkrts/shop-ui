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
import { EmployeeScreen } from '../scenes/shopkeeper/Employee/employee.component';
// import { ProfileScreen, EditProfileScreen, ResumeScreen, AddAchivementScreen, AddEducationScreen, AddCertificateScreen, AddExperienceScreen, LogoutScreen } from '../scenes/profile';

type EmployeeNavigatorParams = {
    [AppRoute.EMPLOYEE]: undefined; 
      
}

export interface EmployeeScreenProps {
    navigation: CompositeNavigationProp<
    EmployeeTabNavigationProp,
        StackNavigationProp<EmployeeNavigatorParams, AppRoute.EMPLOYEE>
    >;
    route: RouteProp<EmployeeNavigatorParams, AppRoute.EMPLOYEE>;
}

const Stack = createStackNavigator<EmployeeNavigatorParams>();

export const EmployeeNavigator = (): React.ReactElement => (
    <Stack.Navigator headerMode='none'>
        <Stack.Screen name={AppRoute.EMPLOYEE} component={EmployeeScreen} />        
        {/* <Stack.Screen name={AppRoute.PROFILE} component={ProfileScreen} />        
        <Stack.Screen name={AppRoute.EDITPROFILE} component={EditProfileScreen} />        
        <Stack.Screen name={AppRoute.ADDACHIVEMENT} component={AddAchivementScreen} />        
        <Stack.Screen name={AppRoute.ADDCERTIFICATE} component={AddCertificateScreen} />        
        <Stack.Screen name={AppRoute.ADDEDUCATION} component={AddEducationScreen} />        
        <Stack.Screen name={AppRoute.ADDEXPERIENCE} component={AddExperienceScreen} />        
        <Stack.Screen name={AppRoute.LOGOUT} component={LogoutScreen} />         */}
    </Stack.Navigator>
);
