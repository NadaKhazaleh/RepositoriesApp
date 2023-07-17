import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import RepoScreen from '../Screens/PublicRepositoriesScreen/PublicRepositoriesScreen';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Repositories">
      <Tab.Screen 
        name="Repositories" 
        component={RepoScreen} 
        options={{
          tabBarLabel: 'Repositories',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
