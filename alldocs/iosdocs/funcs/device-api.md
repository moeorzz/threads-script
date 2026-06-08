---
title: 设备函数
description: EasyClick 自动化脚本 iOS免越狱 设备函数
keywords:
  - EasyClick 自动化脚本 iOS免越狱 设备函数
  - device
  - EC
  - iOS
  - getDeviceMsg
  - getOrientationNoAuto
  - getDeviceInfo
  - getScreenWidth
  - USB
  - 9.20.0
  - returns
  - EasyClick
  - 手机自动化
  - 自动化测试
  - 脚本开发
  - 安卓自动化
  - iOS自动化
  - 鸿蒙Next
---

## 说明

- 设备模块函数主要是跟设备信息相关联
- 设备模块的对象前缀是device，
  

## device.getDeviceMsg 获取当前设备的所有运行信息
* 获取当前设备的所有运行信息
* 适配EC iOS USB 9.20.0+
* @returns `{string}` JSON字符串

```javascript showLineNumbers
function main() {
    var xx = device.getDeviceMsg();
    logd(xx);
}

main();
```
## device.getOrientationNoAuto 获取屏幕方向
* 获取屏幕方向
* 无需自动化服务
* 适配EC iOS USB 9.20.0+
* @returns `{*|number}` 1 竖屏 2 横屏

```javascript showLineNumbers
function main() {
    var xx = device.getOrientationNoAuto();
    logd(xx);
}

main();
```


## device.getDeviceInfo 获取设备的信息

* 获取设备的信息
* 适配版本EC iOS 3.2.0+
* 返回的是JSON
* orientation：:方向 1 竖屏 2 横屏
* screenWidth：:屏幕宽度
* screenHeight：:屏幕高度
* orientationClick：当前坐标系方向，1竖屏 2横屏
* deviceId：设备ID
* serialNo：设备序列号
* deviceName：设备名称
* productVersion：设备版本
* model：设备型号
* @return JSON字符串

```javascript showLineNumbers
function main() {
    var xx = device.getDeviceInfo();
    logd(xx);
}

main();
```

## device.getDeviceId 获取id

* 获取手机的id
* @return 字符串

```javascript showLineNumbers
function main() {
    var xx = device.getDeviceId();
    logd(xx);
}

main();
```

## device.getDeviceAlias 获取设备中控别名

* 获取中控设备号别名
* @return string

```javascript showLineNumbers
function main() {
    var xx = device.getDeviceAlias();
    logd(xx);
}

main();
 ```

## device.getSerialNo 获取设备序列号

* 获取设备序列号，在手机的设置中可以查询到
* @return string

```javascript showLineNumbers
function main() {
    var xx = device.getSerialNo();
    logd(xx);
}

main();
```

## device.getDeviceName 获取设备名称

* 获取设备名称，就是手机的名称
* @return string

```javascript showLineNumbers
function main() {
    var xx = device.getDeviceName();
    logd(xx);
}

main();
```

## device.applist 获取程序列表

* 获取当前设备的安装的程序列表
* @return `{string}` json 字符串

```javascript showLineNumbers
function main() {
    var applistx = device.applist();
    logd(applistx);
}

main();
```

## device.getScreenWidthHeightText 取得屏幕宽度高度

* 取得屏幕宽度高度
* @return `{string}` 例如 750,1334

```javascript showLineNumbers
function main() {
    var wh = device.getScreenWidthHeightText();
    logd(wh);
}

main();
```

## device.getScreenWidth 屏幕宽度

* 取得屏幕宽度
* [已过期] 有临界值问题，使用getScreenWidthHeightText替代
* @return 整型

```javascript showLineNumbers
function main() {
    var width = device.getScreenWidth();
    logd(width);
}

main();
```

## device.getScreenWidth 屏幕宽度

* 取得屏幕宽度
* [已过期] 有临界值问题，使用getScreenWidthHeightText替代
* @return 整型

```javascript showLineNumbers
function main() {
    var width = device.getScreenWidth();
    logd(width);
}

main();
```

## device.getScreenHeight 屏幕高度

* 取得屏幕高度
* [已过期] 有临界值问题，使用getScreenWidthHeightText替代
* @return 整型

```javascript showLineNumbers
function main() {
    var height = device.getScreenHeight();
    logd(height);
}

main();
 ```

## device.getScale 屏幕缩放比

* 屏幕缩放比
* @return `{float}`

```javascript showLineNumbers
function main() {
    var d = device.getScale();
    logd(d);
}

main();
 ```

## device.getModel 取得机型

* 取得手机机型
* @return 字符串

```javascript showLineNumbers
function main() {
    var model = device.getModel();
    logd(model);
}

main();
```

## device.getOSVersion 取得手机版本号

* 取得手机版本号
* @return 字符串

```javascript showLineNumbers
function main() {
    var osVersion = device.getOSVersion();
    logd(osVersion);
}

main();
```

## device.getBattery 取得电量

* 取得电量
* @return int型

```javascript showLineNumbers
function main() {
    var res = device.getBattery();
    logd(res);
}

main();
```

## device.isCharging 是否正在充电

* 是否正在充电
* @return 布尔型

```javascript showLineNumbers
function main() {
    var res = device.isCharging();
    logd(res);
}

main();
```

