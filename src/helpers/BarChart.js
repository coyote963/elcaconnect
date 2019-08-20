import React from 'react'
import moment from 'moment'
import * as d3 from 'd3'
class BarChart extends React.Component {
    
    componentDidMount() {
        const data = this.props.data.filter(
            e => moment().subtract(this.props.duration, 'day').isBefore(moment(e.dateCreated)) 
        )

        console.log(data)
        this.drawBarChart(data)
    }
    drawBarChart(data) {
        const canvasHeight = 400
        const canvasWidth = 600
        const margin = {top : 10, right: 30, bottom: 30, left : 40}
        const height = canvasHeight - margin.top - margin.bottom;
        const width = canvasWidth - margin.left - margin.right;
        
        var svgCanvas = d3.select(this.refs.canvas)
            .append("svg")
            .attr("width", canvasWidth)
            .attr("height", canvasHeight)
            .style("border", "1px solid black")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        //set up scales
        var x = d3.scaleTime()
            .domain(d3.extent(data, function(d) {
                return new Date(d.dateCreated)
            }))
            .rangeRound([0, width])
        var y = d3.scaleLinear()
            .range([height, 0]);
        
        //parse the dates
        
        data.forEach(d => {
            d.dateCreated = moment(d.dateCreated).toDate()
            console.log(d.dateCreated)
        })
        
        //set up histogram
        var histogram = d3.histogram()
            .value(function(d) { return d.dateCreated; })
            .domain(x.domain())
            .thresholds(x.ticks(d3.timeDay))
        //group into bin
        var bins = histogram(data)
        
        y.domain([0, d3.max(bins, d => d.length)])
        svgCanvas.selectAll("rect")
            .data(bins)
            .enter()
            .append("rect")
                .attr("class", "bar")
                .attr("x", 10)
                .attr("transform", function(d) {
                    return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
                .attr("width", function(d) {return x(d.x1) - x(d.x0) - 20;})
                .attr("height", function(d) { return height - y(d.length); })

        svgCanvas.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
        svgCanvas.append("g")
            .call(d3.axisLeft(y));
                    
        
    }
    render () {
        return (
            <div>
                <div ref="canvas"></div>
            </div>
        )
    }
}
export default BarChart