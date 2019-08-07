Number.prototype.add = function(v) {
  return this + v;
};

Number.prototype.minus = function(v) {
  return this - v;
};

console.log((5).add(3).minus(2));
