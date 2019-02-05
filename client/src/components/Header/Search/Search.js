import React, { Component } from "react";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: ""
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(evt) {
        this.setState({ searchValue: evt.target.value });
    }

    render() {
        return (
            <input
                type="text"
                value={this.state.value}
                onChange={this.onChange}
            />
        );
    }
}

export default Search;
