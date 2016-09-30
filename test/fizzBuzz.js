'use strict';

const fpt = require( '../index.js' );
const test = require( 'tape' );

test('FIZZBUZZ: exports fizzBuzz method', t => {
    t.ok( fpt.fizzBuzz, 'has fizzBuzz export' );
    t.equal( typeof fpt.fizzBuzz, 'function', 'fizzBuzz is a function' );
    t.end();
});

test('FIZZBUZZ: returns a proper array based on input length', t => {
    const result = fpt.fizzBuzz( 15 );

    t.ok( result, 'generated a result' );
    t.deepEqual( result, [ 1, 2, 'fizz', 4, 'buzz', 'fizz', 7, 8, 'fizz', 'buzz', 11, 'fizz', 13, 14, 'fizzbuzz'], 'result is correct' );
    t.end();
});

test('FIZZBUZZ: only accepts an integer parameter', t => {
    t.throws(() => fpt.fizzBuzz(), '`length` cannot be empty or null');
    t.throws(() => fpt.fizzBuzz('fizz'), '`length` cannot be a string');
    t.throws(() => fpt.fizzBuzz({}), '`length` cannot be an object');
    t.throws(() => fpt.fizzBuzz([]), '`length` cannot be an array');
    t.end();
});