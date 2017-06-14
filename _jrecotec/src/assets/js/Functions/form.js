// de http://blueashes.com/2013/web-development/html5-form-validation-fallback/
function hasHtml5Validation() {
  return typeof document.createElement('input').checkValidity === 'function';
}

function initForm() {
  const form = document.forms[0];

  if (form != null) {
    // Listen for the form being submitted
    form.addEventListener('submit', (evt) => {
      if (hasHtml5Validation()) {
        if (!form.checkValidity()) {
          evt.preventDefault();
          form.classList.add('invalid');
        } else if (document.forms[0] && window.FormData) {
          const posturl = form.action;

          const message = {
            loading: 'Enviando...',
            success: 'Muchas gracias. Recibimos tu mensaje.',
            failure: 'Tuvimos un problema al enviar tu mensaje.',
          };

          const statusMessage = document.createElement('div');
          statusMessage.className = 'status';

          const request = new window.XMLHttpRequest();
          request.open('POST', posturl, true);
          request.setRequestHeader('accept', 'application/json');

          evt.preventDefault();
          form.getElementsByTagName('button')[0].disabled = true;
          form.appendChild(statusMessage);

          const formData = new window.FormData(form);

          request.send(formData);

          request.onreadystatechange = () => {
            if (request.readyState < 4) {
              statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4) {
              if (request.status === 200 && request.status < 300) {
                const respuesta = JSON.parse(request.response);
                if (respuesta.ok) {
                  statusMessage.innerHTML = respuesta.ok;
                  window.dataLayer.push({
                    event: 'formSubmitted',
                    formName: form.id,
                  });
                } else if (respuesta.errores) {
                  statusMessage.innerHTML = respuesta.errores;
                } else {
                  statusMessage.innerHTML = message.failure;
                }
              } else {
                form.insertAdjacentHTML('beforeend', message.failure);
              }
            }
          };
        }
      }
    }, false);
  }
}

export default initForm;
