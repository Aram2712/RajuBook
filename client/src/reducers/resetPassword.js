import { RESET_PASSWORD } from "../constants";

const reducer = (resetPassword = {}, action) => {
    switch (action.type) {
        case RESET_PASSWORD:
            return action.payload
        default:
            return resetPassword
    }
}

export default reducer