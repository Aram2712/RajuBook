import * as api from '../api/index';

export const createNewAccount = (account) => async (dispatch) => {
    try {
      await api.createAccount(account)

     
    } catch (error) {
        console.log(error)
    }
}
