import React, { Fragment } from "react";
import Loading from "../Loading/Loading";
import CurrentHistoryContainer from "../CurrencyHistory/CurrencyHistoryContainer";

const CurrencyProfile = ({
    currencyInfo,
    currencyPrice,
    fetchingCurrencyData,
    errorFetchingData
}) => {
    if (fetchingCurrencyData || !currencyPrice.hasOwnProperty("USD")) {
        return <Loading text={"Loading Currency"} ms={400} />;
    } else if (errorFetchingData) {
        return <h1>error</h1>;
    } else {
        let currentlyViewedCurrency = null;

        if (currencyInfo.Name) {
            currentlyViewedCurrency = {
                CoinInfo: {
                    Name: currencyInfo.Name
                }
            };
        }

        return (
            <Fragment>
                <h1>Currency Profile</h1>
                <p>{currencyPrice.USD.FROMSYMBOL}</p>
                <p>{currencyPrice.USD.HIGH24HOUR}</p>
                {currentlyViewedCurrency ? (
                    <CurrentHistoryContainer
                        currentlyViewedCurrency={currentlyViewedCurrency}
                    />
                ) : (
                    <Loading text={"Loading Currency Data"} ms={200} />
                )}
            </Fragment>
        );
    }
};

export default CurrencyProfile;
