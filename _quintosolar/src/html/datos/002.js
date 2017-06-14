quintoSolar.bd_002 = {
  titulo: "Emisiónes de gases de efecto invernadero para la generación de electricidad en México 2005-2016",
  fuente: "Datos: Secretaría de Energía, IPCC",
  labels: ['2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016'],
  series: [
    [541.9929784, 515.3109116, 516.2218762, 476.8313957, 505.1554708, 496.6528911, 499.8595423, 517.1049249, 506.5020192, 475.8537645, 488.653094, 502.0014376]
  ],
  dibuja: function (selector, labels, series) {
    return new Chartist.Line(selector, {
      labels: labels,
      series: series
    }, {
      low: 400,
      fullWidth: true,
      showArea: true,
      chartPadding: {
        left: 30
      },
      plugins: [
        Chartist.plugins.tooltip({
          transformTooltipTextFnc: function(x) {
            return parseFloat(x).toFixed(2) + ' gCO2eq/kWh';
          }
        }),
        Chartist.plugins.ctAxisTitle({
          axisX: {
            axisTitle: '',
          },
          axisY: {
            axisTitle: 'Emisiones (gCO2eq/kWh)',
            axisClass: 'ct-axis-title',
            offset: {
              x: -20,
              y: 20
            },
            textAnchor: 'start',
            flipTitle: true
          }
        })
      ]
    });
  }
};