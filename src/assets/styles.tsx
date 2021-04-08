import { Col } from "native-base";
import { StyleSheet, Dimensions } from "react-native";
import { color } from "react-native-reanimated";
import { Color, Padding } from "../constants/LabelConstants";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export const Styles = StyleSheet.create({

  safeArea: {
    flex: 1
  },

  content: {
    backgroundColor: 'transparent',
    padding: 10
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
    marginVertical: 10,
    marginHorizontal: "10%",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: Color.COLOR,
    borderRadius: 50,
    flexDirection: 'row'
  },

  inputText: {
    width: '100%',
    marginVertical: -8
  },

  inputTextWithIcon: {
    marginVertical: -8,
    width: '85%'
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
    backgroundColor: 'white',
    marginTop: 50
  },

  ImgBgOne: {
    height: 30,
    width: 30,
    backgroundColor: 'white',
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 18,
    position: 'absolute'
  },

  /*------------------------------------------------------------STYLE FOR BUTTON------------------------------------------------------------*/

  buttonBox: {
    paddingVertical: 10,
    marginVertical: 20,
    backgroundColor: Color.COLOR,
    borderRadius: 50
  },

  buttonName: {
    fontSize: 20,
    color: Color.BUTTON_NAME_COLOR,
  },

  forgotPassword: {
    color: Color.COLOR,
    fontSize: 15,
    fontFamily: "roboto-regular",
    marginTop: 10,
    alignSelf: 'center'
  },

  dontHaveAccount: {
    color: Color.COLOR,
    fontSize: 15,
    fontFamily: "roboto-regular",
    marginTop: 30,
    alignSelf: 'center'
  },


  /*---------------------------------------------This Style is for Log In Image--------------------------------------------------------- */
  loginImage: {
    width: 200,
    height: 200,
    marginTop: 20,
    alignSelf: 'center'
  },

  loginWelcome: {
    marginTop: 10,
    fontSize: 30,
    color: Color.COLOR,
    fontWeight: "bold",
    marginBottom: 35
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
    margin: '1%'
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

  /*---------------------------------------------This Style is for Blank Space at bottom of Page--------------------------------------------------------- */
  bottomSpace: {
    width: '100%',
    height: 50
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
    // backgroundColor: 'red',
    width: '100%',
    height: 200
  },

  product_3rd_view_1: {
    textAlign:'left',
  },

  product_description_view: {
    width:'100%',
    borderWidth:2,
    marginTop:10,
    borderRadius:10,
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
    paddingHorizontal: 10
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

  cart_quantity_view: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

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
    padding: 5,
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

 



  /*---------------------------------------------This Style is for order Of Customer--------------------------------------------------------- */


  order_main: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: Color.SILVER,
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
  },



/*---------------------------------------------This Style is for  Contact_us Page--------------------------------------------------------- */

contact_main: {
  borderWidth: 1,
  borderColor: 'silver',
  backgroundColor: '#0099cc',
  borderRadius: 5,
},

contact_text: {
 fontSize: 15,
 padding: 3,
},


/*---------------------------------------------This Style is for BillBook--------------------------------------------------------- */

bill_main: {
  borderWidth:1,
  backgroundColor: '#0099cc',
 },

bill_row: {
  flexDirection: 'row',
  width: '100%'
},

bill_row_1: {
  flexDirection: 'row',
  width: '100%',
  backgroundColor: 'red'
},

bill_row_2: {
  flexDirection: 'row',
  width: '100%',
  backgroundColor: 'green'
},



bill_column_1: {
  width:'16%' ,
  
},

bill_column_2: {
  width:'20%' ,

},

bill_column_3: {
  width:'14%' ,

},

bill_column_4: {
  width:'20%' ,
 
},

bill_column_5: {
  width:'15%' ,
 
},

bill_column_6: {
  width:'15%' ,
 
},


text_design: {
 fontSize: 14,
 padding: 2,
 alignSelf: 'center',
 color: 'white'
},

bill_box: {
  width: '100%',
  borderColor: 'black',
  borderWidth:0.2,
},

head_design: {
  fontSize: 18,
  fontWeight: 'bold',
  padding: 2,
  alignSelf: 'center',
  color: 'white'
 },
 

bill_bottom_text: {
  textAlign: 'right',
  padding: 2,
  width: '50%',
  color: 'white',
  fontSize: 16,
},

bill_amount: {
  textAlign: 'center',
  padding: 2,
  width: '20%',
  color: 'white',
  fontSize: 16,
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
  borderWidth:1,
  backgroundColor: '#0099cc',
 },

wallet_row: {
  flexDirection: 'row',
  width: '100%'
},

wallet_row_1: {
  flexDirection: 'row',
  width: '100%',
  backgroundColor: 'red'
},

wallet_row_2: {
  flexDirection: 'row',
  width: '100%',
  backgroundColor: 'green'
},



wallet_column_1: {
  width:'8%' ,
 
},

wallet_column_2: {
  width:'20%' ,
}, 

wallet_column_3: {
  width:'30%' ,
 
},

wallet_column_4: {
  width:'17%' ,
 
},

wallet_column_5: {
  width:'12%' ,
 
},

wallet_column_6: {
  width:'15%' ,
 
},


wallet_design: {
 fontSize: 14,
 padding: 2,
 alignSelf: 'center',
 color: 'white'
},

wallet_box: {
  width: '100%',
  borderColor: 'black',
  borderWidth:0.2,
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
  width: '50%',
  color: 'white',
  fontSize: 16,
},

wallet_amount: {
  textAlign: 'center',
  padding: 2,
  width: '20%',
  color: 'white',
  fontSize: 16,
},

wallet_paid: {
  textAlign: 'center',
  padding: 2,
  width: '15%',
  color: 'white',
  fontSize: 16,
},

wallet_due: {
  textAlign: 'center',
  padding: 2,
  width: '15%',
  color: 'white',
  fontSize: 16,
},




/*---------------------------------------------This Style is for Shop Order--------------------------------------------------------- */

shop_order_main: {
  

},






  // cart_view: {
  //   width: '100%',
  //   flexDirection: 'row',
  //   padding: 2,
  //   paddingVertical: 5,
  //   backgroundColor: Color.COLOR,
  //   borderTopLeftRadius: 5,
  //   borderTopRightRadius: 5
  // },

  // cart_sl_view: {
  //   backgroundColor: Color.COLOR,
  //   width: '15%',
  // },

  // cart_sl_text: {
  //   color: Color.BUTTON_NAME_COLOR,
  //   fontSize: 15,
  //   fontWeight: 'bold'
  // },

  // cart_name_view: {
  //   backgroundColor: Color.COLOR,
  //   width: '25%',
  // },

  // cart_quantity_view: {
  //   backgroundColor: Color.COLOR,
  //   width: '30%',
  // },

  // cart_amount_view: {
  //   backgroundColor: Color.COLOR,
  //   width: '23%',
  // },

  // cart_cancle_view: {
  //   backgroundColor: Color.COLOR,
  //   width: '7%',
  // },

  // /* ----------Odd Row Data----------- */
  // cart_data_view: {
  //   width: '100%',
  //   flexDirection: 'row',
  //   padding: 2,
  //   paddingVertical: 8,
  //   backgroundColor: Color.CART_LIST_ODD
  // },

  // cart_sl_data_view: {
  //   backgroundColor: Color.CART_LIST_ODD,
  //   width: '10%',
  //   alignItems: 'flex-end',
  //   paddingRight: 5
  // },

  // cart_sl_data_text: {
  //   color: Color.BUTTON_NAME_COLOR,
  //   fontSize: 15,
  // },

  // cart_name_data_view: {
  //   flexWrap: 'wrap',
  //   backgroundColor: Color.CART_LIST_ODD,
  //   width: '30%',
  // },

  // cart_quantity_data_view: {
  //   backgroundColor: Color.CART_LIST_ODD,
  //   width: '30%',
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   paddingHorizontal: 5,
  //   alignItems: 'center'
  // },

  // cart_amount_data_view: {
  //   backgroundColor: Color.CART_LIST_ODD,
  //   width: '23%',
  //   paddingRight: 10,
  //   alignItems: 'flex-end',
  // },

  // cart_cancle_data_view: {
  //   backgroundColor: Color.CART_LIST_ODD,
  //   width: '7%',
  // },

  //  /* ----------Even Row Data----------- */
  //  cart_data_view_even: {
  //   width: '100%',
  //   flexDirection: 'row',
  //   padding: 2,
  //   paddingVertical: 8,
  //   backgroundColor: Color.CART_LIST_EVEN
  // },

  // cart_sl_data_view_even: {
  //   backgroundColor: Color.CART_LIST_EVEN,
  //   width: '10%',
  //   alignItems: 'flex-end',
  //   paddingRight: 5
  // },

  // cart_sl_data_text_even: {
  //   color: Color.BUTTON_NAME_COLOR,
  //   fontSize: 15,
  //   // fontWeight: 'bold'
  // },

  // cart_name_data_view_even: {
  //   flexWrap: 'wrap',
  //   backgroundColor: Color.CART_LIST_EVEN,
  //   width: '30%',
  // },

  // cart_quantity_data_view_even: {
  //   backgroundColor: Color.CART_LIST_EVEN,
  //   width: '30%',
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   paddingHorizontal: 5,
  //   alignItems: 'center'
  // },

  // cart_amount_data_view_even: {
  //   backgroundColor: Color.CART_LIST_EVEN,
  //   width: '23%',
  //   paddingRight: 10,
  //   alignItems: 'flex-end',
  // },

  // cart_cancle_data_view_even: {
  //   backgroundColor: Color.CART_LIST_EVEN,
  //   width: '7%',
  // },

  /*---------------------------------------------This Style is for Item Category List--------------------------------------------------------- */
  itemCategoryName: {
    width: '70%',
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
    margin: 5,
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
    paddingBottom: 5,
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
    paddingVertical: 5,
    paddingLeft: 5,
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

  /*---------------------------------------------This Style is for Search Box-------------------------------------------------------------- */
  searchBox: {
    flexDirection: 'row',
    borderColor: 'rgba(2,15,20,0.05)',
    borderWidth: 5,
    borderRadius: 5,
    marginBottom: 5,
    padding: -20,
    backgroundColor: '#fff',
    height: 50
  },

  searchIcon: {
    width: '10%',
    color: '#aaa',
    alignSelf: 'center',
    textAlign: 'center',
  },

  searchInput: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 5
  }
})