import React from "react";
import {Provider} from "react-redux";

import AppRoutes from "../routes";

const container = ({store, history}) => {
    return <Provider store={store}>
        <AppRoutes history={history}/>
    </Provider>;
};
export default container; 