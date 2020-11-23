import React from 'react';
import { Thumbnail, ListItem, Left } from 'native-base';

import { db } from '../../firebase';
import useDocumentSubscription from '../hooks/useDocumentSubscription';
import { ISlave, Unit, IUnit } from '../../models';

type Props = {
  slave: ISlave;
  onRemoveParty: (slave: ISlave, unit: IUnit) => void;
};

const unitsRef = db.collection('units');

export default function PartySlaveAvatar(props: Props) {
  const { slave, onRemoveParty } = props;
  const unit = useDocumentSubscription(slave && unitsRef.doc(slave.unitId), Unit, [slave]);

  const onRemove = async () => {
    if (!unit) return;

    onRemoveParty(slave, unit);
  };

  return (
    <ListItem noIndent onPress={onRemove}>
      {unit && (
        <Left>
          <Thumbnail small source={{ uri: unit.image }} />
        </Left>
      )}
    </ListItem>
  );
}
