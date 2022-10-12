import * as React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import CommanHeading from '../CommanHeading';
import CommanText from '../SignUpLogIn/CommanText';
import { Images } from '../../theme';
import styles from './Styles/Index';
import { navigate } from '../../navigation/ReduxNavigation';

export interface Props {
  navigation: any;
  BokkingPaymentDetailsHeading?: any;
  BokkingPaymentDetailsHeadingStyle?: any;
  BokkingPaymentDetailsContentStyle?: any;
}
function BokkingPaymentDetailsScreen({
  BokkingPaymentDetailsHeading,
  BokkingPaymentDetailsHeadingStyle,
  BokkingPaymentDetailsContentStyle
}: Props) {
  return (
    <>
      <View style={BokkingPaymentDetailsContentStyle}>
        <CommanHeading
          headingText
          heading={BokkingPaymentDetailsHeading}
          commanHeadingContainerStyle={BokkingPaymentDetailsHeadingStyle}
          navigation={navigate}
        />
        <View style={styles.paymentDetailRow}>
          <Image
            source={Images.PaymentCardIcon}
            resizeMode="contain"
            style={styles.paymentCardIcon}
          />
          <Text style={styles.paymentCardName}>Credit or Debit Card</Text>
          <TouchableOpacity style={styles.paymentCardEditBtn}>
            <Text style={styles.paymentCardEditText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

export default BokkingPaymentDetailsScreen;
