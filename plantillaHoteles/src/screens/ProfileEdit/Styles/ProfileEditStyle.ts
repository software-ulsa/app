import EStyleSheet from 'react-native-extended-stylesheet';
import { Colors, Fonts } from '../../../theme';

const styles = EStyleSheet.create({
  container: {
    paddingBottom: '15rem',
    paddingHorizontal: '20rem'
  },
  profileInputStyle: {
    borderBottomWidth: '2rem',
    borderColor: Colors.gray,
    backgroundColor: Colors.transparent,
    borderRadius: 0,
    paddingHorizontal: 0,
    paddingTop: '8rem',
    paddingBottom: '15rem',
    fontSize: Fonts.size.medium,
    ...Fonts.style.normalText
  },
  inputLabelText: {
    textAlign: 'left',
    color: Colors.darkGray
  },
  govermentIdContactList: {
    borderBottomWidth: '2rem',
    borderColor: Colors.gray,
    flexDirection: 'row',
    paddingTop: '21rem',
    paddingBottom: '16rem'
  },
  govermentIdContactText: {
    color: Colors.darkGray,
    lineHeight: '18rem',
    fontSize: Fonts.size.tiny,
    '@media ios': {
      ...Fonts.style.textInputText
    },
    '@media android': {
      ...Fonts.style.buttonText
    }
  },
  rightArrowImg: {
    width: '9.78rem',
    height: '16rem',
    marginLeft: 'auto'
  },
  profileSaveChangeBtn: {
    width: '165rem',
    marginTop: '37rem',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
});

export default styles;
