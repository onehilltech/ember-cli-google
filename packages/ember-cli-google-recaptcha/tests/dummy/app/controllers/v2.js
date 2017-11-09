import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    expired () {
      alert ('The reCAPTCHA has expired');
    }
  }
});
