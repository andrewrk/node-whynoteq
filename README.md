# node-whynoteq

Tell why 2 JavaScript values are not equal. Useful when writing tests
which must check deep equality between large JavaScript objects.

## Usage

```js
var assertDeepEqual = require('whynoteq').assertDeepEqual;

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

// throws foobar: Property,goats,ArrayIndex,2,Primitive,3,1
assertDeepEqual(a, c, "foobar");

// throws Type,object,number
assertDeepEqual(new Date(), 1);


assertDeepEqual(17, 17);

// does not throw! undefined properties are the same as nonexistent properties.
assertDeepEqual({foo: undefined}, {derp: undefined});
```
