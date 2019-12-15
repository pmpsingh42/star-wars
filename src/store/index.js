import {compose, createStore, applyMiddleware}  from "redux";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "react-router-redux";

// reducer
import Reducer from "./store.reducer";
// saga
import Saga from "./store.saga";

const store = (history) => {
    const sagaMiddleware = createSagaMiddleware();
    let middleware = applyMiddleware(routerMiddleware(history), sagaMiddleware);

    let store = createStore(Reducer, compose(middleware));

    sagaMiddleware.run(Saga);

    return store;
}

export default store;