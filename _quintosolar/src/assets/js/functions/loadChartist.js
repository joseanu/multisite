import DOMUtil from '../util/dom';

export default function() {
  const cargar = require('../util/loader').default;

  cargar
    .reset()
    .addScript('/assets/js/chartist/chartist.js')
    .onComplete(() => {
      cargar.reset();
      Array.prototype.forEach.call(document.getElementsByClassName('ct-chart'), function(el) {
        var chart = DOMUtil.getFunctionName(el.attributes);
          cargar.addScript('/datos/' + chart);
      });
      cargar.afterLoad((src) => {
        var id = 'bd_' + src.replace('/datos/', '').replace('.js', ''),
            c = quintoSolar[id];
        c.dibuja('#' + id, c.labels, c.series);
      })
      .load();
    })
    .load();
}