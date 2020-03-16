function buildGauge(wfreq){

    //adapted from https://codepen.io/plotly/pen/rxeZME

    var level = wfreq*20 +2;
    // Trig to calc meter point
    var degrees = 180 - level,
        radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    var mainPath = 'M -.0 -0.05 L .0 0.05 L ',
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);
    var data = [{ type: 'scatter',
    x: [0], y:[0],
        marker: {size: 12, color:'850000'},
        showlegend: false,
        name: '/ Week',
        text: wfreq,
        hoverinfo: 'text+name'},
    { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
    rotation: 90,
    text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
    textinfo: 'text',
    textposition:'inside',
    marker: {
        colors:[
            'rgba(0, 105, 11, .5)', 'rgba(10, 120, 22, .5)',
            'rgba(136, 187, 141, .5)', 'rgba(139, 192, 133, .5)',
            'rgba(183, 204, 143, .5)', 'rgba(213, 229, 152, .5)',
            'rgba(228, 232, 177, .5)', 'rgba(233, 230, 201, .5)',
            'rgba(244, 241, 228, .5)', 'rgba(247,244, 235, 0)']},
    labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
    hoverinfo: 'label',
    hole: .5,
    type: 'pie',
    showlegend: false
    }];
    var layout = {
    shapes:[{
        type: 'path',
        path: path,
        fillcolor: '850000',
        line: {
            color: '850000'
        }
        }],
    title: '<b>Belly Button Washing Frequency</b><br>Scrubs per Week',
    height: 500,
    width: 500,
    xaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]},
    yaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]}
    };
    
    Plotly.newPlot('gauge', data, layout);
}