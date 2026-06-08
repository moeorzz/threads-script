---
title: OTG HID函数
description: EasyClick 自动化脚本 iOS免越狱 蓝牙BLE函数
keywords:
  - EasyClick 自动化脚本 iOS免越狱 OTG HID函数
  - bleEvent
  - setScale
  - openSerial
  - iOS
  - USB
  - BLE
  - getIPhoneScale
  - setScreenSize
  - setSendCmdType
  - setWifiInfo
  - EasyClick
  - 手机自动化
  - 自动化测试
  - 脚本开发
  - 安卓自动化
  - iOS自动化
  - 鸿蒙Next
---

## 说明

- 该功能是使用OTG的方式模拟滑动、输入等功能，目前支持ESP32S3的开发板
- 如何刷入固件，以及链接等，请进入该文档查看[iOS USB OTG-HID教程](/iosdocs/zh-cn/advance/ios-usb-otg)

:::tip

- 注意：固件里面只有**绝对坐标**固件,请使用iOS17+以上的系统
  :::

## otgEvent.isOtgConnect otg链接状态

* otg链接状态
* 适配EC iOS USB版本9.32.0+
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
let current_screen_width = 0;
let current_screen_height = 0;


function otg_test() {
    //scanOtgIp();
    logd("Start test otg functions")
    if (!connectOtg()) {
        return
    }

    logd("device.getOrientationNoAuto()  " + device.getOrientationNoAuto())
    captureScreenAndResetScreenSize();
    testSystemKey();
    testInput();
    click_swipe();
    test_touch();
    test_multiTouch()
    logd("test otg end")
}

function test_multiTouch() {
    sleep(1000)
    logd("开始测试多点触摸函数")
    // 最后一个抬起 最好与 最后一个移动保持一致 防止有错误的偏移
    let touch1 = [
        {"action": 0, "x": 500, "y": 1200, "delay": 10},
        {"action": 2, "x": 480, "y": 1100, "delay": 200},
        {"action": 2, "x": 460, "y": 1000, "delay": 100},
        {"action": 2, "x": 430, "y": 1000, "delay": 100},
        {"action": 2, "x": 430, "y": 950, "delay": 100},
        {"action": 2, "x": 350, "y": 900, "delay": 100},
        {"action": 2, "x": 300, "y": 800, "delay": 100},
        {"action": 1, "x": 300, "y": 800, "delay": 2}
    ]

    let rr = otgEvent.multiTouch(touch1, 1000)

    if (_isEmpty(rr)) {
        logd("执行多点触摸成功")
    } else {
        logd("执行多点触摸失败 {}", rr)
    }
}

function test_touch() {
    sleep(1000)
    let startx = 200;
    let starty = 400;
    let touchDown = otgEvent.touchDown(startx, starty)
    logd("touchDown, {},{} :{} ", startx, starty, (_isEmpty(touchDown) ? "OK" : touchDown))
    for (let i = 0; i < 50; i++) {
        sleep(10)
        startx = startx + 1;
        starty = starty + 10;
        let touchMove = otgEvent.touchMove(startx, starty)
        logd("touchMove {},{} :{} ", startx, starty, (_isEmpty(touchMove) ? "OK" : touchMove))

    }
    sleep(100)
    let touchUp = otgEvent.touchUp(startx, starty)
    logd("touchUp {},{} :{} ", startx, starty, (_isEmpty(touchUp) ? "OK" : touchUp))


}

function click_swipe() {
    sleep(1000)
    let click = otgEvent.clickPoint(508, 411)
    logd("clickPoint: {}", (_isEmpty(click) ? "OK" : click))

    sleep(1000)
    let press = otgEvent.press(719, 792, 5000)
    logd("press : {}", (_isEmpty(press) ? "OK" : press))

    sleep(1000)
    let doubleClickPoint = otgEvent.doubleClickPoint(500, 792)
    logd("doubleClickPoint : {}", (_isEmpty(doubleClickPoint) ? "OK" : doubleClickPoint))


    sleep(1000)
    let swipeToPoint = otgEvent.swipeToPoint(300, 400, 700, 900, 1000)
    logd("swipeToPoint : {}", (_isEmpty(swipeToPoint) ? "OK" : swipeToPoint))

}


function moveMouse() {
    sleep(1000)
    let resetZero = otgEvent.resetZero()
    logd("resetZero {}", (_isEmpty(resetZero) ? "OK" : resetZero))

    sleep(1000)
    let mouseMove = otgEvent.mouseMove(300, 500)
    logd("mouseMove {}", (_isEmpty(mouseMove) ? "OK" : mouseMove))
}

function testSystemKey() {
    sleep(1000)
    let recents_r = otgEvent.systemKey("recents");
    logd("进程列表 {} ", _isEmpty(recents_r) ? "ok" : recents_r)
    sleep(2000)
    let home_result = otgEvent.systemKey("home");
    logd("模拟HOME {} ", _isEmpty(home_result) ? "ok" : home_result)
}

function testInput() {

    let keyPress1 = otgEvent.keyPress("", 97)

    logd("keyPress {} ", _isEmpty(keyPress1) ? "ok" : keyPress1)
    otgEvent.keyPressChar("", "Enter")
    sleep(2000)
    let keyPressChar = otgEvent.keyPressChar("alt", "b")
    logd("keyPressChar {} ", _isEmpty(keyPressChar) ? "ok" : keyPressChar)
    sleep(2000)
    otgEvent.keyPressChar("", "t")
    sleep(2000)
    logd("toggleSoftKeyboard {}", otgEvent.toggleSoftKeyboard())

}

function connectOtg() {

    let oldIp = otgEvent.getOtgIp();
    if (!_isEmpty(oldIp)) {
        logd("当前OTG设备IP {}  getMacAddress={}", oldIp, otgEvent.getMacAddress())
        if (_isEmpty(otgEvent.isOtgConnect())) {
            logd("OTG设备已经准备好")
            return true;
        }
        logd("OTG设备没有好，开始重新扫描")
    }

    let ips = utils.getPCIps();
    if (_isEmpty(ips)) {
        logd("未找到本电脑的IP")
        return false;
    }
    logd("本电脑的IP为: {}", ips)
    ips = ips.split(",")
    for (let i = 0; i < ips.length; i++) {
        let ipsKey = ips[i];
        let iparr = ipsKey.split(".")
        let range = iparr[0] + "." + iparr[1] + "." + iparr[2] + ".2-" + iparr[0] + "." + iparr[1] + "." + iparr[2] + ".254"
        logd("-- scan ip rang: {}", range)
        let scanr = otgEvent.scanOtgDevice(range)
        if (_isEmpty(scanr)) {
            logd("扫描IP段结束: {}", range)
        } else {
            logd("扫描IP段错误消息: {}", scanr)
        }
    }
    logd("等待OTG准备...")
    sleep(5000)
    oldIp = otgEvent.getOtgIp();
    if (!_isEmpty(oldIp)) {
        if (_isEmpty(otgEvent.isOtgConnect())) {
            logd("当前OTG设备IP {}  getMacAddress={}", oldIp, otgEvent.getMacAddress())
            logd("OTG设备已经准备好")
            return true;
        }
        logd("OTG设备没有好")
    } else {
        logw("OTG设备没有好，请先给开发板配网，然后扫描")
    }
    return false
}


function captureScreenAndResetScreenSize() {
    logd("开始设置屏幕的大小，防止坐标计算偏离")
    let img = image.captureFullScreenNoAuto()
    if (!img) {
        image.resetCaptureScreenNoAutoEnv()
        sleep(1000)
        img = image.captureFullScreenNoAuto()
    }
    if (img) {
        let w = img.getWidth();
        let h = img.getHeight();
        if (w != current_screen_height || h != current_screen_height) {
            let sets = otgEvent.setScreenSize(w, h)
            if (_isEmpty(sets)) {
                logd("设置屏幕尺寸大小成功 w:{} h:{}", w, h)
                current_screen_width = w;
                current_screen_height = h;
            }
        }
        img.recycle()
    } else {
        logw("截图失败 可能无法设置屏幕的尺寸，会导致坐标偏离")
    }


}

otg_test()
```

## otgEvent.scanOtgDevice 扫描OTG设备的IP

* 扫描OTG设备的IP
* 适配EC iOS USB版本9.32.0+
* @param ip_ranges IP范围，例如 192.168.2.1-92.168.2.255
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
function main() {
    // 参考 otgEvent.isOtgConnect 例子
}

main();
```

## otgEvent.getOtgIp 获取OTG的IP

* 获取OTG的IP
* 适配EC iOS USB版本9.32.0+
* @returns `{string}` null或者空字符串，没有IP，需要重新扫描

```javascript showLineNumbers
function main() {
    // 参考 otgEvent.isOtgConnect 例子
}

main();
```

## otgEvent.setScreenSize 设置屏幕尺寸

* 设置屏幕尺寸
* 这个用来防止鼠标移动到屏幕外，导致鼠标偏移
* 如果不知道屏幕尺寸，就使用截图后的图片的宽度和高度
* 适配EC iOS USB版本9.32.0+
* @param w 屏幕的宽度
* @param h 屏幕的高度
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
function main() {
    // 参考 otgEvent.isOtgConnect 例子
}

main();
```

## otgEvent.restart 重启开发板

* 重启开发板
* 相当于按了开发板的RST键
* 适配EC iOS USB版本9.32.0+
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
function main() {
    // 直接调用即可
    logd(otgEvent.restart())
}

main();
```

## otgEvent.mouseMove 移动鼠标

* 移动鼠标
* 只移动鼠标，没有按下动作
* 适配EC iOS USB版本9.32.0+
* @param x X坐标
* @param y Y坐标
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
function main() {
    // 参考 otgEvent.isOtgConnect 例子
}

main();
```

## otgEvent.resetZero 鼠标归零

* 鼠标归零
* 鼠标移动到0,0的右上角坐标
* 适配EC iOS USB版本9.32.0+
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
function main() {
    // 参考 otgEvent.isOtgConnect 例子
}

main();
```

## otgEvent.touchDown 按下坐标点

* 按下坐标点
* 适配EC iOS USB版本9.32.0+
* @param x X坐标
* @param y Y坐标
* @returns `{string} `null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
function main() {
    // 参考 otgEvent.isOtgConnect 例子
}

main();
```

## otgEvent.touchMove 移动坐标点

* 移动坐标点
* 适配EC iOS USB版本9.32.0+
* @param x X坐标
* @param y Y坐标
* @returns `{string} `null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
function main() {
    // 参考 otgEvent.isOtgConnect 例子
}

main();
```

## otgEvent.touchUp 抬起坐标点

* 抬起坐标点
* 适配EC iOS USB版本9.32.0+
* @param x X坐标
* @param y Y坐标
* @returns `{string} `null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
function main() {
    // 参考 otgEvent.isOtgConnect 例子
}

main();
```

## otgEvent.clickPoint 点击坐标点

* 点击坐标点
* 适配EC iOS USB版本9.32.0+
* @param x X坐标
* @param y Y坐标
* @returns `{string} `null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
function main() {
    // 参考 otgEvent.isOtgConnect 例子
}

main();
```

## otgEvent.press 长按坐标

* 点击坐标点
* 适配EC iOS USB版本9.32.0+
* @param x X坐标
* @param y Y坐标
* @param delay 长按时间 毫秒
* @returns `{string} `null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
function main() {
    // 参考 otgEvent.isOtgConnect 例子
}

main();
```

## otgEvent.doubleClickPoint 双击坐标

* 双击坐标
* 适配EC iOS USB版本9.32.0+
* @param x X坐标
* @param y Y坐标
* @returns `{string} `null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
function main() {
    // 参考 otgEvent.isOtgConnect 例子
}

main();
```

## otgEvent.swipeToPoint 坐标滑动

* 坐标滑动
* 适配EC iOS USB版本9.32.0+
* @param startX 起始坐标的X轴值
* @param startY 起始坐标的Y轴值
* @param endX 结束坐标的X轴值
* @param endY 结束坐标的Y轴值
* @param duration 持续时长 单位毫秒
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
function main() {
    // 参考 otgEvent.isOtgConnect 例子
}

main();
```

## otgEvent.multiTouch 多点触摸

* 多点触摸
* 触摸参数: action :一般情况下 按下为0，弹起为1，移动为2
* x: X坐标
* y: Y坐标
* pointer：设置第几个手指触摸点，分别是 1，2，3等，代表第n个手指
* delay: 该动作延迟多少毫秒执行
* 适配EC iOS USB版本9.32.0+
* @param touch1 第1个手指的触摸点数组,例如：
  `[{"action":0,"x":1,"y":1,"pointer":1,"delay":20},{"action":2,"x":1,"y":1,"pointer":1,"delay":20}]`
* @param timeout 多点触摸执行的超时时间，单位是毫秒
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
function main() {
    // 参考 otgEvent.isOtgConnect 例子
}

main();
```

## otgEvent.systemKey 系统按键

* 系统按键
* 适配EC iOS USB版本9.32.0+
* @param key 目前有 home,recents=最近的任务
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
function main() {
    // 参考 otgEvent.isOtgConnect 例子
}

main();
```

## otgEvent.keyPress 按键

* 按键
* 适配EC iOS USB版本9.32.0+
* @param prefix 组合键，可以为空 alt=alt按键，ctrl=CTRL按键,gui=win或者command键，r_ctrl=右侧CTRL键，r_shift=右侧shift键，shift=shift键
* @param code 整型，例如
  65,ASCII码，参考 [https://tool.oschina.net/commons?type=4](https://tool.oschina.net/commons?type=4)
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
function main() {
    // 参考 otgEvent.isOtgConnect 例子
}

main();
```

## otgEvent.keyPressChar 字符按键

* 字符按键
* 适配EC iOS USB版本9.32.0+
* @param prefix 组合键，可以为空 alt=alt按键，ctrl=CTRL按键,gui=win或者command键，r_ctrl=右侧CTRL键，r_shift=右侧shift键，shift=shift键
* @param code 字符，例如 a, BS=删除，LF=换行
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
function main() {
    // 参考 otgEvent.isOtgConnect 例子
}

main();
```

## otgEvent.toggleSoftKeyboard 开关软键盘

* 开关软键盘
* 实际在测试iphone7的系统上，输入框无法弹出软键盘配合脱机主程序实现输入，可以试试这个方法，iPhone11没有这样问题，跟系统版本有关系
* 如果你不用脱机主程序作为输入法，忽略这个方法
* 适配EC iOS USB版本9.32.0+
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
function main() {
    // 参考 otgEvent.isOtgConnect 例子
}

main();
```

## otgEvent.getMacAddress 获取mac地址

* 获取mac地址
* 适配EC iOS USB版本9.32.0+
* @returns `{string}` mac地址字符串

```javascript showLineNumbers
function main() {
    // 参考 otgEvent.isOtgConnect 例子
}

main();
```



## otgEvent.pressMouseBtn 点击鼠标键

* 点击鼠标键
* 适配EC iOS USB版本9.32.0+
* 可用于自定义辅助触控的-自定义更多按钮
* 为了防止冲突，建议从4开始，到8结束
* @param btn 鼠标键名称，从1开始，一般1是左键，2是右键，3是中间滚轮键，剩下的是4-8
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息
```javascript showLineNumbers
function main() {
    // 参考 otgEvent.isOtgConnect 例子
}

main();
```


## 利用快捷指令进行输入文字

- 下面是测试通过的代码

```javascript showLineNumbers


function main() {
    logd("Start test otg functions")
    if (!connectOtg()) {
        return
    }
    logd("通信正常,开始执行中")
    test_otg_shortcut_input()

}

function test_otg_shortcut_input() {
    let msg = device.getDeviceMsg()
    // 蓝牙和OTG 使用的是一个bleMac字段 就是中控绑定的mac地址
    let bleMac = "";
    if (msg != null && msg != "") {
        // 获取iPhone的类型，用来判断缩放标准
        let bb = JSON.parse(msg);
        bleMac = bb["bleMac"];
    }
    if (bleMac == null || bleMac == "") {
        logw("没有获取到 otg 的mac地址")
        return
    }
    logd("获取到该设备绑定的 otg mac地址作为唯一标识 {}", bleMac)

    let data = {
        key: bleMac,
        "content": "我是数据 " + new Date().toString()
    }
    // 提交给 iOS快捷指令助手服务 ，如果你部署在外网就写外网的地址
    let post_url = "http://192.168.2.26:8696/postText"
    let result = http.postJSON(post_url, data, 10 * 1000, {});
    if (result == null || result == "") {
        logw("提交数据 iOS快捷指令助手服务 失败")
        return;
    }
    result = JSON.parse(result)
    if (result["code"] != 0) {
        logw("提交数据 iOS快捷指令助手服务 失败," + result["msg"])
        return;
    }
    // 开始执行快捷指令 是之前绑定的快捷键
    let gs = otgEvent.keyPressChar("gui", "u")
    if (gs != null && gs != "") {
        logw("执行快捷指令快捷键失败 " + gs)
        return
    }

    logd("执行快捷指令，等待结果")
    // 这里循环请求等待结果
    // 这个是请求结果的地址
    let result_url = "http://192.168.2.26:8696/getResult?key=" + bleMac
    let getresult = false;
    for (let i = 0; i < 15; i++) {
        sleep(1000)
        let data = http.httpGet(result_url, {}, 5 * 1000, {})
        if (data != null && data != "") {
            try {
                let r1 = JSON.parse(data)
                // 得到了明确的成功
                if (r1["data"] == "ok") {
                    getresult = true;
                    break
                }
            } catch (e) {

            }
        }
    }

    if (!getresult) {
        logw("获取结果失败")
        return;
    }

    //  执行 粘贴  gui+v
    let gsv = otgEvent.keyPressChar("gui", "v")
    if (gsv != null && gsv != "") {
        logw("执行粘贴快捷指令快捷键失败 " + gs)
        return
    }

    logd("执行粘贴成功")
}


function connectOtg() {

    let oldIp = otgEvent.getOtgIp();
    if (!_isEmpty(oldIp)) {
        logd("当前OTG设备IP {}  getMacAddress={}", oldIp, otgEvent.getMacAddress())
        if (_isEmpty(otgEvent.isOtgConnect())) {
            logd("OTG设备已经准备好")
            return true;
        }
        logd("OTG设备没有好，开始重新扫描")
    }

    let ips = utils.getPCIps();
    if (_isEmpty(ips)) {
        logd("未找到本电脑的IP")
        return false;
    }
    logd("本电脑的IP为: {}", ips)
    ips = ips.split(",")
    for (let i = 0; i < ips.length; i++) {
        let ipsKey = ips[i];
        let iparr = ipsKey.split(".")
        let range = iparr[0] + "." + iparr[1] + "." + iparr[2] + ".2-" + iparr[0] + "." + iparr[1] + "." + iparr[2] + ".254"
        logd("-- scan ip rang: {}", range)
        let scanr = otgEvent.scanOtgDevice(range)
        if (_isEmpty(scanr)) {
            logd("扫描IP段结束: {}", range)
        } else {
            logd("扫描IP段错误消息: {}", scanr)
        }
    }
    logd("等待OTG准备...")
    sleep(5000)
    oldIp = otgEvent.getOtgIp();
    if (!_isEmpty(oldIp)) {
        if (_isEmpty(otgEvent.isOtgConnect())) {
            logd("当前OTG设备IP {}  getMacAddress={}", oldIp, otgEvent.getMacAddress())
            logd("OTG设备已经准备好")
            return true;
        }
        logd("OTG设备没有好")
    }
    return false
}

main()

```

## 利用快捷指令进行插入相册

- 下面是测试通过的代码

```javascript showLineNumbers
function main() {
    logd("Start test otg functions")
    if (!connectOtg()) {
        return
    }
    logd("通信正常,开始执行中")

    test_otg_insert()


}


function connectOtg() {

    let oldIp = otgEvent.getOtgIp();
    if (!_isEmpty(oldIp)) {
        logd("当前OTG设备IP {}  getMacAddress={}", oldIp, otgEvent.getMacAddress())
        if (_isEmpty(otgEvent.isOtgConnect())) {
            logd("OTG设备已经准备好")
            return true;
        }
        logd("OTG设备没有好，开始重新扫描")
    }

    let ips = utils.getPCIps();
    if (_isEmpty(ips)) {
        logd("未找到本电脑的IP")
        return false;
    }
    logd("本电脑的IP为: {}", ips)
    ips = ips.split(",")
    for (let i = 0; i < ips.length; i++) {
        let ipsKey = ips[i];
        let iparr = ipsKey.split(".")
        let range = iparr[0] + "." + iparr[1] + "." + iparr[2] + ".2-" + iparr[0] + "." + iparr[1] + "." + iparr[2] + ".254"
        logd("-- scan ip rang: {}", range)
        let scanr = otgEvent.scanOtgDevice(range)
        if (_isEmpty(scanr)) {
            logd("扫描IP段结束: {}", range)
        } else {
            logd("扫描IP段错误消息: {}", scanr)
        }
    }
    logd("等待OTG准备...")
    sleep(5000)
    oldIp = otgEvent.getOtgIp();
    if (!_isEmpty(oldIp)) {
        if (_isEmpty(otgEvent.isOtgConnect())) {
            logd("当前OTG设备IP {}  getMacAddress={}", oldIp, otgEvent.getMacAddress())
            logd("OTG设备已经准备好")
            return true;
        }
        logd("OTG设备没有好")
    }
    return false
}


function test_otg_insert() {
    let msg = device.getDeviceMsg()
    let bleMac = "";
    if (msg != null && msg != "") {
        // 获取iPhone的类型，用来判断缩放标准
        let bb = JSON.parse(msg);
        bleMac = bb["bleMac"];
    }
    if (bleMac == null || bleMac == "") {
        logw("没有获取到 otg 的mac地址")
        return
    }
    logd("获取到该设备绑定的 otg mac地址作为唯一标识 {}", bleMac)

    let data = {}
    // 提交给 iOS快捷指令助手服务 ，上传图片或者视频的接口，如果你部署在外网就写外网的地址
    // key 是mac地址 作为标识
    let post_url = "http://192.168.2.26:8696/upload?key=" + bleMac
    // 这里选择一个视频
    let file = {
        "file": "c:/Downloads/QQ2025522-95310.mp4"
    }
    let result = http.httpPost(post_url, data, file, 20 * 1000, {});
    if (result == null || result == "") {
        logw("提交数据 iOS快捷指令助手服务 失败")
        return;
    }
    logd("提交结果: " + result)
    result = JSON.parse(result)
    if (result["code"] != 0) {
        logw("提交数据 iOS快捷指令助手服务 失败," + result["msg"])
        return;
    }
    // 开始执行快捷指令 是之前绑定的快捷键
    let gs = otgEvent.keyPressChar("gui", "i")
    if (gs != null && gs != "") {
        logw("执行快捷指令快捷键失败 " + gs)
        return
    }

    logd("执行快捷指令，等待结果")
    // 这里循环请求等待结果
    // 这个是请求结果的地址
    let result_url = "http://192.168.2.26:8696/getResult?key=" + bleMac
    let getresult = false;
    for (let i = 0; i < 15; i++) {
        sleep(1000)
        let data = http.httpGet(result_url, {}, 5 * 1000, {})
        if (data != null && data != "") {
            try {
                let r1 = JSON.parse(data)
                // 得到了明确的成功
                if (r1["data"] == "ok") {
                    getresult = true;
                    break
                }
            } catch (e) {

            }
        }
    }

    if (!getresult) {
        logw("获取结果失败")
        return;
    }
    logd("执行插入相册成功")
}

main()
```
