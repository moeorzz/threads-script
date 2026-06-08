---
title: EasyClick自动化脚本_iOS脚本_iOS免越狱_iOS免硬件_OTG HID函数
hide_title: false
hide_table_of_contents: false
sidebar_label: OTG HID函数
description: EasyClick 自动化脚本 iOS免越狱 OTG HID函数
keywords:
  - EasyClick自动化脚本
  - iOS脚本
  - iOS免越狱
  - iOS免硬件
  - OTG HID函数
  - otgEvent
  - OTG
  - HID
  - otg
  - iOS
  - EC
  - 6.6.0
  - isConnected
  - setUrl
  - setTimeout
  - EasyClick
  - 手机自动化
  - 自动化测试
---

# OTG HID函数

## 说明

- OTG模块函数主要是模拟网卡、键盘、鼠标，插上了可以使用同时使用有线网络、鼠标和键盘
- OTG模块的对象前缀是 otgEvent
- OTG HID硬件的配置具体可以看这个教程 [OTG HID使用教程](/iostjdocs/zh-cn/advance/tj-otg-starter)

## otgEvent.isConnected OTG是否连接

* 判断是否连接
* 适配EC 脱机版6.6.0+
* @returns `{boolean}` true 代表已经链接， false未链接

```javascript showLineNumbers

function _isOtgResultOk(r) {
    return r == null || r == "";
}

function reset_screen_size_by_activeself() {
    // 也可以使用device模块中获取设备高度和宽度函数
    let ss = activeSelf.deviceOrientation(10000)
    if (ss) {
        logd("当前屏幕方向:  " + ss["data"])
    }
    logd("开始截图 ")
    console.time(1)
    let img = activeSelf.screenshot(10000)
    logd(img)
    if (img) {
        logd("图像的高度: ", img.getWidth() + "," + img.getHeight())
        let set = otgEvent.setScreenSize(img.getWidth(), img.getHeight())
        if (_isOtgResultOk(set)) {
            logd("设置屏幕尺寸成功")
        } else {
            logw("设置屏幕尺寸 失败 ")
        }
        img.recycle()
    }
    logd("end，消耗时间(ms) ", console.timeEnd(1))
}


function testSystemKey() {
    logd("测试系统按键功能")
    sleep(200)
    let rc = otgEvent.systemKey("recents")
    if (_isOtgResultOk(rc)) {
        logd("执行 recents 成功")
    } else {
        logw("执行 recents 失败")
    }
    sleep(3000)
    let hm = otgEvent.systemKey("home");
    if (_isOtgResultOk(hm)) {
        logd("执行 home 成功")
    } else {
        logw("执行 home 失败")
    }

}

function test_click() {
    logd("开始测试点击，等手势动作功能")
    sleep(1000)
    logd("重置坐标到0,0")
    if (!_isOtgResultOk(otgEvent.resetZero())) {
        logw("鼠标归零失败")
        return
    }
    logd("鼠标归零成功")
    otgEvent.setStep(100)
    sleep(1000)
    if (!_isOtgResultOk(otgEvent.clickPoint(300, 420))) {
        logw("鼠标 点击 300,420 失败")
        return;
    }
    logd("鼠标 点击 300,420 成功")


    sleep(1000)
    if (!_isOtgResultOk(otgEvent.doubleClickPoint(600, 500))) {
        logw("鼠标 双击 600,500 失败")
        return;
    }
    logd("鼠标 双击 600,500 成功")

    sleep(1000)
    if (!_isOtgResultOk(otgEvent.press(620, 520, 5000))) {
        logw("鼠标 长按 620,520 失败")
        return;
    }
    logd("鼠标 长按 620,520 成功")

    sleep(1000)
    if (!_isOtgResultOk(otgEvent.mouseMoveDistance(10, 10, true))) {
        logw("鼠标 按下 移动 10,10像素 失败")
        return;
    }
    logd("鼠标 按下 移动 10,10像素 成功")
    sleep(1000)
    if (!_isOtgResultOk(otgEvent.mouseMoveDistance(10, 10, false))) {
        logw("鼠标 移动 10,10像素 失败")
        return;
    }
    logd("鼠标 移动 10,10像素 成功")
}

function testOtgMtouch() {
    let touch1 = [
        {
            "action": 0, "x": 300,
            "y": 900, "pointer": 1, "delay": 1
        },
        {
            "action": 2,
            "x": 500,
            "y": 800,
            "pointer": 1,
            "delay": 20
        }, {
            "action": 2,
            "x": 500,
            "y": 500,
            "pointer": 1,
            "delay": 20
        },
        {
            "action": 1,
            "x": 100,
            "y": 300,
            "pointer": 1,
            "delay": 20
        }];

    let m = otgEvent.multiTouch(touch1, 10000)
    if (_isOtgResultOk(m)) {
        logd("测试 multiTouch 成功")
    } else {
        logw("测试 multiTouch 失败 " + m)
    }
}

function test_touch() {
    logd("开始测试touch动作")
    sleep(1000)

    if (_isOtgResultOk(otgEvent.touchDown(200, 300))) {
        logd("测试 touchDown 200,300 成功")
    } else {
        logw("测试 touchDown 200,300 成功")
    }
    sleep(100)
    if (_isOtgResultOk(otgEvent.touchMove(220, 320))) {
        logd("测试 touchMove 220,320 成功")
    } else {
        logw("测试 touchMove 220,320 成功")
    }
    sleep(100)
    if (_isOtgResultOk(otgEvent.touchMove(250, 360))) {
        logd("测试 touchMove 250,360 成功")
    } else {
        logw("测试 touchMove 250,360 成功")
    }
    sleep(100)
    if (_isOtgResultOk(otgEvent.touchUp(250, 360))) {
        logd("测试 touchUp 250,360 成功")
    } else {
        logw("测试 touchUp 250,360 成功")
    }
    logd("开始测试滑动")
    sleep(2000)

    if (_isOtgResultOk(otgEvent.swipeToPoint(200, 400, 290, 800, 2000))) {
        logd("测试滑动 swipeToPoint 200,400,290,800, 成功")
    } else {
        logw("测试滑动 swipeToPoint 200,400,290,800, 失败")
    }
}

function test_otg_keyboard() {
    logd("请找到一个输入进行测试")
    sleep(2000)
    if (_isOtgResultOk(otgEvent.keyPressChar("", "a"))) {
        logd("输入 a 成功 ")
    } else {
        logw("输入 a 失败 ")
    }
    sleep(1000)
    if (_isOtgResultOk(otgEvent.pressMouseBtn(8))) {
        logd("输入 pressMouseBtn 8 成功 ")
    } else {
        logw("输入 pressMouseBtn 8 失败 ")
    }

    sleep(1000)
    if (_isOtgResultOk(otgEvent.toggleSoftKeyboard())) {
        logd("输入 toggleSoftKeyboard  成功 ")
    } else {
        logw("输入 toggleSoftKeyboard  失败 ")
    }

}


function test_otg() {
    logd("开始测试OTG功能")
    sleep(1000)
    logd("设置超时时间为 20000 ms")
    otgEvent.setTimeout(20000)
    sleep(1000)

    if (!otgEvent.isConnected()) {
        logw("OTG设备未准备好")
        return
    }
    logd("OTG已经准备好")

    let ok = otgEvent.setLastScale()
    logd("setLastScale : {}", ok)
    if (!_isOtgResultOk(ok)) {
        console.log("如果你使用的是绝对坐标固件，请将scale设置为1")
        let scale = bleEvent.getIPhoneScale();
        let setscle = otgEvent.setScale(scale, scale)
        if (!_isOtgResultOk(setscle)) {
            logd("设置补偿比例失败")
            return;
        }
    } else {
        logd("使用校准的补偿比例")
    }


    reset_screen_size_by_activeself();
    console.log("reset " + otgEvent.resetZero())
    sleep(1000)

    // testSystemKey();
    //
    test_click();
    test_touch();
    //
    // logd("开始测试 多点触摸 ")
    // otgEvent.resetZero()
    // sleep(2000)
    // testOtgMtouch();


    test_otg_keyboard();

}


test_otg()
```

## otgEvent.setUrl 设置otg设备地址

* 设置otg设备地址
* 适配EC 脱机版6.6.0+
* 一般不用设置的，预留接口而已，默认就是  http://172.31.255.1/
* @param iur OTG设备地址
* @returns `{string}` 空字符串成功，非空为错误消息

```javascript showLineNumbers
    // 代码参考 otgEvent.isConnected 的全部例子代码
```

## otgEvent.setTimeout 设置超时

* 设置超时
* 设置请求超时时间（毫秒），用于OTG请求
* 适配EC 脱机版6.6.0+
* @param timeoutMs 单位是毫秒
* @returns `{string}` 空字符串成功，非空为错误消息

```javascript showLineNumbers
    // 代码参考 otgEvent.isConnected 的全部例子代码
```

## otgEvent.clickPoint 点击

* 点击
* 适配EC 脱机版6.6.0+
* @param x X坐标
* @param y Y坐标
* @returns `{string}` 空字符串成功，非空为错误消息

```javascript showLineNumbers
    // 代码参考 otgEvent.isConnected 的全部例子代码
```

## otgEvent.mouseMove 鼠标移动

* 鼠标移动
* 适配EC 脱机版6.6.0+
* @param x X坐标
* @param y Y坐标
* @returns `{string}` 空字符串成功，非空为错误消息

```javascript showLineNumbers
    // 代码参考 otgEvent.isConnected 的全部例子代码
```

## otgEvent.resetZero 鼠标归零

* 鼠标归零
* 适配EC 脱机版6.6.0+
* @returns `{string}` 空字符串成功，非空为错误消息

```javascript showLineNumbers
    // 代码参考 otgEvent.isConnected 的全部例子代码
```

## otgEvent.setStep 步伐大小

* 步伐大小
* 适配EC 脱机版6.6.0+
* 步伐越大 移动越快
* @param step 1和120之间
* @returns `{string}` 空字符串成功，非空为错误消息

```javascript showLineNumbers
    // 代码参考 otgEvent.isConnected 的全部例子代码
```

## otgEvent.setScale 设置鼠标补偿比率

* 设置鼠标补偿比率
* 绝对坐标固件设置为1.0
* 注意：可以在APP的设置中，进行OTG的坐标校准，完成后会保存补偿率，下一次脚本中先使用setLastScale
* 鼠标移动1单位，像素移动多少单位，这样的比率，默认是2.0
* iPhone 6/7/8 375 x 667 设置为 2.0，标准 16:9，无安全区干扰。
* iPhone 11 / XR 414 x 896 设置为 1.96 屏幕变长，系统加速补偿 Y 轴。
* iPhone X/XS/11Pro 375 x 812 设置为 1.98 纵横比 19.5:9，存在微小加速。
* iPhone 12/13/14/15 390 x 844 设置为 1.97 逻辑点数与 11 不同，加速曲线略有变动。
* Plus / Max 系列 414 x 896 / 430 x 932 设置为1.94 ~ 1.95 屏幕最高，系统为了操作效率会大幅增加 Y 轴增益。
* @param x_scale x坐标系浮点数
* @param y_scale x坐标系浮点数
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 otgEvent.isConnected 的全部例子代码
```

## otgEvent.setLastScale 使用上一次补偿率

* 使用上一次补偿率
* 适配EC 脱机版6.6.0+
* 如果这个失败就用setScale，或者去APP的设置中，进行OTG的坐标校准
* @returns `{*|string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 otgEvent.isConnected 的全部例子代码
```

## otgEvent.press 长按坐标

* 长按坐标
* 适配EC 脱机版6.6.0+
* @param x x坐标
* @param y y坐标
* @param delay 长按时间 毫秒
* @returns` {string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 otgEvent.isConnected 的全部例子代码
```

## otgEvent.setScreenSize 设置屏幕尺寸

* 设置屏幕尺寸
* 适配EC 脱机版6.6.0+
* 这个用来防止鼠标移动到屏幕外，导致鼠标偏移，绝对坐标固件用来计算比率的
* 如果不知道屏幕尺寸，就使用截图后的图片的宽度和高度
* 或者使用device模块的函数
* @param w 屏幕的宽度
* @param h 屏幕的高度
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 otgEvent.isConnected 的全部例子代码
```

## otgEvent.mouseMoveDistance 移动鼠标(带按下参数)

* 移动鼠标(带按下参数)
* 适配EC 脱机版6.6.0+
* 只移动鼠标，可带按下参数
* 如果x,y都写0，发送两次第一次press=true，第二次press=false，就代表是单击了
* 适配EC iOS 脱机版 6.5.0+
* @param x_dis X的像素距离 不能大于127
* @param y_dis Y的像素距离 不能大于127
* @param press true 是按下
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 otgEvent.isConnected 的全部例子代码
```

## otgEvent.pressMouseBtn 点击鼠标键

* 点击鼠标键
* 适配EC 脱机版6.6.0+
* 可用于自定义辅助触控的-自定义更多按钮
* 为了防止冲突，建议从4开始，到8结束
* @param b 鼠标键名称，从1开始，一般1是左键，2是右键，3是中间滚轮键，剩下的是4-8
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 otgEvent.isConnected 的全部例子代码
```

## otgEvent.doubleClickPoint 双击坐标

* 双击坐标
* 适配EC 脱机版6.6.0+
* @param x X坐标
* @param y Y坐标
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 otgEvent.isConnected 的全部例子代码
```

## otgEvent.multiTouch 多点触摸

* 多点触摸
* 适配EC 脱机版6.6.0+
* 触摸参数: action :一般情况下 按下为0，弹起为1，移动为2
* x: X坐标
* y: Y坐标
* pointer：设置第几个手指触摸点，分别是 1，2，3等，代表第n个手指<br/>
* delay: 该动作延迟多少毫秒执行
* @param touch1 第1个手指的触摸点数组,例如：
  `[{"action":0,"x":1,"y":1,"pointer":1,"delay":20},{"action":2,"x":1,"y":1,"pointer":1,"delay":20}]`
* @param timeout 多点触摸执行的超时时间，单位是毫秒
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 otgEvent.isConnected 的全部例子代码
```

## otgEvent.swipeToPoint 滑动

* 滑动
* 适配EC 脱机版6.6.0+
* @param x 起始坐标的X轴值
* @param y 起始坐标的Y轴值
* @param ex 结束坐标的X轴值
* @param ey 结束坐标的Y轴值
* @param delay 持续时长 单位毫秒
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 otgEvent.isConnected 的全部例子代码
```

## otgEvent.touchDown 按下坐标点

* 按下坐标点
* 适配EC 脱机版6.6.0+
* @param x X坐标
* @param y Y坐标
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 otgEvent.isConnected 的全部例子代码
```

## otgEvent.touchMove 移动坐标点

* 移动坐标点
* 适配EC 脱机版6.6.0+
* @param x X坐标
* @param y Y坐标
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 otgEvent.isConnected 的全部例子代码
```

## otgEvent.touchUp 抬起坐标点

* 抬起坐标点
* 适配EC 脱机版6.6.0+
* @param x X坐标
* @param y Y坐标
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 otgEvent.isConnected 的全部例子代码
```

## otgEvent.systemKey 系统按键

* 系统按键
* 适配EC 脱机版6.6.0+
* @param key 目前有 home,recents=最近的任务
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 otgEvent.isConnected 的全部例子代码
```

## otgEvent.keyPressChar 字符按键

* 字符按键
* 适配EC 脱机版6.6.0+
* @param prefix 组合键，可以为空 alt=alt按键，ctrl=CTRL按键,gui=win或者command键，r_ctrl=右侧CTRL键，r_shift=右侧shift键，shift=shift键
* @param code 字符，例如 a
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 otgEvent.isConnected 的全部例子代码
```

## otgEvent.keyPress 按键

* 按键
* 适配EC 脱机版6.6.0+
* @param prefix 组合键，可以为空 alt=alt按键，ctrl=CTRL按键,gui=win或者command键，r_ctrl=右侧CTRL键，r_shift=右侧shift键，shift=shift键
* @param code 整型，例如 65,ASCII码，参考 https://tool.oschina.net/commons?type=4
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 otgEvent.isConnected 的全部例子代码
```

## otgEvent.toggleSoftKeyboard 开关软键盘

* 开关软键盘
* 适配EC 脱机版6.6.0+
* 实际在测试iphone7的系统上，输入框无法弹出软键盘配合脱机主程序实现输入，可以试试这个方法，iPhone11没有这样问题，跟系统版本有关系
* 如果你不用脱机主程序作为输入法，忽略这个方法
* 适配EC iOS 脱机版 6.5.0+
* @returns `{string}` null或者空字符串，代表成功，其他代表错误信息

```javascript showLineNumbers
    // 代码参考 otgEvent.isConnected 的全部例子代码
```




## otgEvent.startKeepAlive 鼠标心跳

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
otgEvent.startKeepAlive(5000,1)
```



## otgEvent.stopKeepAlive 停止心跳
* 停止心跳
* @returns `{string}` 空字符串成功，非空为错误消息
```javascript showLineNumbers
    // 直接调用即可
    otgEvent.stopKeepAlive()
```


## otgEvent.getMacAddress 获取mac地址

* 获取mac地址
* @returns `{string}` 有数据就代表获取到了mac地址
```javascript showLineNumbers
    // 直接调用即可
    logd(otgEvent.getMacAddress())
```

