import Stream from './stream.js';

const BASE_URL = '';

var api = {};

api.upload = function(file, url, progress) {
  return new Promise(function(resolve, reject) {
    new Stream({
      url: BASE_URL + (url || '/file/upload'),
      headers: {
        'X-AUTH-TOKEN': '',
      },
      progress: e => {
        if (progress) progress(e.percent * 100);
      },
      success: (file, data) => {
        resolve(Object.assign(file, data));
      },
      retry: e => {
        if (!e) return false;
        if (e.code == 23) return false;
        if (e.code == 233) return true; // 网络错误，启动重传
        // if(e.code==33){// 中断上传
        //     reject(e) //继续上传函数,e.data()可继续上传
        // }
        // if (e.code==1) {
        reject(e);
        // }
      },
    }).upload(file);
  });
};

module.exports = api;
