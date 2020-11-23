import React, { useEffect } from 'react';
import { Container, Content, Button, Text } from 'native-base';

import useFirebaseUser from '../hooks/useFirebaseUser';
import useUserSubscription from '../hooks/useUserSubscription';
import { db } from '../../firebase';
import { Slave, Unit } from '../../models';
import useCollectionSubscription from '../hooks/useCollectionSubscription';
import { drawLots } from '../../utils';
import FooterComponent from '../Footer';
import PartyImages from './PartyImages';

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
  const units = useCollectionSubscription(unitsRef, Unit);

  useEffect(() => {
    if (!user && firebaseUser) initialize(firebaseUser.uid);
  }, [user]);

  const onDrawLots = async () => {
    if (!firebaseUser || !units) return;
    const userRef = db.collection('users').doc(firebaseUser.uid);

    const unit = drawLots(units);
    await userRef.collection('slaves').add(new Slave({ unitId: unit.id }).toObject());
    alert(`[${unit.name}] を手に入れた！`);
  };

  return (
    <Container>
      <Content>
        {
          user && <PartyImages {...props} uid={firebaseUser && firebaseUser.uid} slaveIds={user.slaveIds} costs={user.costs} />
        }
        <Button bordered onPress={onDrawLots}>
          <Text>ガチャ</Text>
        </Button>
      </Content>
      <FooterComponent {...props} uid={firebaseUser && firebaseUser.uid} active="dashboard" />
    </Container>
  );
}
