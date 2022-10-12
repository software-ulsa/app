import * as React from 'react';
import { View } from 'react-native';
import { Container, Content, Header } from '../../components';
import ResetPassword from '../../components/SignUpLogIn/ResetPassword';
import CommanBtnScreen from '../../components/CommanBtn/index';
import CommanText from '../../components/SignUpLogIn/CommanText';
import styles from './Styles/ChangePasswordStyle';
import { navigate } from '../../navigation/ReduxNavigation';

export interface Props {
  navigation: any;
}
function ChangePasswordScreen({ navigation }: any) {
  return (
    <Container>
      <Header
        transparent
        hasBackBtn
        title="Change Password"
        onBackPress={() => navigation.goBack()}
      />
      <Content hasHeader contentContainerStyle={styles.container}>
        <View style={styles.signupLoginInputGroup}>
          <CommanText
            commanText="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            commanTextstyle={styles.changePasswordPageText}
          />
          <CommanText
            commanText="Old Password"
            commanTextstyle={styles.inputLabelText}
          />
          <ResetPassword
            passwordInput
            placeholder="Old Password"
            type="default"
            inputStyle={styles.changePasswordInput}
            navigation={navigate}
          />
          <CommanText
            commanText="New Password"
            commanTextstyle={styles.inputLabelText}
          />
          <ResetPassword
            passwordInput
            placeholder="New Password"
            type="default"
            inputStyle={styles.changePasswordInput}
            navigation={navigate}
          />
          <CommanText
            commanText="Confirm Password"
            commanTextstyle={styles.inputLabelText}
          />
          <ResetPassword
            passwordInput
            placeholder="Confirm Password"
            type="default"
            inputStyle={styles.changePasswordInput}
            navigation={navigate}
          />
          <CommanBtnScreen
            btnText="Change Password"
            commanBtnStyle={styles.changePasswordBtn}
            onBtnPress={() => navigation.navigate('Profile')}
          />
        </View>
      </Content>
    </Container>
  );
}

export default ChangePasswordScreen;
