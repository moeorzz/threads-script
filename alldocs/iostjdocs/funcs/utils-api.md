---
title: 工具函数
description: EasyClick 自动化脚本 iOS免越狱 工具函数
keywords:
  - EasyClick 自动化脚本 iOS免越狱 工具函数
  - URL
  - param
  - takeMeToFront
  - 'true'
  - 'false'
  - url
  - setClipboardText
  - getClipboardText
  - openUrl
  - saveImageToAlbum
  - EasyClick
  - 手机自动化
  - 自动化测试
  - 脚本开发
  - 安卓自动化
  - iOS自动化
  - 鸿蒙Next
---

## 说明

## 剪切板

### setClipboardText 设置剪切板

* 设置剪贴板文本，注意：可以开启画中画或者 takeMeToFront 使本程序在前台
* @param text 文本
* @param type 1 文本 2 链接
* @return `{boolean}` true 代表成功，false 代表失败

```javascript showLineNumbers
function main() {
    takeMeToFront()
    sleep(1000)
    var r = utils.setClipboardText("22222", 1);
    logd(r)
}

main();
```

### getClipboardText 读取剪切板

* 读取剪贴板文本，注意：可以开启画中画或者 takeMeToFront 使本程序在前台
* @return `{string}` 剪切板的数据

```javascript showLineNumbers
function main() {
    takeMeToFront()
    sleep(1000)
    var r = utils.getClipboardText();
    logd(r)
}

main();
```

## 打开URL

### openUrl 打开URL

* 打开url，注意：需要重新在前台运行，先调用 takeMeToFront 函数，将本程序放前台
* @param url url地址
* `{boolean}` true 代表成功 false 代表失败

```javascript showLineNumbers
function main() {
    takeMeToFront()
    sleep(1000)
    var r = utils.openUrl("http://baidu.com");
    logd(r)
}

main();
```

## 相册相关

### saveImageToAlbum 保存图像到相册

* 保存图片到相册中去
* @param img AutoImage对象
* `{boolean}` true 代表成功 false 代表失败

```javascript showLineNumbers
function main() {
    //请求相册权限,只在脚本开头请求一次即可,需要手动授权，或者去手机设置-拉倒最底部，找到EC app,进入勾选照片权限
    utils.requestPhotoAuthorization()
    sleep(1000)
    let img = image.captureFullScreen()
    logd("img getHeight " + image.getHeight(img))
    logd("img getWidth " + image.getWidth(img))
    var r = utils.saveImageToAlbum(img);
    logd(r)
}

main();
```

### saveImageToAlbumPath 保存图像路径到相册

* 保存图像路径到相册
* @param path 文件的路径
* `{boolean}` true 代表成功 false 代表失败

```javascript showLineNumbers
function main() {
    //请求相册权限,只在脚本开头请求一次即可,需要手动授权，或者去手机设置-拉倒最底部，找到EC app,进入勾选照片权限
    utils.requestPhotoAuthorization()
    sleep(1000)
    let url = "http://192.168.2.10:8199/resource/image/wx.png"
    let box = file.getInternalDir("documents")
    logd("sandbox " + box)
    let filex = box + "/bb.png"
    logd("file " + filex)
    let r = http.downloadFile(url, filex, 10000, null)
    logd("download " + r)
    let rx = utils.saveImageToAlbumPath(filex)
    logd("r " + rx)
}

main();
```

### saveVideoToAlbumPath 保存视频路径到相册

* 通过路径保存视频到相册中去
* @param path 视频文件的路径
* `{boolean}` true 代表成功 false 代表失败

```javascript showLineNumbers
function main() {
    //请求相册权限,只在脚本开头请求一次即可,需要手动授权，或者去手机设置-拉倒最底部，找到EC app,进入勾选照片权限
    utils.requestPhotoAuthorization()
    sleep(1000)
    let url = "http://192.168.2.10:8199/resource/image/wx.mp4"
    let box = file.getInternalDir("documents")
    logd("sandbox " + box)
    let filex = box + "/bb.mp4"
    logd("file " + filex)
    let r = http.downloadFile(url, filex, 10000, null)
    logd("download " + r)
    let rx = utils.saveVideoToAlbumPath(filex)
    logd("r " + rx)
}

main();
```

### utils.requestPhotoAuthorization 请求相册权限

* 请求相册权限
* 第一次请求会有弹窗权限，请允许，或者去手机设置-拉倒最底部，找到EC app,进入勾选照片权限
* 注意: 这些都是异步的，防止卡住不能模拟点击，请忽略返回值
* 支持版本 EC 脱机4.9.0+
* @return `{bool}` true 代表成功 false 代表失败

```javascript showLineNumbers
function main() {
    let rx = utils.requestPhotoAuthorization()
    logd("r " + rx)
    // 接下来 调用删除的功能了
    let a = utils.deleteAllPhotos()
    logd("a " + a)

}

main();
```

### utils.deleteAllPhotos 清空相册中的图片

* 清空相册中的图片
* 调用时候会有弹窗确定，请模拟点击删除按钮
* 注意: 这些都是异步的，防止卡住不能模拟点击，请忽略返回值
* 支持版本 EC 脱机4.9.0+
* @return `{bool}` true 代表成功 false 代表失败

```javascript showLineNumbers
function main() {
    let rx = utils.requestPhotoAuthorization()
    logd("r " + rx)
    // 接下来 调用删除的功能了
    let a = utils.deleteAllPhotos()
    logd("a " + a)
}

main();
```

### utils.deleteAllVideos 清空相册中的视频

* 清空相册中的视频
* 调用时候会有弹窗确定，请模拟点击删除按钮
* 注意: 这些都是异步的，防止卡住不能模拟点击，请忽略返回值
* 支持版本 EC 脱机4.9.0+
* @return `{bool}` true 代表成功 false 代表失败

```javascript showLineNumbers
function main() {
    let rx = utils.requestPhotoAuthorization()
    logd("r " + rx)
    // 接下来 调用删除的功能了
    let a = utils.deleteAllVideos()
    logd("a " + a)
}

main();
```

## 其他

### utils.dataMd5 数据的MD5

* 数据计算出来的MD5
* 适配 EC 4.10.0+
* @param data 数据
* @return `{string}` 文件MD5字符串或者null

```javascript showLineNumbers
function main() {
    let docs = file.getInternalDir("documents")
    var md5 = utils.fileMd5(docs + "/aaa.png");
    logd(md5)
}

main();
```

### utils.fileMd5 文件的MD5

* 文件的MD5
* @param file 文件路径
* @returns `{string}` 文件MD5字符串或者null

```javascript showLineNumbers
function main() {
    let docs = file.getInternalDir("documents")
    var md5 = utils.fileMd5(docs + "/aaa.png");
    logd(md5)
}

main();
```

## 随机

### utils.getRangeInt 取得某个范围的随机值

* 取得某个范围的随机值
* @param min 最小值
* @param max 最大值
* @return 整型 在min和max中间的值, 不包含最大值，但是包含最小值

```javascript showLineNumbers
function main() {
    var r = utils.getRangeInt(2, 10);
}

main();
```

## base64

### utils.base64Encode base64编码

* base64编码
* @param data 需要编码的字符串
* @returns `{string}` 编码结果

```javascript showLineNumbers
function main() {
    var r = utils.base64Encode("111");
    logd(r)
}

main();
```

### utils.base64Decode base64解码

* base64解码
* @param data 需要解码的字符串
* @returns `{string}` 解码结果

```javascript showLineNumbers
function main() {
    var r = utils.base64Decode("MjIy");
    logd(r)
}

main();
```

## 音乐播放

### utils.playMp3 播放MP3音乐

* 播放MP3音乐,异步播放
* EC 脱机 4.5.0+
* @param path 文件路径
* @param loop 是否循环播放 true代表是
* @return `{bool}` true 代表成功 false 代表失败

```javascript showLineNumbers
function main() {
    let path = file.getSandBoxFilePath("test.mp3");
    //脚本的res目录下的test.mp3复制到指定手机文件
    saveResToFile("test.mp3", path)
    let d = utils.playMp3(path, false)
    logd("dd " + d)
    //给点延迟,等音乐开始真正播放
    sleep(30 * 1000)
    utils.stopMp3()
    logd("stop play ")
}

main();
```

### utils.playMp3WaitEnd 同步播放MP3音乐

* 播放mp3音乐，等待结束
* EC 脱机 4.5.0+
* @param path 文件路径
* @param loop 是否循环播放 true代表是
* @return `{bool}` true 代表成功 false 代表失败

```javascript showLineNumbers
function main() {
    let path = file.getSandBoxFilePath("test.mp3");
    //脚本的res目录下的test.mp3复制到指定手机文件
    saveResToFile("test.mp3", path)
    let d = utils.playMp3WaitEnd(path, false)
    logd("dd " + d)
}

main();
```

### utils.stopMp3 停止播放mp3音乐

* 停止播放mp3音乐
* EC 脱机 4.5.0+
* @return `{bool}` true 代表成功 false 代表失败

```javascript showLineNumbers
function main() {

    let path = file.getSandBoxFilePath("test.mp3");
    //脚本的res目录下的test.mp3复制到指定手机文件
    saveResToFile("test.mp3", path)
    let d = utils.playMp3(path, false)
    logd("dd " + d)
    //给点延迟,等音乐开始真正播放
    sleep(30 * 1000)
    utils.stopMp3()
    logd("stop play ")
}

main();
```

## 通知栏

### utils.requestNotificationAuthorization 请求通知授权

* 请求通知授权
* 调用时候会有弹窗确定，请模拟点击删除按钮
* 注意: 这些都是异步的，防止卡住不能模拟点击，请忽略返回值
* 支持版本 EC 脱机4.10.0+
* @return `{bool}` true 代表成功 false 代表失败

```javascript showLineNumbers
function main() {
    let rx = utils.requestNotificationAuthorization()
    logd("r " + rx)
    // 接下来 显示功能
    let a = utils.showNotification("标题", "内容", 1)
    logd("a " + a)

}

main();
```

### utils.showNotification 显示通知

* 显示通知
* 支持版本 EC 脱机4.10.0+
* @param title 标题
* @param content 内容
* @param delay 延迟执行时间 单位是秒，必须是整形
* @return `{string}` 一个通知的ID，后面用于取消等操作

```javascript showLineNumbers
function main() {
    let rx = utils.requestNotificationAuthorization()
    logd("r " + rx)
    // 接下来 显示功能
    let a = utils.showNotification("标题", "内容", 1)
    logd("a " + a)

}

main();
```

### utils.removeNotification 清除通知

* 清除通知
* 支持版本 EC 脱机4.10.0+
* 异步函数 请忽略返回值
* @param id 通知的ID
* @return `{bool}` true 代表成功 false 代表失败

```javascript showLineNumbers
function main() {
    let rx = utils.requestNotificationAuthorization()
    logd("r " + rx)
    // 接下来 显示功能
    let a = utils.showNotification("标题", "内容", 1)
    logd("a " + a)

    sleep(5000)
    utils.removeNotification(a)

}

main();
```

### utils.removeAllNotification 清除所有已经显示的通知

* 清除所有已经显示的通知
* 调用时候会有弹窗确定，请模拟点击删除按钮
* 注意: 这些都是异步的，防止卡住不能模拟点击，请忽略返回值
* 支持版本 EC 脱机4.10.0+
* @return `{bool}` true 代表成功 false 代表失败

```javascript showLineNumbers
function main() {
    let rx = utils.requestNotificationAuthorization()
    logd("r " + rx)
    // 接下来 显示功能
    let a = utils.showNotification("标题", "内容", 1)
    logd("a " + a)

    sleep(5000)
    utils.removeAllNotification()

}

main();
```


## 二维码
### utils.createQRCode 生成二维码

* 生成一个二维码
* 适用版本(EC 脱机版本 4.12.0+)
* @param content 二维码字符串内容
* @param width 图像宽度
* @param height 图像高度
* @param logoImage 图像中心的logo，非必填项，AutoImage 对象，请看image模块
* @return `{AutoImage}`  保存到文件请看image模块

```javascript showLineNumbers
function main() {

  let da = "test qrcode content"
  let logo = readResAutoImage("logo.png")
  let img = utils.createQRCode(da,200,100,logo)
  logd(img)
  
  // 识别结果 
  logd(utils.decodeQRCode(img));
  // 保存到文件中
  image.saveTo(img,file.getSandBoxFilePath("/qr.code.jpg"))
  image.recycle(img)

}

main();
```


### utils.decodeQRCode 解析二维码

* 解析一个二维码
* 适用版本(EC 脱机版本 4.12.0+)
* @param img 图像 AutoImage 对象，请看image模块
* @return `{string}` 解析后的字符串

```javascript showLineNumbers
function main() {

  let da = "test qrcode content"
  let logo = readResAutoImage("logo.png")
  //生成
  let img = utils.createQRCode(da,200,100,logo)
  logd(img)
  
  // 识别结果 
  logd(utils.decodeQRCode(img));
  // 保存到文件中
  image.saveTo(img,file.getSandBoxFilePath("/qr.code.jpg"))
  image.recycle(img)

}

main();
```
