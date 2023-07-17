import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen'
import { Provider } from 'react-redux';
import store from './Redux/Store/store';

import LoginScreen from './Screens/LoginScreen/LoginScreen'

import BottomTabNavigator from './Components/BottomTabNavigator';

const Stack = createStackNavigator();
class App extends Component{

  componentDidMount(){
SplashScreen.hide()
  }
  render(){
    
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login"  screenOptions={{
    headerShown: false
  }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Main" component={BottomTabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
};

export default App;