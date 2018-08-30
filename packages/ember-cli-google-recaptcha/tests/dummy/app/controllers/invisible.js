import Controller from '@ember/controller';

export default Controller.extend({
  reset: true,

  actions: {
    reset () {
      this.setProperties ({expired: false, reset: true});
    }
  }
});
