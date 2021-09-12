import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Formheader from "../components/Formheader";
import Header from "../components/Header";
import CenteredTabs from "../components/Tabs";
import Templates from "../components/Templates";
import UserForm from "../components/UserForm";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../Store/index';

const Routes = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="app">
          <Router>
            <Switch>
              <Route path="/home">
                <Formheader />
                <CenteredTabs />
              </Route>

              <Route path="/response">
                <Formheader />
                <CenteredTabs />
              </Route>

              <Route path="/questions/:id">
                <UserForm />
              </Route>

              <Route path="/">
                <Header />
                <Templates />
              </Route>
            </Switch>
          </Router>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default Routes;
