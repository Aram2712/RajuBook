import * as api from '../api/index';

export const deleteAccount = (id) => async (dispatch) => {
    try {
        await api.deleteAccount(id)
    } catch (error) {
        console.log(error)
    }
}
