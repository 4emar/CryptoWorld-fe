import {API_DRIVER, setAuthToken} from "../../config";
import * as actionTypes from '../actionTypes'
import store from "../store";


export const getCoins = () => {
    let state = store.getState().coinReducer;
    return dispatch => {
        API_DRIVER.get("api/coins", {params: {
            id: state.id
            }})
            .then(response => {
                dispatch({
                    type: actionTypes.GET_COINS_SUCCESS,
                    totalCoins: response.data.totalElements,
                    coins: response.data.content
                })
            })
            .catch(error => {
                dispatch({type: actionTypes.GET_COINS_ERROR})
            })
    }
}