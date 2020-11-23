import React from 'react';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';

type Props = {
  navigation: any;
  uid: string;
  active: string;
};

export default function FooterComponent(props: Props) {
  const { navigation, uid, active } = props;

  return (
    <Footer>
      <FooterTab>
        <Button vertical active={active === 'dashboard'} onPress={() => navigation.navigate('Dashboard', { uid })}>
          <Icon name="home" />
          <Text>Home</Text>
        </Button>
        <Button vertical active={active === 'slaves'} onPress={() => navigation.navigate('Slaves', { uid })}>
          <Icon name="apps" />
          <Text>Monsters</Text>
        </Button>
        <Button vertical active={active === 'battle'}>
          <Icon name="flag" />
          <Text>Battle</Text>
        </Button>
        <Button vertical>
          <Icon name="person" />
          <Text>-</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
}
