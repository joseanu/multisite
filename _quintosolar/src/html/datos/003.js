quintoSolar.bd_003 = {
  titulo: "Emisiónes de gases de efecto invernadero para la generación de electricidad en México 2005-2016",
  fuente: "Datos: Secretaría de Energía, IPCC",
  labels: ['2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016'],
  series: [
    [14984.92941,12029.94572,11448.41987,10617.00983,9670.614519,9089.318594,10262.94297,11697.25507,9792.807684,6433.334929,5995.37049,6005.521883],
    [343.4195851,372.0199423,202.064528,269.868644,406.024999,381.0197936,480.4285783,709.317456,616.084455,330.691553,343.536291,429.7602051],
    [14916.95593,14696.7102,14661.18213,10836.86643,13682.03968,14694.09054,15521.05115,15453.17293,14477.29739,15529.40485,15687.34848,15148.16352],
    [7678.572742,8441.825631,8562.912368,9265.923001,10249.75053,10186.59976,11167.78498,12128.23597,13012.4512,13550.83921,15364.97704,14880.74192]
  ],
  dibuja: function (selector, labels, series) {
    return new Chartist.Line(selector, {
      labels: labels,
      series: series
    }, {
      low: 0,
      fullWidth: true,
      chartPadding: {
        top: 30
      },
      plugins: [
        Chartist.plugins.legend({
          legendNames: ['Combustóleo (millones de l)','Diesel (millones de l)','Carbón (millones de kg)','Gas Natural (millones de m3)'],
        })
      ]
    });
  }
};