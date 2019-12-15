import { call, put, takeLatest } from "redux-saga/effects";
/* importing types */
import { USER_LOGIN, USER_LOADING_STATE, USER_SET_TOKEN } from "./user.type";
import { APP_NOTIFICATION } from "../application/application.type";
/* importing api */
import { __api_doLogin } from "../../../api/user/api";
/* importinh helpers */
import session from "../../../services/session";
import { CONNECTION_FAILED } from "../../../constant/error";

function* doLoginRegister(action){
    yield put({ type: USER_LOADING_STATE, loading: true });
    try {
        const {data} = yield call(__api_doLogin, action.payload);
        /* register user token to cookie */
        if(data && data.count === 1){
            let user = data.results[0];
            if(user && user.name && user.name.toLowerCase() !== action.payload.username.toLowerCase()){
                /* password matched */
                yield put({ type: APP_NOTIFICATION, error: {message: "User doesn't exists", type:"red"} });   
            }else if(user && user.birth_year && user.birth_year === action.payload.password){
                /* password matched */
                yield put({ type: APP_NOTIFICATION, error: {message: "You've been loggedin successfully", type:"green"} });   
                yield put({ type: USER_SET_TOKEN, loading: false, data });
                /* user registered && token received */
                session.set("profile", user);
            }else{
                /* password not matched case */
                yield put({ type: APP_NOTIFICATION, error: {message: "You've entered incorrect password", type:"red"} });        
            }
        }else{
            yield put({ type: APP_NOTIFICATION, error: {message: "User doesn't exists", type:"red"} });    
        }
        yield put({ type: USER_LOADING_STATE, loading: false });        
    } catch (error) {
        yield put({ type: USER_LOADING_STATE, loading: false });
        yield put({ type: APP_NOTIFICATION, error: {message: (error && error.message) || CONNECTION_FAILED, type:"red"} });
        
    }
}

/**
 * map the dispatched action to the above function
 */
export default function* watchUser() {
    yield takeLatest(USER_LOGIN, doLoginRegister);
}
