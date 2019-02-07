import React, { Component } from "react";
import Currencies from "./Currencies";
import { topTenEndpoint, currencyHistoryEndpoint } from "API/endpoints";

class CurrenciesContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentlyViewedCurrency: {
                currencyInfo: {},
                historicalData: []
            },
            timeline: "month",
            currencies: [],

            fetchingCurrencies: true,
            fetchingCurrencyData: true,
            errorFetchingCurrencies: false
        };

        this.updateCurrentlyViewedCurrency = this.updateCurrentlyViewedCurrency.bind(
            this
        );

        this.updateTimeLine = this.updateTimeLine.bind(this);
    }

    /**
     * If the currencies array was provided via props,
     * update state with the given currencies.
     * Otherwise, fetch the top 10 currencies is
     * provided via props.
     *
     *  @param
     *  @return
     */
    componentDidMount() {
        this.setState({ fetchingCurrencies: true });
        if (this.props.currencies) {
            this.setState({
                currencies: this.props.currencies,
                fetchingCurrencies: false
            });

            this.updateCurrentlyViewedCurrency(this.state.currencies[0].Name);
        } else {
            (async () => {
                try {
                    let topTenCurrenciesResponse = await fetch(topTenEndpoint);
                    let topTenParsedResponse = await topTenCurrenciesResponse.json();

                    let coinInfoArr = [];

                    for (let i = 0; i < topTenParsedResponse.Data.length; i++) {
                        coinInfoArr.push(topTenParsedResponse.Data[i].CoinInfo);
                    }

                    this.setState({
                        currencies: coinInfoArr,
                        fetchingCurrencies: false
                    });

                    this.updateCurrentlyViewedCurrency(coinInfoArr[0]);
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
     * Fetches historical data for the currency
     *
     * @param Object currency
     * @return
     */
    updateCurrentlyViewedCurrency(currency) {
        /*
            If current currency is the same as the one that user clicked,
            immediately return
        */
        if (
            currency.Name ===
            this.state.currentlyViewedCurrency.currencyInfo.Name
        )
            return;

        this.setState({ fetchingCurrencyData: true });

        (async () => {
            try {
                let historicalCurrencyResponse = await fetch(
                    currencyHistoryEndpoint(currency.Name, this.state.timeline)
                );

                let parsedHistoricalData = await historicalCurrencyResponse.json();

                this.setState({
                    currentlyViewedCurrency: {
                        currencyInfo: currency,
                        historicalData: parsedHistoricalData.Data
                    },
                    fetchingCurrencyData: false
                });
            } catch (err) {
                console.error(err);

                this.setState({
                    fetchingCurrencyData: false,
                    fetchingCurrencyData: false,
                    errorFetchingCurrencies: true
                });
            }
        })();
    }

    /**
     * Updates the currently viewed currency when user clicks on
     * specific currency from the list.
     * Fetches historical data for the currency
     *
     * @param Object currency
     * @return
     */
    updateTimeLine(timeline) {
        /*
            If current timeline is the same as the one that user clicked,
            immediately return
        */
        if (timeline === this.state.timeline) return;

        this.setState({ fetchingCurrencyData: true });

        (async () => {
            try {
                let historicalCurrencyResponse = await fetch(
                    currencyHistoryEndpoint(
                        this.state.currentlyViewedCurrency.currencyInfo,
                        timeline
                    )
                );

                let parsedHistoricalData = await historicalCurrencyResponse.json();

                this.setState(state => {
                    return {
                        currentlyViewedCurrency: {
                            historicalData: parsedHistoricalData.Data
                        },
                        timeline,
                        fetchingCurrencyData: false
                    };
                });
            } catch (err) {
                console.error(err);

                this.setState({
                    fetchingCurrencyData: false,
                    fetchingCurrencyData: false,
                    errorFetchingCurrencies: true
                });
            }
        })();
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
                updateTimeLine={this.updateTimeLine}
            />
        );
    }
}

export default CurrenciesContainer;
