import {API_DRIVER, setAuthToken} from "../../config";
import * as actionTypes from '../actionTypes'
import store from "../store";

export const getFavorites = () => {
    let state = store.getState().favReducer;
    return dispatch => {
        API_DRIVER.get("/api/user/favorites" + this.props.username, {params: {
            id: state.id
            }})
            .then(response => {
                dispatch({
                    type: actionTypes.GET_COINS_SUCCESS,
                    totalFavorites: response.data.totalElements,
                    favorites: response.data.content
                })
            })
            .catch(error => {
                dispatch({type: actionTypes.GET_COINS_ERROR})
            })
    }
}

