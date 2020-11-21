import React from 'react';
import Expo from 'expo';
import { StyleSheet, Text, View, Button } from 'react-native';
// import * as Google from 'expo-google-app-auth';
import { GoogleAuthProvider, auth } from '../firebase';

export default function SignIn(props: any) {
  const login = async () => {
    // const { type, accessToken, user } = await Google.logInAsync(config);
    await auth.signInAnonymously();
  };

  return (
    <View style={styles.container}>
      <Button title="Anonymous Login" onPress={login} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
