import * as api from '../api/index.js';
import { RESET_PASSWORD } from '../constants/index.js';

export const sendPasswordToEmail = (email) => async (dispatch) => {
    try {
        const { data, status } = await api.sendPasswordToEmail(email)
        dispatch({ type: RESET_PASSWORD, payload: { data, status } })
    } catch (error) {
        console.log(error)
    }
}
