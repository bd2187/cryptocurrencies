import React, { Component } from "react";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: ""
        };

        this.onChange = this.onChange.bind(this);
    }

    /**
     * Changes searchValue in state object. Debounces invocation
     * of updateQuery function provided via props.
     *
     * @param Object evt
     * @return
     */
    onChange(evt) {
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
        const { searchResults } = this.props;
        return (
            <div>
                <input
                    type="text"
                    value={this.state.value}
                    onChange={this.onChange}
                />
                <ul>
                    {searchResults.map(function(result) {
                        return <li key={result.FullName}>{result.FullName}</li>;
                    })}
                </ul>
            </div>
        );
    }
}

export default Search;
