import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Answer from "../pages/answer/index";
import Response from "../pages/answer/response";

export default () => {
    let { url } = useRouteMatch();
    return (
        <Switch>
            <Route path={`${url}/:id`} component={Response} />
            <Route path="/" component={Answer} />
        </Switch>
    );
}