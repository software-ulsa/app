import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import Animated, { Value, event, set } from "react-native-reanimated";
import Text from "elements/Text";
import {
  View,
  StyleSheet,
  Modal,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import { Colors, Routes } from "configs";
import AccountItem from "components/AccountItem";
import { ICON } from "images/Icon";
import { useFocusEffect } from "@react-navigation/native";
import keyExtractor from "utils/keyExtractor";
import { AVATAR } from "images/Avatar";
import Theme from "style/Theme";
import { width } from "configs/Const";
import { getBottomSpace } from "react-native-iphone-x-helper";
import SyncHealth from "components/SyncHealth";
import ModalSlideBottom from "components/ModalSlideBottom";
import ModalChangeHealthData from "components/ModalChangeHealthData";
import { LIST_HEALTH_DATA } from "configs/Data";
import useModalAnimation from "hooks/useModalAnimation";
import ModalProcess from "components/ModalProcess";
import ImportSuccessful from "components/BookAppointment/ImportSuccessful";
import ButtonIcon from "elements/Buttons/ButtonIcon";
import MyRecordProgressBar from "components/MyRecord/MyRecordProgressBar";
import Container from "elements/Layout/Container";
import Layout from "elements/Layout/Layout";

const PROFILE = [
  {
    id: 0,
    name: "Nora Shelton",
    avatar: AVATAR.avatar2,
    progress: 78,
  },
  {
    id: 1,
    name: "Devin Shelton",
    avatar: AVATAR.avatar3,
    progress: 28,
  },
  {
    id: 2,
    name: "Other Shelton",
    avatar: AVATAR.avatar3,
    progress: 44,
  },
  {
    id: 3,
    name: "Another Shelton",
    avatar: AVATAR.avatar3,
    progress: 82,
  },
  {
    id: 4,
    name: "Last Shelton",
    avatar: AVATAR.avatar3,
    progress: 100,
  },
];

const MY_RECORD_CATEGORY = [
  {
    id: 0,
    icon: ICON.additionalInformation,
    name: "Basic Information",
    route: Routes.MyRecordBasicInformation,
  },
  {
    id: 1,
    icon: ICON.healthMetric,
    name: "Health Metrics",
    route: Routes.MyRecordHealthMetric,
  },
  {
    id: 2,
    icon: ICON.condition,
    name: "Conditions & Symptoms",
    route: Routes.MyRecordCondition,
    number: "2",
  },
  {
    id: 3,
    icon: ICON.clinicVital,
    name: "Clinical Vitals",
    route: "",
    number: "2",
  },

  {
    id: 4,
    icon: ICON.allergies,
    name: "Allergies",
    route: "",
    number: "2",
  },
  {
    id: 5,
    icon: ICON.vaccination,
    name: "Immunization",
    route: "",
    number: "2",
  },
  {
    id: 6,
    icon: ICON.labTest,
    name: "Lab Results",
    route: "",
    number: "2",
  },
  {
    id: 7,
    icon: ICON.medication,
    name: "Medications",
    route: "",
    number: "2",
  },
  {
    id: 8,
    icon: ICON.procedure,
    name: "Procedures",
    route: "",
    number: "2",
  },
];

export default memo(() => {
  const [myRecord, setMyRecord] = useState<any>([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const profileRef = useRef<FlatList<any>>();

  const [healthData, setHealthData] = useState<any>();
  const { visible, open, close, transY } = useModalAnimation();

  const {
    visible: processVisible,
    open: processOpen,
    close: processClose,
    transY: processTransY,
  } = useModalAnimation();

  const scrollX = React.useRef(new Value(0)).current;

  const opacityAnim = scrollX.interpolate({
    inputRange: [0, width / 2, width],
    outputRange: [0, 0, 1],
  });

  const opacityX = { opacity: opacityAnim };

  useFocusEffect(
    useCallback(() => {
      setMyRecord(MY_RECORD_CATEGORY);
    }, [])
  );

  const onPressPrevProfile = useCallback(() => {
    setCurrentIndex(currentIndex - 1);
    profileRef.current?.scrollToIndex({
      index: currentIndex !== 0 ? currentIndex - 1 : currentIndex,
      animated: true,
    });
  }, [currentIndex, profileRef]);
  const onPressNextProfile = useCallback(() => {
    setCurrentIndex(currentIndex + 1);
    profileRef.current?.scrollToIndex({
      index: currentIndex,
      animated: true,
    });
  }, [currentIndex, profileRef]);

  const healthOpen = () => {
    open();
  };

  const onPressHealthData = useCallback(() => {
    close();
    processOpen();
    setHealthData(LIST_HEALTH_DATA[0]);
  }, []);

  const onCloseHealth = useCallback(() => {
    setHealthData(null);
  }, [healthData]);

  const renderData = [{ id: 0 }, { id: 1, data: myRecord }, { id: 2 }];

  const renderItem = useCallback(({ item }) => {
    const { id, data } = item;
    if (id === 1) {
      return (
        <Layout style={styles.content}>
          {data.map((item: any, index: any) => {
            return <AccountItem key={index} {...item} />;
          })}
        </Layout>
      );
    } else return <View />;
  }, []);

  const renderHeaderItem = useCallback(
    ({ item }) => {
      return (
        <Animated.Image
          style={[
            // opacityX,
            {
              // opacity: item.id == currentIndex ? 2 : 0.5,
              width: 100,
              height: 100,
              marginRight: 50,
            },
          ]}
          source={item.avatar}
        />
      );
    },
    [currentIndex]
  );

  const getHeaderItemLayout = (data: any, index: number) => ({
    length: 150,
    offset: 150 * index,
    index,
  });
  const listHeaderComponent = () => {
    return (
      <>
        <FlatList
          ref={profileRef}
          data={PROFILE}
          renderItem={renderHeaderItem}
          horizontal
          getItemLayout={getHeaderItemLayout}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: width / 2 - 99 }}
          scrollEventThrottle={16}
          keyExtractor={keyExtractor}
        />
        <View style={styles.profile}>
          <ButtonIcon
            borderRadius={8}
            icon="arrowLeft"
            tintColor={Colors.White}
            disabled={currentIndex == 0}
            onPress={onPressPrevProfile}
          />
          <View>
            <Text bold center size={17} lineHeight={20} marginBottom={16}>
              {PROFILE[currentIndex].name}
            </Text>
            <MyRecordProgressBar percent={PROFILE[currentIndex].progress} />
          </View>
          <ButtonIcon
            borderRadius={8}
            icon="arrowRight"
            tintColor={Colors.White}
            disabled={currentIndex == PROFILE.length - 1}
            onPress={onPressNextProfile}
          />
        </View>
      </>
    );
  };
  const listFooterComponent = () => {
    return (
      <Layout style={styles.listFooter}>
        <SyncHealth
          healthData={healthData}
          onOpenHealthModal={healthOpen}
          onCloseHealth={onCloseHealth}
        />
        <Text
          marginHorizontal={48}
          marginTop={24}
          size={11}
          lineHeight={14}
          center
        >
          Last synced: 13:29 PM Jan 04, 2020
        </Text>
        <Text size={11} lineHeight={14} center>
          from Apple Health
        </Text>
      </Layout>
    );
  };

  return (
    <>
      <Container style={styles.container}>
        <Text size={24} bold marginTop={84} marginBottom={12}>
          My Records
        </Text>
        <FlatList
          keyExtractor={keyExtractor}
          data={renderData}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
          ListHeaderComponent={listHeaderComponent}
          renderItem={renderItem}
          ListFooterComponent={listFooterComponent}
        />
      </Container>
      <Modal visible={visible} onRequestClose={close} transparent>
        <ModalSlideBottom onClose={close} transY={transY}>
          <ModalChangeHealthData
            healthData={LIST_HEALTH_DATA}
            onChange={onPressHealthData}
          />
        </ModalSlideBottom>
      </Modal>
      <Modal visible={processVisible} onRequestClose={processClose} transparent>
        <ModalProcess onClose={processClose} transY={processTransY}>
          <ImportSuccessful />
        </ModalProcess>
      </Modal>
    </>
  );
});
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  content: {
    borderRadius: 16,
    paddingVertical: 12,
  },
  profile: {
    ...Theme.flexRowSpace,
    marginTop: 34,
    marginBottom: 40,
  },
  flatList: {
    borderRadius: 12,
    paddingTop: 40,
    paddingBottom: 180 + getBottomSpace(),
  },
  listFooter: {
    padding: 24,
    paddingBottom: 31,
    borderRadius: 16,
    marginTop: 16,
  },
});
