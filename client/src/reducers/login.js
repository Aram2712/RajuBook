import { LOGIN } from "../constants";

const reducer = (login = {}, action) => {
    switch (action.type) {
        case LOGIN:
            return action.payload.user
        default:
            return login
    }
}

export default reducer