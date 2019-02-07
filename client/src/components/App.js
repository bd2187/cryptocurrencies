import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Dashboard from "./Dashboard/Dashboard";
import Header from "./Header/Header";
import CurrencyProfileContainer from "./CurrencyProfile/CurrencyProfileContainer";
const Profile = () => <h1>Profile</h1>; // shows favorites
const SearchedCurrency = () => <h1>Searched Currency</h1>;
const PageNotFound = () => <h1>404 not found</h1>;

const App = () => {
    return (
        <Fragment>
            <Header />
            <Router>
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/profile" component={Profile} />
                    <Route
                        exact
                        path="/search/:currency"
                        component={CurrencyProfileContainer}
                    />
                    <Route component={PageNotFound} />
                </Switch>
            </Router>
        </Fragment>
    );
};

export default App;
