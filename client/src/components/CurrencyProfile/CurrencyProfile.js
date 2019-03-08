import React from "react";
import Loader from "../Loader/Loader";
import CurrentHistoryContainer from "../CurrencyHistory/CurrencyHistoryContainer";
import styles from "./CurrencyProfile.css";

const CurrencyTable = ({ currencyInfo, currencyPrice }) => {
    return (
        <Loader>
            <table className={styles["currency-table"]}>
                <tbody>
                    <tr className={styles["currency-table-row"]}>
                        <td>Price:</td>
                        <td>{currencyPrice.USD.PRICE}</td>
                    </tr>

                    <tr className={styles["currency-table-row"]}>
                        <td>Market Rank:</td>
                        <td>{currencyInfo.SortOrder}</td>
                    </tr>

                    <tr className={styles["currency-table-row"]}>
                        <td>Market Cap:</td>
                        <td>{currencyPrice.USD.MKTCAP}</td>
                    </tr>

                    <tr className={styles["currency-table-row"]}>
                        <td>Total Supply:</td>
                        <td>{currencyPrice.USD.SUPPLY}</td>
                    </tr>

                    <tr className={styles["currency-table-row"]}>
                        <td>Today's High/Low</td>
                        <td>
                            {`${currencyPrice.USD.HIGH24HOUR}/${
                                currencyPrice.USD.LOW24HOUR
                            }`}
                        </td>
                    </tr>

                    <tr className={styles["currency-table-row"]}>
                        <td>Change % Last 24 Hours:</td>
                        <td>{currencyPrice.USD.CHANGEPCT24HOUR}</td>
                    </tr>
                </tbody>
            </table>
        </Loader>
    );
};

const CurrencyProfile = ({
    currencyInfo,
    currencyPrice,
    fetchingCurrencyData,
    errorFetchingData
}) => {
    if (fetchingCurrencyData || !currencyPrice.hasOwnProperty("USD")) {
        return null;
    } else if (errorFetchingData) {
        return <h1>error</h1>;
    } else {
        let currentlyViewedCurrency = null;

        if (currencyInfo.Name) {
            currentlyViewedCurrency = {
                CoinInfo: {
                    Name: currencyInfo.Name
                }
            };
        }

        return (
            <div className={styles["currency-profile"]}>
                <div className={styles["current-history-container"]}>
                    {currentlyViewedCurrency ? (
                        <CurrentHistoryContainer
                            currentlyViewedCurrency={currentlyViewedCurrency}
                        />
                    ) : null}
                </div>
                <CurrencyTable
                    currencyInfo={currencyInfo}
                    currencyPrice={currencyPrice}
                />
            </div>
        );
    }
};

export default CurrencyProfile;
