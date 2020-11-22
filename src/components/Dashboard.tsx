import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import useFirebaseUser from './hooks/useFirebaseUser';
import useUserSubscription from './hooks/useUserSubscription';
import styles from '../styles';
import { db } from '../firebase';
import { Slave, Unit } from '../models';
import useCollectionSubscription from './hooks/useCollectionSubscription';
import { drawLots } from '../utils';

const initialize = async (uid: string) => {
  console.info('initialize');
  const userRef = db.collection('users').doc(uid);
  await Promise.all([
    userRef.set({ uid }, { merge: true }),
    userRef.collection('slaves').add(new Slave({ unitId: 'mon_002' }).toObject()),
  ]);
  alert('[スライム] を手に入れた！');
};

const unitsRef = db.collection('units');

export default function Dashboard(props: any) {
  const { navigation } = props;
  const firebaseUser = useFirebaseUser();
  const user = useUserSubscription(firebaseUser && firebaseUser.uid);
  const units = useCollectionSubscription(unitsRef, Unit)

  useEffect(() => {
    if (!user && firebaseUser) initialize(firebaseUser.uid);
  }, [user]);

  const onDrawLots = async () => {
    if (!firebaseUser || !units) return;
 
    const unit = drawLots(units);
    alert(`${unit.name}が当たりました！`)
  }

  return (
    <View style={styles.container}>
      <Text>dashboard</Text>
      <Button title="所持モンスター 一覧" onPress={() => navigation.navigate('Slaves', { uid: firebaseUser && firebaseUser.uid })}></Button>
      <Button title="ガチャ" onPress={onDrawLots} />
    </View>
  );
}
