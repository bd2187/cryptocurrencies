import React from "react";
import Loading from "../Loading/Loading";
import CurrentHistoryContainer from "../CurrencyHistory/CurrencyHistoryContainer";
import styles from "./CurrencyProfile.css";

const CurrencyTable = ({ currencyInfo, currencyPrice }) => {
    return (
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
    );
};

const CurrencyProfile = ({
    currencyInfo,
    currencyPrice,
    fetchingCurrencyData,
    errorFetchingData
}) => {
    if (fetchingCurrencyData || !currencyPrice.hasOwnProperty("USD")) {
        return <Loading text={"Loading Currency"} ms={400} />;
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
                {currentlyViewedCurrency ? (
                    <CurrentHistoryContainer
                        currentlyViewedCurrency={currentlyViewedCurrency}
                    />
                ) : (
                    <div className={styles["loading-container"]}>
                        <Loading text={"Loading Chart"} ms={200} />
                    </div>
                )}
                <CurrencyTable
                    currencyInfo={currencyInfo}
                    currencyPrice={currencyPrice}
                />
            </div>
        );
    }
};

export default CurrencyProfile;
