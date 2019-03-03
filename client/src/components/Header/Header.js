import React from "react";
import styles from "./Header.css";
import SearchContainer from "./Search/SearchContainer";
import { Link } from "react-router-dom";

const Header = ({ allCoins }) => {
    return (
        <div className={styles.header}>
            <Link to="/" className={styles["homepage-link"]}>
                CryptoCurrencies
            </Link>
            <SearchContainer allCoins={allCoins} />
        </div>
    );
};

export default Header;
