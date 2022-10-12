import EStyleSheet from 'react-native-extended-stylesheet';
import { Colors, Fonts } from '../../../theme';

const styles = EStyleSheet.create({
  commanBtn: {
    backgroundColor: Colors.pink,
    padding: '12rem',
    borderRadius: '12rem',
    shadowOffset: {
      width: '1rem',
      height: '10rem'
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20,
    shadowColor: Colors.blurPink
  },
  commanBtnText: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: Fonts.size.h4,
    ...Fonts.style.boldText
  }
});

export default styles;
