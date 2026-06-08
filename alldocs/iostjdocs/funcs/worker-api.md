---
title: 多Worker函数
description: EasyClick 自动化脚本 iOS免越狱 多Worker函数 资源下载
keywords:
  - EasyClick 自动化脚本 iOS免越狱 多Worker函数 资源下载
  - worker
  - workerThread
  - jsvm
  - Worker
  - getCurrentWorkerName
  - js
  - newWorker
  - iOS
  - isRunning
  - hasWorkerFunction
  - EasyClick
  - 手机自动化
  - 自动化测试
  - 脚本开发
  - 安卓自动化
  - iOS自动化
  - 鸿蒙Next
---

:::tip

- iOS的js引擎天生是单线程模式，无法实现多线程。
- 这里我们使用多个jsvm的方式实现多个worker进行异步干不同的事情。
- 多jsvm代表这启动多个不同的js虚拟机，在iOS进程中运行，相互之间进程数据是隔离的。
- 每个jsvm独立运行，会将脚本都全部重新加载一次，直到运行运行到main.js中，所以需要通过getCurrentWorkerName函数获取worker名称，分流到不同函数做不同业务
- 每个jsvm之间的数据交互，可以通过一个worker写入到文件，然后另外一个worker进行读取，进行业务处理
- 主脚本jsvm的名称是mainWorker，其他的worker可以自己命名，但是不要用中文、特殊字符等
  :::

## 多Worker模块

### getCurrentWorkerName 获取当前worker名称

* 获取当前的worker名称
* @return `{string}` worker的字符串

```javascript showLineNumbers
function main() {
    var m = getCurrentWorkerName();
    logd(m);
}

main();
```

### workerThread.newWorker 生成一个新的worker

* 新增一个worker
* @param name worker的名称
* @return `{string}` worker的名称 , 有值代表成功

```javascript showLineNumbers
function startNewWorker(workName) {
    let name = workerThread.newWorker(workName);
    logd("startNewWorker " + name)
    sleep(1000)
    if (!workerThread.isRunning(workName)) {
        logd(workName + " 没运行");
        return false
    }
    return true;
}

function testworker() {
    logd("current worker name " + getCurrentWorkerName())
    // 脚本的主线程
    if (getCurrentWorkerName() == "mainWorker") {
        logd("主脚本线程")
        // 启动worker1
        startNewWorker("worker1");
        startNewWorker("worker2");
        startNewWorker("worker3");
        // 已经运行了
        for (let i = 0; i < 10; i++) {
            if (isScriptExit()) {
                logd("mainworker 退出了")
                return
            }
            sleep(1000)
            logd(getCurrentWorkerName() + " --> " + new Date())
            // 每2秒调用一次worker1的函数
            if (i % 2 == 0) {
                let dsx = JSON.stringify({"日期": new Date()});
                if (workerThread.hasWorkerFunction("getWorker1Data")) {
                    let result = workerThread.callWorkerFunction("getWorker1Data", dsx)
                    logd("worker1" + "#getWorker1Data 返回--->::::  " + result)
                    let removeWorker1 = workerThread.removeWorker("worker1")
                    logd("removeWorker1  " + removeWorker1)
                    logd("isCancelled worker1 " + workerThread.isCancelled("worker1"));
                    // 移出函数getWorker1Data函数
                    workerThread.removeWorkerFunction("getWorker1Data")
                } else {
                    logw("无 getWorker1Data 函数，不调用")
                }
            }
            // 每4秒调用一次worker2的函数
            if (i % 4 == 0) {
                let dsx = JSON.stringify({"日期": new Date()});
                let result = workerThread.callWorkerFunction("getWorker2Data", dsx)
                logd("worker2" + "#getWorker2Data 返回--->::::  " + result)
            }
            // 每6秒调用一次worker6的函数
            if (i % 6 == 0) {
                let dsx = JSON.stringify({"日期": new Date()});
                let result = workerThread.callWorkerFunction("getWorker3Data", dsx)
                logd("worker3" + "#getWorker3Data 返回--->::::  " + result)
                // 停止所有worker线程
                workerThread.stopAll()
            }
        }
    } else {
        logd("非主脚本线程 ------ ")
        // 如果是worker1的线程，让他干别的活
        if (getCurrentWorkerName() == "worker1") {
            workerThread.addWorkerFunction("getWorker1Data", function (data) {
                logd("---->worker1得到的参数  " + data)
                return "我是worker1#getWorker1Data 函数返回的数据 " + new Date()
            })
            while (true) {
                if (isScriptExit()) {
                    logd("worker1 退出了")
                    return
                }
                sleep(1000)
                //logw(getCurrentWorkerName() + " worker2 " + new Date())
            }
        }
        if (getCurrentWorkerName() == "worker2") {
            workerThread.addWorkerFunction("getWorker2Data", function (data) {
                logd("---->worker2得到的参数  " + data)
                logd("getWorker2Data getCurrentWorkerName " + getCurrentWorkerName())
                return "我是worker2#getWorker2Data 函数返回的数据 " + new Date()
            })
            while (true) {
                if (isScriptExit()) {
                    logd("worker2 退出了")
                    return
                }
                sleep(1000)
                //logw(getCurrentWorkerName() + " worker2 " + new Date())
            }
        }
        if (getCurrentWorkerName() == "worker3") {
            workerThread.addWorkerFunction("getWorker3Data", function (data) {
                logd("---->worker3得到的参数  " + data)
                return "我是worker3#getWorker3Data 函数返回的数据 " + new Date()
            })
            while (true) {
                if (isScriptExit()) {
                    logd("worker3 退出了")
                    return
                }
                sleep(1000)
                //logw(getCurrentWorkerName() + " worker3 " + new Date())
            }
        }
    }
}

testworker()
```

### workerThread.isRunning worker是否正在运行

* 这个worker是否正在运行
* @param name worker 名称
* @returns `{boolean}` true 代表正在运行，false 代表没运行

```javascript showLineNumbers
// 请看 newWorker 例子
```

### workerThread.hasWorkerFunction 是否有worker函数

* 是否有worker函数
* @param funcName 函数名称
* @returns `{boolean}` true代码有 false代表无

```javascript showLineNumbers
// 请看 newWorker 例子
```

### workerThread.addWorkerFunction 增加worker函数

* 新增一个工作函数给别的worker调用
* @param funcName 函数名称
* @param @param callback 实际的实现，建议参数和返回值都是字符串
* @returns `{boolean}` true 代表成功 false代表失败

```javascript showLineNumbers
// 请看 newWorker 例子
```

### workerThread.removeWorkerFunction 删除worker函数

* 删除一个工作函数
* @param funcName 函数名称
* @returns `{boolean}` true 代表成功 false代表失败

```javascript showLineNumbers
// 请看 newWorker 例子
```

### workerThread.callWorkerFunction 调用worker注册函数

* 调用别的worker注册的函数
* @param funcName 函数名称
* @param data 参数，建议字符串
* @returns `{object}` 返回函数返回的对象

```javascript showLineNumbers
// 请看 newWorker 例子
```

### workerThread.removeWorker 取消 worker

* 取消 worker
* @param name worker的名称
* @return `{boolean}` true 代表成功 false 代表失败

```javascript showLineNumbers
// 请看 newWorker 例子
```

### workerThread.isCancelled 是否取消worker

* 是否取消 worker 的执行
* @param name worker的名称
* @return `{boolean}`  true代表已经取消了，false表示未取消

```javascript showLineNumbers
// 请看 newWorker 例子
```

### workerThread.stopAll 是否所有worker

* 取消所有正在运行的worker,但是无法取消主脚本线程
* @return `{boolean}`  true代表已经成功，false表示失败

```javascript showLineNumbers
// 请看 newWorker 例子
```








