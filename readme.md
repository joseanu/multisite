# Para generar sitios web



# Archivo de configuración

Parámetros:

 - deploymentMethod: Método de despliegue para el sitio.
   Opciones: 'ftp' / 'netlify' / 'firebase'

 - ftphost: Host destino para despligue con ftp.

 - ftppath: Directorio destino para despligue con ftp.

 - purifycss: Especifica si aplicar [PurifyCSS](https://github.com/purifycss/purifycss) para eliminar estilos no utilizados.
   Opciones: true / false

 - resizeImgDir: Lista de directorios para generar imágenes en distintos tamaños para usar en `srcset` o `picture`. Debe ser un arreglo de cadenas de texto con los nombres de los directorios con las imágenes originales ubicados en `_WebSite/src/assets/img`.

 - resizeSizes: Especifica los tamaños de imágen a generar. Debe ser un arreglo de objetos con las llaves `width: Number` y `upscale: Boolean`.

 - webpackEntry: Puntos de entrada para webpack. Debe ser un objeto con las llaves `nombre: './ruta'`. Las rutas son relativas a `_WebSite/src/assets/js`.

 - .