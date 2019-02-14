import React, { Fragment, Component } from "react";
import CurrencyHistoryContainer from "../CurrencyHistory/CurrencyHistoryContainer";
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
        const {
            currency,

            currentlyViewedCurrencyName
        } = this.props;

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
                                currentlyViewedCurrencyName={
                                    currentlyViewedCurrency.CoinInfo.Name
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
