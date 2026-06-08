---
title: EasyClick自动化脚本_iOS脚本_iOS免越狱_iOS免硬件_设备函数
hide_title: false
hide_table_of_contents: false
sidebar_label: 设备函数
description: EasyClick 自动化脚本 iOS免越狱 设备函数
keywords:
  - EasyClick自动化脚本
  - iOS脚本
  - iOS免越狱
  - iOS免硬件
  - 设备函数
  - device
  - ID
  - iOS
  - Ecid
  - EC
  - iostjdocs
  - zh
  - cn
  - advance
  - tjcenter
  - EasyClick
  - 手机自动化
  - 自动化测试
---

# 设备函数

## 说明

- 设备模块函数主要是跟设备信息相关联
- 设备模块的对象前缀是device，

## device.getDeviceId 获取设备ID

* 获取手机的id
* EC 脱机 2.0.0+以上可以使用，需要配合脱机版激活器才能正确获取到设备ID
* 请看 [高级功能 - 脱机激活器教程](/iostjdocs/zh-cn/advance/tjcenter)
* @return 字符串

```javascript showLineNumbers
function main() {
    var xx = device.getDeviceId();
    logd(xx);
}

main();
```

## device.getEcid 获取Ecid

* 获取Ecid
* EC 脱机 3.11.0+以上可以使用，需要配合脱机版激活器才能正确获取到设备ID
* 请看 [高级功能 - 脱机激活器教程](/iostjdocs/zh-cn/advance/tjcenter)
* @return 字符串

```javascript showLineNumbers
function main() {
    var xx = device.getEcid();
    logd(xx);
}

main();
```

## device.getSerialNo 获取序列号

* 获取序列号
* EC 脱机 3.11.0+以上可以使用，需要配合脱机版激活器才能正确获取到设备ID
* 请看 [高级功能 - 脱机激活器教程](/iostjdocs/zh-cn/advance/tjcenter)
* @return 字符串

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

## device.getDeviceName2 获取设备名称2

* 获取设备名称, 16+ iOS无法获取，请使用这个函数
* EC 脱机 2.0.0+以上可以使用，需要配合脱机版激活器才能正确获取到设备名称
* 请看 [高级功能 - 脱机激活器教程](/iostjdocs/zh-cn/advance/tjcenter)
* @return 字符串

```javascript showLineNumbers
function main() {
    var xx = device.getDeviceName2();
    logd(xx);
}

main();
```

## device.getScreenWidthHeight 屏幕宽度高度

* 屏幕宽度高度
* @return 整型

```javascript showLineNumbers
function main() {
    let aa = device.getScreenWidthHeight()
    logd("getScreenWidthHeight " + aa)
    let bb = aa.split(",")
    logd("width " + bb[0])
    logd("height " + bb[1])
}

main();
```

## device.getScreenWidth 屏幕宽度

* [已过期]
* 取得屏幕宽度
* @return 整型

```javascript showLineNumbers
function main() {
    var width = device.getScreenWidth();
    logd(width);
}

main();
```

## device.getScreenHeight 屏幕高度

* [已过期]
* 取得屏幕高度
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

