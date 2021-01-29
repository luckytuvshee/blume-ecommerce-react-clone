import React, { useEffect } from "react";
import Home from "../Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Routes from "../routing/Routes";
import { Provider } from "react-redux";
import store from "../../store";
import { loadUser } from "../../actions/auth";
import { getProducts } from "../../actions/products";
import "./style.scss";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getProducts());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route component={Routes} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
