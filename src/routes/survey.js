import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import SurveyForm from "../pages/survey/form";
import Survey from "../pages/survey/index";
import SurveyDisplay from "../pages/survey/display";

export default () => {
  let { url } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${url}/new`} component={SurveyForm} />
      <Route path={`${url}/:id/edit`} component={SurveyForm} />
      <Route path={`${url}/:id`} component={SurveyDisplay} />
      <Route path="/" component={Survey} />
    </Switch>
  );
};
