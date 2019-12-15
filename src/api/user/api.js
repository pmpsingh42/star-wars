import http from "../../services/http";
import {methods} from "../../constant";
import { __endpoint_doLogin } from "./endpoint";

export const __api_doLogin = payload => {
    let q = {search: payload.username};
    return http.Request(methods.GET, __endpoint_doLogin, q)
};
