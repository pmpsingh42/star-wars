import { USER_LOGIN, USER_LOGOUT } from "./user.type";

export const doLogin = (payload) => ({type: USER_LOGIN, payload });
export const doLogout = () => ({type: USER_LOGOUT});
