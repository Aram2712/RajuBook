import * as api from '../api/index';
import { LOGIN } from '../constants';

export const loginApi = (user) => async (dispatch) => {
    try {
        const { config: { data } } = await api.fetchLoginApi(user)
        const loginedUser = await JSON.parse(data)
        dispatch({ type: LOGIN, payload: loginedUser })
    } catch (error) {
        console.log(error)
    }
}
