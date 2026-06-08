---
title: EasyClick自动化脚本_iOS脚本_iOS免越狱_iOS免硬件_全局快捷事件
hide_title: false
hide_table_of_contents: false
sidebar_label: 全局快捷事件
description: EasyClick 自动化脚本 iOS免越狱 全局快捷事件
keywords:
  - EasyClick自动化脚本
  - iOS脚本
  - iOS免越狱
  - iOS免硬件
  - 全局快捷事件
  - param
  - return
  - iOS
  - clickPoint
  - clickPointPressure
  - longClickPoint
  - doubleClickPoint
  - press
  - EasyClick
  - multiTouch
  - 手机自动化
  - 自动化测试
  - 脚本开发
---

# 全局快捷事件

## 说明

全局模块中封装的快捷事件

## 点击函数

### clickPoint 坐标点击

* 点击坐标
* @param x x坐标
* @param y y坐标
* @return boolean

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
* 适合 EC 脱机 2.1.0+
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
        {"action": 1, "x": 1, "y": 1, "pointer": 1, "delay": 20}
    ]

    //第二种链式调用方法
    var touch1 = MultiPoint
        .get()
        .action(0).x(500).y(1200).pointer(1).delay(1)
        .next()
        .action(2).x(500).y(1100).pointer(1).delay(1)
        .next()
        .action(2).x(500).y(1000).pointer(1).delay(1)
        .next()
        .action(2).x(500).y(900).pointer(1).delay(1)
        .next()
        .action(1).x(500).y(800).pointer(1).delay(1);
    var touch2 = MultiPoint
        .get()
        .action(0).x(300).y(1200).pointer(2).delay(1)
        .next()
        .action(2).x(300).y(1100).pointer(2).delay(1)
        .next()
        .action(2).x(300).y(1000).pointer(2).delay(1)
        .next()
        .action(2).x(300).y(900).pointer(2).delay(1)
        .next()
        .action(1).x(300).y(800).pointer(2).delay(1);
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
* @return `{boolean|布尔型}` true 滑动成功, false 滑动失败

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
* 支持版本 EC 脱机 2.1.0+
* @param startX 起始坐标的X轴值
* @param startY 起始坐标的Y轴值
* @param endX 结束坐标的X轴值
* @param endY 结束坐标的Y轴值
* @param duration 持续时长 单位毫秒
* @param pressure 压力， 0 - 1之间
* @return true 滑动成功, false 滑动失败

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

### ioHIDEvent 模拟键盘

*

模拟人机交互，例如键盘输入和快捷键，具体健值请看[https://ieasyclick.com/iosdocs/zh-cn/advance/keyboard](https://ieasyclick.com/iosdocs/zh-cn/advance/keyboard)

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
* @return int| 0 竖屏，1 横屏 （向右旋转90度(顺时针)）

```javascript showLineNumbers
function main() {
    let x = getOrientation()
    logd(x)
}

main();
```

## 系统按键相关

### home 返回主页

* 返回主页
* @return `{boolean|布尔型}`

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

### homeScreen 强制进入主页

* 强制进入主页
* @return `{boolean|布尔型}`

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
* @return `{boolean|布尔型}`

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
* @return `{boolean|布尔型}`

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
* @return `{boolean|布尔型}`

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

### appLaunch 运行程序

* 运行程序
* @param bundleId app的 bundleID
* @param ignoreState 1 忽略之前打开的状态，直接打开，其他填写 ""
* @return `{boolean}` true 代表成功

```javascript showLineNumbers
function main() {
    var result = appLaunch("com.tencent.xin", "1");
    logd("result " + result);
}

main();
```

### appKillByBundleId 杀死程序

* 使用bundleID杀死一个进程
* @param bundleId app的 bundleID
* @param ignoreState 1 忽略之前打开的状态，直接杀掉进程，其他填写 ""
* @return `{boolean}` true 成功，false 失败成功

```javascript showLineNumbers
function main() {
    var result = appKillByBundleId("com.tencent.xin", "1");
    if (result) {
        logd("成功");
    } else {
        logd("失败");
    }
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

### setAgentPort 设置代理运行的端口

* @param port 端口 整型数据，必须大于1024
* @return `{bool}` true 代表成功，false代表失败

```javascript showLineNumbers
function main() {
    setAgentPort(12008);
}

main();
```

### setComputeMode 设置算力模式
* 如果你不理解这个函数 或者运行有问题，建议就使用2，或者默认就行
* 设置计算算力运行模式，默认值是2
* @param type: 1代表在 agent 中计算， 2 代表在 app中计算

```javascript showLineNumbers
function main() {
    setComputeMode(2);
}

main();
```

## 中控相关函数

### getCenterTaskInfo 获取中控任务参数

* 取得中控发过来的任务参数信息
* 中控启动脚本，可以配置参数，在这里使用本函数获取参数，给脚本使用
* 适合版本 EC iOS 脱机版本 3.8.0+
* 注意：这个需要使用参数配置,读取顺序是 优先读取单个设备配置 ，如果单个设备配置无任何数据，就读取 全局配置，
* 返回参数中 含有 \_\_from_global\_\_ 这样的key，代表是来源于全局参数
* @return `{json}` 对象

```javascript showLineNumbers
function main() {
    let taskInfo = getCenterTaskInfo();
    logd(JSON.stringify(taskInfo))
    if (taskInfo) {
        // 获取任务参数
        let value = taskInfo["valueJson"]
        // 获取某个参数值，例如姓名
        // let xm = value["姓名"]
        logd(JSON.stringify(value))
    }
}

main();
```

## 坐标系转换

### convertPointToClickable 横屏坐标转竖屏点击坐标

* 将横屏的坐标转换为可以点击的竖屏坐标
* 具体需要用到转换的情况请看常见问题的描述
* @param x 横屏坐标
* @param y 竖屏坐标
* @returns `{json}` x代表转换的x坐标，y代表转换的y坐标

```javascript showLineNumbers
function main() {
    let d = convertPointToClickable(100, 300);
    logd("x {} y {}", d.x, d.y)
}

main();
```
