import React from 'react';
import { View ,StyleSheet,Text} from 'react-native';
//import LoginScreen from './src/Screens/LoginScreen';
import AppNavigations from './src/Navigations/AppNavigations';


function App() {
  return (
    <View style={styles.container}>
     
     <AppNavigations />
     {/* <LoginScreen /> */}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
})

export default App;
