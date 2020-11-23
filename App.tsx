import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from './src/components/Dashboard';
import SigninScreen from './src/components/Signin';
import SlavesScreen from './src/components/slaves/Slaves';
import useFirebaseUser from './src/components/hooks/useFirebaseUser';

const Stack = createStackNavigator();

export default function App() {
  const firebaseUser = useFirebaseUser();

  const RootStack = () => {
    return (
      <Stack.Navigator initialRouteName="Signin" screenOptions={{ gestureEnabled: false, headerShown: false }}>
        {firebaseUser ? (
          <>
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Slaves" component={SlavesScreen} />
          </>
        ) : (
          <Stack.Screen name="Signin" component={SigninScreen} />
        )}
      </Stack.Navigator>
    );
  };
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
