document.addEventListener("DOMContentLoaded", function() {
  
  //Barba.Pjax.Dom.wrapperId = 'jr-principal';
  //Barba.Pjax.Dom.containerClass = 'jr-contenido';
  
  Barba.Pjax.init();
  
  var HideShowTransition = Barba.BaseTransition.extend({
    start: function() {
      this.newContainerLoading.then(this.finish.bind(this));
    },
  
    finish: function() {
      document.body.scrollTop = 0;
      this.done();
    }
  });

  Barba.Pjax.getTransition = function() {
    return HideShowTransition;
  };

});