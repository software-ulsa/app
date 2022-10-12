/**
 * Project: Flash NextGen
 * Root Component
 */

import React from 'react';
import {
  View,
  StatusBar,
  Dimensions,
  // Text,
  // TextInput,
  LogBox
} from 'react-native';
import { Provider } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { NavigationContainer } from '@react-navigation/native';
import store from './store';
import AppNavigation from './navigation/AppNavigation';
import { navigationRef, isReadyRef } from './navigation/ReduxNavigation';
import Styles from './theme/AppStyles';

// import KeyboardManager from 'react-native-keyboard-manager';
// if (Platform.OS === 'ios') {
//   KeyboardManager.setEnableAutoToolbar(true);
//   KeyboardManager.setToolbarDoneBarButtonItemText('Done');
//   KeyboardManager.setShouldShowToolbarPlaceholder(false);
//   KeyboardManager.setShouldToolbarUsesTextFieldTintColor(true);
// }

LogBox.ignoreAllLogs();

const { width } = Dimensions.get('window');

EStyleSheet.build({ $rem: width / 375 });

// Disable font scaling
// Text.defaultProps = Text.defaultProps || {};
// Text.defaultProps.allowFontScaling = false;

// TextInput.defaultProps = TextInput.defaultProps || {};
// TextInput.defaultProps.allowFontScaling = false;

const Root = () => (
  <View style={Styles.rootContainer}>
    <StatusBar
      translucent
      barStyle="dark-content"
      backgroundColor="transparent"
    />
    <Provider store={store}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          isReadyRef.current = true;
        }}>
        <AppNavigation />
      </NavigationContainer>
    </Provider>
  </View>
);

export default Root;
