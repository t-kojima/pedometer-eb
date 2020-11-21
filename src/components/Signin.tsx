import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function SignIn(props: any) {
  return (
    <View style={styles.container}>
      <Button
        title="Google Login"
        onPress={() => {
          alert('アラート表示');
          console.log('コンソールログ');
        }}
      />
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
