import React from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';
import { Images } from '../../theme';
import styles from './Styles';

export interface Props {
  navigation: any;
  onLocationPress?: any;
}

function LeftLocation({ onLocationPress }: any) {
  return (
    <TouchableOpacity
      style={styles.leftLocationContent}
      onPress={() => {
        if (onLocationPress) {
          onLocationPress();
        }
      }}>
      <Image
        source={Images.LocationImage}
        resizeMode="contain"
        style={styles.locationImage}
      />
      <Text style={styles.leftLocationText} numberOfLines={1}>
        Add Your Current Location
      </Text>
    </TouchableOpacity>
  );
}

export default LeftLocation;
