import React, { Component } from "react";
import CurrencyHistory from "./CurrencyHistory";
import { currencyHistoryEndpoint } from "API/endpoints";

class CurrencyHistoryContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currencyInfo: {},
            historicalCurrencyData: [],
            timeline: "month", // "month", "year", "week"
            fetchingCurrencyData: false,
            fetchingCurrencyError: false
        };

        this.updateTimeline = this.updateTimeline.bind(this);
    }

    /**
     * Updates the value of currencyInfo in the state object.
     * Invokes this.updateTimeline to fetch currency history
     * @param
     * @return
     */
    componentDidMount() {
        this.setState({
            currencyInfo: this.props.currentlyViewedCurrency
        });

        this.updateTimeline(
            this.props.currentlyViewedCurrency.Name,
            this.state.timeline
        );
    }

    /**
     * Whenever we receive new currency info via props, update the state object
     * and fetch the new currency's historical data
     * @param
     * @return
     */
    componentDidUpdate() {
        if (
            this.props.currentlyViewedCurrency.Name ===
            this.state.currencyInfo.Name
        )
            return;

        this.setState({ currencyInfo: this.props.currentlyViewedCurrency });

        this.updateTimeline(
            this.props.currentlyViewedCurrency.Name,
            this.state.timeline
        );
    }

    /**
     * Fetches a currency's historical data
     * @param String currencyName
     * @param String timeline (i.e "month", "year", "days")
     * @return
     */
    updateTimeline(currencyName, timeline) {
        /*
            Immediately return if:
            1) We are currently fetching data
            2) The currency name is not provided
            3) The timeline parameter was not passed
        */

        if (this.state.fetchingCurrencyData || !currencyName || !timeline)
            return;

        this.setState({ fetchingCurrencyData: true });

        (async () => {
            try {
                const historicalDataResponse = await fetch(
                    currencyHistoryEndpoint(currencyName, timeline)
                );

                const parsedData = await historicalDataResponse.json();

                this.setState({
                    historicalCurrencyData: parsedData.Data,
                    fetchingCurrencyData: false,
                    fetchingCurrencyError: false
                });
            } catch (err) {
                console.error(err);

                this.setState({
                    fetchingCurrencyData: false,
                    fetchingCurrencyError: true
                });
            }
        })();
    }

    render() {
        return (
            <CurrencyHistory
                historicalCurrencyData={this.state.historicalCurrencyData}
                updateTimeline={this.updateTimeline}
                fetchingCurrencyData={this.state.fetchingCurrencyData}
                fetchingCurrencyError={this.state.fetchingCurrencyError}
            />
        );
    }
}

export default CurrencyHistoryContainer;
