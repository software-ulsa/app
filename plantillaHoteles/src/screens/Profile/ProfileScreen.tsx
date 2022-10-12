import AsyncStorage from '@react-native-community/async-storage';
import * as React from 'react';
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import { Container, Header, Content } from '../../components';
import { navigationRef } from '../../navigation/ReduxNavigation';
import { Images } from '../../theme';
import { getUser } from '../../API/authAPI';
// import { profileList } from '../../assets/data';
import styles from './Styles/ProfileStyle';

export interface Props {
  navigation: any;
}







function ProfileScreen({ navigation }: any) {
  const [user,setUser] : any = React.useState()
  const onClickHandle = async()=>{
    setUser(await getUser())
    if(user != undefined){
      navigation.navigate('Home')
    } 
  }
  const logOut = async() =>{
    try {
      await AsyncStorage.removeItem('@token')
      await navigation.navigate('Login')
    } catch(e) {
      // remove error
    }
  
    console.log('Done.')
}
const profileList = [
  {
    id: 1,
    image: Images.HouseIcon,
    text: 'My Rental Property',
    pageName: ()=>onClickHandle(),
  },
  {
    id: 2,
    image: Images.VerifyIcon,
    text: 'Payment Mathod',
    pageName: 'PaymentMathod'
  },
  {
    id: 3,
    image: Images.LockIcon,
    text: 'Change Password',
    pageName: 'ChangePassword'
  },
  {
    id: 4,
    image: Images.SafetyPluseIcon,
    text: 'Safety Center',
    pageName: 'SafetyCenter'
  },
  {
    id: 5,
    image: Images.QuestionMarkIcon,
    text: 'Help Center',
    pageName: 'HelpCenter'
  },
  {
    id: 6,
    image: Images.DocumentIcon,
    text: 'Terms of Service',
    pageName: 'TermsofService'
  },
  {
    id: 7,
    image: Images.FeedBackIcon,
    text: 'Feedback',
    pageName: 'Feedback'
  },
  {
    id: 8,
    image: Images.PowerOff,
    text: 'Logout',
    pageName: ()=>logOut(),
  }
];
  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.profileLinkList}
      onPress={item.pageName}>
      <Text style={styles.profileLinkText}>{item.text}</Text>
      <Image
        source={item.image}
        resizeMode="contain"
        style={styles.profileLinkImg}
      />
    </TouchableOpacity>
  );
  return (
    <>
      <Container>
        <Header
          transparent
          hasBackBtn
          title="Profile"
          onBackPress={() => navigation.goBack()}
        />
        <Content hasHeader contentContainerStyle={styles.container}>
          <TouchableOpacity
            style={styles.profileEditContent}
            onPress={() => navigation.navigate('ProfileEdit')}>
            <View style={styles.profileImageContent}>
              <Image
                source={Images.UserImage}
                resizeMode="cover"
                style={styles.profileImage}
              />
            </View>
            <View style={styles.userNameEmailText}>
              <Text style={styles.userNameText}>Leesa Oberoy</Text>
              <Text style={styles.userEmailText}>leesaoberoi@gmail.com</Text>
            </View>
            <View style={styles.userEditIcon}>
              <Image
                source={Images.EditIcon}
                resizeMode="contain"
                style={styles.userEditImage}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.profileLinkListContent}>
            <FlatList
              data={profileList}
              renderItem={renderItem}
              bounces={false}
            />
          </View>
        </Content>
      </Container>
    </>
  );
}



export default ProfileScreen;
