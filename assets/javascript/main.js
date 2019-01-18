function jsonToLineChart(requestURL,dataKey,xKey,xKeyPrefix,xReverse,yKey,yOffset,yDivisor,startStep,endStep,chartDivId,smoothed) {

    if (!document.querySelector('.chartlist') && window.matchMedia("(min-width: 576px)").matches) {
        var chartDiv = document.getElementById(chartDivId);
        chartDiv.classList.remove('ct-minor-sixth');
        chartDiv.classList.add('ct-double-octave');
    }

    // if (!document.querySelector('.chartlist') && (xKeyPrefix)) {
    //     xKeyPrefix = null;
    // }

    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.send();
    request.onload = function() {
        var jsonObj = JSON.parse(request.response);
        var years = [];
        var values = [];
        if (xReverse == true) {
            for (var step = startStep; step >= endStep; step--) {

                if (xKeyPrefix) {
                    years.push(
                        (jsonObj[dataKey][step][xKeyPrefix]).toString().slice(0,3) +
                        " " + "'" +
                        (jsonObj[dataKey][step][xKey]).toString().slice(2,4)
                        );
                } else {
                    years.push((jsonObj[dataKey][step][xKey]).toString().slice(2,4));
                }

                if (yDivisor) {
                    values.push((jsonObj[dataKey][step][yKey])/yDivisor);
                } else {
                    values.push(jsonObj[dataKey][step][yKey]);
                }

            }
        } else {
            for (var step = startStep; step <= endStep; step++) {

                if (xKeyPrefix) {
                    years.push(
                        (jsonObj[dataKey][step][xKeyPrefix]).toString().slice(0,3) +
                        " " + "'" +
                        (jsonObj[dataKey][step][xKey]).toString().slice(2,4)
                        );
                } else {
                    years.push((jsonObj[dataKey][step][xKey]).toString().slice(2,4));
                }

                if (yDivisor) {
                    values.push((jsonObj[dataKey][step][yKey])/yDivisor);
                } else {
                    values.push(jsonObj[dataKey][step][yKey]);
                }

            }
        }
        
        var data = {
        // A labels array that can contain any sort of values
        labels: years,
        // Our series array that contains series objects or in this case series data arrays
        series: [values]
        };

        var options = {
            showPoint: false,
            axisY: {
                offset: yOffset
            }
        };

        if (smoothed == false) {
            options['lineSmooth'] = false            
        }

        if (xKeyPrefix) {
            if (!document.querySelector('.chartlist') && window.matchMedia("(min-width: 576px)").matches) {
                options['axisX'] = { 
                    offset: 35
                }
            } else {
                options['axisX'] = { 
                    offset: 35,
                    labelInterpolationFnc: function(value, index) {
                        return index % 2 === 0 ? value : null;
                    }
                }
            }
        }

        // Create a new line chart object where as first parameter we pass in a selector
        // that is resolving to our chart container element. The Second parameter
        // is the actual data object.
        new Chartist.Line("#" + chartDivId, data, options);
    }
}

function jsonToComparisonLineChart(requestURL,dataKey,xKey,xKeyPrefix,xReverse,yKey1,yKey2,yOffset,yDivisor,startStep,endStep,chartDivId,smoothed) {

    if (!document.querySelector('.chartlist') && window.matchMedia("(min-width: 576px)").matches) {
        var chartDiv = document.getElementById(chartDivId);
        chartDiv.classList.remove('ct-minor-sixth');
        chartDiv.classList.add('ct-double-octave');
    }

    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.send();
    request.onload = function() {
        var jsonObj = JSON.parse(request.response);
        var years = [];
        var values1 = [];
        var values2 = [];

        if (xReverse == true) {
            for (var step = startStep; step >= endStep; step--) {
                years.push((jsonObj[dataKey][step][xKey]).toString().slice(2,4));
                if (yDivisor) {
                    values1.push((jsonObj[dataKey][step][yKey1])/yDivisor);
                    values2.push((jsonObj[dataKey][step][yKey2])/yDivisor);
                } else {
                    values1.push(jsonObj[dataKey][step][yKey1]);
                    values2.push(jsonObj[dataKey][step][yKey2]);
                }
            }
        } else {
            for (var step = startStep; step <= endStep; step++) {
                years.push((jsonObj[dataKey][step][xKey]).toString().slice(2,4));
                if (yDivisor) {
                    values1.push((jsonObj[dataKey][step][yKey1])/yDivisor);
                    values2.push((jsonObj[dataKey][step][yKey2])/yDivisor);
                } else {
                    values1.push(jsonObj[dataKey][step][yKey1]);
                    values2.push(jsonObj[dataKey][step][yKey2]);
                }
            }
        }

        var data = {
        // A labels array that can contain any sort of values
        labels: years,
        // Our series array that contains series objects or in this case series data arrays
        series: [values1, values2]
        };

        var options = {
            showPoint: false,
            axisY: {
                offset: yOffset
            }
        };

        if (smoothed == false) {
            options['lineSmooth'] = false            
        }
        // Create a new line chart object where as first parameter we pass in a selector
        // that is resolving to our chart container element. The Second parameter
        // is the actual data object.
        new Chartist.Line("#" + chartDivId, data, options);
    }
}

function jsonToBarChart(requestURL,dataKey,xKey,xKeyPrefix,xReverse,yKey,yOffset,yDivisor,startStep,endStep,chartDivId) {

    if (!document.querySelector('.chartlist') && window.matchMedia("(min-width: 576px)").matches) {
        var chartDiv = document.getElementById(chartDivId);
        chartDiv.classList.remove('ct-minor-sixth');
        chartDiv.classList.add('ct-double-octave');
    }

    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.send();
    request.onload = function() {
        var jsonObj = JSON.parse(request.response);
        var years = [];
        var values = [];
        if (xReverse == true) {
            for (var step = startStep; step >= endStep; step--) {
                years.push((jsonObj[dataKey][step][xKey]).toString().slice(2,4));
                if (yDivisor) {
                    values.push((jsonObj[dataKey][step][yKey])/yDivisor);
                } else {
                    values.push(jsonObj[dataKey][step][yKey]);
                }
            }
        } else {
            for (var step = startStep; step <= endStep; step++) {
                years.push((jsonObj[dataKey][step][xKey]).toString().slice(2,4));
                if (yDivisor) {
                    values.push((jsonObj[dataKey][step][yKey])/yDivisor);
                } else {
                    values.push(jsonObj[dataKey][step][yKey]);
                }
            }
        }
        
        var data = {
        // A labels array that can contain any sort of values
        labels: years,
        // Our series array that contains series objects or in this case series data arrays
        series: [values]
        };
        var options = {
            axisY: {
                offset: yOffset
            }
        };
        // Create a new line chart object where as first parameter we pass in a selector
        // that is resolving to our chart container element. The Second parameter
        // is the actual data object.
        new Chartist.Bar("#" + chartDivId, data, options);
    }
}

function jsonToComparisonBarChart(requestURL,dataKey,xKey,xKeyPrefix,xReverse,yKey1,yKey2,yOffset,yDivisor,startStep,endStep,chartDivId) {

    if (!document.querySelector('.chartlist') && window.matchMedia("(min-width: 576px)").matches) {
        var chartDiv = document.getElementById(chartDivId);
        chartDiv.classList.remove('ct-minor-sixth');
        chartDiv.classList.add('ct-double-octave');
    }

    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.send();
    request.onload = function() {
        var jsonObj = JSON.parse(request.response);
        var years = [];
        var values1 = [];
        var values2 = [];

        if (xReverse == true) {
            for (var step = startStep; step >= endStep; step--) {
                years.push((jsonObj[dataKey][step][xKey]).toString().slice(2,4));
                if (yDivisor) {
                    values1.push((jsonObj[dataKey][step][yKey1])/yDivisor);
                    values2.push((jsonObj[dataKey][step][yKey2])/yDivisor);
                } else {
                    values1.push(jsonObj[dataKey][step][yKey1]);
                    values2.push(jsonObj[dataKey][step][yKey2]);
                }
            }
        } else {
            for (var step = startStep; step <= endStep; step++) {
                years.push((jsonObj[dataKey][step][xKey]).toString().slice(2,4));
                if (yDivisor) {
                    values1.push((jsonObj[dataKey][step][yKey1])/yDivisor);
                    values2.push((jsonObj[dataKey][step][yKey2])/yDivisor);
                } else {
                    values1.push(jsonObj[dataKey][step][yKey1]);
                    values2.push(jsonObj[dataKey][step][yKey2]);
                }
            }
        }

        var data = {
        // A labels array that can contain any sort of values
        labels: years,
        // Our series array that contains series objects or in this case series data arrays
        series: [values1, values2]
        };
        var options = {
            axisY: {
                offset: yOffset
            }
        };

        var responsiveOptions = [
            ['screen and (min-width: 641px) and (max-width: 1200px)', {
              seriesBarDistance: 8
            }],
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 5
            }]
        ];
        // Create a new line chart object where as first parameter we pass in a selector
        // that is resolving to our chart container element. The Second parameter
        // is the actual data object.
        new Chartist.Bar("#" + chartDivId, data, options, responsiveOptions);
    }
}