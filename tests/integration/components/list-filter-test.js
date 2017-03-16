import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import RSVP from 'rsvp';

moduleForComponent('list-filter', 'Integration | Component | filter listing', {
  integration: true
});

const INITIAL_PAGE = [
  {id: 1, value: 1},
  {id: 2, value: 2},
  {id: 3, value: 'Fizz'}
];

const SECOND_PAGE = [
  {id: 101, value: 'Buzz'},
  {id: 102, value: 'Fizz'},
  {id: 103, value: 103}
];

test('should initially load all listings', function (assert) {
  // we want our actions to return promises, since they are potentially fetching data asynchronously
  this.on('filterByNumber', (val) => {
    if (val === '') {
      return RSVP.resolve(INITIAL_PAGE);
    } else {
      return RSVP.resolve(SECOND_PAGE);
    }
  });

  // with an integration test, you can set up and use your component in the same way your application
  // will use it.
  this.render(hbs`
    {{#list-filter
       filter=(action 'filterByNumber')
       as |numbers|}}
      <ul id="number-list">
        {{#each numbers as |numberUnit|}}
        <li>
          {{number-listing number=numberUnit}}
        </li>
        {{/each}}
      </ul>
    {{/list-filter}}
  `);

  // the wait function will return a promise that will wait for all promises
  // and xhr requests to resolve before running the contents of the then block.
  return wait().then(() => {
    assert.equal(this.$('label').length, 3);
    assert.equal(this.$('label').first().text().trim(), 1);
  });
});

test('should search a number', function (assert) {
  // we want our actions to return promises, since they are potentially fetching data asynchronously
  this.on('filterByNumber', (val) => {
    if (val === '' || val <= 100) {
      return RSVP.resolve(INITIAL_PAGE);
    } else {
      return RSVP.resolve(SECOND_PAGE);
    }
  });

  this.render(hbs`
    {{#list-filter
       filter=(action 'filterByNumber')
       as |numbers|}}
      <ul id="number-list">
        {{#each numbers as |numberUnit|}}
        <li>
          {{number-listing number=numberUnit}}
        </li>
        {{/each}}
      </ul>
    {{/list-filter}}
  `);

  // The keyup event here should invoke an action that will cause the list to be filtered
  // and xhr requests to resolve before running the contents of the then block.
  this.$('#search').val('101').keyup();
  return wait().then(() => {
    assert.equal(this.$('label').length, 3);
    assert.equal(this.$('label').first().text().trim(), 'Buzz');
  });
});

test('should return the first page when asking for number 100', function (assert) {
  // we want our actions to return promises, since they are potentially fetching data asynchronously
  this.on('filterByNumber', (val) => {
    if (val === '' || val <= 100) {
      return RSVP.resolve(INITIAL_PAGE);
    } else {
      return RSVP.resolve(SECOND_PAGE);
    }
  });

  this.render(hbs`
    {{#list-filter
       filter=(action 'filterByNumber')
       as |numbers|}}
      <ul id="number-list">
        {{#each numbers as |numberUnit|}}
        <li>
          {{number-listing number=numberUnit}}
        </li>
        {{/each}}
      </ul>
    {{/list-filter}}
  `);

  // The keyup event here should invoke an action that will cause the list to be filtered
  // and xhr requests to resolve before running the contents of the then block.
  this.$('#search').val('100').keyup();
  return wait().then(() => {
    assert.equal(this.$('label').length, 3);
    assert.equal(this.$('label').first().text().trim(), 1);
  });
});


test('should not allow searching anything else than an integer', function (assert) {
  this.on('filterByNumber', (val) => {
    if (val === '' || val <= 100) {
      return RSVP.resolve(INITIAL_PAGE);
    } else {
      return RSVP.resolve(SECOND_PAGE);
    }
  });

  this.render(hbs`
    {{#list-filter
       filter=(action 'filterByNumber')
       as |numbers|}}
      <ul id="number-list">
        {{#each numbers as |numberUnit|}}
        <li>
          {{number-listing number=numberUnit}}
        </li>
        {{/each}}
      </ul>
    {{/list-filter}}
  `);

  this.$('#search').val('10.1').keyup();
  return wait().then(() => {
    assert.equal(this.$('label').length, 3);
    assert.equal(this.$('label').first().text().trim(), 1);
  });
});

test('should not allow paging backward when on first page', function (assert) {
  this.on('filterByNumber', (val) => {
    if (val === '' || val <= 100) {
      return RSVP.resolve(INITIAL_PAGE);
    } else {
      return RSVP.resolve(SECOND_PAGE);
    }
  });

  this.render(hbs`
    {{#list-filter
       filter=(action 'filterByNumber')
       as |numbers|}}
      <ul id="number-list">
        {{#each numbers as |numberUnit|}}
        <li>
          {{number-listing number=numberUnit}}
        </li>
        {{/each}}
      </ul>
    {{/list-filter}}
  `);

  let label = this.$('label');
  $('button#previous').on("click", function() {
    assert.equal(label.length, 3);
    assert.equal(label.first().text().trim(), 1);
  });
  $('button#previous').trigger("click");
});
