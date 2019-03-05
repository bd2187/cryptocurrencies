import React, { Component, Fragment } from "react";
import styles from "./Search.css";
import { Link } from "react-router-dom";

const SearchResults = ({ results, selected, updateSelected, resetList }) => {
    return (
        <ul className={styles["search-results"]}>
            <li>Coins</li>
            {results.map(function(result) {
                const link = `/search/${result.Symbol}`;

                return (
                    <li
                        key={result.FullName}
                        className={`${
                            result.Symbol === selected ? styles.selected : ""
                        }`}
                        onMouseEnter={() => updateSelected(result.Symbol)}
                    >
                        <Link className={styles["coin-link"]} to={link}>
                            {result.FullName}
                        </Link>
                    </li>
                );
            })}
            <li onClick={resetList}>Hide Results</li>
        </ul>
    );
};

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: ""
        };

        this.keyUp = this.keyUp.bind(this);
    }

    /**
     * Changes searchValue in state object. Debounces invocation
     * of updateQuery function provided via props.
     *
     * @param Object evt
     * @return
     */
    keyUp(evt) {
        // If user presses down key
        if (evt.keyCode === 40) {
            this.props.handleListNavigation("next");
            return;
        }

        // If user presses up key
        if (evt.keyCode === 38) {
            this.props.handleListNavigation("prev");
            return;
        }

        this.setState({ searchValue: evt.target.value });
        var value = evt.target.value;

        let timerId;

        if (timerId) clearTimeout(timerId);

        /*
            Debounce invocation so it is not called
            after each keystroke
        */
        timerId = setTimeout(() => {
            this.props.updateQuery(value);
            timerId = null;
        }, 1000);
    }

    render() {
        const {
            searchResults,
            selected,
            searchCoin,
            updateSelected,
            resetList
        } = this.props;

        return (
            <div className={styles.search}>
                <form onSubmit={searchCoin}>
                    <input
                        type="text"
                        value={this.state.value}
                        onKeyUp={this.keyUp}
                        placeholder="Enter currency here"
                    />
                </form>
                {searchResults.length > 0 ? (
                    <SearchResults
                        results={searchResults}
                        selected={selected}
                        updateSelected={updateSelected}
                        resetList={resetList}
                    />
                ) : null}
            </div>
        );
    }
}

export default Search;
