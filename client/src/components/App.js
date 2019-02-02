import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Dashboard from "./Dashboard/Dashboard";
const Profile = () => <h1>Profile</h1>; // shows favorites
const Search = () => <h1>Search</h1>;
const SearchedCurrency = () => <h1>Searched Currency</h1>;
const PageNotFound = () => <h1>404 not found</h1>;

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/search" component={Search} />
                <Route
                    exact
                    path="/search/:currency"
                    component={SearchedCurrency}
                />
                <Route component={PageNotFound} />
            </Switch>
        </Router>
    );
};

export default App;
