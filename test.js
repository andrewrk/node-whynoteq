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

var d = {
  "layer1": {
    "layer2": {
      "layer3": {
        "layer4": {
          "layer5": "hi"
        },
      },
    },
  },
};

var e = {
  "layer1": {
    "layer2": {
      "layer3": {
        "layer5": {
          "layer6": "hi"
        },
      },
    },
  },
};

assertDeepEqual(a, b, "foobar");

assert.throws(function() {
  assertDeepEqual(a, c, "foobar");
}, /foobar: Property,goats,ArrayIndex,2,Primitive,3,1/);

assert.throws(function() {
  assertDeepEqual(d, e);
}, /Property,layer1,Property,layer2,Property,layer3,Property,layer4,Type,object,undefined/);

assert.throws(function() {
  assertDeepEqual(new Date(), 1);
}, /Type,object,number/);

assertDeepEqual(17, 17);

assertDeepEqual({foo: undefined}, {derp: undefined});
