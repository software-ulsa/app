import * as types from '../../actions/types';

export interface appStateIF {
  name: string;
}

const initialState: appStateIF = {
  name: ''
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.INIT_APP:
    case types.GO_TO_DETAILS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default reducer;
