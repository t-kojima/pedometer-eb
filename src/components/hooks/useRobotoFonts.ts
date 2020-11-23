import { useState, useEffect } from 'react';
import * as Font from 'expo-font';

export default function useFirebaseUser() {
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    let canceled = false;
    const loadFont = async () => {
      await Font.loadAsync({
        // Roboto: require('../../../node_modules/native-base/Fonts/Roboto.ttf'),
        // Roboto_medium: require('../../../node_modules/native-base/Fonts/Roboto_medium.ttf'),
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      });
      canceled || setIsReady(true);
    };
    loadFont();
    return () => {
      canceled = true;
    };
  }, []);

  return isReady;
}
