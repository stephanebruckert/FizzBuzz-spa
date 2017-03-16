import Ember from 'ember';


export default Ember.Controller.extend({
  actions: {
    filterByNumber(offset, limit) {
      let normalizeOffset = function(offset) {
        // if given 100, we want to ask for first page (1-100)
        // this resets the offset to 1
        return Math.floor((offset - 1)/100 ) * 100 + 1;
      };

      let params = {};
      if (offset !== '') {
        if (limit !== '') {
          params.limit = limit;
        }
        params.offset = normalizeOffset(offset);
      }
      return this.get('store').query('number', params);
    }
  }
});
