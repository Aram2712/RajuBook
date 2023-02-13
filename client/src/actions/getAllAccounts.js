import * as api from '../api/index';
import { GET_ALL_ACCOUNTS } from '../constants';

export const getAllAccounts = (userId) => async (dispatch) => {
    try {
        const {data} = await api.getAllAccounts(userId);
        dispatch({ type: GET_ALL_ACCOUNTS, payload: data })
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}
