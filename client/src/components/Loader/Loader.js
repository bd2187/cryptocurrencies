import React, { Component } from "react";
import styles from "./Loader.css";

class Loader extends Component {
    constructor(props) {
        super(props);
        this.loaderRef = React.createRef();
        this.toggleLoading = this.toggleLoading.bind(this);
    }

    toggleLoading(isLoading) {
        // todo: adjust conditions
        if (isLoading && this.loaderRef.current) {
            this.loaderRef.current.classList.add(
                styles["display-loading-spinner"]
            );
        } else {
            setTimeout(() => {
                this.loaderRef.current.classList.remove(
                    styles["display-loading-spinner"]
                );
            }, 1000);
        }
    }

    render() {
        const { isLoading, children } = this.props;

        this.toggleLoading(isLoading);

        return (
            <div
                className={`${styles["loader"]} ${
                    styles["display-loading-sip"]
                }`}
            >
                {children}
                <div
                    className={`${styles["ball-loader-container"]} ${
                        styles["display-loading-spinner"]
                    }`}
                    ref={this.loaderRef}
                >
                    <div className={styles["ball-loader"]}>
                        <div className={styles["ball-bounce1"]} />
                        <div className={styles["ball-bounce2"]} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Loader;
