import React from "react";

const CurrencyProfile = ({
    currencyData,
    fetchingCurrencyData,
    errorFetchingData
}) => {
    if (fetchingCurrencyData) {
        return <h1>loading</h1>;
    } else if (errorFetchingData) {
        return <h1>error</h1>;
    } else {
        console.warn(currencyData);
        return <h1>Currency Profile</h1>;
    }
};

export default CurrencyProfile;
