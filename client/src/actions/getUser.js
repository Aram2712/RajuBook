import { GET_USER } from '../constants';

export const getUser = (user) => (dispatch) => {
    try {
        dispatch({ type: GET_USER, payload: user })
    } catch (error) {
        console.log(error)
    }
}
