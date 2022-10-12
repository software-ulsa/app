import * as React from 'react';
import { Image, View, TextInput } from 'react-native';
import { Images, Colors } from '../../theme';
import styles from './Styles/index';

export interface Props {
  inputStyle?: any;
  placeholder?: any;
  type?: any;
  searchInputStyle?: any;
  onChangeText?: any;
}

function SearchInputScreen({
  inputStyle,
  placeholder,
  type,
  searchInputStyle,
  onChangeText
}: Props) {
  return (
    <>
      <View style={searchInputStyle}>
        <TextInput
          style={[styles.allInputStyle, inputStyle]}
          placeholder={placeholder}
          keyboardType={type}
          placeholderTextColor={Colors.darkGray}
          onChangeText={(text) => {
            if (onChangeText) {
              onChangeText(text);
            }
          }}
        />
        <Image
          source={Images.SearchIcon}
          style={styles.searchIcon}
          resizeMode="contain"
        />
      </View>
    </>
  );
}

export default SearchInputScreen;
