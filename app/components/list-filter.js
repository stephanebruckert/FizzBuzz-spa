import Ember from 'ember';

function isNormalInteger(str) {
    var n = Math.floor(Number(str));
    return String(n) === str && n >= 0;
}

export default Ember.Component.extend({
  classNames: ['list-filter'],
  value: '',

  init() {
    this._super(...arguments);
    this.get('filter')('').then((results) => this.set('results', results));
  },

  actions: {
    handleFilterEntry() {
      if (isNormalInteger(this.get('value'))) {
        let filterInputValue = this.get('value');
        this.set('value', filterInputValue);
        let filterAction = this.get('filter');
        // this calls filterByNumber from controllers/numbers.js
        filterAction(filterInputValue).then((filterResults) => this.set('results', filterResults));
      }
    },

    next() {
      let lastPossibleOffset = 100000000000;
      let nextOffset = (parseInt(this.get('value')) || 1) + 100;
      if (nextOffset > lastPossibleOffset) {
        nextOffset = lastPossibleOffset;
      } else {
        this.set('value', nextOffset);
      }
      let filterAction = this.get('filter');
      filterAction(this.get('value')).then((filterResults) => this.set('results', filterResults));
    },

    previous() {
      let nextOffset = this.get('value') - 100;
      if (nextOffset < 1) {
        nextOffset = 1;
      }
      this.set('value', nextOffset);
      let filterAction = this.get('filter');
      filterAction(this.get('value')).then((filterResults) => this.set('results', filterResults));
    }
  }
});
