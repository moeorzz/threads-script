---
title: 全局快捷事件
description: EasyClick 自动化脚本 iOS免越狱 全局快捷事件 资源下载
keywords:
  - EasyClick 自动化脚本 iOS免越狱 全局快捷事件 资源下载
  - UI
  - param
  - return
  - readAllUIConfig
  - readAllUIConfig2
  - clickPoint
  - clickPointPressure
  - tmplName
  - JSON
  - longClickPoint
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

### readAllUIConfig 读取UI

* 读取所有UI配置
* @param tmplName UI模板文件名称
* @return `{json}` JSON数据

```javascript showLineNumbers
function main() {
    var result = readAllUIConfig("抖音模板");
    logd(result);
    logd(JSON.stringify(result));
}

main();
```

### readAllUIConfig2 读取UI第二种UI

* 读取UI参数配置
* 设计器在中控界面-UI参数（新版）按钮
* 适合EC iOS USB版 6.28.0+
* 注意：这个需要使用新版本的UI配置,读取顺序是 优先读取单个设备配置 ，如果单个设备配置无任何数据，就读取 全局配置，
* 返回参数中 含有 \_\_from_global\_\_ 这样的key，代表是来源于全局参数
* @param tmplName 参数组名
* @param forceGlobal 是否强制使用全局，true 代表丢弃单个设备配置，统一使用全局参数
* @return `{json}` JSON数据

```javascript showLineNumbers
function main() {
    var result = readAllUIConfig2("抖音模板", false);
    logd(result);
    logd(JSON.stringify(result));
}

main();
```

## 点击函数

### clickPoint 坐标点击

* 点击坐标
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

### clickPointPressure 带压力点击坐标

* 带压力点击坐标
* 适合 EC iOS 6.4.0+
* @param x x坐标
* @param y y坐标
* @param pressure 压力值 0 -1 区间
* @return `{boolean|布尔型}`

```javascript showLineNumbers
function main() {
    var result = clickPointPressure(100, 100, 0.2);
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
* @param duration 持续时长 单位毫秒
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

### swipeToPointPressure 带压力坐标点滑动

* 从一个坐标滑动到另一个坐标
* 支持版本EC 中控 6.4.0+
* @param startX 起始坐标的X轴值
* @param startY 起始坐标的Y轴值
* @param endX 结束坐标的X轴值
* @param endY 结束坐标的Y轴值
* @param duration 持续时长 单位毫秒
* @param pressure 压力， 0 - 1之间
* @return 布尔型 true 滑动成功, false 滑动失败

```javascript showLineNumbers
function main() {
    var result = swipeToPointPressure(10, 10, 100, 100, 200, 0.2);
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
* @param duration 持续时长 单位毫秒
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
* @param duration 执行时间，单位是毫秒
* @return `{bool}` true 成功，false 失败

```javascript showLineNumbers
function main() {
    var result = inputText("我是内容", 100);
    if (result) {
        logd("是");
    } else {
        logd("否");
    }
}

main();
```

### typingText 输入数据

* 输入文字,模拟打字
* EC IOS 6.1.0+
* @param content 内容
* @return `{bool}` true 成功，false 失败

```javascript showLineNumbers
function main() {
    var result = typingText("我是内容");
    if (result) {
        logd("是");
    } else {
        logd("否");
    }
}

main();
```

### ioHIDEvent 模拟键盘

* 模拟人机交互，例如键盘输入和快捷键，具体健值请看
* <a href="https://ieasyclick.com/iosdocs/zh-cn/advance/keyboard">https://ieasyclick.com/iosdocs/zh-cn/advance/keyboard</a>
* @param eventPageID 人机交互类型
* @param eventUsageID 人机交互值
* @param delay 时长一般设置为 0.2 即可，可能有延迟
* @return `{boolean|布尔型}`

```javascript showLineNumbers
function main() {
    let x = ioHIDEvent("0x07", "0x11", 0.2)
    logd(x)

}

main();
```

## 屏幕方向

### setOrientation 设置屏幕方向

* 设置屏幕方向，横屏只支持向右旋转90度
* 适配版本 EC iOS 中控 3.0.0+
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
* 适配版本 EC iOS 中控 3.0.0+
* @return int| 0 竖屏，1 横屏 （向右旋转90度(顺时针)）

```javascript showLineNumbers
function main() {
    let x = getOrientation()
    logd(x)
}

main();
```

### adjustScreenOrientation 校正屏幕方向

* 校正屏幕方向，适配坐标系
* 适配版本 EC iOS 中控 3.0.0+
* @param orientation 0 自动校正坐标系 1 强制竖屏坐标系，2 强制向右旋转90度(顺时针)坐标系
* @return JSON字符串，里面的key分别是 orientation, screenWidth, screenHeight

```javascript showLineNumbers
function main() {
    logd(setOrientation(1))
    sleep(1000)
    logd(getOrientation())
    logd("adjustScreenOrientation {}", adjustScreenOrientation(0))
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
* 适合 EC iOS 3.5.0+
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

### homeScreen 强制进入主页

* 强制进入主页
* 适配 EC iOS 中控 3.0.0+
* @return `{null|布尔型}`

```javascript showLineNumbers
function main() {
    var result = homeScreen();
    if (result) {
        logd("成功");
    } else {
        logd("失败");
    }
}

main();
```

### isLocked 屏幕是否是锁定状态

* 屏幕是否是锁定状态
* 适配 EC iOS 中控 3.0.0+
* @return `{null|布尔型}`

```javascript showLineNumbers
function main() {
    var result = isLocked();
    if (result) {
        logd("成功");
    } else {
        logd("失败");
    }
}

main();
```

### lockScreen 锁定屏幕

* 锁定屏幕
* 适配 EC iOS 中控 3.0.0+
* @return `{null|布尔型}`

```javascript showLineNumbers
function main() {
    var result = lockScreen();
    if (result) {
        logd("成功");
    } else {
        logd("失败");
    }
}

main();
```

### unlockScreen 解锁屏幕

* 解锁屏幕，屏幕不能有密码等
* 适配 EC iOS 中控 3.0.0+
* @return `{null|布尔型}`

```javascript showLineNumbers
function main() {
    var result = unlockScreen();
    if (result) {
        logd("成功");
    } else {
        logd("失败");
    }
}

main();
```

### openApp 使用bundleID 打开App

* 使用bundleID 打开App, 这个不同于appLaunch函数，这个通过命令进行的
* @param bundleId app的 bundleID
* @return `{boolean}` true 成功，false 失败成功

```javascript showLineNumbers
function main() {
    var result = openApp("com.tencent.xin");
    if (result) {
        logd("成功");
    } else {
        logd("失败");
    }
}

main();
```

### openUrl 打开Url

* 打开url，注意：需要重新在前台运行，先调用 takeMeToFront 函数，将本程序放前台
* @param url url地址
* @return `{boolean}` true 成功，false 失败成功

```javascript showLineNumbers
function main() {
    takeMeToFront()
    sleep(1000)
    var r = openUrl("http://baidu.com");
    logd(r)
}

main();
```

### stopApp 使用bundleID 停止App

* 使用bundleID 停止App, 这个不同于 appKillByBundleId 函数，这个通过命令进行的
* @param bundleId app的 bundleID
* @return `{boolean}` true 成功，false 失败成功

```javascript showLineNumbers
function main() {
    var result = stopApp("com.tencent.xin");
    if (result) {
        logd("成功");
    } else {
        logd("失败");
    }
}

main();
```

### appLaunchByPrefix 按前缀运行程序

* 按照包名前缀查找并且运行程序
* @param bundleIdPrefix app的 bundleID 前缀，多个用英文,逗号隔开
* @return `{boolean}` true代表成功

```javascript showLineNumbers
function main() {
    var result = appLaunchByPrefix("com.tencent.xin,123");
    if (result) {
        logd("成功");
    } else {
        logd("失败");
    }
}

main();
```

### appLaunch 运行程序

* 运行程序
* 不需要开启自动化
* @param bundleId app的 bundleID
* @return int 整型 进程的id

```javascript showLineNumbers
function main() {
    var result = appLaunch("com.tencent.xin");
    if (result > 0) {
        logd("成功");
    } else {
        logd("失败");
    }
}

main();
```

### appLaunchEx 打开一个app

* 打开一个app
* 适配EC iOS USB版本 6.25.0+
* 需要开启自动化
* @param bundleId app的bundleID
* @param ignoreState 1 忽略之前打开的状态，直接打开，其他填写 ""
* @return `{boolean}` true 代表成功

```javascript showLineNumbers
function main() {
    var result = appLaunchEx("com.tencent.xin", "1");
    if (result) {
        logd("成功");
    } else {
        logd("失败");
    }
}

main();
```

### appKillByBundleId 杀死程序

* 使用bundleID杀死一个进程
* 不需要开启自动化
* @param bundleId app的 bundleID
* @return `{boolean}` true 成功，false 失败成功

```javascript showLineNumbers
function main() {
    var result = appKillByBundleId("com.tencent.xin");
    if (result) {
        logd("成功");
    } else {
        logd("失败");
    }
}

main();
```

### appKillByBundleIdEx 杀死程序

* 使用bundleID杀死一个进程
* 适配EC iOS USB版本 6.25.0+
* 需要开启自动化
* @param bundleId app的 bundleID
* @param ignoreState 1 忽略之前打开的状态，直接杀掉进程，其他填写 ""
* @return `{boolean}` true 成功，false 失败

```javascript showLineNumbers
function main() {
    var result = appKillByBundleIdEx("com.tencent.xin", "1");
    if (result) {
        logd("成功");
    } else {
        logd("失败");
    }
}

main();
```

### installApp 使用 路径 安装app

* 使用 路径 安装app (无需启动自动化)
* @param bundleId app的 bundleID
* @param path ipa的路径 和桥接在同一个电脑上
* @return `{string}` ok 代表 成功，其他字符串 失败

```javascript showLineNumbers
function main() {
    var result = installApp("com.test.xin", "c:/a.ipa");
    logd("result " + result);
    if (result == "ok") {
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
    var result = uninstallApp("com.test.xin");
    logd("result " + result);
    if (result == "ok") {
        logd("成功");
    } else {
        logd("失败");
    }
}

main();
```

## 其他函数

### setAssistiveTouch 悬浮球开关

* 开关辅助触摸 悬浮球功能
* 适合EC IOS 6.0.0+
* @param open true代表打开，false代表隐藏
* @return `{boolean}` true代表成功 false代表失败

```javascript showLineNumbers
function main() {
    var result = setAssistiveTouch(true);
    logd(result);
}

main();
```

### resetUsbConn 重置usb链接

* 重置USB链接，如果开起来自动化可以使用这个尝试
* @return `{boolean}` true 成功，false 失败

```javascript showLineNumbers
function main() {
    var result = resetUsbConn();
    logd(result);
}

main();
```

### reconnectUsb 闪断USB

* 闪断USB，然后重新链接，相当于物理拔插数据线
* 适配EC 7.2.0+
* @return `{boolean}` true 成功，false 失败

```javascript showLineNumbers
function main() {
    var result = reconnectUsb();
    logd(result);
}

main();
```

### setAgentSetting 设置代理程序的配置

* 设置代理程序的配置
* @param ext 是一个map，例如 ```{"screenStreamQuality":100}```
* screenStreamQuality 代表投屏质量 1 - 100
* screenStreamFramerate 代表投屏帧率 10 - 60
* @return `{bool}` true 成功，false 失败

```javascript showLineNumbers
function main() {
    // 如果不想设置某个属性，可以不在map填写
    var result = setAgentSetting({"screenStreamQuality": 60, "screenStreamFramerate": 20});
    logd(result);
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


### erasePhone 恢复出厂设置

* 恢复出厂设置(抹机)
* 适配EC iOS USB 8.10.0+
* 这个函数慎用，会抹除设备数据，调用函数后会自动化重启设备
* @return `{boolean}` true 成功，false 失败

```javascript showLineNumbers
function main() {
    let d = erasePhone();
    logd(d);
}

main();
```


## 相册操作

### uploadInsertImage 插入图片到相册

* 通过代理ipa插入图片到相册
* 适合EC IOS 6.5.0 +
* @param path 图片路径
* @return `{boolean}` true 成功，false 失败

```javascript showLineNumbers
function main() {
    let d = uploadInsertImage("D:/a.jpg");
    logd(d);
}

main();
```

### uploadInsertVideo 插入视频到相册

* 通过代理ipa插入视频到相册
* 适合EC IOS 6.5.0 +
* @param path 视频路径
* @return `{boolean}` true 成功，false 失败

```javascript showLineNumbers
function main() {
    let d = uploadInsertVideo("D:/a.mp4");
    logd(d);
}

main();
```

## 文件操作

:::tip
由于iOS的沙盒隔离机制，文件操作不能操作所有的文件夹，只能是app开放共享或者是系统指定的目录，例如/Downloads，/DCIM等文件夹
:::

### fsyncFileOpr iOS设备中文件操作

* iOS设备中文件操作
* 适配EC 7.2.0+
* @param action 动作，分别有 list= 遍历文件或者文件夹，rm= 删除文件或者文件夹，mkdir = 建立文件夹
* @param path 文件路径
* @return `{JSON}`,code=0 代表成功，data代表数据，当action=list的时候，data是一个数组即可，返回包含文件列表的路径、大小等参数

```javascript showLineNumbers
function main() {
    //列出 / 文件夹下的所有文件
    let d = fsyncFileOpr("list", "/");
    logd(JSON.stringify(d));
    //列出/Downloads下的所有文件
    d = fsyncFileOpr("list", "/Downloads");
    logd(JSON.stringify(d));


    //新建文件夹
    d = fsyncFileOpr("mkdir", "/Downloads/123");
    logd(JSON.stringify(d));

    // 删除文件夹或者文件夹
    d = fsyncFileOpr("rm", "/Downloads/123.txt");
    logd(JSON.stringify(d));
}

main();
```

### fsyncFilePushPull 推送/获取文件

* 推送、获取文件文件到iOS设备
* 适配EC 7.2.0+
* @param action 动作，分别有 push = 从电脑推送文件到远程设备中，pull = 从设备中拉取文件到电脑
* @param srcPath 源文件路径，action=push的时候，这个是电脑的文件路径，action= pull 的时候，这个是iOS中的文件路径
* @param destPath 目标文件路径 action= push 的时候，这个是iOS中的文件路径，action= pull 的时候，这个是电脑的文件路径
* @return `{json}` code=0 代表成功

```javascript showLineNumbers
function main() {
    //推送C:/a.txt文件到IOS设备的 /Downloads/a.txt
    let d = fsyncFilePushPull("push", "C:/a.txt", "/Downloads/a.txt");
    logd(JSON.stringify(d));
    //拉取文件到本地
    d = fsyncFilePushPull("pull", "/Downloads/a.txt", "c:/bb.txt");
    logd(JSON.stringify(d));

}

main();
```
