//封装http 请求
export const fetchHttp = (url, params, type, showError) => {
  //处理请求参数
  let postUrl = ''
  if (url.includes('http://') || url.includes('https://')) {
    postUrl = url;
  } else {
    postUrl = 'http://ccfmty.com/' + url;
  }

  let loginUrl = url.includes('/manage/') ? 'adminLogin' : 'login';
  let postData = {
    method: type || 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'user-agent': navigator.userAgent,
      'content-type': 'application/json',
      'Accept': '*/*',
      'token': getCookie('FMTY_TOKEN')
    }
  };
  //判断post和get请求不同，参数传递方式不一样
  if (type === 'POST') {
    postData.body = JSON.stringify(params)
  } else if (type === 'GET') {
    let getPostData = objToUrl(params)
    postUrl = postUrl + '?' + getPostData
  }

  return window.fetch(postUrl, postData)
    .then(function (response) {
      return response.json();
    })
    .then(function (res) {
      // debugger;
      //未登录
      if (res.code === 0) {
        return res
      } else if (res.code === 300003 || res.code === 300000 || res.code === 300002) {
        alert('登录失效，请您去登录！')
        setTimeout(() => {
          window.location.href = loginUrl + '?redirect_url=' + encodeURIComponent(window.location.href);
        }, 2500)
      } else {
        if (!showError) {
          return res
        } else {
          return res
        }
      }
    }).catch(() => {
      alert('服务器无响应！')
    });
}

//格式化时间
export const formatTime = (time) => {
  let str = '';
  if (time) {
    let timeStr = time.split('T');
    str = timeStr && timeStr.length > 0 ? timeStr[0] : ''
  } else {
    str = '--'
  }
  return str;
}

//下载图片
export const downloadIamge = (imgsrc, name) => {
  let image = new Image();
  image.setAttribute('crossOrigin', 'anonymous');
  image.onload = function () {
    let canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    let context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, image.width, image.height);
    let url = canvas.toDataURL('image/png'); //得到图片的base64编码数据
    let a = document.createElement('a'); // 生成一个a元素
    let event = new MouseEvent('click'); // 创建一个单击事件
    a.download = name || 'photo'; // 设置图片名称
    a.href = url; // 将生成的URL设置为a.href属性
    a.dispatchEvent(event); // 触发a的单击事件
  };
  image.src = imgsrc;
}

//判断对象是否为空
export const isEmptyObject = (obj) => {
  for (const n in obj) { return false }
  return true
}

//参数转字符
export const queryStringify = (query) => {
  const queryString = Object.keys(query).map(
    key => `${key}=${encodeURIComponent(query[key] || '')}`
  ).join('&')
  return queryString
}

//合并对象
export const mergeObj = (des, src, override) => {
  if (src instanceof Array) {
    for (let i = 0, len = src.length; i < len; i++) { mergeObj(des, src[i], override) }
  }
  for (const i in src) {
    if (override || !(i in des)) {
      des[i] = src[i]
    }
  }
  return des
}

//去空格
export const trim = (str, is_global) => {
  let result
  result = str.replace(/(^\s+)|(\s+$)/g, '')
  if (is_global && is_global.toLowerCase() === 'g') {
    result = result.replace(/\s/g, '')
  }
  return result
}

//object转化成url拼接样式
export const objToUrl = obj => {
  let arr = [];
  for (let i in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, i)) {
      arr.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
    }
  }
  return arr.join("&");
}

//url转化成object拼接样式
export const urlToObj = url => {
  let string = url.split('&');
  let res = {};
  for (let i = 0; i < string.length; i++) {
    let str = string[i].split('=');
    if (str[0] !== '') {
      res[str[0]] = str[1];
    }
  }
  return res;
}

//获取链接上的参数
export const getQueryString = (name, url = window.location.search) => {
  if (!name) { return '' }
  url = url.split('#')[0];
  const reg = new RegExp('(^|\\?|&)' + name + '=([^&]*)(&|$)', 'i');
  const matches = url.match(reg);
  if (matches) {
    return decodeURIComponent(matches[2]);
  }
  return reg.test(url) ? RegExp.$2.replace(/\+/g, ' ') : '';
}

//设置链接上的参数
export const setQueryString = (uri, key, value) => {
  const re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
  const separator = uri.indexOf('?') !== -1 ? '&' : '?';
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + '=' + value + '$2');
  } else {
    return uri + separator + key + '=' + value;
  }
}

//设置参数对象
// export const setQueryObj = (query, url) => {
//   let setUrl = url || window.location.href
//   Object.keys(query).map((key) => {
//     setUrl = setQueryString(setUrl, key, query[key])
//   })
//   window.history.pushState({}, {}, setUrl)
// }

//设置参数对象
export const setQueryObj = (query, url) => {
  let setUrl = url || window.location.href
  Object.keys(query).map((key) => {
    setUrl = setQueryString(setUrl, key, query[key])
  })
  window.history.pushState({}, {}, setUrl)
}

//获取字符的长度
// export const getStringLen = (str) => {
//   let byteLen = 0
//   for (let i = 0; i < str.length; i++) {
//     const c = str.charAt(i)
//     if (/[\u4e00-\u9fa5]/.test(c) || /[^\x00-\xff]/.test(c)) {
//       byteLen += 2
//     } else {
//       byteLen += 1
//     }
//   }
//   return byteLen
// }

export const setCookie = (name, value, options = {}) => {
  if (value === null || typeof value === 'undefined') {
    value = '';
    options.expires = -1;
  }
  let expires = '';
  if (options.expires && (typeof options.expires === 'number' || options.expires.toUTCString)) {
    let date = new Date();
    let times = date.getTime() + 86400000;
    if (options.expires.getTime && options.expires.getTime() < times) {
      times = options.expires.getTime();
    } else if (options.expires === -1) {
      //清除cookie
      times = date.getTime() + options.expires * 86400000;
    }
    date.setTime(times);
    expires = '; expires=' + date;
  }
  let path = options.path ? '; path=' + (options.path) : '';
  let secure = options.secure ? '; secure' : '';
  let domain = '';
  //用户只能设置二级域名
  if (options.domain && options.domain.toString().split('.').length >= 3) {
    domain = '; domain=' + (options.domain);
  } else {
    domain = '; domain=' + document.domain.toString();
  }
  document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
}

export const getCookie = (name) => {
  const arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
  if (arr !== null) { return decodeURIComponent(arr[2]) }
  return '';
}

export const removeCookie = (name, options) => {
  options = options || {};
  options.expires = -1;
  setCookie(name, null, options);
}

