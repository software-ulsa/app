import * as React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Container, Header } from '../../components';
import SearchInput from '../../components/SearchInput/Index';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Images, Colors } from '../../theme';
import HomeHouse from '../../components/HomeHouse';
import styles from './Styles/HomeStyle';
import { navigate } from '../../navigation/ReduxNavigation';

export interface Props {
  navigation: any;
}

function HomeScreen({ navigation }: any) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'house', title: 'House' },
    { key: 'flats', title: 'Flats' },
    { key: 'apartment', title: 'Apartment' },
    { key: 'villa', title: 'Villa' }
  ]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicatorStyle}
      style={styles.tabBarStyle}
      labelStyle={styles.labelStyle}
      tabStyle={styles.tabStyle}
      activeColor={Colors.pink}
      pressColor={Colors.transparent}
    />
  );

  const HouseRoute = () => (
    <>
      <HomeHouse
        navigation={navigate}
        onCategoryClick={() => navigation.navigate('PopularDetails')}
        onMoreBtnPress={() => navigation.navigate('PopularDestionation')}
      />
    </>
  );

  const FlatsRoute = () => (
    <>
      <HomeHouse
        navigation={navigate}
        onCategoryClick={() => navigation.navigate('PopularDetails')}
        onMoreBtnPress={() => navigation.navigate('PopularDestionation')}
      />
    </>
  );

  const ApartmentRoute = () => (
    <>
      <HomeHouse
        navigation={navigate}
        onCategoryClick={() => navigation.navigate('PopularDetails')}
        onMoreBtnPress={() => navigation.navigate('PopularDestionation')}
      />
    </>
  );

  const VillaRoute = () => (
    <>
      <HomeHouse
        navigation={navigate}
        onCategoryClick={() => navigation.navigate('PopularDetails')}
        onMoreBtnPress={() => navigation.navigate('PopularDestionation')}
      />
    </>
  );

  const renderScene = SceneMap({
    house: HouseRoute,
    flats: FlatsRoute,
    apartment: ApartmentRoute,
    villa: VillaRoute
  });

  return (
    <Container>
      <Header
        transparent
        children
        hasLocation
        onLocationPress={() => navigation.navigate('CurrentLocation')}
        onProfilePress={() => navigation.navigate('Profile')}
      />
      <View style={styles.searchNotifyContent}>
        <SearchInput
          searchInputStyle={styles.searchInputStyle}
          placeholder="Search"
        />
        <TouchableOpacity
          style={styles.notificationBtn}
          onPress={() => navigation.navigate('Notification')}>
          <Image
            source={Images.NotificationImage}
            resizeMode="contain"
            style={styles.notificationIcon}
          />
          <View style={styles.penddingNotification} />
        </TouchableOpacity>
      </View>
      <View style={styles.tabViewStyle}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          swipeEnabled={false}
          onIndexChange={setIndex}
        />
      </View>
    </Container>
  );
}

export default HomeScreen;
