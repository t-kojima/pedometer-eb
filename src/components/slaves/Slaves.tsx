import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { db } from '../../firebase';
import SlaveRow from './SlaveRow';
import useUserSubscription from '../hooks/useUserSubscription';
import useCollectionSubscription from '../hooks/useCollectionSubscription';
import { Slave } from '../../models';

const usersRef = db.collection('users');

export default function Slaves(props: any) {
  const { uid } = props.route.params;
  // const user = useUserSubscription(uid);
  const slaves = useCollectionSubscription(uid && usersRef.doc(uid).collection('slaves'), Slave, [uid]);

  return (
    <View>
      {slaves.map((slave) => (
        <SlaveRow key={slave.id} {...props} slave={slave} />
      ))}
    </View>
  );
}
