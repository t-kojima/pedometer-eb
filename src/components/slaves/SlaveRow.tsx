import React from 'react';
import { ListItem, Left, Right, Thumbnail, Body, Text, Button, Icon } from 'native-base';

import { db } from '../../firebase';
import useDocumentSubscription from '../hooks/useDocumentSubscription';
import { ISlave, Unit, IUnit } from '../../models';

type Props = {
  slave: ISlave;
  isParty: boolean;
  onAddParty: (slave: ISlave, unit: IUnit) => void;
  onRemoveParty: (slave: ISlave, unit: IUnit) => void;
};

const unitsRef = db.collection('units');

export default function SlaveRow(props: Props) {
  const { slave, isParty = false, onAddParty, onRemoveParty } = props;
  const unit = useDocumentSubscription(slave && unitsRef.doc(slave.unitId), Unit, [slave]);

  const onPress = async () => {
    if (!unit) return;

    if (isParty) {
      onRemoveParty(slave, unit);
    } else {
      onAddParty(slave, unit);
    }
  };

  const onDetail = async () => {
    console.log("on detail")
  }

  return (
    <ListItem avatar onPress={onPress}>
      {unit && (
        <>
          <Left>
            <Thumbnail
              square
              source={{ uri: unit.image?.uri }}
              style={isParty && { borderWidth: 3, borderColor: 'red', borderRadius: 10 }}
            />
          </Left>
          <Body>
            <Text>{unit.name}</Text>
            <Text>
              Lv {slave.level} / exp {slave.next} %
            </Text>
            <Text note>Doing what you like will always keep you happy . .</Text>
          </Body>
          <Right>
            <Text>Rank {unit.rank}</Text>
            <Button transparent onPress={onDetail}><Icon name='search' /></Button>
          </Right>
        </>
      )}
    </ListItem>
  );
}
