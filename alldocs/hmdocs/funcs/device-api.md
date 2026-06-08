---
title: 设备函数
description: EasyClick 自动化脚本 鸿蒙Next自动化 设备函数
keywords:
  - EasyClick 自动化脚本 鸿蒙Next自动化 设备函数
  - device
  - return
  - id
  - EC
  - Next
  - 1.0.0
  - getDeviceInfo
  - getDeviceId
  - getDeviceAlias
  - getScreenState
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

## device.getDeviceInfo 获取设备的信息

* 获取设备的信息
* 适配 EC 鸿蒙Next 1.0.0+
* 例如:

```json showLineNumbers
{
  "screenWidth": "1224",
  "connectType": "USB",
  "deviceAlias": "",
  "groupId": "",
  "screenHeight": "2776",
  "deviceNo": "f615f3adccbe993fd02a33a93d3f5af7c64faf102039bb4f5756a474fdd62bac",
  "deviceId": "f615f3adccbe993fd02a33a93d3f5af7c64faf102039bb4f5756a474fdd62bac",
  "productName": "nova 12 Ultra",
  "serialNo": "2UCUT23C23001051",
  "groupName": "",
  "productVersion": "ADL-AL00U 5.0.0.112(SP1C00E110R1P12)",
  "port": "8026",
  "online": "1",
  "model": "ADA-AL00U",
  "sdkVersion": "13",
  "brand": "HUAWEI"
}
```

* screenWidth：:屏幕宽度
* screenHeight：:屏幕高度
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
* 适配 EC 鸿蒙Next 1.0.0+
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


## device.getScreenState 取得屏幕状态

* 取得屏幕状态
* 适配 EC 鸿蒙Next 1.0.0+
* @return `{string}` 例如 INACTIVE ,SLEEP, AWAKE

```javascript showLineNumbers
function main() {
  var xx = device.getScreenState();
  logd(xx);
}

main();
 ```

## device.getSerialNo 获取设备序列号

* 获取设备序列号
* @return string

```javascript showLineNumbers
function main() {
  var xx = device.getSerialNo();
  logd(xx);
}

main();
```



## device.applist 获取程序列表

* 获取当前设备的安装的程序列表
* @return `{string}` 应用包名，用逗号隔开的

```javascript showLineNumbers
function main() {
    let applist = device.applist();
    if (applist) {
        let applist_arr = applist.split(",")
        for (let i = 0; i < applist_arr.length; i++) {
            logd(applist_arr[i])
        }
    }
}

main();
```




## device.getScreenSize 取得屏幕宽度高度

* 取得屏幕宽度
* @return `{string}` 例如 750,1334

```javascript showLineNumbers
function main() {
  var width = device.getScreenSize();
  logd(width);
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

## device.getSdkVersion 取得手机版本号

* 取得手机SDK版本号 例如 10 等字符串
* @return 字符串

```javascript showLineNumbers
function main() {
  var osVersion = device.getSdkVersion();
  logd(osVersion);
}

main();
```

## device.getBattery 取得电量

* 取得电量
* @return `{int}` 1 - 100

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

