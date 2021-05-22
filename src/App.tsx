import React, { useState, useEffect } from "react";
import { Global, css } from "@emotion/react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import EmployeePage from "./pages/Employee";
import Search from "./pages/Search";
import SearchWithProps from "./pages/SearchWithProps";
import Dash from "./pages/Dashboard";
import OrgChart from "./components/OrgChart";
import WorkerChart from "./pages/OrgChart";
import { SignIn } from "./pages/SignIn";
import { FiltersProvider } from "./providers/FiltersProvider";

const App: React.FC = () => {
  // Create the count state.
  const [count, setCount] = useState(0);
  // Create the counter (+1 every second).
  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000);
    return () => clearTimeout(timer);
  }, [count, setCount]);

  // Return the App component.
  return (
    <>
      <Global
        styles={css`
          body {
            background-color: #f6f6fa;
          }
        `}
      />
      <FiltersProvider>
        <Router>
          <Route exact path="/worker/:id">
            <EmployeePage />
          </Route>
          <Route exact path="/search" component={SearchWithProps} />
          <Route exact path="/search/:filterType/:name/:parent?/:grandparent?" component={SearchWithProps} />
          <Route exact path="/orgchart">
            <OrgChart />
          </Route>
          <Route path="/orgchart/:id">
            <WorkerChart />
          </Route>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route exact path="/">
            <Dash />
          </Route>
        </Router>
      </FiltersProvider>
    </>
  );
};

export default App;
