'use strict';

/*
 * finder
 * 
 * Takes an input and a test function and returns any values in
 * the input that pass the test.
 * 
 * Eg:
 * 
 *   input: [ 'ant', 'baby', [ 'apple', 'banana', 'carrot' ], { foo: 'aardvark' }, 'allegory' ]
 *   test: value => /^a/i.test( value )
 *   returns: [ 'ant', 'allegory' ]
 * 
 */
module.exports = ( input, test ) => {

    if(!input) {
        throw 'The `input` parameter must be an array.';
    }

    if(!test || 'function' != typeof test) {
        throw 'The `test` parameter must be a function.';
    }

    /**
     * Returns a boolean indication of whether supplied parameter is an array.
     * @method isArray
     * @param {mixed} arr The object to test
     * @return {Boolean} True if array, false otherwise.
     */
    var isArray = function(arr) {
        return isObject(Array) ? Array.isArray(input) : Object.prototype.toString.call(arr) === '[object Array]'
    };

    /**
     * Returns a boolean indication of whether supplied parameter is an object.
     * @method isObject
     * @param {mixed} obj The object to test
     * @return {Boolean} True if object, false otherwise.
     */
    var isObject = function(obj) {
        return 'object' === typeof obj;
    };

    /**
     * Returns a boolean indication of whether supplied parameter is a string.
     * @method isString
     * @param {mixed} str The object to test
     * @return {Boolean} True if string, false otherwise.
     */
    var isString = function(str) {
        return 'string' === typeof str;
    };


    if(!isArray(input)) {return null;}

    /*
     * Reduce the supplied array and perform the find operation.
     */
    return input.reduce(function(result, item, itemIndex, input) {
        if(isString(item) && test.apply(this, [item])) {
            result.push(item);
        }
        return result;
    }, []);
};