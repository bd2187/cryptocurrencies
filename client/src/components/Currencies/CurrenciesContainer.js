import React, { Component } from "react";
import Currencies from "./Currencies";
import { topTenEndpoint } from "API/endpoints";

class CurrenciesContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currencies: [],
            currentlyViewedCurrency: {},

            fetchingCurrencies: false,
            fetchingCurrencyData: false,
            errorFetchingCurrencies: false
        };

        this.updateCurrentlyViewedCurrency = this.updateCurrentlyViewedCurrency.bind(
            this
        );
    }

    /**
     * If the currencies array was provided via props,
     * update state with the given currencies.
     * Otherwise, fetch the top 10 currencies.
     *
     *  @param
     *  @return
     */
    componentDidMount() {
        this.setState({ fetchingCurrencies: true });
        if (this.props.currencies) {
            this.setState({
                currentlyViewedCurrency: this.props.currencies[0],
                currencies: this.props.currencies,
                fetchingCurrencies: false
            });
        } else {
            (async () => {
                try {
                    let topTenCurrenciesResponse = await fetch(topTenEndpoint);
                    let topTenParsedResponse = await topTenCurrenciesResponse.json();

                    let coinInfoArr = [];

                    for (let i = 0; i < topTenParsedResponse.Data.length; i++) {
                        coinInfoArr.push(topTenParsedResponse.Data[i]);
                    }

                    this.setState({
                        currentlyViewedCurrency: coinInfoArr[0],
                        currencies: coinInfoArr,
                        fetchingCurrencies: false
                    });
                } catch (err) {
                    console.error(err);

                    this.setState({
                        fetchingCurrencies: false,
                        errorFetchingCurrencies: true
                    });
                }
            })();
        }
    }

    /**
     * Updates the currently viewed currency when user clicks on
     * specific currency from the list.
     *
     * @param Object currency
     * @return
     */
    updateCurrentlyViewedCurrency(currency) {
        this.setState({ currentlyViewedCurrency: currency });
    }

    render() {
        const {
            currencies,
            fetchingCurrencies,
            currentlyViewedCurrency
        } = this.state;

        return (
            <Currencies
                currentlyViewedCurrency={currentlyViewedCurrency}
                currencies={currencies}
                fetchingCurrencies={fetchingCurrencies}
                updateCurrentlyViewedCurrency={
                    this.updateCurrentlyViewedCurrency
                }
            />
        );
    }
}

export default CurrenciesContainer;
