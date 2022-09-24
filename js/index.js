// create 3 evenly spaced circles for projects
var margin = ({top: 50, right: 100, bottom: 50, left: 100})
var e = document.documentElement;
var c = document.getElementsByClassName('myProjects')[0];       // change this accordding to class of the div
const windowW = window.innerWidth || e.clientWidth || c.clientWidth
const width = windowW - (margin.left + margin.right);
const height = (width / 3) - (margin.top + margin.bottom)
console.log(width)

// create data
var projectsList = ['research', 'data viz', 'machine learning'];

var svg = d3.select('#myProjects')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('class', 'projectCircles');

var palette = d3.scaleOrdinal()
                .range(['#1010A6', '#A8181C', '#006611'])
                .domain(projectsList);


// add on hover functions
const mouseOver = function(event, d) {
    // console.log(d)
    var selectedProj = d;

    circles.attr('fill', d => {
        // return '#FFB319'
        if (d === selectedProj) {
            return '#FFB319'
        } else {
            return palette(d)
        }
    });
};

const circles = svg.selectAll('.myCircles')
                .data(projectsList)
                .enter()
                .append('g')
                .attr('class', 'myCircles')
                .attr('transform', (d, i) => {
                    return `translate(${200 + (i * 300)}, 0)`
                });

// create 3 evenly spaced circles
circles.append('circle')
        .attr('cx', (d, i) => {200 * i})
        .attr('cy', height / 2)
        .attr('r', width / 10)
        .attr('fill', d => {
            return palette(d)
        })
        .on('mouseover', function(event, d) {
            // console.log(d)
            var selectedProj = d;
        
            circles.style('fill', d => {
                    // return '#FFB319'
                    if (d === selectedProj) {
                        return '#FFB319'
                    } else {
                        return palette(d)
                    }
                })
                .style('stroke', d => {
                    // return '#FFB319'
                    if (d === selectedProj) {
                        return '#FFB319'
                    } else {
                        return palette(d)
                    }
                });
        });
        // .on('mouseover', function() {
        //     d3.select(this)
        //         .style('fill', '#FFB319');
        // })
        // .on('mousemove', function() {
        //     d3.select(this)
        //     .style('fill', '#FFB319');
        // })
        // .on('mouseout', function() {
        //     d3.select(this)
        //         .style('fill', d => {
        //             return palette(d)
        //         })
        // });

// add images on top of circles
icon = circles.append('svg:image')
            .attr('xlink:href', d => {
                if (d === 'research') {
                    return '../image/research.png'
                } else if (d === 'data viz') {
                    return '../image/viz.png'
                } else if (d === 'machine learning') {
                    return '../image/ml.png'
                }
            })
            .attr('x', (d, i) => { return (10 * i) - 100})
            .attr('y', 30)
            .attr('width', width / 6)
            .attr('height', width / 6);

// add hover function
// svg.selectAll('.myCircles')
//     .on('mouseover', function() {
//         d3.select(this)
//             .attr('fill', '#FFB319')
//     })

