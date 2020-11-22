import React from 'react';
import firebase from 'firebase';
import { StyleSheet, Image, View, Button } from 'react-native';

import { db } from '../../firebase';
import useDocumentSubscription from '../hooks/useDocumentSubscription';
import { ISlave, Unit } from '../../models';

type Props = {
  slave: ISlave;
};

const unitsRef = db.collection('units');

export default function SlaveRow(props: Props) {
  const { slave } = props;
  const unit = useDocumentSubscription(slave && unitsRef.doc(slave.unitId), Unit, [slave]);
  return <View>{unit && <Image source={{ uri: unit.image }} style={{ width: 96, height: 96, backgroundColor: 'blue' }} />}</View>;
}
