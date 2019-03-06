import React from "react";
import styles from "./Loader.css";

const Loader = ({ isLoading, children }) => {
    const displayLoader = () => {
        return isLoading ? styles["display-loading-spinner"] : "";
    };

    console.warn(isLoading);
    return (
        <div className={styles["loader"]}>
            {children}

            <div
                className={`${
                    styles["ball-loader-container"]
                } ${displayLoader()}`}
            >
                <div className={styles["ball-loader"]}>
                    <div className={styles["ball-bounce1"]} />
                    <div className={styles["ball-bounce2"]} />
                </div>
            </div>
        </div>
    );
};

export default Loader;
