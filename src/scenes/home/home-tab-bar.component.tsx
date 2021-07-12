import React from 'react';
import {
  BottomNavigation,
  BottomNavigationTab,
  BottomNavigationTabElement,
  Divider,
} from 'react-native-ui-kitten';
import { BottomHomeScreenProps } from '../../navigation/home.navigator';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';
import { StackActions } from '@react-navigation/native';

export const HomeTabBar = (props: BottomHomeScreenProps): SafeAreaLayoutElement => {
  const onSelect = (index: number): void => {
    console.log('Tab Data',index, props.state)
    const selectedTabRoute: string = props.state.routeNames[index];
    const pushAction = StackActions.push(selectedTabRoute);
    props.navigation.navigate(selectedTabRoute);
    switch(index) {
      case 0: props.navigation.dispatch(pushAction);
      break;
    }
  };

  const createNavigationTabForRoute = (route): BottomNavigationTabElement => {
    const { options } = props.descriptors[route.key];
    return (
      <BottomNavigationTab
        key={route.key}
        title={options.title}
        icon={options.tabBarIcon}
      />
    );
  };

  return (
    <SafeAreaLayout insets={SaveAreaInset.BOTTOM}>
      <Divider/>
      <BottomNavigation
        appearance='noIndicator'
        selectedIndex={props.state.index}
        onSelect={onSelect}>
        {props.state.routes.map(createNavigationTabForRoute)}
      </BottomNavigation>
    </SafeAreaLayout>
  );
};
