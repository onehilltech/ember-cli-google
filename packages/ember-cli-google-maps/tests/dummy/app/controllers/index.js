import Controller from '@ember/controller';

export default Controller.extend ({
  animation: 'bounce',

  actions: {
    toggleBounce () {
      let animation = this.get ('animation');
      this.set ('animation', animation === 'bounce' ? null : 'bounce');
    }
  }
});
