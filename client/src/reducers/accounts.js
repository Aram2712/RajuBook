import { GET_ALL_ACCOUNTS } from "../constants";

const reducer = (accounts = [], action) => {
    switch (action.type) {
        case GET_ALL_ACCOUNTS:
            return action.payload
        default:
            return accounts
    }
}

export default reducer