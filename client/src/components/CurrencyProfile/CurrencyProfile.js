import React from "react";
import Loader from "../Loader/Loader";
import CurrentHistoryContainer from "../CurrencyHistory/CurrencyHistoryContainer";
import styles from "./CurrencyProfile.css";

const CurrencyTable = ({ currencyInfo, currencyPrice }) => {
    return (
        <Loader>
            <h1 className={styles["currencyName"]}>{currencyInfo.FullName}</h1>
            <table className={styles["currencyTable"]}>
                <tbody>
                    <tr className={styles["currencyTableRow"]}>
                        <td className={styles["currencyTableRow__data"]}>
                            Price:
                        </td>
                        <td
                            className={`${styles["currencyTableRow__data"]} ${
                                styles["currencyTableRow__value"]
                            }`}
                        >
                            {currencyPrice.USD.PRICE}
                        </td>
                    </tr>

                    <tr className={styles["currencyTableRow"]}>
                        <td className={styles["currencyTableRow__data"]}>
                            Market Rank:
                        </td>
                        <td
                            className={`${styles["currencyTableRow__data"]} ${
                                styles["currencyTableRow__value"]
                            }`}
                        >
                            {currencyInfo.SortOrder}
                        </td>
                    </tr>

                    <tr className={styles["currencyTableRow"]}>
                        <td className={styles["currencyTableRow__data"]}>
                            Market Cap:
                        </td>
                        <td
                            className={`${styles["currencyTableRow__data"]} ${
                                styles["currencyTableRow__value"]
                            }`}
                        >
                            {currencyPrice.USD.MKTCAP}
                        </td>
                    </tr>

                    <tr className={styles["currencyTableRow"]}>
                        <td className={styles["currencyTableRow__data"]}>
                            Total Supply:
                        </td>
                        <td
                            className={`${styles["currencyTableRow__data"]} ${
                                styles["currencyTableRow__value"]
                            }`}
                        >
                            {currencyPrice.USD.SUPPLY}
                        </td>
                    </tr>

                    <tr className={styles["currencyTableRow"]}>
                        <td className={styles["currencyTableRow__data"]}>
                            Today's High/Low
                        </td>
                        <td
                            className={`${styles["currencyTableRow__data"]} ${
                                styles["currencyTableRow__value"]
                            }`}
                        >
                            {`${currencyPrice.USD.HIGH24HOUR}/${
                                currencyPrice.USD.LOW24HOUR
                            }`}
                        </td>
                    </tr>

                    <tr className={styles["currencyTableRow"]}>
                        <td className={styles["currencyTableRow__data"]}>
                            Change % Last 24 Hours:
                        </td>
                        <td
                            className={`${styles["currencyTableRow__data"]} ${
                                styles["currencyTableRow__value"]
                            }`}
                        >
                            {currencyPrice.USD.CHANGEPCT24HOUR}
                        </td>
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
    errorFetchingData,
    errorMessage
}) => {
    if (
        (fetchingCurrencyData || !currencyPrice.hasOwnProperty("USD")) &&
        !errorFetchingData
    ) {
        return null;
    } else if (errorFetchingData) {
        return (
            <h1 className={styles["errorMessage"]}>Error: {errorMessage}</h1>
        );
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
            <div className={styles["currencyProfile"]}>
                <div className={styles["currencyProfile__historyContainer"]}>
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
