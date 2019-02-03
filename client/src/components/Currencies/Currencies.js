import React, { Fragment } from "react";

const CurrenciesListItem = ({ currency, updateCurrentlyViewedCurrency }) => {
    return (
        <li
            onClick={() => {
                updateCurrentlyViewedCurrency(currency);
            }}
        >
            <p>{currency.Name}</p>
            <img
                style={{ width: "50px" }}
                src={`http://cryptocompare.com/${currency.ImageUrl}`}
            />
        </li>
    );
};

const CurrentCurrencyViewed = ({ currentlyViewedCurrency }) => {
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

const Currencies = ({
    fetchingCurrencies,
    currentlyViewedCurrency,
    currencies,
    updateCurrentlyViewedCurrency
}) => {
    if (fetchingCurrencies) {
        return <Fragment>Loading</Fragment>;
    } else {
        return (
            <Fragment>
                <ul>
                    {currencies.map(currency => {
                        return (
                            <CurrenciesListItem
                                key={currency.Id}
                                currency={currency}
                                updateCurrentlyViewedCurrency={
                                    updateCurrentlyViewedCurrency
                                }
                            />
                        );
                    })}
                </ul>
                <p>current:</p>
                <CurrentCurrencyViewed
                    currentlyViewedCurrency={currentlyViewedCurrency}
                />
            </Fragment>
        );
    }
};

export default Currencies;
