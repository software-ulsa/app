import * as React from 'react';
import { useState } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { Container, Header, Content } from '../../components';
import SearchInput from '../../components/SearchInput/Index';
import MapView, { Marker } from 'react-native-maps';
import CommanHeading from '../../components/CommanHeading';
import styles from './Styles/CurrentLocationStyle';
import { Images } from '../../theme';
import { navigate } from '../../navigation/ReduxNavigation';
import { suggestionsListData } from '../../assets/data';

export interface Props {
  navigation: any;
  name: string;
}

const CurrentLocationScreen = ({ navigation }: Props) => {
  const [input, setInput] = useState('');
  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.suggestionsList}>
      <Image
        source={item.searchImg}
        resizeMode="contain"
        style={styles.suggestionsSearchIcon}
      />
      <Text style={styles.suggestionsSearchText}>{item.text}</Text>
    </TouchableOpacity>
  );
  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Current Location"
        onBackPress={() => navigation.goBack()}
      />
      <SearchInput
        searchInputStyle={styles.searchInputStyle}
        placeholder="Search your location"
        onChangeText={(text: any) => setInput(text)}
      />
      {input.trim().length > 0 && (
        <View style={styles.searchSuggestions}>
          <CommanHeading
            headingText
            heading="Recent Search"
            navigation={navigate}
          />
          <Content style={styles.suggestionsListContainer}>
            <FlatList
              data={suggestionsListData}
              renderItem={renderItem}
              bounces={false}
            />
          </Content>
        </View>
      )}
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: 21.187090218083345,
          longitude: 72.79023272212653,
          latitudeDelta: 0.0043,
          longitudeDelta: 0.0034
        }}>
        <Marker
          draggable
          coordinate={{
            latitude: 21.187090218083345,
            longitude: 72.79023272212653
          }}
          title={'Zluck Solutions'}
          description={'This is an IT Compnay'}
          image={Images.CurrentLocation}
          onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
        />
      </MapView>
    </Container>
  );
};
export default CurrentLocationScreen;
