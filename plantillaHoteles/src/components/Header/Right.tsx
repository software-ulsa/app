import React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import { Images } from '../../theme';
import styles from './Styles';

export interface Props {
  navigation: any;
  onProfilePress?: any;
  userImage?: any;
  filterBtn?: any;
  onFilterBtnPress?: any;
  clearText?: any;
  onclearTextPress?: any;
}

function HeaderRight({
  onProfilePress,
  userImage,
  filterBtn,
  onFilterBtnPress,
  clearText,
  onclearTextPress
}: any) {
  return (
    <>
      {/* // <View style={[styles.right, style]}>
    //   <Text numberOfLines={1} style={styles.txtChildren}>
    //     {children}
    //   </Text>
    //   <Text numberOfLines={1} style={styles.textSubChild}>
    //     of 4
    //   </Text>
    // </View> */}
      {userImage && (
        <TouchableOpacity
          style={styles.userRightImageBtn}
          onPress={() => {
            if (onProfilePress) {
              onProfilePress();
            }
          }}>
          <Image
            source={Images.UserImage}
            resizeMode="contain"
            style={styles.userRightImage}
          />
        </TouchableOpacity>
      )}
      {filterBtn && (
        <TouchableOpacity
          style={styles.filterBtn}
          onPress={() => {
            if (onFilterBtnPress) {
              onFilterBtnPress();
            }
          }}>
          <Image
            source={Images.FilterIcon}
            resizeMode="contain"
            style={styles.filterBtnIcon}
          />
        </TouchableOpacity>
      )}
      {clearText && (
        <TouchableOpacity
          style={styles.clearTextBtn}
          onPress={() => {
            if (onclearTextPress) {
              onclearTextPress();
            }
          }}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      )}
    </>
  );
}

export default HeaderRight;
