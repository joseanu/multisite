import { $id, $class } from './util';

const selectSucursal = $id('selectSucursal');

function cambioSucursal(myArr) {
  const telefono = $class('siteHeader-topBar-telefono');
  const correo = $class('siteHeader-topBar-correo');
  const ubicacion = document.querySelector('.siteHeader-topBar-ubicacion a');
  const ubicaurl = `${document.location.origin}/sucursales/${selectSucursal.value}.html`;
  telefono.innerHTML = myArr.telefono;
  correo.innerHTML = myArr.correo;
  ubicacion.setAttribute('href', ubicaurl);
}

function initSelectSucursal() {
  selectSucursal.addEventListener('change', () => {
    const posturl = `${document.location.origin}/sucursalData/${selectSucursal.value}.json`;
    const request = new window.XMLHttpRequest();
    request.open('GET', posturl, true);
    request.send();
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status === 200 && request.status < 300) {
          const myArr = JSON.parse(request.responseText);
          cambioSucursal(myArr);
        }
      }
    };
  }, false);
}

export default initSelectSucursal;
