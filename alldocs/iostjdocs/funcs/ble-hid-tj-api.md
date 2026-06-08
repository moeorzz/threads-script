---
title: EasyClick自动化脚本_iOS脚本_iOS免越狱_iOS免硬件_蓝牙BLE函数
hide_title: false
hide_table_of_contents: false
sidebar_label: 蓝牙 BLE函数
description: EasyClick 自动化脚本 iOS免越狱 蓝牙BLE函数
keywords:
  - EasyClick自动化脚本
  - iOS脚本
  - iOS免越狱
  - iOS免硬件
  - 蓝牙BLE函数
  - bleEvent
  - iOS
  - BLE
  - EC
  - 6.5.0
  - returns
  - param
  - isConnected
  - startConnect
  - stopConnect
  - EasyClick
  - 手机自动化
  - 自动化测试
---

# 蓝牙BLE函数

## 说明

- 蓝牙模块函数主要是跟蓝牙的手势动作相
- 蓝牙模块的对象前缀是bleEvent
- 蓝牙BLE硬件的配置具体可以看这个教程 [蓝牙BLE使用教程](/iostjdocs/zh-cn/advance/tj-ble-starter)

## bleEvent.isConnected 蓝牙链接状态

* 蓝牙链接状态
* 适配EC iOS 脱机版 6.5.0+
* @returns `{boolean}` true 代表已经链接 false代表未链接

```javascript showLineNumbers
    // 代码参考 bleEvent.startConnect的全部例子代码
```

## bleEvent.startConnect 连接蓝牙设备

* 连接蓝牙设备
* 适配EC iOS 脱机版 6.5.0+
* @param bleDeviceName 蓝牙设备名称，不写就从app系统设置中读取
* @param save 是否保存设置的 蓝牙设备名称
* @param timeout 链接超时时间 单位是毫秒
* @returns `{string|null}` null或者空代表正常 其他代表错误信息

```javascript showLineNumbers
function testble() {

    // 如果需要网络连接模式 这个设置为true
    // 下面的代码都是测试代码 真正的逻辑需要你自己填写
    let useNetwork = false
    if (useNetwork) {
        if (!useNetworkBle()) {
            return;
        }
    } else {
        if (!connectBle()) {
            return
        }
    }


    testMoveDistance()

    sleep(3000)

    logd("hide ble Name : " + bleEvent.hideBleName())
    sleep(1000)
    let zr = bleEvent.resetZero();
    if (_isBleResultOk(zr)) {
        logd("鼠标归零 成功 ")
    } else {
        logw("鼠标归零 失败 ")
    }

    let rr = bleEvent.setLastScale()
    if (rr != null && rr != "") {
        // 上一次没有设置过
        logd("当前设备类型: " + device.getDeviceIdentifier())
        let scale = bleEvent.getIPhoneScale();
        logd("scale is " + scale)
        // 如果你是相对坐标的固件 需要设置一下补偿比例
        bleEvent.setScale(scale, scale)
    }
    
    logd("scale "+bleEvent.getScale())


    // 如果你是 绝对坐标的 固件 一定要设置为1
    // bleEvent.setScale(1,1)

    resetScreenSize_auto();
    sleep(1000)
    logd("测试亮灯")
    logd("light: " + bleEvent.light(10, 100, 100))

    // 设置步伐 越小越慢
    bleEvent.setStep(20)

    testClick();
    sleep(5000)
    logd("开始测试多点触摸")
    testBleMtouch();
    sleep(3000)
    logd("开始测试 普通的动作")
    testMove()

    sleep(3000)
    logd("开始测试 按键和键盘")

    testBleKey();
    sleep(3000)

    logd("showBleName ble Name : " + bleEvent.showBleName())

    sleep(5000)
    logd("切换软键盘: " + bleEvent.toggleSoftKeyboard())

    sleep(2000)
    logd("切换软键盘: " + bleEvent.toggleSoftKeyboard())
    sleep(2000)

    logd("重启开发板 : " + bleEvent.resetBle())

    bleEvent.clickPoint(300, 400)

}


function resetScreenSize_auto() {
    let o = agentEvent.getOrientation();
    let img = image.captureFullScreen();
    if (img == null) {
        return
    }
    // 也可以使用device模块中获取设备高度和宽度函数
    let w = img.getWidth();
    let h = img.getHeight();
    logd("当前屏幕的宽度和高度:  " + w + "," + h + " 方向: " + o)
    let rw = w;
    let rh = h;
    if (o == "2") {
        // 横屏
        if (w < h) {
            rh = w;
            rw = h;
        }
    } else {
        // 竖屏
        if (w > h) {
            rh = w;
            rw = h;
        }
    }
    logd("设置ble需要的屏幕参数 " + rw + "  " + rh)
    bleEvent.setScreenSize(rw, rh)
}

function connectBle() {
    bleEvent.sendCmdType(1)
    logd("开始链接BLE " + bleEvent.getConfigBleName())
    if (bleEvent.isConnected()) {
        return true;
    }
    bleEvent.stopConnect();
    let cr = bleEvent.startConnect("", false, 15000)
    if (_isBleResultOk(cr)) {
        logd("蓝牙链接成功 " + bleEvent.getConfigBleName())
        return true
    }
    logw("链接蓝牙失败 " + cr)


    return false

}

function testClick() {
    sleep(1000)
    logd("开始测试手势动作 ")
    logd("开始测试点击")
    bleEvent.resetZero();
    let ck = bleEvent.clickPoint(300, 400)

    if (_isBleResultOk(ck)) {
        logd("测试 clickPoint 成功")
    } else {
        logw("测试 clickPoint 失败 " + ck)
    }
    sleep(2000)
    ck = bleEvent.press(310, 420, 4000)
    if (_isBleResultOk(ck)) {
        logd("测试 press 成功")
    } else {
        logw("测试 press 失败 " + ck)
    }

    sleep(2000)
    ck = bleEvent.doubleClickPoint(200, 500)
    if (_isBleResultOk(ck)) {
        logd("测试 doubleClickPoint 成功")
    } else {
        logw("测试 doubleClickPoint 失败 " + ck)
    }

    sleep(2000)
    ck = bleEvent.swipeToPoint(200, 500, 600, 900, 5000)
    if (_isBleResultOk(ck)) {
        logd("测试 swipeToPoint 成功")
    } else {
        logw("测试 swipeToPoint 失败 " + ck)
    }

    sleep(2000)
}

function testMove() {
    sleep(2000)
    logd("start move ...")
    let m = bleEvent.mouseMove(100, 100)
    if (_isBleResultOk(m)) {
        logd("测试 mouseMove 成功")
    } else {
        logw("测试 mouseMove 失败 " + m)
    }

    sleep(2000)
    logd("start mouseMoveByDistance ...")
    m = bleEvent.mouseMoveByDistance(10, 20)
    if (_isBleResultOk(m)) {
        logd("测试 mouseMoveByDistance 成功")
    } else {
        logw("测试 mouseMoveByDistance 失败 " + m)
    }

    sleep(2000)
    logd("start touchDown ...")
    m = bleEvent.touchDown(101, 121)
    if (_isBleResultOk(m)) {
        logd("测试 touchDown 成功")
    } else {
        logw("测试 touchDown 失败 " + m)
    }

    sleep(2000)
    logd("start touchMove ...")
    m = bleEvent.touchMove(130, 150)
    if (_isBleResultOk(m)) {
        logd("测试 touchMove 成功")
    } else {
        logw("测试 touchMove 失败 " + m)
    }

    sleep(2000)
    logd("start touchUp ...")
    m = bleEvent.touchUp(130, 150)
    if (_isBleResultOk(m)) {
        logd("测试 touchUp 成功")
    } else {
        logw("测试 touchUp 失败 " + m)
    }

}

function testBleMtouch() {
    let touch1 = [
        {
            "action": 0, "x": 500,
            "y": 1200, "pointer": 1, "delay": 1
        },
        {
            "action": 2,
            "x": 500,
            "y": 1100,
            "pointer": 1,
            "delay": 20
        }, {
            "action": 2,
            "x": 500,
            "y": 1000,
            "pointer": 1,
            "delay": 20
        },
        {
            "action": 1,
            "x": 1,
            "y": 1,
            "pointer": 1,
            "delay": 20
        }];

    let m = bleEvent.multiTouch(touch1, 10000)
    if (_isBleResultOk(m)) {
        logd("测试 multiTouch 成功")
    } else {
        logw("测试 multiTouch 失败 " + m)
    }
}

function testBleKey() {

    sleep(1000)
    let kc = bleEvent.keyPressChar("", "a")
    if (_isBleResultOk(kc)) {
        logd("按下 a 成功")
    } else {
        logw("按下 a 失败: " + kc)
    }

    sleep(1000)
    let kc2 = bleEvent.keyPressChar("shift", "a")
    if (_isBleResultOk(kc2)) {
        logd("按下 SHIFT+a 成功")
    } else {
        logw("按下 SHIFT+a 失败: " + kc2)
    }

    sleep(1000)
    let kc3 = bleEvent.keyPress("", 97)
    if (_isBleResultOk(kc3)) {
        logd("按下 keyPress 97 成功")
    } else {
        logw("按下 keyPress 97 失败: " + kc3)
    }

    sleep(1000)
    let k1 = bleEvent.systemKey("home")
    if (_isBleResultOk(k1)) {
        logd("按下HOME 成功")
    } else {
        logw("按下HOME 失败: " + k1)
    }
    sleep(1000)
    let k2 = bleEvent.systemKey("recents")
    if (_isBleResultOk(k2)) {
        logd("按下 appSwitch 成功")
    } else {
        logw("按下 appSwitch 失败: " + k2)
    }

}


function useNetworkBle() {
    let ip = bleEvent.searchBleIp(false, 10 * 1000)
    if (ip == null || ip == "") {
        logw("查找开发板的IP错误")
        return false
    }
    logd("开发板的IP: " + ip + " 蓝牙名称: " + bleEvent.getConfigBleName())
    // 设置为网络请求模式
    bleEvent.sendCmdType(2)
    return true;


}

function testMoveDistance() {
    bleEvent.resetZero();
    bleEvent.mouseMoveDistance(100, 100, false)
    bleEvent.mouseMoveDistance(100, 100, false)
    bleEvent.mouseMoveDistance(100, 100, false)
    sleep(1000)
    bleEvent.mouseMoveDistance(100, 100, false)
    sleep(3000)
    sleep(1000)
    bleEvent.mouseMoveDistance(100, 100, false)
    logd(bleEvent.mouseMoveDistance(0, 0, true))
    sleep(1000)
    logd(bleEvent.mouseMoveDistance(0, 0, false))
}


function _isBleResultOk(r) {
    return r == null || r == ""
}


testble()

```

## bleEvent.stopConnect 断开连接

* 断开连接
* 适配EC iOS 脱机版 6.5.0+
* @returns `{string|null`} null或者空代表正常 其他代表错误信息

```javascript showLineNumbers
    // 代码参考 bleEvent.startConnect的全部例子代码
```

## bleEvent.searchBleIp 搜索开发板的IP

* 搜索开发板的IP
* 适配EC iOS 脱机版 6.5.0+
* @param force 强制搜索，防止换成
* @param timeout 超时时间 单位毫秒
* @returns `{string|null}` null代表没有搜索到

```javascript showLineNumbers
    // 代码参考 bleEvent.startConnect的全部例子代码
```

## bleEvent.getIPhoneScale 鼠标补偿比率

* 根据 iPhone 硬件标识符的前缀（忽略逗号后数字）返回缩放值
* @returns `{number}` 浮点型 缩放比例

```javascript showLineNumbers
    // 代码参考 bleEvent.startConnect的全部例子代码
```

## bleEvent.setScale 设置鼠标补偿比率

* 设置鼠标补偿比率
* 鼠标移动1单位，像素移动多少单位，这样的比率，默认是2.0
* iPhone 6/7/8 375 x 667 设置为 2.0，标准 16:9，无安全区干扰。
* iPhone 11 / XR 414 x 896 设置为 1.96 屏幕变长，系统加速补偿 Y 轴。
* iPhone X/XS/11Pro 375 x 812 设置为 1.98 纵横比 19.5:9，存在微小加速。
* iPhone 12/13/14/15 390 x 844 设置为 1.97 逻辑点数与 11 不同，加速曲线略有变动。
* Plus / Max 系列 414 x 896 / 430 x 932 设置为1.94 ~ 1.95 屏幕最高，系统为了操作效率会大幅增加 Y 轴增益。
* 适配EC iOS 脱机版 6.5.0+
* @param x_scale x坐标系浮点数
* @param y_scale x坐标系浮点数
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 bleEvent.startConnect的全部例子代码
```

## bleEvent.getScale 获取存储的补偿率

* 获取存储的补偿率
* 适配EC iOS 脱机版 6.6.0+
* 可能是app设置校准的数据，也可能是代码中设置的
* @returns `{string}` null或者是空，代表从来没有设置过，有数据代表设置过，是JSON的字符串

```javascript showLineNumbers
    // 代码参考 bleEvent.startConnect的全部例子代码
```

## bleEvent.setLastScale 设置使用上一次补偿率

* 设置使用上一次补偿率
* 适配EC iOS 脱机版 6.6.0+
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 bleEvent.startConnect的全部例子代码
```

## bleEvent.setScreenSize 设置屏幕尺寸

* 设置屏幕尺寸
* 这个用来防止鼠标移动到屏幕外，导致鼠标偏移
* 如果不知道屏幕尺寸，就使用截图后的图片的宽度和高度
* 或者使用device模块的函数
* 适配EC iOS 脱机版 6.5.0+
* @param w 屏幕的宽度
* @param h 屏幕的高度
* @returns `{string} `null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 bleEvent.startConnect的全部例子代码
```

## bleEvent.setWifiInfo 设置网络信息

* 设置网络信息
* 方便开发板联网
* 适配EC iOS 脱机版 6.5.0+
* @param name WiFi名称
* @param pwd WiFi 密码
* @returns `{string} `null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 bleEvent.startConnect的全部例子代码
```

## bleEvent.resetBle 重启开发板

* 重启开发板
* 相当于按了开发板的RST键
* 适配EC iOS 脱机版 6.5.0+
* @returns `{string} `null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 bleEvent.startConnect的全部例子代码
```

## bleEvent.mouseMove 移动鼠标

* 移动鼠标
* 只移动鼠标，没有按下动作
* 适配EC iOS 脱机版 6.5.0+
* @param x X坐标
* @param y Y坐标
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 bleEvent.startConnect的全部例子代码
```

## bleEvent.mouseMoveByDistance 移动鼠标(像素距离)

* 移动鼠标(像素距离)
* 只移动鼠标，没有按下动作
* 适配EC iOS 脱机版 6.5.0+
* @param x_dis X的像素距离 不能大于127
* @param y_dis Y的像素距离 不能大于127
* @returns `{string} `null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 bleEvent.startConnect的全部例子代码
```

## bleEvent.mouseMoveDistance 移动鼠标(带按下参数)

* 移动鼠标(带按下参数)
* 只移动鼠标，可带按下参数
* 如果x,y都写0，发送两次第一次press=true，第二次press=false，就代表是单击了
* 适配EC iOS 脱机版 6.5.0+
* @param x_dis X的像素距离 不能大于127
* @param y_dis Y的像素距离 不能大于127
* @param press true 是按下
* @returns `{string} `null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 bleEvent.startConnect的全部例子代码
```

## bleEvent.resetZero 鼠标归零

* 鼠标归零
* 鼠标移动到0,0的右上角坐标
* 适配EC iOS 脱机版 6.5.0+
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 bleEvent.startConnect的全部例子代码
```

## bleEvent.touchDown 按下坐标点

* 按下坐标点
* 适配EC iOS 脱机版 6.5.0+
* @param x X坐标
* @param y Y坐标
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 bleEvent.startConnect的全部例子代码
```

## bleEvent.touchMove 移动坐标点

* 移动坐标点
* 适配EC iOS 脱机版 6.5.0+
* @param x X坐标
* @param y Y坐标
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 bleEvent.startConnect的全部例子代码
```

## bleEvent.touchUp 抬起坐标点

* 抬起坐标点
* 适配EC iOS 脱机版 6.5.0+
* @param x X坐标
* @param y Y坐标
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 bleEvent.startConnect的全部例子代码
```

## bleEvent.clickPoint 点击坐标点

* 点击坐标点
* 适配EC iOS 脱机版 6.5.0+
* @param x X坐标
* @param y Y坐标
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 bleEvent.startConnect的全部例子代码
```

## bleEvent.press 长按坐标

* 长按坐标
* 适配EC iOS 脱机版 6.5.0+
* @param x x坐标
* @param y y坐标
* @param delay 长按时间 毫秒
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 bleEvent.startConnect的全部例子代码
```

## bleEvent.doubleClickPoint 双击坐标

* 双击坐标
* 适配EC iOS 脱机版 6.5.0+
* @param x X坐标
* @param y Y坐标
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 bleEvent.startConnect的全部例子代码
```

## bleEvent.pressMouseBtn 点击鼠标键

* 点击鼠标键
* 可用于自定义辅助触控的-自定义更多按钮
* 为了防止冲突，建议从4开始，到8结束
* 适配EC iOS 脱机版 6.5.0+
* @param b 鼠标键名称，从1开始，一般1是左键，2是右键，3是中间滚轮键，剩下的是4-8
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers

function main() {
    // 链接蓝牙的代码不再重复，参考 startConnect 代码
    // 如果在手机设置-辅助功能-触控-辅助触控-设备-选择已经链接的设备-自定义更多按钮，
    // 定义了鼠标4按键的动作，这里发送了 可以直接执行 
    let r = bleEvent.pressMouseBtn(4);
    logd(r)
}

main();
```

## bleEvent.swipeToPoint 滑动

* 滑动
* 适配EC iOS 脱机版 6.5.0+
* @param startX 起始坐标的X轴值
* @param startY 起始坐标的Y轴值
* @param endX 结束坐标的X轴值
* @param endY 结束坐标的Y轴值
* @param duration 持续时长 单位毫秒
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 bleEvent.startConnect的全部例子代码
```

## bleEvent.multiTouch 多点触摸

* 多点触摸<br/>
* 触摸参数: action :一般情况下 按下为0，弹起为1，移动为2<br/>
* x: X坐标<br/>
* y: Y坐标<br/>
* pointer：设置第几个手指触摸点，分别是 1，2，3等，代表第n个手指<br/>
* delay: 该动作延迟多少毫秒执行
* 适配EC iOS 脱机版 6.5.0+
* @param touch1 第1个手指的触摸点数组,例如：
  `[{"action":0,"x":1,"y":1,"pointer":1,"delay":20},{"action":2,"x":1,"y":1,"pointer":1,"delay":20}]`
* @param timeout 多点触摸执行的超时时间，单位是毫秒
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 bleEvent.startConnect的全部例子代码
```

## bleEvent.systemKey 系统按键

* 系统按键
* 适配EC iOS 脱机版 6.5.0+
* @param key 目前有 home,recents=最近的任务
* @returns `{string} `null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 bleEvent.startConnect的全部例子代码
```

## bleEvent.keyPress 按键

* 按键
* 适配EC iOS 脱机版 6.5.0+
* @param prefix 组合键，可以为空 alt=alt按键，ctrl=CTRL按键,gui=win或者command键，r_ctrl=右侧CTRL键，r_shift=右侧shift键，shift=shift键
* @param code 整型，例如 65,ASCII码，参考 https://tool.oschina.net/commons?type=4
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 bleEvent.startConnect的全部例子代码
```

## bleEvent.keyPressChar 字符按键

* 字符按键
* 适配EC iOS 脱机版 6.5.0+
* @param prefix 组合键，可以为空 alt=alt按键，ctrl=CTRL按键,gui=win或者command键，r_ctrl=右侧CTRL键，r_shift=右侧shift键，shift=shift键
* @param code 字符，例如 a
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 bleEvent.startConnect的全部例子代码
```

## bleEvent.toggleSoftKeyboard 开关软键盘

* 开关软键盘
* 实际在测试iphone7的系统上，蓝牙连接后，输入框无法弹出软键盘配合脱机主程序实现输入，可以试试这个方法，iPhone11没有这样问题，跟系统版本有关系
* 如果你不用脱机主程序作为输入法，忽略这个方法
* 适配EC iOS 脱机版 6.5.0+
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 bleEvent.startConnect的全部例子代码
```

## bleEvent.setStep 设置步伐大小

* 设置步伐大小
* 适配EC iOS 脱机版 6.5.0+
* @param step 10 - 120 移动鼠标每一步最大的值，值越大移动越快默认是100
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 bleEvent.startConnect的全部例子代码
```

## bleEvent.light 点亮LED

* 点亮LED
* 适配EC iOS 脱机版 6.5.0+
* @param num 循环点亮次数
* @param lightToOff 从亮到灭过程的时间 单位毫秒
* @param offToLight 从灭再到亮的过程时间 单位毫秒
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 bleEvent.startConnect的全部例子代码
```

## bleEvent.showBleName 显示蓝牙名称

* 显示蓝牙名称
* 适配EC iOS 脱机版 6.5.0+
* 有助于能够搜索到
* @returns `{string} `null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 bleEvent.startConnect的全部例子代码
```

## bleEvent.hideBleName 隐藏蓝牙名称

* 隐藏蓝牙名称
* 防检测
* 适配EC iOS 脱机版 6.5.0+
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 bleEvent.startConnect的全部例子代码
```

## bleEvent.getConfigBleName 获取app配置的蓝牙名称

* 获取app配置的蓝牙名称
* 适配EC iOS 脱机版 6.5.0+
* @returns `{string}` 配置的蓝牙名称

```javascript showLineNumbers
    // 代码参考 bleEvent.startConnect的全部例子代码
```

## bleEvent.sendCmdType 设置通信方式

* 设置通信方式
* APP发送指令给开发板的方式
* 适配EC iOS 脱机版 6.5.0+
* @param tt 1是蓝牙，2是网络
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 bleEvent.startConnect的全部例子代码
```


## bleEvent.startKeepAlive 鼠标心跳

* 鼠标心跳
* 为了保证鼠标一直显示
* 底层是移动鼠标后再次移动回来
* 如果有其他动作执行，将不会发送这个心跳的移动动作
* iOS17+高版本的绝对坐标系无需调用这个函数
* @param keepAliveTime 多长时间发送一次心跳 单位是毫秒 可以设置 5000，就是5秒一次
* @param moveValue 一次移动多少值，可以设置为1或者2，不能超过100
* @returns `{*|string} `空字符串成功，非空为错误消息
```javascript showLineNumbers
    // 蓝牙链接完成后直接调用 
    bleEvent.startKeepAlive(5000,1)
```



## bleEvent.stopKeepAlive 停止心跳
* 停止心跳
* @returns `{string}` 空字符串成功，非空为错误消息
```javascript showLineNumbers
    // 直接调用即可
    bleEvent.stopKeepAlive()
```
