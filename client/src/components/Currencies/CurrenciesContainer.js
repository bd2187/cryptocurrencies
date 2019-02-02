import React, { Component } from "react";
import Currencies from "./Currencies";

class CurrenciesContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentlyViewedCurrency: "",
            timeline: "month",
            currencies: [],

            fetchingCurrencies: true,
            errorFetchingCurrencies: false
        };

        this.updateCurrentlyViewedCurrency = this.updateCurrentlyViewedCurrency.bind(
            this
        );

        this.updateTimeLine = this.updateTimeLine.bind(this);
    }

    /**
     *  Fetches currencies based on API endpoint
     *  @param
     *  @return
     */
    componentDidMount() {
        this.setState({ fetchingCurrencies: true });

        (async () => {
            try {
                let response = await fetch(this.props.endpoint);
                let parsedResponse = await response.json();

                this.setState({
                    currencies: parsedResponse.Data,
                    currentCurrency: parsedResponse.Data[0],
                    fetchingCurrencies: false
                });
            } catch (err) {
                this.setState({
                    fetchingCurrencies: false,
                    errorFetchingCurrencies: true
                });
            }
        })();
    }

    updateCurrentlyViewedCurrency(currency) {
        // ajax request here
        this.setState({ currentlyViewedCurrency: currency });
    }

    updateTimeLine(timeline) {
        // ajax request here
        this.setState({ timeline });
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
