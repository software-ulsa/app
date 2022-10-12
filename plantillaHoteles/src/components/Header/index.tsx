import React from 'react';
import { View, Image, Text } from 'react-native';
import styles from './Styles';
import HeaderLeft from './Left';
import HeaderLeftLoaction from './LeftLocation';
import HeaderRight from './Right';
import HeaderTitle from './Title';
import TitleLogo from './TitleLogo';
import UserLeft from './UserLeft';
import { Images } from '../../theme';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface Props {
  style?: any;
  children?: any;
  transparent?: boolean;
  title?: string;
  titleStyle?: any;
  hasBackBtn?: boolean;
  hasLocation?: boolean;
  onBackPress?: any;
  navigation?: any;
  hasLogoTitle?: boolean;
  onLocationPress?: any;
  onProfilePress?: any;
  clearText?: any;
  onclearTextPress?: any;
  filterBtn?: any;
  onFilterBtnPress?: any;
}

export default class Header extends React.PureComponent<Props> {
  static TITLE = HeaderTitle;

  static LEFT = HeaderLeft;

  static LeftLocation = HeaderLeftLoaction;

  static RIGHT = HeaderRight;

  static Logo = TitleLogo;

  static User = UserLeft;

  render() {
    const {
      style,
      children,
      transparent,
      hasBackBtn,
      hasLocation,
      navigation,
      title,
      titleStyle,
      onBackPress,
      onLocationPress,
      onProfilePress,
      clearText,
      onclearTextPress,
      filterBtn,
      onFilterBtnPress
    } = this.props;
    return (
      <>
        <View style={[styles.header, style, transparent && styles.transparent]}>
          {hasBackBtn && (
            <HeaderLeft>
              <TouchableOpacity
                style={styles.backBtn}
                onPress={() => {
                  if (onBackPress) {
                    onBackPress();
                  } else if (navigation) {
                    navigation.goBack();
                  }
                }}>
                <Image
                  source={Images.LeftArrowBlack}
                  style={styles.leftArrow}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </HeaderLeft>
          )}

          {hasLocation && (
            <HeaderLeftLoaction
              onLocationPress={() => {
                if (onLocationPress) {
                  onLocationPress();
                }
              }}
            />
          )}

          {/* {userIcon && (
            <UserLeft>
              <View style={styles.userIcon}>
                <TouchableOpacity>
                  <Image
                    source={Images.coin}
                    style={styles.userIconImg}
                    // resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </UserLeft>
          )} */}

          {title && <HeaderTitle style={titleStyle}>{title}</HeaderTitle>}
          {/* {centerLogo && (
            <TitleLogo>
              <Image
                source={Images.efftTitleWhite}
                style={styles.flaseTitle}
                resizeMode="contain"
              />
            </TitleLogo>
          )} */}
          {children && (
            <HeaderRight
              userImage
              onProfilePress={() => {
                if (onProfilePress) {
                  onProfilePress();
                }
              }}>
              {/* {children} */}
            </HeaderRight>
          )}
          {clearText && (
            <HeaderRight
              clearText
              onFilterBtnPress={() => {
                if (onclearTextPress) {
                  onclearTextPress();
                }
              }}
            />
          )}
          {filterBtn && (
            <HeaderRight
              filterBtn
              onFilterBtnPress={() => {
                if (onFilterBtnPress) {
                  onFilterBtnPress();
                }
              }}
            />
          )}
        </View>
      </>
    );
  }
}
