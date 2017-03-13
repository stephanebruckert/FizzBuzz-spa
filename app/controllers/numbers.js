import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    filterByNumber(param) {
      if (param !== '') {
        return this.get('store').query('number', { id: param });
      } else {
        return this.get('store').findAll('number');
      }
    }
  }
});
