---
title: EasyClick自动化脚本_iOS脚本_iOS免越狱_iOS免硬件_激活器函数
hide_title: false
hide_table_of_contents: false
sidebar_label: 激活器函数
description: EasyClick 自动化脚本 iOS免越狱 激活器函数
keywords:
  - EasyClick自动化脚本
  - iOS脚本
  - iOS免越狱
  - iOS免硬件
  - 激活器函数
  - tjCenter
  - iOS
  - app
  - param
  - setCenterUrl
  - appLaunch
  - WIFI
  - EC
  - '2.0'
  - return
  - EasyClick
  - 手机自动化
  - 自动化测试
---

# 激活器函数

## 说明

- 激活器模块函数主要是通过运行在电脑设备的激活器对手机进行操作
- 激活器函数模块的对象前缀是 tjCenter
- 调用这个模块，需要手机和激活器程序在同一个局域网，网络互通才行，并且手机通过WIFI或者USB方式链接到电脑
- 脱机激活器 请看 [高级功能 - 脱机激活器教程](/iostjdocs/zh-cn/advance/tjcenter)

## tjCenter.setCenterUrl 设置脱机激活器地址

* 设置脱机激活器所在的地址
* 支持EC iOS脱机版本2.0+
* @param url 激活器地址
* @return `{string}` null或者"" 代表成功，其他代表错误消息

```javascript showLineNumbers
function main() {
    // 一般激活器固定的端口是 8020，只需要修改激活器电脑IP即可
    let set = tjCenter.setCenterUrl("http://192.168.2.6:8020")
    if (set == null || set == "") {
        logd("setCenterUrl  成功: " + set)
    } else {
        logd("setCenterUrl  失败: " + set)
        return
    }
}

main();
```

## tjCenter.appLaunch 启动app

* 通过脱机激活器启动app
* 支持EC iOS脱机版本2.0+
* @param deviceId 设备ID
* @param bundleId 包名
* @param killExist 杀死已存在的进程
* @return `{string}` null或者"" 代表成功，其他代表错误消息

```javascript showLineNumbers
function main() {
    let set = tjCenter.setCenterUrl("http://192.168.2.6:8020")
    if (set == null || set == "") {
        logd("setCenterUrl  成功: " + set)
    } else {
        logd("setCenterUrl  失败: " + set)
        return
    }
    let deviceId = device.getDeviceId()
    logd("current deviceId : " + deviceId)

    let appLaunch = tjCenter.appLaunch(deviceId, "com.tencent.mttlite", false)
    if (appLaunch == null || appLaunch == "") {
        logd("appLaunch  成功 ")
    } else {
        logd("appLaunch  失败: " + appLaunch)
        return
    }
}

main();
```

## tjCenter.appKillByBundleId 启动app

* 通过脱机激活器启动app
* 支持EC iOS脱机版本2.0+
* @param deviceId 设备ID
* @param bundleId 包名
* @param killExist 杀死已存在的进程
* @return `{string}` null或者"" 代表成功，其他代表错误消息

```javascript showLineNumbers
function main() {
    let set = tjCenter.setCenterUrl("http://192.168.2.6:8020")
    if (set == null || set == "") {
        logd("setCenterUrl  成功: " + set)
    } else {
        logd("setCenterUrl  失败: " + set)
        return
    }
    let deviceId = device.getDeviceId()
    logd("current deviceId : " + deviceId)

    let appKillByBundleId = tjCenter.appKillByBundleId(deviceId, "com.tencent.mttlite")
    if (appKillByBundleId == null || appKillByBundleId == "") {
        logd("appKillByBundleId  成功")
    } else {
        logd("appKillByBundleId  失败: " + appKillByBundleId)
        return
    }
}

main();
```

## tjCenter.stopApp 杀死app

* 通过脱机激活器启杀死app(另外一种实现方式)
* 支持EC iOS脱机版本2.0+
* @param deviceId 设备ID
* @param bundleId 包名
* @return `{string}` null或者"" 代表成功，其他代表错误消息

```javascript showLineNumbers
function main() {
    let set = tjCenter.setCenterUrl("http://192.168.2.6:8020")
    if (set == null || set == "") {
        logd("setCenterUrl  成功: " + set)
    } else {
        logd("setCenterUrl  失败: " + set)
        return
    }
    let deviceId = device.getDeviceId()
    logd("current deviceId : " + deviceId)

    let stopApp = tjCenter.stopApp(deviceId, "com.tencent.mttlite")
    if (stopApp == null || stopApp == "") {
        logd("stopApp  成功")
    } else {
        logd("stopApp  失败: " + stopApp)
        return
    }
}

main();
```

## tjCenter.flushDevImage 刷入开发者镜像

* 通过脱机激活器 刷入开发者镜像
* 支持EC iOS脱机版本2.0+
* @param deviceId 设备ID
* @return `{string}` null或者"" 代表成功，其他代表错误消息

```javascript showLineNumbers
function main() {
    let set = tjCenter.setCenterUrl("http://192.168.2.6:8020")
    if (set == null || set == "") {
        logd("setCenterUrl  成功: " + set)
    } else {
        logd("setCenterUrl  失败: " + set)
        return
    }
    let deviceId = device.getDeviceId()
    logd("current deviceId : " + deviceId)

    let devImage = tjCenter.flushDevImage(deviceId)
    if (devImage == null || devImage == "") {
        logd("flushDevImage  成功")
    } else {
        logd("flushDevImage  失败: " + devImage)
        return
    }
}

main();
```

## tjCenter.startAgent 开启agent程序启动自动化

* 通过脱机激活器 开启agent程序
* 前提是需要在激活器的网页上面设置好代理程序bundleId
* 请看 [高级功能 - 脱机激活器教程](/iostjdocs/zh-cn/advance/tjcenter)
* 支持EC iOS脱机版本2.0+
* @param deviceId 设备ID
* @return `{string}` null或者"" 代表成功，其他代表错误消息

```javascript showLineNumbers
function main() {
    let set = tjCenter.setCenterUrl("http://192.168.2.6:8020")
    if (set == null || set == "") {
        logd("setCenterUrl  成功: " + set)
    } else {
        logd("setCenterUrl  失败: " + set)
        return
    }
    let deviceId = device.getDeviceId()
    logd("current deviceId : " + deviceId)
    let agent = tjCenter.startAgent(deviceId)
    if (agent == null || agent == "") {
        logd("startAgent  成功: " + set)
    } else {
        logd("startAgent  失败: " + set)
        return
    }
}

main();
```

## tjCenter.authInit 初始化设备

* 通过脱机激活器 初始化设备
* 前提是需要在激活器的网页上面设置好主程序bundleId
* 一般在网页上点击初始化后，不用调用这个函数
* 请看 [高级功能 - 脱机激活器教程](/iostjdocs/zh-cn/advance/tjcenter)
* 该操作会杀死当前主程序进程后重启
* 支持EC iOS脱机版本2.0+
* @param deviceId 设备ID
* @return `{string}` null或者"" 代表成功，其他代表错误消息

```javascript showLineNumbers
function main() {
    let set = tjCenter.setCenterUrl("http://192.168.2.6:8020")
    if (set == null || set == "") {
        logd("setCenterUrl  成功: " + set)
    } else {
        logd("setCenterUrl  失败: " + set)
        return
    }
    let deviceId = device.getDeviceId()
    logd("current deviceId : " + deviceId)
    let d = tjCenter.authInit(deviceId)
    if (d == null || d == "") {
        logd("authInit  成功: " + set)
    } else {
        logd("authInit  失败: " + set)
        return
    }
}

main();
```

## tjCenter.setWifiCon 开启或关闭WIFI链接电脑

* 开启或者关闭 WIFI链接电脑
* 支持EC iOS脱机版本2.0+
* @param deviceId 设备ID
* @param status 1 开启 2关闭
* @return `{string}` null或者"" 代表成功，其他代表错误消息

```javascript showLineNumbers
function main() {
    let set = tjCenter.setCenterUrl("http://192.168.2.6:8020")
    if (set == null || set == "") {
        logd("setCenterUrl  成功: " + set)
    } else {
        logd("setCenterUrl  失败: " + set)
        return
    }
    let deviceId = device.getDeviceId()
    logd("current deviceId : " + deviceId)
    let d = tjCenter.setWifiCon(deviceId, "1")
    if (d == null || d == "") {
        logd("setWifiCon  成功: " + set)
    } else {
        logd("setWifiCon  失败: " + set)
        return
    }
}

main();
```
