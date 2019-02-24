import React from "react";

import { Bar, Line, Pie } from "react-chartjs-2";
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
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

        const yAxisLabels = [];
        const xAxisLabels = [];

        for (let i = 0; i < historicalCurrencyData.length; i++) {
            const currentItem = historicalCurrencyData[i];
            const time = new Date(currentItem.time * 1000);
            const month = time.getMonth();
            const date = time.getDate();
            const year = time.getFullYear();

            yAxisLabels.push(`${months[month]} ${date}, ${year}`);
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
                    borderColor: ["rgba(255, 99, 132, 0.6)"],
                    lineTension: 0,
                    label: "Currency USD"
                }
            ]
        };
        console.warn(this.props);
        return (
            <div>
                <div className="chart">
                    <div>
                        <button>7d</button>
                        <button>1m</button>
                        <button>1y</button>
                    </div>
                    <Line
                        data={data}
                        options={{
                            maintainAspectRatio: true
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default CurrencyHistory;
