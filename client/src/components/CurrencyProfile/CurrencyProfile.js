import React, { Fragment } from "react";
import CurrentHistoryContainer from "../CurrencyHistory/CurrencyHistoryContainer";

const CurrencyProfile = ({
    currencyInfo,
    currencyPrice,
    fetchingCurrencyData,
    errorFetchingData
}) => {
    if (fetchingCurrencyData || !currencyPrice.hasOwnProperty("USD")) {
        return <h1>loading</h1>;
    } else if (errorFetchingData) {
        return <h1>error</h1>;
    } else {
        return (
            <Fragment>
                <CurrentHistoryContainer
                    currentlyViewedCurrency={currencyInfo}
                />
                <h1>Currency Profile</h1>
                <p>{currencyPrice.USD.FROMSYMBOL}</p>
                <p>{currencyPrice.USD.HIGH24HOUR}</p>
            </Fragment>
        );
    }
};

export default CurrencyProfile;
