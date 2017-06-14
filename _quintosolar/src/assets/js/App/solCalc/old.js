const π = Math.PI,
      radianes = π / 180,
      grados = 180 / π;

function posicionSolar(fecha) {
  const _latitud = 20.655761,
        _longitud = -103.433023;
  let _posiciones = [];
  d3.timeMinute.range(amanecer(fecha, _latitud, _longitud), anochecer(fecha, _latitud, _longitud), 10).forEach(function(_tiempo) {
    _posiciones.push([azimuthSolar(_tiempo, _latitud, _longitud), elevacionSolar(_tiempo, _latitud, _longitud)]);
  });
  return _posiciones;
}

// diaJuliano(_tiempo),
// epoca(_tiempo),
// longitudMedia(_epoca),
// anomaliaMedia(_epoca),
// eccenTierra(_epoca),
// eqCentro(_epoca),
// longitudVerdadera(_epoca),
// anomaliaVerdadera(_epoca),
// distanciaSol(_epoca),
// longitudAparente(_epoca),
// oblicuidadEclipticaMedia(_epoca),
// oblicuidadEclipticaVerdadera(_epoca),
// ascensionRecta(_epoca),
// declinacion(_epoca),
// equacionDelTiempo(_epoca),
// anguloHorarioAmanecer(_epoca, _latitud),
// duracionDelDia(_epoca, _latitud),
// tiempoSolarVerdadero(_tiempo, _longitud),
// anguloHorario(_tiempo, _longitud),
// anguloZenital(_tiempo, _latitud, _longitud),
// elevacionSolar(_tiempo, _latitud, _longitud),
// azimuthSolar(_tiempo, _latitud, _longitud)

function mod(n, m) {
  return ((n % m) + m) % m;
}

function diaJuliano(tiempo) {
  //días
  // número de días y fracción transcurridos desde el mediodía del 1º de enero del año 4713 a. C.
  return 2440587.5 + tiempo / 864e5;
}

function epoca(tiempo) {
  //siglos
  // siglos julianos (36,525 días) desde el 1 de enero de 2000, 11:58:55.816 UTC (J2000.0)
  return (diaJuliano(tiempo) - 2451545) / 36525;
}

function longitudMedia(_epoca) {
  //grados
  // la longitud a la que un cuerpo orbitando podría encontrarse si su órbita fuese circular y su inclinación fuese nula (suponiendo que el sol orbita la tierra)
  return mod(280.46646 + _epoca * (36000.76983 + _epoca * 0.0003032), 360);
}

function anomaliaMedia(_epoca) {
  //grados
  // ángulo que forma con el perihelio un Sol ficticio que se moviese uniformemente
  return 357.52911 + _epoca * (35999.05029 - 0.0001537 * _epoca);
}

function eccenTierra(_epoca) {
  // eccentricidad de la órbita terrestre
  return 0.016708634 - _epoca * (0.000042037 + 0.0000001267 * _epoca);
}

function eqCentro(_epoca) {
  //grados
  //Llamamos ecuación del centro a la diferencia entre las longitudes verdadera y media del Sol
  const _anomaliaMedia = anomaliaMedia(_epoca);
  return Math.sin(_anomaliaMedia * radianes) * (1.914602 - _epoca * (0.004817 + 0.000014 * _epoca)) + Math.sin(2 * _anomaliaMedia * radianes) * (0.019993 - 0.000101 * _epoca) + Math.sin(3 * _anomaliaMedia * radianes) * 0.000289;
}

function longitudVerdadera(_epoca) {
  return longitudMedia(_epoca) + eqCentro(_epoca);
}

function anomaliaVerdadera(_epoca) {
  return anomaliaMedia(_epoca) + eqCentro(_epoca);
}

function distanciaSol(_epoca) {
  // unidades astronómicas
  // distancia entre la tierra y el sol
  const _eccenTierra = eccenTierra(_epoca);
  return (1.000001018 * (1 - _eccenTierra * _eccenTierra)) / (1 + _eccenTierra * Math.cos(anomaliaVerdadera(_epoca) * radianes));
}

function longitudAparente(_epoca) {
  //grados
  return longitudVerdadera(_epoca) - (0.00569 + 0.00478 * Math.sin((125.04 - 1934.136 * _epoca) * radianes));
}

function oblicuidadEclipticaMedia(_epoca) {
  // grados
  // es el ángulo de inclinación que presenta el eje de rotación de la Tierra con respecto a una perpendicular al plano de la eclíptica.
  return (23 + (26 + (21.448 - _epoca * (46.8150 + _epoca * (0.00059 - _epoca * 0.001813))) / 60) / 60);
}

function oblicuidadEclipticaVerdadera(_epoca) {
  // grados
  return oblicuidadEclipticaMedia(_epoca) + 0.00256 * Math.cos((125.04 - 1934.136 * _epoca) * radianes);
}

function ascensionRecta(_epoca) {
  // grados
  // la ascensión recta se mide a partir del punto Aries en horas (una hora igual a 15 grados), minutos y segundos hacia el Este a lo largo del ecuador celeste.
  return Math.atan2(Math.cos(oblicuidadEclipticaVerdadera(_epoca) * radianes) * Math.sin(longitudAparente(_epoca) * radianes), Math.cos(longitudAparente(_epoca) * radianes)) * grados;
}

function declinacion(_epoca) {
  // grados
  // es el ángulo que forma el sol con el ecuador celeste.
  return Math.asin(Math.sin(oblicuidadEclipticaVerdadera(_epoca) * radianes) * Math.sin(longitudAparente(_epoca) * radianes)) * grados;
}

function equacionDelTiempo(_epoca) {
  // minutos
  // es la diferencia entre el tiempo solar medio (medido generalmente por un reloj) y el tiempo solar aparente (tiempo medido por un reloj de sol).
  const e = eccenTierra(_epoca),
        m = anomaliaMedia(_epoca) * radianes,
        l = longitudMedia(_epoca) * radianes;
  let   y = Math.tan(oblicuidadEclipticaVerdadera(_epoca) * radianes / 2);
        y *= y;
  return 4 * grados *
      (y * Math.sin(2 * l)
      - 2 * e * Math.sin(m)
      + 4 * e * y * Math.sin(m) * Math.cos(2 * l)
      - 0.5 * y * y * Math.sin(4 * l)
      - 1.25 * e * e * Math.sin(2 * m));
}

function anguloHorarioAmanecer(_epoca, _latitud) {
  // grados
  // time of sunrise and sunset for any solar declination and latitude in terms of local solar time
  const _declinacion = declinacion(_epoca) * radianes,
        latitud = _latitud * radianes;
  return Math.acos(Math.cos(90.833 * radianes) / (Math.cos(latitud) * Math.cos(_declinacion)) - Math.tan(latitud) * Math.tan(_declinacion)) * grados;
}

function mediodiaSolar(_tiempo, _longitud) {
  const d = _tiempo.getTimezoneOffset(),
        _dia = new Date(_tiempo);
  _dia.setHours(0,0,0,0);
  return new Date (_dia.getTime() + (720 - 4 * _longitud - equacionDelTiempo(epoca(_tiempo)) - d) * 6e4);
}

function amanecer(_tiempo, _latitud, _longitud) {
  return new Date(mediodiaSolar(_tiempo, _longitud).getTime() - anguloHorarioAmanecer(epoca(_tiempo), _latitud) * 4 *6e4);
}

function anochecer(_tiempo, _latitud, _longitud) {
  return new Date(mediodiaSolar(_tiempo, _longitud).getTime() + anguloHorarioAmanecer(epoca(_tiempo), _latitud) * 4 *6e4);
}

function duracionDelDia(_epoca, _latitud) {
  // minutos
  // 
  return 8 * anguloHorarioAmanecer(_epoca, _latitud);
}

function tiempoSolarVerdadero(_tiempo, _longitud) {
  // minutos
  // 
  const d = _tiempo.getTimezoneOffset(),
        _dia = new Date(_tiempo);
  _dia.setHours(0,0,0,0);
  return mod(((_tiempo - _dia) / 6e4) + equacionDelTiempo(epoca(_tiempo)) + 4 * _longitud + d, 1440);
}

function anguloHorario(_tiempo, _longitud) {
  // grados
  // es el arco de ecuador contado desde el punto de intersección del ecuador con el meridiano del observador hasta el círculo horario del astro.
  const _tiempoSolarVerdadero = tiempoSolarVerdadero(_tiempo, _longitud) / 4;
  return _tiempoSolarVerdadero < 0 ? _tiempoSolarVerdadero + 180 : _tiempoSolarVerdadero - 180;
}

function anguloZenital(_tiempo, latitud, longitud) {
  // grados
  // 
  const _declinacion = declinacion(epoca(_tiempo)) * radianes,
        _anguloHorario = anguloHorario(_tiempo, longitud) * radianes,
        _latitud = latitud * radianes;
  return Math.acos(Math.sin(_latitud) * Math.sin(_declinacion) + Math.cos(_latitud) * Math.cos(_declinacion) * Math.cos(_anguloHorario))* grados;
}

function refraccionAtmosferica(_elevacion) {
  // grados
  // 
  return (_elevacion > 85 ? 0 :
    _elevacion > 5 ?
      58.1 / Math.tan(_elevacion * radianes) - 0.07 / Math.pow(Math.tan(_elevacion * radianes), 3) + 0.000086 / Math.pow(Math.tan(_elevacion * radianes), 5) :
      _elevacion > -0.575 ?
        1735 + _elevacion * (-518.5 + _elevacion * (103.4 + _elevacion * (-12.79 + _elevacion * 0.711))) :
        -20.772 / Math.tan(_elevacion * radianes)
    ) / 3600;
}

function elevacionSolar(_tiempo, latitud, longitud) {
  const _elevacion = 90 - anguloZenital(_tiempo, latitud, longitud),
        _refraccion = refraccionAtmosferica(_elevacion);
  return _elevacion + _refraccion;
}

function azimuthSolar(_tiempo, latitud, _longitud) {
  const _anguloHorario = anguloHorario(_tiempo, _longitud),
        _latitud = latitud * radianes,
        _anguloZenital = anguloZenital(_tiempo, latitud, _longitud) * radianes,
        _declinacion = declinacion(epoca(_tiempo)) * radianes;
  return _anguloHorario > 0 ?
    mod(Math.acos(((Math.sin(_latitud) * Math.cos(_anguloZenital)) - Math.sin(_declinacion)) / (Math.cos(_latitud) * Math.sin(_anguloZenital))) * grados + 180, 360) :
    mod(540 - Math.acos(((Math.sin(_latitud) * Math.cos(_anguloZenital)) - Math.sin(_declinacion)) / (Math.cos(_latitud) * Math.sin(_anguloZenital))) * grados, 360);
}