import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import {createBrowserHistory as createHistory} from "history";
import { reducer as formReducer } from "redux-form";

import user from "./modules/user/user.reducer";
import application from "./modules/application/application.reducer";

const rootReducer = combineReducers({
    router: connectRouter(createHistory()),
    form: formReducer,
    user,
    application
});

export default rootReducer;