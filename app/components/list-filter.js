import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['list-filter'],
  value: '',

  init() {
    this._super(...arguments);
    this.get('filter')('').then((results) => this.set('results', results));
  },

  actions: {
    handleFilterEntry() {
      let filterInputValue = this.get('value');
      this.set('value', filterInputValue);
      let filterAction = this.get('filter');
      filterAction(filterInputValue).then((filterResults) => this.set('results', filterResults));
    },

    next() {
      this.set('value', (parseInt(this.get('value')) || 1) + 100);
      let filterAction = this.get('filter');
      filterAction(this.get('value')).then((filterResults) => this.set('results', filterResults));
    },

    previous() {
      this.set('value', this.get('value') - 100);
      let filterAction = this.get('filter');
      filterAction(this.get('value')).then((filterResults) => this.set('results', filterResults));
    }
  }
});
