import Controller from '@ember/controller';

export default Controller.extend ({
  animation: 'bounce',

  actions: {
    mapClick (ev) {
      console.log (ev);
    },

    toggleBounce () {
      let animation = this.get ('animation');
      this.set ('animation', animation === 'bounce' ? null : 'bounce');
    }
  }
});
