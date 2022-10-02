import React, { memo, useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import Text from "elements/Text";
import Theme from "style/Theme";
import scale from "utils/scale";
import { getBottomSpace } from "react-native-iphone-x-helper";
import ButtonArrowRight from "components/OnlineConsult/ButtonArrowRight";
import ContactDoctorItem from "components/ContactDoctorItem";
import { IN_NETWORK } from "configs/Data";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "configs";
import ButtonIconHeader from "elements/Buttons/ButtonIconHeader";
import Colors from "configs/Colors";
import { FlatList } from "react-native-gesture-handler";
import keyExtractor from "utils/keyExtractor";
import Container from "elements/Layout/Container";

const OnlineConsult = memo(() => {
  const { navigate, setOptions } = useNavigation();
  useLayoutEffect(() => {
    setOptions({
      title: null,
      headerBackground: () => (
        <Container style={{ ...Theme.headerBackGround }} />
      ),
      headerLeft: () => <ButtonIconHeader marginLeft={24} />,
    });
  }, [setOptions]);
  const listHeaderComponent = React.useCallback(() => {
    return (
      <Container>
        <ButtonArrowRight
          header={"Private Care Service"}
          content={
            "Consult instantly via live chat/voice/video call from doctors available now."
          }
          noteCost={"Starting from $45 per visit"}
          onPress={() => navigate(Routes.SelectSpecial)}
        />
        <ButtonArrowRight
          header={"Ask a Free Health Question"}
          content={"Get the answers from top doctor in 140 precialties."}
          noteCost={"Starting from $45 per visit"}
        />
        <Text
          size={17}
          lineHeight={20}
          bold
          marginTop={scale(32)}
          marginBottom={scale(8)}
        >
          Available Care Team
        </Text>
      </Container>
    );
  }, []);
  const renderItem = React.useCallback(({ item }) => {
    return <ContactDoctorItem style={styles.item} verified={true} {...item} />;
  }, []);
  return (
    <Container style={styles.container}>
      <Text
        size={24}
        lineHeight={28}
        bold
        marginBottom={scale(8)}
        marginTop={scale(24)}
      >
        Online Consults
      </Text>
      <FlatList
        data={IN_NETWORK}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={listHeaderComponent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: scale(16),
          paddingBottom: getBottomSpace() + scale(16),
        }}
      />
    </Container>
  );
});

export default OnlineConsult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  frame: {
    paddingBottom: scale(24),
  },
  item: {
    marginTop: scale(16),
  },
});
