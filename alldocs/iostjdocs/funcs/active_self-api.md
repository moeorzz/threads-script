---
title: 自激活函数
description: EasyClick 自动化脚本 iOS免越狱 自激活函数
keywords:
  - EasyClick 自动化脚本 iOS免越狱 自激活函数
  - activeSelf
  - LocalDevVpn
  - openLocalDevVpn
  - disableLocalDevVpn
  - mountImageOk
  - openApp
  - killApp
  - IPA
  - VPN
  - EC
  - EasyClick
  - 手机自动化
  - 自动化测试
  - 脚本开发
  - 安卓自动化
  - iOS自动化
  - 鸿蒙Next
---

## 说明

- 自激活模块目标是实现无电脑情况下对手机进行最大权限的操作，比如重启手机等
- 这个模块所有功能的前提是完成自激活的配置，详情请看 [高级功能-自激活配置](/iostjdocs/zh-cn/advance/activemyself)

:::tip

- 想要实现代理IPA永生，先完成自激活的配置，检测代理没有反应后使用killApp函数杀死，再使用openApp重启代理IPA
  :::

## activeSelf.openLocalDevVpn 打开LocalDevVpn

* 打开LocalDevVpn 链接VPN
* 需要主程序在前台才能打开
* 适配EC 脱机版 6.1.0+
* @returns `{boolean}` true 代表成功 false 代表失败

```javascript showLineNumbers
function main() {
    // 打开外部的LocalDevVpn APP并且进行链接
    var data = activeSelf.openLocalDevVpn();
    logd(data);
    sleep(3000)
    activeSelf.disableLocalDevVpn();
}

main();
```

## activeSelf.disableLocalDevVpn 断开LocalDevVpn

* 断开 LocalDevVpn 链接VPN
* 需要主程序在前台才能打开
* 适配EC 脱机版 6.1.0+
* @returns `{boolean}` true 代表成功 false 代表失败

```javascript showLineNumbers
function main() {
    // 打开外部的LocalDevVpn APP并且进行链接
    var data = activeSelf.disableLocalDevVpn();
    logd(data);
    sleep(3000)
    activeSelf.disableLocalDevVpn();
}

main();
```

## activeSelf.mountImageOk 开发者镜像是否刷入成功

* 开发者镜像是否刷入成功
* 适配EC 脱机版 6.1.0+
* @returns `{boolean}` true 代表成功 false 代表失败

```javascript showLineNumbers
function main() {
    var data = activeSelf.mountImageOk();
    logd(data);
}

main();
```

## activeSelf.startActiveMySelf 启动自激活

* 启动自激活，请细看 自激活 章节的配置文档
* 适配EC 脱机版 6.1.0+
* @param timeout 超时时间 单位是毫秒
* @returns `{JSON}` code = 0 代表成功，msg 代表错误信息

```javascript showLineNumbers
function testactive1_ext_vpn() {
    logd("testactive1_self_vpn")

    activeSelf.openSelfVpn();
    // 休眠一下 防止捕捉不到vpn的错误消息
    sleep(3000)
    let ar = activeSelf.getOpenSelfVpnError()
    if (ar != "") {
        loge("打开自带VPN失败")
        loge("错误消息是: " + activeSelf.getOpenSelfVpnError())
        return false;
    }
    sleep(2000)

    let acData = activeSelf.startActiveMySelf(30000);
    if (!acData) {

        loge("自激活失败，无任何返回");
        return false;
    }
    if (acData["code"] != 0) {
        loge("自激活失败, err : " + acData["msg"]);
        return false;
    }
    logd("自激活成功!!")
    logd("mount -> " + activeSelf.mountImageOk())
    activeSelf.disableSelfVpn();
    return true;
}

function main() {
    testactive1_ext_vpn();
}

main();
```

## activeSelf.openApp 打开APP

* 通过 bundleId 打开一个app 
* 如果你打开的是代理IPA
* 记得先自激活一次 调用 activeSelf.startActiveMySelf
* 挂载镜像 防止起不了代理ipa
* 适配EC 脱机版 6.1.0+
* @param bundleId 要启动的bundleid
* @param start_suspended 好像没什么意义，写0就行
* @param kill_existing 1 = 杀死存在的进程，好像不成功，写0就行
* @param timeout 超时时间 单位是毫秒
* @returns `{JSON}` code = 0 代表成功，msg 代表错误信息，data 代表成功后的pid

```javascript showLineNumbers
function testOpenApp() {
    // 如果你打开的是代理IPA 
    // 记得先自激活一次 调用 activeSelf.startActiveMySelf
    // 挂载镜像 防止起步不代理ipa
    logd("testOpenApp")
    activeSelf.openSelfVpn();
    // 休眠一下 防止捕捉不到vpn的错误消息
    sleep(5000)
    let ar = activeSelf.getOpenSelfVpnError()
    if (ar != "") {
        loge("打开自带VPN失败")
        loge("错误消息是: " + activeSelf.getOpenSelfVpnError())
        activeSelf.disableSelfVpn();
        return false;
    }
    sleep(2000)
    // 代理ipa的 bundleId
    let runner = "com.cy.ceshi";

    let rsd = activeSelf.openApp(runner, 0, 0,30000)
    if (!rsd) {
        loge("打开失败")
        activeSelf.disableSelfVpn();
        return false;
    }
    if (rsd["code"] != 0) {
        loge("打开失败, err : " + rsd["msg"]);
        activeSelf.disableSelfVpn();
        return false;
    }
    logd(JSON.stringify(rsd))

    logd("打开app成功")
    activeSelf.disableSelfVpn();
    return true;
}

function main() {
    testOpenApp();
}

main();
```

## activeSelf.killApp 杀死app

* 通过 bundleId 杀死一个app
* 适配EC 脱机版 6.1.0+
* @param bundleId 要启动的bundleid
* @param timeout 超时时间 单位是毫秒
* @returns `{JSON}` code = 0 代表成功，msg 代表错误信息

```javascript showLineNumbers
function testKillApp() {
    logd("testKillApp")
    activeSelf.openSelfVpn();
    // 休眠一下 防止捕捉不到vpn的错误消息
    sleep(5000)
    let ar = activeSelf.getOpenSelfVpnError()
    if (ar != "") {
        loge("打开自带VPN失败")
        loge("错误消息是: " + activeSelf.getOpenSelfVpnError())
        activeSelf.disableSelfVpn();
        return false;
    }
    sleep(2000)
    // 代理ipa的 bundleId
    let runner = "com.cy.ceshi";
    let rsd = activeSelf.killApp(runner,30000)
    if (!rsd) {
        loge("杀死进程失败")
        activeSelf.disableSelfVpn();
        return false;
    }
    if (rsd["code"] != 0) {
        loge("杀死进程失败, err : " + rsd["msg"]);
        activeSelf.disableSelfVpn();
        return false;
    }
    logd(JSON.stringify(rsd))
    logd("杀死app进程成功")
    activeSelf.disableSelfVpn();
    return true;
}

function main() {
    testKillApp();
}

main();
```

## activeSelf.listApps 获取应用列表

* 获取安装应用列表
* 适配EC 脱机版 6.1.0+
* 返回参数解释:
* ApplicationType= 应用类型，
* CFBundleIdentifier=bundleId也就是包名，
* CFBundleDisplayName=应用名称，
* CFBundleShortVersionString=版本，
* CFBundleURLSchemes=URLSchemes
* @param type System= 系统应用，User= 用户安装应用，Any=所有应用
* @param timeout 超时时间 单位是毫秒
* @returns `{JSON} `code = 0 代表成功，msg 代表错误信息，data是应用列表数组数据

```javascript showLineNumbers
function testAppList() {
    logd("testAppList")
    activeSelf.openSelfVpn();
    // 休眠一下 防止捕捉不到vpn的错误消息
    sleep(5000)
    let ar = activeSelf.getOpenSelfVpnError()
    if (ar != "") {
        loge("打开自带VPN失败")
        loge("错误消息是: " + activeSelf.getOpenSelfVpnError())
        activeSelf.disableSelfVpn();
        return false;
    }
    sleep(2000)
    let rsd = activeSelf.listApps("User",30000)
    if (!rsd) {
        loge("获取应用列表失败")
        activeSelf.disableSelfVpn();
        return false;
    }
    if (rsd["code"] != 0) {
        loge("获取应用列表失败, err : " + rsd["msg"]);
        activeSelf.disableSelfVpn();
        return false;
    }
    logd("获取应用列表: " + JSON.stringify(rsd.data))
    activeSelf.disableSelfVpn();
    return true;
}

function main() {
    testAppList();
}

main();
```

## activeSelf.listProcess 获取进程列表

* 获取进程列表
* 适配EC 脱机版 6.1.0+
* name=进程名称
* isApplication=是否是可见的应用程序
* realAppName=真实运行路径
* pid=进程id
* @param timeout 超时时间 单位是毫秒
* @returns `{JSON}` code = 0 代表成功，msg 代表错误信息，data是应用列表数组数据

```javascript showLineNumbers
function testAppList() {
    logd("testAppList")
    activeSelf.openSelfVpn();
    // 休眠一下 防止捕捉不到vpn的错误消息
    sleep(5000)
    let ar = activeSelf.getOpenSelfVpnError()
    if (ar != "") {
        loge("打开自带VPN失败")
        loge("错误消息是: " + activeSelf.getOpenSelfVpnError())
        activeSelf.disableSelfVpn();
        return false;
    }
    sleep(2000)
    let rsd = activeSelf.listProcess(30000)
    if (!rsd) {
        loge("获取进程列表失败")
        activeSelf.disableSelfVpn();
        return false;
    }
    if (rsd["code"] != 0) {
        loge("获取进程列表失败, err : " + rsd["msg"]);
        activeSelf.disableSelfVpn();
        return false;
    }
    logd("获取进程列表: " + JSON.stringify(rsd.data))
    activeSelf.disableSelfVpn();
    return true;
}

function main() {
    testAppList();
}

main();
```

## activeSelf.reboot 重启设备

* 重启设备
* 适配EC 脱机版 6.1.0+
* @param timeout 超时时间 单位是毫秒
* @returns `{JSON}` code = 0 代表成功，msg 代表错误信息

```javascript showLineNumbers
function testReboot() {
    activeSelf.openSelfVpn();
    // 休眠一下 防止捕捉不到vpn的错误消息
    sleep(5000)
    let ar = activeSelf.getOpenSelfVpnError()
    if (ar != "") {
        loge("打开自带VPN失败")
        loge("错误消息是: " + activeSelf.getOpenSelfVpnError())
        activeSelf.disableSelfVpn();
        return false;
    }
    sleep(2000)
    let rsd = activeSelf.reboot(30000)
    if (!rsd) {
        loge("重启失败")
        activeSelf.disableSelfVpn();
        return false;
    }
    if (rsd["code"] != 0) {
        loge("重启失败, err : " + rsd["msg"]);
        activeSelf.disableSelfVpn();
        return false;
    }
    logd("重启: " + JSON.stringify(rsd.data))
    return true;
}

function main() {
    testReboot();
}

main();
```

## activeSelf.killAppByPid 杀死进程

* 通过 pid 杀死一个app
* 适配EC 脱机版 6.1.0+
* @param pid 进程pid，整数
* @param timeout 超时时间 单位是毫秒
* @returns `{JSON}` code = 0 代表成功，msg 代表错误信息

```javascript showLineNumbers
function test_killAppByPid() {
    activeSelf.openSelfVpn();
    // 休眠一下 防止捕捉不到vpn的错误消息
    sleep(5000)
    let ar = activeSelf.getOpenSelfVpnError()
    if (ar != "") {
        loge("打开自带VPN失败")
        loge("错误消息是: " + activeSelf.getOpenSelfVpnError())
        activeSelf.disableSelfVpn();
        return false;
    }
    sleep(2000)
    // pid 通过获取进程列表 获得
    let rsd = activeSelf.killAppByPid(123,30000)
    if (!rsd) {
        loge("杀死进程失败")
        activeSelf.disableSelfVpn();
        return false;
    }
    if (rsd["code"] != 0) {
        loge("杀死进程失败, err : " + rsd["msg"]);
        activeSelf.disableSelfVpn();
        return false;
    }
    logd("杀死进程: " + JSON.stringify(rsd.data))
    return true;
}

function main() {
    test_killAppByPid();
}

main();
```



## activeSelf.installApp 安装ipa

* 安装应用
* 适配EC 脱机版 6.2.0+
* @param path ipa的文件路径
* @param timeout 超时时间，单位是毫秒
* @returns `{JSON}` code = 0 代表成功，msg 代表错误信息

```javascript showLineNumbers
function test_installApp() {
    activeSelf.openSelfVpn();
    // 休眠一下 防止捕捉不到vpn的错误消息
    sleep(5000)
    let ar = activeSelf.getOpenSelfVpnError()
    if (ar != "") {
        loge("打开自带VPN失败")
        loge("错误消息是: " + activeSelf.getOpenSelfVpnError())
        activeSelf.disableSelfVpn();
        return false;
    }
    sleep(2000)
    // 先自激活一次 防止镜像挂载不上
    activeSelf.startActiveMySelf(30000)
    let filepath = file.getSandBoxFilePath("ddd.ipa")
    let rsd = activeSelf.installApp(filepath, 30000)
    if (!rsd) {
        loge("安装失败")
        activeSelf.disableSelfVpn();
        return false;
    }
    if (rsd["code"] != 0) {
        loge("安装失败, err : " + rsd["msg"]);
        activeSelf.disableSelfVpn();
        return false;
    }
    logd("安装成功")
    return true;
}

function main() {
    test_installApp();
}

main();
```



## activeSelf.uninstallApp 卸载应用

* 卸载应用
* @param bundleId 卸载的bundleId包名
* @param timeout 超时时间，单位是毫秒
* @returns `{JSON}` code = 0 代表成功，msg 代表错误信息

```javascript showLineNumbers
function test_uninstallApp() {
    activeSelf.openSelfVpn();
    // 休眠一下 防止捕捉不到vpn的错误消息
    sleep(5000)
    let ar = activeSelf.getOpenSelfVpnError()
    if (ar != "") {
        loge("打开自带VPN失败")
        loge("错误消息是: " + activeSelf.getOpenSelfVpnError())
        activeSelf.disableSelfVpn();
        return false;
    }
    sleep(2000)
    // 先自激活一次 防止镜像挂载不上
    activeSelf.startActiveMySelf(30000)
    let bundleId="com.cy.ceshi"
    let rsd = activeSelf.uninstallApp(bundleId, 30000)
    if (!rsd) {
        loge("安装失败")
        activeSelf.disableSelfVpn();
        return false;
    }
    if (rsd["code"] != 0) {
        loge("安装失败, err : " + rsd["msg"]);
        activeSelf.disableSelfVpn();
        return false;
    }
    logd("安装成功")
    return true;
}

function main() {
    test_uninstallApp();
}

main();
```





## activeSelf.deviceOrientation 屏幕方向

*
* 屏幕方向
* 适配EC 脱机版 6.5.0+
* @param timeout 超时时间 单位是毫秒
* @returns `{JSON}` code = 0 代表成功，msg 代表错误信息，data是 方向，1代表竖屏 2横屏 0未知

```javascript showLineNumbers
function test_active_screenshot() {
    let ss = activeSelf.deviceOrientation(10000)
    if (ss) {
        logd("当前屏幕方向:  " + ss["data"])
    }
    logd("开始截图 ")
    console.time(1)
    let img = activeSelf.screenshot(10000)
    logd(img)
    if (img) {
        logd(img.getWidth() + "," + img.getHeight())
        let path = file.getSandBoxFilePath("test.png")
        logd("保存到路径: " + path)
        img.saveTo(path)
        img.recycle()
    }
    logd("end，消耗时间(ms) ", console.timeEnd(1))
    sleep(300000)
}



function start() {
    activeSelf.openSelfVpn();
    // 休眠一下 防止捕捉不到vpn的错误消息
    sleep(5000)
    let ar = activeSelf.getOpenSelfVpnError()
    if (ar != "") {
        loge("打开自带VPN失败")
        loge("错误消息是: " + activeSelf.getOpenSelfVpnError())
        activeSelf.disableSelfVpn();
        return false;
    }
    sleep(2000)
    // 先自激活一次 防止镜像挂载不上
    activeSelf.startActiveMySelf(30000)
    test_active_screenshot()
    return true;
}

function main() {
    start();
}

main();
```






## activeSelf.screenshot 截图

* 截图
* 适配EC 脱机版 6.5.0+
* @param timeout 超时时间 单位是毫秒
* @returns `{AutoImage}` 返回 null，代表没有截图成功

```javascript showLineNumbers
function test_active_screenshot() {
    let ss = activeSelf.deviceOrientation(10000)
    if (ss) {
        logd("当前屏幕方向:  " + ss["data"])
    }
    logd("开始截图 ")
    console.time(1)
    let img = activeSelf.screenshot(10000)
    logd(img)
    if (img) {
        logd(img.getWidth() + "," + img.getHeight())
        let path = file.getSandBoxFilePath("test.png")
        logd("保存到路径: " + path)
        img.saveTo(path)
        img.recycle()
    }
    logd("end，消耗时间(ms) ", console.timeEnd(1))
    sleep(300000)
}



function start() {
    activeSelf.openSelfVpn();
    // 休眠一下 防止捕捉不到vpn的错误消息
    sleep(5000)
    let ar = activeSelf.getOpenSelfVpnError()
    if (ar != "") {
        loge("打开自带VPN失败")
        loge("错误消息是: " + activeSelf.getOpenSelfVpnError())
        activeSelf.disableSelfVpn();
        return false;
    }
    sleep(2000)
    // 先自激活一次 防止镜像挂载不上
    activeSelf.startActiveMySelf(30000)
    test_active_screenshot()
    return true;
}

function main() {
    start();
}

main();
```
