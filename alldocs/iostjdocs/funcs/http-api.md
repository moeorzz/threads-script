---
title: 网络函数
description: EasyClick 自动化脚本 iOS免越狱 网络函数
keywords:
  - EasyClick 自动化脚本 iOS免越狱 网络函数
  - http
  - br
  - JSON
  - 'true'
  - 'false'
  - request
  - downloadFile
  - GET
  - POST
  - HTTP
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
      * 如果使用application/x-www-form-urlencoded的content-type,参数是使用&分割的 可以将requestBody设置为请求参数例如 a=1&b=2,也可以升级最新版本，使用data参数传输map参数
      * 如果不设置content-type，method=POST或者PUT，content-type是multipart/form-data
    * cookie: HTTP 请求Cookie，map参数, 例如 ```{"a":1}```
    * data:HTTP POST的数据，map参数, 例如 ```{"a":1}```
    * file:要上传的文件，例如
    * ```{"file1":"a1.png","file2":"a2.png"}```
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
    //file:{}
    //responseCharset: string
    let md = utils.dataMd5("12345");
    let md2 = utils.fileMd5(file.getSandBoxFilePath("a.txt"));
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
    let file =
        {
            "file1": "a.png",
            "file2": "f.png"
        }
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
        logd("statusCode=" + x.statusCode);
        logd("statusMessage=" + x.statusMessage);
        logd("charset=" + x.charset);
        logd("contentType=" + x.contentType);
        logd("body=" + x.body);
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
    * file:要上传的文件，例如
    * ```{"file1":"a1.png","file2":"a2.png"}```
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
    //file:{}
    //responseCharset: string
    let md = utils.dataMd5("12345");
    let md2 = utils.fileMd5(file.getSandBoxFilePath("a.txt"));
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
    let file = {
        "file1": "a.png",
        "file2": "b.png"
    }
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
        logd("header=" + x.header);
        //直接取值
        logd("header=" + x.header["Location"]);
        for (let d in x.header) {
            logd("header key " + d + "  " + x.header[d]);
        }
        logd("cookie=" + x.cookie);
        for (let d in x.cookie) {
            logd("cookie key " + d + "  " + x.cookie[d]);
        }
        logd("cookie=" + x.cookie["aa"]);
        logd("statusCode=" + x.statusCode);
        logd("statusMessage=" + x.statusMessage);
        logd("charset=" + x.charset);
        logd("contentType=" + x.contentType);
        logd("body=" + x.body);
    } else {
        loge("无结果");
    }
}

main();
```

## http.downloadFile 下载文件

* 下载远程文件到本地,不支持断点续传
* @param remoteUrl 远程文件URL
* @param file 要保存到本地的文件对象
* @param timeout 下载超时，单位是毫秒
* @param headers – 头标志例如  ```{"a":1}```
* @return true 代表成功 false代表失败

```javascript showLineNumbers
function main() {
    let url = "https://imtt.dd.qq.com/16891/apk/DF4FD15AF9A9B51BA74D2710CF738EEF.apk?fsname=com.ishugui_3.9.2.3068_3923068.apk&csr=1bbd";
    let x = http.downloadFile(url, file.getSandBoxFilePath("a.apk"), 10 * 1000, {"User-Agent": "test"});
    logd("download result-    " + x);
}

main();
```

## http.downloadFile2 断点续传下载文件

* 下载远程文件到本地，支持断点续传
* 适配EC iOS脱机版本3.2.0+
* @param remoteUrl 远程文件URL
* @param file 要保存到本地的文件对象
* @param timeout 下载超时，单位是毫秒
* @param headers – 头标志例如 ```{"a":"11"}```
* @return true 代表成功 false代表失败

```javascript showLineNumbers
function main() {
    for (let i = 0; i < 10; i++) {
        let url = "http://192.168.2.19/1.mp4";
        let f = file.getSandBoxFilePath("1.mp4")
        logd("download filepath: {}", f)
        logd("file.exists() " + file.exists(f));
        // 如果删除了文件 就会从头开始下载 不会断点续传了
        //file.deleteAllFile(f)
        let x = http.downloadFile2(url, f, 10 * 1000, {"User-Agent": "test"});
        logd("download result-    " + x);
        if (x) {
            let save = utils.saveVideoToAlbumPath(f)
            logd("save " + save)
            break
        }

    }
}

main();
```

## http.httpGet GET请求

* Http GET 请求
* @param url 请求的URL
* @param params 参数Map表 例如 ```{"a":"11"}``` 这样的参数或者字符串
* @param timeout 超时时间 单位毫秒
* @param headers – 头标志例如 ```{"a":"11"}```
* @return 字符串 请求后返回的字符串

```javascript showLineNumbers
function main() {
    let url = "http://192.168.0.5:8081/api/httpGet?a=1";
    let pa = {"b": "22"};
    let x = http.httpGet(url, pa, 10 * 1000, {"User-Agent": "test"});
    logd(" result-    " + x);

}

main();
```

## http.httpPost POST请求

* Http Post 请求
* @param url 请求的URL
* @param params 参数，例如 ```{"a":"11"}``` 这样的参数或者字符串
* @param files 要上传的文件，例如 ```{"file1":file.getSandBoxFilePath("a.txt")}``` 这样的文件参数
* @param timeout 超时时间 单位毫秒
* @param headers – 头标志例如 ```{"a":"11"}```
* @return 字符串 请求后返回的字符串

```javascript showLineNumbers
function main() {
    //不带文件的请求
    let url = "http://192.168.0.5:8081/api/httpPost";
    let pa = {"b": "我是b的值"};
    let x = http.httpPost(url, pa, null, 10 * 1000, {"User-Agent": "test"});
    logd(" result-    " + x);

}

main();
```

```javascript showLineNumbers
function main() {
    //带上传文件的请求
    let url = "http://192.168.0.5:8081/api/httpPost";
    let pa = {"b": "我是b的值"};
    let files = {"file1": file.getSandBoxFilePath("a.txt"), "file2": file.getSandBoxFilePath("b.txt")};
    let x = http.httpPost(url, pa, files, 10 * 1000, {"User-Agent": "test"});
    logd(" result-    " + x);

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
    logd(" result-    " + x);
    loge("result -    " + x);
}

main();
```




## http.getLanIp 获取局域网IP

* 获取局域网的IP，包含IPV4和IPV6
* 适配EC 4.6.0+
* @returns `{JSON String}`

```javascript showLineNumbers
function main() {
    let x = http.getLanIp();
    logd(" result-    " + x);

}

main();
```

## http.newWebsocket websocket通信

* 创建一个websocket
* @param url 要连接的地址
* @param header 参数头
* @return ```{@link WebSocket }``` WebSocket对象

```javascript showLineNumbers
function testwebsocket() {
    let result = [];
    //新建一个ws连接,不要填127.0.0.1或localhost,脚本在手机上,127是手机ip,不是电脑
    let ws = http.newWebsocket("ws://192.168.2.13:8120/api/ws/device?deviceId=111", {"t1": "100"});
    ws.setWriteTimeout(5);
    //心跳检测 建议设置为5 
    ws.setPingInterval(5)
    ws.setConnectionTimeout(5)
    //设置连接打开的时候监听器
    ws.onOpen(function (ws1) {
        logi("onOpen  ");
    })
    //设置有文本信息监听器
    ws.onText(function (ws1, text) {
        logi(" onText " + text);
    })
    //设置关闭时候的监听器
    ws.onClose(function (ws1, reason) {
        logi(" onClose  " + "  reason : " + reason);
    })
    ws.onError(function (ws1, msg) {
        logi(" onError  " + msg);
        result[0] = "error";
    })
    ws.onBinary(function (ws1, bytes) {
        logi(" onBinary  " + (bytes));
    })

    //开始连接
    let r = ws.connect();
    //设置自动重连
    ws.setAutoReconnect(true);
    logd("connect {} rr = {}", result[0], r);
    // 设置自定义心跳数据，发送时间是5秒一次
    ws.startHeartbeatInterval(5, function () {
        return "我是心跳数据"
    })
    // 停止心跳
    //ws.stopHeartbeatInterval()

    while (true) {
        if (isScriptExit()) {
            return
        }
        logd("isconnect " + ws.isConnected());
        sleep(1000)
        if (ws.isConnected()) {
            b = ws.sendText("new Date-> " + new Date())
            logd("send => " + b);
            sleep(1000)
        } else {
            //重置链接
            let reset = ws.reset();
            logd("reset {}", reset)
            if (reset) {
                logd("开始重连...");
                let rc = ws.connect();
                logd("重连--> " + rc);
            }
        }
    }
    logd("isClosed " + ws.isClosed())
    sleep(1000)
    //关闭连接
    ws.close();
}

testwebsocket()

```
:::tip
- websocket链接最好用子线程，接收的数据放到共享存储区，需要5.20.0+版本
- 通过共享存储读写，做到JSVM互不干扰
- 下面是例子
:::
```javascript showLineNumbers
// js/websocket.js 文件内容
function testwebsocket() {
  let result = [];
  //新建一个ws连接,不要填127.0.0.1或localhost,脚本在手机上,127是手机ip,不是电脑
  let ws = http.newWebsocket("ws://192.168.2.12:8199/wstest?deviceId=111", {"t1": "100"});
  ws.setWriteTimeout(5);
  //心跳检测 建议设置为5
  ws.setPingInterval(5)
  ws.setConnectionTimeout(5)
  //设置连接打开的时候监听器
  ws.onOpen(function (ws1) {
    logi("onOpen  ");
  })
  //设置有文本信息监听器
  ws.onText(function (ws1, text) {
    logi(" onText " + text);
    thread.putShareValue(text)
  })
  //设置关闭时候的监听器
  ws.onClose(function (ws1, reason) {
    logi(" onClose  " + "  reason : " + reason);
  })
  ws.onError(function (ws1, msg) {
    logi(" onError  " + msg);
    result[0] = "error";
  })
  ws.onBinary(function (ws1, bytes) {
    logi(" onBinary  " + (bytes));
  })

  //开始连接
  let r = ws.connect();
  //设置自动重连
  ws.setAutoReconnect(true);
  logd("connect {} rr = {}", result[0], r);
  // 设置自定义心跳数据，发送时间是5秒一次
  ws.startHeartbeatInterval(5, function () {
    return "我是心跳数据"
  })
  // 停止心跳
  //ws.stopHeartbeatInterval()

  while (true) {
    if (isScriptExit()) {
      return
    }
    logd("isconnect " + ws.isConnected());
    sleep(1000)
    if (ws.isConnected()) {
      b = ws.sendText("new Date-> " + new Date())
      logd("send => " + b);
      sleep(1000)
    } else {
      //重置链接
      let reset = ws.reset();
      logd("reset {}", reset)
      if (reset) {
        logd("开始重连...");
        let rc = ws.connect();
        logd("重连--> " + rc);
      }
    }
  }
  logd("isClosed " + ws.isClosed())
  sleep(1000)
  //关闭连接
  ws.close();
}

```

```javascript showLineNumbers
// js/main.js 文件内容
// 执行子线程开启websocket，主线程读取数据 

function threadTest() {

  // 子线程无法访问外部的变量，
  // 最好的方式 是 在一个js文件中写好业务逻辑，在线程中 直接调用，所有操作都在写得好的js文件中完成
  let name = "thread2";
  let th = thread.newThread(name)
  //异步执行
  th.execAsync(function () {
    var testData = readIECFileAsString("js/websocket.js");
    // testwebsocket 是 websocket.js 文件中定义的 ，加上执行函数
    testData = (testData+" ;testwebsocket();")
    // 开始执行
    let dx = execScript(2, testData);
  });

  while (!isScriptExit()) {
    sleep(100)
    // 从 kv 共享区取值
    let kvValue = thread.getShareKeyValue("currentTime")
    if (kvValue != "") {
      logd("获取当前时间: currentTime " + kvValue)
    }
    // 从数组共享区取值
    let arValue = thread.getShareValue()
    if (arValue != "") {
      logd("获取到之后 执行动作 模拟主线程执行任务。。。 arValue = " + arValue)
      sleep(1000)
      logd("任务结束，重新获取指令")
    }
  }

}

threadTest();

```


### WebSocket 对象函数

#### connect 开始异步连接

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
* @param bin swift data对象
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

#### setConnectionTimeout 设置链接超时时间

* 设置链接超时时间,在创建websocket链接时候使用
* @param timeout 单位是秒
* 详细代码看[例子](/zh-cn/funcs/http-api.md#httpnewwebsocket-websocket通信)

#### setWriteTimeout 设置写数据超时时间

* 设置写数据超时时间
* @param timeout 单位是秒
* 详细代码看[例子](/zh-cn/funcs/http-api.md#httpnewwebsocket-websocket通信)

*

#### setPingInterval 设置心跳超时时间

* 设置心跳超时时间,暂时无用
* @param timeout 单位是秒
* 详细代码看[例子](/zh-cn/funcs/http-api.md#httpnewwebsocket-websocket通信)

#### startHeartbeatInterval 开始心跳指令

* 链接成功后会发送固定的心跳指令
* @param timeInterval 时间周期 单位是秒，
* @param callback 回调函数，提供心跳数据的函数
* 详细代码看[例子](/zh-cn/funcs/http-api.md#httpnewwebsocket-websocket通信)

#### stopHeartbeatInterval 停止心跳计时器

* 停止固定的心跳计时器
* 详细代码看[例子](/zh-cn/funcs/http-api.md#httpnewwebsocket-websocket通信)

#### setAutoReconnect 设置自动重连

* 设置自动重连
* 详细代码看[例子](/zh-cn/funcs/http-api.md#httpnewwebsocket-websocket通信)http-api

