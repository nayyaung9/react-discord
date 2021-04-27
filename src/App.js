import React from "react";
import { Router, Route } from "react-router-dom";
import history from "./history";

// pages
import IndexPage from './pages/Index/IndexPage';
import Home from "./pages/home/Home";

function App() {
  return (
    <Router history={history}>
      <Route exact path="/" component={IndexPage} />
      <Route path="/home" component={Home} />
    </Router>
  );
}

export default App;
