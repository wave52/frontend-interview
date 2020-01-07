var fChange = function(e) {};
function createFileInput() {
  var f = document.createElement('input');
  f.type = 'file';
  f.style.display = 'none';
  document.body.appendChild(f);
  f.addEventListener('change', function(e) {
    fChange(e);
  });
  return f;
}
var f = createFileInput();
var pick = function(type, multiple) {
  return new Promise((resolve, reject) => {
    if (/image/.test(type)) {
      f.accept = 'image/jpeg,image/png,image/gif';
    } else if (/video/.test(type)) {
      f.accept = 'video/mp4,video/avi,video/rmvb,video/flv,video/mov';
    } else {
      f.accept = '';
    }
    if (multiple) f.multiple = 'multiple';
    fChange = function(e) {
      if (multiple) resolve(e.target.files);
      else resolve(e.target.files.item(0));
      f = createFileInput();
      //console.log(window.URL.createObjectURL(file))
    };
    f.click();
  });
};

pick.toBase64 = function(url, size) {
  return new Promise(function(resolve, reject) {
    var img = new Image();
    img.src = url;
    img.crossOrigin = '*';
    img.onload = function() {
      var canvas = document.createElement('canvas');
      //canvas.style.display = "none"
      //document.body.appendChild(canvas)
      if (typeof size == 'function') {
        size = size(img.width, img.height);
        canvas.width = size.w;
        canvas.height = size.h;
      } else if (typeof size == 'object') {
        canvas.width = size.w;
        canvas.height = size.h;
      } else {
        canvas.width = img.width;
        canvas.height = img.height;
      }
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL());
      // document.body.removeChild(canvas)
    };
    img.onerror = function() {
      reject();
    };
  });
};

module.exports = pick;
