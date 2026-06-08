---
title: EasyClick自动化脚本_iOS脚本_iOS免越狱_iOS免硬件_全局模块
hide_title: false
hide_table_of_contents: false
sidebar_label: 全局模块
description: EasyClick 自动化脚本 iOS免越狱 全局模块 资源下载
keywords:
  - EasyClick自动化脚本
  - iOS脚本
  - iOS免越狱
  - iOS免硬件
  - 全局模块
  - 资源下载
  - JS
  - iOS
  - js
  - return
  - param
  - version
  - exit
  - isScriptExit
  - sleep
  - execScript
  - EasyClick
  - 手机自动化
---

# 全局模块

## 说明

全局模块是指直接调用方法就可以使用的模块，无需使用前缀对象名称
## CLI相关

### getCliArgs 获取CLI命令行提交的参数

* 获取CLI命令行提交的参数
* 如果配合AI使用，可以优先从cli获取参数，如果获取不到在从其他地方获取
* 这样就能做到AI 自动传参，打包后从其他地方获取参数的AI自动测试
* 适合版本 EC 脱机版本 6.9.0+
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
## 应用版本

### version 获取应用程序版本

* 获取应用程序版本
* @return 字符串 例如 2.9.0

```javascript showLineNumbers
function main() {
    logd(version())
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

* 执行JS文件或者内容
* @param a_execType 1=文件，2=直接是JS内容
* @param _acontent 路径[参考file模块]例如/var/a.js或者js的内容
* @return 布尔型，true代表执行成功， false代表失败

```javascript showLineNumbers
function main() {
    let d = "logd(1)"
    let dx = execScript(2, d);
    while (true) {
        sleep(2000);
        loge("fsadffsad")
    }
}

main();
```

### restartScript 重启脚本

* 支持EC iOS脱机版本 2.2.0+
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
        restartScript(null, false, 3)
    });

    //setExceptionCallback(function (){
    //    restartScript(null,true,3)
    //});
    sleep(1000);
    logd("脚本结束")
}

main();
 ```

## js导入

### require 导入JS

* 导入JS模块
* @param path 路径，例如 本地js文件或者 EC工程中的文件路径 slib/a.js
* @return 模块对象

```javascript showLineNumbers
function main() {
    //注意,js文件不要放在js目录或下级目录中
    //注意,EC iOS 脱机版本 1.3.+
    let lib1 = require("res/lib.js")
    new lib1(1, 2, 3).say()
    let lib2 = require("res/lib2")
    logd(lib2.add(1, 2))
}

main();
//视频介绍:https://www.bilibili.com/video/BV1ES4y1f7qV?vd_source=2abc6be820f5a6382ebc0ceafc5dbe00&p=39&spm_id_from=333.788.videopod.episodes
```

```javascript showLineNumbers
// res/lib2.js 内容
function add(a, b) {
    return a + b;
}

var a1 = 1
module.exports = {add, a1};
```

```javascript showLineNumbers
// res/lib2js 内容
module.exports = function (name, age, money) {
    this.name = name;
    this.age = age;
    this.money = money;
    this.say = function () {
        console.log('我的名字叫：' + this.name + '，我今年' + this.age + '岁，月薪为：' + this.money + '元；')
    }
};

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
    var m = {"sss": "a"};
    var d = JSON.stringify(m);
    d = JSON.parse(d);
    logd(d);
}

main();
```

## 监听脚本和服务

### setStopCallback 脚本停止监听

* 支持EC iOS脱机版本 2.2.0+

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

* 支持EC iOS脱机版本 2.2.0+

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
* @param level 日志等级，值分别是 debug,info,warn,error,off，排序分别是debug < info < warn < error < off，
* 例如 off代表关闭所有级别日志，debug代表打印包含logd,logi,logw,loge的日志，info代表打印包含logi,logw,loge的日志，warn
  代表打印包含logw,loge的日志
* @param displaylogd 是否展示logd消息，这个参数未实现
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

### setDisplayLineNumber 显示行号

* 设置日志是否显示行号
* 适配EC 脱机 5.0.0+
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

### setSaveLogEx 保存日志

* 设置保存日志信息到文件中，可以使用爱思软件导出日志
* EC iOS 3.13+新增了level参数
* @param save 是否保存
* @param level 日志等级，值分别是 debug,info,warn,error,off，排序分别是 ```debug<info<warn<error```，
* 例如 off代表关闭所有级别日志，debug代表打印包含logd,logi,logw,loge的日志，info代表打印包含logi,logw,loge的日志，warn
  代表打印包含logw,loge的日志
* @return 保存日志文件的目录

```javascript showLineNumbers
function main() {
    let d = setSaveLogEx(true, "debug")
    logd(d)
}

main();
```

## 日志窗口

### setLogViewSizeEx 设置日志窗口属性

* 设置日志窗口大小扩展函数
* @param map 例如
* 解释：
* x: 起始 x 位置，x坐标暂时不生效
* y: 起始 Y 位置，y坐标暂时不生效
* w:宽度
* h:高度
* textSize:日志的字体大小
* textColor: 文字颜色 #336699
* line: 展示多少行，默认是十行
* backgroundColor:背景颜色，例如 #336699
* direction: 文字展示方向，1 代表竖屏展示 0 代表横屏
* showTag： 显示调试标志，1 是 2否
* fitWidth：文字宽度适配悬浮窗的宽度，自动缩放，1 是，0否

```javascript showLineNumbers
  function setlog() {
    var m = {
        "x": 2,
        "y": 2,
        "w": 300,
        "h": 400,
        "textSize": 26,
        "backgroundColor": "#336699",
        "textColor": "#000000",
        "direction": 0,
        "line": 10,
        "showTag": 0,
        "fitWidth": 0
    }
    //让主程序在前台
    takeMeToFront()
    sleep(1000)
    showLogWindow();

    logd("showLogWindow() " + showLogWindow())
    for (let i = 0; i < 11; i++) {
        sleep(1000)
        logd("么我" + new Date())
        if (i == 2) {
            logd("closeLogWindow() " + closeLogWindow())
            setLogViewSizeEx(m);
        }
        if (i == 10) {
            logd("showLogWindow() " + showLogWindow())
        }
    }
}

setlog();

```

### showLogWindow 显示日志窗口

* [主程序在后台进行无法使用]
* 显示日志窗口，必须iOS设备支持画中画功能，并且开启画中画
* @returns `{boolean}` true代表成功，false代表失败

```javascript showLineNumbers
  function setlog() {
    var m = {
        "x": 2,
        "y": 2,
        "w": 300,
        "h": 400,
        "textSize": 26,
        "backgroundColor": "#336699",
        "textColor": "#000000"
    }
    //让主程序在前台
    takeMeToFront()
    sleep(1000)
    showLogWindow();

    logd("showLogWindow() " + showLogWindow())
    for (let i = 0; i < 11; i++) {
        sleep(1000)
        logd("么我" + new Date())
        if (i == 2) {
            logd("closeLogWindow() " + closeLogWindow())
            setLogViewSizeEx(m);
        }
        if (i == 10) {
            logd("showLogWindow() " + showLogWindow())
        }
    }
}

setlog();

```

### closeLogWindow 关闭日志窗口

* [主程序在后台进行无法使用]
* 关闭日志窗口
* @returns `{boolean}` true代表成功，false代表失败

```javascript showLineNumbers
  function setlog() {
    var m = {
        "x": 2,
        "y": 2,
        "w": 300,
        "h": 400,
        "textSize": 26,
        "backgroundColor": "#336699",
        "textColor": "#000000"
    }
    takeMeToFront()

    showLogWindow();

    logd("showLogWindow() " + showLogWindow())
    for (let i = 0; i < 11; i++) {
        sleep(1000)
        logd("么我" + new Date())
        if (i == 2) {
            logd("closeLogWindow() " + closeLogWindow())
            setLogViewSizeEx(m);
        }
        if (i == 10) {
            logd("showLogWindow() " + showLogWindow())
        }
    }
}

setlog();

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

### readResAutoImage 读取Image资源

* 读取res文件夹中的资源文件，并返 AutoImage 图片对象
* @param fileName 文件名称，不要加res前缀
* @return string 如果是null代表没内容

```javascript showLineNumbers
function main() {
    var b = readResAutoImage("img/a.png");
}

main();
```

### saveResToFile 保存资源为文件

* 保存res文件夹中的资源文件到指定的路径
* @param fileName 文件名称，不要加res前缀
* @param path 要保存到的路径地址，例如/var/aa.txt
* @return boolean|布尔型 true代表保存成功

```javascript showLineNumbers
function main() {
    var b = saveResToFile("img/a.png", "/var/a.png");
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

## UI参数读取

### deleteConfig 删除配置值

* @param key 在UI界面中配置的key
* @return `{bool}` true 代表成功 false 代表失败

```javascript showLineNumbers
function main() {
    var testData = deleteConfig("test_key");
}

main();
```

### readConfigInt 读取整型配置

* @description 读取UI界面中的参数,返回是整型
* @param key 在UI界面中配置的key
* @return 整型，找不到就返回0

```javascript showLineNumbers
function main() {
    var testData = readConfigInt("test_key");
}

main();
```

### readConfigString 读取字符串配置

* 读取UI界面中的参数,返回是字符串
* @param key 在UI界面中配置的key
* @return 字符串 找不到就返回空字符串

```javascript showLineNumbers
function main() {
    var testData = readConfigString("test_key");
}

main();
```

### readConfigBoolean 读取布尔型配置

* 读取UI界面中的参数,返回是布尔型
* @param key 在UI界面中配置的key
* @return true 或者 false

```javascript showLineNumbers
function main() {
    var testData = readConfigBoolean("test_key");
}

main();
```

### getConfigJSON 取所有配置

* 取得配置的JSON
* @return JSON数据

```javascript showLineNumbers
function main() {
    var testData = getConfigJSON();
}

main();
```

### updateConfig 更新配置

* 更新配置
* @param key 键
* @param value 值
* @return `{boolean}` true 成功，false失败

```javascript showLineNumbers
function main() {
    updateConfig("a", "sss");
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

### startEnv 启动自动化

* 启动自动化服务环境,这个没有实现，根据函数打印的实际日志操作
* @return true或者false

```javascript showLineNumbers
function main() {
    var result = startEnv();
}

main();
 ```

### startActiveMySelf 启动自激活

* 开始启动自激活环境，实现自激活后，可以点击代理IP图标进行启动
* 这个函数执行时间最大是30秒
* 具体请看文档：https://ieasyclick.com/iostjdocs/zh-cn/advance/activemyself
* 适配 EC 脱机版 6.0.0+
* 如果使用外部的VPN，需要将主程序放在前台运行，防止无法跳转到LocalDevVpn程序
* @param openExtVpn 字符串，1 代表 使用外部的LocalDevVpn程序，0 代表使用内部的自带VPN
* @return `{string}` 返回ok代表成功，其他都是错误信息

```javascript showLineNumbers
function main() {
    var result = startActiveMySelf("0");
    logd("result " + result)
    logd("mountDevImageOk  " + mountDevImageOk())
}

main();
```

### mountDevImageOk 刷入镜像结果

* 刷入开发者镜像是否成功
* 适配 EC 脱机版 6.0.0+
* @return `{bool}` true代表成功 false代表失败

```javascript showLineNumbers
function main() {
    var result = startActiveMySelf("0");
    logd("result " + result)
    logd("mountDevImageOk  " + mountDevImageOk())
}

main();
 ```

## 告警发送

### sendDingDingMsg 发送钉钉消息

* 发送钉钉消息
* 适合EC 脱机 2.0.0+
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

## 时间相关

### time 毫秒级当前时间戳

* 毫秒级当前时间戳
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
    logd(timeFormat("yyyy-MM-dd HH:mm:ss"));
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

## 开启调试服务

### startDebugServer 开启调试服务

* 已经打包的也可以开启调试服务，给idea链接
* @return 布尔型 true 代表成功，false 代表失败

```javascript showLineNumbers
function main() {
    logd(startDebugServer())
}

main();
```

## 其他

### isReleaseIec 是否是发布版本

* 是否是发布版本的iec脚本
* 适配EC 脱机版本 5.9.0+
* @return boolean true是release，其他都是debug版本

```javascript showLineNumbers
function main() {
    var result = isReleaseIec();
    logd(result);
}

main();
```

### getDeviceExpTime 获取授权时间

* 获取授权过期时间
* 支持EC iOS脱机版本2.0+
* @return `{string}` null 或者""，都是没有获取到，正常返回的是时间字符串

```javascript showLineNumbers
function main() {
    var result = getDeviceExpTime();
    logd(result);
}

main();
```

### setPipCtrlScript 设置悬浮窗控制脚本启停

* 设置悬浮窗是否可以控制脚本启停，防止脚本被其他视频软件占用时被停止
* @param ctrl true 代表可以控制 false代表不可以控制
* @returns `{boolean}` true代表成功，false代表失败

```javascript showLineNumbers
function main() {
    setPipCtrlScript(true);
}

main();
```

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

### takeMeToFront 本程序带到前台运行

* 把本程序带到前台运行
* @return boolean true 代表成功 false代表失败

```javascript showLineNumbers
function main() {
    var result = takeMeToFront();
    logd(result);
}

main();
```

### getMyBundleId 获取ipa自身的bundleId

* 获取ipa自身的bundleId
* 适配EC iOS 4.8.0+
* return `string` 字符串

```javascript showLineNumbers
function main() {
    var result = getMyBundleId();
    logd(result);
}

main();
```

### getMyAppName 获取ipa自身的应用名称

* 获取ipa自身的应用名称
* 适配EC iOS 4.8.0+
* return `string` 字符串

```javascript showLineNumbers
function main() {
    var result = getMyAppName();
    logd(result);
}

main();
```
