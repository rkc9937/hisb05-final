// JavaScript logic
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

// Load and display the Grammy references bar chart
async function createGrammyChart() {
    // Load the CSV data
    const data = await d3.csv("data/grammy_references_by_year.csv", d => ({
        year: +d.year,
        count: +d.count
    }));

    // Create the bar chart using Observable Plot
    const chart = Plot.plot({
        title: "Grammy References in Songs by Year",
        width: 800,
        height: 400,
        marginBottom: 50,
        marginLeft: 60,
        x: {
            label: "Year",
            tickFormat: d => d.toString(),
            tickRotate: -90
        },
        y: {
            label: "Number of Songs",
            grid: true
        },
        marks: [
            Plot.barY(data, {
                x: "year",
                y: "count",
                fill: "steelblue",
                tip: true
            }),
            Plot.ruleY([0])
        ]
    });

    // Append the chart to the page (you can change the selector as needed)
    const container = document.querySelector("#grammy-chart") || document.body;
    container.appendChild(chart);
}

// Run the chart creation
createGrammyChart();