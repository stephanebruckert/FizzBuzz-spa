export default function() {
  this.namespace = '/api';

  let generateNumbers = function(numberToFind) {
    let offset = Math.floor(numberToFind/100) * 100;
    return Array(100).fill(1).map(function(n, value) {
      value += offset + 1;
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
    let limit;
    if(request.queryParams.limit !== undefined) {
      limit = request.queryParams.limit;
    }
    if(request.queryParams.offset !== undefined) {
      return { data: generateNumbers(request.queryParams.offset, limit) };
    } else {
      return { data: generateNumbers(1) };
    }
  });
}
