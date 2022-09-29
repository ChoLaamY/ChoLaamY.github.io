// define margin / height and width
var e = document.documentElement;
var c = document.getElementsByClassName('vizProjects')[0];       // change this accordding to class of the div
const windowW = window.innerWidth || e.clientWidth || c.clientWidth
var margin = ({top: windowW / 25, right: windowW / 12, bottom: windowW / 6, left: windowW / 12})     // {top: 50, right: 100, bottom: 50, left: 100}
const width = windowW - (margin.left + margin.right);
const height = (width / 1.5) - margin.top + margin.bottom
console.log(width)
console.log(windowW)

// create data
var vizList = {name: ['shiny', 'airbnb', 'olympic', 'kickstarter'],
                img: ['../image/sustainability.png', '../image/resort.png', '../image/medal.png', '../image/kickstarter.png'],
                text1: ['Global Sustainability', 'AirBnBs in New York', 'Winter Olympic Medal Winners', 'Successful Kickstarters']} ;

// define rows and columns
var row = [0, 0, 1, 1];
var col = [0, 1, 0, 1];

var svg = d3.select('.vizProjects')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('class', 'projectCircles');

var palette = d3.scaleOrdinal()
                .range(['#C9FFE5', '#CCB3FF', '#FFEA80', '#B3F2FF'])
                .domain(vizList.name);


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

    if (selectedProj === 'shiny' | selectedProj === 'airbnb') {
        svg.selectAll('circle')
            .attr('cy', (d, i) => {
                if (d === 'olympic') {
                    return height / 2
                } else if (d === 'kickstarter') {
                    return height / 2
                } else {
                    return height / 3.5
                }
            })
        // svg.selectAll('.labels')
        //     .style('font-color', d => {
        //         // return '#FFB319'
        //         if (d !== selectedProj) {
        //             return 'white'
        //         } else {
        //             return '#FFB319'
        //         }
        //     });

        // svg.selectAll('svg:image')
        //     .attr('y', (d, i) => {
        //         if (d === 'olympic') {
        //             return margin.left * 2
        //         } else if (d === 'kickstarter') {
        //             return margin.left * 2
        //         } else {
        //             return margin.left * 1.5
        //         }
        //     })
        
        // svg.selectAll('.labels')
        //     .attr('y', (d, i) => {
        //         // return  console.log(d)
        //         if (d === 'olympic') {
        //             return ((row[i] + margin.top) * 10)
        //         } else {
        //             return ((row[i] + margin.top) * 7.8)
        //         }
        //     });
    } else {
        svg.selectAll('circle')
            .attr('cy', (d, i) => { return height / 3.5 })
    }

    // if (selectedProj === 'Team') { 
    //     // info
    //     emotionInfo.style.display = 'block'
    //     learningInfo.style.display = 'none'
    //     // buttons
    //     emotionButton.style.display = 'block'
    //     learnButton.style.display = 'none'
    // } else if (selectedProj === 'Learning') {
    //     // info divs
    //     learningInfo.style.display = 'block' 
    //     emotionInfo.style.display = 'none'
    //     // buttons
    //     learnButton.style.display = 'block' 
    //     emotionButton.style.display = 'none'
    // }


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
                .data(vizList.name)
                .enter()
                .append('g')
                .attr('class', 'myCircles')
                .attr('transform', (d, i) => {
                    return `translate(${(margin.left * 3) + (col[i] * (margin.left * 4))}, 
                                    ${row[i] * (margin.left * 3.3) - (margin.top * 2)})`
                });

// add a tag for link on click
circles.append('circle')
        .attr('cx', (d, i) => {(margin.left * 2) * i})    // {200 * i}
        .attr('cy', height / 3.5)
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
                .data(vizList.img)
                .attr('xlink:href', d => {
                    return d
                })
                .attr('x', (d, i) => { return (col[i] * (-margin.top / 10)) - (margin.left * 0.8) })     // (10 * i) - 100 }
                .attr('y', (margin.left * 1.5))      // 30
                .attr('width', width / 6)
                .attr('height', width / 6)
                .style('pointer-events', 'none')

// add text
var label = svg.selectAll('.labels')
                    .data(vizList.name)
                    .enter()
                    .append('g')
                    .attr('class', 'labels')
                    .attr('transform', (d, i) => {
                        return `translate(${(margin.left * 3) + (col[i] * (margin.left * 4))}, 
                                        ${row[i] * (margin.left * 3.3) - (margin.top * 2)})`
                        // return `translate(${(margin.left * 3) + (i * (margin.left * 4))}, 0)` // ${200 + (i * 300)}
                    });

// add text first row
label.append('text')
    .attr('x', (d, i) => { return (i / margin.left) + (margin.top / 10)})   // (i / 100) + 5}
    .attr('y', (d, i) => {return ((row[i] + margin.top) * 7.8)})
    .data(vizList.text1)
    .text(d => { return d })
    .style('text-anchor', 'middle')
    .style('font-family', 'Tahoma')
    .style('font-size', (margin.left / 4))         // 20
    .style('fill', '#F2F2F2');