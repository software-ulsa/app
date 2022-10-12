import React from 'react';
import { SafeAreaView, StatusBar, View } from 'react-native';
// import { colors } from '../../theme';
import Colors from '../../theme/Colors';
import styles from './Styles';

export interface Props {
  children?: any;
  transparentStatusBar?: boolean;
  statusBarColor?: any;
  lightContent?: boolean;
  safeAreaView?: boolean;
  safeAreaViewHeader?: boolean;
  conatinerStyle?: any;
}

export default class Container extends React.Component<Props> {
  render() {
    const {
      children,
      transparentStatusBar,
      statusBarColor,
      lightContent,
      safeAreaView,
      safeAreaViewHeader,
      conatinerStyle
    } = this.props;
    const style: any = {
      flex: 0,
      alignItems: 'center',
      backgroundColor: !transparentStatusBar
        ? statusBarColor || Colors.lighterGray
        : Colors.transparent
    };
    return (
      <>
        <StatusBar
          backgroundColor={
            lightContent
              ? Colors.darkGray
              : statusBarColor || Colors.lighterGray
          }
          barStyle={lightContent ? 'light-content' : 'dark-content'}
        />
        {safeAreaView !== false && <SafeAreaView style={style} />}
        {safeAreaView !== false && safeAreaViewHeader !== false && (
          <SafeAreaView style={[styles.safeViewcontainer, conatinerStyle]}>
            {children}
          </SafeAreaView>
        )}
        {(safeAreaView === false || safeAreaViewHeader === false) && (
          <View
            style={[
              styles.container,
              safeAreaViewHeader === false && styles.statusBarMarginTop
            ]}>
            {children}
          </View>
        )}
      </>
    );
  }
}
