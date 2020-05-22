/** @format */

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Routes from "./components/routes/Routes";
import ErrorBoundary from "./components/ErrorBoundary";
import { UserProvider } from "./components/UserContext";

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <UserProvider>
          <Route component={Routes} />
        </UserProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
