---
title: 全局快捷事件
description: EasyClick 自动化脚本 鸿蒙Next自动化 全局快捷事件 资源下载
keywords:
  - EasyClick 自动化脚本 鸿蒙Next自动化 全局快捷事件 资源下载
  - UI
  - boolean
  - 'null'
  - readAllUIConfig2
  - param
  - bool
  - clickPoint
  - longClickPoint
  - doubleClickPoint
  - press
  - EasyClick
  - 手机自动化
  - 自动化测试
  - 脚本开发
  - 安卓自动化
  - iOS自动化
  - 鸿蒙Next
---

## 说明

全局模块中封装的快捷事件

## 读取UI

### readAllUIConfig2 读取UI第二种UI

* 读取UI参数配置
* 设计器在中控界面-UI参数（新版）按钮
* 适配 EC 鸿蒙Next 1.0.0+
* 注意：这个需要使用新版本的UI配置,读取顺序是 优先读取单个设备配置 ，如果单个设备配置无任何数据，就读取 全局配置，
* 返回参数中 含有 \_\_from_global\_\_ 这样的key，代表是来源于全局参数
* @param tmplName 参数组名
* @param forceGlobal 是否强制使用全局，true 代表丢弃单个设备配置，统一使用全局参数
* @return `{json}` JSON数据

```javascript showLineNumbers
function main() {
    var result = readAllUIConfig2("UI示例", false);
    logd(result);
    logd(JSON.stringify(result));
}

main();
```
- 全局配置返回值
```json
{"__from_global__":true,"输入框":"输入框内容","多选框":["多选选项3"],"下拉框":"下拉选项1"}
```
- 单设备返回值
````json
{"输入框":"输入框内容","多选框":["多选选项3"],"下拉框":"下拉选项1"}
````
## 点击函数

### clickPoint 坐标点击

* 点击坐标
* 适配 EC 鸿蒙Next 1.0.0+
* @param x x坐标
* @param y y坐标
* @return `{boolean|布尔型}`

```javascript showLineNumbers
function main() {
    var result = clickPoint(100, 100);
    if (result) {
        logd("点击成功");
    } else {
        logd("点击失败");
    }
}

main();
```


### longClickPoint 坐标长点击

* 长点击坐标
* 适配 EC 鸿蒙Next 1.0.0+
* @param x x坐标
* @param y y坐标
* @return `{boolean|布尔型}`

```javascript showLineNumbers
function main() {
    var result = longClickPoint(100, 100);
    if (result) {
        logd("点击成功");
    } else {
        logd("点击失败");
    }
}

main();
```

### doubleClickPoint 坐标双击

* 双击击坐标
* 适配 EC 鸿蒙Next 1.0.0+
* @param x x坐标
* @param y y坐标
* @return `{boolean|布尔型}`

```javascript showLineNumbers
function main() {
    var result = doubleClickPoint(100, 100);
    if (result) {
        logd("点击成功");
    } else {
        logd("点击失败");
    }
}

main();
```

### press 坐标长按

* 长按住事件
* @param x x坐标
* @param y y坐标
* @param delay 长按时间 毫秒
* @return `{bool}` true 成功 false 失败

```javascript showLineNumbers
function main() {
    var result = press(100, 100, 5000);
    if (result) {
        logd("长按成功");
    } else {
        logd("长按失败");
    }
}

main();
```

## 多点触摸

### multiTouch 多点触摸

* 多点触摸
* 触摸参数: action :一般情况下 按下为0，弹起为1，移动为2，暂停为3
* x: X坐标
* y: Y坐标
* pointer：设置第几个手指触摸点，分别是 1，2，3等，代表第n个手指
* delay: 该动作延迟多少毫秒执行，这个是值当前这个事件先延迟后执行
* @param touch1
  第1个手指的触摸点数组,例如：
  ```[{"action":0,"x":1,"y":1,"pointer":1,"delay":20},{"action":2,"x":1,"y":1,"pointer":1,"delay":20}]```
* @param touch2 第2个手指的触摸点数组
* @param touch3 第3个手指的触摸点数组
* @param touch4 第4个手指的触摸点数组
* @param touch5 第5个手指的触摸点数组
* @param timeout 多点触摸总执行的超时时间，单位是毫秒
* @return `{boolean|布尔型}`

```javascript showLineNumbers
function main() {
    //第一种数组式的写法
    var touch1 = [
        {"action": 0, "x": 500, "y": 1200, "pointer": 1, "delay": 1},
        {"action": 2, "x": 500, "y": 1100, "pointer": 1, "delay": 20},
        {"action": 2, "x": 500, "y": 1000, "pointer": 1, "delay": 20},
        {"action": 1, "x": 1, "y": 1, "pointer": 1, "delay": 2}
    ]
    //第二种链式调用方法
    var touch1 = MultiPoint
        .get()
        .action(0).x(500).y(1200).pointer(1).delay(100)
        .next()
        .action(2).x(500).y(1100).pointer(1).delay(100)
        .next()
        .action(2).x(500).y(1000).pointer(1).delay(100)
        .next()
        .action(2).x(500).y(900).pointer(1).delay(100)
        .next()
        .action(1).x(500).y(800).pointer(1).delay(100);
    var touch2 = MultiPoint
        .get()
        .action(0).x(300).y(1200).pointer(2).delay(100)
        .next()
        .action(2).x(300).y(1100).pointer(2).delay(100)
        .next()
        .action(2).x(300).y(1000).pointer(2).delay(100)
        .next()
        .action(2).x(300).y(900).pointer(2).delay(100)
        .next()
        .action(1).x(300).y(800).pointer(2).delay(100);
    var x = multiTouch(touch1, touch2, null, null, null, 30000);
    logd("xxs " + x);
}

main();
```

## 滑动函数

### swipeToPoint 坐标点滑动

* 从一个坐标滑动到另一个坐标
* @param startX 起始坐标的X轴值
* @param startY 起始坐标的Y轴值
* @param endX 结束坐标的X轴值
* @param endY 结束坐标的Y轴值
* @param speed  滑动速度，值越小 速度越慢
* @return 布尔型 true 滑动成功, false 滑动失败

```javascript showLineNumbers
function main() {
    var result = swipeToPoint(10, 10, 100, 100, 200);
    if (result) {
        logd("滑动成功");
    } else {
        logd("滑动失败");
    }
}

main();
```



## 拖动函数

### drag 拖动坐标

* 从一个坐标到另一个坐标的拖动
* @param startX 起始坐标的X轴值
* @param startY 起始坐标的Y轴值
* @param endX 结束坐标的X轴值
* @param endY 结束坐标的Y轴值
* @param speed 滑动速度，值越小 速度越慢
* @return 布尔型 true 拖动成功, false 拖动失败

```javascript showLineNumbers
function main() {
    var result = drag(10, 10, 100, 100, 200);
    if (result) {
        logd("拖动成功");
    } else {
        logd("拖动失败");
    }
}

main();
```

## 输入数据

### inputText 输入数据

* 输入文字
* @param content 内容
* @return `{bool}` true 成功，false 失败

```javascript showLineNumbers
function main() {
    var result = inputText("我是内容");
    if (result) {
        logd("是");
    } else {
        logd("否");
    }
}

main();
```

### combineKeys 组合键输入数据

* 适配 EC 鸿蒙Next 1.0.0+
* 具体码值请看 [按键值](/hmdocs/zh-cn/advance/keycode)
* @param key1 键1
* @param key2 键1 默认为0即可
* @param key3 键1 默认为0即可
* @return boolean | true 成功 false 失败

```javascript showLineNumbers
function main() {
  var result = combineKeys(2022, 0, 0);
  if (result) {
    logd("是");
  } else {
    logd("否");
  }
}

main();
```


## 屏幕方向

### setOrientation 设置屏幕方向

* 设置屏幕方向，横屏只支持向右旋转90度
* 适配 EC 鸿蒙Next 1.0.0+
* @param orientation 1 正常的竖屏，2 向右旋转90度(顺时针)
* @return `{boolean|布尔型}`

```javascript showLineNumbers
function main() {
    let x = setOrientation(1)
    logd(x)

}

main();
```

### getOrientation 获取屏幕方向

* 获取屏幕方向
* 适配 EC 鸿蒙Next 1.0.0+
* @return int| 1 竖屏，2 横屏 （向右旋转90度(顺时针)）

```javascript showLineNumbers
function main() {
    let x = getOrientation()
    logd(x)
}

main();
```


### lockNode 锁定当前节点

* 锁定当前节点，锁定后，后面就算界面刷新，但是节点还是老的信息，需要和releaseNode进行配合才能进行解锁

```javascript showLineNumbers
function main() {
    logd("锁住节点...")
    //锁住节点，界面刷新也不动
    console.time("1")
    lockNode()
    for (let i = 0; i < 10; i++) {
        let n = text("设置").getOneNodeInfo(1000)
        logd("lock " + n)
    }
    logd("释放节点锁...")
    //释放节点锁
    releaseNode()
    logd(console.timeEnd("1"))

    console.time("1")
    for (var i = 0; i < 10; i++) {
        let n = text("设置").getOneNodeInfo(1000)
        logd("unlocked " + n)
    }
    logd(console.timeEnd("1"))
    //锁住时间明显更短
}

main();
```

### releaseNode 释放节点的锁

* 释放节点的锁，释放后，当界面刷新的时候，节点信息会变成最新的

```javascript showLineNumbers
function main() {
    logd("锁住节点...")
    //锁住节点，界面刷新也不动
    console.time("1")
    lockNode()
    for (let i = 0; i < 10; i++) {
        let n = text("设置").getOneNodeInfo(1000)
        logd("lock " + n)
    }
    logd("释放节点锁...")
    //释放节点锁
    releaseNode()
    logd(console.timeEnd("1"))

    console.time("1")
    for (var i = 0; i < 10; i++) {
        let n = text("设置").getOneNodeInfo(1000)
        logd("unlocked " + n)
    }
    logd(console.timeEnd("1"))
    //锁住时间明显更短
}

main();
```


## 系统按键相关

### home 返回主页

* 返回主页
* @return `{null|布尔型}`

```javascript showLineNumbers
function main() {
    var result = home();
    if (result) {
        logd("成功");
    } else {
        logd("失败");
    }
}

main();
```

### reboot 重启设备

* 重启设备
* @return `{null|布尔型}`

```javascript showLineNumbers
function main() {
    var result = reboot();
    if (result) {
        logd("成功");
    } else {
        logd("失败");
    }
}

main();
```



### lock 锁定屏幕

* 锁定屏幕
* @return `{null|布尔型}`

```javascript showLineNumbers
function main() {
    var result = lock();
    if (result) {
        logd("成功");
    } else {
        logd("失败");
    }
}

main();
```

### unlock 解锁屏幕

* 解锁屏幕，屏幕不能有密码等
* 这个是模拟滑动出来的，实际鸿蒙Next没有这个功能
* 适配 EC 鸿蒙Next 1.0.0+
* @return `{null|布尔型}`

```javascript showLineNumbers
function main() {
    var result = unlock();
    if (result) {
        logd("成功");
    } else {
        logd("失败");
    }
}

main();
```

### openApp 使用bundleID 打开App

* 使用bundleID 打开App
* @param bundleId app的 bundleID
* @return `{boolean}` true 成功，false 失败成功

```javascript showLineNumbers
function main() {
    var result = openApp("com.tencent.wechat");
    if (result) {
        logd("成功");
    } else {
        logd("失败");
    }
}

main();
```

### openUrl 打开Url

* 打开url
* @param url url地址
* @return `{boolean}` true 成功，false 失败成功

```javascript showLineNumbers
function main() {
    var r = openUrl("http://baidu.com");
    logd(r)
}

main();
```

### stopApp 使用bundleID 停止App

* 使用bundleID 停止App
* @param bundleId app的 bundleID
* @return `{boolean}` true 成功，false 失败成功

```javascript showLineNumbers
function main() {
    var result = stopApp("com.tencent.wechat");
    if (result) {
        logd("成功");
    } else {
        logd("失败");
    }
}

main();
```


### installApp 使用 路径 安装app

* 使用 路径 安装app
* @param path hap 的路径 和桥接在同一个电脑上
* @return `{string}` ok 代表 成功，其他字符串 失败

```javascript showLineNumbers
function main() {
    var result = installApp("c:/a.hap");
    logd("result " + result);
    if (result === "ok") {
        logd("成功");
    } else {
        logd("失败");
    }
}

main();
```

### uninstallApp 使用bundleID 卸载app

* 使用bundleID 卸载app (无需启动自动化)
* @param bundleId app的 bundleID
* @return `{string}` ok 代表 成功，其他字符串 失败

```javascript showLineNumbers
function main() {
    var result = uninstallApp("com.test.wechat");
    logd("result " + result);
    if (result === "ok") {
        logd("成功");
    } else {
        logd("失败");
    }
}

main();
```

## 其他函数
### reconnectUsb 闪断USB

* 闪断USB，然后重新链接，相当于物理拔插数据线
* @return `{boolean}` true 成功，false 失败

```javascript showLineNumbers
function main() {
    var result = reconnectUsb();
    logd(result);
}

main();
```
### isReleaseIec 脚本是否是release版本

* 判断脚本是否是release版本
* 适配EC 鸿蒙Next 2.8.0+
* @return `{boolean}` true 是发布版本脚本 false 是debug版本

```javascript showLineNumbers
function main() {
  var result = isReleaseIec();
  logd(result)
}

main();
```

### setAgentTimeout 设置代理请求超时

* @param envTimeout 启动自动化超时时间，单位是毫秒，可以设置为 10000 - 15000
* @param readTimeout 其他的请求超时时间，单位是毫秒，可以设置为 2000 - 5000
* @return `{boolean}` true代表成功

```javascript showLineNumbers
function main() {
    setAgentTimeout(10000, 3000);
}

main();
```

### activeAppInfo 当前运行的程序 bundleId

* @param 当前运行的程序 bundleId
* @return `{string}` 当前运行的程序 bundleId

```javascript showLineNumbers
function main() {
    let d = activeAppInfo();
    logd(d);
}

main();
```



### getLastToast 获取toast数据 

* 获取toast数据
* [必须开启自动化]
* 适配 EC 鸿蒙Next 1.2.0+
* @param timeout 超时时间 单位是毫秒
* @return `{string}` json字符串

```javascript showLineNumbers
function main() {
    let d = getLastToast(5000);
    logd(d);
}

main();
```


## 相册操作

### uploadInsertImage 插入图片到相册

* 插入图片到相册
* 注意鸿蒙Next相册和文件是隔离的，该函数只是将文件推送到文件管理中
* 推送完成后会打开文件管理，需使用脚本找到图片或者视频，进行分享到图库
* 方法1、【单个】进入文件管理-最近栏目，点击图片或者视频，点击分享-选择【保存至图库】
* 方法2、【批量】进入文件管理-浏览栏目，进入我的手机-Download文件夹，选择右上角的功能按钮，点击多选，并选择图片或者视频，点击下方【分享】按钮- 选择保存至图库
* 适配 EC 鸿蒙Next 1.0.0+
* @param localPath 本电脑上的文件路径
* @return `{boolean}` true 代表 成功，false 失败

```javascript showLineNumbers
function main() {
    let d = uploadInsertImage("D:/a.jpg");
    logd(d);
}

main();
```

### uploadInsertVideo 插入视频到相册

* 插入视频到相册
* 注意鸿蒙Next相册和文件是隔离的，该函数只是将文件推送到文件管理中
* 推送完成后会打开文件管理，需使用脚本找到图片或者视频，进行分享到图库
* 方法1、【单个】进入文件管理-最近栏目，点击图片或者视频，点击分享-选择【保存至图库】
* 方法2、【批量】进入文件管理-浏览栏目，进入我的手机-Download文件夹，选择右上角的功能按钮，点击多选，并选择图片或者视频，点击下方【分享】按钮- 选择保存至图库
* 适配 EC 鸿蒙Next 1.0.0+
* @param localPath 本电脑上的文件路径
* @return `{boolean}` true 代表 成功，false 失败

```javascript showLineNumbers
function main() {
    let d = uploadInsertVideo("D:/a.mp4");
    logd(d);
}

main();
```

## 文件操作


### pushFile 推送文件

* 推送本电脑文件到远程
* 适配 EC 鸿蒙Next 1.0.0+
* @param localPath 本电脑上的文件路径
* @param remotePath 远程手机的路径
* @return `{boolean}` true 代表 成功，false 失败
```javascript showLineNumbers
function main() {
    //列出 / 文件夹下的所有文件
    let d = pushFile("c:\\a.jpg", "/data/local/tmp/");
    logd(d);
}

main();
```

### pullFile 推送/获取文件

* 拉取远程文件到本电脑
* 适配 EC 鸿蒙Next 1.0.0+
* @param localPath 本电脑上的文件路径
* @param remotePath 远程手机的路径
* @return `{boolean}` true 代表 成功，false 失败

```javascript showLineNumbers
function main() {
    //拉取文件到本地
    let d = pullFile("/data/local/tmp/a.txt", "c:\\bb.txt");
    logd(d);

}

main();
```
