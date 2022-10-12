import * as React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './Styles/Index';

export interface Props {
  navigation: any;
}
function CommanBtnScreen(props: any) {
  return (
    <TouchableOpacity
      style={[styles.commanBtn, props.commanBtnStyle]}
      onPress={() => {
        if (props.onBtnPress) {
          props.onBtnPress();
        }
      }}>
      <Text style={[styles.commanBtnText, props.commanBtnTextStyle]}>
        {props.btnText}
      </Text>
    </TouchableOpacity>
  );
}

export default CommanBtnScreen;
