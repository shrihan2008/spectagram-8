import  React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Feed from '../screens/Feed';
import CreatePost from '../screens/CreatePost';
const Tab = createMaterialBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focussed, color, size }) => {
          let iconName;
          if (route.name === 'Feed') {
            iconName = focussed ? 'book' : 'book-outline';
          } else if (route.name === 'CreatePost') {
            iconName = focussed ? 'create' : 'create-outline';
          }
          return <IonIcons name={iconName} size={size} color={color} />;
        },
      })}
    activeColor={'orange'}
     inactiveColor={ 'green'} >
      <Tab.Screen name="CreatePost" componet={CreatePost}></Tab.Screen>
      <Tab.Screen name="Feed" componet={Feed}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
