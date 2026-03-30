
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../Screens/LoginScreen';
import UserDetails from '../Screens/UserDetails';
import EachUserDetails from '../Screens/EachUserDetails';
import AsignEmployeetoDepartment from '../Screens/AsignEmployeetoDepartment';
import SummeryReport from '../Screens/SummeryReport';
import HourlyRate from '../Screens/HourlyRate';


const Stack = createStackNavigator();

const AppNavigations = () => {
  return (
  <NavigationContainer>
  <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="UserDetails" component={UserDetails} options={{
        cardStyleInterpolator:CardStyleInterpolators.forVerticalIOS
      }}/>
       <Stack.Screen name="EachUser" component={EachUserDetails} options={{
        cardStyleInterpolator:CardStyleInterpolators.forVerticalIOS
      }}/>
        <Stack.Screen name="AsignDepartment" component={AsignEmployeetoDepartment} options={{
        cardStyleInterpolator:CardStyleInterpolators.forVerticalIOS
      }}/>
         <Stack.Screen name="HourlyRate" component={HourlyRate} options={{
        cardStyleInterpolator:CardStyleInterpolators.forVerticalIOS
      }}/>
      <Stack.Screen name="SummeryReport" component={SummeryReport} options={{
        cardStyleInterpolator:CardStyleInterpolators.forVerticalIOS
      }}/>
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default AppNavigations