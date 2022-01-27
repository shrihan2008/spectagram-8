import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator'
import PostScreen from '../screens/PostScreen';
const Stack = createStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.StackNavigator
      initialRouteName="Home"
      screenOption={{ headerShown: false }}>
      <Stack.Screen name="Home" component={BottomTabNavigator} />
      <Stack.Screen name="PostScreen" component={PostScreen} />
    </Stack.StackNavigator>
  );
};

export default StackNavigator;
