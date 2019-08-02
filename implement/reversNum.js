function reverse(num) {
  let num1 = num / 10;
  let num2 = num % 10;
  if (num1 < 1) {
    return num;
  } else {
    num1 = Math.floor(num1);
    return `${num2}${reverse(num1)}`;
  }
}

console.log(reverse(1234));
