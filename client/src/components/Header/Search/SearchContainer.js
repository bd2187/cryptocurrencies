import React, { Component } from "react";
import Search from "./Search";
import { withRouter, Redirect } from "react-router-dom";

class SearchContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            searchResults: [],
            selected: ""
        };

        this.updateQuery = this.updateQuery.bind(this);
        this.handleListNavigation = this.handleListNavigation.bind(this);
        this.updateSelected = this.updateSelected.bind(this);
        this.searchCoin = this.searchCoin.bind(this);
        this.resetList = this.resetList.bind(this);
    }

    /**
     * Reset search results by calling this.resetList
     * when user changes routes
     * @param Object prevProps
     * @return
     */
    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.resetList();
        }
    }

    /**
     * Updates user's query after they finish typing a currency. Once done typing,
     * we search for top 8 results that matches user's query.
     * @param String userValue
     * @return
     */
    updateQuery(userValue = "") {
        // Immediately return if value is empty
        if (!/\S/.test(userValue)) {
            this.setState({
                query: "",
                searchResults: []
            });

            return;
        }

        const allCoins = this.props.allCoins.slice();
        const filteredCoins = [];

        // filter through allCoins and display them in results
        for (let i = 0; i < allCoins.length; i++) {
            const lowerCaseWord = word =>
                word
                    .split(" ")
                    .join("")
                    .toLowerCase();

            const lowerCasedQuery = lowerCaseWord(userValue);
            const lowerCasedCoinName = lowerCaseWord(allCoins[i].FullName);

            if (lowerCasedCoinName.includes(lowerCasedQuery)) {
                filteredCoins.push(allCoins[i]);
            }
        }

        // Sort Array from highest to lowest marketcap
        const sortedFilteredCoins = filteredCoins.sort(function(
            leftItem,
            rightItem
        ) {
            return parseInt(leftItem.SortOrder) - parseInt(rightItem.SortOrder);
        });

        // Only disply the top 8 results
        const topEightResults = sortedFilteredCoins.slice(0, 8);

        this.setState({
            query: userValue,
            searchResults: topEightResults,
            selected: topEightResults[0].Symbol
        });
    }

    /**
     * Handles highlighting the appropriate currency in the
     * dropdown menu when user navigates through
     * the dropdown with the up/down arrow.
     *
     * @param String direction (i.e "next" or "prev")
     * @return
     */
    handleListNavigation(direction = "") {
        var { searchResults, selected } = this.state;

        for (let i = 0; i < searchResults.length; i++) {
            if (searchResults[i].Symbol === selected) {
                let updatedIndex = direction === "next" ? i + 1 : i - 1;
                if (searchResults[updatedIndex]) {
                    this.updateSelected(searchResults[updatedIndex].Symbol);
                }

                break;
            }
        }
    }

    /**
     * Updates selected coin.
     * @param String coinName
     * @return
     */
    updateSelected(coinName) {
        this.setState({
            selected: coinName
        });
    }

    /**
     * Redirects user to searched coin
     * @param Object e
     * @return
     */
    searchCoin(e) {
        e.preventDefault();

        this.props.history.push(`/search/${this.state.selected}`);
    }

    /**
     * Resets searchResults from state object
     * @param
     * @return
     */
    resetList() {
        this.setState({ searchResults: [] });
    }

    render() {
        return (
            <Search
                updateQuery={this.updateQuery}
                searchResults={this.state.searchResults}
                handleListNavigation={this.handleListNavigation}
                selected={this.state.selected}
                searchCoin={this.searchCoin}
                updateSelected={this.updateSelected}
                resetList={this.resetList}
            />
        );
    }
}

export default withRouter(SearchContainer);
