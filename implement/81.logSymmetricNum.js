// 打印出 1 - 10000 之间的所有对称数 例如：121、1331 等
function lsn(min, max) {
  for (let i = min; i < max; i++) {
    let i2 = Number(
      i
        .toString()
        .split('')
        .reverse()
        .join('')
    );
    if (i === i2) {
      console.log(i);
    }
  }
}

lsn(1, 10000);
