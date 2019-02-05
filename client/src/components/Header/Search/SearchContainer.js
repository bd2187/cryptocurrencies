import React, { Component } from "react";
import Search from "./Search";

class SearchContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allCoins: [],
            query: "",
            results: []
        };
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
        return <Search />;
    }
}

export default SearchContainer;
