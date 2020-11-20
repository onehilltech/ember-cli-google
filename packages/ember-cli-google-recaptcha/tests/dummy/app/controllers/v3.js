import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  v3: service ('g-recaptcha-v3'),

  token: undefined,

  actions: {
    execute (action) {
      this.v3.execute ({ action }, '6LcpW-YZAAAAAJPUA--qOZS4242nu8akiHe6KBg-').then (token => this.set ('token', token));
    }
  }
});
