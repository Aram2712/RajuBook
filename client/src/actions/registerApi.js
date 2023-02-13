import * as api from '../api/index.js';
import { REGISTER } from '../constants';

export const registerApi = (registerUser) => async (dispatch) => {
    try {
        const { status } = await api.fetchRegisterApi(registerUser)
        dispatch({ type: REGISTER, payload: status })
    } catch (error) {
        console.log(error)
    }
}
 