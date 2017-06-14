
const π = Math.PI,
      τ = 2 * π,
      radianes = π / 180,
      grados = 180 / π,
      acos = Math.acos,
      asin = Math.asin,
      cos = Math.cos,
      sin = Math.sin,
      tan = Math.tan,
      max = Math.max,
      min = Math.min,
      abs = Math.abs,
      epsilon = 1e-6,
      J1970 = 2440588,
      J2000 = 2451545,

      mod = (_n, _m) => ((_n % _m) + _m) % _m,
  
    //=> días | número de días y fracción transcurridos desde el mediodía del 1º de enero del año 4713 a. C.
      JD = (_date) => (J1970 - 0.5) + (_date / 864e5),
      gregoriano = (_JD) => new Date((_JD + 0.5 - J1970) * 864e5),
    //=> siglos (epoca) | siglos julianos (36,525 días) desde el 1 de enero de 2000, 11:58:55.816 UTC (J2000.0)
      siglos = (_date) => (JD(_date) - J2000) / 36525,

    //L => radianes | la longitud a la que un cuerpo orbitando podría encontrarse si su órbita fuese circular y su inclinación fuese nula (suponiendo que el sol orbita la tierra)
      longitudMedia = (_siglos) => {
        let l = mod(280.46646 + _siglos * (36000.76983 + _siglos * 0.0003032), 360);
        return (l < 0 ? l + 360 : l) / 180 * π;
      },

    //M => radianes | ángulo que forma con el perihelio un Sol ficticio que se moviese uniformemente
      anomaliaMedia = (_siglos) => (357.52911 + _siglos * (35999.05029 - 0.0001537 * _siglos)) * radianes,

    //e | eccentricidad de la órbita terrestre
      eccentricidadOrbitaTierra = (_siglos) => 0.016708634 - _siglos * (0.000042037 + 0.0000001267 * _siglos),

    //C => radianes |  Llamamos ecuación del centro a la diferencia entre las longitudes verdadera y media del Sol
      ecuacionCentro = (_siglos) => {
        const M = anomaliaMedia(_siglos);
        return (sin(M) * (1.914602 - _siglos * (0.004817 + 0.000014 * _siglos))
              + sin(2 * M) * (0.019993 - 0.000101 * _siglos)
              + sin(3 * M) * 0.000289) * radianes;
      },

    //☉ => radianes | (ecliptic longitude)
      longitudVerdadera = (_siglos) => longitudMedia(_siglos) + ecuacionCentro(_siglos),

    //λ => radianes
      longitudAparente = (_siglos) => longitudVerdadera(_siglos) - (0.00569 + 0.00478 * sin((125.04 - 1934.136 * _siglos) * radianes)) * radianes,

    //ε = ε₀ + Δε => radianes | es el ángulo de inclinación que presenta el eje de rotación de la Tierra con respecto a una perpendicular al plano de la eclíptica.
      oblicuidadEcliptica = (_siglos) => {
        const oblicuidadEclipticaMedia = (23 + (26 + (21.448 - _siglos * (46.8150 + _siglos * (0.00059 - _siglos * 0.001813))) / 60) / 60),
              nutacionDeOblicuidad = 0.00256 * cos((125.04 - 1934.136 * _siglos) * radianes);
        return (oblicuidadEclipticaMedia + nutacionDeOblicuidad) * radianes;
      },

    //δ => radianes | es el ángulo que forma el sol con el ecuador celeste.
      declinacionSolar = (_siglos) => asin(sin(oblicuidadEcliptica(_siglos)) * sin(longitudAparente(_siglos))),
  
    //E => radianes | es la diferencia entre el tiempo solar medio (medido generalmente por un reloj) y el tiempo solar aparente (tiempo medido por un reloj de sol).
      equacionDelTiempo = (_siglos) => {
        const e = eccentricidadOrbitaTierra(_siglos),
              M = anomaliaMedia(_siglos),
              L = longitudMedia(_siglos);
        let   y = tan(oblicuidadEcliptica(_siglos) / 2);
              y *= y;
        return y * sin(2 * L)
            - 2 * e * sin(M)
            + 4 * e * y * sin(M) * cos(2 * L)
            - 0.5 * y * y * sin(4 * L)
            - 1.25 * e * e * sin(2 * M);
      },

solsticio = {
  verano: function (a) {
    a = (a - 2000) / 1000;
    const JDE = 2451716.56767 + a * (365241.62603 + a * (0.00325 + a * (0.00888 - (a * 0.00030))));
    return gregoriano(JDE + this.perturbacion(JDE));
  },
  invierno: function (a) {
    a = (a - 2000) / 1000;
    const JDE = 2451900.05952 + a * (365242.74049 + a * (0.06223 + a * (0.00823 - (a * 0.00032))));
    return gregoriano(JDE + this.perturbacion(JDE));
  },
  perturbacion: function (JDE) {
    const A=[485, 203, 199, 182, 156, 136, 77, 74, 70, 58, 52, 50, 45, 44, 29, 18, 17, 16, 14, 12, 12, 12, 9, 8],
          B=[5.671621937, 5.885773837, 5.970422305, 0.486074197, 1.276533815, 2.993588733, 3.884055717, 5.178740957, 4.251272992, 2.091078977, 5.186594938, 0.366868209, 4.32038803, 5.674938063, 1.063429113, 2.707354736, 5.040336347, 3.456450051, 3.486469714, 1.664869573, 5.011014815, 5.599190773, 3.974638306, 0.269653369],
          C=[33.75704138, 575.3384853, 0.352312163, 7771.377155, 786.0419455, 393.0209728, 1150.676971, 52.96910219, 157.734358, 588.4926828, 2.62982721, 39.81490468, 522.3694006, 550.7553308, 77.55225669, 1179.062901, 79.62980936, 1097.707886, 548.6777781, 254.4314455, 557.3142781, 606.9776744, 21.32991313, 294.2463501],

          T = (JDE - J2000)/36525,
          W = (35999.373 * T - 2.47) * radianes,
          Δλ = 1 + 0.0334 * cos(W) + 0.0007 * cos(2 * W);

    let S = 0;
    for(let n= 0; n<24; n++){
      S += A[n] * cos(B[n] + (C[n] * T));
    }

    return (0.00001 * S) / Δλ;
  }
},

solCalc = (coordenadas) => {
  const longitud = coordenadas[0],
        minutesOffset = 720 - longitud * 4,
        x = coordenadas[0] * radianes,
        y = coordenadas[1] * radianes,
        cy = cos(y),
        sy = sin(y);

  function posicion(_date) {
    const _siglos = siglos(_date),
          _dia = new Date(_date).setUTCHours(0,0,0,0),
          δ = declinacionSolar(_siglos),
          cδ = cos(δ),
          sδ = sin(δ);

    let azimuth = ((_date - _dia) / 864e5 * τ + equacionDelTiempo(_siglos) + x) % τ - π,
        zenith = acos(max(-1, min(1, sy * sδ + cy * cδ * cos(azimuth)))),
        azimuthDenominator = cy * sin(zenith);

    if (azimuth < -π) azimuth += τ;
    if (abs(azimuthDenominator) > epsilon) azimuth = (azimuth > 0 ? -1 : 1) * (π - acos(max(-1, min(1, (sy * cos(zenith) - sδ) / azimuthDenominator))));
    if (azimuth < 0) azimuth += τ;

    // Corregir por refracción atmosférica.
    const atmosfera = 90 - zenith * grados;
    if (atmosfera <= 85) {
      const te = tan(atmosfera * radianes);
      zenith -= (atmosfera > 5 ? 58.1 / te - .07 / (te * te * te) + .000086 / (te * te * te * te * te)
          : atmosfera > -.575 ? 1735 + atmosfera * (-518.2 + atmosfera * (103.4 + atmosfera * (-12.79 + atmosfera * .711)))
          : -20.774 / te) / 3600 * radianes;
    }

    return [azimuth * grados, 90 - zenith * grados];
  }

  function mediodia(_date) {
    const _siglos = siglos(_date),
          _dia = new Date(_date).setHours(0,0,0,0);
    let minutos = (minutesOffset - (equacionDelTiempo(_siglos + (minutesOffset - (equacionDelTiempo(_siglos - longitud / (360 * 365.25 * 100)) * grados * 4)) / (1440 * 365.25 * 100)) * grados * 4) - _date.getTimezoneOffset()) % 1440;
    if (minutos < 0) minutos += 1440;
    return new Date(+_dia + minutos * 60 * 1000);
  }
  
  function Ht(_siglos) {
    const δ = declinacionSolar(_siglos),
          cδ = cos(δ),
          sδ = sin(δ),
          h0 = -0.8333 * radianes;
    return acos((sin(h0) - sy * sδ) / (cy * cδ));
  }
  
  function horas(_date) {
    const _JD = JD(this.mediodia(_date)),
          _siglos = siglos(this.mediodia(_date));
    return {
      amanecer: gregoriano(_JD - Ht(_siglos) / τ),
      atardecer: gregoriano(_JD + Ht(_siglos) / τ)
    };
  }

  return {
    posicion: posicion,
    mediodia: mediodia,
    horas: horas
  };
};

export { solsticio, solCalc };