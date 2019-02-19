import React from "react";
import * as d3 from "d3";
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

        this.chartRef = React.createRef();
        this.createChart = this.createChart.bind(this);
    }

    createChart(historicalCurrencyData) {
        this.chartRef.current.innerHTML = "";
        const width = 700;
        const height = 500;

        const firstDate = new Date(historicalCurrencyData[0].time);
        const lastDate = new Date(
            historicalCurrencyData[historicalCurrencyData.length - 1].time
        );

        var highestVal = historicalCurrencyData.reduce(function(
            accumulator,
            currentValue
        ) {
            var highestValueOfDay = parseInt(currentValue.high);

            return highestValueOfDay > accumulator
                ? highestValueOfDay
                : accumulator;
        },
        0);

        const chart = d3
            .select(this.chartRef.current)
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 960 500")
            .append("g")
            .attr("transform", "translate(100, 0)");

        const x = d3
            .scaleTime()
            .domain([firstDate, lastDate])
            .range([0, width]);

        const y = d3
            .scaleLinear()
            .domain([0, highestVal + 100])
            .range([height, 0]);

        const colors = d3
            .scaleOrdinal()
            .domain(["currencies"])
            .range(["blue"]);

        const graph = chart
            .selectAll(".graph")
            .data(historicalCurrencyData)
            .enter("g");
        // .attr("class", "graph");

        const parseTime = d3.timeParse("%B %d, %Y");

        graph.append("path").attr("d", function(parentData) {
            return d3
                .line()
                .x(function(d) {
                    return x(parseTime(new Date(d.time)));
                })
                .y(function(d) {
                    return y(d.high);
                });
        });

        // graph
        //     .append("path")
        //     .attr("class", "line")
        //     .style("stroke", d => {
        //         return colors(d.high);
        //     })
        //     .attr("d", parentData => {
        //         return d3
        //             .line()
        //             .x(d => {
        //                 console.warn(d);
        //                 return x(parseTime(parentData.time));
        //             })
        //             .y(d => y(parentData.high));
        //     });

        // .y((d) => {return this.y(d);}).curve();

        chart
            .append("g")
            .attr("class", "axis axis--x")
            .attr("transform", `translate(0,${y(0) - 20})`)
            .call(d3.axisBottom(x));

        chart
            .append("g")
            .attr("class", "axis axis--y")
            .attr("transform", `translate(0,0)`)
            .call(d3.axisLeft(y));
    }

    componentDidUpdate(prevProps) {
        const { historicalCurrencyData } = this.props;
        if (
            prevProps.historicalCurrencyData.length !==
            historicalCurrencyData.length
        ) {
            this.createChart(historicalCurrencyData);
        }
    }

    render() {
        return (
            <div style={{ backgroundColor: "blue" }}>
                <svg ref={this.chartRef} />
            </div>
        );
    }
}

export default CurrencyHistory;
