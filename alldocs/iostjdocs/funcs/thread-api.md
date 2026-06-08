---
title: 线程函数
description: EasyClick 自动化脚本 iOS免越狱  线程函数 资源下载
keywords:
  - EasyClick 自动化脚本 iOS免越狱 线程函数 资源下载
  - js
  - thread
  - ThreadClient
  - JS
  - thread1
  - execAsyncFile
  - iOS
  - jsvm
  - worker
  - src
  - EasyClick
  - 手机自动化
  - 自动化测试
  - 脚本开发
  - 安卓自动化
  - iOS自动化
  - 鸿蒙Next
---

## 说明
:::tip
  - iOS的js引擎天生是单线程模式，无法实现多线程。这里的thread底层实现是多jsvm虚拟机模式
  - 多jsvm代表这启动多个不同的js虚拟机，在iOS进程中运行，相互之间进程数据是隔离的。
  - 这里的线程是worker模块的简化版，可以直接执行代码片段的，比worker模块简单好用
  - 该模块从EC 脱机版本5.0.0+开始适配
:::



## ThreadClient.execAsyncFile 线程执行JS文件
* 线程执行js文件,只能执行iec文件中的js文件
* 可以在工程的src目录下新建 thread1/sub.js文件，thread1和js目录平级，使用的时候path传递的值就是 thread1/sub.js
* 子线程不会自动加载其他js文件，所以引用类库的时候，请使用 require函数，例如
* let lib2 = require("work1/lib1.js")
* logd(lib2.add(1, 2))
* 上面代码是引用 src 文件夹，work1文件夹下的lib1.js文件
* @param path 就是文件路径,例如 thread1/sub.js
* @returns `{ThreadClient}`

```javascript showLineNumbers
function main() {
    let name = "thread2";
    let th = thread.newThread(name)
    // 增加回调，可以不写
    th.addCallback("f1", function (name, data) {
        logd("callback " + data)
        return "ok"
    });
    th.execAsyncFile("thread1/sub.js");
    while (!isScriptExit()) {
        logd("main " + new Date())
        sleep(1000)
    }
}

main();
```



## ThreadClient.execAsyncStr 线程执行JS字符串
* 开启异步线程执行js代码字符串
* 这个没有行号的，因为是动态的js代码
* @param funcStr 代码字符串
* @returns `{ThreadClient}`

```javascript showLineNumbers
function main() {
    let name = "thread2";
    let th = thread.newThread(name)
    th.execAsyncStr("logd('123');");
    while (!isScriptExit()) {
        logd("main " + new Date())
        sleep(1000)
    }
}

main();
```


## thread.execCodeAsync 异步执行代码块

* 异步执行代码块
* 这个是封装好的，直接使用即可
* @param name 线程名称
* @param func 代码块
* @param callbackName 回调的函数名称
* @param callbackFunc 回调 函数
* @return `{string}` 返回的线程名称

```javascript showLineNumbers
function main() {
  // 子线程无法访问外部的变量，
  // 最好的方式 是 在一个js文件中写好业务逻辑，在线程中 直接调用，所有操作都在写得好的js文件中完成
  thread.execCodeAsync("thread1", function () {
    while (!isScriptExit()) {
      sleep(1000)
      logd("sub thread " + new Date())
      var url = "http://baidu.com";
      var pa = {"b": "22"};
      var x = http.httpGet(url, pa, 10 * 1000, {"User-Agent": "test"});
      logd(" result-    " + x);
      // 调用f1函数
      let backdata = thread.invokeCallback("f1", "百度的数据:" + x)
      logd("backdata " + backdata)
    }
  }, "f1", function (name, data) {
    logd("callback " + data)
    return "ok->"
  })
  let timex = 0
  while (!isScriptExit()) {
    logd("main " + new Date())
    sleep(1000)
    timex = timex + 1000
    if (timex > 8000) {
      break
    }
  }
  // 5秒后结束线程
  thread.cancelThread("thread1")
  thread.stopAll();
  sleep(1000)
  logd("thread1 cancel " + thread.isCancelled("thread1"))
  // 或者使用cancelThread
  // thread.cancelThread("thread1")
}

main();
```






## thread.invokeCallback 调用回调函数

* 调用 addCallback 设置的函数 ，通过funcName先找到，然后进行调用
* @param funcName 回调函数名称
* @param data 回调数据
* @return `{*}` 函数返回的数据

```javascript showLineNumbers
function main() {
    // 请看 thread.execCodeAsync 函数例子
}

main();
```


## thread.newThread 新的线程

* 创建一个新的线程封装类
* @param name 线程名称，不填写会自动生成随机数
* @return `{ThreadClient|null}`

```javascript showLineNumbers
function main() {
  let name = "thread2";
  let th = thread.newThread(name)
  // 增加回调，可以不写
  th.addCallback("f1", function (name, data) {
    logd("callback " + data)
    return "ok"
  });
  //异步执行
  th.execAsync(function () {
    var url = "http://baidu.com";
    var pa = { "b": "22" };
    var x = http.httpGet(url, pa, 10 * 1000, { "User-Agent": "test" });
    
    let backdata = thread.invokeCallback("f1",x)
    logd("backdata "+backdata)
    
  });
  sleep(5000);
  logd("结束 ");
}

main();
```
### addCallback 增加回调函数
- 在线程对象上, 增加回调函数
- @param name 函数名
- @param func 回调函数
```javascript showLineNumbers
function main() {
  // 请看 thread.newThread 函数例子
}

main();
```

## thread.cancelThread 取消线程

* 取消线程的执行
* @param t 线程对象ID
* @return boolean

```javascript showLineNumbers
function main() {
  // 请看 thread.execCodeAsync 函数例子
}

main();
```
## thread.stopAll 停止所有线程

* 取消所有正在运行的线程

```javascript showLineNumbers
function main() {
    // 请看 thread.execCodeAsync 函数例子
}

main();
```
## thread.isCancelled 取消判断

* 取消线程的执行
* @param t 线程对象ID
* @return boolean true代表已经取消了，false表示未取消

```javascript showLineNumbers
function main() {
  // 请看 thread.execCodeAsync 函数例子
}
main();
```



## thread.putShareKeyValue 存储共享数据

* 存储共享数据
* 这个是kv结构的共享区
* @param key 数据的key 字符串
* @param value 数据的值，字符串

```javascript showLineNumbers
// js/sub_thread_func.js 文件内容 
function subThreadFunc(){
  logd("subThreadFunc 执行。。。")
  thread.putShareKeyValue("key","vb1")
  thread.putShareValue("我是subThreadFunc")
}
```


```javascript showLineNumbers
// js/main.js 文件内容 
function threadTest() {

  // 子线程无法访问外部的变量，
  // 最好的方式 是 在一个js文件中写好业务逻辑，在线程中 直接调用，所有操作都在写得好的js文件中完成
  let name = "thread2";
  let th = thread.newThread(name)
  //异步执行
  th.execAsync(function () {
    var testData = readIECFileAsString("js/sub_thread_func.js");
    // subThreadFunc 是sub_thread_func文件中定义的 ，加上执行函数
    testData = (testData+" ;subThreadFunc();")
    // 开始执行
    let dx = execScript(2, testData);
  });

  while (!isScriptExit()) {
    sleep(100)
    // 从 kv 共享区取值
    let kvValue = thread.getShareKeyValue("key")
    if (kvValue != "") {
      logd("获取: key " + kvValue)
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


## thread.getShareKeyValue 从共享区获取数据

* 从共享区获取数据
* 该函数获取后，会自动移出key对应的值
* 适配EC 脱机版本5.20.0+
* @param key 和putShareKeyValue对应的key
* @return `{string}` 字符串

```javascript showLineNumbers
    // 看 thread.putShareKeyValue 函数例子
```


## thread.putShareValue 存储数据到共享区

* 存储数据到共享区
* 这个底层是数组形式实现
* 适配EC 脱机版本5.20.0+
* @param value 存储的值

```javascript showLineNumbers
    // 看 thread.putShareKeyValue 函数例子
```



## thread.getShareValue 共享区取值

* 共享区取值
* 底层是数组，先进先出的原理，取索引为0的数据并且移出
* 适配EC 脱机版本5.20.0+
* @return `{string}` 字符串

```javascript showLineNumbers
    // 看 thread.putShareKeyValue 函数例子
```
