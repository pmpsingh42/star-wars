/* importing types */
import { USER_SET_TOKEN, USER_LOADING_STATE, USER_LOGOUT } from "./user.type";
import session from "../../../services/session";

const initialState = {
    loading: false,
    profile: session.get("profile") || undefined
}

export default function User(state=initialState, action){
    switch(action.type){
        case USER_LOADING_STATE: 
            return {...state, loading: action.loading};
        case USER_LOGOUT: 
            return {...state, profile: undefined};
        case USER_SET_TOKEN: 
            return {...state, loading: action.loading, profile: action.data};
        default: 
            return state;
    }
}
