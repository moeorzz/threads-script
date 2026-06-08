---
title: 全局模块
description: EasyClick 自动化脚本 鸿蒙Next自动化 全局模块 资源下载
keywords:
  - EasyClick 自动化脚本 鸿蒙Next自动化 全局模块 资源下载
  - jar
  - JAVA
  - param
  - js
  - JS
  - return
  - class
  - version
  - loadDex
  - require
  - EasyClick
  - 手机自动化
  - 自动化测试
  - 脚本开发
  - 安卓自动化
  - iOS自动化
  - 鸿蒙Next
---

## 说明

全局模块是指直接调用方法就可以使用的模块，无需使用前缀对象名称
## CLI相关

### getCliArgs 获取CLI命令行提交的参数

* 获取CLI命令行提交的参数
* 如果配合AI使用，可以优先从cli获取参数，如果获取不到在从其他地方获取
* 这样就能做到AI 自动传参，打包后从其他地方获取参数的AI自动测试
* 适合版本 EC 鸿蒙Next 2.16.0+
* @return {null|JSON} JSON对象，如果是null说明不是CLI运行过来的

```javascript showLineNumbers
function main() {
    let a = getCliArgs();
    if (a == null){
        // 从其他地方获取
    }
    logd(JSON.stringify(a))
}

main();
```
## 中控版本

### version 获取中控版本

* 获取中控版本
* @return 字符串 例如 2.9.0

```javascript showLineNumbers
function main() {
    logd(version())
}

main();
```



## 插件模块加载

### loadDex 载入jar包

* 载入dex文件
* @param path 路径，加载顺序分别是插件目录(例如 ab.jar)或者是文件路径(例如 D:/ab.jar)加载
* @return true 载入成功， false载入失败

```javascript showLineNumbers
function main() {
    //直接填文件名,会从项目的plugin插件目录加载
    loadDex("ocr.apk");
    //填绝对路径,则从电脑路径中加载
    loadDex("D:/a.jar");
    // a.apk中存在com.A这个这个类，可以直接使用
    var obj = new com.A();
}

main();
```

### require 导入JS

* 导入JS模块
* @param path 路径，例如 本地D:/a.js或者 EC工程中的文件路径 slib/a.js
* @return 模块对象

```javascript showLineNumbers
function main() {
    //注意,js文件不要放在js目录或下级目录中
    test = require("slib/a.js")
    logd(test.c());
}

main();
//视频介绍:https://www.bilibili.com/video/BV1ES4y1f7qV?vd_source=2abc6be820f5a6382ebc0ceafc5dbe00&p=39&spm_id_from=333.788.videopod.episodes
```

### importClass 导入JAVA类

* 导入java的class给js用
* @param clz class的名称例如: com.A

```javascript showLineNumbers
function main() {
    importClass(com.A);
    var obj = new com.A();
}

main();
```

### importPackage 导入JAVA包

* 导入java包下面所有类给js用
* @param clz class的名称例如: com.b

```javascript showLineNumbers
function main() {
    importPackage(com.b);
    var obj = new com.b.A();
}

main();
```

## 脚本启停

### exit 退出脚本

```javascript showLineNumbers
exit();
```

### isScriptExit 是否已退出脚本

* 判断EC运行的当前线程是否处于退出状态，可用判断脚本是否退出，或者子线程是否退出
* @return true 已退出

```javascript showLineNumbers
function main() {
    try {
        while (true) {
            sleep(1000)
            logd("222")
            if (isScriptExit()) {
                break
            }
        }
        logd("222")
    } catch (e) {
        logd(e)
        if (isScriptExit()) {
            return
        }
    }
}

main();
```

### sleep 暂停执行

* 休眠
* @param miSecond 毫秒

```javascript showLineNumbers
function main() {
    sleep(1000);
}

main();
```

### execScript 载入JS

* 执行JS文件或者内容, [如果出现illegalStateException，可以尝试修改**eval**函数执行js脚本]
* eval函数是js自带的，直接传入js内容就行
* @param type 1=文件，2=直接是JS内容
* @param content 路径例如D:/a.js或者js的内容
* @return 布尔型，true代表执行成功， false代表失败

```javascript showLineNumbers
function main() {
    var d = 'while(true){sleep(1000);logd(111111);}';
    thread.execAsync(function () {
        //execScript(1,"D:/ad.js")
        execScript(2, d);
    });

    while (true) {
        sleep(2000);
        loge("fsadffsad")
    }
}

main();
```

### restartScript 重启脚本

* 重启脚本，适合无限循环，或者有异常的情况可以再次执行，
* 注意: 该方法威力巨大，请自行控制好是否自动重启，否则只能强杀进程才能停止
* @param path 新的IEC路径，如果不需要可以填写null
* @param stopCurrent 是否停止当前的脚本
* @param delay 延迟多少秒后执行
* @return bool true 代表成功 false 代表失败

```javascript showLineNumbers
function main() {
    logd("我是在脚本运行的");
    setStopCallback(function () {
        restartScript(null, true, 3)
    });

    //setExceptionCallback(function (){
    //    restartScript(null,true,3)
    //});
    sleep(1000);
    logd("脚本结束")
}

main();
```

### setScriptPause 设置脚本暂停或者继续

* 设置脚本暂停或者继续
* 适配 EC 鸿蒙Next 1.0.0+
* @param pause true 代表暂停脚本，false代表继续
* @param timeout 自动恢复时间单位毫秒，0 代表不自动恢复，等待外部交互后恢复，大于0代表到了时间自动恢复运行
* @return `{boolean}` true 代表脚本处于暂停中，false 代表继续运行中

```javascript showLineNumbers
function main() {
    sleep(1000);
    logd("start....")
    // 代表暂停脚本执行，3秒后会自动化继续
    // 这里仅仅是演示，实际情况需要根据自己的业务逻辑做判断或者从ui进行暂停脚本
    setScriptPause(true, 3000)

    logd("我是三秒后的日志")
}

main();
```

### isScriptPause 脚本是否处于暂停中

* 脚本是否处于暂停中
* 适配 EC 鸿蒙Next 1.0.0+
* @return `{boolean}` true 代表脚本处于暂停中

```javascript showLineNumbers
function main() {
    sleep(1000);
    logd("start....")
    // 代表暂停脚本执行，3秒后会自动化继续
    // 这里仅仅是演示，实际情况需要根据自己的业务逻辑做判断或者从ui进行暂停脚本
    // 仅仅是函数调用演示，实际情况根据业务处理
    logd("isScriptPause " + isScriptPause())
    setScriptPause(true, 3000)
    logd("isScriptPause " + isScriptPause())
    logd("我是三秒后的日志")
}

main();
```

## JSON处理

### JSON.stringify 格式化为JSON字符串

* 格式化对象为JSON字符串
* @param 对象
* @return 字符串

```javascript showLineNumbers
function main() {
    var m = {"sss": "a"};
    var d = JSON.stringify(m);
    logd(d);
}

main();
```

### JSON.parse 转换为JSON对象

* 格式化JSON字符串为对象
* @param 字符串
* @return 对象

```javascript showLineNumbers
function main() {
    let m = `{"sss": "a"}`
    let d = JSON.parse(m);
    logd(d);
}

main();
```

## 监听脚本和服务

### setStopCallback 脚本停止监听
- 脚本开头执行一次

```javascript showLineNumbers
function main() {
    setStopCallback(function () {
        logd("fdsafsad 我是停止回调")
    });
    var result = sleep(1000);
    if (result) {
        logd("成功");
    } else {
        logd("失败");
    }
}

main();
```

### setExceptionCallback 脚本异常停止监听
- 脚本开头执行一次

```javascript showLineNumbers
function main() {
    setExceptionCallback(function (msg) {
        logd(" 异常停止消息: " + msg)
    });
    var result = sleep(1000);
    if (result) {
        logd("成功");
    } else {
        logd("失败");
    }
    //这里有异常抛出
    result.length();
}

main();
```

## 日志消息方法

### setLogLevel 设置日志的等级

* 设置日志的等级,可以根据情况关闭或开启日志
* 文件保存在中控安装目录的的logs/device下
* @param level 日志等级，值分别是 debug,info,warn,error,off，排序分别是`debug < info < warn < error < off`，
* 例如 off代表关闭所有级别日志，debug代表打印包含logd,logi,logw,loge的日志，info代表打印包含logi,logw,loge的日志，warn
  代表打印包含logw,loge的日志
* @param displaylogd 是否展示logd消息
* @return `{bool}` 布尔型 true代表成功 false代表失败

```javascript showLineNumbers
function main() {
    setLogLevel("info", false)
    for (var i = 0; i < 1; i++) {
        sleep(10);
        //logd(time()+" debug");
        logi(time() + " info");
        //logw(time()+" warn");
        // loge(time()+" error");
        logd("--- " + time());
    }
    //logd(time()+"  222");
}

main();
```
### setDisplayLineNumber 显示行号

* 设置日志是否显示行号
* 适配EC 鸿蒙Next USB 2.0.0+
* @param display true 代表显示行号

```javascript showLineNumbers
function main() {
  setDisplayLineNumber(true)
    for (var i = 0; i < 1; i++) {
        sleep(10);
        //logd(time()+" debug");
        logi(time() + " info");
        //logw(time()+" warn");
        // loge(time()+" error");
        logd("--- " + time());
    }
    //logd(time()+"  222");
}

main();
```

### setDeviceRecordLog 记录日志

* 设置当前设备记录并保存日志
* 默认是不记录
* 适配 EC 鸿蒙Next 1.0.0+
* @param open true 代表记录到文件，false代表不处理
* @param level 日志等级，值分别是 debug,info,warn,error,off，排序分别是 `debug<info<warn<error<off`，
* 例如 off代表关闭所有级别日志，debug代表打印包含logd,logi,logw,loge的日志，info代表打印包含logi,logw,loge的日志，warn
  代表打印包含logw,loge的日志
* @return `{bool}` 布尔型 true代表成功 false代表失败

```javascript showLineNumbers
function main() {
    setDeviceRecordLog(true, "", debug)
    for (var i = 0; i < 1; i++) {
        sleep(10);
        //logd(time()+" debug");
        logi(time() + " info");
        //logw(time()+" warn");
        // loge(time()+" error");
        logd("--- " + time());
    }
    //logd(time()+"  222");
}

main();
```

### logd 调试日志

* 调试日志
* @param msg 消息字符串

```javascript showLineNumbers
function main() {
    logd("msg");
    //可变参数写法
    logd("我是消息{},{}", "测试1", 2)
}

main();
```

### loge 错误日志

* 错误日志
* @param msg 消息字符串

```javascript showLineNumbers
function main() {
    loge("msg");
    //可变参数写法
    loge("我是消息{},{}", "测试1", 2)
}

main();
```

### logw 警告日志

* 警告日志
* @param msg 消息字符串

```javascript showLineNumbers
function main() {
    logw("msg");
    //可变参数写法
    logw("我是消息{},{}", "测试1", 2)
}

main();
```

### logi 信息日志

* 信息日志
* @param msg 消息字符串

```javascript showLineNumbers
function main() {
    logi("msg");
    //可变参数写法
    logi("我是消息{},{}", "测试1", 2)
}

main();
```

## 读取IEC包资源

### readIECFileAsString 读取IEC内部文件为字符串

* 读取IEC文件中的资源文件，并返回字符串
* @param fileName 文件名称，如果放在某个文件夹下 需要加上文件名称
* @return `{string}` 如果是null代表没内容

```javascript showLineNumbers
function main() {
    var testData = readIECFileAsString("res/a.txt");
    logd(testData)
}

main();
```

### readIECFileAsByte 读取IEC内部文件为数组资源

* 读取IEC文件中的资源文件，并返回java的直接数组
* @param fileName 文件名称，如果放在某个文件夹下 需要加上文件名称
* @return `{字节数组}` 如果是null代表没内容

```javascript showLineNumbers
function main() {
    //这里已读取图片为例子
    var d = readIECFileAsByte("res/a.png")
    logd(d)
    logd(d.length)
}

main();
```

### readResString 读取字符串资源

* 读取res文件夹中的资源文件,并返回字符串
* @param fileName 文件名称，不要加res前缀
* @return string 如果是null代表没内容

```javascript showLineNumbers
function main() {
    var testData = readResString("a.txt");
}

main();
```

### readResBitmap 读取Bitmap资源

* 读取res文件夹中的资源文件，并返Bitmap图片对象
* @param fileName 文件名称，不要加res前缀
* @return BufferedImage 如果是null代表没内容

```javascript showLineNumbers
function main() {
    // 如果是res目录下
    var b = readResBitmap("a.png");
    // 如果在 res/img目录下
    var b = readResBitmap("img/a.png");
}

main();
```

### readResAutoImage 读取Image资源

* 读取res文件夹中的资源文件，并返 AutoImage 图片对象
* @param fileName 文件名称，不要加res前缀
* @return string 如果是null代表没内容

```javascript showLineNumbers
function main() {
    // 如果是res目录下
    var b = readResAutoImage("a.png");
    // 如果在 res/img目录下
    var b = readResAutoImage("img/a.png");
}

main();
```

### saveResToFile 保存资源为文件

* 保存res文件夹中的资源文件到指定的路径
* @param fileName 文件名称，不要加res前缀
* @param path 要保存到的路径地址，例如D:/aa.txt
* @return boolean|布尔型 true代表保存成功

```javascript showLineNumbers
function main() {
    // 如果是res目录下
    var b = saveResToFile("a.png", "D:/a.png");
    // 如果在 res/img目录下
    var b = saveResToFile("img/a.png", "D:/a.png");
}

main();
```

### findIECFile 查找IEC的文件

* 查找IEC的文件
* @param dir 文件夹名称，null代表只读res/文件夹，没有默认是res文件夹，可以是类似 res/aaa/这样的文件夹
* @param names 文件名称前缀,null代表不匹配， 例如aaa,多个前缀用|分割，例如 aaa|bb|cc
* @param ext 文件扩展名 ,null代表不匹配，例如.png,多个扩展用|分割，例如 .png|.jpg|.bmp
* @param recursion 是否递归子目录，true代表递归
* @return `{array}` 文件名称JSON数组

```javascript showLineNumbers
function main() {
    let res = findIECFile("res/", "dd2", ".png|.jpg", true)
    logd("findIECFile {}", JSON.stringify(res));
}

main();
```

## 自动化服务相关

### isServiceOk 自动化服务状态

* 自动化服务是否正常
* @return true或者false

```javascript showLineNumbers
function main() {
    var result = isServiceOk();
}

main();
```

### isDeviceOnline 设备是否在线

* 设备是否在线
* @return true或者false

```javascript showLineNumbers
function main() {
    var result = isDeviceOnline();
}

main();
 ```

### startEnv 启动自动化

* 启动自动化服务环境，并自动纠正坐标系统，防止坐标漂移
* @return true或者false

```javascript showLineNumbers
function main() {
    var result = startEnv();
}

main();
 ```

### getStartEnvMsg 获取自动化消息

* 获取启动自动化消息
* @return string

```javascript showLineNumbers
function main() {
    var result = getStartEnvMsg();
    logd(result)
}

main();
```

### daemonEnv 守护自动化环境

* 守护自动化环境
* 如果是激活或者无障碍保活的情况下，尽量保证自动服务不掉线
* @param daemon 是否守护自动化环境 true 是，false 否
* @return 布尔型 true代表启动成功，false代表启动失败

```javascript showLineNumbers
function main() {
    var result = daemonEnv(true);
}

main();
```

### closeEnv 关闭自动化

* 关闭自动化环境
* @return 布尔型 true代表启动成功，false代表启动失败

```javascript showLineNumbers
function main() {
    var result = closeEnv();
}

main();
 ```

## 时间相关

### time 毫秒级当前时间戳

* 毫秒级当前13位时间戳
* @return `{long}` 毫秒级别的long时间

```javascript showLineNumbers
function main() {
    logd(time());
}

main();
```

### timeFormat 格式化时间

* 格式化时间函数例如：```yyyy-MM-dd HH:mm:ss```
* @return `{string}` 格式化之后的当前时间

```javascript showLineNumbers
function main() {
    logd(timeFormat("yyyy-MM-dd HH:mm:ss") + "");
}

main();
```

### console.time 计时开始

* 计时开始,和timeEnd成对出现计算用时
* @param label 标签
* @return `{long}` 当前时间

```javascript showLineNumbers
function main() {
    console.time("1");
    sleep(1000)
    logd(console.timeEnd("1"))
}

main();
```

### console.timeEnd 计时结束

* 计时结束,和timeEnd成对出现计算用时
* @param label 标签
* @return `{long}` 与计时开始的差值

```javascript showLineNumbers
function main() {
    console.time("1");
    sleep(1000)
    logd(console.timeEnd("1"))
}

main();
```

## 其他

### random 随机函数

* 取得某个范围的随机值
* @param min 最小值
* @param max 最大值
* @return 整型 在min和max中间的值, 包含最大和最小值

```javascript showLineNumbers
function main() {
    var result = random(100, 1000);
    sleep(result);
}

main();
```

## 告警发送

### sendDingDingMsg 发送钉钉消息

* 发送钉钉消息
* 适配 EC 鸿蒙Next 1.0.0+
* @param url 群组/部门 机器人Webhook地址
* @param secret 群组/部门 机器人Webhook密钥, 可以不写使用关键字过滤方式
* @param msg 要发送的消息
* @param atMobile at手机号，多个用英文逗号隔开
* @param atAll 是否at所有人，写true或者false
* @return `{string}` 调用钉钉返回的json字符串结果,格式 ```{"errcode":0,"errmsg":"ok"}```，errcode=0代表成功其他都是错误

```javascript showLineNumbers
function main() {
    // 演示的地址和密钥，具体获取参考这个网页： https://www.dingtalk.com/qidian/help-detail-20781541.html
    // https://blog.csdn.net/weixin_44646065/article/details/110637713
    let url = "https://oapi.dingtalk.com/robot/send?access_token=59735fa75d835dbfaa502bb42886fca982960d20sac5e1df6bba4dd1aba02999c"
    let sec = "SEC2305788ab08e9534a33b86ae376697d3c9ee3095f331345d5ccd6e2e065ca8069"
    var res = sendDingDingMsg(url, sec, "我是消息", "", true);
    logd("sendDingDingMsg:" + res);
}

main();
```

## 授权

### isDeviceAuthOk 授权是否正常

* 查询设备授权是否过期
* @param type 1 代码中控设备授权 2 代表投屏授权
* @return `{boolean}` true代表过期 ，false 代表未过期

```javascript showLineNumbers
function main() {
    var result = isDeviceAuthOk(1);
    logd(result);
}

main();
```

### getDeviceAuth 获取设备授权时间

* 获取设备授权时间
* 适合EC 鸿蒙Next USB版 2.7.0+
* @param type 1 代码中控设备授权 2 代表投屏授权
* @return `{string}` JSON字符串，useSerialNo: 1=使用 序列号 授权的，其他都是使用设备ID授权，isExp：1=授权过期，其他都不是过期，expTime：授权到期时间


```javascript showLineNumbers
function main() {
    var result = getDeviceAuth(1);
    logd(result);
}

main();
```
