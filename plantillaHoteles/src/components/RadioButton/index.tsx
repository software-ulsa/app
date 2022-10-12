import * as React from 'react';
import RadioButtonRN from 'radio-buttons-react-native';
import { Colors } from '../../theme';
import styles from './Styles/Index';

export interface Props {
  navigation: any;
}

function RadioButton(props: any) {
  return (
    <>
      <RadioButtonRN
        data={props.data}
        boxStyle={[styles.radioBtnBoxStyle, props.radioBoxStyle]}
        textStyle={[styles.radioBtnTextStyle, props.radioTextStyle]}
        circleSize={6.5}
        activeColor={Colors.pink}
        deactiveColor={Colors.pink}
      />
    </>
  );
}

export default RadioButton;
