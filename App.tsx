import React from 'react';
import { Spinner } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DashboardScreen from './src/components/Dashboard';
import SigninScreen from './src/components/Signin';
import SlavesScreen from './src/components/slaves/Slaves';
import RoomsScreen from './src/components/battles/Rooms';

import useFirebaseUser from './src/components/hooks/useFirebaseUser';
import useRobotoFonts from './src/components/hooks/useRobotoFonts';

const Stack = createStackNavigator();

export default function App() {
  const firebaseUser = useFirebaseUser();
  const isReady = useRobotoFonts();

  const RootStack = () => {
    return (
      <Stack.Navigator initialRouteName="Signin" screenOptions={{ gestureEnabled: false, headerShown: false }}>
        {firebaseUser ? (
          <>
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Slaves" component={SlavesScreen} />
            <Stack.Screen name="Rooms" component={RoomsScreen} />
          </>
        ) : (
          <Stack.Screen name="Signin" component={SigninScreen} />
        )}
      </Stack.Navigator>
    );
  };
  return isReady ? (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  ) : (
    <Spinner />
  );
}
