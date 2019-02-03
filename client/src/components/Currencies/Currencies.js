import React, { Fragment } from "react";

const CurrenciesListItem = ({ currency, updateCurrentlyViewedCurrency }) => {
    return (
        <li
            onClick={() => {
                updateCurrentlyViewedCurrency(currency);
            }}
        >
            <p>{currency.Name}</p>
        </li>
    );
};

const Currencies = ({
    fetchingCurrencies,
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
            </Fragment>
        );
    }
};

export default Currencies;
