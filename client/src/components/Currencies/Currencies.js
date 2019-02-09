import React, { Fragment } from "react";
import CurrencyHistoryContainer from "../CurrencyHistory/CurrencyHistoryContainer";

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
                <p>{currentlyViewedCurrency.Name}</p>
                <img
                    src={`http://cryptocompare.com/${
                        currentlyViewedCurrency.ImageUrl
                    }`}
                />
                <CurrencyHistoryContainer
                    currentlyViewedCurrency={currentlyViewedCurrency}
                />
            </Fragment>
        );
    }
};

export default Currencies;
