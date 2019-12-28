// https://gist.github.com/JakeChampion/6b9a3579a61241339bef73908c3a6d66
// "Type(x)" is used as shorthand for "the type of x"...
function Type(x) { // eslint-disable-line no-unused-vars
	switch (typeof x) {
		case 'undefined':
			return 'undefined';
		case 'boolean':
			return 'boolean';
		case 'number':
			return 'number';
		case 'string':
			return 'string';
		case 'symbol':
			return 'symbol';
		default:
			// typeof null is 'object'
			if (x === null) return 'null';
			// Polyfill.io - This is here because a Symbol polyfill will have a typeof `object`.
			if ('Symbol' in this && x instanceof this.Symbol) return 'symbol';
			return 'object';
	}
}

function ToString(argument) {
  // eslint-disable-line no-unused-vars
  switch (Type(argument)) {
    case "symbol":
      throw new TypeError("Cannot convert a Symbol value to a string");
      break;
    case "object":
      var primValue = ToPrimitive(argument, "string");
      return ToString(primValue);
    default:
      return String(argument);
  }
}

// 7.1.5. ToInt32 ( argument )
function ToInt32(argument) {
  // eslint-disable-line no-unused-vars
  // 1. Let number be ? ToNumber(argument).
  var number = Number(argument);
  // 2. If number is NaN, +0, -0, +∞, or -∞, return +0.
  if (
    isNaN(number) ||
    number === 0 ||
    number === -0 ||
    number === Infinity ||
    number === -Infinity
  ) {
    return 0;
  }
  // 3. Let int be the mathematical value that is the same sign as number and whose magnitude is floor(abs(number)).
  var int = (number < 0 ? -1 : 1) * Math.floor(Math.abs(number));
  // 4. Let int32bit be int modulo 2^32.
  var int32bit = int % Math.pow(2, 32);
  // 5. If int32bit ≥ 2^31, return int32bit - 2^32; otherwise return int32bit.
  if (int32bit >= Math.pow(2, 31)) {
    return int32bit - Math.pow(2, 32);
  } else {
    return int32bit;
  }
}

function ToDigit(ch) {
  if (ch >= "0" && ch <= "9") {
    return ch.charCodeAt(0) - "0".charCodeAt(0);
  } else if (ch >= "A" && ch <= "Z") {
    return 10 + ch.charCodeAt(0) - "A".charCodeAt(0);
  } else if (ch >= "a" && ch <= "z") {
    return 10 + ch.charCodeAt(0) - "a".charCodeAt(0);
  }
  return undefined;
}

function JparseInt(string, radix) {
  // 1. Let inputString be ? ToString(string).
  let inputString = ToString(string);

  // 2. Let S be a newly created substring of inputString consisting of the first code unit that is not a StrWhiteSpaceChar and all code units following that code unit. (In other words, remove leading white space.) If inputString does not contain any such code unit, let S be the empty string.
  let S = inputString.trim();

  // 3. Let sign be 1.
  let sign = 1;

  // 4. If S is not empty and the first code unit of S is 0x002D (HYPHEN-MINUS), let sign be -1.
  if (S !== "" && S.charAt(0) === "-") {
    sign = -1;
  }

  // 5. If S is not empty and the first code unit of S is 0x002B (PLUS SIGN) or 0x002D (HYPHEN-MINUS), remove the first code unit from S.
  if (S !== "" && (S.charAt(0) === "-" || S.charAt(0) === "+")) {
    S = S.substr(1);
  }

  // 6. Let R be ? ToInt32(radix).
  let R = ToInt32(radix);

  // 7. Let stripPrefix be true.
  let stripPrefix = true;

  // 8. If R ≠ 0, then
  if (R !== 0) {
    // a. If R < 2 or R > 36, return NaN.
    if (R < 2 || R > 36) {
      return NaN;
    }

    // b .If R ≠ 16, let stripPrefix be false.
    if (R !== 16) {
      stripPrefix = false;
    }
  } else {
    // 9. Else R = 0,
    // a. Let R be 10.
    R = 10;
  }

  // 10. If stripPrefix is true, then
  if (stripPrefix === true) {
    // a. If the length of S is at least 2 and the first two code units of S are either "0x" or "0X", remove the first two code units from S and let R be 16.
    if (
      S.length >= 2 &&
      S.charAt(0) === "0" &&
      (S.charAt(1) === "x" || S.charAt(1) === "X")
    ) {
      S = S.substr(2);
      R = 16;
    }
  }

  // 11. If S contains a code unit that is not a radix-R digit, let Z be the substring of S consisting of all code units before the first such code unit; otherwise, let Z be S.
  let Z = "";
  for (let i = 0; i < S.length; ++i) {
    let digit = ToDigit(S.charAt(i));
    if (digit === undefined || digit >= R) {
      break;
    }
    Z = Z + S.charAt(i);
  }

  // 12. If Z is empty, return NaN.
  if (Z === "") {return NaN;}

  // 13. Let mathInt be the mathematical integer value that is represented by Z in radix-R notation, using the letters A-Z and a-z for digits with values 10 through 35. (However, if R is 10 and Z contains more than 20 significant digits, every significant digit after the 20th may be replaced by a 0 digit, at the option of the implementation; and if R is not 2, 4, 8, 10, 16, or 32, then mathInt may be an implementation-dependent approximation to the mathematical integer value that is represented by Z in radix-R notation.)
  let mathInt = 0;
  for (let i = 0; i < Z.length; ++i) {
    mathInt = mathInt * R + (ToDigit(Z.charAt(i)) || 0);
  }

  // 14. If mathInt = 0, then
  if (mathInt === 0) {
    // a. If sign = -1, return -0.
    if (sign === -1) {
      return -0;
    }
    // b. Return +0.
    return +0;
  }

  // 15. Let number be the Number value for mathInt.
  let number = Number(mathInt);

  // 5. Return sign × number.
  return sign * number;
}
JparseInt(0xf2f2f2,10)
