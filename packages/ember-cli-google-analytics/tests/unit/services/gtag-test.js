import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Service | gtag", function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test("it exists", function (assert) {
    let service = this.owner.lookup("service:gtag");
    assert.ok(service);
  });
});
