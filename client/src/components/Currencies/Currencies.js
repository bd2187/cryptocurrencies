import React, { Fragment } from "react";
const Currencies = ({ fetchingCurrencies, currencies }) => {
    if (fetchingCurrencies) {
        return <Fragment>Loading</Fragment>;
    } else {
        return (
            <Fragment>
                <ul>
                    {currencies.map(currency => {
                        return (
                            <li key={currency.CoinInfo.Id}>
                                <p>{currency.CoinInfo.Name}</p>
                            </li>
                        );
                    })}
                </ul>
            </Fragment>
        );
    }
};

export default Currencies;
