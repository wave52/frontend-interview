// 最长公共字串
// 寻找两个字符串中的最长公共字串
function lcs(str1, str2) {
  var word1 = str1.split('');
  var word2 = str2.split('');
  var max = 0;
  var index = 0;

  var lcsarr = new Array(word1.length + 1);
  for (var i = 0; i <= word1.length + 1; ++i) {
    lcsarr[i] = new Array(word2.length + 1);
    for (var j = 0; j < word2.length + 1; ++j) {
      lcsarr[i][j] = 0;
    }
  }

  for (var i = 0; i <= word1.length + 1; ++i) {
    for (var j = 0; j < word2.length + 1; ++j) {
      if (i === 0 || j === 0) {
        lcsarr[i][j] = 0;
      } else {
        if (word1[i - 1] === word2[j - 1]) {
          lcsarr[i][j] = lcsarr[i - 1][j - 1] + 1;
        } else {
          lcsarr[i][j] = 0;
        }
      }
      if (max < lcsarr[i][j]) {
        max = lcsarr[i][j];
        index = i;
      }
    }
  }
  console.log('状态表:\n', lcsarr);
  var str = '';
  if (max === 0) {
    return '';
  } else {
    for (var i = index - max; i <= max; ++i) {
      str += word2[i];
    }
    return str;
  }
}

console.log(lcs('abbcc', 'dbbcc'));
