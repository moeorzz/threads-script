---
title: HID事件
description: EasyClick 自动化脚本 鸿蒙Next HID事件
keywords:
  - EasyClick 自动化脚本 鸿蒙Next HID事件
  - HID
  - USB
  - hid
  - winusb
  - EasyClick
  - zadig
  - Next
  - hidEvent
  - setHidCenter
  - isUsbConnected
  - 手机自动化
  - 自动化测试
  - 脚本开发
  - 安卓自动化
  - iOS自动化
  - 鸿蒙Next
  - 远程投屏
---

## 说明

- HID事件模块运行的所有函数，是需要使用EasyClick HID主控程序激活HID后才可以调用的
- 也可以使用鸿蒙Next中控一键激活HID
- 代理事件模块的对象前缀是 hidEvent，例如 hidEvent.click 这样调用

:::info 驱动提示
- 鸿蒙Next手机和安卓手机使用的hid是一个HID程序，网盘下载 【EasyClick HID主控程序激活HID】，在Windows上安装winusb驱动
- 驱动安装地址参考安卓的hid教程: [安卓HID驱动安装](/docs/zh-cn/advance/hid)
- 需要安装三次驱动
  - 插入设备的时候使用zadig选择设备，安装winusb驱动
  - 到手机开发者选项，关闭手机的USB调试，再使用zadig选择设备，安装winusb驱动
  - 使用HID主控激活HID模式，vid变成了18D1，再使用zadig选择设备，安装winusb驱动
:::
:::tip
- 一定要去网盘下载 【EasyClick HID主控程序激活HID】，运行主控程序才能使用
- hid只是一种点击模式，这里的函数是适配鸿蒙Next USB版本
- 鸿蒙Next USB版本，支持不开启自动化服务也可以获取节点和截图，然后使用hid方式点击这样的组合
:::

## HID函数

### setHidCenter 设置HID主控地址

* 设置HID主控地址
* 适配版本 鸿蒙Next USB版本2.15.0+
* @param hidCenterUrl HID主控程序运行的网址
* @return `{string}` null 代表成功，其他代表错误消息

```javascript showLineNumbers
function main() {
    // 一般情况无需调用
    logd(hidEvent.setHidCenter("http://127.0.0.1:8988"))
}

main();
```

### isUsbConnected 是否是USB链接

* 是否是USB链接
* 适配版本 鸿蒙Next USB版本2.15.0+
* @return `{boolean}` true 代表当前是设备是usb连接

```javascript showLineNumbers
function main() {
    logd(hidEvent.isUsbConnected())
}

main();
```

### simCloseUsbDebug 模拟关闭USB调试

* 模拟关闭USB调试
* 适配版本 鸿蒙Next USB版本2.15.0+
* @return `{boolean}`  true 代表成功 false 代表失败

```javascript showLineNumbers
function main() {
    // 代码例子请看 activeHid 初始化HID设备 
}

main();
```

### simOpenUsbDebug 模拟开启USB调试

* 模拟开启USB调试
* 适配版本 鸿蒙Next USB版本2.15.0+
* @return `{boolean}`  true 代表成功 false 代表失败

```javascript showLineNumbers
function main() {
    // 代码例子请看 activeHid 初始化HID设备 
}

main();
```

### connectByTcp 转成TCP链接

* 转成TCP链接
* 适配版本 鸿蒙Next USB版本2.15.0+
* @return `{boolean}`  true 代表成功 false 代表失败

```javascript showLineNumbers
function main() {
    // 代码例子请看 activeHid 初始化HID设备 
}

main();
```

### clearHidStatus 清除HID链接状态

* 清除HID链接状态
* 这个函数不会重置PID和VID
* 适配版本 鸿蒙Next USB版本2.15.0+
* @return `{null|string}` null代表成功，其他代表错误消息

```javascript showLineNumbers
function main() {
    // 代码例子请看 activeHid 初始化HID设备 
}

main();
```

### isHidStatus HID状态判断

* HID状态判断
* 适配版本 鸿蒙Next USB版本2.15.0+
* @return `{boolean}`  true 代表成功 false 代表失败

```javascript showLineNumbers
function main() {
    // 代码例子请看 activeHid 初始化HID设备 
}

main();
```

### activeHid 初始化HID设备

* 初始化HID设备
* 适配版本 鸿蒙Next USB版本2.15.0+
* @return `{boolean}`  true 代表成功 false 代表失败

```javascript showLineNumbers
function main() {

    let r = one_key_active_hid();
    console.log("--- one_key_active_hid {}", r)
    if (!r) {
        return;
    }


    let click = hidEvent.clickPoint(469, 1306)
    if (click == null) {
        console.log("点击成功")
    } else {
        console.log("点击失败")
    }


    // let openNotification = hidEvent.openNotification();
    // logd("执行结果:{}", openNotification)


}


function one_key_active_hid() {
    if (hidEvent.isHidStatus()) {
        logd("已经是HID状态了 无需开启")
        return true;
    }
    logd("正在转换为TCP链接...")
    let toTcpResult = hidEvent.connectByTcp()
    if (toTcpResult) {
        logd("转换为TCP成功,继续开启HID...")
    } else {
        logw("转换为TCP链接失败，可能无法开启HID")
    }
    sleep(3000)
    if (hidEvent.isUsbConnected()) {
        console.log("开始模拟关闭USB调试...请稍等")
        let close_debug_result = hidEvent.simCloseUsbDebug();
        console.log("close_debug_result {}", close_debug_result)
        if (close_debug_result) {
            console.log("关闭USB调试成功")
            sleep(3000)
        } else {
            logw("关闭USB调试失败")
            return;
        }
    }
    logd("清除之前的HID记录...")
    let clearResult = hidEvent.clearHidStatus()
    if (clearResult != null) {
        clearResult = hidEvent.clearHidStatus()
        if (clearResult != null) {
            logw("清除-->调用HID主控失败: " + clearResult)
            return false;
        }
    }

    logd("清除HID记录成功，开始激活HID... 可能会断开连接，系统会自动重连")


    let activeResult = hidEvent.activeHid();
    if (activeResult != null) {
        activeResult = hidEvent.activeHid()
        if (hidEvent.isHidStatus()) {
            return true
        } else {
            logw("激活--> 调用HID主控失败: " + activeResult)
            return false;
        }
    }
    sleep(2000)
    logd("激活HID成功")
    let rs = hidEvent.isHidStatus();
    if (rs) {
        logd("当前设备是HID状态")
    } else {
        logw("当前设备不是HID状态")
        return false;
    }

    return true;

}

main()
```

### closeDevice 关闭HID设备

* 关闭重置HID设备
* 重置PID 和VID
* 适配版本 鸿蒙Next USB版本2.15.0+
* @return `{null|string}` null代表成功，其他代表错误消息

```javascript showLineNumbers
function main() {
    let rr = hidEvent.closeDevice();
    if (rr == null) {
        logd("重置USB成功")
    } else {
        logd("重置USB失败: " + rr)
    }
}

main();
```

### clickPoint 点击坐标

* 点击坐标
* 适配版本 鸿蒙Next USB版本2.15.0+
* @param x x坐标
* @param y y坐标
* @return `{null|string}` null代表成功，其他代表错误消息

```javascript showLineNumbers
function main() {

    let r = one_key_active_hid();
    console.log("--- one_key_active_hid {}", r)
    if (!r) {
        return;
    }
    let click = hidEvent.clickPoint(469, 1306)
    if (click == null) {
        console.log("点击成功")
    } else {
        console.log("点击失败 {}", click)
    }
}


function one_key_active_hid() {
    if (hidEvent.isHidStatus()) {
        logd("已经是HID状态了 无需开启")
        return true;
    }
    logd("正在转换为TCP链接...")
    let toTcpResult = hidEvent.connectByTcp()
    if (toTcpResult) {
        logd("转换为TCP成功,继续开启HID...")
    } else {
        logw("转换为TCP链接失败，可能无法开启HID")
    }
    sleep(3000)
    if (hidEvent.isUsbConnected()) {
        console.log("开始模拟关闭USB调试...请稍等")
        let close_debug_result = hidEvent.simCloseUsbDebug();
        console.log("close_debug_result {}", close_debug_result)
        if (close_debug_result) {
            console.log("关闭USB调试成功")
            sleep(3000)
        } else {
            logw("关闭USB调试失败")
            return;
        }
    }
    logd("清除之前的HID记录...")
    let clearResult = hidEvent.clearHidStatus()
    if (clearResult != null) {
        clearResult = hidEvent.clearHidStatus()
        if (clearResult != null) {
            logw("清除-->调用HID主控失败: " + clearResult)
            return false;
        }
    }

    logd("清除HID记录成功，开始激活HID... 可能会断开连接，系统会自动重连")


    let activeResult = hidEvent.activeHid();
    if (activeResult != null) {
        activeResult = hidEvent.activeHid()
        if (hidEvent.isHidStatus()) {
            return true
        } else {
            logw("激活--> 调用HID主控失败: " + activeResult)
            return false;
        }
    }
    sleep(2000)
    logd("激活HID成功")
    let rs = hidEvent.isHidStatus();
    if (rs) {
        logd("当前设备是HID状态")
    } else {
        logw("当前设备不是HID状态")
        return false;
    }

    return true;


}

main()
```

### doubleClickPoint 双击坐标

* 双击坐标
* 适配版本 鸿蒙Next USB版本2.15.0+
* @param x x坐标
* @param y y坐标
* @return `{null|string}` null代表成功，其他代表错误消息

```javascript showLineNumbers
function main() {

    let r = one_key_active_hid();
    console.log("--- one_key_active_hid {}", r)
    if (!r) {
        return;
    }
    let rse = hidEvent.doubleClickPoint(469, 1306)
    if (rse == null) {
        console.log("成功")
    } else {
        console.log("失败 {}", rse)
    }
}


function one_key_active_hid() {
    if (hidEvent.isHidStatus()) {
        logd("已经是HID状态了 无需开启")
        return true;
    }
    logd("正在转换为TCP链接...")
    let toTcpResult = hidEvent.connectByTcp()
    if (toTcpResult) {
        logd("转换为TCP成功,继续开启HID...")
    } else {
        logw("转换为TCP链接失败，可能无法开启HID")
    }
    sleep(3000)
    if (hidEvent.isUsbConnected()) {
        console.log("开始模拟关闭USB调试...请稍等")
        let close_debug_result = hidEvent.simCloseUsbDebug();
        console.log("close_debug_result {}", close_debug_result)
        if (close_debug_result) {
            console.log("关闭USB调试成功")
            sleep(3000)
        } else {
            logw("关闭USB调试失败")
            return;
        }
    }
    logd("清除之前的HID记录...")
    let clearResult = hidEvent.clearHidStatus()
    if (clearResult != null) {
        clearResult = hidEvent.clearHidStatus()
        if (clearResult != null) {
            logw("清除-->调用HID主控失败: " + clearResult)
            return false;
        }
    }

    logd("清除HID记录成功，开始激活HID... 可能会断开连接，系统会自动重连")


    let activeResult = hidEvent.activeHid();
    if (activeResult != null) {
        activeResult = hidEvent.activeHid()
        if (hidEvent.isHidStatus()) {
            return true
        } else {
            logw("激活--> 调用HID主控失败: " + activeResult)
            return false;
        }
    }
    sleep(2000)
    logd("激活HID成功")
    let rs = hidEvent.isHidStatus();
    if (rs) {
        logd("当前设备是HID状态")
    } else {
        logw("当前设备不是HID状态")
        return false;
    }

    return true;


}

main()
```

### press 长按坐标

* 长按坐标
* 适配版本 鸿蒙Next USB版本2.15.0+
* @param x x坐标
* @param y y坐标
* @param delay 按住时间，单位是毫秒
* @return `{null|string}` null代表成功，其他代表错误消息

```javascript showLineNumbers
function main() {

    let r = one_key_active_hid();
    console.log("--- one_key_active_hid {}", r)
    if (!r) {
        return;
    }
    let rse = hidEvent.press(469, 1306, 5000)
    if (rse == null) {
        console.log("成功")
    } else {
        console.log("失败 {}", rse)
    }
}


function one_key_active_hid() {
    if (hidEvent.isHidStatus()) {
        logd("已经是HID状态了 无需开启")
        return true;
    }
    logd("正在转换为TCP链接...")
    let toTcpResult = hidEvent.connectByTcp()
    if (toTcpResult) {
        logd("转换为TCP成功,继续开启HID...")
    } else {
        logw("转换为TCP链接失败，可能无法开启HID")
    }
    sleep(3000)
    if (hidEvent.isUsbConnected()) {
        console.log("开始模拟关闭USB调试...请稍等")
        let close_debug_result = hidEvent.simCloseUsbDebug();
        console.log("close_debug_result {}", close_debug_result)
        if (close_debug_result) {
            console.log("关闭USB调试成功")
            sleep(3000)
        } else {
            logw("关闭USB调试失败")
            return;
        }
    }
    logd("清除之前的HID记录...")
    let clearResult = hidEvent.clearHidStatus()
    if (clearResult != null) {
        clearResult = hidEvent.clearHidStatus()
        if (clearResult != null) {
            logw("清除-->调用HID主控失败: " + clearResult)
            return false;
        }
    }

    logd("清除HID记录成功，开始激活HID... 可能会断开连接，系统会自动重连")


    let activeResult = hidEvent.activeHid();
    if (activeResult != null) {
        activeResult = hidEvent.activeHid()
        if (hidEvent.isHidStatus()) {
            return true
        } else {
            logw("激活--> 调用HID主控失败: " + activeResult)
            return false;
        }
    }
    sleep(2000)
    logd("激活HID成功")
    let rs = hidEvent.isHidStatus();
    if (rs) {
        logd("当前设备是HID状态")
    } else {
        logw("当前设备不是HID状态")
        return false;
    }

    return true;


}

main()
```

### swipe 滑动

* 滑动
* 适配版本 鸿蒙Next USB版本2.15.0+
* @param x x坐标
* @param y y坐标
* @param ex 终点x坐标
* @param ey 终点y坐标
* @param delay 按住时间，单位是毫秒
* @return `{null|string}` null代表成功，其他代表错误消息

```javascript showLineNumbers
function main() {

    let r = one_key_active_hid();
    console.log("--- one_key_active_hid {}", r)
    if (!r) {
        return;
    }
    let rse = hidEvent.swipe(469, 1306, 600, 1000, 1000)
    if (rse == null) {
        console.log("成功")
    } else {
        console.log("失败 {}", rse)
    }
}


function one_key_active_hid() {
    if (hidEvent.isHidStatus()) {
        logd("已经是HID状态了 无需开启")
        return true;
    }
    logd("正在转换为TCP链接...")
    let toTcpResult = hidEvent.connectByTcp()
    if (toTcpResult) {
        logd("转换为TCP成功,继续开启HID...")
    } else {
        logw("转换为TCP链接失败，可能无法开启HID")
    }
    sleep(3000)
    if (hidEvent.isUsbConnected()) {
        console.log("开始模拟关闭USB调试...请稍等")
        let close_debug_result = hidEvent.simCloseUsbDebug();
        console.log("close_debug_result {}", close_debug_result)
        if (close_debug_result) {
            console.log("关闭USB调试成功")
            sleep(3000)
        } else {
            logw("关闭USB调试失败")
            return;
        }
    }
    logd("清除之前的HID记录...")
    let clearResult = hidEvent.clearHidStatus()
    if (clearResult != null) {
        clearResult = hidEvent.clearHidStatus()
        if (clearResult != null) {
            logw("清除-->调用HID主控失败: " + clearResult)
            return false;
        }
    }

    logd("清除HID记录成功，开始激活HID... 可能会断开连接，系统会自动重连")


    let activeResult = hidEvent.activeHid();
    if (activeResult != null) {
        activeResult = hidEvent.activeHid()
        if (hidEvent.isHidStatus()) {
            return true
        } else {
            logw("激活--> 调用HID主控失败: " + activeResult)
            return false;
        }
    }
    sleep(2000)
    logd("激活HID成功")
    let rs = hidEvent.isHidStatus();
    if (rs) {
        logd("当前设备是HID状态")
    } else {
        logw("当前设备不是HID状态")
        return false;
    }

    return true;


}

main()
```

### touchDown 按下

* 按下
* 适配版本 鸿蒙Next USB版本2.15.0+
* @param x x坐标
* @param y y坐标
* @return `{null|string}` null代表成功，其他代表错误消息

```javascript showLineNumbers
function main() {

    let r = one_key_active_hid();
    console.log("--- one_key_active_hid {}", r)
    if (!r) {
        return;
    }
    let rse = hidEvent.touchDown(469, 1306)
    if (rse == null) {
        console.log("成功")
    } else {
        console.log("失败 {}", rse)
    }
}


function one_key_active_hid() {
    if (hidEvent.isHidStatus()) {
        logd("已经是HID状态了 无需开启")
        return true;
    }
    logd("正在转换为TCP链接...")
    let toTcpResult = hidEvent.connectByTcp()
    if (toTcpResult) {
        logd("转换为TCP成功,继续开启HID...")
    } else {
        logw("转换为TCP链接失败，可能无法开启HID")
    }
    sleep(3000)
    if (hidEvent.isUsbConnected()) {
        console.log("开始模拟关闭USB调试...请稍等")
        let close_debug_result = hidEvent.simCloseUsbDebug();
        console.log("close_debug_result {}", close_debug_result)
        if (close_debug_result) {
            console.log("关闭USB调试成功")
            sleep(3000)
        } else {
            logw("关闭USB调试失败")
            return;
        }
    }
    logd("清除之前的HID记录...")
    let clearResult = hidEvent.clearHidStatus()
    if (clearResult != null) {
        clearResult = hidEvent.clearHidStatus()
        if (clearResult != null) {
            logw("清除-->调用HID主控失败: " + clearResult)
            return false;
        }
    }

    logd("清除HID记录成功，开始激活HID... 可能会断开连接，系统会自动重连")


    let activeResult = hidEvent.activeHid();
    if (activeResult != null) {
        activeResult = hidEvent.activeHid()
        if (hidEvent.isHidStatus()) {
            return true
        } else {
            logw("激活--> 调用HID主控失败: " + activeResult)
            return false;
        }
    }
    sleep(2000)
    logd("激活HID成功")
    let rs = hidEvent.isHidStatus();
    if (rs) {
        logd("当前设备是HID状态")
    } else {
        logw("当前设备不是HID状态")
        return false;
    }

    return true;


}

main()
```

### touchMove 移动

* 移动
* 适配版本 鸿蒙Next USB版本2.15.0+
* @param x x坐标
* @param y y坐标
* @return `{null|string}` null代表成功，其他代表错误消息

```javascript showLineNumbers
function main() {

    let r = one_key_active_hid();
    console.log("--- one_key_active_hid {}", r)
    if (!r) {
        return;
    }
    let rse = hidEvent.touchMove(480, 1310)
    if (rse == null) {
        console.log("成功")
    } else {
        console.log("失败 {}", rse)
    }
}


function one_key_active_hid() {
    if (hidEvent.isHidStatus()) {
        logd("已经是HID状态了 无需开启")
        return true;
    }
    logd("正在转换为TCP链接...")
    let toTcpResult = hidEvent.connectByTcp()
    if (toTcpResult) {
        logd("转换为TCP成功,继续开启HID...")
    } else {
        logw("转换为TCP链接失败，可能无法开启HID")
    }
    sleep(3000)
    if (hidEvent.isUsbConnected()) {
        console.log("开始模拟关闭USB调试...请稍等")
        let close_debug_result = hidEvent.simCloseUsbDebug();
        console.log("close_debug_result {}", close_debug_result)
        if (close_debug_result) {
            console.log("关闭USB调试成功")
            sleep(3000)
        } else {
            logw("关闭USB调试失败")
            return;
        }
    }
    logd("清除之前的HID记录...")
    let clearResult = hidEvent.clearHidStatus()
    if (clearResult != null) {
        clearResult = hidEvent.clearHidStatus()
        if (clearResult != null) {
            logw("清除-->调用HID主控失败: " + clearResult)
            return false;
        }
    }

    logd("清除HID记录成功，开始激活HID... 可能会断开连接，系统会自动重连")


    let activeResult = hidEvent.activeHid();
    if (activeResult != null) {
        activeResult = hidEvent.activeHid()
        if (hidEvent.isHidStatus()) {
            return true
        } else {
            logw("激活--> 调用HID主控失败: " + activeResult)
            return false;
        }
    }
    sleep(2000)
    logd("激活HID成功")
    let rs = hidEvent.isHidStatus();
    if (rs) {
        logd("当前设备是HID状态")
    } else {
        logw("当前设备不是HID状态")
        return false;
    }

    return true;


}

main()
```

### touchUp 抬起

* 抬起
* 适配版本 鸿蒙Next USB版本2.15.0+
* @param x x坐标
* @param y y坐标
* @return `{null|string}` null代表成功，其他代表错误消息

```javascript showLineNumbers
function main() {

    let r = one_key_active_hid();
    console.log("--- one_key_active_hid {}", r)
    if (!r) {
        return;
    }
    let rse = hidEvent.touchUp(480, 1310)
    if (rse == null) {
        console.log("成功")
    } else {
        console.log("失败 {}", rse)
    }
}


function one_key_active_hid() {
    if (hidEvent.isHidStatus()) {
        logd("已经是HID状态了 无需开启")
        return true;
    }
    logd("正在转换为TCP链接...")
    let toTcpResult = hidEvent.connectByTcp()
    if (toTcpResult) {
        logd("转换为TCP成功,继续开启HID...")
    } else {
        logw("转换为TCP链接失败，可能无法开启HID")
    }
    sleep(3000)
    if (hidEvent.isUsbConnected()) {
        console.log("开始模拟关闭USB调试...请稍等")
        let close_debug_result = hidEvent.simCloseUsbDebug();
        console.log("close_debug_result {}", close_debug_result)
        if (close_debug_result) {
            console.log("关闭USB调试成功")
            sleep(3000)
        } else {
            logw("关闭USB调试失败")
            return;
        }
    }
    logd("清除之前的HID记录...")
    let clearResult = hidEvent.clearHidStatus()
    if (clearResult != null) {
        clearResult = hidEvent.clearHidStatus()
        if (clearResult != null) {
            logw("清除-->调用HID主控失败: " + clearResult)
            return false;
        }
    }

    logd("清除HID记录成功，开始激活HID... 可能会断开连接，系统会自动重连")


    let activeResult = hidEvent.activeHid();
    if (activeResult != null) {
        activeResult = hidEvent.activeHid()
        if (hidEvent.isHidStatus()) {
            return true
        } else {
            logw("激活--> 调用HID主控失败: " + activeResult)
            return false;
        }
    }
    sleep(2000)
    logd("激活HID成功")
    let rs = hidEvent.isHidStatus();
    if (rs) {
        logd("当前设备是HID状态")
    } else {
        logw("当前设备不是HID状态")
        return false;
    }

    return true;


}

main()
```

### openNotification 打开通知栏

* 打开通知栏
* 适配版本 鸿蒙Next USB版本2.15.0+
* @return `{null|string}` null代表成功，其他代表错误消息

```javascript showLineNumbers
function main() {

    let r = one_key_active_hid();
    console.log("--- one_key_active_hid {}", r)
    if (!r) {
        return;
    }
    let rse = hidEvent.openNotification()
    if (rse == null) {
        console.log("成功")
    } else {
        console.log("失败 {}", rse)
    }
}


function one_key_active_hid() {
    if (hidEvent.isHidStatus()) {
        logd("已经是HID状态了 无需开启")
        return true;
    }
    logd("正在转换为TCP链接...")
    let toTcpResult = hidEvent.connectByTcp()
    if (toTcpResult) {
        logd("转换为TCP成功,继续开启HID...")
    } else {
        logw("转换为TCP链接失败，可能无法开启HID")
    }
    sleep(3000)
    if (hidEvent.isUsbConnected()) {
        console.log("开始模拟关闭USB调试...请稍等")
        let close_debug_result = hidEvent.simCloseUsbDebug();
        console.log("close_debug_result {}", close_debug_result)
        if (close_debug_result) {
            console.log("关闭USB调试成功")
            sleep(3000)
        } else {
            logw("关闭USB调试失败")
            return;
        }
    }
    logd("清除之前的HID记录...")
    let clearResult = hidEvent.clearHidStatus()
    if (clearResult != null) {
        clearResult = hidEvent.clearHidStatus()
        if (clearResult != null) {
            logw("清除-->调用HID主控失败: " + clearResult)
            return false;
        }
    }

    logd("清除HID记录成功，开始激活HID... 可能会断开连接，系统会自动重连")


    let activeResult = hidEvent.activeHid();
    if (activeResult != null) {
        activeResult = hidEvent.activeHid()
        if (hidEvent.isHidStatus()) {
            return true
        } else {
            logw("激活--> 调用HID主控失败: " + activeResult)
            return false;
        }
    }
    sleep(2000)
    logd("激活HID成功")
    let rs = hidEvent.isHidStatus();
    if (rs) {
        logd("当前设备是HID状态")
    } else {
        logw("当前设备不是HID状态")
        return false;
    }

    return true;


}

main()
```

### sendKey hid键盘输入
* hid键盘输入
* 适配版本 鸿蒙Next USB版本2.15.0+
* @param modifiers int 辅助键 306:Left Ctrl,304:Left Shift,308:Left Alt,305:Right Ctrl,303:Right Shift,307:Right Alt,309:left Windows key,310:Right Windows key
* @param code int 实际键， 详细请参考 https://max.book118.com/html/2018/0108/147954370.shtm 或者 https://wenku.csdn.net/answer/f525e3adc4034414899a2d53fe143c3e
* 或者百度搜索 搜索 关键字 hid键盘键码值
* @return `{null|string}` null代表成功，其他代表错误消息

```javascript showLineNumbers
function main() {

    let r = one_key_active_hid();
    console.log("--- one_key_active_hid {}", r)
    if (!r) {
        return;
    }
    // code 只看文档链参考
    // 0x04 代表是a  0x05 代表是b
    let rse = hidEvent.sendKey(0, 0x05)
    if (rse == null) {
        console.log("成功")
    } else {
        console.log("失败 {}", rse)
    }
}


function one_key_active_hid() {
    if (hidEvent.isHidStatus()) {
        logd("已经是HID状态了 无需开启")
        return true;
    }
    logd("正在转换为TCP链接...")
    let toTcpResult = hidEvent.connectByTcp()
    if (toTcpResult) {
        logd("转换为TCP成功,继续开启HID...")
    } else {
        logw("转换为TCP链接失败，可能无法开启HID")
    }
    sleep(3000)
    if (hidEvent.isUsbConnected()) {
        console.log("开始模拟关闭USB调试...请稍等")
        let close_debug_result = hidEvent.simCloseUsbDebug();
        console.log("close_debug_result {}", close_debug_result)
        if (close_debug_result) {
            console.log("关闭USB调试成功")
            sleep(3000)
        } else {
            logw("关闭USB调试失败")
            return;
        }
    }
    logd("清除之前的HID记录...")
    let clearResult = hidEvent.clearHidStatus()
    if (clearResult != null) {
        clearResult = hidEvent.clearHidStatus()
        if (clearResult != null) {
            logw("清除-->调用HID主控失败: " + clearResult)
            return false;
        }
    }

    logd("清除HID记录成功，开始激活HID... 可能会断开连接，系统会自动重连")


    let activeResult = hidEvent.activeHid();
    if (activeResult != null) {
        activeResult = hidEvent.activeHid()
        if (hidEvent.isHidStatus()) {
            return true
        } else {
            logw("激活--> 调用HID主控失败: " + activeResult)
            return false;
        }
    }
    sleep(2000)
    logd("激活HID成功")
    let rs = hidEvent.isHidStatus();
    if (rs) {
        logd("当前设备是HID状态")
    } else {
        logw("当前设备不是HID状态")
        return false;
    }

    return true;


}

main()
```



### multiTouch 多点触摸

* 多点触摸
* 适配版本 鸿蒙Next USB版本2.15.0+
* 触摸参数: action :一般情况下 按下为0，弹起为1，移动为2
* x: X坐标
* y: Y坐标
* pointer：设置第几个手指触摸点，分别是 1，2，3 等，代表第n个手指
* delay: 该动作延迟多少毫秒执行, 大于40ms，否则可能出现坐标漂移的现象
* @param touch1 第1个手指的触摸点数组,例如：`[{"action":0,"x":1,"y":1,"pointer":1,"delay":30},{"action":2,"x":1,"y":1,"pointer":1,"delay":30}]`
* @param timeout 多点触摸执行的超时时间，单位是毫秒
* @return `{null|string}` null代表成功，其他代表错误消息

```javascript showLineNumbers
function main() {

    let r = one_key_active_hid();
    console.log("--- one_key_active_hid {}", r)
    if (!r) {
        return;
    }
    mtouch();
}
function mtouch() {
    let data = [
        {"action": 0, "x": 250, "y": 1800, "pointer": 1, "delay": 100},
        {"action": 2, "x": 250, "y": 1700, "pointer": 1, "delay": 100},
        {"action": 2, "x": 300, "y": 1700, "pointer": 1, "delay": 100},
        {"action": 2, "x": 330, "y": 1650, "pointer": 1, "delay": 200},
        {"action": 2, "x": 400, "y": 1650, "pointer": 1, "delay": 100},
        {"action": 1, "x": 600, "y": 400, "pointer": 1, "delay": 100}
    ]

    let tou = hidEvent.multiTouch(data, 1000)
    if (tou == null) {
        logd("多点触摸 成功")
    } else {
        loge("多点触摸 失败:" + tou);
        return false
    }
}

function one_key_active_hid() {
    if (hidEvent.isHidStatus()) {
        logd("已经是HID状态了 无需开启")
        return true;
    }
    logd("正在转换为TCP链接...")
    let toTcpResult = hidEvent.connectByTcp()
    if (toTcpResult) {
        logd("转换为TCP成功,继续开启HID...")
    } else {
        logw("转换为TCP链接失败，可能无法开启HID")
    }
    sleep(3000)
    if (hidEvent.isUsbConnected()) {
        console.log("开始模拟关闭USB调试...请稍等")
        let close_debug_result = hidEvent.simCloseUsbDebug();
        console.log("close_debug_result {}", close_debug_result)
        if (close_debug_result) {
            console.log("关闭USB调试成功")
            sleep(3000)
        } else {
            logw("关闭USB调试失败")
            return;
        }
    }
    logd("清除之前的HID记录...")
    let clearResult = hidEvent.clearHidStatus()
    if (clearResult != null) {
        clearResult = hidEvent.clearHidStatus()
        if (clearResult != null) {
            logw("清除-->调用HID主控失败: " + clearResult)
            return false;
        }
    }

    logd("清除HID记录成功，开始激活HID... 可能会断开连接，系统会自动重连")


    let activeResult = hidEvent.activeHid();
    if (activeResult != null) {
        activeResult = hidEvent.activeHid()
        if (hidEvent.isHidStatus()) {
            return true
        } else {
            logw("激活--> 调用HID主控失败: " + activeResult)
            return false;
        }
    }
    sleep(2000)
    logd("激活HID成功")
    let rs = hidEvent.isHidStatus();
    if (rs) {
        logd("当前设备是HID状态")
    } else {
        logw("当前设备不是HID状态")
        return false;
    }

    return true;


}

main()
```
