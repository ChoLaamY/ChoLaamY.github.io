// define margin / height and width
var e = document.documentElement;
var c = document.getElementsByClassName('myProjects')[0];       // change this accordding to class of the div
const windowW = window.innerWidth || e.clientWidth || c.clientWidth
var margin = ({top: windowW / 25, right: windowW / 12, bottom: windowW / 25, left: windowW / 12})     // {top: 50, right: 100, bottom: 50, left: 100}
const width = windowW - (margin.left + margin.right);
const height = (width / 3) - margin.top + margin.bottom
console.log(width)
console.log(windowW)

// create data
var projectsList = {name: ['Research', 'Data Visualization', 'Machine Learning'],
                    img: ['../image/research.png', '../image/viz.png', '../image/ml.png']} ;


var svg = d3.select('#myProjects')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('class', 'projectCircles');

var palette = d3.scaleOrdinal()
                .range(['#1010A6', '#A8181C', '#006611'])
                .domain(projectsList.name);


// define hover functions
const mouseOver = function(event, d) {
    // console.log(d)
    var selectedProj = d;

    circles.selectAll('circle')
            .attr('fill', d => {
            // return '#FFB319'
            if (d === selectedProj) {
                return '#FFB319'
            } else {
                return palette(d)
            }
        })
        .attr('stroke', d => {
            // return '#FFB319'
            if (d === selectedProj) {
                return '#FFB319'
            } else {
                return palette(d)
            }
        });

};

const mouseMove = function(event, d) {
    var selectedProj = d;

    circles.selectAll('circle')
        .attr('fill', d => {
            // return '#FFB319'
            if (d === selectedProj) {
                return '#FFB319'
            } else {
                return palette(d)
            }
        })
        .attr('stroke', d => {
            // return '#FFB319'
            if (d === selectedProj) {
                return '#FFB319'
            } else {
                return palette(d)
            }
        });
}

const mouseLeave = function(event, d) {

    circles.selectAll('circle')
            .attr('fill', d => {
                return palette(d)
            })
            .attr('stroke', null)
}

// create evenly spaced circles
const circles = svg.selectAll('.myCircles')
                .data(projectsList.name)
                .enter()
                .append('g')
                .attr('class', 'myCircles')
                .attr('transform', (d, i) => {
                    return `translate(${(margin.left * 2) + (i * (margin.left * 3))}, 0)` // ${200 + (i * 300)}
                });

// add a tag for link on click
circles.append('svg:a')
        .attr('xlink:href', d=> {       //'Research', 'Data Visualization', 'Machine Learning'
            if (d === 'Research') {
                return 'research.html'
            } else if (d === 'Data Visualization') {
                return 'dataviz.html'
            } else if (d === 'Machine Learning') {
                return 'ml.html'
            }
        })
        .append('circle')
        .attr('cx', (d, i) => {(margin.left * 2) * i})    // {200 * i}
        .attr('cy', height / 2.9)
        .attr('r', width / 10)
        .attr('fill', d => {        
            return palette(d)
        })
        .attr('stroke', null)
        .on('mouseover', mouseOver)
        .on('mousemove', mouseMove)
        .on('mouseout', mouseLeave);

// add images on top of circles
var icon = circles.append('svg:image')
                .data(projectsList.img)
                .attr('xlink:href', d => {
                    return d
                    // if (d === 'research') {
                    //     return '../image/research.png'
                    // } else if (d === 'data viz') {
                    //     return '../image/viz.png'
                    // } else if (d === 'machine learning') {
                    //     return '../image/ml.png'
                    // }
                })
                .attr('x', (d, i) => { return ((margin.bottom / 5) * i) - margin.left })     // (10 * i) - 100 }
                .attr('y', (margin.left / 3))      // 30
                .attr('width', width / 6)
                .attr('height', width / 6)
                .style('pointer-events', 'none')

// add text
var label = circles.append('text')
                    .attr('x', (d, i) => { return (i / margin.left) + (margin.bottom / 10)})   // (i / 100) + 5}
                    // .attr('x', height - (width / 2.8))
                    .attr('y', height / 1.3)
                    .text(d => { return d})
                    .style('text-anchor', 'middle')
                    .style('font-family', 'Tahoma')
                    .style('font-size', (margin.left / 4))         // 20
                    .style('fill', '#F2F2F2');
                    
