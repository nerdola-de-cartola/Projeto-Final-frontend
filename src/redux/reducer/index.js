import handleCart from './handleCart'
import { combineReducers } from "redux";
import handleUser from './handleUser';

const rootReducers = combineReducers({
    handleCart,
    handleUser
})
export default rootReducers