import EStyleSheet from 'react-native-extended-stylesheet';
import { Colors } from '../../../theme';

const styles = EStyleSheet.create({
  profileInputStyle: {
    borderBottomWidth: '2rem',
    borderColor: Colors.gray,
    backgroundColor: Colors.transparent,
    borderRadius: 0,
    marginBottom: 0,
    paddingLeft: 0,
    paddingRight: '25rem',
    paddingTop: '8rem',
    paddingBottom: '15rem'
  },
  inputLabelText: {
    textAlign: 'left',
    color: Colors.darkGray
  },
  datePickerIconStyle: {
    width: '13.6rem',
    height: '15rem',
    position: 'absolute',
    top: '8rem',
    right: '3.4rem'
  }
});

export default styles;
