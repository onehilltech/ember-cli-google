import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | g-recaptcha-v3', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let service = this.owner.lookup('service:g-recaptcha-v3');
    assert.ok(service);
  });
});

