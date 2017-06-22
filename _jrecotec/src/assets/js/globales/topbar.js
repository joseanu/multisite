import axios from 'axios';

import { $id, $class } from '../util';

const selectSucursal = $id('selectSucursal');

function cambioSucursal(datos) {
  $class('siteHeader-topBar-telefono').innerHTML = datos.telefono;
  $class('siteHeader-topBar-correo').innerHTML = datos.correo;
  document
    .querySelector('.siteHeader-topBar-ubicacion a')
    .setAttribute(
      'href',
      `${document.location.origin}/sucursales/${selectSucursal.value}.html`,
    );
}

function initSelectSucursal() {
  selectSucursal.addEventListener('change', () => {
    const getUrl = `/api/sucursalData/${selectSucursal.value}.json`;
    axios.get(getUrl)
      .then((response) => {
        cambioSucursal(response.data);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, false);
}

export default initSelectSucursal;
