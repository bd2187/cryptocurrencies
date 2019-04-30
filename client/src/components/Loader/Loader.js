import React, { Component } from "react";
import styles from "./Loader.css";

class Loader extends Component {
    constructor(props) {
        super(props);
        this.loaderRef = React.createRef();
        this.toggleLoading = this.toggleLoading.bind(this);
    }

    toggleLoading(isLoading) {
        if (isLoading && this.loaderRef.current) {
            this.loaderRef.current.classList.add(
                styles["ballLoaderContainer--display"]
            );
        } else {
            setTimeout(() => {
                this.loaderRef.current.classList.remove(
                    styles["ballLoaderContainer--display"]
                );
            }, 1000);
        }
    }

    render() {
        const { isLoading, children } = this.props;

        this.toggleLoading(isLoading);

        return (
            <div className={`${styles["loader"]}`}>
                {children}
                <div
                    className={`${styles["ballLoaderContainer"]} ${
                        styles["ballLoaderContainer--display"]
                    }`}
                    ref={this.loaderRef}
                >
                    <div className={styles["ballLoader"]}>
                        <div className={styles["ballLoader__ballBounce1"]} />
                        <div className={styles["ballLoader__ballBounce2"]} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Loader;
