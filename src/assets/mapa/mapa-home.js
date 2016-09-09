var fs = require('fs');
var d3 = require('d3');
var jsdom = require('jsdom');
var topojson = require('topojson');

var chartWidth = 870,
  chartHeight = 555;

var projection = d3.geoEquirectangular()
  .scale(1600)
  .center([-102.16250000000001, 23.919722222222223])
  .translate([435, 295]);

module.exports = function(mapData, sucursalesData, outputLocation) {
  if (!mapData) mapData = '/home/ubuntu/workspace/src/assets/mapa/mx_tj_s6q6.json';
  if (!sucursalesData) sucursalesData = '/home/ubuntu/workspace/_data/sucursales.json';
  if (!outputLocation) outputLocation = '/home/ubuntu/workspace/src/assets/mapa/mapa-sucursales.svg';

  jsdom.env({
    html: '',
    features: {
      QuerySelector: true
    }, //you need query selector for D3 to work

    done: function(errors, window) {
      window.d3 = d3.select(window.document); //get d3 into the dom

      //do yr normal d3 stuff
      var svg = window.d3.select('body')
        .append('div').attr('class', 'container') //make a container div to ease the saving process
        .append('svg')
        .attr('xmlns', 'http://www.w3.org/2000/svg')
        .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
//      .attr('width', chartWidth)
//      .attr('height', chartHeight)
        .attr('viewBox', '0 0 ' + chartWidth + ' ' + chartHeight)
        .attr('preserveAspectRatio', 'xMinYMid')
        .attr('id', 'mapa-sucursales');

      var mex = svg.append('g')
        .attr('id', 'mexico');

      var mx = JSON.parse(fs.readFileSync(mapData, 'utf8'));
      mex.selectAll('path')
        .data(topojson.feature(mx, mx.objects.estados).features)
        .enter().append('path')
        .attr('d', d3.geoPath().projection(projection))
        .attr('class', 'estado');

      //SUCURSALES

      var marcas = svg.append("g")
        .attr("id", "sucursales");

      var sucursales = JSON.parse(fs.readFileSync(sucursalesData, 'utf8'));

      sucursales.sort(function(a, b) {
        return (a["lat"] > b["lat"]) ? -1 : (a["lat"] < b["lat"]) ? 1 : 0;
      });
      var gsucursal = marcas.selectAll("g")
        .data(sucursales)
        .enter()
        .append("g")
        .attr("id", function(d) {
          return d.slug;
        })
        .attr("class", function(d, i) {
          return "suc sucursal-" + i;
        })
        .attr("style", function(d) {
          return "transform-origin: " + projection([d.lng, d.lat])[0] + "px " + projection([d.lng, d.lat])[1] + "px;";
        });
      gsucursal.append("path")
        .attr("d", function(d) {
          return "M" + projection([d.lng, d.lat])[0] + " " + (Number(projection([d.lng, d.lat])[1]) - 48) + "c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z";
        })
        .attr("class", "pin")
        .attr("fill", function(d) {
          return d.color;
        });
      var circulo1 = gsucursal.append("circle")
        .attr("cx", function(d) {
          return projection([d.lng, d.lat])[0];
        })
        .attr("cy", function(d) {
          return (Number(projection([d.lng, d.lat])[1]) - 30.3);
        })
        .attr("r", 17.7)
        .attr("fill", function(d) {
          return d.color;
        })
        .attr("class", "circulo1")
        .transition()
        .duration(500);
      gsucursal.append("rect")
        .attr("x", function(d) {
          return (Number(projection([d.lng, d.lat])[0]) - 1);
        })
        .attr("y", function(d) {
          return (Number(projection([d.lng, d.lat])[1]) - 48);
        })
        .attr("height", 35.4)
        .attr("width", 2)
        .attr("fill", function(d) {
          return d.color;
        })
        .attr("class", "rect1")
        .attr("style", function(d) {
          return "transform-origin: " + (Number(projection([d.lng, d.lat])[0]) - 1) + "px " + (Number(projection([d.lng, d.lat])[1]) - 30.3) + "px";
        });
      var circulo2 = gsucursal.append("circle")
        .attr("cx", function(d) {
          return projection([d.lng, d.lat])[0];
        })
        .attr("cy", function(d) {
          return (Number(projection([d.lng, d.lat])[1]) - 30.3);
        })
        .attr("r", 13)
        .attr("class", "circulo2");
      gsucursal.append("rect")
        .attr("x", function(d) {
          return (Number(projection([d.lng, d.lat])[0]) - 1);
        })
        .attr("y", function(d) {
          return (Number(projection([d.lng, d.lat])[1]) - 43.3);
        })
        .attr("height", 26)
        .attr("width", 2)
        .attr("class", "rect2")
        .attr("style", function(d) {
          return "transform-origin: " + (Number(projection([d.lng, d.lat])[0]) - 1) + "px " + (Number(projection([d.lng, d.lat])[1]) - 30.3) + "px";
        });
      gsucursal.append("circle")
        .attr("cx", function(d) {
          return projection([d.lng, d.lat])[0];
        })
        .attr("cy", function(d) {
          return (Number(projection([d.lng, d.lat])[1]) - 30.3);
        })
        .attr("r", 13)
        .attr("class", "circulo3");
      gsucursal.append("a")
        .attr('data-href', function(d) {
          return d.slug;
        })
        .append("text")
        .attr("id", function(d) {
          return "t_" + d.slug;
        })
        .attr("x", function(d) {
          return (Number(projection([d.lng, d.lat])[0]) - 6);
        })
        .attr("y", function(d) {
          return (Number(projection([d.lng, d.lat])[1]) - 24.3);
        })
        .text(function(d) {
          return d.nombre;
        });
      

      //SUCURSALES




      //write out the children of the container div
      fs.writeFileSync(outputLocation, window.d3.select('.container').html()) //using sync to keep the code simple
      process.exit()
    }
  });
}

if (require.main === module) {
  module.exports();
}