import {
    FETCH_CONSUMED,
} from '../actions/types';

export const reducer = (state = [], action) => {
    switch (action.type) {
      case FETCH_CONSUMED:
            return { ...state, userConsumed: action.payload}
      default:
            return state;
    }
};
