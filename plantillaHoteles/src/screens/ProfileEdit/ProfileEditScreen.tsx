import * as React from 'react';
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import { Container, Header, Content } from '../../components';
import { Images } from '../../theme';
import { profileInputList } from '../../assets/data';
import TextInput from '../../components/SignUpLogIn/TextInput';
import CommanText from '../../components/SignUpLogIn/CommanText';
import DatePickerInput from '../../components/DatePickerInput';
import ProfilePhoto from '../../components/ProfilePhoto';
import { navigate } from '../../navigation/ReduxNavigation';
import CommanBtnScreen from '../../components/CommanBtn';
import styles from './Styles/ProfileEditStyle';

export interface Props {
  navigation: any;
}

function ProfileEditScreen({ navigation }: any) {
  const renderItem = ({ item }: any) => (
    <View>
      <CommanText
        commanText={item.labelText}
        commanTextstyle={styles.inputLabelText}
      />
      <TextInput
        defaultInput
        navigation={navigate}
        inputStyle={styles.profileInputStyle}
        placeholder={item.labelText}
        type={item.inputType}
      />
    </View>
  );
  return (
    <>
      <Container>
        <Header
          transparent
          hasBackBtn
          title="Profile Edit"
          onBackPress={() => navigation.goBack()}
        />
        <Content hasHeader contentContainerStyle={styles.container}>
          <ProfilePhoto source={0} />
          <View>
            <FlatList
              data={profileInputList.slice(0, 3)}
              renderItem={renderItem}
              bounces={false}
            />
          </View>
          <CommanText
            commanText="Birth Date"
            commanTextstyle={styles.inputLabelText}
          />
          <DatePickerInput />
          <View>
            <TouchableOpacity
              style={styles.govermentIdContactList}
              onPress={() => navigation.navigate('IdentityVerification')}>
              <Text style={styles.govermentIdContactText}>Goverment ID</Text>
              <Image
                source={Images.ViewAllArrow}
                resizeMode="contain"
                style={styles.rightArrowImg}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.govermentIdContactList}
              onPress={() => navigation.navigate('EmergencyContact')}>
              <Text style={styles.govermentIdContactText}>
                Emergency Contact
              </Text>
              <Image
                source={Images.ViewAllArrow}
                resizeMode="contain"
                style={styles.rightArrowImg}
              />
            </TouchableOpacity>
          </View>
          <CommanBtnScreen
            btnText="Save Changes"
            commanBtnStyle={styles.profileSaveChangeBtn}
            onBtnPress={() => navigation.navigate('Home')}
          />
        </Content>
      </Container>
    </>
  );
}

export default ProfileEditScreen;
