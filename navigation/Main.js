import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Form from '../screens/Form';
import Home from '../screens/Home';
import Info from '../screens/Info';
const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown:false
    }
    }>
        <Stack.Screen
          name="Form"
          component={Form}
        />
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="Info"

        >{(props)=><Info {...props}/>}
        </Stack.Screen>  
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main