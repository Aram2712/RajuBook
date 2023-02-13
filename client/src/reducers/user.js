import { GET_USER } from "../constants";

const reducer = (user = {}, action) => {
    switch (action.type) {
        case GET_USER:
            return action.payload
        default:
            return user
    }
}

export default reducer