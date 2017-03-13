import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    filterByNumber(param) {
      if (param === '') {
        param = 1;
      }
      return this.get('store').query('number', { id: param });
    }
  }
});
