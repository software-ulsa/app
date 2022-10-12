import * as React from 'react';
import { useState } from 'react';
import { View, Image } from 'react-native';
import DatePicker from 'react-native-date-picker';
import TextInput from '../SignUpLogIn/TextInput';
import { navigate } from '../../navigation/ReduxNavigation';
import { Images } from '../../theme';
import styles from './Styles/index';

export interface Props {
  navigation: any;
}

function DatePickerInput(props: any) {
  const [date1, setDate1] = useState(new Date());
  const [open, setOpen] = useState(false);
  return (
    <>
      <View>
        <TextInput
          datePickerInput
          navigation={navigate}
          inputStyle={[styles.profileInputStyle, props.datePickerInputStyle]}
          placeholder="Birth Date"
          type="default"
          value={new Date(date1)}
          onPress={() => setOpen(true)}
        />
        <Image
          source={Images.DatePickerIcon}
          resizeMode="contain"
          style={styles.datePickerIconStyle}
        />
      </View>
      <DatePicker
        modal
        open={open}
        date={date1}
        mode="date"
        onConfirm={(date) => {
          setOpen(false);
          setDate1(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
}

export default DatePickerInput;
