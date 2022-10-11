import EmberObject from '@ember/object';
import MapEntityMixin from 'ember-cli-google-maps/mixins/map-entity';
import { module, test } from 'qunit';

module('Unit | Mixin | map-entity', function () {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let MapEntityObject = EmberObject.extend(MapEntityMixin);
    let subject = MapEntityObject.create();
    assert.ok(subject);
  });
});
