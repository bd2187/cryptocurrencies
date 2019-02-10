import React from "react";

const CurrencyHistory = ({
    historicalCurrencyData,
    updateTimeline,
    fetchingCurrencyData,
    fetchingCurrencyError
}) => {
    if (historicalCurrencyData.length > 0) {
        return <div>{historicalCurrencyData[0].high}</div>;
    } else {
        return null;
    }
};

export default CurrencyHistory;
