import React from 'react';
import {
  Icon,
  IconElement,
} from 'react-native-ui-kitten';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Color } from '../constants/LabelConstants';


export const PeopleIcon = (style): AntDesign => (
  <SimpleLineIcons size={20} name='people' />
);

export const EditIcon = (style): AntDesign => (
  <MaterialIcons size={25} name='edit' />
);

export const PlusCircle = (style): AntDesign => (
  <AntDesign size={22} color={Color.COLOR} name='pluscircleo' />
);

export const SearchIcon = (style): AntDesign => (
  <MaterialCommunityIcons size={20} name='magnify' />
);

export const CancelIcon = (style): AntDesign => (
  <MaterialCommunityIcons style={style} name='close' />
);

export const NotificationIcon = (style): AntDesign => (
  <MaterialCommunityIcons size={20} color={'silver'} name='bell' />
);

export const CameraIcon = (style): AntDesign => (
  <Entypo size={22} name='camera' />
);

export const WishIcon = (style): AntDesign => (
  <Entypo size={30} name='heart' />
);

export const MinusIcon = (style): AntDesign => (
  <AntDesign size={20} name='minus' />
);

export const AddIcon = (style): AntDesign => (
  <AntDesign size={20} name='plus' />
);

export const RupeeIcon = (style): AntDesign => (
  <FontAwesome style={style} name='rupee' />
);

export const EyeIcon = (style): AntDesign => (
  <Feather size={22} name='eye' />
);

export const EyeOffIcon = (style): AntDesign => (
  <Feather size={22} name='eye-off' />
);

export const RightArrowIcon = (style, app): AntDesign => (
  <AntDesign style={style} name='right' />
);

export const PayNowIcon = (style): AntDesign => (
  <MaterialIcons size={20} color={'silver'} name='payment' />
);

export const WalletIcon = (style): AntDesign => (
  <Fontisto size={18} color={'silver'} name='wallet' />
);

export const AddCustomerIcon = (style): AntDesign => (
  <MaterialIcons size={20} color={'silver'} name='person-add' />
);

export const AddEmployeeIcon = (style): AntDesign => (
  <MaterialIcons size={20} color={'silver'} name='person-add' />
);

export const MyOrderIcon = (style): AntDesign => (
  <Entypo size={20} color={'silver'} name='archive' />
);

export const ValidityIcon = (style): AntDesign => (
  <MaterialIcons size={20} color={'silver'} name='timer' />
);

export const AddProductIcon = (style): AntDesign => (
  <Fontisto size={15} color={'silver'} name='shopping-basket-add' />
);

export const HelpIcon = (style): AntDesign => (
  <MaterialIcons size={22} color={'silver'} name='call' />
);

export const CustomerListIcon = (style): AntDesign => (
  <FontAwesome size={20} color={'silver'} name='list-ul' />
);

export const StockListIcon = (style): AntDesign => (
  <FontAwesome5 size={18} color={'silver'} name='cart-plus' />
);


export const OutOfStockIcon = (style): AntDesign => (
  <Fontisto size={16} color={'silver'} name='shopping-basket-remove' />
);


export const OfferIcon = (style): AntDesign => (
  <MaterialCommunityIcons size={16} color={'silver'} name='offer' />
);

export const DailyMessageIcon = (style): AntDesign => (
  <Entypo size={16} color={'silver'} name='message' />
);

export const CartIcon = (style): AntDesign => (
  <MaterialIcons size={24} color={'#0099CC'} name='shopping-cart' />
);


export const ProfileIcon = (style): IconElement => (
  <Icon {...style} name='person-outline' />
);

export const AddressIcon = (style): AntDesign => (
  <FontAwesome5 size={20} color={'silver'} name='address-book' />
);

export const CartNavIcon = (style): AntDesign => (
  <MaterialIcons size={24} color={'silver'} name='shopping-cart' />
);

export const AddressEditIcon = (style): AntDesign => (
  <FontAwesome5 style={style} color={'silver'} name='pen' />
);

export const PencilIcon = (style): AntDesign => (
  <Entypo style={style} color="rgba(128,128,128,1)" name='pencil' />
);

export const BulletIcon = (style): AntDesign => (
  <Entypo style={style} color="rgba(128,128,128,1)" name='dot-single' />
);











//old icons

export const PublicIcon = (style): AntDesign => (
  <MaterialIcons size={15} color="rgba(128,128,128,1)" name='public' />
);



export const CheckCircleIcon = (style): AntDesign => (
  <AntDesign size={13} color={'#1DA1F2'} name='checkcircle' />
);


export const ExperienceIcon = (style): AntDesign => (
  <Entypo size={15} color="rgba(128,128,128,1)" name='suitcase' />
);

export const LocationIcon = (style): AntDesign => (
  <Entypo size={15} color="rgba(128,128,128,1)" name='location' />
);



export const LogOutIcon = (style): AntDesign => (
  <Entypo size={18} color={'#1DA1F2'} name='log-out' />
);

export const FeedbackIcon = (style): AntDesign => (
  <MaterialIcons size={18} color={'#1DA1F2'} name='feedback' />
);

export const ArroCircle = (style): AntDesign => (
  <FontAwesome5 size={20} color={'#1DA1F2'} name='arrow-circle-right' />
);





export const ArrowUpIcon = (style): AntDesign => (
  <AntDesign size={12} name='arrowup' />
);

export const BagIcon = (style): AntDesign => (
  <MaterialCommunityIcons size={20} name='wallet-travel' />
);

export const CompanyIcon = (style): AntDesign => (
  <MaterialCommunityIcons size={20} name='office-building' />
);


export const HomeIcon = (style): IconElement => (
  <Icon {...style} name='home-outline' />
);

export const CandidateIcon = (style): IconElement => (
  <Icon {...style} name='message-circle-outline' />
);

export const PostJobIcon = (style): IconElement => (
  <Icon {...style} name='plus-circle-outline' />
);


export const StockIcon = (style): IconElement => (
  <Icon {...style} name='archive-outline' />
);


















export const BackIcon = (style): IconElement => (
  <Icon {...style} name='arrow-back' />
);

export const LayoutIcon = (style): IconElement => (
  <Icon {...style} name='person' />
);

export const PersonIcon = (style): Foundation => (
  <Foundation size={20} color={'silver'} name='torso' />
);

export const MoreVerticalIcon = (style): IconElement => (
  <Icon {...style} name='more-vertical' />
);

export const ArrowDownward = (style): IconElement => (
  <Icon {...style} name='arrow-ios-downward-outline' />
);

export const ArrowUpward = (style): IconElement => (
  <Icon {...style} name='arrow-ios-upward-outline' />
);

export const LogoutIcon = (style): IconElement => (
  <Icon {...style} name='log-out-outline' />
);

export const InfoIcon = (style): AntDesign => (
  <AntDesign size={18} color={'silver'} name='infocirlceo' />
);

export const AlertTriangleIcon = (style): IconElement => (
  <Icon {...style} name='alert-triangle-outline' />
);

// export const EyeIcon = (style): IconElement => (
//   <Icon height = {23} width = {23} name='eye-outline' />
// );

// export const EyeOffIcon = (style): IconElement => (
//   <Icon height = {23} width = {23} name='eye-off-outline' />
// );

export const MenuIcon = (style): IconElement => (
  <Icon {...style} name='menu-outline' />
);

export const CustomerIcon = (style): IconElement => (
  <Icon {...style} name='people-outline' />
);

// export const HomeIcon = (style): Octicons => (
//   <Octicons size={18} color={'#808080'} name='home' />
// );

export const DoneIcon = (style): IconElement => (
  <Icon {...style} name='checkmark-outline' />
);

export const DoneAllIcon = (style): IconElement => (
  <Icon {...style} name='done-all-outline' />
);

export const GridIcon = (style): IconElement => (
  <Icon {...style} name='grid-outline' />
);

// export const SearchIcon = (style): IconElement => (
//   <Icon {...style} name='search-outline' />
// );

export const PlusIcon = (style): IconElement => (
  <Icon {...style} name='plus-outline' />
);

export const BellIcon = (style): IconElement => (
  <Icon {...style} name='bell-outline' />
);

// export const WalletIcon = (style): AntDesign => (
//   <AntDesign size={16} color={'silver'} name='wallet' />
// );

export const AccountsIcon = (style): Foundation => (
  <Foundation size={20} color={'silver'} name='torso-business' />
);

export const ChangePasswordIcon = (style): Entypo => (
  <Entypo size={16} color={'silver'} name='key' />
);

export const TransactionHistoryIcon = (style): MaterialCommunityIcons => (
  <MaterialCommunityIcons size={16} color={'silver'} name='history' />
);






