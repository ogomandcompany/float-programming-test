'use strict';

/*
 * balancedParentheses
 * 
 * Takes an input string and returns true or false depending on if the string
 * has balanced parentheses.
 * 
 * Eg:
 * 
 *   input: '(x + y)'
 *   returns: true
 * 
 *   input: '(x + y'
 *   returns: false
 * 
 *   input: 'foo bar baz'
 *   returns: false
 * 
 *   input: ''
 *   returns: false
 */
module.exports = ( input ) => {

    if('string' !== typeof input || input.length < 2) {return false;}

    var stack = [];
    var matched = false;

    for(var i = 0; i < input.length; i++) {
        var token = input.charAt(i);
        if('(' == token) {stack.push(token);}
        if(')' == token) {
            if(stack.length) {
                matched = true;
                stack.pop();
            } else {
                return false;
            }
        }
    }

    return matched && 0 == stack.length;
};