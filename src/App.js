import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Routes from "./components/routes/Routes";

function App() {
  return (
    <Router>
      <Route component={Routes} />
    </Router>
  );
}

export default App;
