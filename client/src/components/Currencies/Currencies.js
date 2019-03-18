import React, { Fragment, Component } from "react";
import CurrencyHistoryContainer from "../CurrencyHistory/CurrencyHistoryContainer";
import Loading from "../Loading/Loading";
import mainStyles from "STYLES/main.css";
import styles from "./Currencies.css";

class CurrenciesListItem extends Component {
    constructor(props) {
        super(props);
        this.currencyContainerRef = React.createRef();
    }

    onClick(currency) {
        this.props.updateCurrentlyViewedCurrency(currency);
        this.currencyContainerRef.current.scrollIntoView({
            behavior: "smooth"
        });
    }

    render() {
        const { currency, currentlyViewedCurrencyName } = this.props;

        const { ImageUrl: imageUrl } = currency.CoinInfo;
        const { Name: coinShortName } = currency.CoinInfo;
        const {
            PRICE: price,
            CHANGEPCT24HOUR: changePercent,
            MKTCAP: marketcap
        } = currency.DISPLAY.USD;

        const determineIfNegOrPos = num => {
            if (Number(num) > 0) {
                return "above-zero";
            } else {
                return "below-zero";
            }
        };

        const changePercentColor = determineIfNegOrPos(changePercent);
        const isCurrentlyViewedCurrency = () => {
            return currentlyViewedCurrencyName === coinShortName
                ? styles.current
                : "";
        };

        return (
            <li
                onClick={this.onClick.bind(this, currency)}
                className={`${
                    styles["currency-item-container"]
                } ${isCurrentlyViewedCurrency()}`}
                ref={this.currencyContainerRef}
            >
                <div className={styles["currency-item-header"]}>
                    <div className={styles["currency-item-tag"]}>
                        <img src={`http://cryptocompare.com/${imageUrl}`} />
                        <p>{coinShortName}</p>
                    </div>
                </div>
                <p className={styles["currency-item-coin-price"]}>{price}</p>
                <div className={styles["currency-item-coin-info"]}>
                    <p>
                        Change (24):{" "}
                        <span className={styles[changePercentColor]}>
                            {changePercent}%
                        </span>
                    </p>
                    <p>
                        Market Cap: <span>{marketcap}</span>
                    </p>
                </div>
            </li>
        );
    }
}

const Currencies = ({
    fetchingCurrencies,
    currentlyViewedCurrency,
    currencies,
    updateCurrentlyViewedCurrency
}) => {
    if (fetchingCurrencies) {
        return <Loading text={"Fetching currencies"} ms={200} />;
    } else {
        return (
            <div className={mainStyles["wrap"]}>
                <div className={styles["content-container"]}>
                    <ul className={styles["currencies-list-container"]}>
                        {currencies.map(currency => {
                            return (
                                <CurrenciesListItem
                                    key={currency.CoinInfo.Id}
                                    currency={currency}
                                    updateCurrentlyViewedCurrency={
                                        updateCurrentlyViewedCurrency
                                    }
                                    currentlyViewedCurrencyName={
                                        currentlyViewedCurrency.CoinInfo.Name
                                    }
                                />
                            );
                        })}
                    </ul>
                    <div
                        className={
                            styles["currently-viewed-currency-container"]
                        }
                    >
                        <CurrencyHistoryContainer
                            currentlyViewedCurrency={currentlyViewedCurrency}
                        />
                    </div>
                </div>
            </div>
        );
    }
};

export default Currencies;
