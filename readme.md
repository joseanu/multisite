# Fuente para generar el sitio web de [Green Fix](https://www.jrecotecnologia.com)

Decidí que usar Wordpress para un sítio con 8 páginas en un host económico no era adecuado.

El html se genera con [Jekyll](https://jekyllrb.com/), hace uso del plugin 
[Jekyll Data Pages Generator](https://github.com/avillafiorita/jekyll-datapage_gen) para generar las páginas de sucursales a 
partir de un archivo json.

El mapa de sucursales se genera con [D3](https://d3js.org/) tomando las coordenadas del mismo json de sucursales y los polígonos 
de un [topojson](https://github.com/topojson/topojson) generado a partir de datos de [INEGI](http://www.inegi.org.mx/default.aspx) con ogr2ogr

El proceso de ´compilar´ lo hace [gulp](http://gulpjs.com/):
 - Genera la hoja css a partir de scss.
 - Se generan distintos tamaños de las imágenes para cargarlas en las páginas con [lazysizes](https://github.com/aFarkas/lazysizes).
