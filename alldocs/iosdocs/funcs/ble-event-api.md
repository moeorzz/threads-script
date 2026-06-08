---
title: 蓝牙BLE函数
description: EasyClick 自动化脚本 iOS免越狱 蓝牙BLE函数
keywords:
  - EasyClick 自动化脚本 iOS免越狱 蓝牙BLE函数
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

- 该功能是使用蓝牙的方式模拟滑动、输入等功能，目前支持ESP32C3的开发板
- 如何刷入固件，以及链接等，请进入该文档查看[iOS USB蓝牙教程](/iosdocs/zh-cn/advance/ios-usb-ble)

:::tip
- 注意：固件里面有**相对坐标**和**绝对坐标**两种固件,如果你使用的是**绝对坐标固件**，一定要设置补偿率为 1, bleEvent.setScale(1, 1)
- 相对坐标兼容性强，但是需要自己计算补偿率，如果出现误差需要调用归零函数处理
- 绝对坐标在iOS17+系统上兼容良好，无需计算补偿率点击更精准

:::

## bleEvent.openSerial 打开串口通信

* 打开串口通信
* 适配EC iOS USB版本9.20.0+
* @param timeout 串口通信超时时间 单位是毫秒 默认是15秒
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
function main() {
    if (!isDeviceAuthOk(1))
    {
        logw("设备授权已经过期")
        return;
    }
    initMouse();
    if (!openConnect(1, 15000)) {
        logw("开启通信失败，无法进行下一步，请检查蓝牙设备是否正常")
        return
    }
    logd("通信正常,开始执行中")
    // 将鼠标移动到0,0
    let r = bleEvent.resetZero()
    if (_bleResultOk(r)) {
        logd("恢复鼠标原始坐标成功")
    } else {
        logd("恢复鼠标原始坐标失败 {}", r)
        return
    }
// test_mouse_action();
//    test_multiTouch();

    test_input();

    // test_wifi_and_reset();
}

function test_mouse_action() {

    logd("测试鼠标移动功能")
    let mv = bleEvent.mouseMove(300, 588)
    if (_bleResultOk(mv)) {
        logd("移动鼠标成功")
        sleep(3000)
    } else {
        logw("移动鼠标失败 {}", mv)
    }

    bleEvent.resetZero()

    logd("测试点击 功能 ")
    let cr = bleEvent.clickPoint(300, 400)
    if (_bleResultOk(cr)) {
        logd("点击坐标 成功")
    } else {
        logw("点击坐标失败 {}", cr)
    }
    sleep(2000)
    logd("测试 长按 功能 ")
    cr = bleEvent.press(400, 500, 5000)
    if (_bleResultOk(cr)) {
        logd("长按 坐标 成功")
    } else {
        logw("长按 坐标 失败 {}", cr)
    }
    sleep(2000)
    logd("测试 双击 功能 ")
    cr = bleEvent.doubleClickPoint(212, 300)
    if (_bleResultOk(cr)) {
        logd("双击 坐标 成功")
    } else {
        logw("双击 坐标 失败 {}", cr)
    }
    sleep(2000)
    logd("测试 滑动 功能 ")
    cr = bleEvent.swipeToPoint(200, 300, 500, 600, 2000)
    if (_bleResultOk(cr)) {
        logd("双击 滑动 成功")
    } else {
        logw("双击 滑动 失败 {}", cr)
    }

    sleep(2000)
    let tdx = 200;
    let tdy = 300;
    logd("测试 按下 功能 x={} y={}", tdx, tdy)
    cr = bleEvent.touchDown(tdx, tdy)
    if (_bleResultOk(cr)) {
        logd("按下 成功")
    } else {
        logw("按下 失败 {}", cr)
    }
    let endMoveX = tdx;
    let endMoveY = tdy;
    for (let i = 0; i < 10; i++) {
        sleep(20)
        let movex = tdx + (i * 10);
        let movey = tdy + (i * 10);
        endMoveX = movex;
        endMoveY = movey;
        cr = bleEvent.touchMove(movex, movey)
        if (_bleResultOk(cr)) {
            logd("移动成功 x={} y = {}", movex, movey)
        } else {
            logw("移动失败 x={} y= {}", movex, movey)
        }
    }

    logd("测试 抬起 功能 x={} y={}", endMoveX, endMoveY)
    cr = bleEvent.touchUp(endMoveX, endMoveY)
    if (_bleResultOk(cr)) {
        logd("抬起 成功")
    } else {
        logw("抬起 失败 {}", cr)
    }

}


function test_multiTouch() {
    sleep(1000)
    logd("开始测试多点触摸函数")
    // 最后一个抬起 最好与 最后一个移动保持一致 防止有错误的偏移
    let touch1 = [
        {"action": 0, "x": 500, "y": 1200, "delay": 10},
        {"action": 2, "x": 450, "y": 1100, "delay": 200},
        {"action": 2, "x": 400, "y": 1000, "delay": 100},
        {"action": 2, "x": 350, "y": 900, "delay": 100},
        {"action": 2, "x": 300, "y": 800, "delay": 100},
        {"action": 1, "x": 300, "y": 800, "delay": 2}
    ]

    let rr = bleEvent.multiTouch(touch1, 10000)

    if (_bleResultOk(rr)) {
        logd("执行多点触摸成功")
    } else {
        logd("执行多点触摸失败 {}", rr)
    }


}

function test_input() {
    logd("开始测试输入功能，请找一个输入，并且聚焦到输入框才能看到输入效果，或者使用备忘录app看效果")

    sleep(1000)
    logd("开始执行输入 a 字符")
    let sar = bleEvent.keyPressChar("", "a")
    if (_bleResultOk(sar)) {
        logd("执行 输入a字符 成功")
    } else {
        logd("执行 输入a字符 失败 {}", sar)
    }

    sleep(1000)
    logd("开始使用 ASCII码 输入 a 字符")
    sar = bleEvent.keyPress("", 97)
    if (_bleResultOk(sar)) {
        logd("执行 输入 ASCII码 a字符 成功")
    } else {
        logd("执行 输入 ASCII码 a字符 失败 {}", sar)
    }


    sleep(1000)
    let home = bleEvent.systemKey("home")
    if (_bleResultOk(home)) {
        logd("执行home成功")
    } else {
        logd("执行home失败 {}", home)
    }
}


function test_wifi_and_reset() {
    logd("这里是用来输入WiFi信息和重启的，一般WiFi设置好了不需要重复设置，这里是例子")
    let ir = bleEvent.setWifiInfo("wdes", "11111111")
    if (_bleResultOk(ir)) {
        logd("设置WiFi信息成功")
    } else {
        logw("设置WiFi信息失败 {}", ir)
    }
    sleep(1000)
    let rr = bleEvent.resetBle()

    if (_bleResultOk(rr)) {
        logd("重置开发板 成功")
    } else {
        logw("重置开发板 失败 {}", ir)
    }
}


function initMouse() {
    let msg = device.getDeviceMsg()
    let productType = "";
    let bleWifiIp = "";
    if (!_bleResultOk(msg)) {
        // 获取iPhone的类型，用来判断缩放标准
        let bb = JSON.parse(msg);
        productType = bb["productType"];
        bleWifiIp = bb["bleWifiIp"];
    }


    let scale = bleEvent.getIPhoneScale();
    logd("当前手机类型: {} , 缩放比例: {}  蓝牙开发板的IP: {}", productType, scale, bleWifiIp)
    //设置缩放比例，防止鼠标移动距离和手机上的像素点对不上
    bleEvent.setScale(scale, scale)
    let img = image.captureFullScreenNoAuto();
    if (img) {
        let w = img.getWidth();
        let h = img.getHeight();
        if (w > 0 && h > 0) {
            // 设置 屏幕的高度和宽度，防止鼠标漂移到屏幕外，如果不设置，就需要自己控制坐标不要漂移出去
            logd("设置屏幕的高度和宽度")
            bleEvent.setScreenSize(w, h)
        }
    }
}

/**
 * 链接方式
 * @param type 1=串口 2 = 网络
 * @param timeout 超时时间
 * @return {boolean} true =  成功 false = 失败
 */
function openConnect(type, timeout) {
    if (type == 2) {
        logd("设置为网络通信模式...")
        bleEvent.setSendCmdType(2)
        return true;
    } else {
        logd("准备打开串口通信...")
        bleEvent.setSendCmdType(1)
        // 连续开启三次 如果还不行 就是失败了
        for (let i = 0; i < 3; i++) {
            // 先关闭一次
            // bleEvent.closeSerial();
            sleep(1000 + (200 * 3))
            let rr = bleEvent.openSerial(timeout)
            if (_bleResultOk(rr)) {
                return true;
            }
        }

    }
    return false;
}


function _bleResultOk(r) {
    return r == null || r == "";
}

main();
```

## bleEvent.setScale 设置鼠标补偿比率

* 设置鼠标补偿比率
* 注意：如果你使用的是**绝对坐标固件**，一定要设置补偿率为 1
* 如果没有你的机型，需你自己使用鼠标移动的方式尝试计算
* 鼠标移动1单位，像素移动多少单位，这样的比率，默认是2.0
* iPhone 6/7/8 375 x 667 设置为 2.0，标准 16:9，无安全区干扰。
* iPhone 11 / XR 414 x 896 设置为 1.96 屏幕变长，系统加速补偿 Y 轴。
* iPhone X/XS/11Pro 375 x 812 设置为 1.98 纵横比 19.5:9，存在微小加速。
* iPhone 12/13/14/15 390 x 844 设置为 1.97 逻辑点数与 11 不同，加速曲线略有变动。
* Plus / Max 系列 414 x 896 / 430 x 932 设置为1.94 ~ 1.95 屏幕最高，系统为了操作效率会大幅增加 Y 轴增益。
* 这个是没有算法的，都是实验推测出来的
* 适配EC iOS USB版本9.20.0+
* @param x_scale x坐标系浮点数
* @param y_scale x坐标系浮点数
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
function main() {
    // 参考 bleEvent.openSerial 例子
}

main();
```

## bleEvent.getIPhoneScale 获取计算缩放值

* 根据 iPhone 硬件标识符的前缀（忽略逗号后数字）返回缩放值
* @returns `{number}` 浮点型 缩放比例

```javascript showLineNumbers
function main() {
    // 参考 bleEvent.openSerial 例子
}

main();
```

## bleEvent.setScreenSize 设置屏幕尺寸

* 这个用来防止鼠标移动到屏幕外，导致鼠标偏移
* 如果不知道屏幕尺寸，就使用截图后的图片的宽度和高度
* 适配EC iOS USB版本9.20.0+
* @param w 屏幕的宽度
* @param h 屏幕的高度
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
function main() {
    // 参考 bleEvent.openSerial 例子
}

main();
```

## bleEvent.setSendCmdType 设置通信方式

* 设置通信方式
* 用来设置是通过串口还是通过网络和开发板通信
* 默认是 串口
* 适配EC iOS USB版本9.20.0+
* @param tt 1 串口 2 网络
* @returns `{string} `null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
function main() {
    // 参考 bleEvent.openSerial 例子
}

main();
```

## bleEvent.setWifiInfo 设置网络信息

* 设置网络信息
* 方便开发板联网
* 适配EC iOS USB版本9.20.0+
* @param name WiFi名称
* @param pwd WiFi 密码
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
function main() {
    // 参考 bleEvent.openSerial 例子
}

main();
```

## bleEvent.resetBle 重启开发板

* 重启开发板
* 相当于按了开发板的RST键
* 适配EC iOS USB版本9.20.0+
* @returns `{string} `null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
function main() {
    // 参考 bleEvent.openSerial 例子
}

main();
```

## bleEvent.closeSerial 关闭串口通信

* 关闭串口通信
* 适配EC iOS USB版本9.20.0+
* @returns `{string} `null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
function main() {
    // 参考 bleEvent.openSerial 例子
}

main();
```

## bleEvent.mouseMove 移动鼠标

* 移动鼠标
* 只移动鼠标，没有按下动作
* 适配EC iOS USB版本9.20.0+
* @param x X坐标
* @param y Y坐标
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
function main() {
    // 参考 bleEvent.openSerial 例子
}

main();
```

## bleEvent.resetZero 鼠标归零

* 鼠标归零
* 鼠标移动到0,0的右上角坐标
* 适配EC iOS USB版本9.20.0+
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
function main() {
    // 参考 bleEvent.openSerial 例子
}

main();
```

## bleEvent.touchDown 按下坐标点

* 按下坐标点
* 适配EC iOS USB版本9.20.0+
* @param x X坐标
* @param y Y坐标
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
function main() {
    // 参考 bleEvent.openSerial 例子
}

main();
```


## bleEvent.touchMove 移动坐标点

* 移动坐标点
* 适配EC iOS USB版本9.20.0+
* @param x X坐标
* @param y Y坐标
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
function main() {
    // 参考 bleEvent.openSerial 例子
}

main();
```

## bleEvent.touchUp 抬起坐标点

* 抬起坐标点
* 适配EC iOS USB版本9.20.0+
* @param x X坐标
* @param y Y坐标
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
function main() {
    // 参考 bleEvent.openSerial 例子
}

main();
```


## bleEvent.clickPoint 点击坐标点

* 点击坐标点
* 适配EC iOS USB版本9.20.0+
* @param x X坐标
* @param y Y坐标
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
function main() {
    // 参考 bleEvent.openSerial 例子
}

main();
```


## bleEvent.press 长按坐标

* 长按坐标
* 适配EC iOS USB版本9.20.0+
* @param x x坐标
* @param y y坐标
* @param delay 长按时间  毫秒
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
function main() {
    // 参考 bleEvent.openSerial 例子
}

main();
```



## bleEvent.doubleClickPoint 双击坐标

* 双击坐标
* 适配EC iOS USB版本9.20.0+
* @param x x坐标
* @param y y坐标
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
function main() {
    // 参考 bleEvent.openSerial 例子
}

main();
```

## bleEvent.swipeToPoint 滑动

* 从一个坐标到另一个坐标的滑动
* 适配EC iOS USB版本9.20.0+
* @param startX 起始坐标的X轴值
* @param startY 起始坐标的Y轴值
* @param endX 结束坐标的X轴值
* @param endY 结束坐标的Y轴值
* @param duration 持续时长 单位毫秒
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
function main() {
    // 参考 bleEvent.openSerial 例子
}

main();

```


## bleEvent.multiTouch 多点触摸

* 多点触摸<br/>
* 触摸参数: action :一般情况下 按下为0，弹起为1，移动为2<br/>
* x: X坐标<br/>
* y: Y坐标<br/>
* pointer：设置第几个手指触摸点，分别是 1，2，3等，代表第n个手指<br/>
* delay: 该动作延迟多少毫秒执行
* 适配EC iOS USB版本9.20.0+
* @param touch1 第1个手指的触摸点数组,例如：`[{"action":0,"x":1,"y":1,"pointer":1,"delay":20},{"action":2,"x":1,"y":1,"pointer":1,"delay":20}]`
* @param timeout 多点触摸执行的超时时间，单位是毫秒
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息
```javascript showLineNumbers
function main() {
    // 参考 bleEvent.openSerial 例子
}

main();

```



## bleEvent.systemKey 系统按键

* 系统按键
* 适配EC iOS USB版本9.20.0+
* @param key 目前有 home,recents=最近的任务
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
function main() {
    // 参考 bleEvent.openSerial 例子
}

main();

```


## bleEvent.keyPress 按键

* 按键
* 适配EC iOS USB版本9.20.0+
* @param prefix 组合键，可以为空 alt=alt按键，ctrl=CTRL按键,gui=win或者command键，r_ctrl=右侧CTRL键，r_shift=右侧shift键，shift=shift键
* @param code 整型，例如 65,ASCII码，参考 https://tool.oschina.net/commons?type=4
* @returns `{string} `null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
function main() {
    // 参考 bleEvent.openSerial 例子
}

main();

```


## bleEvent.keyPressChar 字符按键

* 字符按键
* 适配EC iOS USB版本9.20.0+
* @param prefix 组合键，可以为空 alt=alt按键，ctrl=CTRL按键,gui=win或者command键，r_ctrl=右侧CTRL键，r_shift=右侧shift键，shift=shift键
* @param code 字符，例如 a
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
function main() {
    // 参考 bleEvent.openSerial 例子
}

main();

```
## bleEvent.setStep 设置步伐大小

* 设置步伐大小
* 适配EC iOS USB版本9.20.0+
* @param step 10 - 120 移动鼠标每一步最大的值，值越大移动越快默认是100
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
function main() {
    let r = bleEvent.setStep(50);
}
```


## bleEvent.toggleSoftKeyboard 字符按键

* 开关软键盘
* 实际在测试iphone7的系统上，蓝牙连接后，输入框无法弹出软键盘配合脱机主程序实现输入，可以试试这个方法，iPhone11没有这样问题，跟系统版本有关系
* 如果你不用脱机主程序作为输入法，忽略这个方法
* 适配EC iOS USB版本9.20.0+
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息


```javascript showLineNumbers
function main() {
    // 让输入框聚焦 后执行下面的函数
   let r = bleEvent.toggleSoftKeyboard();
   if(r == null || r == ""){
       logd("弹出成功")
   }else{
       logd("弹出失败 "+r)
   }
}

main();

```

## bleEvent.showBleName 显示蓝牙名称

* 显示蓝牙名称
* 适配EC iOS USB版本 9.21.0+
* 有助于能够搜索到
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
// 参考 bleEvent.light 的代码例子
```


## bleEvent.hideBleName 隐藏蓝牙名称

* 隐藏蓝牙名称
* 防检测
* 适配EC iOS USB版本 9.21.0+
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
// 参考 bleEvent.light 的代码例子
```



## bleEvent.light 点亮LED

* 点亮LED
* 适配EC iOS USB版本 9.21.0+
* @param num 循环点亮次数
* @param lightToOff 从亮到灭过程的时间 单位毫秒
* @param offToLight 从灭再到亮的过程时间 单位毫秒
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
function main() {
    initMouse();
    if (!openConnect(1, 15000)) {
        logw("开启通信失败，无法进行下一步，请检查蓝牙设备是否正常")
        return
    }
    logd("通信正常,开始执行中")
    // 将鼠标移动到0,0
    let r = bleEvent.resetZero()
    if (_bleResultOk(r)) {
        logd("恢复鼠标原始坐标成功")
    } else {
        logd("恢复鼠标原始坐标失败 {}", r)
        return
    }


    test_light_and_hide()

}


function initMouse() {
    let msg = device.getDeviceMsg()
    let productType = "";
    let bleWifiIp = "";
    if (!_bleResultOk(msg)) {
        // 获取iPhone的类型，用来判断缩放标准
        let bb = JSON.parse(msg);
        productType = bb["productType"];
        bleWifiIp = bb["bleWifiIp"];
    }


    let scale = bleEvent.getIPhoneScale();
    logd("当前手机类型: {} , 缩放比例: {}  蓝牙开发板的IP: {}", productType, scale, bleWifiIp)
    //设置缩放比例，防止鼠标移动距离和手机上的像素点对不上
    // * 注意：如果你使用的是**绝对坐标固件**，一定要设置补偿率为 1
    bleEvent.setScale(scale, scale)
    let img = image.captureFullScreenNoAuto();
    if (img) {
        let w = img.getWidth();
        let h = img.getHeight();
        if (w > 0 && h > 0) {
            // 设置 屏幕的高度和宽度，防止鼠标漂移到屏幕外，如果不设置，就需要自己控制坐标不要漂移出去
            logd("设置屏幕的高度和宽度")
            bleEvent.setScreenSize(w, h)
        }
    }
}

/**
 * 链接方式
 * @param type 1=串口 2 = 网络
 * @param timeout 超时时间
 * @return {boolean} true =  成功 false = 失败
 */
function openConnect(type, timeout) {
    if (type == 2) {
        logd("设置为网络通信模式...")
        bleEvent.setSendCmdType(2)
        return true;
    } else {
        logd("准备打开串口通信...")
        bleEvent.setSendCmdType(1)
        // 连续开启三次 如果还不行 就是失败了
        for (let i = 0; i < 3; i++) {
            // 先关闭一次
            bleEvent.closeSerial();
            sleep(1000 + (200 * 3))
            let rr = bleEvent.openSerial(timeout)
            if (_bleResultOk(rr)) {
                return true;
            }
        }

    }
    return false;
}


function _bleResultOk(r) {
    return r == null || r == "";
}



function test_light_and_hide() {
    let show = bleEvent.showBleName();
    if (show == null || show == "") {
        logd("显示蓝牙成功")
    } else {
        logw("显示蓝牙名称失败: " + show)
    }

    sleep(1000)

    let hide = bleEvent.hideBleName();
    if (hide == null || hide == "") {
        logd("隐藏蓝牙成功")
    } else {
        logw("隐藏蓝牙名称失败: " + hide)
    }

    sleep(1000)
    logd("开始了亮灯")

    let lg = bleEvent.light(5, 1000, 1000);
    if (lg == null || lg == "") {
        logd("亮灯 成功")
    } else {
        logw("亮灯 失败: " + lg)
    }

    sleep(2000)

}

main()


```


## 利用快捷指令进行输入文字
- 下面是测试通过的代码

```javascript showLineNumbers
function main() {
    initMouse();
    if (!openConnect(1, 15000)) {
        logw("开启通信失败，无法进行下一步，请检查蓝牙设备是否正常")
        return
    }
    logd("通信正常,开始执行中")
    // 将鼠标移动到0,0
    let r = bleEvent.resetZero()
    if (_bleResultOk(r)) {
        logd("恢复鼠标原始坐标成功")
    } else {
        logd("恢复鼠标原始坐标失败 {}", r)
        return
    }

    test_ble_shortcut_input()

}



function initMouse() {
    let msg = device.getDeviceMsg()
    let productType = "";
    let bleWifiIp = "";
    if (!_bleResultOk(msg)) {
        // 获取iPhone的类型，用来判断缩放标准
        let bb = JSON.parse(msg);
        productType = bb["productType"];
        bleWifiIp = bb["bleWifiIp"];
    }


    let scale = bleEvent.getIPhoneScale();
    logd("当前手机类型: {} , 缩放比例: {}  蓝牙开发板的IP: {}", productType, scale, bleWifiIp)
    //设置缩放比例，防止鼠标移动距离和手机上的像素点对不上
    // * 注意：如果你使用的是**绝对坐标固件**，一定要设置补偿率为 1
    bleEvent.setScale(scale, scale)
    let img = image.captureFullScreenNoAuto();
    if (img) {
        let w = img.getWidth();
        let h = img.getHeight();
        if (w > 0 && h > 0) {
            // 设置 屏幕的高度和宽度，防止鼠标漂移到屏幕外，如果不设置，就需要自己控制坐标不要漂移出去
            logd("设置屏幕的高度和宽度")
            bleEvent.setScreenSize(w, h)
        }
    }
}

/**
 * 链接方式
 * @param type 1=串口 2 = 网络
 * @param timeout 超时时间
 * @return {boolean} true =  成功 false = 失败
 */
function openConnect(type, timeout) {
    if (type == 2) {
        logd("设置为网络通信模式...")
        bleEvent.setSendCmdType(2)
        return true;
    } else {
        logd("准备打开串口通信...")
        bleEvent.setSendCmdType(1)
        // 连续开启三次 如果还不行 就是失败了
        for (let i = 0; i < 3; i++) {
            // 先关闭一次
            bleEvent.closeSerial();
            sleep(1000 + (200 * 3))
            let rr = bleEvent.openSerial(timeout)
            if (_bleResultOk(rr)) {
                return true;
            }
        }

    }
    return false;
}


function _bleResultOk(r) {
    return r == null || r == "";
}
function test_ble_shortcut_input() {
    let msg = device.getDeviceMsg()
    // 获取蓝牙的地址 是为了做唯一的设备标识，简单 容易些
    let bleMac = "";
    if (msg != null && msg != "") {
        // 获取iPhone的类型，用来判断缩放标准
        let bb = JSON.parse(msg);
        bleMac = bb["bleMac"];
    }
    if (bleMac == null || bleMac == "") {
        logw("没有获取到ble的mac地址")
        return
    }
    logd("获取到该设备绑定的ble mac地址作为唯一标识 {}", bleMac)

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
    let gs = bleEvent.keyPressChar("gui", "u")
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
    let gsv = bleEvent.keyPressChar("gui", "v")
    if (gsv != null && gsv != "") {
        logw("执行粘贴快捷指令快捷键失败 " + gs)
        return
    }

    logd("执行粘贴成功")
}

main()





```



## 利用快捷指令进行插入相册 
- 下面是测试通过的代码

```javascript

function main() {
    initMouse();
    if (!openConnect(1, 15000)) {
        logw("开启通信失败，无法进行下一步，请检查蓝牙设备是否正常")
        return
    }
    logd("通信正常,开始执行中")
    // 将鼠标移动到0,0
    let r = bleEvent.resetZero()
    if (_bleResultOk(r)) {
        logd("恢复鼠标原始坐标成功")
    } else {
        logd("恢复鼠标原始坐标失败 {}", r)
        return
    }


    test_ble_insert()

  
}








function initMouse() {
    let msg = device.getDeviceMsg()
    let productType = "";
    let bleWifiIp = "";
    if (!_bleResultOk(msg)) {
        // 获取iPhone的类型，用来判断缩放标准
        let bb = JSON.parse(msg);
        productType = bb["productType"];
        bleWifiIp = bb["bleWifiIp"];
    }


    let scale = bleEvent.getIPhoneScale();
    logd("当前手机类型: {} , 缩放比例: {}  蓝牙开发板的IP: {}", productType, scale, bleWifiIp)
    //设置缩放比例，防止鼠标移动距离和手机上的像素点对不上
    // * 注意：如果你使用的是**绝对坐标固件**，一定要设置补偿率为 1
    bleEvent.setScale(scale, scale)
    let img = image.captureFullScreenNoAuto();
    if (img) {
        let w = img.getWidth();
        let h = img.getHeight();
        if (w > 0 && h > 0) {
            // 设置 屏幕的高度和宽度，防止鼠标漂移到屏幕外，如果不设置，就需要自己控制坐标不要漂移出去
            logd("设置屏幕的高度和宽度")
            bleEvent.setScreenSize(w, h)
        }
    }
}

/**
 * 链接方式
 * @param type 1=串口 2 = 网络
 * @param timeout 超时时间
 * @return {boolean} true =  成功 false = 失败
 */
function openConnect(type, timeout) {
    if (type == 2) {
        logd("设置为网络通信模式...")
        bleEvent.setSendCmdType(2)
        return true;
    } else {
        logd("准备打开串口通信...")
        bleEvent.setSendCmdType(1)
        // 连续开启三次 如果还不行 就是失败了
        for (let i = 0; i < 3; i++) {
            // 先关闭一次
            bleEvent.closeSerial();
            sleep(1000 + (200 * 3))
            let rr = bleEvent.openSerial(timeout)
            if (_bleResultOk(rr)) {
                return true;
            }
        }

    }
    return false;
}


function _bleResultOk(r) {
    return r == null || r == "";
}



function test_ble_insert() {
    let msg = device.getDeviceMsg()
    let bleMac = "";
    if (msg != null && msg != "") {
        // 获取iPhone的类型，用来判断缩放标准
        let bb = JSON.parse(msg);
        bleMac = bb["bleMac"];
    }
    if (bleMac == null || bleMac == "") {
        logw("没有获取到ble的mac地址")
        return
    }
    logd("获取到该设备绑定的ble mac地址作为唯一标识 {}", bleMac)

    let data = {
    }
    // 提交给 iOS快捷指令助手服务 ，上传图片或者视频的接口，如果你部署在外网就写外网的地址
    // key 是mac地址 作为标识
    let post_url = "http://192.168.2.26:8696/upload?key="+bleMac
    // 这里选择一个视频
    let file = {
        "file":"c:/Downloads/QQ2025522-95310.mp4"
    }
    let result = http.httpPost(post_url, data,file, 20 * 1000, {});
    if (result == null || result == "") {
        logw("提交数据 iOS快捷指令助手服务 失败")
        return;
    }
    logd("提交结果: "+result)
    result = JSON.parse(result)
    if (result["code"] != 0) {
        logw("提交数据 iOS快捷指令助手服务 失败," + result["msg"])
        return;
    }
    // 开始执行快捷指令 是之前绑定的快捷键
    let gs = bleEvent.keyPressChar("gui", "i")
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
