/** @format */

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Routes from "./components/routes/Routes";
import ErrorBoundary from "./components/ErrorBoundary";
import { UserProvider } from "./components/UserContext";

function App() {
  return (
    <UserProvider>
      <ErrorBoundary>
        <Router>
          <Route component={Routes} />
        </Router>
      </ErrorBoundary>
    </UserProvider>
  );
}

export default App;
