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

        // var foo = [
        //     {
        //       close: 3571.92,
        //       high: 3599.83,
        //       low: 3535.19,
        //       open: 3567.73,
        //       time: 1548028800,
        //       volumefrom: 36101.4,
        //       volumeto: 129000924.6
        //     }
        //   ];

        //   var bar = [
        //     {
        //       close: 3571.92,
        //       high: 3599.83,
        //       low: 3535.19,
        //       open: 3567123.73,
        //       time: 1548028800,
        //       volumefrom: 36101.4,
        //       volumeto: 129000924.6
        //     }
        //   ];

        //   var first = [];
        //   var second = [];

        //   for (let i = 0; i < foo.length; i++) {
        //       var keys1 = Object.keys(foo[i]);
        //     keys1.forEach(function(item){
        //           first.push(foo[i][item])
        //     });

        //     var keys2 = Object.keys(bar[i]);
        //     keys2.forEach(function(item){
        //           second.push(bar[i][item])
        //     });

        //   }

        //   var isTheSame = true;
        //   for(let i = 0; i < first.length; i++) {
        //       if(second.indexOf(first[i]) === -1) {
        //         isTheSame = false;
        //         break;
        //     }
        //   }

        //   console.warn(isTheSame)

        const foo = prevProps.historicalCurrencyData[0];
        const bar = historicalCurrencyData[0];
        console.warn(foo);
        /*
            Update chart if either:
            1) The two arrays have different lengths
            2) The two arrays are not the same
        */
        if (
            prevProps.historicalCurrencyData.length !==
            historicalCurrencyData.length
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
                    backgroundColor: ["rgba(255, 99, 132, 0.6)"]
                }
            ]
        };

        return (
            <div className="chart">
                <Line data={data} options={{ maintainAspectRatio: true }} />
            </div>
        );
    }
}

export default CurrencyHistory;
