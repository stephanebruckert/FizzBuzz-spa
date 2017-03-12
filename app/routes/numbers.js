import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return [{
      number: 1
    }, {
      number: 2
    }, {
      number: 'Fizz'
    }, {
      number: 4
    }, {
      number: 'Buzz'
    }];
  }
});
