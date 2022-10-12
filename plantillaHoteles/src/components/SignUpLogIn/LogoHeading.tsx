import * as React from 'react';
import { Text, Image, View } from 'react-native';
import { Images } from '../../theme';
import styles from './Styles/index';

export interface Props {
  navigation: any;
  Heading?: string;
  Peregraph?: string;
}

function LogoHeading(props: any) {
  return (
    <>
      <View style={props.logoHeadingStyle}>
        <Image source={Images.Logo} resizeMode="contain" style={styles.logo} />
        <Text style={styles.heading}>{props.heading}</Text>
      </View>
    </>
  );
}

export default LogoHeading;
