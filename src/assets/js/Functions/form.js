// de http://blueashes.com/2013/web-development/html5-form-validation-fallback/
function hasHtml5Validation() {
  return typeof document.createElement('input').checkValidity === 'function';
}

function initForm() {
  var form = document.forms[0];

  if (form != null) {
    // Listen for the form being submitted
    form.addEventListener('submit', function(evt) {
      if (hasHtml5Validation()) {
        if (!form.checkValidity()) {
          evt.preventDefault();
          form.classList.add('invalid');
        }
        else {
          if (document.forms[0] && window.FormData) {
            var posturl = form.action;

            var message = new Object();
            message.loading = 'Enviando...';
            message.success = 'Muchas gracias. Recibimos tu mensaje.';
            message.failure = 'Tuvimos un problema al enviar tu mensaje.';

            var statusMessage = document.createElement('div');
            statusMessage.className = 'status';

            // Set up the AJAX request
            var request = new XMLHttpRequest();
            request.open('POST', posturl, true);
            request.setRequestHeader('accept', 'application/json');

            evt.preventDefault();
            form.getElementsByTagName('button')[0].disabled = true;
            form.appendChild(statusMessage);

            var formData = new FormData(form);

            // Send the formData
            request.send(formData);

            // Watch for changes to request.readyState and update the statusMessage accordingly
            request.onreadystatechange = function() {                 // <4 =  waiting on response from server
              if (request.readyState < 4) {
                console.log('load...');
                statusMessage.innerHTML = message.loading;
              } else if (request.readyState === 4) {                  // 4 = Response from server has been completely loaded.
                if (request.status == 200 && request.status < 300) {  // 200 - 299 = successful
                  var respuesta = JSON.parse(request.response);
                  if (respuesta.ok) {
                    statusMessage.innerHTML = respuesta.ok;
                    dataLayer.push({
                      'event': 'formSubmitted',
                      'formName': form.id
                    });
                  } else if (respuesta.errores) {                     // TODO manejar errores por separado
                    statusMessage.innerHTML = respuesta.errores;
                  } else {
                    statusMessage.innerHTML = message.failure;
                  }
                }
                else
                  form.insertAdjacentHTML('beforeend', message.failure);
              }
            };
          }
        }
      }
    });
  }
}

export default initForm;