import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import AuthRoutes from "./routes/authroutes";
import Login from "./pages/login/index";
import Register from "./pages/register/index";
import SurveyForm from "./pages/survey/form";
import Survey from "./pages/survey/index";
import SurveyDisplay from "./pages/survey/display";
import Navbar from "./components/navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Container className="text-white bg-dark">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/survey/new" component={SurveyForm} />
          <Route path="/survey/:id/edit" component={SurveyForm} />
          <Route path="/survey/:id" component={SurveyDisplay} />
          <Route path="/survey" component={Survey} />
          <PrivateRoute>
            <AuthRoutes />
          </PrivateRoute>
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

const isUserAuthenticated = () => {
  return sessionStorage.getItem("userToken");
};

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isUserAuthenticated() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default App;
