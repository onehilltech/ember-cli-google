/* eslint-env node */
module.exports = {
  normalizeEntityName() {}, // no-op since we're just adding dependencies

  afterInstall () {
    return this.addAddonsToProject ({
      packages: [
        {name: 'ember-cli-google-recaptcha', target: '^1.0.0'},
        {name: 'ember-cli-google-charts', target: '^0.2.0'}
      ]
    });
  }
};
