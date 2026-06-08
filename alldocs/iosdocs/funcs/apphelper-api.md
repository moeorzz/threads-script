---
title: 辅助模块
description: EasyClick 自动化脚本 iOS免越狱 辅助模块
keywords:
  - EasyClick 自动化脚本 iOS免越狱 辅助模块
  - param
  - app
  - ipa
  - setHelperTimeout
  - setParam
  - uploadToAlbum
  - URL
  - EC
  - iOS
  - setPasteboard
  - EasyClick
  - 手机自动化
  - 自动化测试
  - 脚本开发
  - 安卓自动化
  - iOS自动化
  - 鸿蒙Next
---

## 说明

- 辅助模块是需要安装额外的应用，请到网盘里下载文件传输助手ipa,或者安装脱机版主程序ipa 3.16.0+以上版本，签名后安装到手机即可

:::tip

- 文件传输助手IPA就是 脱机版本主程序。两个是同一个包
- 文化传输助手模块函数和输入法函数，是共用一个ipa包的
  :::

## 设置

### setHelperTimeout 设置助手请求超时时间

* 适配EC iOS USB版本 9.19.0+
* @param t 单位是毫秒 默认是300秒

```javascript showLineNumbers
function main() {
    appHelper.setHelperTimeout(500000)
}

main();
```

### setParam 设置辅助应用app参数

* @param bundleIdPrefix 辅助应用的bundleId前缀，多个用英文逗号,隔开
* @param appHelperPort 辅助应用开放的端口，默认是18924，不知道可以写0

```javascript showLineNumbers
function main() {
    appHelper.setParam("com.ieasyclick.ios.auto3", 0)
}

main();
```

## 相册

### uploadToAlbum 插入相册

* 上传图片或者视频到相册中
* 支持 EC iOS 6.0.0+
* @param openApp 是否打开辅助助手app
* @param path 电脑上的文件路径，可以是图片或者视频
* @return `{boolean}` true 成功，false 失败

```javascript showLineNumbers
function main() {
    appHelper.setParam("com.ieasyclick.ios.auto3", 0)
    // 支持 png，jpeg，mp4文件
    // 如果第一个参数设置为true，会自动打开辅助应用
    // 如果你手动或者其他方式打开辅助应用，第一个参数可以设置为false
    let r = appHelper.uploadToAlbum(true, "C:/a.png")
    logd(r)
}

main();
```

## 剪切板

### setPasteboard 设置剪贴板

* 支持 EC iOS 6.0.0+
* @param openApp 是否打开辅助助手app
* @param content 内容
* @return `{boolean}` true 成功，false 失败

```javascript showLineNumbers
function main() {
    appHelper.setParam("com.ieasyclick.ios.auto3", 0)
    // 如果第一个参数设置为true，会自动打开辅助应用
    // 如果你手动或者其他方式打开辅助应用，第一个参数可以设置为false
    let r = appHelper.setPasteboard(true, "123456")
    logd(r)
}

main();
```

### getPasteboard 读取剪贴板

* 读取剪贴板的值
* 支持 EC iOS 6.0.0+
* @param openApp 是否打开辅助助手app
* @return `{string}` 返回的数据

```javascript showLineNumbers
function main() {
    appHelper.setParam("com.ieasyclick.ios.auto3", 0)
    // 如果第一个参数设置为true，会自动打开辅助应用
    // 如果你手动或者其他方式打开辅助应用，第一个参数可以设置为false
    let r = appHelper.getPasteboard(true)
    logd(r)
}

main();
```

## URL操作

### openUrl 打开URL

* 打开URL ,URL Schemes
* 支持 EC iOS 6.0.0+
* @param openApp 是否打开辅助助手app
* @param url 网址
* @return `{boolean}` true 代表成功 false代表失败

```javascript showLineNumbers
function main() {
    appHelper.setParam("com.ieasyclick.ios.auto3", 0)
    // 如果第一个参数设置为true，会自动打开辅助应用
    // 如果你手动或者其他方式打开辅助应用，第一个参数可以设置为false
    let r = appHelper.openUrl(true, "http://baidu.com")
    logd(r)

    r = appHelper.openUrl(true, "snssdk1128://")
    logd(r)
}

main();
```
