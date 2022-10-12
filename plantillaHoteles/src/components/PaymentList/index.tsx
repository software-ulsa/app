import * as React from 'react';
import { FlatList, TouchableOpacity, Image, View, Text } from 'react-native';
import styles from './Styles/Index';

export interface Props {
  navigation: any;
}
function PaymentList(props: any) {
  const renderItem = ({ item, index }: any) => (
    <TouchableOpacity style={styles.paymentOptionListBtn}>
      <Image
        source={item.paymentImage}
        resizeMode="contain"
        style={styles.paymentOptionCardImg}
      />
      <View>
        <Text style={styles.paymentOptionName}>{item.name}</Text>
        {index === props.paymentOptionSubText && (
          <Text style={styles.paymentOptionSubName}>{item.subName}</Text>
        )}
      </View>
      <Image
        source={item.rightArrow}
        resizeMode="contain"
        style={styles.paymentOptionRightArrowImg}
      />
    </TouchableOpacity>
  );
  return (
    <>
      <FlatList data={props.data} renderItem={renderItem} bounces={false} />
    </>
  );
}

export default PaymentList;
