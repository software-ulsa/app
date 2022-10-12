import * as React from 'react';
import { Text } from 'react-native';
import styles from './Styles/index';

export interface Props {
  navigation: any;
}

function CommanText(props: any) {
  return (
    <>
      <Text style={[styles.commanText, props.commanTextstyle]}>
        {props.commanText}
      </Text>
    </>
  );
}

export default CommanText;
