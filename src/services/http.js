import axios from 'axios';
import session from "./session";
import {apiPath as endpoint} from "../constant";
/*Setting up interceptors with axios*/
/*it supports add/remove interceptors - 2017dec*/
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    let token;
    token = session.get("token");

    if (token) {
        /** appending auth token */
        config.headers = { "Authorization": `bearer ${token.token}` }
    }

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return {
        statusCode: response.status,
        data: (typeof response.data === 'boolean' && response.data === false ? 'false' : response.data) || []
    };
}, function (error) {
    if (!error.response && error.message === 'Network Error') {
        return Promise.reject("Couldn't connect to server. Please try again later.");
    }
    // Do something with response error
    return Promise.reject(error.response.data || "Server Connection Failed");
});


export default class HTTP {
    static Request(method, url, data = null) {
        return new Promise((resolve, reject) => {
            let request = {
                method,
                url: endpoint+url,
                [method.toUpperCase() === 'GET' ? "params" : "data"]: data,
                headers: { 'Content-Type': 'application/json' }
            };

            axios(request) .then(response => resolve(response)) .catch(error => reject(error));
        });
    }
}