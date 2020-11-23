import React from 'react';
import { Container, Header, Content, List } from 'native-base';

import { db } from '../../firebase';
import { User, Slave, ISlave, IUnit } from '../../models';
import FooterComponent from '../Footer';
import SlaveRow from './SlaveRow';
import useCollectionSubscription from '../hooks/useCollectionSubscription';
import useDocumentSubscription from '../hooks/useDocumentSubscription';
import PartyImages from '../dashboard/PartyImages';
import { MAX_COST } from '../../config';

const usersRef = db.collection('users');

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
      <Header style={{ height: 128, paddingLeft: 0, paddingRight: 0 }}>
        {user && <PartyImages {...props} uid={uid} slaveIds={user.slaveIds} costs={user.costs} />}
      </Header>
      <Content padder>
        <List>
          {slaves.map((slave) => (
            <SlaveRow
              key={slave.id}
              {...props}
              slave={slave}
              onAddParty={onAddParty}
              onRemoveParty={onRemoveParty}
              isParty={user?.slaveIds.includes(slave.id)}
            />
          ))}
        </List>
      </Content>
      <FooterComponent {...props} uid={uid} active="slaves" />
    </Container>
  );
}
