import {updateObject} from "../../shared/utility";
import * as actionTypes from '../actionTypes';

const initialState = {
    favorites: []
};

const getFavorites = (state, action) => {
    return updateObject(state, {
        favorites: action.favorites
    });
};

const favReducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.GET_COINS_SUCCESS:
            return getFavorites(state, action);
        default:
            return state;
    }
};

export default favReducer;