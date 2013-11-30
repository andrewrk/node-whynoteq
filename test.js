var assert = require('assert');
var assertDeepEqual = require('./').assertDeepEqual;

var a = {
  "milk": "foo",
  "goats": [1, 2, 3],
};

var b = {
  "milk": "foo",
  "goats": [1, 2, 3],
};

var c = {
  "milk": "foo",
  "goats": [1, 2, 1],
};

assertDeepEqual(a, b, "foobar");

assert.throws(function() {
  assertDeepEqual(a, c, "foobar");
}, /foobar: Property,goats,ArrayIndex,2,Primitive,3,1/);

assert.throws(function() {
  assertDeepEqual(new Date(), 1);
}, /Type,object,number/);

assertDeepEqual(17, 17);

assertDeepEqual({foo: undefined}, {derp: undefined});
