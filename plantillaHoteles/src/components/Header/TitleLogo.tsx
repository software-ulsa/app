import React from 'react';
import { View } from 'react-native';
import styles from './Styles';

export interface Props {
  // style?: any;
  // textstyle?: any;
  children?: any;
}

class TitleLogo extends React.PureComponent<Props> {
  render() {
    const { children } = this.props;
    return (
      <>
        <View style={[styles.title]}>{children}</View>
      </>
    );
  }
}

export default TitleLogo;
