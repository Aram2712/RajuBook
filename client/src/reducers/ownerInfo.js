import { GET_OWNER_INFO } from "../constants";

const reducer = (owner = [], action) => {
    switch (action.type) {
        case GET_OWNER_INFO:
            return action.payload
        default:
            return owner
    }
}

export default reducer