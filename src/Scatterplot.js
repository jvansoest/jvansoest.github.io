import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./Scatterplot.css";

var colors = [
  "#4C72B0",
  "#DD8452",
  "#55A868",
  "#C44E52",
  "#8172B3",
  "#937860",
  "#DA8BC3",
  "#8C8C8C",
  "#CCB974",
  "#64B5CD",
];
var parseDate = d3.timeParse("%Y-%m-%d");
var symbol = d3.symbol();
var symbols = [
  d3.symbolDiamond,
  d3.symbolSquare,
  d3.symbolStar,
  d3.symbolTriangle,
  d3.symbolCircle,
];

const Scatterplot = (props) => {
  const node = useRef(null);

  const drawChart = () => {
    const list_of_dates = [
      ...new Set(props.data.result.map((e) => parseDate(e.date))),
    ];

    var mindate = list_of_dates.reduce(function (a, b) {
      return a < b ? a : b;
    });
    mindate = mindate.setDate(mindate.getDate() - 14);
    var maxdate = list_of_dates.reduce(function (a, b) {
      return a > b ? a : b;
    });
    maxdate = maxdate.setDate(maxdate.getDate() + 14);

    let word2id = {};
    props.keywords.forEach((kw, i) => (word2id[kw] = i));
    let dataset = props.data.result.map((e) => [
      parseDate(e.date),
      e.keyness,
      word2id[e.word],
    ]);

    // Setup settings for graphic
    var canvas_width = 1000;
    var canvas_height = 400;
    var padding = 50; // for chart edges
    const plotEnd = canvas_width - 170;
    const legendSize = canvas_width - plotEnd;

    var xScale = d3
      .scaleTime()
      .domain([mindate, maxdate]) // values between for month of january
      .range([padding, canvas_width - padding * 2 - legendSize]); // map these the the chart width = total width minus padding at both sides

    var yScale = d3
      .scaleLinear() // yScale is height of graphic
      .domain([
        -15,
        d3.max(dataset, function (d) {
          return d[1]; // input domain
        }) + 10,
      ])
      .range([canvas_height - padding, padding]); // remember y starts on top going down so we flip

    // Define X axis
    var xAxis = d3.axisBottom(xScale).ticks(20);

    // Define Y axis
    var yAxis = d3.axisLeft(yScale).ticks(10);

    // Create SVG element
    var svg = d3
      .select(node.current) // This is where we put our vis
      .attr("width", canvas_width)
      .attr("height", canvas_height);

    ////////////LEGEND////////////////c
    var legendDots = svg
      .selectAll("legendDots")
      .data(props.keywords)
      .enter()
      .append("path")
      .attr(
        "d",
        symbol.size(50).type((d, i) => symbols[i % 5])
      )
      .attr("fill", function (d, i) {
        return colors[i % 12];
      })
      .attr("stroke", "#000")
      .attr("stroke-width", 0)
      .attr("transform", function (d, i) {
        return "translate(" + plotEnd + "," + (100 + i * 25) + ")";
      });
    // Add one dot in the legend for each name.
    var legendLabels = svg
      .selectAll("mylabels")
      .data(props.keywords)
      .enter()
      .append("text")
      .attr("x", plotEnd + 10)
      .attr("y", function (d, i) {
        return 100 + i * 25;
      }) // 100 is where the first dot appears. 25 is the distance between dots
      .style("fill", function (d, i) {
        return colors[i % 12];
      })
      .text(function (d) {
        return d;
      })
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle");

    legendLabels.on("mouseover", function (e, d) {
      var groupID = props.keywords.indexOf(d);
      var matches = dots
        .filter(function (d) {
          return d[2] !== groupID;
        })
        .attr("opacity", 0.5);
    });

    legendLabels.on("mouseout", function (e, d) {
      var groupID = props.keywords.indexOf(d);
      var matches = dots
        .filter(function (d) {
          return d[2] !== groupID;
        })
        .attr("opacity", 1);
    });
    ////////////LEGEND////////////////

    ////////SCATTERDOTS//////////////
    var dots = svg.selectAll(".dot").data(dataset).enter().append("path");

    dots
      .attr(
        "d",
        symbol.size(20).type((d) => symbols[d[2] % 5])
      )
      .attr("fill", function (d) {
        return colors[d[2] % 12];
      })
      .attr("stroke", "#000")
      .attr("stroke-width", 0)
      .attr("transform", function (d) {
        return "translate(" + xScale(d[0]) + "," + yScale(d[1]) + ")";
      });

    dots.on("mouseover", (e, d) => {
      var groupID = d[2];
      var matches = dots
        .filter(function (d) {
          return d[2] !== groupID;
        })
        .attr("opacity", 0.5);
    });

    dots.on("mouseout", (e, d) => {
      var groupID = d[2];
      var matches = dots
        .filter(function (d) {
          return d[2] !== groupID;
        })
        .attr("opacity", 1);
    });

    /////////////////////////////////

    // Add to X axis
    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (canvas_height - padding) + ")")
      .call(xAxis)
      .selectAll("text")
      .attr("y", 7)
      .attr("x", 5)
      .attr("dy", ".35em")
      .attr("transform", "rotate(45)")
      .style("text-anchor", "start");

    // Add to Y axis
    svg
      .append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + padding + ",0)")
      .call(yAxis);

    ///////////// Y AXIS LABEL ////////////
    svg
      .append("text")
      .attr("class", "y label")
      .attr("text-anchor", "middle")
      .attr("y", 6)
      .attr("x", -canvas_height / 2)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text("keyness score");
    ///////////////////////////////////////

    ///////// GRID /////////////
    d3.selectAll("g.y.axis g.tick")
      .append("line")
      .attr("class", "gridline")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", plotEnd - 135)
      .attr("y2", 0);

    d3.selectAll("g.x.axis g.tick")
      .append("line")
      .attr("class", "gridline")
      .attr("x1", 0)
      .attr("y1", -canvas_height + padding * 2)
      .attr("x2", 0)
      .attr("y2", 0);
    //////////
  };

  useEffect(() => {
    d3.select(node.current).selectAll("*").remove().exit();
    drawChart();
  }, [props.data]);

  return (
    <div>
      <svg width="100%" height="450px" ref={node}></svg>
    </div>
  );
};

export default Scatterplot;
