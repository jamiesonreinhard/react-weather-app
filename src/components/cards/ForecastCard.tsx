import { useRef, useEffect } from "react";
import * as d3 from "d3";

interface ForecastCardProps {
    dayForecast: {
        date: Date;
        high: number;
        low: number;
        overcast: string;
        rawForecasts: any[];
    };
}

interface DataPoint {
    time: Date;
    temp: number;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ dayForecast }) => {
    const { date, high, low, overcast, rawForecasts } = dayForecast;
    const svgRef = useRef(null);
    const day = date.toLocaleDateString(undefined, { weekday: 'long' });

    useEffect(() => {
        if (!rawForecasts) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // Clear SVG content before new drawing

        const width = 200;
        const height = 100;
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };

        // Preparing the data
        const data = rawForecasts
            .filter(d => d.dt && d.main && d.main.temp) // Filter out any undefined or incomplete data
            .map(d => ({
                time: new Date(d.dt * 1000),
                temp: d.main.temp
            }));

        // Set up scales
        // Set up scales
        const xScale = d3.scaleTime()
            .domain([
                d3.min(data, d => d.time) ?? new Date(), // Fallback to a default value if undefined
                d3.max(data, d => d.time) ?? new Date()
            ])
            .range([margin.left, width - margin.right]);

        const yScale = d3.scaleLinear()
            .domain([
                d3.min(data, d => d.temp - 10) ?? 0, // Fallback to a default value if undefined
                d3.max(data, d => d.temp + 10) ?? 100
            ])
            .range([height - margin.bottom, margin.top]);


        // Define the line
        const line = d3.line<DataPoint>()
            .x(d => xScale(d.time)) // x-axis: map each temperature to its corresponding date/time
            .y(d => yScale(d.temp)) // y-axis: map each temperature to its value
            .curve(d3.curveMonotoneX);

        // Draw the line
        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#CF6679")
            .attr("d", line);

        // Add axes
        svg.append("g")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(xScale).ticks(3)) // Reduce number of ticks
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");

        svg.append("g")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(yScale).ticks(3));
    }, [rawForecasts]);

    return (
        <div className="p-4 bg-gray-200 rounded-lg shadow-md">
            <div className="flex md:flex-col">
                <div className="flex flex-col">
                    <h3 className="font-bold">{day}</h3>
                    <p>High: {Math.round(high)}°F</p>
                    <p>Low: {Math.round(low)}°F</p>
                    <p>Overcast: {overcast}</p>
                </div>
                <svg ref={svgRef} width={200} height={140}></svg>
            </div>
        </div>
    );
};

export default ForecastCard;
