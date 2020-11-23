import React from 'react';
// import { StyleSheet, Text, View, Button } from 'react-native';
import { Container, Header, Content, List, Button, Body, Title, Left, Right, Icon, Card, Text, Toast } from 'native-base';

import { db } from '../../firebase';
import { User, Slave, ISlave, IUnit } from '../../models';
import FooterComponent from '../Footer';
import SlaveRow from './SlaveRow';
import PartySlaveAvatar from './PartySlaveAvatar';
import useCollectionSubscription from '../hooks/useCollectionSubscription';
import useDocumentSubscription from '../hooks/useDocumentSubscription';

const usersRef = db.collection('users');

const MAX_COST = 8;

export default function Slaves(props: any) {
  const { uid } = props.route.params;
  const user = useDocumentSubscription(uid && usersRef.doc(uid), User, [uid]);
  const slaves = useCollectionSubscription(uid && usersRef.doc(uid).collection('slaves').orderBy('createdAt', 'desc'), Slave, [
    uid,
  ]);

  const onAddParty = async (slave: ISlave, unit: IUnit) => {
    if (!user) return;
    if (user.costs + unit.rank <= MAX_COST) {
      await user.ref?.set({ slaveIds: [...user.slaveIds, slave.id], costs: user.costs + unit.rank }, { merge: true });
    }
  };

  const onRemoveParty = async (slave: ISlave, unit: IUnit) => {
    if (!user) return;

    await user.ref?.set(
      { slaveIds: user.slaveIds.filter((_) => _ !== slave.id), costs: user.costs - unit.rank },
      { merge: true }
    );
  };

  return (
    <Container>
      <Header style={{ backgroundColor: '#fafafa' }}>
        <Left>
          <Text>
            {user && user.costs} / {MAX_COST}
          </Text>
        </Left>
        <Body>
          {user && (
            <List
              horizontal={true}
              dataArray={user.slaveIds}
              renderRow={(slaveId) => {
                const slave = slaves.find((_) => _.id === slaveId);
                return <PartySlaveAvatar {...props} slave={slave} onRemoveParty={onRemoveParty} />;
              }}
            ></List>
          )}
        </Body>
      </Header>
      <Content padder>
        <List>
          {slaves.map((slave) => (
            <SlaveRow key={slave.id} {...props} slave={slave} onAddParty={onAddParty} onRemoveParty={onRemoveParty} isParty={user?.slaveIds.includes(slave.id)} />
          ))}
        </List>
      </Content>
      <FooterComponent {...props} uid={uid} active="slaves" />
    </Container>
  );
}
