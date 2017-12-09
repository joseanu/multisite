ARREGLAR BREADCRUMB DEL CATALOGO-----------------







Sucursal Hermosillo borrada 31/08/16
  {
      "id": 18,
      "slug": "hermosillo",
      "nombre": "Hermosillo",
      "ciudad": "Hermosillo",
      "estado": "Sonora",
      "direccion1": "Calle Ignacio Romero 147",
      "direccion2": "",
      "colonia": "Col. San Benito",
      "cp": 83190,
      "tel": 6622105814,
      "correo": "hermosillo@jrecotecnologia.com",
      "gmaps": "https://goo.gl/K2s6EH",
      "facebook": "https://www.facebook.com/jrecotec.hermosillo/",
      "gplus": "https://plus.google.com/+JREcotecnolog%C3%ADaHermosillo",
      "horario": "1-5:0900-1800,6:0900-1500",
      "lng": -110.9690381,
      "lat": 29.0972849,
      "color": "#f2e659"
  }
Sucursal Monterrey borrada 10/11/16 > cambia 15/12/16

Sucursales Tijuana, Ciudad Obregon y Xalapa borradas 24/05/17
{
    "id": 9,
    "slug": "tijuana",
    "slogan": "Proveedor de focos para ahorrar de energia electrica, focos led, calentadores solares, aire acondicionado, sistemas fotovoltaicos y uso de energía renovable en Tijuana.",
    "nombre": "Tijuana",
    "ciudad": "Tijuana",
    "estado": "Baja California",
    "direccion1": "Blvd. Manuel J. Clouthier 13378",
    "direccion2": "Local 3",
    "colonia": "Col. Guaycura",
    "cp": 22216,
    "encargado": "Joosymar Crecero Leyva",
    "tel": 6646251570,
    "correo": "tijuana@jrecotecnologia.com",
    "gmaps": "https://goo.gl/3itJLj",
    "facebook": "https://www.facebook.com/jrecotec.tijuana/",
    "gplus": "https://plus.google.com/+Jrecotecnologia-Tijuana",
    "horario": "1-5:1000-1800,6:0900-1500",
    "lng": -116.925286,
    "lat": 32.4946357,
    "color": "#eb5893"
}, {
    "id": 13,
    "slug": "ciudad-obregon",
    "slogan": "Proveedor de focos ahorradores de energia, focos led, calentadores de agua, aire acondicionado, fotoceldas solares y equipo de ahorro de energia en Ciudad Obregón.",
    "nombre": "Ciudad Obregon",
    "ciudad": "Ciudad Obregón",
    "estado": "Sonora",
    "direccion1": "Calle Hidalgo 320",
    "direccion2": "entre calle Puebla y calle Zacatecas",
    "colonia": "Col. Centro",
    "cp": 85000,
    "encargado": "Cesar Ivan Castelo Renteria",
    "tel": 6441082277,
    "correo": "obregon@jrecotecnologia.com",
    "gmaps": "https://goo.gl/6taV6P",
    "facebook": "https://www.facebook.com/jrecotec.obregon/",
    "gplus": "https://plus.google.com/+Jrecotecnologia-Obregon",
    "horario": "1-5:0900-1900,6:1000-1400",
    "lng": -109.9371974,
    "lat": 27.4958857,
    "color": "#f2e659"
}, {
    "id": 16,
    "slug": "xalapa",
    "slogan": "Venta de focos ahorradores de energia, tecnologia led, boiler solar, aires acondicionados, paneles solares y uso de energía renovable en Xalapa.",
    "nombre": "Xalapa",
    "ciudad": "Xalapa",
    "estado": "Veracruz",
    "direccion1": "Av. 20 de Noviembre S/N",
    "direccion2": "Plaza Aguasanta Local 3 ",
    "colonia": "Fracc. Pomona",
    "cp": 91040,
    "encargado": "Tomás Ramirez Ruiz",
    "tel": 2282848570,
    "correo": "xalapa@jrecotecnologia.com",
    "gmaps": "https://goo.gl/fAC17o",
    "facebook": "https://www.facebook.com/jrecotec.xalapa/",
    "gplus": "https://plus.google.com/+Jrecotecnologia-Xalapa",
    "horario": "1-5:1000-1800,6:0900-1400",
    "lng": -96.9062978,
    "lat": 19.525875,
    "color": "#fdc84a"
}, 

borrado 16/11/2017
, {
    "id": 2,
    "slug": "reynosa",
    "slogan": "Proveedor de focos ahorradores, focos leds, calentadores de agua, aire acondicionado, fotoceldas solares y más accesorios ahorradores en Reynosa.",
    "nombre": "Reynosa",
    "ciudad": "Reynosa",
    "estado": "Tamaulipas",
    "direccion1": "Calle Av. Aguas Calientes 960",
    "direccion2": "",
    "colonia": "Col. Rodríguez",
    "cp": 88630,
    "encargado": "Diana Gutierrez Cepeda",
    "tel": 8999237915,
    "correo": "reynosa@jrecotecnologia.com",
    "gmaps": "https://goo.gl/fC9PlP",
    "facebook": "https://www.facebook.com/jrecotec.reynosa/",
    "gplus": "https://plus.google.com/+Jrecotecnologia-Reynosa",
    "horario": "1-6:0900-1800",
    "lng": -98.2864539,
    "lat": 26.0782865,
    "color": "#f19e65"
}


usar en lugar de lastitem:
{% assign items = items | split: "|||" | join: ',' %}


http://galt.mx/contact/
http://enerbiomex.com/cotizacion-sin-costo/
http://www.ecotrends.mx/cotizacion
http://www.panelessolares.com.mx/CONTACTO.aspx
http://www.revoteck.com/page/cotiza


Hay que hacer que webappmanifest.json sea dinámico









https://philipwalton.com/articles/the-google-analytics-setup-i-use-on-every-site-i-build/
https://github.com/philipwalton/analyticsjs-boilerplate

<script>addEventListener('error', window.__e=function f(e){f.q=f.q||[];f.q.push(e)});</script>

export const init = () => {
  // ...
  trackErrors();
  // ...
};

export const trackError = (error, fieldsObj = {}) => {
  ga('send', 'event', Object.assign({
    eventCategory: 'Script',
    eventAction: 'error',
    eventLabel: (error && error.stack) || '(not set)',
    nonInteraction: true,
  }, fieldsObj));
};

const trackErrors = () => {
  const loadErrorEvents = window.__e && window.__e.q || [];
  const fieldsObj = {eventAction: 'uncaught error'};

  // Replay any stored load error events.
  for (let event of loadErrorEvents) {
    trackError(event.error, fieldsObj);
  }

  // Add a new listener to track event immediately.
  window.addEventListener('error', (event) => {
    trackError(event.error, fieldsObj);
  });
};




const dimensions = {
  CLIENT_ID: 'dimension1',
};


ga((tracker) => {
  var clientId = tracker.get('clientId');
  tracker.set(dimensions.CLIENT_ID, clientId);
});




gulp build:catalogo --site=jrecotec

node ./_jrecotec/catalogo/generate.js