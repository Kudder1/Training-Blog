import axios from "axios"
import { Dispatch } from "redux"
import { UserAction, UserActionTypes } from "../../types/user"

export const fetchUsers = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({type: UserActionTypes.FETCH_USERS})
            const res = await axios.get('https://jsonplaceholder.typicode.com/users');
            setTimeout(() => {
                dispatch({type: UserActionTypes.FETCH_USERS_SUCCESS, payload: res.data})
            }, 500);
        } catch (error) {
            dispatch({type: UserActionTypes.FETCH_USERS_ERROR, payload: 'Error'})
        }
    }
}