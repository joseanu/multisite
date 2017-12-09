import axios from 'axios';

// de http://blueashes.com/2013/web-development/html5-form-validation-fallback/
function hasHtml5Validation() {
  return typeof document.createElement('input').checkValidity === 'function';
}

function initForm() {
  const form = document.forms[0];

  if (form != null) {
    form.addEventListener(
      'submit',
      (evt) => {
        if (hasHtml5Validation()) {
          if (!form.checkValidity()) {
            evt.preventDefault();
            form.classList.add('invalid');
          } else if (window.FormData) {
            const postUrl = form.action;

            const message = {
              loading: 'Enviando...',
              success: 'Muchas gracias. Recibimos tu mensaje.',
              failure: 'Tuvimos un problema al enviar tu mensaje.',
            };

            const statusMessage = document.createElement('div');
            statusMessage.className = 'status';

            evt.preventDefault();
            form.getElementsByTagName('button')[0].disabled = true;
            form.appendChild(statusMessage);

            const formData = new window.FormData(form);

            axios
              .post(postUrl, formData, {
                onUploadProgress: () => {
                  statusMessage.innerHTML = message.loading;
                },
              })
              .then((response) => {
                if (response.data.ok) {
                  statusMessage.innerHTML = response.data.ok;
                  window.dataLayer.push({
                    event: 'formSubmitted',
                    formName: form.id,
                  });
                } else if (response.data.errores) {
                  statusMessage.innerHTML = response.data.errores;
                } else {
                  statusMessage.innerHTML = message.failure;
                }
              })
              .catch((error) => {
                statusMessage.innerHTML = message.failure;
                throw new Error(error);
              });
          }
        }
      },
      false,
    );
  }
}

export default initForm;
