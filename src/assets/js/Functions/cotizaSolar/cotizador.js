import axios from 'axios';
import isMobile from 'ismobilejs';

export default {
  name: 'App',
  data: function() {
    return {
      nombre: '',
      correo: '',
      telefono: '',
      ciudad: '',
      estado: '',
      consumo: '',
      mensaje: '',
      usuario_cfe: '',
      servicio_cfe: '',
      autorizo: false,
      gotchaz: '',
      recibo: '',
      errores: {}
    };
  },
  computed: {
    doUpload() {
      //return (window.File && window.FileReader && window.FormData);
      return (window.File && window.FileReader && window.FormData && isMobile.any);
    }
  },
  methods: {
    onSubmit() {

      axios.post('/server/cotizar', this.$data)
        .then(response => alert('todo chido'))
        .catch(error => this.errores = error.response.data);
  
    },
    onFileChange(e) {

      let file = e.target.files[0];
      if ( !file )
        return;
      if ( /^image\//i.test(file.type) )
        this.procesaImagen(file);

    },
    procesaImagen(file) {

      const maxWidth = 80;
    	const maxHeight = 80;

      let image = new Image();
      let reader = new FileReader();
      let vm = this;

      reader.onprogress = (e) => {
        if (e.lengthComputable) {
        }
          var percentage = Math.round((e.loaded * 100) / e.total);
          console.log('Cargado : ' + percentage + '%');
      };
      
      reader.onloadend = (e) => {
        let dataURL = e.target.result;
        let mimeType = dataURL.split(",")[0].split(":")[1].split(";")[0];
        image.src = dataURL;

        image.onload = () => {
		      const width = image.width;
		      const height = image.height;
		      const shouldResize = (width > maxWidth) || (height > maxHeight);

          if (!shouldResize) {
      			vm.recibo = image.src;
      			return;
      		}

      		let newWidth;
		      let newHeight;
      		if (width > height) {
      			newHeight = height * (maxWidth / width);
      			newWidth = maxWidth;
      		} else {
      			newWidth = width * (maxHeight / height);
      			newHeight = maxHeight;
      		}

      		let canvas = document.createElement('canvas');
      		canvas.width = newWidth;
      		canvas.height = newHeight;
      		let context = canvas.getContext('2d');
      		context.drawImage(image, 0, 0, newWidth, newHeight);
      		vm.recibo = canvas.toDataURL(mimeType);
        };
      };
      
      reader.onerror = () => {
    		alert('Error leyendo imágen.');
    	};
      
      reader.readAsDataURL(file);

    },
    removeImage: function (e) {

      this.recibo = '';

    }
  }
};