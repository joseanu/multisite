import axios from 'axios';
import isMobile from 'ismobilejs';
import cambiaTamano from './func/resize';

export default {
  name: 'Cotizador',
  data: function () {
    return {
      tipo: 'casa',
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
      errores: {},
      estatus: ''
    };
  },
  computed: {
    labelNombre () {
      return this.tipo === 'casa' ? 'Nombre' : 'Empresa';
    },
    doUpload () {
      if (typeof window === 'undefined') {
        return false;
      }
      return (window.File && window.FileReader && window.FormData && isMobile.any);
    },
    cargandoRecibo () {
      return (this.recibo === '/assets/img/sun.gif');
    },
    hayErrores () {
      return Object.keys(this.errores).length > 0;
    }
  },
  methods: {
    onSubmit () {
      let vm = this;
      vm.estatus = 'Enviando...';
      axios.post('/server/cotizar', this.$data)
        .then(response => {
          if (response.data.ok) vm.estatus = response.data.ok;
          window.dataLayer.push({
            event: 'formSubmitted',
            formName: 'cotizarSolar',
          });
        })
        .catch(function (error) {
          vm.errores = error.response.data;
          vm.estatus = '';
        });
    },
    onFileChange (e) {
      let vm = this;
      vm.recibo = '/assets/img/sun.gif';
      let file = e.target.files[0];
      if (!file) {
        return;
      }
      if (/^image\//i.test(file.type)) {
        this.procesaImagen(file);
      }
    },
    procesaImagen (file) {
      let reader = new window.FileReader();
      let vm = this;

      reader.onprogress = (e) => {
        var percentage = Math.round((e.loaded * 100) / e.total);
        console.log('Cargado : ' + percentage + '%');
      };

      reader.onloadend = (e) => {
        let image = new window.Image();
        let dataURL = e.target.result;
        let mimeType = dataURL.split(',')[0].split(':')[1].split(';')[0];

        image.src = dataURL;

        image.onload = () => {
          vm.recibo = cambiaTamano(image, mimeType);
        };
      };

      reader.onerror = () => {
        window.alert('Error leyendo imágen.');
        vm.recibo = '';
      };
      console.log('--');
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.recibo = '';
    }
  }
};
