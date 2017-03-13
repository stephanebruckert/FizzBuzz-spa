import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import RSVP from 'rsvp';

moduleForComponent('list-filter', 'Integration | Component | filter listing', {
  integration: true
});

const ITEMS = [{number: 1}, {number: 2}, {number: 'Fizz'}];
const FILTERED_ITEMS = [{number: 'Buzz'}, {number: 'Fizz'}, {number: 3}];

test('should initially load all listings', function (assert) {
  // we want our actions to return promises, since they are potentially fetching data asynchronously
  this.on('filterByNumber', (val) => {
    if (val === '') {
      return RSVP.resolve(ITEMS);
    } else {
      return RSVP.resolve(FILTERED_ITEMS);
    }
  });

  // with an integration test, you can set up and use your component in the same way your application
  // will use it.
  this.render(hbs`
    {{#list-filter filter=(action 'filterByNumber') as |results|}}
      <ul>
      {{#each results as |item|}}
        <li class="number">
          {{item.number}}
        </li>
      {{/each}}
      </ul>
    {{/list-filter}}
  `);

  // the wait function will return a promise that will wait for all promises
  // and xhr requests to resolve before running the contents of the then block.
  return wait().then(() => {
    assert.equal(this.$('.number').length, 3);
    assert.equal(this.$('.number').first().text().trim(), 1);
  });
});

test('should initially load all listings', function (assert) {
  // we want our actions to return promises, since they are potentially fetching data asynchronously
  this.on('filterByNumber', (val) => {
    if (val === '') {
      return RSVP.resolve(ITEMS);
    } else {
      return RSVP.resolve(FILTERED_ITEMS);
    }
  });

  this.render(hbs`
    {{#list-filter filter=(action 'filterByNumber') as |results|}}
      <ul>
      {{#each results as |item|}}
        <li class="number">
          {{item.number}}
        </li>
      {{/each}}
      </ul>
    {{/list-filter}}
  `);

  // The keyup event here should invoke an action that will cause the list to be filtered
  // and xhr requests to resolve before running the contents of the then block.
  this.$('input #search').val('101').keyup();
  return wait().then(() => {
    assert.equal(this.$('.number').length, 3);
    assert.equal(this.$('.number').first().text().trim(), 'Buzz');
  });
});
