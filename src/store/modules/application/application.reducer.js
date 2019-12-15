import { APP_NOTIFICATION, CLEAR_APP_ERROR } from "./application.type";

let initialState = {
    error: {
        message: "",
        type: "blue"
    }
}

export default function application(state=initialState, action){
    switch(action.type){
        case APP_NOTIFICATION:
            return {...state, error: action.error};
        case CLEAR_APP_ERROR:
            return {...state, error: ""};
        default:
            return state;
    }
}
