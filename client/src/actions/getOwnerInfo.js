import * as api from '../api/index';
import { GET_OWNER_INFO } from '../constants';

export const getOwnerInfo = () => async (dispatch) => {
    try {
        const {data} = await api.getOwnerInfo()
        dispatch({ type: GET_OWNER_INFO, payload: data })
    } catch (error) {
        console.log(error)
    }
}
