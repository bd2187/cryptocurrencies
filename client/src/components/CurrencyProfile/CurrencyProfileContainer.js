import React, { Component } from "react";
import CurrencyProfile from "./CurrencyProfile";
import { currencyTradeInfoEndpoint } from "API/endpoints";

class CurrencyProfileContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currencyInfo: {},
            currencyPrice: {},
            fetchingCurrencyData: false,
            errorFetchingData: false
        };

        this.fetchTradeInfo = this.fetchTradeInfo.bind(this);
        this.updateCurrencyInfo = this.updateCurrencyInfo.bind(this);
    }

    /**
     * Fetches current data about currencie's price.
     * Invokes this.updateCurrencyInfo to store curreny data in state object.
     * @param
     * @return
     */
    componentDidMount() {
        this.fetchTradeInfo();
        this.updateCurrencyInfo();
    }

    /**
     * If user switched to different coin, udpdate the currency
     * info and request trade info on coin
     * @param
     * @return
     */
    componentDidUpdate(prevProps) {
        if (prevProps.allCoins !== this.props.allCoins)
            this.updateCurrencyInfo();

        if (
            prevProps.match.params.currency !== this.props.match.params.currency
        ) {
            this.updateCurrencyInfo();
            this.fetchTradeInfo();
        }
    }

    fetchTradeInfo() {
        (async () => {
            this.setState({ fetchingCurrencyData: true });

            try {
                let currencyData = await fetch(
                    currencyTradeInfoEndpoint(this.props.match.params.currency)
                );

                let parsedCurrencyData = await currencyData.json();

                this.setState({
                    currencyPrice:
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

    /**
     * Iterates through the allCoins array in the props object to search
     * and store the coin info in the state object
     * @param
     * @return
     */
    updateCurrencyInfo() {
        const { allCoins } = this.props;

        for (let i = 0; i < allCoins.length; i++) {
            if (allCoins[i].Name === this.props.match.params.currency) {
                this.setState({ currencyInfo: allCoins[i] });
                break;
            }
        }
    }

    render() {
        const {
            currencyInfo,
            currencyPrice,
            fetchingCurrencyData,
            errorFetchingData
        } = this.state;
        return (
            <CurrencyProfile
                currencyInfo={currencyInfo}
                currencyPrice={currencyPrice}
                fetchingCurrencyData={fetchingCurrencyData}
                errorFetchingData={errorFetchingData}
            />
        );
    }
}

export default CurrencyProfileContainer;
