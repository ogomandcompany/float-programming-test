'use strict';

const fpt = require( '../index.js' );
const test = require( 'tape' );

test( 'DEEPFINDER: exports deepFinder method', t => {
    t.ok( fpt.deepFinder, 'has deepFinder export' );
    t.equal( typeof fpt.deepFinder, 'function', 'deepFinder is a function' );
    t.end();
} );

test( 'DEEPFINDER: finds strings that start with a', t => {
    const input = [ 'ant', 'baby', [ 'apple', 'banana', 'carrot' ], {
        foo: 'aardvark'
    }, 'allegory' ];
    const result = fpt.deepFinder( input, value => /^a/i.test( value ) );

    t.ok( result, 'generated a result' );
    t.deepEqual( result, [ 'ant', 'apple', 'aardvark', 'allegory' ], 'result is correct' );
    t.end();
} );

test('DEEPFINDER: Accepts an `input` array, object, or string and a test function as parameters', t => {
    t.throws(() => fpt.deepFinder(null, function(){}), '`input` cannot be empty or null');
    t.throws(() => fpt.deepFinder(['fizz'], null), '`test` must be a function');
    t.throws(() => fpt.deepFinder(), '`input` and `test` parameters must be supplied');
    t.deepEqual(fpt.deepFinder('ant', value => /^a/i.test( value )), ['ant',], '`input` can be a string' );
    t.deepEqual(fpt.deepFinder({key : 'ant'}, value => /^a/i.test( value )), ['ant',], '`input` can be an object' );
    t.deepEqual(fpt.deepFinder(['ant', 'apple', 'banana',], value => /^a/i.test( value )), ['ant', 'apple',], '`input` can be an array' );
    t.equal(fpt.finder(1, function() {}), null, 'Only array, string, or object `input` parameters are allowed');
    t.end();
});