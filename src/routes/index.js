import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { ConnectedRouter } from "connected-react-router";

import App from '../App';
import UserLogin from '../components/user/user.login';

export default class AppRouter extends React.Component {
    render() {return (
            <ConnectedRouter history={this.props.history}>      
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route exact path="/login" component={UserLogin} />
                </Switch>
            </ConnectedRouter>
        );
    }
}

