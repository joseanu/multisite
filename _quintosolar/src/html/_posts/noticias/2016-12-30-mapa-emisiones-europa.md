---
title: Mapa de la Electricidad y las emisiones de CO₂ en Europa
slug: mapa-emisiones-europa
description: De qué fuentes proviene la electricidad en Europa y cuánto CO2 se emitió para producirla. 
date: 2016-12-30
function: tieneGrafica
image:
  src: mapa-emisiones-europa
draft: false
---

Para ayudar responder a la pregunta ¿Qué tan limpia puede ser la electricidad? [Tomorrow](http://www.tmrow.co/) elaboró una [visualización interactiva](http://electricitymap.tmrow.co/) que muestra, en tiempo real, que fuentes utilizan los paises de Europa para generar electricidad y cuánto contribuye al calentamiento global. Esto se hizo mediante la combinación de las emisiones típicas de gases de efecto invernadero para las distintas fuentes de electricidad con los montos de producción en vivo por fuente, junto con las importaciones y exportaciones de electricidad entre países.

Se puede explorar este mapa interactivo arrastrando el ratón para ver el total de emisiones y haciendo clic sobre cada país muestra en tiempo real de dónde proviene su electricidad (hidroeléctrica, nuclear, eólica, etcétera) y cuánto CO2 se emitió para producirla. Además se puede visualizar potencial de generación eólica y el de energía solar que se valoran en base a datos climáticos también en tiempo real.

Para la elaboración de este mapa tomaron las siguientes consideraciones:

- La huella de de gases de efecto invernadero (GEI) de cada país se mide desde la perspectiva de un consumidor. Representa la huella de GEI de 1 kWh consumida dentro de un país dado, en la unidad g CO2eq (lo que significa que cada GHG se convierte en su equivalente en gramos de CO2 en términos de potencial de calentamiento global).
- La huella de GEI de cada modo de producción tiene en cuenta la construcción de las unidades de producción y sus vidas útiles habituales según lo calculado por el [informe del IPCC de 2014](https://en.wikipedia.org/wiki/Life-cycle_greenhouse-gas_emissions_of_energy_sources#2014_IPCC.2C_Global_warming_potential_of_selected_electricity_sources).
- Cada país tiene un flujo masivo de GEI que depende de los países vecinos. Con el fin de determinar la huella de GEI de cada país, el conjunto de ecuaciones de balance de masa de GEI acopladas de cada país se resuelve simultáneamente.

La mayoría de los datos de producción y capacidad eléctrica son tomados en tiempo real de la plataforma de la Red Europea de Gestores de Redes de Transporte de Electricidad ([ENTSO-E](https://www.entsoe.eu)) y la información climática para el potencial eólico y solar proviene del Sistema Global de Predicción ([Global Forecast System](http://nomads.ncep.noaa.gov/)) de la Administración Nacional Oceánica y Atmosférica estadounidense.

[Mapa de la Electricidad y las emisiones de CO₂ en el territorio Europeo.](http://electricitymap.tmrow.co/)

## Comparando con las emisiones de México:

En nuestro país no contamos con un sistema de monitoreo de producción eléctrica, pero podemos hacer un estimado rápido con el fin de comparar este mapa con la emisiones de México.

Tomando la información disponible de [Generación bruta de electricidad por tecnología](http://catalogo.datos.gob.mx/dataset/generacion-bruta-de-electricidad-por-tecnologia/resource/6d2893e0-a863-48c0-ad41-6603d8361df7) usamos los mismos factores de emisiones del informe del IPCC de 2014 para las tecnologías reportadas:

### Factores de emisión para las tecnologías de generación eléctrica en México

{:.table .tabla_ch}
| Fuente             | Emisión media (gCO2eq/kWh) |
|--------------------|:--------------------------:|
| Vapor              |             820            |
| Ciclo combinado    |             490            |
| Turbogas           |             490            |
| Combustión interna |             820            |
| Dual               |             820            |
| Carboeléctrica     |             820            |
| Geotermoléctrica   |             38             |
| Nucleoeléctrica    |             12             |
| Eólica             |             11             |
| Hidroeléctrica     |             24             |
| Fotovoltaica       |             48             |

Multiplicamos estos valores por la producción mensual reportada por la Secretaría de Energía para obtener las emisiones totales mensuales, dividimos entre la producción total del mes y obtenemos el factor de emisión para ese mes, después promediamos por año.

Los promedios anuales obtenidos los comparamos con datos del [Programa GEI México](http://www.geimexico.org/factor.html), para ver que nuestro estimado no está muy alejado de sus resultados, ni de los factores de [SERMARNAT](http://www.geimexico.org/image/2015/aviso_factor_de_emision_electrico%202014%20Semarnat.pdf). Presentamos los resultados en la siguiente gráfica:

<div id="bd_002" class="ct-chart ct-double-octave" data-function="002.js"></div>

---

[Fuente](http://www.microsiervos.com/archivo/ecologia/mapa-co2-produccion-electricidad.html)