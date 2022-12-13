const bio_data = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
const svg = d3.select('svg');

d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {

  
    console.log(data.samples[0].sample_values)
    
    const rects = svg.selectAll('rect')
        .data(data.samples[0])

        
    rects.attr('width', d => d.sample_values)
        .attr('height', 200)
        .attr('fill', 'orange');
        
    rects.enter()
        .append('rect')
            .attr('width', d => d.sample_values)
            .attr('height', 200)
            .attr('fill', 'orange');
    
        
    //rects.attr;
    //     // .text(d => d.names)
    //     // .attr("x", 20)
    //     // .attr("y", 20);

    // rects.attr('height',200)
    //     .

}) 
// Fetch the JSON data and console log it
// d3.json(bio_data).then(function(data) {
//     for (let i = 0; i < data.length; i++) {
    
//         // Store the film at index `i` for evaluation
       
//         console.log(data[i]);
//     }
//   });









    //.attr('width', d => d.)
    // .attr('height', 320)
    // .attr('fill', 'black')