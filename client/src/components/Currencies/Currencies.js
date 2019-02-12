import React, { Fragment } from "react";
import CurrencyHistoryContainer from "../CurrencyHistory/CurrencyHistoryContainer";
import mainStyles from "STYLES/main.css";
import styles from "./Currencies.css";

const CurrenciesListItem = ({ currency, updateCurrentlyViewedCurrency }) => {
    const { ImageUrl: imageUrl } = currency.CoinInfo;
    const { Name: coinShortName } = currency.CoinInfo;

    return (
        <li
            onClick={() => {
                updateCurrentlyViewedCurrency(currency);
            }}
        >
            <img
                style={{ width: "50px" }}
                src={`http://cryptocompare.com/${imageUrl}`}
            />
            <p>{coinShortName}</p>
        </li>
    );
};

const CurrentlyViewedCurrency = ({ currentlyViewedCurrency = {} }) => {
    if (currentlyViewedCurrency.CoinInfo) {
        const { ImageUrl: imageUrl } = currentlyViewedCurrency.CoinInfo;
        const { FullName: coinName } = currentlyViewedCurrency.CoinInfo;

        return (
            <div className={styles["currently-viewed-currency"]}>
                <img src={`http://cryptocompare.com/${imageUrl}`} />
                <p>{coinName}</p>
            </div>
        );
    } else {
        return null;
    }
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
            <div className={mainStyles["wrap"]}>
                <ul className={styles["currencies-list-container"]}>
                    {currencies.map(currency => {
                        return (
                            <CurrenciesListItem
                                key={currency.CoinInfo.Id}
                                currency={currency}
                                updateCurrentlyViewedCurrency={
                                    updateCurrentlyViewedCurrency
                                }
                            />
                        );
                    })}
                </ul>
                <CurrentlyViewedCurrency
                    currentlyViewedCurrency={currentlyViewedCurrency}
                />
                <CurrencyHistoryContainer
                    currentlyViewedCurrency={currentlyViewedCurrency}
                />
            </div>
        );
    }
};

export default Currencies;
