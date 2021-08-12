import { Col, Left } from "native-base";
import { StyleSheet, Dimensions } from "react-native";
import { color } from "react-native-reanimated";
import { ScaledSheet } from "react-native-size-matters";
import { Color, Padding } from "../constants/LabelConstants";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export const Styles = ScaledSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: Color.BUTTON_NAME_COLOR
  },

  unavailable_text: {
    fontSize: 33,
    paddingVertical: 35,
    fontFamily: 'Entypo',
    color: Color.COLOR,
    lineHeight: 35,
    marginHorizontal: 20,
    textAlign: 'justify'
  },

  content: {
    backgroundColor: 'transparent',
    padding: 0
  },

  customer_content: {
    backgroundColor: '#fff',
    padding: 5
  },

  center: {
    justifyContent: "center",
    alignItems: "center"
  },

  inputTextView: {
    marginVertical: '5@s',
    marginHorizontal: "5%",
    paddingHorizontal: '10@s',
    paddingVertical: '2@s',
    borderWidth: '1@s',
    borderColor: Color.COLOR,
    borderRadius: '50@s',
    flexDirection: 'row'
  },

  inputText: {
    width: '100%',
    marginVertical: '0@s',
    fontSize: '15@s'
  },

  inputTextWithIcon: {
    marginVertical: '0@s',
    width: '85%',
    fontSize: '15@s'
  },

  inputTextIcon: {
    width: '15%'
  },

  ImgBgTwo: {
    position: 'absolute',
    borderRadius: 55,
    alignSelf: 'center',
    height: 42,
    width: 35,
    transform: [{ scaleX: 2 }],
    backgroundColor: 'black',
    marginTop: 100
  },

  ImgBgOne: {
    height: 30,
    width: 30,
    backgroundColor: 'black',
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 18,
    position: 'absolute'
  },

  /*------------------------------------------------------------STYLE FOR BUTTON------------------------------------------------------------*/

  buttonBox: {
    paddingVertical: '10@s',
    marginVertical: '20@s',
    backgroundColor: Color.COLOR,
    borderRadius: '50@s'
  },

  buttonName: {
    fontSize: '15@s',
    color: Color.BUTTON_NAME_COLOR,
  },

  forgotPassword: {
    color: Color.COLOR,
    fontSize: '15@s',
    fontFamily: "roboto-regular",
    marginTop: '5@s',
    alignSelf: 'center'
  },

  dontHaveAccount: {
    color: Color.COLOR,
    fontSize: '15@s',
    fontFamily: "roboto-regular",
    marginTop: '15@s',
    alignSelf: 'center'
  },


  /*---------------------------------------------This Style is for Log In Image--------------------------------------------------------- */
  loginImage: {
    width: '150@s',
    height: '150@s',
    marginTop: '10@s',
    alignSelf: 'center'
  },

  loginWelcome: {
    marginTop: '5@s',
    fontSize: '25@s',
    color: Color.COLOR,
    fontWeight: "bold",
    marginBottom: '25@s'
  },

  /*---------------------------------------------This Style is for All Item Page--------------------------------------------------------- */
  all_Item_Main_View: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },

  all_Item_List: {
    width: '48%',
    backgroundColor: '#000',
    margin: '1%',
    // height: 1000
  },

  all_Item_Image: {
    height: 150,
    width: '100%',
    borderRadius: 0
  },

  all_Item_Image_1: {
    padding: 15,
    backgroundColor: Color.BUTTON_NAME_COLOR,
    borderColor: Color.COLOR_CUSTOMER,
    borderWidth: 1
  },

  all_Item_Detail: {
    backgroundColor: Color.BUTTON_NAME_COLOR
  },

  product_nav_button_selected: {
    backgroundColor: Color.COLOR,
    padding: '1@s',
    borderRadius: '20@s'
  },

  product_nav_button: {
    backgroundColor: Color.BUTTON_NAME_COLOR,
    padding: '1@s',
    borderRadius: '20@s'
  },

  product_nav_button_selected_text: {
    color: Color.BUTTON_NAME_COLOR,
    paddingVertical: '5@s',
    paddingHorizontal: '10@s',
    fontWeight: 'bold',
    fontSize: '12@s'
  },

  product_nav_button_text: {
    color: Color.COLOR,
    fontSize: '12@s',
    paddingVertical: '5@s',
    fontWeight: 'bold',
    paddingHorizontal: '10@s'
  },

  /*---------------------------------------------This Style is for Blank Space at bottom of Page--------------------------------------------------------- */
  bottomSpace: {
    width: '100%',
    height: 50
  },

  /*---------------------------------------------This Style is for Recharge Page--------------------------------------------------------- */
  reacharge_main: {
    flexWrap: 'wrap',
    padding: '10@s',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  reacharge_box: {
    width: '48%',
    height: '305@s',
    borderColor: Color.SILVER,
    borderWidth: '2@s',
    borderTopStartRadius: '12@s',
    borderTopEndRadius: '12@s',
    borderBottomStartRadius: '5@s',
    borderBottomEndRadius: '5@s',
    marginVertical: '10@s',
  },

  reacharge_head: {
    backgroundColor: 'green',
    borderTopStartRadius: '10@s',
    borderTopEndRadius: '10@s',
    borderBottomStartRadius: '0@s',
    borderBottomEndRadius: '35@s',
    width: '100%',
    height: '150@s',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  recharge_price_icon: {
    color: Color.BUTTON_NAME_COLOR,
  },

  recharge_price_text: {
    color: Color.BUTTON_NAME_COLOR,
    fontSize: '35@s'
  },

  reacharge_text_main: {
    backgroundColor: 'white',
    width: '100%',

  },

  reacharge_text: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10@s'
  },

  recharge_button_box: {
    backgroundColor: '#0099cc',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '6@s',
    borderRadius: '20@s',
    marginVertical: '10@s',
  },

  recharge_button_view: {
    marginHorizontal: '15@s',
  },

  recharge_button_text: {
    color: Color.BUTTON_NAME_COLOR,
    fontSize: '14@s',
  },

  recharge_text_head: {
    color: Color.SILVER,
    fontSize: '16@s',
    fontWeight: 'bold'
  },

  recharge_text_data: {
    color: '#000',
    fontSize: '14@s',
  },

  recharge_offer_input: {
    borderColor: Color.SILVER,
    borderWidth: '1@s',
    width: '90@s',
    paddingVertical: '3@s',
    borderRadius: '4@s'
  },

  recharge_no_offer_input: {
    width: '90@s',
    height: '50@s'
   
  },

  invoice_main_view: {
    padding: '10@s',
    borderRadius: '5@s',
    borderColor: Color.SILVER,
    borderWidth: '1@s',
    marginTop: '10@s'
  },

  invoice_data_main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  invoice_data_head: {
    fontSize: '18@s',
    color: Color.SILVER,
    fontWeight: 'bold'
  },

  invoice_data_text: {
    fontSize: '16@s',
  },

  divider: {
    width: '100%',
    height: '1@s',
    backgroundColor: 'black',
    marginVertical: '10@s'
  },

  withdraw_main: {

  },

  withdraw_balance_box: {
    // flexDirection: 'row',    
    width: '100%',
    // justifyContent: 'space-between',
    paddingHorizontal: '10@s'
  },

  withdraw_text_head: {
    color: Color.SILVER,
    fontSize: '16@s',
    fontWeight: 'bold'
  },

  withdraw_balance_input: {
    borderColor: Color.SILVER,
    borderWidth: '1@s',
    width: '100%',
    fontSize: '18@s',
    marginVertical: '10@s',
    paddingVertical: '4@s',
    borderRadius: '4@s'
  },

  /*---------------------------------------------This Style is for Product Detail--------------------------------------------------------- */
  product_view: {
    width: '100%',
    height: 300,
    // flexWrap: 'wrap'
  },

  product_image: {
    borderRadius: 10,
    flexWrap: 'wrap',
    width: '100%',
    height: '100%'
  },

  product_avatar: {
    height: '100%',
    width: '100%',
    borderRadius: 0
  },

  product_2nd_view: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    borderBottomColor: Color.BORDER,
    borderBottomWidth: 1
  },

  product_2nd_view_1: {
    width: '80%',
    flexDirection: 'row',
  },

  product_2nd_quantity_view: {
    width: '25%',
    marginHorizontal: 5
  },

  product_2nd_wish_view: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 5
  },

  product_2nd_buy_view: {
    width: '20%',
    height: '100%',
    backgroundColor: Color.COLOR,
    borderRadius: 5,
    marginHorizontal: 5
  },

  product_2nd_buy_text: {
    color: Color.BUTTON_NAME_COLOR,
  },

  selected_wish_icon: {
    paddingTop: 10,
    color: Color.COLOR
  },

  wish_icon: {
    paddingTop: 10,
    color: Color.BORDER
  },

  product_3rd_view: {
    padding: 10,
    width: '100%',
    height: 200
  },

  product_3rd_view_1: {
    textAlign: 'left',
  },

  product_description_view: {
    width: '100%',
    borderWidth: 2,
    marginTop: 10,
    borderRadius: 10,
    borderColor: Color.COLOR,
    paddingVertical: 10,
  },
  /*---------------------------------------------This Style is for Cart--------------------------------------------------------- */


  cart_content: {
    backgroundColor: Color.CART_BACKGROUND,
  },

  cart_main_view: {
    borderBottomColor: Color.BORDER,
    borderBottomWidth: 0.5,
    borderTopColor: Color.BORDER,
    borderTopWidth: 0.5,
    paddingVertical: 25,
    backgroundColor: Color.BUTTON_NAME_COLOR
  },

  cart_view_1: {
    width: '100%',
    paddingBottom: 20,
    flexDirection: 'row',
  },

  cart_view_1_1: {
    width: '30%',
    height: 100,
  },

  cart_avatar_view: {
    width: '100%',
    height: '100%'
  },

  cart_avatar: {
    borderRadius: 0,
    width: 100,
    height: 120,
  },

  cart_view_1_2: {
    width: '70%',
    height: 110,
    paddingHorizontal: 10,
  },

  cart_name_text: {
    fontSize: 17,
    fontWeight: '700'
  },

  cart_price_view: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },

  price_text: {
    fontSize: 19,
    fontWeight: 'bold'
  },

  offer_price_text: {
    fontSize: 14,
    marginHorizontal: 20,
    textDecorationLine: 'line-through'
  },

  // cart_quantity_view: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between'
  // },

  cart_quantity_text_view: {

  },

  cart_quantity_text: {
    paddingVertical: 5,
    paddingHorizontal: 10
  },

  cart_button: {
    backgroundColor: Color.COLOR,
    borderRadius: 3
  },

  cart_button_text: {
    paddingVertical: 7,
    paddingHorizontal: 5,
    color: Color.BUTTON_NAME_COLOR
  },

  cart_offer_text: {
    color: Color.COLOR,
    fontWeight: 'bold',
    fontSize: 17
  },

  cart_shopping_view: {
    flexDirection: 'row',
    borderColor: Color.BORDER,
    backgroundColor: Color.BUTTON_NAME_COLOR,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    paddingVertical: 20,
    marginTop: 5,
    justifyContent: 'space-between',
    paddingHorizontal: Padding.HORIZONTAL_PADDING
  },

  cart_shopping_text: {
    fontSize: 20
  },

  price_detail_1: {
    backgroundColor: Color.BUTTON_NAME_COLOR,
    marginVertical: 15,
    paddingTop: 20,
    borderTopColor: Color.BORDER,
    borderTopWidth: 0.5
  },

  cart_price_detail_1_text: {
    fontSize: 20,
    paddingHorizontal: Padding.HORIZONTAL_PADDING,
    color: Color.SILVER,
    fontWeight: '700'
  },

  price_detail_2: {
    paddingVertical: 15,
    paddingHorizontal: Padding.HORIZONTAL_PADDING,
    marginTop: 20,
    borderColor: Color.BORDER,
    borderTopWidth: 1,
    borderBottomWidth: 1
  },

  price_detail_2_1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5
  },

  cart_price_text_head: {
    fontWeight: '600',
    fontSize: 18
  },

  cart_price_text_data: {
    fontWeight: '600',
    fontSize: 18,
    color: Color.COLOR,
  },

  cart_total_view: {
    paddingHorizontal: Padding.HORIZONTAL_PADDING,
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  cart_total_text_head: {
    fontSize: 18,
    fontWeight: 'bold'
  },

  cart_bottom_box_view: {
    flexDirection: 'row',
    paddingHorizontal: Padding.HORIZONTAL_PADDING,
    paddingVertical: 10,
    justifyContent: 'space-between'
  },

  cart_bottom_box_price_text: {
    fontSize: 25,
    paddingTop: 5,
    fontWeight: 'bold',
    marginBottom: 5
  },

  cart_bottom_box_button: {
    borderRadius: 5,
    backgroundColor: Color.COLOR,
  },

  cart_bottom_box_button_text: {
    color: Color.BUTTON_NAME_COLOR,
    fontSize: 20,
    paddingVertical: 15,
    paddingHorizontal: '10%'
  },

  /*---------------------------------------------This Style is for Address Of Customer--------------------------------------------------------- */


  address_container: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: Color.SILVER,
    width: '100%',
    padding: 10,
  },

  address_text: {
    fontSize: 16,

  },

  address_edit_pen: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },


  address_main: {
    flexDirection: 'row',
  },

  modal: {
    justifyContent: 'flex-start',
    backgroundColor: "#fafafa",
    height: '90%',
    width: '90%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fafafa',
    marginTop: 10,
    padding: 10
  },

  modalHeader: {
    height: 20,
    alignItems: 'flex-end'
  },

  /*---------------------------------------------This Style is for order Of Customer--------------------------------------------------------- */


  order_main: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: Color.SILVER,
    marginVertical: 5,
    paddingBottom: 10
  },

  order_bar_main_1: {
    // backgroundColor: 'red',
    width: '10%'
  },

  order_bar_ordered1: {
    backgroundColor: 'green',
    width: 15,
    height: 15,
    borderRadius: 8
  },

  order_bar_ordered2: {
    backgroundColor: 'green',
    width: 3,
    height: 30,
  },

  order_bar_ordered3: {
    backgroundColor: Color.STATUS_BAR,
    width: 3,
    height: 30,
  },

  order_bar_accepted1: {
    backgroundColor: Color.STATUS_BAR,
    width: 15,
    height: 15,
    borderRadius: 8
  },

  order_bar_accepted2: {
    backgroundColor: Color.STATUS_BAR,
    width: 3,
    height: 30,
  },

  order_bar_accepted3: {
    backgroundColor: Color.STATUS_BAR,
    width: 3,
    height: 30,
  },

  order_bar_packed1: {
    backgroundColor: Color.STATUS_BAR,
    width: 15,
    height: 15,
    borderRadius: 8
  },

  order_bar_packed2: {
    backgroundColor: Color.STATUS_BAR,
    width: 3,
    height: 30,
  },

  order_bar_packed3: {
    backgroundColor: Color.STATUS_BAR,
    width: 3,
    height: 30,
  },

  order_bar_shipped1: {
    backgroundColor: Color.STATUS_BAR,
    width: 15,
    height: 15,
    borderRadius: 8
  },

  order_bar_shipped2: {
    backgroundColor: Color.STATUS_BAR,
    width: 3,
    height: 30,
  },

  order_bar_shipped3: {
    backgroundColor: Color.STATUS_BAR,
    width: 3,
    height: 30,
  },

  order_bar_delevered1: {
    backgroundColor: Color.STATUS_BAR,
    width: 15,
    height: 15,
    borderRadius: 8
  },

  order_bar_ordered_text_box: {
    height: 74
  },

  order_bar_ordered_text: {
    fontWeight: 'bold',
    fontSize: 16
  },

  order_bar_main_2: {
    // backgroundColor: 'green',
    height: 100,
    width: '90%'
  },

  order_cart: {
    height: 100,
    width: 100,
  },

  order_text: {
    alignContent: 'center',
    fontSize: 20,
    padding: 5
  },

  order_row: {
    flexDirection: 'row',
    padding: 5
  },

  order_column: {
    flexDirection: 'column',
    padding: 5
  },





  /*---------------------------------------------This Style is for order Of Customer--------------------------------------------------------- */

  notification_main: {
    borderWidth: 1,
    borderColor: 'silver',
    backgroundColor: '#0099cc',
    borderRadius: 5,
  },

  notification_text: {
    padding: 10,
    color: 'white',
  },



  /*---------------------------------------------This Style is for  Contact_us Page--------------------------------------------------------- */

  contact_main: {
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#0099cc',
    borderRadius: 5,
  },

  contact_text: {
    fontSize: 15,
    padding: 3,
  },

  about_main: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  about_text: {
    fontSize: 22,
    fontFamily: 'Orbitron-ExtraBold'
  },

  about_us: {
    fontSize: 20,
    fontFamily: 'Orbitron-ExtraBold'
  },

  about_proprety: {
    margin: 10,
  },

  about_contact: {
    fontSize: 20,
    fontFamily: 'Orbitron-ExtraBold'
  },

  about_conta: {
    backgroundColor: '#efefef',
    height: 200,
    margin: 10,
    padding: 10,
    borderRadius: 5
  },

  about_content: {
    textAlign: 'justify',
    fontSize: 18,
    fontFamily: 'Entypo'
  },


  /*---------------------------------------------This Style is for BillBook--------------------------------------------------------- */

  bill_main: {
    borderWidth: 1,
    flex: 1,
    justifyContent: 'space-between'
  },

  bill_row: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#0099cc',
  },

  bill_row_1: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#ccf2ff'
  },

  bill_row_2: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#99ccff',
  },



  bill_column_1: {
    width: '10%',
    borderWidth: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10
  },

  bill_column_2: {
    width: '20%',
    borderWidth: 0.2,
    alignItems: 'center',
    justifyContent: 'center'
  },

  bill_column_3: {
    width: '40%',
    borderWidth: 0.2,
    alignItems: 'center',
    justifyContent: 'center'
  },

  bill_column_4: {
    width: '15%',
    borderWidth: 0.2,
    alignItems: 'center',
    justifyContent: 'center'
  },

  Cu_wallet_column_4: {
    width: '30%',
    borderWidth: 0.2,
    alignItems: 'center',
    justifyContent: 'center'
  },

  bill_column_5: {
    width: '15%',
    borderWidth: 0.2,
    alignItems: 'center',
    justifyContent: 'center'
  },

  // bill_column_6: {
  //   width: '15%',

  // },


  text_design: {
    fontSize: 14,
    padding: 0,
    alignSelf: 'center',
    color: '#000000'
  },
  text_design_red: {
    fontSize: 14,
    padding: 2,
    alignSelf: 'center',
    color: '#ff3333'
  },
  text_design_green: {
    fontSize: 14,
    padding: 2,
    alignSelf: 'center',
    color: '#00ff99'
  },



  bill_box: {
    width: '100%',
    borderColor: 'black',
    borderWidth: '0.2@s',
    alignItems: "center",
  },

  head_design: {
    fontSize: '16@s',
    fontWeight: 'bold',
    padding: '2@s',
    alignSelf: 'center',
    color: 'white'
  },


  bill_bottom_text: {
    textAlign: 'right',
    padding: '2@s',
    width: '50%',
    color: 'white',
    fontSize: '16@s',
  },

  bill_amount: {
    textAlign: 'center',
    padding: '2@s',
    width: '20%',
    color: 'white',
    fontSize: '16@s',
  },

  bill_paid: {
    textAlign: 'center',
    padding: 2,
    width: '15%',
    color: 'white',
    fontSize: 16,
  },

  bill_due: {
    textAlign: 'center',
    padding: 2,
    width: '15%',
    color: 'white',
    fontSize: 16,
  },



  /*---------------------------------------------This Style is for shopkeeper profile--------------------------------------------------------- */

  bank_row: {
    flexDirection: 'row',
    paddingVertical: 0
  },

  bank_text: {
    color: Color.SILVER,
    paddingVertical: 0,
    width: '50%'
  },

  /*---------------------------------------------This Style is for Wallet--------------------------------------------------------- */



  wallet_main: {
    borderWidth: 1,
    backgroundColor: '#0099cc',
  },

  wallet_row: {
    flexDirection: 'row',
    width: '100%'
  },

  wallet_row_1: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#00aacc'
  },

  wallet_row_2: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'green'
  },



  wallet_column_1: {
    width: '10%',
    padding: 4,
  },

  wallet_column_2: {
    width: '22%',
    paddingLeft: 2,
    paddingRight: 2,
    paddingTop: 4,

  },

  wallet_column_3: {
    width: '32%',
    padding: 4,
  },

  wallet_column_4: {
    width: '18%',
    padding: 4,
  },

  wallet_column_5: {
    width: '18%',
    padding: 4,
  },


  wallet_design: {
    fontSize: 14,
    padding: 2,
    alignSelf: 'center',
    color: 'white'
  },

  wallet_design1: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 2,
    alignSelf: 'center',
    color: 'white'
  },


  wallet_bottom_text: {
    textAlign: 'right',
    padding: 2,
    width: '64%',
    color: 'white',
    fontSize: 16,
  },


  wallet_paid: {
    textAlign: 'center',
    padding: 2,
    width: '18%',
    color: 'white',
    fontSize: 16,
  },

  wallet_due: {
    textAlign: 'center',
    padding: 2,
    width: '18%',
    color: 'white',
    fontSize: 16,
  },




  /*---------------------------------------------This Style is for Shop Order--------------------------------------------------------- */

  shop_order_main: {


  },

  cart_view: {
    width: '100%',
    flexDirection: 'row',
    padding: 2,
    paddingVertical: 5,
    backgroundColor: Color.COLOR,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    flexWrap: 'wrap',
  },

  cart_sl_view: {
    backgroundColor: Color.COLOR,
    width: '15%',
  },

  cart_sl_text: {
    color: Color.BUTTON_NAME_COLOR,
    fontSize: 15,
    fontWeight: 'bold'
  },

  cart_name_view: {
    backgroundColor: Color.COLOR,
    width: '25%',
  },

  cart_quantity_view: {
    flexDirection: 'row',
    backgroundColor: Color.COLOR,
    width: '45%',
    justifyContent: 'space-between',
    padding: 5,
    borderRadius: 5
  },

  cart_amount_view: {
    backgroundColor: Color.COLOR,
    width: '23%',
  },

  cart_cancle_view: {
    backgroundColor: Color.COLOR,
    width: '7%',
  },

  /*-------------------------------------------------ATENDANCE----------------------------------------- */
  attendance_view: {
    width: '100%',
    flexDirection: 'row',
    padding: 2,
    paddingVertical: 5,
    backgroundColor: Color.COLOR,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },

  attendance_header: {
    width: '100%',
  },

  attendance_header_text: {
    color: Color.BUTTON_NAME_COLOR,
    fontSize: 25,
    paddingTop: 12
  },

  week_views: {
    width: '14%',
    borderWidth: 0.6,
    paddingVertical: 5,
    backgroundColor: Color.BUTTON_NAME_COLOR,
    borderColor: Color.SILVER
  },

  week_views_text: {
    color: Color.COLOR,
    fontSize: 18
  },

  a_text: {
    color: 'red',
    fontSize: 20
  },

  p_text: {
    color: Color.COLOR,
    fontSize: 20
  },

  /* ----------Odd Row Data----------- */
  cart_data_view: {
    width: '100%',
    flexDirection: 'row',
    padding: 2,
    paddingVertical: 8,
    backgroundColor: Color.CART_LIST_ODD
  },

  cart_sl_data_view: {
    backgroundColor: Color.CART_LIST_ODD,
    width: '10%',
    alignItems: 'flex-end',
    paddingRight: 5
  },

  cart_sl_data_text: {
    color: Color.BUTTON_NAME_COLOR,
    fontSize: 15,
  },

  cart_name_data_view: {
    flexWrap: 'wrap',
    backgroundColor: Color.CART_LIST_ODD,
    width: '30%',
  },

  cart_quantity_data_view: {
    backgroundColor: Color.CART_LIST_ODD,
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    alignItems: 'center'
  },

  cart_amount_data_view: {
    backgroundColor: Color.CART_LIST_ODD,
    width: '23%',
    paddingRight: 10,
    alignItems: 'flex-end',
  },

  cart_cancle_data_view: {
    backgroundColor: Color.CART_LIST_ODD,
    width: '7%',
  },

  /* ----------Even Row Data----------- */
  cart_data_view_even: {
    width: '100%',
    flexDirection: 'row',
    padding: 2,
    paddingVertical: 8,
    backgroundColor: Color.CART_LIST_EVEN
  },

  cart_sl_data_view_even: {
    backgroundColor: Color.CART_LIST_EVEN,
    width: '10%',
    alignItems: 'flex-end',
    paddingRight: 5
  },

  cart_sl_data_text_even: {
    color: Color.BUTTON_NAME_COLOR,
    fontSize: 15,
    // fontWeight: 'bold'
  },

  cart_name_data_view_even: {
    flexWrap: 'wrap',
    backgroundColor: Color.CART_LIST_EVEN,
    width: '30%',
  },

  cart_quantity_data_view_even: {
    backgroundColor: Color.CART_LIST_EVEN,
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    alignItems: 'center'
  },

  cart_amount_data_view_even: {
    backgroundColor: Color.CART_LIST_EVEN,
    width: '23%',
    paddingRight: 10,
    alignItems: 'flex-end',
  },

  cart_cancle_data_view_even: {
    backgroundColor: Color.CART_LIST_EVEN,
    width: '7%',
  },

  /*---------------------------------------------This Style is for Item Category List--------------------------------------------------------- */
  itemCategoryName: {
    width: '60%',
    padding: 5,
    justifyContent: 'center'
  },

  itemCategoryText: {
    color: Color.COLOR,
    fontSize: 20
  },

  itemCategoryEdit: {
    width: '10%',
  },

  itemCategoryEditIcon: {
    color: Color.COLOR,
    paddingVertical: 10
  },

  modalView: {
    margin: 20,
    width: '95%',
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

  /*---------------------------------------------This Style is for Customer List--------------------------------------------------------- */
  customer_list: {
    backgroundColor: Color.BUTTON_NAME_COLOR,
    flexDirection: 'row'
  },

  image: {
    width: 50,
    borderRadius: 100,
    height: 50
  },

  customer_list_image: {
    margin: 10,
    width: '15%',
  },

  list_name: {
    width: '80%',
    paddingHorizontal: 5
  },

  list_price: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingBottom: 10,
  },

  customer_list_name_text: {
    color: Color.COLOR,
    marginTop: 2,
    fontSize: 25,
    paddingTop: 10
  },

  customer_list_price_text: {
    color: Color.COLOR_CUSTOMER,
    fontSize: 15,
  },

  /*---------------------------------------------This Style is for Add Product Image--------------------------------------------------------- */
  image_view: {
    // width: '100%',
    backgroundColor: Color.BUTTON_NAME_COLOR,
    paddingVertical: 10
  },

  /*---------------------------------------------This Style is for Customer Detail--------------------------------------------------------- */
  profile: {
    width: '100%',
    backgroundColor: Color.BUTTON_NAME_COLOR,
    paddingVertical: 10
  },

  categoryImage: {
    height: 100,
    width: 100,
    backgroundColor: '#D8D8D899',
    borderRadius: 80,
    alignSelf: 'center',
    marginTop: 5
  },

  profile_image: {
    backgroundColor: '#aaa',
    borderRadius: 200,
    borderWidth: 2,
    borderColor: Color.COLOR
  },

  profile_avatar: {
    height: 100,
    width: 100,
    borderRadius: 200
  },

  user_detail: {
    marginVertical: 5
  },

  user_detail_header: {
    padding: 5
  },

  user_detail_header_text: {
    color: Color.COLOR,
    fontSize: 18
  },

  user_detail_data: {
    borderColor: Color.COLOR,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },

  user_detail_data_text: {
    color: Color.COLOR_CUSTOMER,
    fontSize: 20
  },

  cash_pay_input: {
    paddingVertical: 0,
    color: Color.COLOR_CUSTOMER
  },

  /*---------------------------------------------This Style is for Text Input Box--------------------------------------------------------- */
  inputBoxContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    paddingLeft: 16,
    borderColor: "#D9D5DC",
    borderBottomWidth: 1
  },

  inputBoxLabel: {
    color: "#000",
    alignSelf: "flex-start",
    opacity: 0.5,
    paddingTop: 16,
    paddingBottom: 8,
    fontSize: 16,
    fontFamily: "roboto-regular",
    lineHeight: 16
  },

  inputBoxStyle: {
    flex: 1,
    color: "#000",
    alignSelf: "stretch",
    paddingTop: 14,
    paddingRight: 5,
    paddingBottom: 8,
    paddingLeft: 30,
    fontSize: 16,
    fontFamily: "roboto-regular",
    lineHeight: 16
  },

  /*---------------------------------------------This Style is for Button--------------------------------------------------------- */
  buttonContainer: {
    backgroundColor: "#3F51B5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 16,
    paddingLeft: 16,
    elevation: 2,
    minWidth: 88,
    borderRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 5
  },
  buttonCaption: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "roboto-regular"
  },
  /*---------------------------------------------This Style is for Text Input Box--------------------------------------------------------- */
  validity: {
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor: '#0099cc',
    padding: 10,

  },

  validity_text: {
    alignSelf: 'center',
    fontSize: 15,
    color: 'white',
  },

  validity_button: {
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor: '#0099cc',
    padding: 10,
    alignSelf: 'center',
    marginTop: '20%',
  },
  /*---------------------------------------------This Style is for Search Box-------------------------------------------------------------- */


  daily_message_text_view: {
    borderColor: Color.COLOR,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingLeft: 5,
    // height: 200,
    // alignItems: 'flex-start',
  },

  daily_message_input: {
    paddingVertical: 0,
    backgroundColor: 'red'
  },


  daily_message_button: {
    borderWidth: 0.5,
    borderRadius: 10,
    paddingVertical: 0,
    backgroundColor: '#0099cc',
    marginTop: 40,
    width: '40%',
    marginHorizontal: 5,
  },


  daily_message_text: {
    // textAlign: 'center',
    padding: 10,
    color: 'white',
    fontSize: 15
  },



  daily_message_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  /*---------------------------------------------This Style is for Payment-------------------------------------------------------------- */
  payment_box_view: {
    width: '90%',
    borderColor: Color.SILVER,
    borderRadius: 3,
    borderWidth: .5,
    padding: 20,
    paddingLeft: 20,
    marginVertical: 15
  },

  payment_selection_view: {
    flexDirection: 'row',
    width: '100%'
  },

  payment_selection_header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },

  payment_selection_text: {
    marginLeft: 10,
    fontSize: 18,
    // fontWeight: '700'
  },

  /*---------------------------------------------This Style is for Search Box-------------------------------------------------------------- */
  searchBox: {
    flexDirection: 'row',
    borderColor: 'rgba(2,15,20,0.05)',
    borderWidth: 5,
    borderRadius: 5,
    // paddingVertical: 10,
    backgroundColor: '#fff',
    height: 50
  },

  searchIcon: {
    width: '100%',
    color: '#aaa',
    alignSelf: 'center',
    textAlign: 'center',
  },

  searchInput: {
    width: '90%',
    backgroundColor: '#fff',
    // height: '100%',
    borderRadius: 5,
  },

  user_drop_data: {
    borderColor: Color.COLOR,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 0,
    paddingRight: 5,

  },

  user_drop_box: {
    borderColor: Color.COLOR,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,

  },

  user_addproduct_header: {
    padding: 5,
    flexDirection: 'row'
  },

  user_add_Product_header_text: {
    color: Color.COLOR,
    fontSize: 18,
    padding: 5
  },


  contact_milaan: {
    borderWidth: 1,
    borderColor: 'silver',
    backgroundColor: '#0099cc',
    borderRadius: 5,
  },

  /*---------------------------------------------This Style is for Wallet Screen-------------------------------------------------------------- */

  about_him: {
    backgroundColor: '#D8D8D899',
    height: 80
  },

})
