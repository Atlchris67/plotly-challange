/***********************************************/
function optionChanged(newSample) {
    console.log(`Entering ${arguments.callee.name} [ ${newSample}]`)
    // Fetch new data each time a new sample is selected
    //getData(sampleNames[0], buildCharts);
    buildMetadata(newSample);
    createBarchart(newSample)
    createBubbleChart(newSample);
    // bonus only

}



/***********************************************/
function buildMetadata(sample) {
    // write code to create the buildMetadata
    console.log(`Entering ${arguments.callee.name} [ ${sample}]`)
    // Reference to Panel element for sample metadata
    var washFreq = 0;
    // read the json file to get data
    d3.json("../data/samples.json").then((data) => {
        

        // get the metadata info for the demographic panel
        var metadata = data.metadata;
        // filter meta data info by id
        var result = metadata.filter(meta => meta.id.toString() === sample)[0];

        buildGauge(result.wfreq);
        var subjectData = d3.select("#sample-metadata");
        // Clear any existing metadata
        subjectData.innerHTML = '';
        // grab the necessary demographic data data for the id and append the info to the panel
        for (const [key, value] of Object.entries(result)) {
            subjectData.append("h6").text(`${key.toUpperCase()}: ${value}`);
        }

       
    });
}


/***********************************************/
function createBubbleChart(sample) {
    // write code to create the BubbleChart
    console.log(`Entering ${arguments.callee.name} [ ${sample}]`)
    d3.json("Data/samples.json").then((data) => {
        //console.log(data)

        // filter sample values by id 
        var samples = data.samples.filter(d => d.id.toString() === sample)[0];

        //console.log(samples);

        // Getting the top 10 
        var xValues = samples.sample_values.slice(0, 10)
            .reverse();

        // get only top 10 otu ids for the plot OTU and reversing it. 
        var yTrace = (samples.otu_ids.slice(0, 10))
            .reverse()
            .map(d => "OTU " + d);
        scl = [
            [0, 'rgb(146,107,67)'],
            [0.25, 'rgb(44, 255, 150)'],
            [0.5, 'rgb(173,143,113)'],
            [0.75, 'rgb(96,209,174)'],
            [0.875, 'rgb(213,198,184)'],
            [1, 'rgb(191,233,115)']
        ];

        // get the top 10 labels for the plot
        var labels = samples.otu_labels.slice(0, 10);
        // create trace variable for the plot
        var trace = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.sample_values,
                colorscale: scl,
            },
            text: samples.otu_labels
        };

        // create data variable
        var data = [trace];

        // set the layout for the bubble plot
        var layout = {
            xaxis: {
                title: "OTU ID"
            },
            height: 600,
            width: 1000
        };

        // creating data variable 
        var data1 = [trace];

        // create the bubble plot
        Plotly.newPlot("bubble", data, layout);

    })


}

/***********************************************/
function createBarchart(sample) {
    // write code to create barchart
    console.log(sample)
    console.log(`Entering ${arguments.callee.name} [ ${sample}]`)
    // getting data from the json file
    d3.json("Data/samples.json").then((data) => {
        //console.log(data)

        // filter sample values by id 
        var samples = data.samples.filter(d => d.id.toString() === sample)[0];

        //console.log(samples);

        // Getting the top 10 
        var xValues = samples.sample_values.slice(0, 10)
            .reverse();

        // get only top 10 otu ids for the plot OTU and reversing it. 
        var yTrace = (samples.otu_ids.slice(0, 10))
            .reverse()
            .map(d => "OTU " + d);


        // get the top 10 labels for the plot
        var labels = samples.otu_labels.slice(0, 10);

        // create trace variable for the plot
        var trace = {
            x: xValues,
            y: yTrace,
            text: labels,
            type: "bar",
            orientation: "h",
        };

        // create data variable
        var plotData = [trace];

        // create layout variable to set plots layout
        var layout = {
            title: "Top 10 OTU",
        };

        // create the bar plot
        Plotly.newPlot("bar", plotData, layout);
        return data;
    })
}


/***********************************************/
function fillDropDown() {
    // write code to pupulate the dropdown
    console.log(`Entering ${arguments.callee.name}`)
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("data/samples.json").then((data) => {
        console.log(data)
        optionChanged(data.names[0]);
        // get the id data to the dropdwown menu

        data.names.forEach(function (name) {
            dropdown.append("option").text(name).property("value");
        });
    })

}

/***********************************************/

fillDropDown()