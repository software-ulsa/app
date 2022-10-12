import React, { memo } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import Text from "elements/Text";
import TextInput from "elements/TextInput";
import { Colors } from "configs";
import ButtonBorder from "elements/Buttons/ButtonBorder";
import Theme from "style/Theme";
import AttachItem from "components/BookAppointment/AttachItem";
import { ICON } from "images/Icon";
import Container from "elements/Layout/Container";
import Layout from "elements/Layout/Layout";

interface ConsultQuestionDetailProps {
  style?: ViewStyle;
  attachment?: any;
  question: string;
  onOpenAttachmentModal?: () => void;
  onCloseAttachment?: (item: any) => void;
}

const ConsultQuestionDetail = memo(
  ({
    style,
    attachment,
    question,
    onOpenAttachmentModal,
    onCloseAttachment,
  }: ConsultQuestionDetailProps) => {
    return (
      <Layout style={style}>
        <TextInput
          value={question}
          borderColor={Colors.Red}
          style={styles.question}
          multiline
          editable
        />
        <View style={Theme.flexRowRight}>
          <Text
            size={11}
            lineHeight={14}
            color={Colors.GrayBlue}
            marginRight={16}
            marginBottom={16}
            marginTop={8}
          >
            Mins 60 chars
          </Text>
          <Text
            size={11}
            lineHeight={14}
            color={Colors.GrayBlue}
            marginBottom={16}
            marginTop={8}
          >
            {question.length}/1000
          </Text>
        </View>
        <View>
          {attachment != null ? (
            <AttachItem {...attachment} onClose={onCloseAttachment} />
          ) : (
            <></>
          )}
        </View>
        <ButtonBorder
          iconLeft={ICON.attach}
          iconColor={Colors.DodgerBlue}
          title="Add Attachments"
          color={Colors.GrayBlue}
          onPress={onOpenAttachmentModal}
        />
      </Layout>
    );
  }
);

export default ConsultQuestionDetail;

const styles = StyleSheet.create({
  container: {},
  question: {
    padding: 12,
  },
});
