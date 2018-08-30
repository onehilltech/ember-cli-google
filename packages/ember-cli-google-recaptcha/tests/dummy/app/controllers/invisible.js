import Controller from '@ember/controller';

export default Controller.extend({
  reset: true,

  actions: {
    expired () {
      alert ('The reCAPTCHA has expired');
    }
  }
});
