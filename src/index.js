import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import {createBrowserHistory as createHistory} from "history";
import * as serviceWorker from './serviceWorker';

// adding app container
import Container from "./containers";

// import store
import appStore from "./store";
const history = createHistory();
const store = appStore(history);

ReactDOM.render(
        <Router>
            <Container store={store} history={history} />
        </Router>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
