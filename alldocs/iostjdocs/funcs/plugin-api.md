---
title: 插件函数
description: EasyClick 自动化脚本 iOS免越狱 插件函数
keywords:
  - EasyClick 自动化脚本 iOS免越狱 插件函数
  - iOS
  - param
  - loadPlugin
  - makeInstance
  - EC
  - 4.2.0
  - pluginName
  - getErrorMsg
  - callMethodStr
  - callMethodData
  - EasyClick
  - 手机自动化
  - 自动化测试
  - 脚本开发
  - 安卓自动化
  - iOS自动化
  - 鸿蒙Next
---

:::tip

- 由于iOS的沙盒和签名机制，导致插件是无法动态加载的，无法放到脚本的plugin目录中，脱机版本的插件需要打包到ipa中进行使用
- 脱机版本插件只支持iOS的.framework 文件
- 具体如何编写插件请到这里阅读，[如何编写脱机插件?](/iostjdocs/zh-cn/advance/pluginguid)，helloworldplugin
  和helloworldplugin2插件代码下载地址, [点我下载](/iosdocs/tjplugindemo.zip)
- 插件模块开头的是 **pluginLoader**

:::

## loadPlugin 载入一个插件

* 载入一个插件
* 适配EC iOS 4.2.0+
* @param pluginName 插件名称 名称
* @return `布尔型` true 代表成功，false 代表失败

```javascript showLineNumbers
function main() {
    // 例如插件是 helloworldplugin2.framework这样的文件名称，插件名称就是 helloworldplugin2 
    let pluginName = "helloworldplugin2"
    let loaded = pluginLoader.loadPlugin(pluginName)
    if (!loaded) {
        loge("载入插件失败")
        return
    } else {
        logd("载入插件成功")
    }
}

main();
```

## makeInstance 载入一个类实例

* 载入一个类实例
* 适配EC iOS 4.2.0+
* @param pluginName 插件名称
* @param clzName 类名称
* @returns `string` 返回的字符串如果是null或者是空 代表成功，其他的代表错误信息

```javascript showLineNumbers
function main() {
    let name = "helloworldplugin2"
    let clzName = "Plugin1"
    let load = pluginLoader.loadPlugin(name)
    if (!load) {
        loge("载入插件失败: " + pluginLoader.getErrorMsg())
        return
    }
    logd("载入插件成功 {}", name)
    let ins = pluginLoader.makeInstance(name, clzName)
    if (ins == null || ins == "") {
        logd("实例化类成功: " + clzName)
    } else {
        loge("实例化类失败: " + clzName)
        return
    }
}

main();
```

## getErrorMsg 错误信息

* 获取错误信息
* @return `string` 有字符串代表有错误信息

```javascript showLineNumbers
function main() {
    let name = "helloworldplugin2"
    let clzName = "Plugin1"
    let load = pluginLoader.loadPlugin(name)
    if (!load) {
        loge("载入插件失败: " + pluginLoader.getErrorMsg())
        return
    }
    logd("载入插件成功 {}", name)
    let ins = pluginLoader.makeInstance(name, clzName)
    if (ins == null || ins == "") {
        logd("实例化类成功: " + clzName)
    } else {
        loge("实例化类失败: " + clzName)
        return
    }
}

main();
```

## callMethodStr 调用插件实例函数返回字符串

* 调用插件实例函数返回字符串
* 适配EC iOS 4.2.0+
* @param pluginName 插件名称
* @param clzName 类名称
* @param methodName 函数名称 字符串
* @param args 参数字符串
* @return `string` 字符串对象

```javascript showLineNumbers
function main() {
    let name = "helloworldplugin2"
    let clzName = "Plugin1"
    let load = pluginLoader.loadPlugin(name)

    if (!load) {
        loge("载入插件失败: " + pluginLoader.getErrorMsg())
        return
    }
    logd("载入插件成功 {}", name)
    let ins = pluginLoader.makeInstance(name, clzName)
    if (ins == null || ins == "") {
        logd("实例化类成功: " + clzName)
    } else {
        loge("实例化类失败: " + clzName)
        return
    }
    let args = JSON.stringify({"a": 1, "b": "" + new Date()})
    let rs = pluginLoader.callMethodStr(name, clzName, "testMethod", args)
    logd("testMethod 返回结果 " + rs)
}

main();
```

## callMethodData 调用实例函数

* 调用实例函数返回字符串
* 适配EC iOS 4.2.0+
* @param pluginName 插件名称
* @param clzName 类名称
* @param methodName 函数名称 字符串
* @param data swift语言中Data对象，相当于字节数组
* @return `string` 字符串对象

```javascript showLineNumbers
function main() {
    let name = "helloworldplugin2"
    let clzName = "Plugin1"
    let load = pluginLoader.loadPlugin(name)
    if (!load) {
        loge("载入插件失败: " + pluginLoader.getErrorMsg())
        return
    }
    logd("载入插件成功 {}", name)
    let ins = pluginLoader.makeInstance(name, clzName)
    if (ins == null || ins == "") {
        logd("实例化类成功: " + clzName)
    } else {
        loge("实例化类失败: " + clzName)
        return
    }
    let args = JSON.stringify({"a": 1, "b": "" + new Date()})
    let rs = pluginLoader.callMethodReturnData(name, clzName, "testMethod", args)
    logd("testMethod 返回结果 " + rs)

    let anyR = pluginLoader.callMethodData(name, clzName, "testMethod", rs)
    logd("callMethodData 返回结果 " + anyR)
}

main();
```

## callMethodReturnData 调用实例函数

* 调用插件实例函数
* 适配EC iOS 4.2.0+
* @param pluginName 插件名称
* @param clzName 类名称
* @param methodName 函数名称 字符串
* @param args 参数字符串
* @return Data swift语言中Data对象，相当于字节数组

```javascript showLineNumbers
function main() {
    let name = "helloworldplugin2"
    let clzName = "Plugin1"
    let load = pluginLoader.loadPlugin(name)
    if (!load) {
        loge("载入插件失败: " + pluginLoader.getErrorMsg())
        return
    }
    logd("载入插件成功 {}", name)
    let ins = pluginLoader.makeInstance(name, clzName)
    if (ins == null || ins == "") {
        logd("实例化类成功: " + clzName)
    } else {
        loge("实例化类失败: " + clzName)
        return
    }
    let args = JSON.stringify({"a": 1, "b": "" + new Date()})
    let rs = pluginLoader.callMethodReturnData(name, clzName, "testMethod", args)
    logd("testMethod 返回结果 " + rs)

    let anyR = pluginLoader.callMethodData(name, clzName, "testMethod", rs)
    logd("callMethodData 返回结果 " + anyR)
}

main();
```

## callMethodAny 调用实例函数

* 调用插件函数参数返回值都是Any
* 适配EC iOS 4.2.0+
* @param pluginName 插件名称
* @param clzName 类名称
* @param methodName 函数名称 字符串
* @param data 任意类型的参数
* @return Any swift语言中 Any 对象，js中的任意类型

```javascript showLineNumbers
function main() {
    let name = "helloworldplugin2"
    let clzName = "Plugin1"
    let load = pluginLoader.loadPlugin(name)
    if (!load) {
        loge("载入插件失败: " + pluginLoader.getErrorMsg())
        return
    }
    logd("载入插件成功 {}", name)
    let ins = pluginLoader.makeInstance(name, clzName)
    if (ins == null || ins == "") {
        logd("实例化类成功: " + clzName)
    } else {
        loge("实例化类失败: " + clzName)
        return
    }
    let args = JSON.stringify({"a": 1, "b": "" + new Date()})
    let rs = pluginLoader.callMethodAny(name, clzName, "testMethod", args)
    logd("callMethodAny 返回结果 " + rs)


    logd("开始截图测试Any类型...")

    setComputeMode(1)
    let img1 = image.captureFullScreen();
    logd(img1)

    // 测试1
    let uiimage = image.autoImageToUIImage(img1)
    logd("autoImageToUIImage uiimage " + uiimage)
    let x = pluginLoader.callMethodAny(name, clzName, "testMethod", uiimage)
    logd(x)
    image.recycle(img1)


    let img2 = image.captureFullScreenUIImage({})
    let xX = pluginLoader.callMethodAny(name, clzName, "testMethod", img2)
    logd(xX)


    let au = image.uiimageToAutoImage(uiimage)
    logd("au " + au)

    // 保存到文件中
    image.saveTo(au, file.getSandBoxFilePath("a.jpg"))
    image.recycle(au)
    image.recycle(img2)

}

main();
```

## readBundleFile 读取插件的文件

* 读取插件的文件
* 适配EC iOS 4.2.0+
* @param pluginName 插件名称
* @param key 文件名称，不含有后缀
* @param ext 文件后缀，不要加.
* @return `string` 文件的字符串内容

```javascript showLineNumbers
function main() {
    let name = "helloworldplugin2"
    let clzName = "Plugin1"
    let load = pluginLoader.loadPlugin(name)
    if (!load) {
        loge("载入插件失败: " + pluginLoader.getErrorMsg())
        return
    }
    logd("载入插件成功 {}", name)
    logd("读取插件中的test.txt文件内容")
    let ins = pluginLoader.readBundleFile(name, "test", "txt")
    logd("readBundleFile 返回结果 " + ins)
}

main();
```

## copyBundleFile 复制插件的文件到某个路径

* 复制插件的文件到某个路径
* 适配EC iOS 4.2.0+
* @param pluginName 插件名称
* @param key 文件名称，不含有后缀
* @param ext 文件后缀，不要加.
* @param dest 目标文件地址
* @return `bool` true代表成功

```javascript showLineNumbers
function main() {
    let name = "helloworldplugin2"
    let clzName = "Plugin1"
    let load = pluginLoader.loadPlugin(name)
    if (!load) {
        loge("载入插件失败: " + pluginLoader.getErrorMsg())
        return
    }
    logd("载入插件成功 {}", name)
    let dest = file.getSandBoxFilePath("a.txt")
    logd("dest" + dest)
    logd("复制test.txt到" + dest)
    let ins = pluginLoader.copyBundleFile(name, "test", "txt", dest)
    logd("copyBundleFile 返回结果 " + ins)
}

main();
```
