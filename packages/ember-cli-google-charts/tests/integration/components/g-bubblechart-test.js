import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('g-bubblechart', 'Integration | Component | g bubblechart', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{g-bubblechart}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#g-bubblechart}}
      template block text
    {{/g-bubblechart}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
