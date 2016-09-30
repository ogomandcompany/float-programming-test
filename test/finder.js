'use strict';

const fpt = require( '../index.js' );
const test = require( 'tape' );

test( 'FINDER: exports finder method', t => {
    t.ok( fpt.finder, 'has finder export' );
    t.equal( typeof fpt.finder, 'function', 'finder is a function' );
    t.end();
} );

test( 'FINDER: finds strings that start with a', t => {
    const input = [ 'ant', 'baby', [ 'apple', 'banana', 'carrot' ], {
        foo: 'aardvark'
    }, 'allegory' ];
    const result = fpt.finder( input, value => /^a/i.test( value ) );

    t.ok( result, 'generated a result' );
    t.deepEqual( result, [ 'ant', 'allegory' ], 'result is correct' );
    t.end();
} );

test('FINDER: Accepts an `input` array and a test function as parameters', t => {
    t.throws(() => fpt.finder(null, function(){}), '`input` cannot be empty or null');
    t.throws(() => fpt.finder(['fizz'], null), '`test` must be a function');
    t.throws(() => fpt.finder(), '`input` and `test` parameters must be supplied');
    t.equal(fpt.finder({}, function() {}), null, '`input` must be an array');
    t.end();
});