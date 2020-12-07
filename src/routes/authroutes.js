import React from "react";
import { Route, Switch } from "react-router-dom";
import Answer from './answer';
import Survey from './survey';

export default () => {
  return (
    <Switch>
      <Route path="/survey" component={Survey} />
      <Route path="/answer" component={Answer} />
    </Switch>
  );
};
