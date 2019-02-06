import React, { Component } from "react";
import Search from "./Search";

class SearchContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allCoins: [],
            query: "",
            searchResults: []
        };

        this.updateQuery = this.updateQuery.bind(this);
    }

    updateQuery(userValue = "") {
        // Immediately return if value is empty
        if (!/\S/.test(userValue)) {
            this.setState({
                query: "",
                searchResults: []
            });

            return;
        }

        const allCoins = this.state.allCoins.slice();
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

        this.setState({ query: userValue, searchResults: topEightResults });
    }

    componentDidMount() {
        (async () => {
            try {
                const allCoinsResponse = await fetch(
                    "https://min-api.cryptocompare.com/data/all/coinlist"
                );
                const parsedResponse = await allCoinsResponse.json();

                const responseKeys = Object.keys(parsedResponse.Data);
                const allCoins = [];
                for (let i = 0; i < responseKeys.length; i++) {
                    allCoins.push(parsedResponse.Data[responseKeys[i]]);
                }

                this.setState({ allCoins });
            } catch (err) {}
        })();
    }

    render() {
        return (
            <Search
                updateQuery={this.updateQuery}
                searchResults={this.state.searchResults}
            />
        );
    }
}

export default SearchContainer;
