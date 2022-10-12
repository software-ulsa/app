import * as React from 'react';
import { Image, Text, TouchableOpacity, View, FlatList } from 'react-native';
import SearchInput from '../../components/SearchInput/Index';
import { Container, Content, Header } from '../../components';
import { chatUserIdData } from '../../assets/data';
import styles from './Styles/ChatStyle';
import { getChats } from './ChatApi';
import { useEffect } from 'react';
export interface Props {
  navigation: any;
}



function ChatScreen({ navigation }: any) {
  const [chatList, updateChatList]: any = React.useState()
  async function fetchChat() {
    let response = await getChats()
    updateChatList(response)
  }

  useEffect(() => {
    fetchChat()
  }, [getChats()]);
  // console.log(chatList)

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.chatListLink}
      onPress={() => navigation.navigate('chatDetails',{chatId : item._id})}>
      <Image
        source={{uri : item.users[0].avatar}}
        resizeMode="contain"
        style={styles.chatListUserImg}
      />
      <View style={styles.chatListLinkText}>
        <Text style={styles.chatListLinkNameText}>{item.users[0].username}</Text>
        <Text style={styles.chatListLinkLastSeenText}>{item.latestMessage.content}</Text>
      </View>
    </TouchableOpacity>
  )




  return (
    
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Chat"
        onBackPress={() => navigation.goBack()}
      />
      <SearchInput
        searchInputStyle={styles.searchInputStyle}
        placeholder="Search"
      />
      <Content contentContainerStyle={styles.container}>
        <FlatList
          bounces={false}
          data={chatList}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      </Content>
    </Container>
  );
}

export default ChatScreen;
