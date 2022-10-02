import React, { memo, useCallback, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Text from "elements/Text";
import ButtonIconHeader from "elements/Buttons/ButtonIconHeader";
import { Colors, Routes } from "configs";
import { useNavigation } from "@react-navigation/native";
import TextInput from "elements/TextInput";
import ButtonLinear from "elements/Buttons/ButtonLinear";
import { ICON } from "images/Icon";
import Container from "elements/Layout/Container";
import scale from "utils/scale";
import Theme from "style/Theme";
import { useTheme } from "configs/Theme";
export default memo(() => {
  const { setOptions, navigate } = useNavigation();
  const [name, setName] = useState<string>("Devin Shelton");
  const [email, setEmail] = useState<string>("sampleEmail@timistudio");
  const { theme } = useTheme();

  const onChangeName = useCallback((value) => {
    setName(value);
  }, []);

  const onChangeEmail = useCallback((value) => {
    setEmail(value);
  }, []);

  const onGetButton = () => {
    navigate(Routes.InviteFriendForFriend);
  };
  const onIconEmailPress = () => {
    setEmail("");
  };
  const onIconNamePress = () => {
    setName("");
  };
  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerStyle: {
        shadowColor: "transparent",
        shadowRadius: 0,
        shadowOffset: { height: 0 },
        elevation: 0,
        backgroundColor: theme.background,
      },
      headerLeft: () => <ButtonIconHeader marginLeft={24} />,
    });
  }, [setOptions]);

  return (
    <Container style={styles.container}>
      <Text bold size={24} marginTop={24} marginBottom={40}>
        Get $15 for You!
      </Text>
      <Text marginBottom={4}>Full Name</Text>
      <TextInput
        placeholder={"Full Name"}
        editable
        onChangeText={onChangeName}
        borderColor={Colors.WhiteSmoke}
        value={name}
        isShowIconLeft
        isShowIcon={name.length != 0}
        icon={
          <TouchableOpacity
            activeOpacity={0.54}
            style={styles.iconCloseStyle}
            onPress={onIconNamePress}
          >
            <Image
              source={ICON.close}
              tintColor={Colors.White}
              style={styles.iconClose}
            />
          </TouchableOpacity>
        }
      />
      <Text marginTop={24} marginBottom={4}>
        Email
      </Text>
      <TextInput
        placeholder={"Your friend Email"}
        editable
        onChangeText={onChangeEmail}
        borderColor={Colors.WhiteSmoke}
        value={email}
        isShowIconLeft
        isShowIcon={email.length != 0}
        icon={
          <TouchableOpacity
            activeOpacity={0.54}
            style={styles.iconCloseStyle}
            onPress={onIconEmailPress}
          >
            <Image
              source={ICON.close}
              tintColor={Colors.White}
              style={styles.iconClose}
            />
          </TouchableOpacity>
        }
      />
      <ButtonLinear
        title="Get It!"
        onPress={onGetButton}
        styleButton={styles.button} white
      >
        <Image style={styles.icon} source={ICON.next} />
      </ButtonLinear>
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    flex: 1,
  },
  icon: {
    marginLeft: 8,
  },
  button: {
    marginTop: scale(24),
  },
  iconClose: {
    width: 9,
    height: 9,
  },
  iconCloseStyle: {
    width: 14,
    height: 14,
    ...Theme.center,
    backgroundColor: Colors.GrayBorder4,
    borderRadius: 30,
  },
});
