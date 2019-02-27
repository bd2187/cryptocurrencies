import React from "react";

class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.addEllipsis = this.addEllipsis.bind(this);
        this.state = {
            loadingText: ""
        };
    }

    /**
     *
     * Checks if the loadingText in the state object has an ellipsis. If not,
     * a period is appended to the end of the string.
     * @param
     * @return
     */
    addEllipsis() {
        const { text: originalLoadingText } = this.props;
        const finalLoadingText = `${originalLoadingText}...`;

        if (this.state.loadingText === finalLoadingText) {
            this.setState({ loadingText: this.props.text });
        } else {
            let loadingTextFromState = this.state.loadingText;
            loadingTextFromState += ".";
            this.setState({ loadingText: loadingTextFromState });
        }
    }

    componentDidMount() {
        this.setState({ loadingText: this.props.text });
        this.interval = setInterval(this.addEllipsis, this.props.ms);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { loadingText } = this.state;
        return <p>{loadingText}</p>;
    }
}

export default Loading;
