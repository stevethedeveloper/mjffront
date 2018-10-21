import {
    FETCH_DRINK
} from '../actions/types';

export const reducer = (state = [], action) => {

    switch (action.type) {
        case FETCH_DRINK:
            return { ...state, homePageDrinks: action.payload}
        default:
            return state;
    }
};
