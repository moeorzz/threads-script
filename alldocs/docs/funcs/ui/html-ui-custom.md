---
title: 原生UI定制
description: EasyClick 自动化脚本 android免root 原生UI定制
keywords:
  - EasyClick 自动化脚本 android免root 原生UI定制
  - js
  - html
  - JS
  - ui
  - UI
  - xml
  - css
  - tab
  - HTML
  - http
  - EasyClick
  - 手机自动化
  - 自动化测试
  - 脚本开发
  - 安卓自动化
  - iOS自动化
  - 鸿蒙Next
---

## 说明
- EasyClick 使用WebView支撑HTML的UI方式，并且扩展了JS方法，用于控制EC程序。
- 新建工程时候可以对应的模板，推荐使用Materialize模板，文档网址 [http://www.materializecss.cn](http://www.materializecss.cn)
- 也可以自己编写精美的HTML页面，更多JS方法的使用请参考模板中的用法

:::tip 注意
    - 使用html模板，layout文件夹会有css,htmljs,subjs,ui.js默认文件
    - ui.js会是UI默认执行入口，会编译为字节码
    - subjs文件夹存储的js文件会编译为字节码给ui.js调用，其他html无法调用
    - htmljs存储的是html调用的js文件，html文件可以正常使用
    - css文件存储的是css文件即可
    - 如果错误的调用可能导致意外的问题，请遵守该规则使用
:::

## 多tab标签支持
只要在工程的layout工程下新建一个ui.js文件即可
内容是 

```javascript showLineNumbers
function main() {
    ui.layout("参数配置", "main.html");
    ui.layout("注册使用", "reg.html");
    ui.layout("使用说明", "intr.html");
}

main();
```

## 脚本如何与JS交互

### 编写xml视图
- 使用webview加载本地的main.html，tag=web
- 注意:需要layout.attr.xsd和layout.xsd两个文件,创建原生ui项目的layout文件下手动复制到当前项目的layout下
```xml showLineNumbers
<?xml version="1.0" encoding="UTF-8" ?>
<LinearLayout
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:android="http://schemas.android.com/apk/res/android"
        xsi:noNamespaceSchemaLocation="layout.xsd"
        android:layout_height="match_parent"
        android:layout_width="match_parent">
    <WebView android:layout_width="wrap_content"
              android:tag="web"
              android:layout_height="wrap_content"
              android:url="main.html"/>

</LinearLayout>
```


### 加载 xml
- 在ui.js中加载xml视图

```javascript showLineNumbers
function main() {
    ui.layout("参数配置", "main.xml");
}

main();
```

### html 代码

```html showLineNumbers 
<!doctype html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
</head>
<body style="margin-left: 10px;margin-right: 10px">
我是测试网页
</body>
<script>
    //暴露给webview调用
    function myalert() {
        alert("fdsafsad");
        //存储数据到内存中，给脚本读取
        window.ec.putShareData("mymsg", "我是网页的临时数据");
    }

    //暴露给webview调用 带参数
    function myalert(msg) {
        alert("我是msg " + msg);
    }
</script>
</html>
```

### 脚本中调用

- 在js/main.js脚本中调用视图

```javascript showLineNumbers
function main() {
    //重置变量
    ui.resetUIVar();
    //读取UI存储到内存中的数据
    logd(ui.getShareData("mymsg"))
    logd(ui.web)
    //使用ui中 tag= web的视图
    if (ui.web) {
        //myalert 是HTML中暴露的方法
        //执行网页中的js方法
        ui.web.quickCallJs("myalert();");
        ui.web.quickCallJs("myalert('bbbbb');");
    }
}

main();
```



## 浏览器扩展方法

- 浏览器扩展的方法，主要用于网页和EC程序进行交互，并且这些方法只能在网页中调用才行


### 调用自定义扩展
### call 调用扩展函数
 * 调用脚本或者ui.js注入进来的扩展函数
 * @param funcName 注入的函数名称
 * @param data 可以是普通的字符串，也可以是JSON的字符串
 * @return `{string}` 调用的扩展函数返回的数据

```javascript showLineNumbers
// ui.js中的注入
function main() {
    //UI中进行注入新的扩展
    ui.registeH5Function("customFunction", function (data) {
        logd("h5 call-" + data);
        //返回给网页的数据
        return new Date().toString()
    })
    ui.layout("main", "main.html");
}

main();
 ```
网页中的调用

```html showLineNumbers
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<button onclick="test()">测试扩展函数</button>
<script>
    function test() {
        //调用ui.js注入进来的扩展
        let d = window.ec.call('customFunction', JSON.stringify({'action': 'android.settings.SETTINGS'}));
        console.log("ddd  " + d)
    }
</script>
</body>
</html>
 ```

### 启动脚本

```javascript showLineNumbers
window.ec.start()     
```

### 停止脚本

```javascript showLineNumbers
window.ec.stopTask()     
```

### setAgentSupportNode 设置代理模式下获取节点方式

* 设置代理模式下获取节点方式
* 该方法仅对代理模式生效
* EC 安卓 11.2.0+
* 该方法在启动代理服务之前调用，使用2和3 可以减少检测的特征
* 1的方式会出现 ruru检测出 AccessibilityManager.isEnabled，2和其他的方式不会出现
* 1的方式节点能力交强，2节点功能较弱，3 就没有节点功能
* @param support 1 类似无障碍一样的方式， 2 shell dump的的方式，3 不开启节点服务
* @return `{boolean}` true true代表成功 false代表失败

```javascript showLineNumbers
function main() {
  window.ec.setAgentSupportNode("2");
}

main();
```



### 脚本是否正在运行


```javascript showLineNumbers
window.ec.isScriptRunning()     
```

### 隐藏开始按钮


```javascript showLineNumbers
window.ec.hideStartBtn()     
```


### 显示开始按钮

```javascript showLineNumbers
window.ec.displayStartBtn()     
```


### 获取所有配置的JSON字符串

```javascript showLineNumbers
var s = window.ec.getConfigJSON();
alert(s);     
```


### 从配置文件获取单个配置的字符串

```javascript showLineNumbers
var s = window.ec.getConfig("name");
alert(s);     
```

### 保存单个配置到配置文件

```javascript showLineNumbers
var s = window.ec.saveConfig("name", "123");
alert(s);     
```

### 移出所有UI配置

```javascript showLineNumbers
var s = window.ec.removeAllUIConfig();
alert(s);     
```

### 保存数据到存储区
- 这个数据是保存在内存中的

```javascript showLineNumbers
window.ec.putShareData("name", "123");
```

### 从存储区读取数据
- 这个数据是在内存中的

```javascript showLineNumbers
var d = window.ec.getShareData("name");
alert(d);
```

### 清空存储区数据
- 这个数据是在内存中的

```javascript showLineNumbers
var d = window.ec.clearAllShareData();
alert(d);
```


### 打开EC的系统设置


```javascript showLineNumbers
window.ec.openECSystemSetting()     
```



### 保存EC的系统参数
 * 设置EC的系统参数
 * @param params  map形式例如 ```{"running_mode":"无障碍"}```,
 * "running_mode":"无障碍",<br/>
 * "auto_start_service":"是",<br/>
 * "log_float_window":"否",<br/>
 * "ctrl_float_window":"否"<br/>
 * "service_start_run_script":"否"<br/>
 *  参数解释有：
 *  running_mode :  无障碍，代理两种
 *  auto_start_service : 开机启动服务 值有 是，否 两种
 *  log_float_window : 日志悬浮窗展示 值有 是，否 两种
 *  ctrl_float_window : 启停控制悬浮窗展示 值有 是，否 两种
 *  service_start_run_script : 服务被重启后自动重新运行 值有 是，否 两种
 *  home_key_start_stop : 三击HOME启停脚本 值有 是，否 两种
 * @return 布尔型 true 是 false 否

```javascript showLineNumbers
var m = {
    "running_mode": "无障碍",
    "auto_start_service": "是",
    "log_float_window": "否",
    "ctrl_float_window": "否"
};
window.ec.setECSystemConfig(JSON.stringify(m));

```

### 显示Toast消息

```javascript showLineNumbers
window.ec.toast("我是toast消息");       
```

### 显示日志消息窗口


```javascript showLineNumbers
window.ec.showLogWindow();     
```

## 关闭日志消息窗口

```javascript showLineNumbers
window.ec.closeLogWindow();     
```





### 显示日志消息

```javascript showLineNumbers
window.ec.logd("我是日志");     
```



## 显示启停控制窗口


```javascript showLineNumbers
window.ec.showCtrlWindow();     
```


### 关闭启停控制窗口

```javascript showLineNumbers
window.ec.closeCtrlWindow();     
```


### 打开其他应用程序 openActivity

```javascript showLineNumbers
//打开浏览器下载测试
var m = {
    "action": "android.intent.action.VIEW",
    "uri": "https://imtt.dd.qq.com/16891/apk/55259F8EF9824AF1BF80106B0E00BCD1.apk?"

};
var x = window.ec.openActivity(JSON.stringify(m));
window.ec.logd("x " + x);

var map = {
    "uri": "xx://xx/live/6701887916223941379",
};
window.ec.openActivity(JSON.stringify(map));
```

## 服务状态控制

### 是否是无障碍服务模式

```javascript showLineNumbers
var s = window.ec.isAccMode();
alert(s);     
```



### 是否是代理服务模式

```javascript showLineNumbers
var s = window.ec.isAgentMode();
alert(s);     
```

### 无障碍服务是否已经启动

```javascript showLineNumbers
var s = window.ec.isAccServiceOk();
alert(s);     
```


### 代理服务是否已经启动

```javascript showLineNumbers
var s = window.ec.isAgentServiceOk();
alert(s);     
```


### 启动服务环境

```javascript showLineNumbers
var s = window.ec.startEnv();
alert(s);     
```

## 悬浮窗控制

### 是否有悬浮窗权限

```javascript showLineNumbers
var s = window.ec.hasFloatViewPermission();
alert(s);     
```


### 请求悬浮窗权限

```javascript showLineNumbers
//参数是超时时间，单位是秒
var s = window.ec.requestFloatViewPermission(10);
alert(s);     
```



### 展示浮窗

```javascript showLineNumbers
var m = {
    "path": "main.html",
    "tag": "tag",
    "titleBg": "#888888",
    "x": 10,
    "y": 10,
    "w": 100,
    "h": 200
};
var xd = window.ec.showFloatView(JSON.stringify(m));
alert(xd);     
```



### 关闭浮窗

```javascript showLineNumbers
var m = {
    "path": "main.html",
    "tag": "tag",
    "titleBg": "#888888",
    "x": 10,
    "y": 10,
    "w": 100,
    "h": 200
};
var xd = window.ec.showFloatView(JSON.stringify(m));
setTimeout(function () {
    window.ec.closeFloatView("tag");
}, 3000);
alert(xd);     
```


### 关闭所有浮窗，不包含日志悬浮窗

```javascript showLineNumbers
var m = {
    "path": "main.html",
    "tag": "tag",
    "titleBg": "#888888",
    "x": 10,
    "y": 10,
    "w": 100,
    "h": 200
};
var xd = window.ec.showFloatView(JSON.stringify(m));
setTimeout(function () {
    window.ec.closeAllFloatView();
}, 3000);
alert(xd);     
```



## 定时任务



### 开启一个定时任务
 * 开启一个定时脚本任务
 * @param tag 任务的唯一标示，不能为空，脚本中可以使用readConfigString("jobTaskTag")获取当前tag值，判断是那个任务过来执行的
 * @param execTime 定时时间格式: 2020-04-17 19:20:00，或者直接是秒数字，例如 3，代表3秒后
 * @param cancelBeforeRunning
 * @return 整型 jobid

```javascript showLineNumbers
var time = "2020-04-17 09:00:00";
var id = window.ec.startJob("task1", time, true);
alert("job id " + id);     
```

### 获取所有定时任务TAG

```javascript showLineNumbers
var t = window.ec.getAllJobTag();
alert("job tags " + t);     
```

### 取消所有定时任务

```javascript showLineNumbers
var t = window.ec.cancelAllJob();
alert("job cancel " + t);     
```


### 取消指定TAG定时任务

```javascript showLineNumbers
//参数task1 是创建定时任务的tag值
var t = window.ec.cancelJob("task1");
alert("job cancel " + t);     
```
