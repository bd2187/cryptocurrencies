import React from "react";

const CurrentlyViewedCurrency = ({ currentlyViewedCurrency }) => {
    const { currencyInfo, historicalData } = currentlyViewedCurrency;

    return (
        <div>
            <p>{currencyInfo.Name}</p>
            <img
                style={{ width: "50px" }}
                src={`http://cryptocompare.com/${currencyInfo.ImageUrl}`}
            />
        </div>
    );
};

export default CurrentlyViewedCurrency;
