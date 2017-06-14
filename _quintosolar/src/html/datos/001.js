quintoSolar.bd_001 = {
  titulo: "Nueva capacidad de generación eléctrica instalada en el 2016",
  fuente: "Datos: US Energy Information Administration, GTM research (Servicios públicos e instalaciones distribuidas. Unidades de corriente alterna.)",
  labels: ['Solar', 'Gas natural', 'Eólica', 'Nuclear', 'Hidroelectricidad', 'Petróleo y otros'],
  series: [11.2, 8, 6.8, 1.1, 0.3, 0.3],
  dibuja: function(selector, labels, series) {
    return new Chartist.Bar(selector, {
      labels: labels,
      series: series
    }, {
      reverseData: true,
      horizontalBars: true,
      distributeSeries: true,
      axisY: {
        offset: 120
      },
      chartPadding: {
        right: 120
      },
    }).on('draw', function(data) { //https://github.com/gionkunz/chartist-js/issues/281
      if (data.type === 'bar') {
        var label,
          barHorizontalCenter = data.x2 + 5,
          barVerticalCenter = data.y1 + (data.element.height() * -1) + 5,
          value = data.element.attr('ct:value');
        if (value !== '0') {
          // add the custom label text as an attribute to the bar for use by a tooltip
          data.element.attr({
            label: value
          }, "ct:series");
          label = new Chartist.Svg('text');
          label.text(parseFloat(value).toFixed(2) + ' GW');
          label.addClass("ct-barlabel");
          label.attr({
            x: barHorizontalCenter,
            y: barVerticalCenter
          });
          return data.group.append(label);
        }
      }
    });
  }
};