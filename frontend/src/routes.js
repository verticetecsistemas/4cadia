import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Landing from "./screens/Landing.jsx";

export default function Routes() {

    return(
        <BrowserRouter>
        <Switch>

            <Route path="/" exact component={Landing} ></Route>

        </Switch>
        </BrowserRouter>
    );
}