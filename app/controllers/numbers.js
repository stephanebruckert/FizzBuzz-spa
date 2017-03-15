import Ember from 'ember';


export default Ember.Controller.extend({
  actions: {
    filterByNumber(offset, limit) {
      let normalizeOffset = function(offset) {
        return Math.floor(offset/100) * 100 + 1;
      };

      let params = {};
      if (offset !== '') {
        offset = normalizeOffset(offset);
        if (limit !== '') {
          params.limit = limit;
        }
        params.offset = offset;
      }
      return this.get('store').query('number', params);
    }
  }
});
