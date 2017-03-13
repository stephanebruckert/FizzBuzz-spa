export default function() {
  this.namespace = '/api';

  let generateNumbers = function(numberToFind) {
    return Array(100).fill(1).map(function(n, value) {
      value += numberToFind / 100 * 100;
      let fizzbuzz = '';
      fizzbuzz += value % 3 === 0 ? 'Fizz' : '';
      fizzbuzz += value % 5 === 0 ? 'Buzz' : '';
      return {
        type: 'numbers',
        id: value,
        attributes: {
          number: fizzbuzz || value
        }
      };
    });
  };

  this.get('/numbers', function(db, request) {
    if(request.queryParams.id !== undefined) {
      return { data: generateNumbers(request.queryParams.id) };
    } else {
      return { data: generateNumbers(1) };
    }
  });
}
