import * as React from 'react';
import { useState, useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import {
  GiftedChat,
  InputToolbar,
  Send,
  Bubble,
  Day
} from 'react-native-gifted-chat';
import { Container, Header } from '../../components';
import ReplayMsg from './ReplayMsg';
import initialMessages from './ChatMsg';
import styles from './Styles/ChatStyle';
import { Colors, Fonts, Images } from '../../theme';
import { isSameDay } from 'react-native-gifted-chat/lib/utils';
import { getMessages } from './ChatApi';

export interface Props {
  navigation: any;
}

// avtar
// export const renderAvatar = (props) => (
//   <Avatar
//     {...props}
//     containerStyle={{ left: { marginRight: 0 }, right: {} }}
//   // imageStyle={{ left: { borderWidth: 3, borderColor: 'blue' }, right: {} }}
//   />
// );

export const renderBubble = (props: any) => {
  if (props.currentMessage._id === 2) {
    return <ReplayMsg msgText={props.currentMessage.text} />;
  } else {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: Colors.white,
            borderColor: Colors.lightGray,
            borderWidth: 1,
            borderTopStartRadius: 12,
            borderTopEndRadius: 12,
            borderBottomStartRadius: 0,
            borderBottomEndRadius: 12
          },
          right: {
            backgroundColor: Colors.pink,
            borderTopStartRadius: 12,
            borderTopEndRadius: 12,
            borderBottomStartRadius: 12,
            borderBottomEndRadius: 0,
            borderWidth: 1,
            borderColor: Colors.pink
          }
        }}
        textStyle={{
          left: {
            color: Colors.black,
            fontSize: 16,
            ...Fonts.style.normalText,
          },
          right: {
            color: Colors.white,
            fontSize: 16,
            ...Fonts.style.normalText
          }
        }}
      />
    );
  }
};

function ChatDetailsScreen({ route, navigation }: any) {

  const {chatId} = route.params

  const [messages, setMessages] : Array<any> = useState();
  const [user,setUser] = useState({_id : "", name : ""})

  async function fetchMessage() {
    let response = await getMessages(chatId)
    await setMessages(response)
    await setUser({
      _id : response[0].sender._id,
      name : response[0].sender.username,
    })
    // await console.log(messages[0]);
  }
  useEffect(() => {
    fetchMessage()
    
    
  }, [getMessages(chatId)]);
  // setUser({
  //   _id : messages[0].sender._id,
  //   name : messages[0].sender.username
  // })
  // console.log(messages)

  const onSend = (newMessages = []) => {
    setMessages((prevMessages: never[] | undefined) => GiftedChat.append(prevMessages, newMessages));
  };

  const renderInputToolbar = (props: any) => {
    return (
      <View style={styles.chatInputBgContainerStyle}>
        <View style={styles.inputBorderView} />
        <InputToolbar
          {...props}
          containerStyle={styles.chatInputContainerStyle}
        />
      </View>
    );
  };

  const renderDay = (props: any) => {
    if (
      props.currentMessage.createdAt &&
      !isSameDay(props.previousMessage, props.previousMessage)
    ) {
      return (
        <View style={styles.dateRowStyle}>
          <View style={[styles.dateRowLins, styles.dateRowLeftLine]} />
          <Day
            {...props}
            textStyle={styles.dateTextStyle}
            containerStyle={styles.dateTextContainerStyle}
          />
          <View style={[styles.dateRowLins, styles.dateRowRightLine]} />
        </View>
      );
    }
  };
  const renderSend = (props: any) => (
    <Send {...props} containerStyle={styles.chatSendBtnContainer}>
      <Image
        style={styles.chatSendBtnImg}
        resizeMode="contain"
        source={Images.ChatSendBtn}
      />
    </Send>
  );

  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Orchad Row House"
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.chatContainer}>
        <GiftedChat
          scrollToBottom
          alwaysShowSend
          wrapInSafeArea
          renderAvatar={() => null}
          messages={messages}
          showAvatarForEveryMessage={false}
          placeholder="Message..."
          user={{
            _id: "628ba6867a37138909dcf84b",
            name : "tuananh1",
          }}
          renderBubble={renderBubble}
          renderDay={renderDay}
          textInputStyle={styles.textInputStyle}
          renderInputToolbar={renderInputToolbar}
          renderSend={renderSend}
          timeTextStyle={[
            styles.chatMsgTimeText,
            {
              left: {
                color: Colors.darkerGray
              },
              right: {
                color: Colors.white
              }
            }
          ]}
          dateFormat={'ddd, DD/MM'}
          onSend={onSend}
        />
      </View>
    </Container>
  );
}

export default ChatDetailsScreen;
