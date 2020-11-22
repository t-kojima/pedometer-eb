import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import useFirebaseUser from './hooks/useFirebaseUser';
import useUserSubscription from './hooks/useUserSubscription';
import styles from '../styles';
import { db } from '../firebase';
import { Slave } from '../models';

const initialize = async (uid: string) => {
  console.info('initialize');
  const userRef = db.collection('users').doc(uid);
  await Promise.all([
    userRef.set({ uid }, { merge: true }),
    userRef.collection('slaves').add(new Slave({ unitId: 'mon_002' }).toObject())
  ])
  alert('[スライム] を手に入れた！');
};

export default function Dashboard(props: any) {
  const firebaseUser = useFirebaseUser();
  const user = useUserSubscription(firebaseUser && firebaseUser.uid);

  useEffect(() => {
    if (!user && firebaseUser) initialize(firebaseUser.uid);
  }, [user]);

  return (
    <View style={styles.container}>
      <Text>dashboard</Text>
    </View>
  );
}
