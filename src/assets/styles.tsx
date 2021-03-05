import { StyleSheet } from "react-native";
import { color } from "react-native-reanimated";
import { Color } from "../constants/LabelConstants";

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
    marginVertical: -8
  }, 

  inputTextWithIcon: {
    marginVertical: -8,
    width: '85%'
  },

  inputTextIcon: {
    width: '15%'
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

  /*---------------------------------------------This Style is for Blank Space at bottom of Page--------------------------------------------------------- */
  bottomSpace: {
    width: '100%',
    height: 50
  },

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

  profile_image: {
    backgroundColor: 'green',
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