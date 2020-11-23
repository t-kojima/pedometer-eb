import React, { useState } from 'react';
// import { StyleSheet, Text, View, Button } from 'react-native';
import { Container, Header, Content, Segment, Button, Body, Title, Left, Right, Icon, Card, Text, Toast } from 'native-base';

import { db } from '../../firebase';
import { User, Slave, ISlave, IUnit } from '../../models';
import FooterComponent from '../Footer';
import useCollectionSubscription from '../hooks/useCollectionSubscription';
import useDocumentSubscription from '../hooks/useDocumentSubscription';

const usersRef = db.collection('users');

export default function Rooms(props: any) {
  const { uid } = props.route.params;
  //   const user = useDocumentSubscription(uid && usersRef.doc(uid), User, [uid]);
  //   const slaves = useCollectionSubscription(uid && usersRef.doc(uid).collection('slaves').orderBy('createdAt', 'desc'), Slave, [
  //     uid,
  //   ]);
  const [active, setActive] = useState<'rank' | 'free'>('rank');

  return (
    <Container>
      <Header hasSegment>
        <Left></Left>
        <Body>
          <Segment>
            <Button first active={active === 'rank'} onPress={() => setActive('rank')}>
              <Text>Rank</Text>
            </Button>
            <Button last active={active === 'free'} onPress={() => setActive('free')}>
              <Text>Free</Text>
            </Button>
          </Segment>
        </Body>
        <Right></Right>
      </Header>
      <Content padder>
        <Text>Awesome segment</Text>
      </Content>
      <FooterComponent {...props} uid={uid} active="battle" />
    </Container>
  );
}
