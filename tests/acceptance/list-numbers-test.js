import { test } from 'qunit';
import moduleForAcceptance from 'fizz-buzz-spa/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | list numbers');

test('should list first 100 numbers', function (assert) {
  visit('/');
  andThen(function() {
    assert.equal(find('li').length, 100, 'should see 100 listings');
  });
});
