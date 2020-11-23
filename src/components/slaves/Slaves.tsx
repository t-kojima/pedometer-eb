import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Container, Header, Content, List, ListItem, Left, Right, Icon } from 'native-base';

import { db } from '../../firebase';
import SlaveRow from './SlaveRow';
import useUserSubscription from '../hooks/useUserSubscription';
import useCollectionSubscription from '../hooks/useCollectionSubscription';
import { Slave } from '../../models';
import FooterComponent from '../Footer';

const usersRef = db.collection('users');

export default function Slaves(props: any) {
  const { uid } = props.route.params;
  // const user = useUserSubscription(uid);
  const slaves = useCollectionSubscription(uid && usersRef.doc(uid).collection('slaves').orderBy('createdAt', 'desc'), Slave, [uid]);

  return (
    <Container>
      {/* <Header /> */}
      <Content>
        <List>
          {slaves.map((slave) => (
            <SlaveRow key={slave.id} {...props} slave={slave} />
          ))}
        </List>
      </Content>
      <FooterComponent {...props} uid={uid} active="slaves" />
    </Container>
  );
}
