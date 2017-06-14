import * as d3 from 'd3';

import AppMap from './components/map.vue';

import { solsticio, solCalc } from './solCalc/index';

export default {
  name: 'App',
  data: function() {
    return {
      longitud: -103.433023,
      latitud: 20.655761,
      fechas: [solsticio.verano(2017),solsticio.invierno(2017)],
      data:  [],
      line:  []
    }; 
  },
  computed: {
    solCalc() {
      return solCalc([this.longitud, this.latitud]);
    }
  },
  components: {
    AppMap: AppMap
  },
  mounted() {
    this.cargarDatos();
    this.calculatePath();
  },
  methods: {
    getScales() {
      const x = d3.scaleLinear().range([0, 500]);
      const y = d3.scaleLinear().range([270, 0]);
      d3.axisLeft().scale(x);
      d3.axisBottom().scale(y);
      x.domain(d3.extent([0, 360]));
      y.domain(d3.extent([0, 90]));
      return { x, y };
    },
    calculatePath() {
      const scale = this.getScales(),
            path = d3.line()
        .x(d => scale.x(d[0]))
        .y(d => scale.y(d[1])),
        area = d3.area()
        .x(d => scale.x(d[0]))
        .y0(270)
        .y1(d => scale.y(d[1]));
      this.data.forEach((linea) => {
        this.line.push(area(linea));
      });
    },
    posicionSolar(fecha) {
      const vm = this;
      let _posiciones = [];
      this.rango(fecha).forEach(function(_fecha) {
        _posiciones.push(vm.solCalc.posicion(_fecha));
      });
      return _posiciones;
    },
    rango(fecha) {
      // const primero = d3.timeMinutes(this.solCalc.horas(fecha).amanecer, this.solCalc.mediodia(fecha), 15),
      //       segundo = d3.timeMinutes(this.solCalc.mediodia(fecha), this.solCalc.horas(fecha).atardecer, 15);
      // primero.push(d3.timeSecond.offset(this.solCalc.mediodia(fecha), -10));
      // primero.push(this.solCalc.mediodia(fecha));
      // primero.push(...segundo);
      // primero.push(this.solCalc.horas(fecha).atardecer);
      // return primero;
      const corte1 = d3.timeMinute.offset(this.solCalc.mediodia(fecha), -2),
            corte2 = d3.timeMinute.offset(this.solCalc.mediodia(fecha), 2),
            primero = d3.timeMinutes(this.solCalc.horas(fecha).amanecer, corte1, 15),
            segundo = d3.timeSeconds(corte1, corte2, 5),
            tercero = d3.timeMinutes(corte2, this.solCalc.horas(fecha).atardecer, 15);
      primero.push(...segundo);
      primero.push(...tercero);
      return primero;
    },
    cargarDatos() {
      const vm = this;
      this.fechas.forEach(function(_fecha) {
        vm.data.push(...computeSegments(vm.posicionSolar(_fecha), null, isNext));
      });
    },
    actualizarPosicion(evt) {
      this.longitud = evt.longitud;
      this.latitud = evt.latitud;
      this.data = [];
      this.line = [];
      this.cargarDatos();
      this.calculatePath();
    }
  }
};

function computeSegments(lineData, defined, isNext) {
  defined = defined || function (d) { return true; };
  isNext = isNext || function (prev, curr) { return true; };
  var startNewSegment = true;

  // split into segments of continuous data
  var segments = lineData.reduce(function (segments, d) {
    // skip if this point has no data
    if (!defined(d)) {
      startNewSegment = true;
      return segments;
    }

    // if we are starting a new segment, start it with this point
    if (startNewSegment) {
      segments.push([d]);
      startNewSegment = false;

    // otherwise see if we are adding to the last segment
    } else {
      var lastSegment = segments[segments.length - 1];
      var lastDatum = lastSegment[lastSegment.length - 1];
      // if we expect this point to come next, add it to the segment
      if (isNext(lastDatum, d)) {
        lastSegment.push(d);

      // otherwise create a new segment
      } else {
        segments.push([d]);
      }
    }

    return segments;
  }, []);

  return segments;
}

function isNext(previousDatum, currentDatum) {
  var expectedDelta = 100;
  return Math.abs(currentDatum[0] - previousDatum[0]) < expectedDelta;
}