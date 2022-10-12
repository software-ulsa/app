import React from 'react';
import { View } from 'react-native';
import styles from './Styles';

export interface Props {
  style?: any;
  children?: any;
}

class UserLeft extends React.PureComponent<Props> {
  render() {
    const { style, children } = this.props;
    return <View style={[styles.left, style]}>{children}</View>;
  }
}

export default UserLeft;
