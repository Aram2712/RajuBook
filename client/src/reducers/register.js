import { REGISTER } from "../constants";

const reducer = (registerStatus = 0, action) => {
    switch (action.type) {
        case REGISTER:
            return action.payload
        default:
            return registerStatus
    }
}

export default reducer