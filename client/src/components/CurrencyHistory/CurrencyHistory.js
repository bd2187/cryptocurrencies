import React from "react";
import Loading from "../Loading/Loading";
import Loader from "../Loader/Loader";
import styles from "./CurrencyHistory.css";

import { Line } from "react-chartjs-2";

/*
const CurrencyHistory = ({
    historicalCurrencyData,
    updateTimeline,
    fetchingCurrencyData,
    fetchingCurrencyError
}) => {
    console.warn(d3);

    return null;
    // if (historicalCurrencyData.length > 0) {
    //     return <div>{historicalCurrencyData[0].high}</div>;
    // } else if (fetchingCurrencyData) {
    //     return <p>loading</p>;
    // } else if (fetchingCurrencyError) {
    //     return <p>error</p>;
    // } else {
    //     return null;
    // }
};
*/

const TimelineButtons = ({ updateTimeline, coinName, currentTimeline }) => {
    const isActive = timeline => {
        return currentTimeline === timeline ? styles.active : "";
    };

    return (
        <div className={styles["timeline-buttons-container"]}>
            <button
                className={isActive("day")}
                onClick={updateTimeline.bind(null, coinName, "day")}
            >
                24h
            </button>

            <button
                className={isActive("week")}
                onClick={updateTimeline.bind(null, coinName, "week")}
            >
                7d
            </button>
            <button
                className={isActive("month")}
                onClick={updateTimeline.bind(null, coinName, "month")}
            >
                1m
            </button>
            <button
                className={isActive("year")}
                onClick={updateTimeline.bind(null, coinName, "year")}
            >
                1y
            </button>
        </div>
    );
};

class CurrencyHistory extends React.Component {
    constructor(props) {
        super(props);

        this.updateChartData = this.updateChartData.bind(this);
        this.state = {
            yAxisLabels: [],
            xAxisLabels: []
        };
    }

    updateChartData(historicalCurrencyData) {
        const yAxisLabels = [];
        const xAxisLabels = [];

        for (let i = 0; i < historicalCurrencyData.length; i++) {
            const currentItem = historicalCurrencyData[i];
            const time = new Date(currentItem.time * 1000);

            const month = time.getMonth();
            const date = time.getDate();
            const year = time.getFullYear();

            const hour = time.getHours();
            const minutes = time.getMinutes();

            let adjustedMinutes =
                parseInt(minutes) < 10 ? minutes + "0" : parseInt(minutes);

            if (this.props.timeline === "day") {
                yAxisLabels.push(
                    `${month + 1}/${date}/${year} ${hour}:${adjustedMinutes}`
                );
            } else {
                yAxisLabels.push(`${month + 1}/${date}/${year}`);
            }

            xAxisLabels.push(currentItem.high);
        }

        this.setState({ yAxisLabels, xAxisLabels });
    }

    componentDidUpdate(prevProps) {
        const { historicalCurrencyData } = this.props;

        let isTheSame = true;

        /*
            If both historicalCurrencyData arrays have items from prevProps object and this.props,
            check if both arrays are the same
        */
        if (
            prevProps.historicalCurrencyData.length > 1 &&
            historicalCurrencyData.length > 1
        ) {
            const firstItemFromPrevious = prevProps.historicalCurrencyData[0];
            const firstItemFromCurrent = historicalCurrencyData[0];

            const keys1 = Object.keys(firstItemFromPrevious);
            const keys2 = Object.keys(firstItemFromCurrent);

            const prev = keys1.map(prop => firstItemFromPrevious[prop]);
            const second = keys2.map(prop => firstItemFromCurrent[prop]);

            for (let i = 0; i < prev.length; i++) {
                if (second.indexOf(prev[i]) === -1) {
                    isTheSame = false;
                    break;
                }
            }
        }

        /*
            Update chart if either:
            1) The two arrays have different lengths
            2) The two arrays are not the same
        */
        if (
            prevProps.historicalCurrencyData.length !==
                historicalCurrencyData.length ||
            !isTheSame
        ) {
            this.updateChartData(historicalCurrencyData);
        }
    }

    render() {
        if (this.state.yAxisLabels.length === 0) return null;

        const data = {
            labels: this.state.yAxisLabels,
            datasets: [
                {
                    data: this.state.xAxisLabels,
                    borderColor: ["rgba(105, 158, 212, 0.6)"],
                    lineTension: 0,
                    label: "Currency USD"
                }
            ]
        };

        const isLoading = () => {
            return this.props.fetchingCurrencyData;
        };

        return (
            <div className={styles["currency-history-container"]}>
                <TimelineButtons
                    updateTimeline={this.props.updateTimeline}
                    coinName={this.props.currencyInfo.CoinInfo.Name}
                    currentTimeline={this.props.timeline}
                />
                <Loader isLoading={this.props.fetchingCurrencyData}>
                    <div className="chart">
                        <Line
                            data={data}
                            options={{
                                maintainAspectRatio: true,
                                legend: {
                                    position: "bottom"
                                }
                            }}
                        />
                    </div>
                </Loader>
            </div>
        );
    }
}

export default CurrencyHistory;
