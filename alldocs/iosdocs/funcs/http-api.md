---
title: 网络函数
description: EasyClick 自动化脚本 iOS免越狱 网络函数
keywords:
  - EasyClick 自动化脚本 iOS免越狱 网络函数
  - http
  - br
  - GET
  - JSON
  - ipa
  - HTTP
  - 'true'
  - 'false'
  - request
  - downloadFile
  - EasyClick
  - 手机自动化
  - 自动化测试
  - 脚本开发
  - 安卓自动化
  - iOS自动化
  - 鸿蒙Next
---

## 说明

- 网络模块函数主要是跟网络请求信息相关联
- 网络模块的对象前缀是http，例如 http.downloadFile()这样调用

## http.request 万能请求函数

* HTTP万能请求
* @param param map参数，包含的参数有<br/>
    * url:字符串 请求的地址<br/>
    * timeout:整型毫秒，超时时间<br/>
    * method: POST ,GET,PUT 字符串，代表请求的方法<br/>
    * proxy: 代理地址，map参数 包含主机和端口 例如 ```{"host":"11","port":111}```<br/>
    * followRedirects:是否自动跳转 true 或者 false<br/>
    * requestBody: 请求的body体，如果是JSON，就是JSON字符串<br/>
    * userAgent:字符串 HTTP 的UA <br/>
    * ignoreContentType:是否忽略内容类型 true 或者 false <br/>
    * ignoreHttpErrors:是否忽略错误 true 或者 false  <br/>
    * maxBodySize : 整型，HTTP BODY最大值  <br/>
    * referrer:字符串，请求来源  <br/>
    * header:  HTTP 请求头，map参数,例如 ```{"UA":"test"}```
    * cookie: HTTP 请求Cookie，map参数, 例如 ```{"a":1}```
    * data:HTTP POST的数据，map参数, 例如 ```{"a":1}```
    * file:要上传的文件，集合参数，例如
    * ```[{"key":"a1","fileName":"a.txt","filePath":"D:/"},{"key":"a1","fileName":"a.jpg","filePath":"D:/","contentType":"image/jpg"}]```
    - 其中contentType可有可无
        * responseCharset: 字符串，强制设置响应内容的编码集
* @return Response 对象或者null
:::tip
- 如果请求内容是单独字符串,放在requestBody中请求
  :::
```javascript showLineNumbers
function main() {
    http_request();
}

function http_request() {
    //url:string
    //timeout:int ms
    //method: post ,get
    //proxy: {"host":"11","port":111}
    //followRedirects:true false
    //requestBody: string
    //userAgent:string
    //ignoreContentType:true false
    //ignoreHttpErrors:true false
    //maxBodySize : int
    //referrer:string
    //header:{"UA":"test"}
    //cookie:{"a":1}
    //data:{"a":1}
    //file:[{}]
    //responseCharset: string
    let md = utils.dataMd5("12345");
    let md2 = utils.fileMd5("D:/sb.png");
    let url = "http://192.168.0.5:8081/api/request";
    let proxy = {"host": "192.168.0.5", "port": "100"};
    let userAgent = "xxx";
    let followRedirects = false;
    let requestBody = JSON.stringify({"A": 111});
    let ignoreContentType = true;
    let ignoreHttpErrors = true;
    let referrer = "xxx";
    let header = {
        "Content-Type": " application/json;  charset=UTF-8",
        "User-Agent": "from test",
        "ddd": md,
        "dd2": md2,
        "imei": device.getDeviceId()
    };
    let cookie = {
        "cookie1": "tst1",
        "cookie2": "tst2"
    };
    let data = {
        "a1": "aaa",
        "pwd2": md,
        "md2": md2
    };
    let file = [
        {
            "key": "file",
            "fileName": "f.png",
            "filePath": "D:/sb.png"
        },
        {
            "key": "file",
            "fileName": "f2.png",
            "filePath": "D:/sde.png",
            "contentType": "image/png"
        }
    ];
    let params = {
        "url": url,
        "method": "POST",
        "userAgent": userAgent,
        "referrer": "baidu.com",
        "cookie": cookie,
        "data": data,
        "file": file
    };
    let x = http.request(params);
    if (x) {
        logd("header=> " + JSON.stringify(x.header));
        logd("cookie=> " + JSON.stringify(x.cookie));
        logd("statusCode=> " + x.statusCode);
        logd("statusMessage=> " + x.statusMessage);
        logd("charset=> " + x.charset);
        logd("contentType=> " + x.contentType);
        logd("body=> " + x.body);
    } else {
        loge("无结果");
    }
}

main();
```

## http.requestEx 万能请求函数(扩展)

* HTTP万能请求
* @param param map参数，包含的参数有<br/>
    * url:字符串 请求的地址<br/>
    * timeout:整型毫秒，超时时间<br/>
    * method: POST ,GET,PUT 字符串，代表请求的方法<br/>
    * proxy: 代理地址，map参数 包含主机和端口 例如 ```{"host":"11","port":111}```<br/>
    * followRedirects:是否自动跳转 true 或者 false<br/>
    * requestBody: 请求的body体，如果是JSON，就是JSON字符串<br/>
    * userAgent:字符串 HTTP 的UA <br/>
    * ignoreContentType:是否忽略内容类型 true 或者 false <br/>
    * ignoreHttpErrors:是否忽略错误 true 或者 false  <br/>
    * maxBodySize : 整型，HTTP BODY最大值  <br/>
    * referrer:字符串，请求来源  <br/>
    * header:  HTTP 请求头，map参数,例如 ```{"UA":"test"}```
    * cookie: HTTP 请求Cookie，map参数, 例如 ```{"a":1}```
    * data:HTTP POST的数据，map参数, 例如 ```{"a":1}```
    * file:要上传的文件，集合参数，例如
    * ```[{"key":"a1","fileName":"a.txt","filePath":"D:/"},{"key":"a1","fileName":"a.jpg","filePath":"D:/","contentType":"image/jpg"}]```
    - 其中contentType可有可无
        * responseCharset: 字符串，强制设置响应内容的编码集
* @return Response 对象或者null
:::tip
- 如果请求内容是单独字符串,放在requestBody中请求
  :::
```javascript showLineNumbers
function main() {
    http_request();
}

function http_request() {
    //url:string
    //timeout:int ms
    //method: post ,get
    //proxy: {"host":"11","port":111}
    //followRedirects:true false
    //requestBody: string
    //userAgent:string
    //ignoreContentType:true false
    //ignoreHttpErrors:true false
    //maxBodySize : int
    //referrer:string
    //header:{"UA":"test"}
    //cookie:{"a":1}
    //data:{"a":1}
    //file:[{}]
    //responseCharset: string
    let md = utils.dataMd5("12345");
    let md2 = utils.fileMd5("D:/sb.png");
    let url = "http://192.168.0.5:8081/api/request";
    let proxy = {"host": "192.168.0.5", "port": "100"};
    let userAgent = "xxx";
    let followRedirects = false;
    let requestBody = JSON.stringify({"A": 111});
    let ignoreContentType = true;
    let ignoreHttpErrors = true;
    let referrer = "xxx";
    let header = {
        "Content-Type": " application/json;  charset=UTF-8",
        "User-Agent": "from test",
        "ddd": md,
        "dd2": md2,
        "imei": device.getDeviceId()
    };
    let cookie = {
        "cookie1": "tst1",
        "cookie2": "tst2"
    };
    let data = {
        "a1": "aaa",
        "pwd2": md,
        "md2": md2
    };
    let file = [
        {
            "key": "file",
            "fileName": "f.png",
            "filePath": "D:/sb.png"
        },
        {
            "key": "file",
            "fileName": "f2.png",
            "filePath": "D:/sde.png",
            "contentType": "image/png"
        }
    ];
    let params = {
        "url": url,
        "method": "POST",
        "userAgent": userAgent,
        "referrer": "baidu.com",
        "cookie": cookie,
        "data": data,
        "file": file
    };
    let x = http.requestEx(params);
    if (x) {
        logd("header=> " + x.header);
        //直接取值
        logd("header=> " + x.header["Location"]);
        for (let d in x.header) {
            logd("header key " + d + "  " + x.header[d]);
        }
        logd("cookie=> " + x.cookie);
        for (let d in x.cookie) {
            logd("cookie key " + d + "  " + x.cookie[d]);
        }
        logd("cookie=> " + x.cookie["aa"]);
        logd("statusCode=> " + x.statusCode);
        logd("statusMessage=> " + x.statusMessage);
        logd("charset=> " + x.charset);
        logd("contentType=> " + x.contentType);
        logd("body=> " + x.body);
    } else {
        loge("无结果");
    }
}

main();
 ```

## http.downloadFile 下载文件

* 下载远程文件到本地,支持断点续传
* @param remoteUrl 远程文件URL
* @param file 要保存到本地的文件对象
* @param timeout 下载超时，单位是毫秒
* @param headers – 头标志例如```{"a":"11"}```
* @return true 代表成功 false代表失败

```javascript showLineNumbers
function main() {
    let url = "https://imtt.dd.qq.com/16891/apk/DF4FD15AF9A9B51BA74D2710CF738EEF.apk?fsname=com.ishugui_3.9.2.3068_3923068.apk&csr=1bbd";
    let x = http.downloadFile(url, "D:/ss.apk", 10 * 1000, {"User-Agent": "test"});
    logd("download result->     " + x);
}

main();
```

## http.downloadFileDefault 下载文件

* 下载远程文件到本地,支持断点续传，默认超时时间为30秒
* @param remoteUrl 远程文件URL
* @param file 要保存到本地的文件对象
* @param headers – 头标志例如```{"a":"11"}```
* @return true 代表成功 false代表失败

```javascript showLineNumbers
function main() {
    let url = "https://imtt.dd.qq.com/16891/apk/DF4FD15AF9A9B51BA74D2710CF738EEF.apk?fsname=com.ishugui_3.9.2.3068_3923068.apk&csr=1bbd";
    let x = http.downloadFileDefault(url, "D:/ss.apk", {"User-Agent": "test"});
    logd("download result->     " + x);
}

main();
```

## http.httpGetDefault GET请求

* Http GET 请求
* @param url 请求的URL
* @param timeout 超时时间 单位毫秒
* @param headers – 头标志例如```{"a":"11"}```
* @return 字符串 请求后返回的字符串

```javascript showLineNumbers
function main() {
    let url = "http://192.168.0.5:8081/api/httpGet?a=1";
    let x = http.httpGetDefault(url, 10 * 1000, {"User-Agent": "test"});
    logd(" result->     " + x);
    loge("result ->     " + x);
}

main();
```

## http.httpGet GET请求

* Http GET 请求
* @param url 请求的URL
* @param params 参数Map表 例如 ```{"a":"11"}``` 这样的参数或者字符串
* @param timeout 超时时间 单位毫秒
* @param headers – 头标志例如```{"a":"11"}```
* @return 字符串 请求后返回的字符串

```javascript showLineNumbers
function main() {
    let url = "http://192.168.0.5:8081/api/httpGet?a=1";
    let pa = {"b": "22"};
    let x = http.httpGet(url, pa, 10 * 1000, {"User-Agent": "test"});
    logd(" result->     " + x);
    loge("result ->     " + x);
}

main();
```

## http.httpPost POST请求

* Http Post 请求
* @param url 请求的URL
* @param params 参数，例如 ```{"a":"11"}``` 这样的参数或者字符串
* @param files 要上传的文件，例如 ```{"file1":"D:/1.png"}``` 这样的文件参数
* @param timeout 超时时间 单位毫秒
* @param headers – 头标志例如```{"a":"11"}```
* @return 字符串 请求后返回的字符串

```javascript showLineNumbers
function main() {
    //不带文件的请求
    let url = "http://192.168.0.5:8081/api/httpPost";
    let pa = {"b": "我是b的值"};
    let x = http.httpPost(url, pa, null, 10 * 1000, {"User-Agent": "test"});
    logd(" result->     " + x);
    loge("result ->     " + x);
}

main();
```

```javascript showLineNumbers
function main() {
    //带上传文件的请求
    let url = "http://192.168.0.5:8081/api/httpPost";
    let pa = {"b": "我是b的值"};
    let files = {"file1": "D:/p.json", "file2": "D:/z.xml"};
    let x = http.httpPost(url, pa, files, 10 * 1000, {"User-Agent": "test"});
    logd(" result->     " + x);
    loge("result ->     " + x);
}

main();
```

## http.postJSON 发送JSON

* HTTP POST JSON数据
* @param url 请求的URL
* @param json json数据
* @param timeout – 超时时间 单位毫秒
* @param headers – 头标志例如```{"a":"11"}```
* @return 字符串 请求后返回的字符串

```javascript showLineNumbers
function main() {
    let url = "http://192.168.0.5:8081/api/postJSON";
    let pa = {"b": "我是b的值"};
    let x = http.postJSON(url, pa, 10 * 1000, {"User-Agent": "test"});
    logd(" result->     " + x);
    loge("result ->     " + x);
}

main();
```



## http.agentHttpGetString 代理ipa的GET请求

* 使用代理ipa请求http get请求，目前仅限于请求 127.0.0.1这样本机，因为不能请求外网
* 适合改机软件的请求
* 支持版本 EC USB 7.21.0+
* @param url 地址 url
* @param timeout 超时时间 单位是毫秒 例如10000
* @return `{string}` 返回请求到的结果字符串

```javascript showLineNumbers
function main() {
    let url = "http://127.0.0.1:8081/api/httpGet?a=1";
    let x = http.agentHttpGetString(url, 10 * 1000);
    logd(" result->     " + x);
    loge("result ->     " + x);
}

main();
```


## http.agentHttpPostJson 代理ipa发送JSON

* 使用代理ipa请求http 发送json，目前仅限于请求 127.0.0.1这样本机，因为不能请求外网
* 适合改机软件的请求
* 支持版本 EC USB 7.21.0+
* @param url 地址 url
* @param timeout 超时时间 单位是毫秒 例如10000
* @param dataMap js的map数据 例如 `{"a":1}`
* @return `{string}` 返回请求到的结果字符串

```javascript showLineNumbers
function main() {
    let url = "http://127.0.0.1:8081/api/postJSON";
    let pa = {"b": "我是b的值"};
    let x = http.agentHttpPostJson(url, 10 * 1000, pa);
    logd(" result->     " + x);
    loge("result ->     " + x);
}

main();
```

## http.agentRequestEx 代理ipa请求HTTP

* 使用代理ipa请求http ，目前仅限于请求 127.0.0.1这样本机，因为不能请求外网
* 适合改机软件的请求
* 支持版本 EC USB 8.16.0+
* @param dataMap js的map数据 转发的数据 请看http.request的param参数表，除了不能上传文件，其他和http.request的param保持一致
* @return `{null|Response1}` 返回的结果

```javascript showLineNumbers
function main() {
  let requestBody2 = JSON.stringify({"A": 111});
  let cookie2 = {
    "ck": "tst1",
    "cookie2": "tst2"
  };

  let data2 = {
    "method":"POST",
    "url":"http://127.0.0.1:18924",
    "cookie":cookie2,
    "requestBody":requestBody2
  }

  let da2 = http.agentRequestEx(data2)

  logd(JSON.stringify(da2))
  logd("cookie2 "+JSON.stringify(da2["cookie"]))
  logd("header2 "+JSON.stringify(da2["header"]))
  logd("contentType2 "+da2["contentType"])
  logd("statusCode2 "+da2["statusCode"])
  logd("body2 "+da2["body"])

}

main();
```



## http.agentForwardRequest 代理ipa转发HTTP

* 使用代理ipa转发http请求
* 这个方法是从usb请求到代理ipa，然后再请求到主程序，再到外网地址，多次转发出去的
* 配合文件传输助手或者脱机版本主程序使用，例如获取手机的外网IP等
* 手机需要安装传输助手或者脱机版本主程序
* 支持版本 EC USB 8.16.0+
* @param url 地址 url，脱机版本主程序的请求转发地址  http://127.0.0.1:18924/devapi/requestEx
* @param timeout 超时时间 单位是毫秒 例如10000
* @param dataMap js的map数据 转发的数据 请看http.request的param参数表，除了不能上传文件，其他和http.request的param保持一致
* @return `{null|Response1}` 返回的结果

```javascript showLineNumbers
function main() {
  let url = "http://127.0.0.1:18924/devapi/requestEx"
  let requestBody = JSON.stringify({"A": 111});
  let cookie = {
    "ck": "tst1",
    "cookie2": "tst2"
  };

  let data = {
    "method":"POST",
    "url":"http://baidu3.com?"+new Date(),
    "cookie":cookie,
    "requestBody":requestBody
  }

  let da = http.agentForwardRequest(url,2000,data)

  logd(JSON.stringify(da))
  logd("cookie "+JSON.stringify(da["cookie"]))
  logd("header "+JSON.stringify(da["header"]))
  logd("contentType "+da["contentType"])
  logd("statusCode "+da["statusCode"])
  logd("body "+da["body"])

}

main();
```


## http.newWebsocket websocket通信

* 创建一个websocket
* @param url 要连接的地址
* @param header 参数头
* @param type 类库类型，1 = okhttp3, 2 = javawebsocket
* @return ```{@link WebSocket }``` WebSocket对象

```javascript showLineNumbers
function main() {
    let result = [];
    //新建一个ws连接
    let ws = http.newWebsocket("ws://192.168.1.76:8081/websocket/device/call?deviceNo=111", null, 2);
    // 设置type=1的时候链接参数
    ws.setCallTimeout(5);
    ws.setReadTimeout(5);
    ws.setWriteTimeout(5);
    //心跳检测 建议设置为0 因为有的服务端没有ping
    ws.setPingInterval(0)

    //设置type=2的时候心跳检测时间
    ws.setConnectionLostTimeout(5)
    //设置连接打开的时候监听器
    ws.onOpen(function (ws1, code, msg) {
        logi("onOpen code " + code + "  msg:" + msg);
    })
    //设置有文本信息监听器
    ws.onText(function (ws1, text) {
        logi(" onText " + text);
    })
    //设置关闭时候的监听器
    ws.onClose(function (ws1, code, reason) {
        logi(" onClose  " + code + "  reason : " + reason + " remote:");
    })
    ws.onError(function (ws1, msg) {
        logi(" onError  " + msg);
        result[0] = "error";
    })
    // bytes 是 java的bytes数组 对象
    ws.onBinary(function (ws1, bytes) {
        //转成java的
        logi(" onBinary  " + new java.lang.String(bytes));
    })

    //开始连接   阻塞的
    let r = ws.connect(10000);
    //设置自动重连
    ws.setAutoReconnect(true);
    logd("connect {} rr = {}", result[0], r);

    while (true) {
        logd("isconnect " + ws.isConnected());
        sleep(1000)
        if (ws.isConnected()) {
            b = ws.sendText("new Date-> " + new Date())
            logd("send => " + b);
            sleep(1000)
            // java的字符串转字节
            ws.sendBinary(new java.lang.String("test").getBytes());
        } else {
            //重置链接
            //                let reset = ws.reset();
            //                logd("reset {}",reset)
            //                if (reset) {
            //                    logd("开始重连...");
            //                    let rc = ws.connect(10000);
            //                    logd("重连--> "+rc);
            //                }
        }
    }
    logd("isClosed " + ws.isClosed())
    sleep(1000)
    //关闭连接
    ws.close();
}

main();
```

### WebSocket 对象函数

#### connect 同步连接

* 开始异步连接
* 详细代码看[例子](/zh-cn/funcs/http-api.md#httpnewwebsocket-websocket通信)

#### reset 重置连接

* 重置连接
* @return `{bool}` true 代表成功 false代表失败
* 详细代码看[例子](/zh-cn/funcs/http-api.md#httpnewwebsocket-websocket通信)

#### isClosed 是否关闭

* 是否已经关闭
* @return true 代表已经关闭，false 未关闭
* 详细代码看[例子](/zh-cn/funcs/http-api.md#httpnewwebsocket-websocket通信)

#### isConnected 是否连接

* 是否已经连接了
* @return true 代表已经连接，false 未关闭
* 详细代码看[例子](/zh-cn/funcs/http-api.md#httpnewwebsocket-websocket通信)

#### close 关闭

* 关闭链接
* 详细代码看[例子](/zh-cn/funcs/http-api.md#httpnewwebsocket-websocket通信)

#### sendText 发送文本

* 发送文本消息
* @param text 文本信息
* 详细代码看[例子](/zh-cn/funcs/http-api.md#httpnewwebsocket-websocket通信)

#### sendBinary 发送字节

* 发送字节信息
* @param bin java byte 数组对象
* 详细代码看[例子](/zh-cn/funcs/http-api.md#httpnewwebsocket-websocket通信)

#### onOpen 打开回调

* 当连接打开的时候事件回调
* @param callback 回调函数
* 详细代码看[例子](/zh-cn/funcs/http-api.md#httpnewwebsocket-websocket通信)

#### onText 文件回调

* 当有文本信息发送过来的时候回调
* @param callback 回调函数
* 详细代码看[例子](/zh-cn/funcs/http-api.md#httpnewwebsocket-websocket通信)

#### onClose 关闭回调

* 当关闭的时候回调
* @param callback 回调函数
* 详细代码看[例子](/zh-cn/funcs/http-api.md#httpnewwebsocket-websocket通信)

#### onError 错误回调

* 当发生错误的时候回调
* @param callback 回调函数
* 详细代码看[例子](/zh-cn/funcs/http-api.md#httpnewwebsocket-websocket通信)

#### onBinary 二进制消息回调

* 当有二进制数据过来的时候回调
* @param callback 回调函数
* 详细代码看[例子](/zh-cn/funcs/http-api.md#httpnewwebsocket-websocket通信)

#### setReadTimeout 设置读数据超时时间

* 在创建websocket链接类型=1的时候使用
* 设置读数据超时时间
* @param timeout 单位是秒
* 详细代码看[例子](/zh-cn/funcs/http-api.md#httpnewwebsocket-websocket通信)

#### setWriteTimeout 设置写数据超时时间

* 在创建websocket链接类型=1的时候使用
* 设置写数据超时时间
* @param timeout 单位是秒
* 详细代码看[例子](/zh-cn/funcs/http-api.md#httpnewwebsocket-websocket通信)

*

#### setPingInterval 设置心跳超时时间

* 在创建websocket链接类型=1的时候使用
* 设置心跳超时时间
* @param timeout 单位是秒
* 详细代码看[例子](/zh-cn/funcs/http-api.md#httpnewwebsocket-websocket通信)

#### setConnectionLostTimeout 设置心跳超时时间

* 在创建websocket链接类型=2的时候使用
* 设置心跳超时时间
* @param timeout 单位是秒
* 详细代码看[例子](/zh-cn/funcs/http-api.md#httpnewwebsocket-websocket通信)

#### setAutoReconnect 设置自动重连

* 设置自动重连
* 详细代码看[例子](/zh-cn/funcs/http-api.md#httpnewwebsocket-websocket通信)

