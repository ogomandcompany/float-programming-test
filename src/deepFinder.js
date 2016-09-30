'use strict';

/*
 * deepFinder
 * 
 * Takes an input and a test function and returns any values
 * in the input *recursively* that pass the test.
 *
 * Eg:
 * 
 *   input: [ 'ant', 'baby', [ 'apple', 'banana', 'carrot' ], { foo: 'aardvark' }, 'allegory' ]
 *   test: value => /^a/i.test( value )
 *   returns: [ 'ant', 'apple', 'aardvark', 'allegory' ]
 * 
 */
module.exports = ( input, test ) => {

    if(!input) {
        throw 'The `input` parameter must be a string, an array, or an object.';
    }

    if(!test || 'function' != typeof test) {
        throw 'The `test` parameter must be a function.';
    }

    /**
     * Returns the result of a find operation
     * @method finder
     * @param {string|array|object} haystack The data being operated on.
     * @param {function} search The search function
     * @param {array} carry search results container
     * @return {array} Result of find operation.
     */
    var finder = function(haystack, search, carry) {
        return haystack.reduce(function(result, item, itemIndex, haystack) {
            if(isString(item) && search.apply(this, [item])) {
                result.push(item);
            } else {
                if(isArray(item)) {
                    result = finder(item, search, result);
                } else {
                    if(isObject(item)) {
                        var itemValues = getObjectValues(item); // serialization to support nested objects.
                        result = finder(itemValues, search, result);
                    }
                }
            }
            return result;
        }, carry);
    };

    /**
     * Returns the values of the supplied object's key:value pair
     * @method getObjectValues
     * @param {object} obj The object to operate on
     * @return {array} Array of the object's values.
     */
    var getObjectValues = function(obj) {
        var result = [];
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop)) {
                result.push(obj[prop]);
            }
        }
        return result;
    };

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

    if(isString(input)) {
        return test.apply(this, [input]) ? [input] : [];
    }

    if(isArray(input)) {
        return finder(input, test, []);
    }

    if(isObject(input)) {
        return finder(getObjectValues(input), test, []);
    }

    if(!isArray(input)) {return null;}
    return finder(input, test, []);
};