import { $class } from './util'

export default function linkeaTelefonos () {
  $class('phone-number', true).forEach(function (el) {
    let tel = el.dataset.href
    let clases = (el.classList.length > 0) ? ' class="' + el.classList + '" ' : ''
    el.outerHTML = '<a href="' + tel + '"' + clases + '>' + el.innerHTML + '</a>'
  })
}