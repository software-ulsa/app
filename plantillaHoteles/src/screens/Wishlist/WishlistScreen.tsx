import * as React from 'react';
// import { Button, View, Text } from 'react-native';
import { Container, Content, Header } from '../../components';
import CategoryList from '../../components/CategoryList';
import { categoryListData } from '../../assets/data';
import { navigate } from '../../navigation/ReduxNavigation';
import styles from './Styles/WishlistStyle';

export interface Props {
  navigation: any;
  name: string;
}

const WishlistScreen = ({ navigation }: Props) => {
  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Wishlist"
        onBackPress={() => navigation.goBack()}
      />
      <Content hasHeader contentContainerStyle={styles.container}>
        <CategoryList
          categoryWishListText
          categoryCollectionList
          categoryList={categoryListData}
          categoryPropartyImgStyle={styles.categoryPropartyImgStyle}
          categoryRightContentStyle={styles.categoryRightContentStyle}
          navigation={navigate}
        />
      </Content>
    </Container>
  );
};
export default WishlistScreen;
