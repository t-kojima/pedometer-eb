import React from 'react';
import { Image, ImageBackground, View } from 'react-native';
import { Card, CardItem, Text, H1, H3 } from 'native-base';

import { db } from '../../firebase';
import { Slave, Unit } from '../../models';
import useDocumentSubscription from '../hooks/useDocumentSubscription';
import { MAX_COST } from '../../config';

const usersRef = db.collection('users');
const unitsRef = db.collection('units');

type Props = {
  uid: string;
  slaveIds: string[];
  costs: number;
};

export default function PartyImages(props: Props) {
  const { slaveIds, costs } = props;
  return (
    <ImageBackground
      source={{
        uri:
          'https://firebasestorage.googleapis.com/v0/b/pedometer-eb-staging.appspot.com/o/backgrounds%2F0620a.png?alt=media&token=3e59bde3-97a4-4a75-b3f9-289e361006f4',
      }}
      style={{
        width: '100%',
        height: 128,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
      }}
    >
      <View
        style={{
          position: 'absolute',
          width: 100,
          height: 100,
          top: 12,
          left: 12,
        }}
      >
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
          <H1 style={{ fontWeight: 'bold', color: 'white' }}>{costs}</H1>
          <H3 style={{ color: 'white' }}> / {MAX_COST}</H3>
        </View>
      </View>
      {slaveIds.map((slaveId) => (
        <PartyImage {...props} slaveId={slaveId} />
      ))}
    </ImageBackground>
  );
}

const PartyImage = (props: any) => {
  const { uid, slaveId } = props;
  const slave = useDocumentSubscription(usersRef.doc(uid).collection('slaves').doc(slaveId), Slave, [uid, slaveId]);
  const unit = useDocumentSubscription(slave && unitsRef.doc(slave.unitId), Unit, [slave]);
  return (
    unit &&
    unit.image && <Image source={{ uri: unit.image.uri }} style={{ width: unit.image.width, height: unit.image.height }} />
  );
};
