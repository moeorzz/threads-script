---
title: 输入法函数
description: EasyClick 自动化脚本 iOS免越狱 输入法函数
keywords:
  - EasyClick 自动化脚本 iOS免越狱 输入法函数
  - imeApi
  - isOk
  - iOS
  - input
  - paste
  - pressDel
  - pressEnter
  - dismiss
  - copyToClipboard
  - changeKeyboard
  - EasyClick
  - 手机自动化
  - 自动化测试
  - 脚本开发
  - 安卓自动化
  - iOS自动化
  - 鸿蒙Next
---

## 说明

:::tip
- 输入法函数是脱机版本主程序自带的输入法程序，专门用于输入的
- 需要启用输入法才能使用，
    - 使用自定义输入，需在手机的设置-通用-键盘-键盘-添加新键盘-启用 [主程序的应用名称(默认是易点云测，打包后是自定义的程序名称)]输入法，如果找不到这个名称，可以重启设备
    - 设置完成后，键盘页面点击键盘名称，选择[允许完全访问]
- 启用后，在输入框聚焦的情况下，会弹出输入法，如果有多个输入法的情况下，可能不是[主程序易点云测]，点击键盘左下角的[地球]按钮，切换键盘
- 当[主程序易点云测（背景是色鹅黄色的）]键盘弹出来后，即可使用
- 特别说明：只有当易点云测键盘弹出来的时候，函数才是可以调用的，否则都是失效的，可以使用 imeApi.isOk() 判断键盘是否准备好
- 输入法可以完美替代之前的输入函数，且不会出现卡死代理程序的问题
- ***不适合场景: 密码输入框、输入框不允许三方输入法情况下，系统会自动切换到iOS的输入法 ***
  :::

## imeApi.isOk 输入法状态是否可用

* 输入法状态是否可用
* 适配EC iOS 脱机版3.15.0+
* @return `{boolean}` true 代表可用 false 代表不可用

```javascript showLineNumbers
function main() {
    var ok = imeApi.isOk();
    if (!ok) {
        logw("输入法状态不可用，请到手机-设置-通用-键盘-选项中启用[打包的app名称(默认是易点云测)]三方键盘，如果没有此选项，请尝试重启手机")
        logw("启用输入法后，需要点击输入法，弹出[打包的app名称(默认是易点云测，鹅黄色背景)]键盘方可使用函数")
        return
    }
    logd("输入法已准备好")
}

main();
```

## imeApi.input 输入字符串

* 输入字符串
* 适配EC iOS 脱机版3.15.0+
* @param content 字符串
* @returns `{string}` 如果为空，代表输入不成功，如果不为空，代表输入的数据

```javascript showLineNumbers
function main() {
    var ok = imeApi.isOk();
    if (!ok) {
        logw("输入法状态不可用，请到手机-设置-通用-键盘-选项中启用[打包的app名称(默认是易点云测)]三方键盘，如果没有此选项，请尝试重启手机")
        logw("启用输入法后，需要点击输入法，弹出[打包的app名称(默认是易点云测，鹅黄色背景)]键盘方可使用函数")
        return
    }
    let result = imeApi.input("我是数据")
    logd("输入框的数据是: " + result)
}

main();
```

## imeApi.paste 粘贴字符串

* 粘贴字符串，复制到剪切板后再插入到输入框
* 适配EC iOS 脱机版3.15.0+
* @param content 字符串,如果为空，直接使用剪切板数据
* @returns `{string}` 如果为空，代表不成功，如果不为空，代表输入的数据

```javascript showLineNumbers
function main() {
    var ok = imeApi.isOk();
    if (!ok) {
        logw("输入法状态不可用，请到手机-设置-通用-键盘-选项中启用[打包的app名称(默认是易点云测)]三方键盘，如果没有此选项，请尝试重启手机")
        logw("启用输入法后，需要点击输入法，弹出[打包的app名称(默认是易点云测，鹅黄色背景)]键盘方可使用函数")
        return
    }
    let result = imeApi.paste("我是粘贴数据")
    logd("输入框的粘贴数据是: " + result)
}

main();
```

## imeApi.pressDel 删除输入框的字符串

* 删除输入框的字符串
* 适配EC iOS 脱机版3.15.0+
* @returns `{string}` 如果为空，代表输入框无数据，如果不为空，代表输入框剩余数据

```javascript showLineNumbers
function main() {
    var ok = imeApi.isOk();
    if (!ok) {
        logw("输入法状态不可用，请到手机-设置-通用-键盘-选项中启用[打包的app名称(默认是易点云测)]三方键盘，如果没有此选项，请尝试重启手机")
        logw("启用输入法后，需要点击输入法，弹出[打包的app名称(默认是易点云测，鹅黄色背景)]键盘方可使用函数")
        return
    }
    let result = imeApi.pressDel()
    logd("输入框的剩余数据是: " + result)
}

main();
```

## imeApi.pressEnter 回车键

* 回车键
* 适配EC iOS 脱机版3.15.0+
* @returns `{boolean}` true 代表成功 false 代表失败

```javascript showLineNumbers
function main() {
    var ok = imeApi.isOk();
    if (!ok) {
        logw("输入法状态不可用，请到手机-设置-通用-键盘-选项中启用[打包的app名称(默认是易点云测)]三方键盘，如果没有此选项，请尝试重启手机")
        logw("启用输入法后，需要点击输入法，弹出[打包的app名称(默认是易点云测，鹅黄色背景)]键盘方可使用函数")
        return
    }
    let result = imeApi.pressEnter()
    logd("pressEnter: " + result)
}

main();
```

## imeApi.dismiss 隐藏键盘

* 隐藏键盘
* 适配EC iOS 脱机版3.15.0+
* @returns `{boolean}` true 代表成功 false 代表失败

```javascript showLineNumbers
function main() {
    var ok = imeApi.isOk();
    if (!ok) {
        logw("输入法状态不可用，请到手机-设置-通用-键盘-选项中启用[打包的app名称(默认是易点云测)]三方键盘，如果没有此选项，请尝试重启手机")
        logw("启用输入法后，需要点击输入法，弹出[打包的app名称(默认是易点云测，鹅黄色背景)]键盘方可使用函数")
        return
    }
    let result = imeApi.dismiss()
    logd("dismiss: " + result)

}

main();
```

## imeApi.copyToClipboard 复制输入框的数据到剪切板

* 复制输入框的数据到剪切板
* 适配EC iOS 脱机版3.15.0+
* @returns `{string}` 如果为空，代表输入框无数据，如果不为空，代表输入框剩余数据，并且已经复制到剪切板了

```javascript showLineNumbers
function main() {
    var ok = imeApi.isOk();
    if (!ok) {
        logw("输入法状态不可用，请到手机-设置-通用-键盘-选项中启用[打包的app名称(默认是易点云测)]三方键盘，如果没有此选项，请尝试重启手机")
        logw("启用输入法后，需要点击输入法，弹出[打包的app名称(默认是易点云测，鹅黄色背景)]键盘方可使用函数")
        return
    }
    let result = imeApi.copyToClipboard()
    logd("copyToClipboard data: " + result)
}

main();
```

## imeApi.changeKeyboard 切换到其他键盘

* 切换到其他键盘
* 这个是返回结果后，等待2秒切换
* 适配EC iOS 脱机版3.15.0+
* @returns `{boolean}` true 代表成功 false 代表失败

```javascript showLineNumbers
function main() {
    var ok = imeApi.isOk();
    if (!ok) {
        logw("输入法状态不可用，请到手机-设置-通用-键盘-选项中启用[打包的app名称(默认是易点云测)]三方键盘，如果没有此选项，请尝试重启手机")
        logw("启用输入法后，需要点击输入法，弹出[打包的app名称(默认是易点云测，鹅黄色背景)]键盘方可使用函数")
        return
    }
    let result = imeApi.changeKeyboard()
    logd("changeKeyboard data: " + result)
}

main();
```

## imeApi.removeAllContent 清空输入框的内容

* 清空输入框的内容
* 适配EC iOS 脱机版3.15.0+
* @returns `{boolean}` true 代表成功 false 代表失败

```javascript showLineNumbers
function main() {
    var ok = imeApi.isOk();
    if (!ok) {
        logw("输入法状态不可用，请到手机-设置-通用-键盘-选项中启用[打包的app名称(默认是易点云测)]三方键盘，如果没有此选项，请尝试重启手机")
        logw("启用输入法后，需要点击输入法，弹出[打包的app名称(默认是易点云测，鹅黄色背景)]键盘方可使用函数")
        return
    }
    let result = imeApi.removeAllContent()
    logd("removeAllContent : " + result)
}

main();
```

## imeApi.getClipboard 读取剪切板的数据

* 读取剪切板的数据
* 适配EC iOS 脱机版3.15.0+
* @returns `{string}` 剪切板的数据

```javascript showLineNumbers
function main() {
    var ok = imeApi.isOk();
    if (!ok) {
        logw("输入法状态不可用，请到手机-设置-通用-键盘-选项中启用[打包的app名称(默认是易点云测)]三方键盘，如果没有此选项，请尝试重启手机")
        logw("启用输入法后，需要点击输入法，弹出[打包的app名称(默认是易点云测，鹅黄色背景)]键盘方可使用函数")
        return
    }
    let result = imeApi.getClipboard()
    logd("getClipboard data : " + result)
}

main();
```

## imeApi.setClipboard 设置剪切板数据

* 设置剪切板数据
* 适配EC iOS 脱机版3.15.0+
* @param content 字符串
* @param type 1 代表是普通的字符串，2 代表是URL数据
* @returns `{boolean}` true 代表设置成功  false 代表失败

```javascript showLineNumbers
function main() {
    var ok = imeApi.isOk();
    if (!ok) {
        logw("输入法状态不可用，请到手机-设置-通用-键盘-选项中启用[打包的app名称(默认是易点云测)]三方键盘，如果没有此选项，请尝试重启手机")
        logw("启用输入法后，需要点击输入法，弹出[打包的app名称(默认是易点云测，鹅黄色背景)]键盘方可使用函数")
        return
    }
    let result = imeApi.setClipboard("我是剪切板的的数据","1")
    logd("setClipboard  : " + result)
}

main();
```

## imeApi.openUrl 打开URL链接

* 打开URL链接
* 适配EC iOS 脱机版3.15.0+
* @param url url地址,例如  http://baidu.com 之类的数据
* @returns `{boolean}` true 代表设置成功  false 代表失败

```javascript showLineNumbers
function main() {
    var ok = imeApi.isOk();
    if (!ok) {
        logw("输入法状态不可用，请到手机-设置-通用-键盘-选项中启用[打包的app名称(默认是易点云测)]三方键盘，如果没有此选项，请尝试重启手机")
        logw("启用输入法后，需要点击输入法，弹出[打包的app名称(默认是易点云测，鹅黄色背景)]键盘方可使用函数")
        return
    }
    let result = imeApi.openUrl("http://baidu.com")
    logd("openUrl  : " + result)
}

main();
```

## imeApi.getText 获取输入框数据

* 获取输入框数据
* 适配EC iOS 脱机版3.15.0+
* @returns `{string}` 空代表无数据或者未获取到，有数据代表获取到了

```javascript showLineNumbers
function main() {
    var ok = imeApi.isOk();
    if (!ok) {
        logw("输入法状态不可用，请到手机-设置-通用-键盘-选项中启用[打包的app名称(默认是易点云测)]三方键盘，如果没有此选项，请尝试重启手机")
        logw("启用输入法后，需要点击输入法，弹出[打包的app名称(默认是易点云测，鹅黄色背景)]键盘方可使用函数")
        return
    }
    let result = imeApi.getText()
    logd("getText  : " + result)
}

main();
```
