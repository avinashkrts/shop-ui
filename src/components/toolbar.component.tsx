import React from 'react';
import { ImageProps } from 'react-native';
import {
  OverflowMenu,
  OverflowMenuItemType,
  StyleType,
  TopNavigation,
  TopNavigationAction,
  TopNavigationActionElement,
  TopNavigationProps,
} from 'react-native-ui-kitten';
import {
  BackIcon,
  MenuIcon,
  MoreVerticalIcon,
} from '../assets/icons';

export type ToolbarMenu = OverflowMenuItemType[];

export interface ToolbarProps extends TopNavigationProps {
  menu?: ToolbarMenu;
  backIcon?: (style: StyleType) => React.ReactElement<ImageProps>;
  menuIcon?: (style: StyleType) => React.ReactElement<ImageProps>;
  onMenuItemSelect?: (index: number) => void;
  onBackPress?: () => void;
  onRightPress?: () => void; 
}

export const Toolbar = (props: ToolbarProps): TopNavigationActionElement => {

  const { menu, backIcon, menuIcon, onMenuItemSelect, onBackPress, onRightPress, ...topNavigationProps } = props;
  const [menuVisible, setMenuVisible] = React.useState(false);

  const onMenuSelect = (index: number) => {
    setMenuVisible(false);
    onMenuItemSelect && onMenuItemSelect(index);
  };

  const onMenuActionPress = () => {
    setMenuVisible(!menuVisible);
  };

  // const renderMenuAction = (menu: OverflowMenuItemType[]): TopNavigationActionElement => (
  //   <OverflowMenu
  //     visible={menuVisible}
  //     data={menu}
  //     placement='bottom end'
  //     onSelect={onMenuSelect}
  //     onBackdropPress={onMenuActionPress}>
  //     <TopNavigationAction
  //       icon={props.menuIcon || MoreVerticalIcon}
  //       onPress={onMenuActionPress}
  //     />
  //   </OverflowMenu>
  // );

  const renderBackAction = (): TopNavigationActionElement => (
    <TopNavigationAction
      icon={props.backIcon || BackIcon}
      onPress={onBackPress}
    />
  );

  const renderMenuAction = (): TopNavigationActionElement => (
    <TopNavigationAction
      icon={props.menuIcon || MenuIcon}
      onPress={onRightPress}
    />
  );

  return (
    <React.Fragment>
      <TopNavigation
        {...topNavigationProps}
        alignment='center'
        leftControl={onBackPress && renderBackAction()}
        rightControls={onRightPress && renderMenuAction()}
      />
    </React.Fragment>
  );
};
