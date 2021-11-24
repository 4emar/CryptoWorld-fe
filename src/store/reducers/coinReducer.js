import {updateObject} from "../../shared/utility";
import * as actionTypes from '../actionTypes';

const initialState = {
    coins: []
};

const getCoins = (state, action) => {
    return updateObject(state,
        {
            coins: action.coins
        });
};

const coinReducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.GET_COINS_SUCCESS:
            return getCoins(state, action);
        default:
            return state;

    }
};

export default coinReducer;