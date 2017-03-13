export default function() {
  this.namespace = '/api';

  this.get('/numbers', function() {
    var number = function(n, value) {
      value += 1;
      var fizzbuzz = '';
      fizzbuzz += (value % 3 == 0 ? 'Fizz' : '');
      fizzbuzz += (value % 5 == 0 ? 'Buzz' : '');
      return {
        type: 'numbers',
        id: value,
        attributes: {
          number: fizzbuzz || value
        }
      }
    }
    return {
      data: Array(100).fill(1).map(number)
    }
  });
}
