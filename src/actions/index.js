import axios from 'axios';
import History from '../history.js';
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_DRINK,
    FETCH_CONSUMED
} from './types';

const ROOT_URL = 'http://test.stevethedeveloper.com/api';

export const signinUser = ({ email, password }) => {
    return (dispatch) => {
        // submit email/password to the server
        axios.post(`${ROOT_URL}/login`, { email, password })
            .then(response => {

                // if request is good...
                // - update state to indicate user is authenticated
                dispatch({ type: AUTH_USER });

                // - save the jwt token
                localStorage.setItem('token', response.data.token);

                // - redirect to the route '/drink'
                History.push('/drink');

            }).catch(() => {
                // if request is bad...
                // - show an error to the user
                dispatch(authError('Invalid Login'));
            });
    };
};

export const signupUser = ({ user_name, email, password }) => {
    return (dispatch) => {
        // submit email/password to the server
        axios.post(`${ROOT_URL}/register`, { user_name, email, password })
            .then(response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.token);
                History.push('/drink');
            })
            .catch(err => {
                dispatch(authError(err.response.data.error));
            });
    };
};

export const authError = (error) => {
    return {
        type: AUTH_ERROR,
        payload: error
    };
};

export const signoutUser = () => {
    localStorage.removeItem('token')
    return { type: UNAUTH_USER };
};

export const fetchDrink = () => {
    return (dispatch) => {
        axios.get(ROOT_URL + '/drinks', {
            headers: { Authorization: 'Bearer' + localStorage.getItem('token') }
        })
        .then(response =>{
            dispatch({
                type: FETCH_DRINK,
                payload: response.data
             });
        });
    };
};

export function fetchConsumed() {
    return (dispatch) => {
        axios.get(ROOT_URL + '/get_user_consumed', {
            headers: { Authorization: 'Bearer' + localStorage.getItem('token') }
        })
        .then(response =>{
            dispatch({
                type: FETCH_CONSUMED,
                payload: response.data.user.consumed_total
             });
        });
    };
};

export const addConsumed = (drink_id, servings_consumed) => {
    return (dispatch) => {
        // Submit consumed record
        axios.post(`${ROOT_URL}/consumed`, { drink_id, servings_consumed }, {
              headers: { Authorization: 'Bearer' + localStorage.getItem('token') }
        })
        .then(response => {
            dispatch(fetchConsumed());
            //dispatch({type: ADD_CONSUMED});
            //History.push('/drinks');
        })
        .catch(err => {
            //dispatch(authError(err.response.data.error));
        });
    };
};
