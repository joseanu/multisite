

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
  
JEKYLL_ENV=production bundle exec jekyll build


lftp ftp://usuario@66.7.195.240

lftp -c "set ftp:list-options -a;
open ftp://user:password@your.ftp.com; 
lcd ./web;
cd /web/public_html;
mirror --reverse --delete --use-cache --verbose --allow-chown --allow-suid --no-umask --parallel=2 --exclude-glob .svn"


usar en lugar de lastitem:
{% assign items = items | split: "|||" | join: ',' %}