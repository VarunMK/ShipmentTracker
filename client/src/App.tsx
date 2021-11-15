import React from "react";
import "./App.css";
import Client from "./components/Client";
import { Route,Router, Switch } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Partner from './components/Partner';
import DeliveryStaff from "./components/DeliveryStaff";
import history from './history'

function App() {
  return (
    <ChakraProvider>
    <Router history={history}>
        <Switch>
          <Route path="/client" component={Client} />
          <Route path="/partner" component={Partner} />
          <Route path="/deliverystaff" component={DeliveryStaff}/>
        </Switch>
      </Router>
      </ChakraProvider>
  );
}

export default App;
