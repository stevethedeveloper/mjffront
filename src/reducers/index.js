import { combineReducers } from 'redux';
import { reducer as authReducer } from './auth';
import { reducer as drinkReducer } from './drink';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    drinks: drinkReducer
});

export default rootReducer;
