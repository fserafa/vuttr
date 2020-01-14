import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Index from './pages/Index';

export default function routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Index} />
            </Switch>
        </BrowserRouter>
    )
}
