import * as api from '../api/index';
import { SEND_DEPOSIT_TO_ADMIN } from '../constants';

export const sendDepositToAdmin = (sendToAdmin) => async (dispatch) => {
    try {
        const { status } = await api.sendDepositToAdmin(sendToAdmin)
        dispatch({ type: SEND_DEPOSIT_TO_ADMIN, payload: status })
    } catch (error) {
        console.log(error)
    }
}
