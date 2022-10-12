import * as React from 'react';
import { Container, Content, Header } from '../../components';
import PropertyDetailComponent from '../../components/PropertyDetailComponent';
import styles from './Styles/MyRentalPropertyStyle';

export interface Props {
  navigation: any;
}

const ActivePropertyScreen = ({ navigation }: Props) => {
  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Active"
        onBackPress={() => navigation.goBack()}
      />
      <Content
        hasHeader
        contentContainerStyle={[styles.container, styles.bookActiveContainer]}>
        <PropertyDetailComponent
          sendMsgPress={() => navigation.navigate('chatDetails')}
          likeBtnPress={() => navigation.navigate('Wishlist')}
        />
      </Content>
    </Container>
  );
};
export default ActivePropertyScreen;
