import React from 'react';
import { StyleSheet,View } from 'react-native';
import {
  Divider,
  Layout,
  Text,
} from 'react-native-ui-kitten';
import { Styles } from "../../assets/styles";
import { ContactUsScreenProps } from '../../navigation/home.navigator';
import { Toolbar } from '../../components/toolbar.component';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';



export const ContactUsScreen = (props: ContactUsScreenProps): SafeAreaLayoutElement => (
  <SafeAreaLayout
    style={styles.safeArea}
    insets={SaveAreaInset.TOP}>
    <Toolbar
      title='Contact Us'
      onBackPress={props.navigation.goBack}
    />
    <Divider/>
    <View style={Styles.contact_milaan}>
                    <Text style={{fontSize:30, paddingTop:20, padding: 5}}>Milaan IT Projects Pvt. Ltd.</Text>
                    <Text style={Styles.contact_text}>101 Inorbit Complex, Near Highway Restaurant</Text>
                    <Text style={Styles.contact_text}>Khagaul, Patna</Text>
                    <Text style={Styles.contact_text}>Mobile No.:- 9155316625</Text>
                </View>

  </SafeAreaLayout>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
}
})
