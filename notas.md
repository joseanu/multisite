

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
Sucursal Monterrey borrada 10/11/16
  {
    "id": 15,
    "slug": "monterrey",
    "slogan": "Proveedor de focos ahorradores de energia, focos led, boiler solar, aires acondicionados, fotoceldas solares y uso de energía renovable en Monterrey.",
    "nombre": "Monterrey",
    "ciudad": "Monterrey",
    "estado": "Nuevo León",
    "direccion1": "Calle Hermenegildo Galeana Sur 589",
    "direccion2": "Letra C ",
    "colonia": "Col. Oriente Centro",
    "cp": 64720,
    "tel": 8682147607,
    "correo": "monterrey@jrecotecnologia.com",
    "gmaps": "https://goo.gl/UZsJ3I",
    "facebook": "https://www.facebook.com/jrecotec.monterrey/",
    "gplus": "https://plus.google.com/+Jrecotecnologia-Monterrey",
    "horario": "1-5:1000-1800,6:1000-1400",
    "lng": -100.3134587,
    "lat": 25.6703794,
    "color": "#53b89c"
  }
  
JEKYLL_ENV=production bundle exec jekyll build


lftp ftp://usuario@66.7.195.240

lftp -c "set ftp:list-options -a;
open ftp://user:password@your.ftp.com; 
lcd ./web;
cd /web/public_html;
mirror --reverse --delete --use-cache --verbose --allow-chown --allow-suid --no-umask --parallel=2 --exclude-glob .svn"


usar en lugar de lastitem:
{% assign items = items | split: "|||" | join: ',' %}