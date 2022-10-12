import EStyleSheet from 'react-native-extended-stylesheet';
import { Colors, Fonts } from '../../../theme';

const styles = EStyleSheet.create({
  container: {
    paddingHorizontal: '20rem'
  },
  searchNotifyContent: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: '20rem',
    paddingTop: '13rem'
  },
  notificationBtn: {
    width: '40rem',
    height: '40rem',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10rem',
    backgroundColor: Colors.white,
    borderWidth: '1rem',
    borderColor: Colors.lightGray
  },
  notificationIcon: {
    width: '13.59rem',
    height: '16rem'
  },
  searchInputStyle: {
    width: '100% - 106rem',
    marginRight: 'auto',
    marginBottom: '1rem'
  },
  penddingNotification: {
    position: 'absolute',
    top: '7rem',
    right: '10rem',
    backgroundColor: Colors.pink,
    borderWidth: '2rem',
    borderColor: Colors.white,
    height: '10rem',
    width: '10rem',
    borderRadius: '7.5rem',
    overflow: 'hidden'
  },
  indicatorStyle: {
    width: '6rem',
    height: '6rem',
    backgroundColor: Colors.pink,
    borderRadius: '6rem',
    left: '12%',
    bottom: '5rem'
  },
  tabBarStyle: {
    backgroundColor: Colors.lighterGray,
    marginHorizontal: '20rem',
    elevation: 0,
    shadowOpacity: 0
  },
  labelStyle: {
    color: Colors.darkGray,
    textTransform: 'capitalize',
    margin: 0,
    textAlign: 'center',
    ...Fonts.style.buttonText,
    fontSize: Fonts.size.medium
  },
  tabStyle: {
    padding: 0
  },
  tabViewStyle: {
    flex: 1,
    width: '100%'
  }
});

export default styles;
