import EStyleSheet from 'react-native-extended-stylesheet';
import { Colors } from '../../../theme';

const styles = EStyleSheet.create({
  profileEditContent: {
    width: '110rem',
    alignSelf: 'center',
    marginBottom: '33rem'
  },
  userEditImageBtn: {
    position: 'absolute',
    right: '8rem',
    bottom: '2rem'
  },
  profileImage: {
    width: '110rem',
    height: '110rem',
    borderRadius: '110rem'
  },
  profileInputStyle: {
    borderBottomWidth: '2rem',
    borderColor: Colors.gray,
    backgroundColor: Colors.transparent,
    borderRadius: 0,
    paddingHorizontal: 0,
    paddingTop: '8rem',
    paddingBottom: '15rem'
  },
  userEditImage: {
    width: '15rem',
    height: '15rem'
  }
});

export default styles;
