import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    filterByNumber(offset, limit) {
      if (offset !== '') {
        if (limit !== '') {
          return this.get('store').query('number', { offset: offset, limit: limit });
        } else {
          return this.get('store').query('number', { offset: offset });
        }
      } else {
        return this.get('store').findAll('number');
      }
    }
  }
});
