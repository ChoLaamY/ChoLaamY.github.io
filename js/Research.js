// define margin / height and width
var e = document.documentElement;
var c = document.getElementsByClassName('myResearch')[0];       // change this accordding to class of the div
const windowW = window.innerWidth || e.clientWidth || c.clientWidth
var margin = ({top: windowW / 25, right: windowW / 12, bottom: windowW / 25, left: windowW / 12})     // {top: 50, right: 100, bottom: 50, left: 100}
const width = windowW - (margin.left + margin.right);
const height = (width / 3) - margin.top + margin.bottom
console.log(width)
console.log(windowW)

// create data
var resList = {name: ['Team', 'Learning'],
                img: ['../image/team.png', '../image/learn.png'],
                text1: ['Percieved Emotional Similarity', 'Learning for Yourself vs.'],
                text2: ['in Organizational Teams', 'Learning for Others']} ;

var svg = d3.select('.myResearch')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('class', 'projectCircles');

var palette = d3.scaleOrdinal()
                .range(['#33DDFF', '#F0F8FF'])
                .domain(resList.name);


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
        });
}

const mouseLeave = function(event, d) {

    circles.selectAll('circle')
            .attr('fill', d => {
                return palette(d)
            });
}

// define click function
var emotionInfo = document.querySelector('#emotionalSim')
var emotionButton = document.querySelector('#emotionButton')
var learningInfo = document.querySelector('#learning')
var learnButton = document.querySelector('#learnButton')

const clickCircle = function(event, d) {
    var selectedProj = d;
            // return console.log(selectedProj)

            if (selectedProj === 'Team') { 
                // info
                emotionInfo.style.display = 'block'
                learningInfo.style.display = 'none'
                // buttons
                emotionButton.style.display = 'block'
                learnButton.style.display = 'none'
            } else if (selectedProj === 'Learning') {
                // info divs
                learningInfo.style.display = 'block' 
                emotionInfo.style.display = 'none'
                // buttons
                learnButton.style.display = 'block' 
                emotionButton.style.display = 'none'
            }

            svg.selectAll('circle')
                .style('fill', d => {
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
                        return null
                    }
                })
                .attr('stroke-width', d => {
                    if (d === selectedProj) {
                        return 20
                    } else {
                        return null
                    }
                })
                .attr('r', d => {
                    // return '#FFB319'
                    if (d === selectedProj) {
                        return width / 9.5
                    } else {
                        return width / 10
                    }
                });

            svg.selectAll('.labels')
                .attr('opacity', d => {
                    // return '#FFB319'
                    if (d !== selectedProj) {
                        return 0.3
                    } else {
                        return 1
                    }
                });
}

// create evenly spaced circles
const circles = svg.selectAll('.myCircles')
                .data(resList.name)
                .enter()
                .append('g')
                .attr('class', 'myCircles')
                .attr('transform', (d, i) => {
                    return `translate(${(margin.left * 3) + (i * (margin.left * 4))}, 0)` // ${200 + (i * 300)}
                });

// add a tag for link on click
circles.append('circle')
        .attr('cx', (d, i) => {(margin.left * 2) * i})    // {200 * i}
        .attr('cy', height / 2.9)
        .attr('r', width / 10)
        .attr('fill', d => {        
            return palette(d)
        })
        .attr('stroke', null)
        .on('mouseover', mouseOver)
        .on('mousemove', mouseMove)
        .on('mouseout', mouseLeave)
        .on('click', clickCircle);

// add images on top of circles
var icon = circles.append('svg:image')
                .data(resList.img)
                .attr('xlink:href', d => {
                    return d
                })
                .attr('x', (d, i) => { return (i * (-margin.top / 5)) - (margin.left * 0.8) })     // (10 * i) - 100 }
                .attr('y', (margin.left / 3))      // 30
                .attr('width', width / 6)
                .attr('height', width / 6)
                .style('pointer-events', 'none')

// add text
var label = svg.selectAll('.labels')
                    .data(resList.name)
                    .enter()
                    .append('g')
                    .attr('class', 'labels')
                    .attr('transform', (d, i) => {
                        return `translate(${(margin.left * 3) + (i * (margin.left * 4))}, 0)` // ${200 + (i * 300)}
                    });

// add text first row
label.append('text')
    .attr('x', (d, i) => { return (i / margin.left) + (margin.bottom / 10)})   // (i / 100) + 5}
    .attr('y', height / 1.3)
    .data(resList.text1)
    .text(d => { return d })
    .style('text-anchor', 'middle')
    .style('font-family', 'Tahoma')
    .style('font-size', (margin.left / 4))         // 20
    .style('fill', '#F2F2F2');
// add text 2ndd row
label.append('text')
        .attr('x', (d, i) => { return (i / margin.left) + (margin.bottom / 10)})   // (i / 100) + 5}
        .attr('y', height / 1.15)
        .data(resList.text2)
        .text(d => { return d })
        .style('text-anchor', 'middle')
        .style('font-family', 'Tahoma')
        .style('font-size', (margin.left / 4))         // 20
        .style('fill', '#F2F2F2');