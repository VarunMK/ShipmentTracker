import React from "react";
import "./App.css";
import Client from "./components/Client";
import { Route,Router, Switch } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import history from './history'

function App() {
  return (
    <ChakraProvider>
    <Router history={history}>
        <Switch>
          <Route path="/client" component={Client} />
        </Switch>
      </Router>
      </ChakraProvider>
  );
}

export default App;
