import React from "react";
import "./App.css";
import Client from "./components/Client";
import { Route,Router, Switch } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import DBA from './components/DBA';
import history from './history'
import Order from './components/Order';
import FrontPage from './components/FrontPage'

function App() {
  return (
    <ChakraProvider>
    <Router history={history}>
        <Switch>
          <Route path="/client" component={Client} />
          <Route path="/dba" component={DBA} />
          <Route path="/orders" component={Order} />
          <Route path="" component={FrontPage}/>
        </Switch>
      </Router>
      </ChakraProvider>
  );
}

export default App;
