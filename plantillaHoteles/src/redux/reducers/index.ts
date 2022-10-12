import { combineReducers } from 'redux';
import AppReducer, { appStateIF } from './AppReducer';
import NavigationReducer from './NavigationReducer';

export interface reducerStateIF {
  app: appStateIF;
  nav: any;
}

export default combineReducers({ app: AppReducer, nav: NavigationReducer });
