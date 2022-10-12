import * as React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { Images } from '../../theme';
import styles from './Styles/Index';

export interface Props {
  navigation: any;
  headingText?: any;
  headingBtn?: any;
  heading?: any;
  moreBtn?: any;
  morBtnStyle?: any;
  commanHeadingContainerStyle?: any;
  onMoreBtnPress?: any;
  headingCollapseBtn?: any;
  arrowIcon?: any;
  arrowIconStyle?: any;
}
function CommanHeadingScreen({
  headingText,
  headingBtn,
  heading,
  moreBtn,
  morBtnStyle,
  commanHeadingContainerStyle,
  onMoreBtnPress,
  headingCollapseBtn,
  arrowIcon,
  arrowIconStyle
}: Props) {
  return (
    <>
      {headingText && (
        <View
          style={[styles.commanHeadingContainer, commanHeadingContainerStyle]}>
          <Text style={styles.commanHeadingText}>{heading}</Text>
        </View>
      )}
      {headingBtn && (
        <View
          style={[styles.commanHeadingContainer, commanHeadingContainerStyle]}>
          <Text style={styles.commanHeadingText}>{heading}</Text>
          <TouchableOpacity
            style={styles.viewallBtn}
            onPress={() => {
              if (onMoreBtnPress) {
                onMoreBtnPress();
              }
            }}>
            <Text style={[styles.morBtnText, morBtnStyle]}>{moreBtn}</Text>
            <Image
              source={Images.ViewAllArrow}
              style={styles.rightArrow}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      )}
      {headingCollapseBtn && (
        <View
          style={[styles.commanHeadingContainer, commanHeadingContainerStyle]}>
          <Text style={styles.commanHeadingText}>{heading}</Text>
          <TouchableOpacity
            style={styles.viewallBtn}
            onPress={() => {
              if (onMoreBtnPress) {
                onMoreBtnPress();
              }
            }}>
            <Image
              source={arrowIcon}
              style={arrowIconStyle}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

export default CommanHeadingScreen;
