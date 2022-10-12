import React, { memo, useLayoutEffect, useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Colors, Routes } from "configs";
import Theme from "style/Theme";
import scale from "utils/scale";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Text from "elements/Text";
import { DATA_CONDITION } from "configs/Data";
import changeAlias from "utils/stringAlias";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import SearchBox from "elements/SearchBox";
import ButtonText from "elements/Buttons/ButtonText";
import keyExtractor from "utils/keyExtractor";
import { useTheme } from "configs/Theme";
import Layout from "elements/Layout/Layout";
import Container from "elements/Layout/Container";

const HealthSearch = memo(({ route }: any) => {
  const { theme } = useTheme();
  const { navigate, setOptions, goBack } = useNavigation();
  const [dataCondition, setDataCondition] = useState(DATA_CONDITION);
  const [searchKey, setSearchKey] = React.useState<string>("");
  const [go, setGo] = React.useState<string>(Routes.HealthQuestion);
  const searchCondition = React.useCallback((text: string) => {
    setSearchKey(text);
    if (text === "" || text === null || text === undefined) {
      setDataCondition(DATA_CONDITION);
    } else {
      let data = [];
      for (let i = 0; i < DATA_CONDITION.length; i++) {
        if (changeAlias(DATA_CONDITION[i].name).includes(changeAlias(text))) {
          data.push(DATA_CONDITION[i]);
        }
      }
      setDataCondition(data);
    }
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      if (route && route.params && route.params.route) {
        setGo(route.params.route);
      }
    }, [route.params?.item])
  );
  useLayoutEffect(() => {
    setOptions({
      headerStyle: {
        shadowColor: "transparent",
        backgroundColor: theme.backgroundHeader,
      },
      header: () => (
        <Layout style={styles.header}>
          <SearchBox
            borderColor={Colors.TiffanyBlue}
            value={searchKey}
            onChangeText={searchCondition}
            autoFocus={true}
            style={styles.box}
            placeholder={"Search condition..."}
            placeholderTextColor={Colors.GrayBlue}
          />
          <ButtonText
            blueLight
            style={[styles.buttonCancel, { borderColor: theme.backgroundItem }]}
            // @ts-ignore
            bold
            title={"Cancel"}
            marginLeft={24}
            onPress={() => goBack()}
          />
        </Layout>
      ),
    });
  }, [setOptions, searchKey, searchCondition]);

  const handlePressItem = (item: any) => {
    navigate(go, { item });
  };

  const renderItem = ({ item }: any) => {
    const { name } = item;
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => handlePressItem(item)}
      >
        <Text type="H5" bold>
          {name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Container style={styles.container}>
      <FlatList
        data={dataCondition}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </Container>
  );
});
export default HealthSearch;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textSearch: {
    ...Theme.flexOne,
  },
  contentContainerStyle: {
    paddingTop: 32,
    paddingBottom: getBottomSpace() + 16,
    paddingHorizontal: 24,
  },
  header: {
    ...Theme.flexRow,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: getStatusBarHeight() + 24,
  },
  buttonCancel: {
    marginLeft: 24,
    marginBottom: 28,
  },
  item: {
    paddingVertical: 16,
  },
  box: {
    width: scale(255),
    height: scale(48),
  },
});
