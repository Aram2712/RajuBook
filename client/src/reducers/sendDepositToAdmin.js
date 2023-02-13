import { SEND_DEPOSIT_TO_ADMIN } from "../constants";

const reducer = (depositSentToAdmin = 0, action) => {
    switch (action.type) {
        case SEND_DEPOSIT_TO_ADMIN:
            return action.payload
        default:
            return depositSentToAdmin
    }
}

export default reducer