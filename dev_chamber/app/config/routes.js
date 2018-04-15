import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Main from "../components/main";
import Home from '../views/home';
import About from '../views/about';
import Table from "../views/table";
import Graphes from "../views/graphes";

const Routes = (
  <Router history={hashHistory} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/" component={Main}>
      <IndexRoute component={Home} />
      <Route path="about" component={About} />
      <Route path="table" component={Table} />
      <Route path="graphes" component={Graphes} />
    </Route>
  </Router>
);

export default Routes;
