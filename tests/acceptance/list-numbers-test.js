import { test } from 'qunit';
import moduleForAcceptance from 'fizz-buzz-spa/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | list numbers');

test('should list first 5 numbers', function (assert) {
  visit('/');
  andThen(function() {
    assert.equal(find('.listing').length, 5, 'should see 5 listings');
  });
});
