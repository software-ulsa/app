import React from 'react';
import { View, Text } from 'react-native';
import styles from './Styles/Index';

const Label = ({ text, ...restProps }: any) => {
  return (
    <View style={styles.lableContainer} {...restProps}>
      <Text style={styles.lableText}>${text}</Text>
    </View>
  );
};

export default Label;
