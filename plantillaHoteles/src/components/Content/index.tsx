import React from 'react';
import { Keyboard } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './Styles';

export interface Props {
  contentContainerStyle?: any;
  style?: any;
  children?: any;
  hasHeader?: boolean;
  extraScrollHeight?: number;
  showsVerticalScrollIndicator?: boolean;
  disableKBDismissScroll?: boolean;
  enableResetScrollToCoords?: boolean;
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled' | undefined;
  scrollEnabled?: boolean;
  isBottomSheet?: any;
}

interface State {
  isVisible: boolean;
}

class Content extends React.Component<Props, State> {
  keyboardWillShowSub: any;

  keyboardWillHideSub: any;

  rootRef: any;

  scrollviewRef: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      isVisible: true
    };
  }

  componentDidMount = () => {
    this.keyboardWillShowSub = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardWillShow
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardWillHide
    );
  };

  componentWillUnmount = () => {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  };

  keyboardWillShow = () => {
    this.setState({ isVisible: false });
  };

  keyboardWillHide = () => {
    this.setState({ isVisible: true });
  };

  getStyle = (): any => {
    const { style } = this.props;
    const tmpStyle: any = [styles.content];
    if (style) {
      tmpStyle.push(style);
    }
    return tmpStyle;
  };

  getContentContainerStyle = (): any => {
    const { contentContainerStyle, hasHeader } = this.props;
    const style: any = [styles.contentContainerStyle];
    if (contentContainerStyle) {
      style.push(contentContainerStyle);
    }
    if (hasHeader === false) {
      style.push({ paddingTop: 0 });
    }
    return style;
  };

  render = () => {
    const {
      children,
      extraScrollHeight,
      showsVerticalScrollIndicator,
      disableKBDismissScroll,
      keyboardShouldPersistTaps,
      scrollEnabled,
      isBottomSheet
    } = this.props;

    const style = this.getStyle();
    const contentContainerStyle = this.getContentContainerStyle();
    const ScrollComponent = isBottomSheet ? ScrollView : KeyboardAwareScrollView
    return (
      <ScrollComponent
        enableResetScrollToCoords
        scrollEnabled={scrollEnabled}
        bounces={false}
        automaticallyAdjustContentInsets={false}
        resetScrollToCoords={
          disableKBDismissScroll ? undefined : { x: 0, y: 0 }
        }
        keyboardShouldPersistTaps={keyboardShouldPersistTaps || 'handled'}
        ref={(c: any) => {
          this.scrollviewRef = c;
          this.rootRef = c;
        }}
        style={style}
        contentContainerStyle={contentContainerStyle}
        extraScrollHeight={extraScrollHeight || 81}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator || false}>
        {children}
      </ScrollComponent>
    );
  };
}

export default Content;
