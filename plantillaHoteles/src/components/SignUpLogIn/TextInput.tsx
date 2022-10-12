import * as React from 'react';
import { useState } from 'react';
import { TextInput, Image, View, TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';
import { Images, Colors } from '../../theme';
import styles from './Styles/index';

export interface Props {
  navigation: any;
  Heading?: string;
  Peregraph?: string;
  defaultInput?: any;
  passwordInput?: any;
  datePickerInput?: any;
  inputStyle?: any;
  placeholder?: any;
  type?: any;
  passwordStyle?: any;
  onPress?: any;
  value?: any;
  onChangeText ?: (text : string) => void;
}

function TextInputScreen({
  defaultInput,
  passwordInput,
  datePickerInput,
  inputStyle,
  placeholder,
  type,
  onChangeText,
  passwordStyle,
  onPress,
  value
}: Props) {
  const [showPassword, setShowPassword] = useState(true);
  // console.log('balueeee----',value?.toString())
  return (
    <>
      {defaultInput && (
        <TextInput
          style={[styles.allInputStyle, inputStyle]}
          placeholder={placeholder}
          keyboardType={type}
          placeholderTextColor={Colors.darkGray}
          onChangeText={onChangeText}
        />
      )}
      {passwordInput && (
        <View style={passwordStyle}>
          <TextInput
            style={[styles.allInputStyle, inputStyle]}
            placeholder={placeholder}
            keyboardType={type}
            secureTextEntry={showPassword}
            placeholderTextColor={Colors.darkGray}
            onChangeText={onChangeText}
          />
          <TouchableOpacity
            style={styles.passwordEyeImgBtn}
            onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? Images.HideEye : Images.OpenEye}
              style={styles.passwordEyeImg}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      )}
      {datePickerInput && (
        <TextInput
          style={[styles.allInputStyle, inputStyle]}
          placeholder={placeholder}
          keyboardType={type}
          onChangeText={onChangeText}
          placeholderTextColor={Colors.darkGray}
          value={
            value
              ? dayjs().format('DD MMMM YYYY')
              : dayjs().format('DD MMMM YYYY')
          }
          onFocus={() => {
            if (onPress) {
              onPress();
            }
          }}
        />
      )}
    </>
  );
}

export default TextInputScreen;
