import React, { Component } from "react";
import CurrencyProfile from "./CurrencyProfile";
import { currencyTradeInfoEndpoint } from "API/endpoints";

class CurrencyProfileContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currencyData: {},
            fetchingCurrencyData: true,
            errorFetchingData: false
        };
    }

    componentDidMount() {
        (async () => {
            try {
                let currencyData = await fetch(
                    currencyTradeInfoEndpoint(this.props.match.params.currency)
                );
                let parsedCurrencyData = await currencyData.json();

                this.setState({
                    currencyData:
                        parsedCurrencyData.DISPLAY[
                            Object.keys(parsedCurrencyData.DISPLAY)
                        ],
                    fetchingCurrencyData: false,
                    errorFetchingData: false
                });
            } catch (err) {
                console.error(err);
                this.setState({
                    currencyData: {},
                    fetchingCurrencyData: false,
                    errorFetchingData: true
                });
            }
        })();
    }

    render() {
        const {
            currencyData,
            fetchingCurrencyData,
            errorFetchingData
        } = this.state;
        return (
            <CurrencyProfile
                currencyData={currencyData}
                fetchingCurrencyData={fetchingCurrencyData}
                errorFetchingData={errorFetchingData}
            />
        );
    }
}

export default CurrencyProfileContainer;