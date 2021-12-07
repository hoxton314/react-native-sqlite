import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native'

import SplashScreen from './components/SplashScreen';
import ListScreen from './components/ListScreen';
import AddScreen from './components/AddScreen';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
])

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="splash" component={SplashScreen} options={screenOpt.splash} />
        <Stack.Screen name="list" component={ListScreen} options={screenOpt.list} />
        <Stack.Screen name="add" component={AddScreen} options={screenOpt.add} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const screenOpt = {
  list: {
    title: 'Lista budzików',
    headerStyle: {
      backgroundColor: '#404EED',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerShown: true
  },
  add: {
    title: 'Dodaj budzik',
    headerStyle: {
      backgroundColor: '#404EED',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerShown: true
  },
  splash: {
    title: '',
    headerStyle: {
      backgroundColor: '#3f5ca8',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerShown: false
  },
}
