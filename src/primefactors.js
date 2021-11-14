// Copyright (c) 2011 Alexei Kourbatov, www.JavaScripter.net

// function leastFactor(n) returns:
// * the smallest prime that divides n
// * NaN if n is NaN or Infinity
// *  0  if n is 0
// *  1  if n=1, n=-1, or n is not an integer

leastFactor = function (n) {
  if (isNaN(n) || !isFinite(n)) return NaN;
  if (n == 0) return 0;
  if (n % 1 || n * n < 2) return 1;
  if (n % 2 == 0) return 2;
  if (n % 3 == 0) return 3;
  if (n % 5 == 0) return 5;
  var m = Math.sqrt(n);
  for (var i = 7; i <= m; i += 30) {
    if (n % i == 0) return i;
    if (n % (i + 4) == 0) return i + 4;
    if (n % (i + 6) == 0) return i + 6;
    if (n % (i + 10) == 0) return i + 10;
    if (n % (i + 12) == 0) return i + 12;
    if (n % (i + 16) == 0) return i + 16;
    if (n % (i + 22) == 0) return i + 22;
    if (n % (i + 24) == 0) return i + 24;
  }
  return n;
};

// function isPrime(n) returns:
// - false if n is NaN or not a finite integer
// - true  if n is prime
// - false otherwise

isPrime = function (n) {
  if (isNaN(n) || !isFinite(n) || n % 1 || n < 2) return false;
  if (n == leastFactor(n)) return true;
  return false;
};

// function factor(n) returns:
// * a string containing the prime factorization of n
// * n.toString() if the factrization cannot be found

function factor(n) {
  if (isNaN(n) || !isFinite(n) || n % 1 || n == 0) return n.toString();
  if (n < 0) return "-" + factor(-n);
  var minFactor = leastFactor(n);
  if (n == minFactor) return n.toString();
  return minFactor + "*" + factor(n / minFactor);
}

// function nextPrime(n) returns:
// * the smallest prime greater than n
// * NaN if this prime is not a representable integer

function nextPrime(n) {
  if (isNaN(n) || !isFinite(n)) return NaN;
  if (n < 2) return 2;
  for (var i = Math.floor(n) + 1; i < 9007199254740992; i++) {
    if (isPrime(i)) return i;
  }
  return NaN;
}

export { factor };
