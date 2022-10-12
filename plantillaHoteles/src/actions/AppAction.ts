import * as types from './types';

export const initApp = () => {
  return (dispatch: any) => {
    dispatch({
      type: types.INIT_APP,
      payload: {
        name: ''
      }
    });
  };
};

export const goToDetails = () => {
  return (dispatch: any) => {
    dispatch({
      type: types.GO_TO_DETAILS,
      payload: {
        name: 'Chintan'
      }
    });
  };
};
