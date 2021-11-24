import { combineReducers } from 'redux'
import authReducer from "./authReducer";
import coinReducer from "./coinReducer";
import favReducer from "./favReducer";

export default combineReducers({
    authReducer: authReducer,
    coinReducer: coinReducer,
    favReducer: favReducer
})
