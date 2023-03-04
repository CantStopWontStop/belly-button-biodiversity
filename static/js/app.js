const bio_data = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


// Store in constant the URL of samples.json.
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Obtain and store in constant a Promise object from the samples.json URL.
const promiseObject = d3.json(url);

function run() {

    dropdown();

    promiseObject.then(function(result) {
        let id = result.names[0];

        demo(id);
        top10(id);
        bubblechart(id);
    });
};

function dropdown() {
    promiseObject.then(function(result) {
        let names = result.names;

        for (let i = 0; i < names.length; i++) {
            let dropdownOption = d3.select("#selDataset").append("option");
            dropdownOption.text(names[i]);
        };
    });
};


function demo(id) {
    promiseObject.then(function(result) {
        let thisID = result.names.findIndex(x => x === id);
        let metadata = result.metadata[thisID];

        for (let key in metadata) {
            let demographics_data = d3.select("#sample-metadata").append("p");
            demographics_data.text(`${key}: ${metadata[key]}`);
        };
    });
};

function top10(id) {

    promiseObject.then(function(result) {

        let thisID = result.names.findIndex(x => x === id);
        let sample = result.samples[thisID];
        let otu = sample.otu_ids.slice(0, 10).map(item => `OTU ${item}`);
        let count = sample.sample_values.slice(0, 10);
        let labels = sample.otu_labels.slice(0, 10);

        let data = [{
            type: "bar",
            x: count,
            y: otu,
            text: labels,
            mode: "markers",
            marker: {color: '#375a7f'},
            orientation: "h",
            transforms: [{
                type: "sort",
                target: "x",
                order: "ascending"
            }]
        }];

        let layout = {
            title: {
                text:`Top 10 OTUs for Subject ID ${sample.id}`,
                font:{
                    color: '#ffffff',
                    size: 24
                }
            } ,  
            paper_bgcolor: '#303030',
            plot_bgcolor: '#303030',
            xaxis: {tickfont: {
                size: 14,
                color: '#ffffff'
              }},
            yaxis: {
              titlefont: {
                size: 16,
                color: '#ffffff'
              },
              tickfont: {
                size: 14,
                color: '#ffffff'
              }
            }  
        };

        let config = {responsive: true}

        Plotly.newPlot("bar", data, layout, config);
    });
};

function bubblechart (id) {
    promiseObject.then(function(result) {

        let thisID = result.names.findIndex(x => x === id);
        let sample = result.samples[thisID];
        let otu = sample.otu_ids;
        let count = sample.sample_values;
        let labels = sample.otu_labels;

        let data = [{
            x: otu,
            y: count,
            text: labels,
            mode: "markers",
            marker: {
                color: count,
                colorscale: "YlGnBu",
                size: count,
                sizeref: 2,
                sizemin: 4,
                
            }
        }];

        let layout = {
            title: {
                text: `Test Subject ID ${sample.id}'s Samples`,
                font:{color: '#ffffff',
                size: 24}
            } , 
            paper_bgcolor: '#303030',
            plot_bgcolor: '#303030',
            xaxis: {tickfont: {
                size: 14,
                color: '#ffffff'
              }},
            yaxis: {
              titlefont: {
                size: 16,
                color: '#ffffff'
              },
              tickfont: {
                size: 14,
                color: '#ffffff'
              }
            },
            autosize: true
        };

        let config = {responsive: true}

        Plotly.newPlot("bubble", data, layout, config);
    });
};

function optionChanged(id) {
    d3.selectAll("p").remove();
    demo(id);  
    
    top10(id);
    bubblechart(id);
};


run();

