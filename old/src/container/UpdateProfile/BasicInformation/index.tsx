import React, { memo, useState, useCallback } from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import Text from "elements/Text";
import Theme from "style/Theme";
import scale from "utils/scale";
import { Routes } from "configs";
import InputApp from "elements/InputApp";
import ButtonLinear from "elements/Buttons/ButtonLinear";
import { useNavigation } from "@react-navigation/native";
import AvatarProfile from "components/UpdateProfile/BasicInformation/AvatarProfile";
import { useLayoutEffect } from "react";
import ButtonIconHeader from "elements/Buttons/ButtonIconHeader";
import Colors from "configs/Colors";
import { ICON } from "images/Icon";
import Container from "elements/Layout/Container";

const BasicInformation = memo(() => {
  const [firstName, setFirstName] = useState("Devin");
  const [lastName, setLastName] = useState("Sheton");

  const { navigate, setOptions } = useNavigation();

  const onGoToOtherInfo = useCallback(() => {
    navigate(Routes.OtherInformation);
  }, [navigate]);
  const onUploadAvatar = useCallback(() => {}, []);
  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerBackground: () => (
        <Container style={{ ...Theme.headerBackGround }} />
      ),
      headerLeft: () => <ButtonIconHeader marginLeft={24} />,
    });
  }, [setOptions]);
  return (
    <Container style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          size={scale(13)}
          lineHeight={scale(16)}
          bold
          marginTop={scale(32)}
        >
          
        </Text>
        <Text
          size={scale(24)}
          lineHeight={scale(28)}
          bold
          marginTop={scale(16)}
        >
          Your Profile
        </Text>
        <Text size={scale(13)} lineHeight={scale(22)} marginTop={scale(16)}>
          Update your profile to get better the answer from
          {"\n"}doctor.
        </Text>
        <AvatarProfile onPress={onUploadAvatar} />
        <InputApp
          title={"First Name"}
          marginTop={scale(38)}
          value={firstName}
          onChangeText={setFirstName}
        />
        <InputApp
          title={"Last Name"}
          marginTop={scale(24)}
          value={lastName}
          onChangeText={setLastName}
        />
        <ButtonLinear
          white
          title={"Continue"}
          children={<Image source={ICON.next} style={styles.buttonChildren} />}
          onPress={onGoToOtherInfo}
          style={styles.buttonLinear}
        />
      </ScrollView>
    </Container>
  );
});

export default BasicInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  buttonChildren: {
    ...Theme.icons,
    marginLeft: scale(8),
  },
  inputApp: {
    marginTop: scale(24),
  },
  firstName: {
    marginTop: scale(38),
  },
  homeAddress: {
    marginTop: scale(32),
  },
  buttonLinear: {
    marginTop: scale(24),
  },
  genders: {
    marginTop: scale(24),
    ...Theme.flexRow,
    ...Theme.center,
  },
});
