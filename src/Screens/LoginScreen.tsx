import { StyleSheet, View, Image, Text } from 'react-native';
import React from 'react';
import LoginForm from '../../Components/LoginScreen/LoginForm';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const LoginScreen = (prop:any) => {

  const Stack = prop.navigation;
  return (
    <View>
      <Image
        //source={require('../Screens/assets/img/login_background.png')}
        source={require('../../assest/img/login_background.png')}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.textview}>
        <Text style={styles.text}>Welcome Back</Text>
      </View>    
     
       <KeyboardAwareScrollView  keyboardShouldPersistTaps="never"
        enableOnAndroid
        >
          <LoginForm stack={Stack} />
       


      </KeyboardAwareScrollView>
      
  
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({

   container: {
    flex: 1, // ✅ required
  },
  image: {
    position: 'absolute', // ✅ puts image in background
   // width: '100%',
    //height: '100%',
  },

  textview: {
    position: 'absolute',
    marginHorizontal: 50,
    marginTop: 140,
  },
  text: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
    formWrap: {
    paddingTop: 260,
    paddingHorizontal: 20,
    paddingBottom: 60,
    flexGrow: 1,
  },

});
