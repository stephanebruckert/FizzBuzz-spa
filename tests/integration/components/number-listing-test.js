import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('number-listing', 'Integration | Component | number listing', {
  integration: true
});

test('should toggle wide class on click', function(assert) {
  assert.expect(0);
  let stubNumber = Ember.Object.create({
    number: 3
  });
  this.set('numberObj', stubNumber);
  this.render(hbs`{{number-listing number=numberObj}}`);
});
