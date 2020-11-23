import React from 'react';
import firebase from 'firebase';
import { StyleSheet, Image, View, Button } from 'react-native';
import { Container, Header, Content, List, ListItem, Left, Right, Icon, Thumbnail, Body, Text } from 'native-base';

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

  return (
    <ListItem avatar>
      {unit && (
        <>
          <Left>
            <Thumbnail square source={{ uri: unit.image }} />
          </Left>
          <Body>
            <Text>{unit.name}</Text>
            <Text>Lv {slave.level} / exp {slave.next} %</Text>
            <Text note>Doing what you like will always keep you happy . .</Text>
          </Body>
          <Right>
            <Text note>3:43 pm</Text>
          </Right>
        </>
      )}
      {/* {unit && (
        <Image source={{ uri: unit.image }} resizeMode="contain" style={{ width: 96, height: 96 }} />
      )} */}
    </ListItem>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 'auto',
    marginHorizontal: 'auto',
    padding: 24,
    backgroundColor: '#81d4fa',
  },
});
