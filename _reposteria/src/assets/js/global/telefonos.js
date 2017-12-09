import { $class } from '../util';

export default function linkeaTelefonos() {
  $class('phone-number', true).forEach((el) => {
    const tele = el.dataset.href;
    const clases = (el.classList.length > 0) ? ` class="${el.classList}"` : '';
    el.outerHTML = `<a href="${tele}"${clases}>${el.innerHTML}</a>`;
  });
}
