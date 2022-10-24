import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets } from '@react-navigation/stack';
import { LogBox } from 'react-native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import Tabbar from "./components/bottomTabBarScreen";
import LoadingScreen from "./components/loadingScreen";
import AccountScreen from "./screens/account/accountScreen";
import AttachmentFullViewScreen from "./screens/attachmentFullView/attachmentFullViewScreen";
import SigninScreen from "./screens/auth/signinScreen";
import VerificationScreen from "./screens/auth/verificationScreen";
import WelcomeScreen from "./screens/auth/welcomeScreen";
import CallingScreen from "./screens/calling/callingScreen";
import ChatDetailScreen from "./screens/chatDetail/chatDetailScreen";
import DeleteAccountScreen from "./screens/deleteAccount/deleteAccountScreen";
import DisplayImageFullViewScreen from "./screens/displayImageFullView/displayImageFullViewScreen";
import GroupDetailScreen from "./screens/groupDetail/groupDetailScreen";
import GroupInfoScreen from "./screens/groupInfo/groupInfoScreen";
import GroupMessagesScreen from "./screens/groupMessages/groupMessagesScreen";
import MediaFullViewScreen from "./screens/mediaFullView/mediaFullViewScreen";
import MessagesScreen from "./screens/messages/messagesScreen";
import NewGroupScreen from "./screens/newGroup/newGroupScreen";
import PrivacyScreen from "./screens/privacy/privacyScreen";
import PrivacyPolicyScreen from "./screens/privacyPolicy/privacyPolicyScreen";
import ProfileScreen from "./screens/profile/profileScreen";
import SelectContactScreen from "./screens/selectContact/selectContactScreen";
import TermsOfUseScreen from "./screens/termsOfUse/termsOfUseScreen";
import VideoCallingScreen from "./screens/videoCalling/videoCallingScreen";

LogBox.ignoreAllLogs();

const Stack = createSharedElementStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        <Stack.Screen name="BottomTabBar" component={Tabbar} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="SelectContact" component={SelectContactScreen} />
        <Stack.Screen name="NewGroup" component={NewGroupScreen} />
        <Stack.Screen name="GroupInfo" component={GroupInfoScreen} />
        <Stack.Screen name="Messages" component={MessagesScreen} />
        <Stack.Screen name="Calling" component={CallingScreen} />
        <Stack.Screen name="VideoCalling" component={VideoCallingScreen} />
        <Stack.Screen name="GroupMessages" component={GroupMessagesScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen}
          sharedElements={(route) => {
            const id = route.params.id;
            return [id];
          }}
        />
        <Stack.Screen name="Account" component={AccountScreen} />
        <Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} />
        <Stack.Screen name="Privacy" component={PrivacyScreen} />
        <Stack.Screen name="ChatDetail" component={ChatDetailScreen} />
        <Stack.Screen name="MediaFullView" component={MediaFullViewScreen}
          sharedElements={(route) => {
            const item = route.params.item;
            return [item.id];
          }}
        />
        <Stack.Screen name="GroupDetail" component={GroupDetailScreen} />
        <Stack.Screen name="DisplayImageFullView" component={DisplayImageFullViewScreen}
          sharedElements={(route) => {
            const item = route.params.item;
            return [item.id];
          }}
        />
        <Stack.Screen name="AttachmentFullView" component={AttachmentFullViewScreen}
          sharedElements={(route) => {
            const item = route.params.item;
            return [item.id];
          }}
        />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        <Stack.Screen name="TermsOfUse" component={TermsOfUseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;