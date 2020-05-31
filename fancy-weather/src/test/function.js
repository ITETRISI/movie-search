function sum(a, b) {
  return a + b;
}

function doubleToDegree(value) {
  const degree = parseInt(value, 10);
  const minute = parseInt(Math.abs((value % 1) * 60), 10);
  return `${degree}°${minute}'`;
}

module.exports = {sum,doubleToDegree};