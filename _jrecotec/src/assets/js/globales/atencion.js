import { $class } from '../util';

export default function atencionClientes() {
  $class('atencion__link').addEventListener('click', () => {
    $class('jr__anuncio').classList.toggle('jr__anuncio__visible');
  }, false);
}
