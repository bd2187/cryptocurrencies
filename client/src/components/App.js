import React, { Fragment, Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Dashboard from "./Dashboard/Dashboard";
import Header from "./Header/Header";
import CurrencyProfileContainer from "./CurrencyProfile/CurrencyProfileContainer";
const Profile = () => <h1>Profile</h1>; // shows favorites
const SearchedCurrency = () => <h1>Searched Currency</h1>;
const PageNotFound = () => <h1>404 not found</h1>;

import { allCoinsEndpoint } from "API/endpoints";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allCoins: [],
            fetchingAllCoins: true,
            errorFetchingAllCoins: false
        };
    }

    /**
     * Fetch data for all coins and store them in state object
     * @param
     * @return
     */
    componentDidMount() {
        (async () => {
            try {
                const allCoinsResponse = await fetch(allCoinsEndpoint);
                const allCoinsParsedResponse = await allCoinsResponse.json();

                const responseObjectKeys = Object.keys(
                    allCoinsParsedResponse.Data
                );
                const allCoinsArr = [];
                for (let i = 0; i < responseObjectKeys.length; i++) {
                    allCoinsArr.push(
                        allCoinsParsedResponse.Data[responseObjectKeys[i]]
                    );
                }

                this.setState({
                    allCoins: allCoinsArr,
                    fetchingAllCoins: false,
                    errorFetchingAllCoins: false
                });
            } catch (err) {
                console.warn(err);
                this.setState({
                    fetchingAllCoins: false,
                    errorFetchingAllCoins: true
                });
            }
        })();
    }
    render() {
        return (
            <Fragment>
                <Header allCoins={this.state.allCoins} />
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
    }
}

export default App;
