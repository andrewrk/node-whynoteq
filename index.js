exports.assertDeepEqual = assertDeepEqual;
exports.whyNotEq = whyNotEq;

function whyNotEq(a, b) {
  if (a === b) return null;

  var inner;
  if (a instanceof Date && b instanceof Date) {
    var aTime = a.getTime();
    var bTime = b.getTime();
    inner = whyNotEq(aTime, bTime);
    return inner ? ['Date', inner] : null;
  }

  var aType = typeof a;
  var bType = typeof b;
  if (aType !== bType) return ['Type', aType, bType];

  var aIsArray = Array.isArray(a);
  var bIsArray = Array.isArray(b);
  if (aIsArray !== bIsArray) return ['IsArray', aIsArray, bIsArray];

  if (aType !== 'object') return ['Primitive', a, b];

  if (aIsArray) {
    var aLength = a.length;
    var bLength = b.length;
    inner = whyNotEq(aLength, bLength);
    if (inner) return ['ArrayLength', inner];

    for (var i = 0; i < aLength; i += 1) {
      inner = whyNotEq(a[i], b[i]);
      if (inner) return ['ArrayIndex', i, inner];
    }
    return null;
  }

  // one or both might be null
  if (a === null && b !== null) {
    return ['IsNull', true, false];
  } else if (a !== null && b === null) {
    return ['IsNull', false, true];
  } else if (a === null && b === null) {
    return null;
  }

  // they are objects
  var prop;
  for (prop in a) {
    inner = whyNotEq(a[prop], b[prop]);
    if (inner) return ['Property', prop, inner];
  }
  for (prop in b) {
    inner = whyNotEq(a[prop], b[prop]);
    if (inner) return ['Property', prop, inner];
  }

  return null;
}

function assertDeepEqual(actual, expected, msg) {
  var explanation = whyNotEq(actual, expected);
  if (!explanation) return;
  var prefix = msg ? (msg + ": ") : "";
  var err = new Error(prefix + explanation.join(","));
  err.prettyPrint = function() {
    printArr(explanation, 0);
  };
  throw err;
}

function printArr(arr, indent) {
  arr.forEach(function(item) {
    for (var indentI = 0; indentI < indent; indentI += 1) {
      process.stderr.write(" ");
    }
    if (Array.isArray(item)) {
      process.stderr.write("\n");
      printArr(arr, indent + 2);
    } else {
      process.stderr.write(item);
      process.stderr.write("\n");
    }
  });
}
