function init() {
  var selector = d3.select('#selDataset');

  d3.json('samples.json').then((data) => {
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector.append('option').text(sample).property('value', sample);
    });
    var initialSample = sampleNames[0];
    buildMetadata(initialSample);
  });
}

init();

function optionChanged(newSample) {
  buildMetadata(newSample);
}

function buildMetadata(sample) {
  d3.json('samples.json').then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter((sampleObj) => sampleObj.id == sample);
    var pairs = Object.entries(resultArray[0]);
    var PANEL = d3.select('#sample-metadata');

    PANEL.html('');
    var results = pairs.forEach(function (pair) {
      PANEL.append('h6').text(pair[0] + ': ' + pair[1]);
    });
  });
}