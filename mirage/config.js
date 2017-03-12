export default function() {
  this.namespace = '/api';

  this.get('/numbers', function() {
    return {
      data: [{
        number: 1
      }, {
        number: 2
      }, {
        number: 'Fizz'
      }, {
        number: 4
      }, {
        number: 'Buzz'
      }]
    };
  });
}
