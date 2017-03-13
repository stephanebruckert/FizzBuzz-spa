export default function() {
  this.namespace = '/api';

  this.get('/numbers', function() {
    return {
      data: [{
        type: 'numbers',
        id: '1',
        attributes: {
          number: 1
        }
      }, {
        type: 'numbers',
        id: '2',
        attributes: {
          number: 2
        }
      }, {
        type: 'numbers',
        id: '3',
        attributes: {
          number: 'Fizz'
        }
      }, {
        type: 'numbers',
        id: '4',
        attributes: {
          number: 4
        }
      }, {
        type: 'numbers',
        id: '5',
        attributes: {
          number: 'Buzz'
        }
      }]
    };
  });
}
