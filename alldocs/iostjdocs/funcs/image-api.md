---
title: 图色函数
description: EasyClick 自动化脚本 iOS免越狱 图色函数 资源下载
keywords:
  - EasyClick 自动化脚本 iOS免越狱 图色函数 资源下载
  - image
  - jpg
  - Image
  - param
  - setInitParam
  - useOpencvMat
  - captureFullScreenEx
  - mat
  - png
  - captureFullScreen
  - EasyClick
  - 手机自动化
  - 自动化测试
  - 脚本开发
  - 安卓自动化
  - iOS自动化
  - 鸿蒙Next
---

## 设置

### image.setInitParam 初始化参数

* 设置图色模块初始化参数
* @param params 参数待定

```javascript showLineNumbers
function main() {
    image.setInitParam({});
}

main();
```

### image.useOpencvMat 初始化参数

* 切换图片存储模式为opencv的mat格式
* 适合EC iOS 4.6.0+
* 切换后抓图、读取图片、找图、找色等都会切换到mat格式，速度更快内存更少
* 实测内存减少50%-80%，CPU减少20%-30%，速度提升100%-200%
* 如果让图片格式切换请参考 imageToMatFormat和matToImageFormat两个函数
* @param use 1 是 0 否
* @return `{boolean|*}` true 成功 false 失败

```javascript showLineNumbers
function main() {
    let r = image.useOpencvMat(1);
    logd(r)
    //剩下的代码和之前一样 找色 找图等操作
}

main();
```

## 代理模式普通截图 jpg

### image.captureFullScreenEx 截取全屏Image对象

* 抓取全屏，格式是JPG
* @param ext 扩展参数，可以调整截图的方式和质量，可以分别是
* fetchImageMode: 1 代表截图 jpg格式的方式1 2 代表截图 jpg格式方式2 3代表png格式，png不支持质量参数 ，根据自己机器情况调用
* fetchImageQuality: 图片质量，fetchImageMode =1的时候，支持 1， 50， 100，三种不同的质量标准
*      当 fetchImageMode =2 的时候，支持1-100图片质量
* @return `{null|AutoImage}`

```javascript showLineNumbers
function main() {
    logd("isServiceOk " + isServiceOk());
    startEnv()
    logd("isServiceOk " + isServiceOk());
    for (let i = 0; i < 10; i++) {
        console.time(1)
        let cap = image.captureFullScreenEx({"fetchImageMode": "1", "fetchImageQuality": 50})
        logd("截图数据: " + cap + "  耗时: " + console.timeEnd(1))
        image.saveTo(cap, "b.jpg");
        sleep(1000)
        //图片要回收
        image.recycle(cap)
    }
}
```

### image.captureFullScreen 截取全屏Image对象

* 截取当前屏幕并返回一个Image对象, 这个格式是jpg。
* @return AutoImage对象或者null

```javascript showLineNumbers
function main() {
    logd("isServiceOk " + isServiceOk());
    startEnv()
    logd("isServiceOk " + isServiceOk());
    for (let i = 0; i < 10; i++) {
        let cap = image.captureFullScreen()
        logd("截图数据: " + cap)
        sleep(1000)
        //图片要回收
        image.recycle(cap)
    }
}

main();
```

### image.captureFullScreenUIImage 截屏UIImage对象

* 截屏UIImage对象
* 适配EC 4.2.0+
* @param ext 扩展参数，可以调整截图的方式和质量，可以分别是
* type: 1 代表截图 jpg格式的方式1
* 2 代表截图 jpg格式方式 2
* 3 代表png格式，png不支持质量参数 ，根据自己机器情况调用
* quality: 图片质量，type=1的时候，支持 1， 50， 100，三种不同的质量标准
* 当type =2 的时候，支持1-100图片质量
* @return swift中的UIImage对象或者null

```javascript showLineNumbers
function main() {
    logd("isServiceOk " + isServiceOk());
    startEnv()
    logd("isServiceOk " + isServiceOk());
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


## 快捷指令截图
:::tip
- 快捷指令截图需要配合脱机版本的服务才行，具体请看 [OTG-HID文档截图配置，快捷指令截图](/iostjdocs/zh-cn/advance/tj-otg-starter#快捷指令截图)
- 当然也可以不使用OTG HID，单独配置快捷指令截图也行，配置方法都一样
:::

### image.getShortcutImage 获取快捷指令的截图
* 获取快捷指令的截图
* 内部实现循环获取
* 如果手机是横屏的，但是截图显示不是横屏，可以通旋转函数进行旋转成横屏
* 适配EC 脱机版本 6.6.0+
* @param timeout 超时时间 单位是毫秒
* @return `{AutoImage|null}` AutoImage对象

```javascript
function test_shortcut_screen() {
    //开头 释放所有ocr资源，防止之前未释放的资源占用
    ocrMut.releaseAll();
    logd("开始执行脚本...")
    let ocrtest = ocrMut.newOcr()
    let modelPath = file.getSandBoxFilePath("")
    let detName = "det"
    let recName = "rec"
    // 内部自带的ocr模型
    let paddleNcnnOcrMap1 = {"type": "paddleNcnnOcrV5", "numThread": 2, "padding": 32, "maxSideLen": 640}

    // 使用外部的模型
    let paddleOnnxOcrMap2 = {
        "type": "paddleNcnnOcrV5", "numThread": 2, "padding": 32, "maxSideLen": 640,
        "modelsDir": modelPath,
        "keysName": "keys.txt",
        "detName": detName,
        "recName": recName
    }
    let inited = ocrtest.initOcr(paddleNcnnOcrMap1)
    if (!inited) {
        loge("inited ocr error : " + ocrtest.getErrorMsg())
        return
    } else {
        logd("ocr inited ok")
    }
    // 可以先停止 也可以 不停止
    // image.stopShortcutHttpServer();
    // 直接启动，整个程序运行期间启动一次就行，或者从 app设置中启动
    let b = image.startShortcutHttpServer(0)
    if (!b) {
        logw("启动快捷指令接收服务失败 {}", image.shortcutHttpServerLastError())
        return;
    }
    image.useOpencvMat(1)
    logd("开始截屏，快捷指令的快捷键需要提前绑定，请参考文档建立快捷指令和绑定快捷键")
    for (let i = 0; i < 100; i++) {
        sleep(1000)
        logd("第 " + (i + 1) + " 截屏")
        //测试代码快捷指令绑定的是 gui+A 发送指令 然后获取即可
        //logd(otgEvent.keyPressChar("gui", "A"))
        let img = image.getShortcutImage(10 * 1000);
        if (img) {
            logd("快捷指令截图成功 " + img)
            logd("图像宽度和高度 {},{}", img.getWidth(), img.getHeight())
            let ss = file.getSandBoxFilePath("a.png");
            img.saveTo(ss)
            logd("图像保存到: " + ss)
        } else {
            continue
        }


        console.time(1)

        // 这里也可以设置动态的参数
        let ocrResult = ocrtest.ocrImage(img, 20000, {"numThread": 2, "padding": 32})

        logd("ocrResult " + JSON.stringify(ocrResult));
        if (ocrResult) {
            logd("ocr结果-》 " + JSON.stringify(ocrResult));
            for (var j = 0; j < ocrResult.length; j++) {
                var value = ocrResult[j];
                logd("文字 : " + value.label + "   " + value.x + "," + value.y + "," + (value.x + value.width) + "," + (value.y + value.height));
            }
        } else {
            logw("未识别到结果");
        }
        logd("耗时: {} ms", console.timeEnd(1))
        sleep(100)
        image.recycle(img)
        sleep(200)
    }
    //脚本运行完成了释放即可 不需要每次用完都释放
    ocrtest.releaseAll()
}


test_shortcut_screen();

```

### image.startShortcutHttpServer 启动快捷指令接收服务
* 启动快捷指令接收服务
* 用来接收快捷指令发送过来的图像数据
* 可以从APP设置中启动的服务也可以使用脚本调用这个函数启动
* 适配EC 脱机版本 6.6.0+
* @param port 监听端口（1-65535）传递为0的情况就使用默认的端口
* @return `{boolean}` true代表启动成功 false代表启动失败
```javascript
// 代码例子参考 image.getShortcutImage 
```


### image.stopShortcutHttpServer 停止快捷指令接收服务

* 停止快捷指令截图接收服务
* 适配EC 脱机版本 6.6.0+
* @return `{boolean}` true代表启动成功 false代表启动失败
```javascript
// 代码例子参考 image.getShortcutImage 
```


### image.shortcutHttpServerBaseUrl 获取接收服务URL

* 获取接收服务URL
* 这个一般用不上
* 适配EC 脱机版本 6.6.0+
* @return `{string}` 服务地址
```javascript
// 代码例子参考 image.getShortcutImage 
```


### image.shortcutHttpServerLastError 获取截屏服务错误信息

* 获取截屏服务错误信息
* 快捷指令截屏接收服务的最近错误信息
* （例如启动失败原因）
* 适配EC 脱机版本 6.6.0+
* @return `{string}` null或者"" 代表没有错误
```javascript
// 代码例子参考 image.getShortcutImage 
```


## 录屏截图
:::tip
- 录屏截图需要配合脱机版本的服务才行，具体请看 [OTG-HID文档截图配置，系统录屏截图](/iostjdocs/zh-cn/advance/tj-otg-starter#系统录屏截图)
- 当然也可以不使用OTG HID，单独配置录屏截图也行，配置方法都一样
- IDEA开发工具中，无自动化抓图功能，先点抓图设置按钮，设置为**录屏模式（手机录屏）**才能正常使用
:::
### image.getSystemScreenCapImage 获取录屏截图
* 获取系统录屏截图
* 如果手机是横屏的，但是截图显示不是横屏，可以通旋转函数进行旋转成横屏
* 适配EC 脱机版本 6.6.0+
* @param timeout 超时时间，毫秒
* @return `{AutoImage|null}` null代表截图失败
```javascript
function check_record_img_ok() {
    let picNum = 0;
    let ok = false;
    for (let i = 0; i < 5; i++) {
        let img = image.getSystemScreenCapImage(1000);
        if (img) {
            picNum++;
            logd("收到了录屏数据 {},{}", img.getWidth(), img.getHeight())
            img.recycle();
            // 收到超过2张图像 判断为成功
            if (picNum > 2) {
                ok = true;
                break
            }
        }
    }
    if (ok) {
        return true;
    }
    return false;
}

function check_record_ok() {
    // 直接启动，整个程序运行期间启动一次就行，或者从 app设置中启动
    let b = image.startSystemScreenCapServer()
    if (!b) {
        logw("启动录屏接收数据服务失败")
        return;
    }
    // 设置帧率和质量 先设置，才能启动录屏 否则不生效
    // 也可以从app设置中启动系统录屏和设置参数
    image.setSystemScreenCapFps(10)
    image.setSystemScreenCapJpegQuality(80)
    
    if (image.isSystemScreenCapBroadcasting()) {
        logd("录屏服务已经启动，开始检查是否可以获取图像")
        if (check_record_img_ok()) {
            return true
        }
        if (!image.startSystemScreenCapBroadcast()) {
            logw("开启录屏广播失败: " + image.systemScreenCapLastError())
            return false;
        }
        logd("等待用户手动选择确定")
        sleep(5000)
        return check_record_img_ok();
    } else {
        if (!image.startSystemScreenCapBroadcast()) {
            logw("开启录屏广播失败: " + image.systemScreenCapLastError())
            return false;
        }
        logd("等待用户手动选择确定")
        sleep(5000)
        return check_record_img_ok();

    }
}

function test_system_screenrecord() {

    if (!check_record_ok()) {
        logw("无法获取录屏数据，请检查或者到APP设置中-系统录屏设置-手动启动")
        return;
    }

    logd("开始获取数据")
    for (let i = 0; i < 10; i++) {
        sleep(1000)
        logd("第 " + (i + 1) + " 截屏")
        let img = image.getSystemScreenCapImage(10 * 1000);
        if (img) {
            logd("录屏数据 " + img)
            logd("图像宽度和高度 {},{}", img.getWidth(), img.getHeight())
            let ss = file.getSandBoxFilePath("a.png");
            img.saveTo(ss)
            logd("图像保存到: " + ss)
            img.recycle();
        }

    }
}

test_system_screenrecord();
```


### image.startSystemScreenCapServer 启动录屏接收服务

* 启动录屏接收服务
* 一定先开启这个才能接收图像，也可以从APP设置-系统录屏选项中启动
* 适配EC 脱机版本 6.6.0+
* @return `{boolean}` true 代表成功 false 代表失败
```javascript
// 代码例子参考 image.getSystemScreenCapImage 
```



### image.stopSystemScreenCapServer 启动录屏接收服务

* 停止录屏接收服务
* 适配EC 脱机版本 6.6.0+
* @return `{boolean}` true 代表成功 false 代表失败
```javascript
// 代码例子参考 image.getSystemScreenCapImage 
```


### image.startSystemScreenCapBroadcast 启动系统录屏
* 启动系统录屏
* 适配EC 脱机版本 6.6.0+
* 这个需APP在前台才行，或者去APP设置-系统录屏设置中启动（启动后系统弹出框，会有ScreenCapture这个选项选择后，点击开始直播）
* （弹出/触发系统 Broadcast Picker，需要用户确认/点一下）
* @return `{boolean}` true 代表成功 false 代表失败
```javascript
// 代码例子参考 image.getSystemScreenCapImage 
```


### image.isSystemScreenCapBroadcasting 录屏否正在运行
* 录屏否正在运行
* 适配EC 脱机版本 6.6.0+
* 这个不一定准确，所以在文档演示代码中，也使用了获取图像数据进行判断
* @return `{boolean}` true 代表正在启动录屏，false代表不在录屏
```javascript
// 代码例子参考 image.getSystemScreenCapImage 
```


### image.setSystemScreenCapFps 设置系统录屏帧率
* 设置系统录屏帧率
* （fps，每秒张数），例如 10=每秒10张。
* 不要设置太大
* 注意：扩展每次开始广播时会先读取配置
* 适配EC 脱机版本 6.6.0+
* @param fps 帧率 1-60
* @return `{boolean}` true 代表成功 false 代表失败
```javascript
// 代码例子参考 image.getSystemScreenCapImage 
```

### image.setSystemScreenCapJpegQuality 设置录屏图片质量
* 设置录屏图片质量
* JPEG 图片质量（1-100）
* 适配EC 脱机版本 6.6.0+
* @param q 质量 1-100 越大越清晰，资源消耗越多
* @return `{boolean}` true 代表成功 false 代表失败
```javascript
// 代码例子参考 image.getSystemScreenCapImage 
```


### image.systemScreenCapLastError 获取录屏错误信息
* 获取录屏错误信息
* 适配EC 脱机版本 6.6.0+
* @return `{string}` null或者空无错误，其他是错误信息
```javascript
// 代码例子参考 image.getSystemScreenCapImage 
```


## 比色

### image.cmpColor 多点比色

* 单点或者多点比色，找到所有符合标准的点，如果都符合返回true，否则是false
* @param image1 图片
* @param points 字符串类似这样 6|1|0x969696-0x000010,1|12|0x969696,-4|0|0x969696
* @param threshold 找色时颜色相似度取值为 0.0 ~ 1.0
* @param x 区域的X起始坐标，默认填写0全屏查找
* @param y 区域的Y起始坐标，默认填写0全屏查找
* @param ex 终点X坐标，默认填写0全屏查找
* @param ey 终点Y坐标，默认填写0全屏查找
* @return 布尔型，true代表找到了 false代表未找到

```javascript showLineNumbers
function main() {
    let req = startEnv();
    if (!req) {
        logd("申请权限失败");
        return;
    }
    let aimage = image.captureFullScreen();
    if (aimage != null) {
        let points3 = "205|1130|0xff944b-0x101010,211|1158|0xff8e42,191|1175|0xfcfbf7";
        let points = image.cmpColor(aimage, points3, 0.9, 0, 0, 0, 0);
        logd("points " + points);
        //图片要回收
        image.recycle(aimage)
    }

}

main();
```

### image.cmpColorJ 多点比色(JSON)

* 单点或者多点比色，找到所有符合标准的点，如果都符合返回true，否则是false
* @param image1 图片
* @param jsonFileName 使用图色工具生成JSON文件,存储到res文件夹中,例如 a.json
* @return `{boolean}` true代表找到了 false代表未找到

```javascript showLineNumbers
function main() {
    let req = startEnv();
    if (!req) {
        logd("申请权限失败");
        return;
    }
    let aimage = image.captureFullScreen();
    if (aimage != null) {
        let points = image.cmpColorJ(aimage, "a.json");
        logd("points " + points);
        //图片要回收
        image.recycle(aimage)
    }
}

main();
```

### image.cmpColorEx 多点比色扩展

* 单点或者多点比色，找到所有符合标准的点，自动截图，如果都符合返回true，否则是false
* @param points 字符串类似这样 6|1|0x969696-0x000010,1|12|0x969696,-4|0|0x969696
* @param threshold 找色时颜色相似度取值为 0.0 ~ 1.0
* @param x 区域的X起始坐标，默认填写0全屏查找
* @param y 区域的Y起始坐标，默认填写0全屏查找
* @param ex 终点X坐标，默认填写0全屏查找
* @param ey 终点Y坐标，默认填写0全屏查找
* @return 布尔型，true代表找到了 false代表未找到

```javascript showLineNumbers
function main() {
    let req = startEnv();
    if (!req) {
        logd("申请权限失败");
        return;
    }
    let points3 = "205|1130|0xff944b-0x101010,211|1158|0xff8e42,191|1175|0xfcfbf7";
    let points = image.cmpColorEx(points3, 0.9, 0, 0, 0, 0);
    logd("points " + points);

}

main();
```

### image.cmpMultiColor 多组比色

* 多点或者多点数组比色，找到所有符合标准的点，依次查找，如果找到就返回当前points的索引值，如果返回-1，说明都没有找到
* @param image1 图片
* @param points 数组类似这样 ```["6|1|0x969696-0x000010,1|12|0x969696,-4|0|0x969696","6|1|0x969696"]```
* @param threshold 找色时颜色相似度取值为 0.0 ~ 1.0
* @param x 区域的X起始坐标，默认填写0全屏查找
* @param y 区域的Y起始坐标，默认填写0全屏查找
* @param ex 终点X坐标，默认填写0全屏查找
* @param ey 终点Y坐标，默认填写0全屏查找
* @return 整型，如果找到就返回当前points的索引值，如果返回-1，说明都没有找到

```javascript showLineNumbers
function main() {
    let req = startEnv();
    if (!req) {
        logd("申请权限失败");
        return;
    }
    let aimage = image.captureFullScreen();
    if (aimage != null) {
        let points1 = "205|112230|0xff944b,211|1158|0xff8e42,191|1175|0xfcfbf7";
        let points2 = "205|113022|0xff944b,211|1158|0xff8e42,191|1175|0xfcfbf7";
        let points3 = "205|1130|0xff944b,211|1158|0xff8e42,191|1175|0xfcfbf7";
        let points = image.cmpMultiColor(aimage, [points1, points2, points3], 0.9, 0, 0, 0, 0);
        logd("points " + points);
        //图片要回收
        image.recycle(aimage)
    }
}

main();
```

### image.cmpMultiColorJ 多组比色(JSON)

* 多点或者多点数组比色，找到所有符合标准的点，依次查找，如果找到就返回当前points的索引值，如果返回-1，说明都没有找到
* 运行环境: 无限制
* @param image1 图片
* @param jsonFileName 使用图色工具生成JSON文件,存储到res文件夹中,例如 a.json
* @return `{boolean}` true代表找到了 false代表未找到

```javascript showLineNumbers
function main() {
    let req = startEnv();
    if (!req) {
        logd("申请权限失败");
        return;
    }
    let aimage = image.captureFullScreen();
    if (aimage != null) {
        let points = image.cmpMultiColorJ(aimage, "a.json");
        logd("points " + points);
        //图片要回收
        image.recycle(aimage)
    }
}

main();
```

### image.cmpMultiColorEx 多组比色扩展

* 多点或者多点数组比色，找到所有符合标准的点，自动截屏，依次查找，如果找到就返回当前points的索引值，如果返回-1，说明都没有找到
* @param points 数组类似这样 ```["6|1|0x969696-0x000010,1|12|0x969696,-4|0|0x969696","6|1|0x969696"]```
* @param threshold 找色时颜色相似度取值为 0.0 ~ 1.0
* @param x 区域的X起始坐标，默认填写0全屏查找
* @param y 区域的Y起始坐标，默认填写0全屏查找
* @param ex 终点X坐标，默认填写0全屏查找
* @param ey 终点Y坐标，默认填写0全屏查找
* @return 整型，如果找到就返回当前points的索引值，如果返回-1，说明都没有找到

```javascript showLineNumbers
function main() {
    let req = startEnv();
    if (!req) {
        logd("申请权限失败");
        return;
    }
    let points1 = "205|112230|0xff944b,211|1158|0xff8e42,191|1175|0xfcfbf7";
    let points2 = "205|113022|0xff944b,211|1158|0xff8e42,191|1175|0xfcfbf7";
    let points3 = "205|1130|0xff944b,211|1158|0xff8e42,191|1175|0xfcfbf7";
    let points = image.cmpMultiColorEx([points1, points2, points3], 0.9, 0, 0, 0, 0);
    logd("points " + points);
}

main();
```

## 找色

### image.findColor 单点找色

* 在图片中找到颜色和color完全相等的某个点，并返回该点的坐标；如果没有找到，则返回null。
* @param image 图片
* @param color 要寻找的颜色类似， 0xCDD7E9-0x101010,0xCDD7E9-0x101010
* @param threshold 找色时颜色相似度取值为 0.0 ~ 1.0
* @param x 区域的X起始坐标
* @param y 区域的Y起始坐标
* @param ex 终点X坐标
* @param ey 终点Y坐标
* @param limit 限制个数
* @param orz 方向，分别从1-8
* @return 多个Point 坐标点数组或者null

```javascript showLineNumbers
function main() {
    let req = startEnv();
    if (!req) {
        logd("申请权限失败");
        return;
    }
    let aimage = image.captureFullScreen();
    if (aimage != null) {
        let points = image.findColor(aimage, "0xCDD7E9-0x101010,0xCDD7E9-0x101010", 0.9, 0, 0, 0, 0, 10, 1);
        logd("points " + JSON.stringify(points));
        //这玩意是个数组
        if (points) {
            for (let i = 0; i < points.length; i++) {
                logd(JSON.stringify(points[i]), points[i].x, points[i].y)
                //点击坐标
                clickPoint(points[i].x, points[i].y)
            }
        }
        //图片要回收
        image.recycle(aimage)
    }

}

main();
```

### image.findColorJ 单点找色(JSON)

* 在图片中找到颜色和color完全相等的点，参数从JSON中获取如果没有找到，则返回null。
* @param image 图片
* @param jsonFileName 使用图色工具生成JSON文件,存储到res文件夹中,例如 a.json
* @return `{null|PointIndex[]}` 坐标点数组或者null

```javascript showLineNumbers
function main() {
    let req = startEnv();
    if (!req) {
        logd("申请权限失败");
        return;
    }
    let aimage = image.captureFullScreen();
    if (aimage != null) {
        let points = image.findColorJ(aimage, "金币.json");
        logd("points " + JSON.stringify(points));
        //这玩意是个数组
        if (points && points.length > 0) {
            for (let i = 0; i < points.length; i++) {
                logd(JSON.stringify(points[i]), points[i].x, points[i].y)
                //点击坐标
                clickPoint(points[i].x, points[i].y)
            }
        }
        //图片要回收
        image.recycle(aimage)
    }

}

main();
```

### image.findColorEx 自动截屏单点找色

* 在当前屏幕中找到颜色和color完全相等的点，并返回该点的坐标；如果没有找到，则返回null。
* @param color 要寻找的颜色
* @param threshold 找色时颜色相似度取值为 0.0 ~ 1.0
* @param x 区域的X起始坐标
* @param y 区域的Y起始坐标
* @param ex 终点X坐标
* @param ey 终点Y坐标
* @param limit 限制个数
* @param orz 方向，分别从1-8
* @return 多个Point 坐标点数组或者null

```javascript showLineNumbers
function main() {
    let req = startEnv();
    if (!req) {
        logd("申请权限失败");
        return;
    }
    let points = image.findColorEx("0xCDD7E9-0x101010,0xCDD7E9-0x101010", 0.9, 0, 0, 0, 0, 10, 1);
    logd("points " + JSON.stringify(points));
    //这玩意是个数组
    if (points && points.length > 0) {
        for (let i = 0; i < points.length; i++) {
            logd(JSON.stringify(points[i]), points[i].x, points[i].y)
            //点击坐标
            clickPoint(points[i].x, points[i].y)
        }
    }

}

main();
```

### image.findMultiColor 多点找色

* 多点找色，找到所有符合标准的点，类似于按键精灵的多点找色。
* @param image 要找色的图片
* @param firstColor 第一个点的颜色
* @param threshold 找色时颜色相似度取值为 0.0 ~ 1.0
* @param points 字符串类似这样 6|1|0x969696-0x000010,1|12|0x969696,-4|0|0x969696
* @param x 区域的X起始坐标
* @param y 区域的Y起始坐标
* @param ex 终点X坐标
* @param ey 终点Y坐标
* @param limit 限制个数
* @param orz 方向，分别从1-8
* @return 多个Point 坐标点数组或者null

```javascript showLineNumbers
function main() {
    let req = startEnv();
    if (!req) {
        logd("申请权限失败");
        return;
    }

    let aimage = image.captureFullScreen();
    if (aimage != null) {
        let points = image.findMultiColor(aimage, "0xDD7A5F-0x101010", "29|25|0xBB454B-0x101010,58|44|0xA6363A-0x101010", 0.9, 0, 0, 0, 0, 10, 1);
        logd("points " + JSON.stringify(points));
        //这玩意是个数组
        if (points && points.length > 0) {
            for (let i = 0; i < points.length; i++) {
                logd(points[i], points[i].x, points[i].y)
                //点击坐标
                clickPoint(points[i].x, points[i].y)
            }
        }
        //图片要回收
        image.recycle(aimage)
    }

}

main();
```



### image.findMultiColorJ 多点找色(JSON)

* 多点找色，找到所有符合标准的点，参数从JSON文件中读取，类似于按键精灵的多点找色
* 整张图片都找不到时返回null
* @param image1      要找色的图片
* @param jsonFileName 使用图色工具生成JSON文件,存储到res文件夹中,例如 a.json
* @return `{null|Point[]}` 坐标点数组或者null

```javascript showLineNumbers
function main() {
    let req = startEnv();
    if (!req) {
        logd("申请权限失败");
        return;
    }

    let aimage = image.captureFullScreen();
    if (aimage != null) {
        let points = image.findMultiColorJ(aimage, "金币.json");
        logd("points " + JSON.stringify(points));
        //这玩意是个数组
        if (points && points.length > 0) {
            for (let i = 0; i < points.length; i++) {
                logd(points[i], points[i].x, points[i].y)
                //点击坐标
                clickPoint(points[i].x, points[i].y)
            }
        }
        //图片要回收
        image.recycle(aimage)
    }

}

main();
```




### image.findMultiColorEx 自动截屏多点找色

* 多点找色，找到所有符合标准的点，类似于按键精灵的多点找色。
* @param firstColor 第一个点的颜色
* @param threshold 找色时颜色相似度取值为 0.0 ~ 1.0
* @param points 字符串类似这样 6|1|0x969696-0x000010,1|12|0x969696,-4|0|0x969696
* @param x 区域的X起始坐标
* @param y 区域的Y起始坐标
* @param ex 终点X坐标
* @param ey 终点Y坐标
* @param limit 限制个数
* @param orz 方向，分别从1-8
* @return 多个Point 坐标点数组或者null

```javascript showLineNumbers
function main() {
    let req = startEnv();
    if (!req) {
        logd("申请权限失败");
        return;
    }

    let points = image.findMultiColorEx("0xDD7A5F-0x101010", "29|25|0xBB454B-0x101010,58|44|0xA6363A-0x101010", 0.9, 0, 0, 0, 0, 10, 1);
    logd("points " + JSON.stringify(points));
    //这玩意是个数组
    if (points && points.length > 0) {
        for (let i = 0; i < points.length; i++) {
            logd(points[i], points[i].x, points[i].y)
            //点击坐标
            clickPoint(points[i].x, points[i].y)
        }
    }


}

main();
```

## 找非色

### image.findNotColor 找非色

* 在图片中找到颜色和color完全不相等的点，如果没有找到，则返回null。
* 适配EC 脱机版本3.10.0+
* @param image 图片
* @param color 要寻找的颜色类似， 0xCDD7E9-0x101010,0xCDD7E9-0x101010,EC 工具生成
* @param threshold 找色时颜色相似度取值为 0.0 ~ 1.0
* @param x 区域的X起始坐标
* @param y 区域的Y起始坐标
* @param ex 终点X坐标
* @param ey 终点Y坐标
* @param limit 限制个数
* @param orz 方向，分别从1-8
* @return 多个 PointIndex 坐标点数组或者null

```javascript showLineNumbers
function main() {
    let req = startEnv();
    if (!req) {
        logd("申请权限失败");
        return;
    }

    let aimage = image.captureFullScreen();
    if (aimage != null) {
        let points = image.findNotColor(aimage, "0xCDD7E9-0x101010,0xCDD7E9-0x101010", 0.9, 0, 0, 0, 0, 10, 1);
        logd("points " + JSON.stringify(points));
        //这玩意是个数组
        if (points) {
            for (let i = 0; i < points.length; i++) {
                logd(JSON.stringify(points[i]), points[i].x, points[i].y)
                //点击坐标
                clickPoint(points[i].x, points[i].y)
            }
        }
        //图片要回收
        image.recycle(aimage)
    }

}

main();
```

### image.findNotColorJ 找非色(JSON)

* 在图片中找到颜色和color完全不相等的点，如果没有找到，则返回null。
* @param image1 图片
* @param jsonFileName 使用图色工具生成JSON文件,存储到res文件夹中,例如 a.json
* @return `{null|PointIndex[]}` 多个 PointIndex 坐标点数组或者null

```javascript showLineNumbers
function main() {
    let req = startEnv();
    if (!req) {
        logd("申请权限失败");
        return;
    }

    let aimage = image.captureFullScreen();
    if (aimage != null) {
        let points = image.findNotColorJ(aimage, "a.json");
        logd("points " + JSON.stringify(points));
        //这玩意是个数组
        if (points) {
            for (let i = 0; i < points.length; i++) {
                logd(JSON.stringify(points[i]), points[i].x, points[i].y)
                //点击坐标
                clickPoint(points[i].x, points[i].y)
            }
        }
        //图片要回收
        image.recycle(aimage)
    }

}

main();
```

## 找图

### image.findImageByColor 透明找图

* 透明找图（这个函数不需要初始化Opencv）
* @param image 大图片
* @param template 小图片（模板）
* @param x 找图区域 x 起始坐标
* @param y 找图区域 y 起始坐标
* @param ex 终点X坐标
* @param ey 终点Y坐标
* @param threshold 图片相似度。取值范围为0~1的浮点数。默认值为0.9。
* @param limit 限制结果的数量，如果要找到1个，就填写1，如果是多个请填写多个
* @return 多个Point 坐标点数组或者null

```javascript showLineNumbers
function main() {
    //从工程目录下res文件夹下读取sms.png文件
    let sms = readResAutoImage("sms.png");
    //抓取屏幕
    let aimage = image.captureFullScreen();
    logd("aimage " + aimage);
    if (aimage != null) {
        //在图片中查找
        let points = image.findImageByColor(aimage, sms, 0, 0, 0, 0, 0.8, 5);
        logd("points " + JSON.stringify(points));
        //这玩意是个数组
        if (points && points.length > 0) {
            for (let i = 0; i < points.length; i++) {
                logd(points[i])
                let x = points[i].x
                let y = points[i].y
                //点击坐标
                clickPoint(x, y)
            }
        }
        //图片要回收
        image.recycle(aimage)
    }
    //图片要回收
    image.recycle(sms)
}

main();
```




### image.findImageByColorJ 透明找图(JSON)

* 通过颜色找图，支持透明图，这个不需要处理话opencv
* 整张图片都找不到时返回null
* @param image1     大图片
* @param jsonFileName  使用图色工具生成JSON文件,存储到res文件夹中,例如 a.json, 小图路径请到json文件配置
* @return `{null|Point[]}` 坐标点数组或者null

```javascript showLineNumbers
function main() {
    //抓取屏幕
    let aimage = image.captureFullScreen();
    if (aimage != null) {
        //在图片中查找
        let points = image.findImageByColorJ(aimage, "a.json");
        logd("points " + JSON.stringify(points));
        //这玩意是个数组
        if (points && points.length > 0) {
            for (let i = 0; i < points.length; i++) {
                logd(points[i])
                let x = points[i].x
                let y = points[i].y
                //点击坐标
                clickPoint(x, y)
            }
        }
        image.recycle(aimage)
    }
}

main();
```


### image.findImageByColorEx 透明找图扩展

* 通过颜色找图，支持透明图，这个不需要处理话opencv
* 整张图片都找不到时返回null
* @param image1 大图片
* @param template 小图片（模板）
* @param x 找图区域 x 起始坐标
* @param y 找图区域 y 起始坐标
* @param ex 终点X坐标
* @param ey 终点Y坐标
* @param limit 限制结果的数量，如果要找到1个，就填写1，如果是多个请填写多个
* @param extra 扩展函数，map结构例如
*

```{"firstColorOffset":"#101010","firstColorThreshold":1.0,"otherColorOffset":"#101010","otherColorThreshold":0.9,"cmpColorSucThreshold":1.0}```

* firstColorOffset: 第一个匹配到的颜色偏色,例如 #101010
* firstColorThreshold: 第一个匹配到的颜色偏色系数，例如 0.9
* otherColorOffset: 剩下需要找的颜色 偏色,例如 #101010
* otherColorThreshold: 剩下需要找的颜色 偏色系数，例如 0.9
* cmpColorSucThreshold: 成功匹配多少个颜色系数 就认为是成功的，例如 0.9 = 90%个点
* startX: 第一个点从哪里开始找的X坐标
* startY: 第一个点从哪里开始找的Y坐标
* @return 多个Point 坐标点数组或者null

```javascript showLineNumbers
function main() {

    let d = startEnv();
    logd("启动服务--{}", d)
    let smallTmplate = readResAutoImage("tmp4.png");

    for (let i = 0; i < 100; i++) {
        sleep(1000)
        let img = image.captureFullScreen();
        logd("img = {}", img)
        if (img == null) {
            continue
        }
        console.time(1)
        let extra = {
            "firstColorOffset": "#202020",
            "otherColorOffset": "#000000",
            "cmpColorSucThreshold": 1,
            "firstColorThreshold": "1",
            "otherColorThreshold": "1",
            "startX": 0,
            "startY": 0
        }
        let points = image.findImageByColorEx(img, smallTmplate, 0, 0, 0, 0, 100, extra);
        logd("time-{}", console.timeEnd(1))
        //这玩意是个数组
        if (points) {
            logd("points " + JSON.stringify(points));
        }

        image.recycle(img)

    }

    image.recycle(smallTmplate)
}
main()
```


### image.findImageByColorExJ 透明找图扩展(JSON)
* 通过颜色找图，支持透明图，这个不需要处理话opencv
* 整张图片都找不到时返回null
* @param image1     大图片
* @param jsonFileName  使用图色工具生成JSON文件,存储到res文件夹中,例如 a.json, 小图路径请到json文件配置
* @return `{null|Point[]}` 坐标点数组或者null

```javascript showLineNumbers
function main() {
    //抓取屏幕
    let aimage = image.captureFullScreen();
    logd("aimage " + aimage);
    if (aimage != null) {
        //在图片中查找
        let points = image.findImageByColorExJ(aimage, "a.json");
        logd("points " + JSON.stringify(points));
        //这玩意是个数组
        if (points && points.length > 0) {
            for (let i = 0; i < points.length; i++) {
                logd(points[i])
                let x = points[i].x
                let y = points[i].y
                //点击坐标
                clickPoint(x, y)
            }
        }
        image.recycle(aimage)
    }
}

main();
```


### image.findImage OpenCv找图

* 找图。在大图片image中查找小图片template的位置（模块匹配），找到时返回位置坐标区域(Rect)，找不到时返回null。
* EC 脱机 4.5.0+
* @param image1 大图片
* @param template 小图片（模板）
* @param x 找图区域 x 起始坐标
* @param y 找图区域 y 起始坐标
* @param ex 终点X坐标
* @param ey 终点Y坐标
* @param weakThreshold 图片相似度。取值范围为0~1的浮点数。默认值为0.9。
* @param threshold 图片相似度。取值范围为0~1的浮点数。默认值为0.9。
* @param limit 限制结果的数量，如果要找到1个，就填写1，如果是多个请填写多个
* @param method 0: TM_SQDIFF平方差匹配法,1: TM_SQDIFF_NORMED归一化平方差匹配方法,2: TM_CCORR相关匹配法,3:
  TM_CCORR_NORMED归一化相关匹配法,4: TM_CCOEFF系数匹配法,5: TM_CCOEFF_NORMED归一化系数匹配法
* @return `Rect` 区域坐标对象数组或者null



```javascript showLineNumbers
function main() {
    let req = startEnv();
    if (!req) {
        logd("申请权限失败");
        return;
    }
    //从工程目录下res文件夹下读取sms.png文件
    let sms = readResAutoImage("sms.png");
    //抓取屏幕
    let aimage = image.captureFullScreen();
    logd("aimage " + aimage);
    if (aimage != null) {
        //在图片中查找
        let points = image.findImage(aimage, sms, 0, 0, 0, 0, 0.7, 0.9, 1, 5);
        logd("points " + JSON.stringify(points));
        //这玩意是个数组
        if (points && points.length > 0) {
            for (let i = 0; i < points.length; i++) {
                logd(points[i])
                let x = parseInt((points[i].left + points[i].right) / 2)
                let y = parseInt((points[i].top + points[i].bottom) / 2)
                //点击坐标
                clickPoint(x, y)
            }
        }
        //图片要回收
        image.recycle(aimage)
    }
    //图片要回收
    image.recycle(sms)
}

main();
```





### image.findImageJ 找图(JSON)

* 找图。在大图片image中查找小图片template的位置（模块匹配），找到时返回位置坐标区域(Rect)，找不到时返回null。
* @param image1     大图片
* @param jsonFileName 使用图色工具生成JSON文件,存储到res文件夹中,例如 a.json, 小图路径请到json文件配置
* @return `{null|Rect[]}` 区域坐标对象数组或者null

```javascript showLineNumbers
function main() {
    let req = startEnv();
    if (!req) {
        logd("申请权限失败");
        return;
    }
    //抓取屏幕
    let aimage = image.captureFullScreen();
    logd("aimage " + aimage);
    if (aimage != null) {
        //在图片中查找
        let points = image.findImageJ(aimage, "a.json");
        logd("points " + JSON.stringify(points));
        //这玩意是个数组
        if (points && points.length > 0) {
            for (let i = 0; i < points.length; i++) {
                logd(points[i])
                logd("相似度: " + points[i]['similarity'])
                let x = parseInt((points[i].left + points[i].right) / 2)
                let y = parseInt((points[i].top + points[i].bottom) / 2)
                //点击坐标
                clickPoint(x, y)
            }
        }
        //图片要回收
        image.recycle(aimage)
    }
}

main();
```



### image.findImageEx OpenCv自动截屏找图

* 找图。在当前屏幕中查找小图片template的位置（模块匹配），找到时返回位置坐标区域(Rect)，找不到时返回null。
* EC 脱机 4.5.0+
* @param template 小图片（模板）
* @param x 找图区域 x 起始坐标
* @param y 找图区域 y 起始坐标
* @param ex 终点X坐标
* @param ey 终点Y坐标
* @param weakThreshold 图片相似度。取值范围为0~1的浮点数。默认值为0.9。
* @param threshold 图片相似度。取值范围为0~1的浮点数。默认值为0.9。
* @param limit 限制结果的数量，如果要找到1个，就填写1，如果是多个请填写多个
* @param method 0: TM_SQDIFF平方差匹配法,1: TM_SQDIFF_NORMED归一化平方差匹配方法,2: TM_CCORR相关匹配法,3:
  TM_CCORR_NORMED归一化相关匹配法,4: TM_CCOEFF系数匹配法,5: TM_CCOEFF_NORMED归一化系数匹配法
* @return `Rect` 区域坐标对象数组或者null

```javascript showLineNumbers
function main() {
    let req = startEnv();
    if (!req) {
        logd("申请权限失败");
        return;
    }
    //从工程目录下res文件夹下读取sms.png文件
    let sms = readResAutoImage("sms.png");
    //在当前屏幕中查找，并且限制只查找一个
    let points = image.findImageEx(sms, 0, 0, 0, 0, 0.7, 0.9, 1, 5);
    logd("points " + JSON.stringify(points));
    //这玩意是个数组
    if (points && points.length > 0) {
        for (let i = 0; i < points.length; i++) {
            logd(points[i])
            let x = parseInt((points[i].left + points[i].right) / 2)
            let y = parseInt((points[i].top + points[i].bottom) / 2)
            //点击坐标
            clickPoint(x, y)
        }
    }
    //图片要回收
    image.recycle(sms)
}

main();
```

### image.matchTemplate OpenCV图片模板匹配

* OpenCV模板匹配封装
* EC 脱机 4.5.0+
* @param image1 大图片
* @param template 小图片（模板）
* @param weakThreshold 图片相似度。取值范围为0~1的浮点数。默认值为0.9。
* @param threshold 图片相似度。取值范围为0~1的浮点数。默认值为0.9。
* @param rect 找图区域。参见findColor函数关于 rect 的说明
* @param maxLevel 默认为-1，一般而言不必修改此参数。不加此参数时该参数会根据图片大小自动调整。找图算法是采用图像金字塔进行的,
  level参数表示金字塔的层次,
*                      level越大可能带来越高的找图效率，但也可能造成找图失败（图片因过度缩小而无法分辨）或返回错误位置。因此，除非您清楚该参数的意义并需要进行性能调优，否则不需要用到该参数。
* @param limit 限制结果的数量，如果要找到1个，就填写1，如果是多个请填写多个
* @param method 0: TM_SQDIFF平方差匹配法,1: TM_SQDIFF_NORMED归一化平方差匹配方法,2: TM_CCORR相关匹配法,3:
  TM_CCORR_NORMED归一化相关匹配法,4: TM_CCOEFF系数匹配法,5: TM_CCOEFF_NORMED归一化系数匹配法
* @return `Match集合` 匹配到的集合

```javascript showLineNumbers
function main() {
    let req = startEnv();
    if (!req) {
        logd("申请权限失败");
        return;
    }
    let aimage = image.captureFullScreen();
    if (aimage != null) {
        let temp = readResAutoImage("tmp.png");
        let rectp = new Rect();
        rectp.left = 0;
        rectp.top = 0;
        rectp.right = 0
        rectp.bottom = 0
        let matchs = image.matchTemplate(aimage, temp, 0.7, 0.9, rectp, -1, 10, 5);
        //这玩意是个数组
        logd(JSON.stringify(matchs));
        //这玩意是个数组
        if (matchs) {
            for (let i = 0; i < matchs.length; i++) {
                logd(JSON.stringify(matchs[i].point));
            }
        }
        //图片要回收
        image.recycle(aimage)
        //图片要回收
        image.recycle(temp)
    }
}

main();
```




### image.matchTemplateJ 图片模板匹配(JSON)

* OpenCV模板匹配封装
* @param image1         大图片
* @param jsonFileName  使用图色工具生成JSON文件,存储到res文件夹中,例如 a.json, 小图路径请到json文件配置
* @return `{null|Match[]}` 匹配到的集合

```javascript showLineNumbers
function main() {
    let aimage = image.captureFullScreen();
    if (aimage != null) {
        let matchs = image.matchTemplateJ(aimage, "a.json");
        //这玩意是个数组
        logd(JSON.stringify(matchs));
        //这玩意是个数组
        if (matchs && matchs.length > 0) {
            for (let i = 0; i < matchs.length; i++) {
                logd(JSON.stringify(matchs[i].point));
                clickPoint(matchs[i].point.x, matchs[i].point.y)
            }
        }
        //图片要回收
        image.recycle(aimage)
    }
}

main();
```



### image.matchTemplateEx OpenCV图片模板匹配

* OpenCV 模板匹配封装，在当前屏幕截图中进行匹配
* EC 脱机 4.5.0+
* @param template 小图片（模板）
* @param weakThreshold 图片相似度。取值范围为0~1的浮点数。默认值为0.9。
* @param threshold 图片相似度。取值范围为0~1的浮点数。默认值为0.9。
* @param rect 找图区域。参见findColor函数关于 rect 的说明
* @param maxLevel 默认为-1，一般而言不必修改此参数。不加此参数时该参数会根据图片大小自动调整。找图算法是采用图像金字塔进行的,
  level参数表示金字塔的层次,
*                      level越大可能带来越高的找图效率，但也可能造成找图失败（图片因过度缩小而无法分辨）或返回错误位置。因此，除非您清楚该参数的意义并需要进行性能调优，否则不需要用到该参数。
* @param limit 限制结果的数量，如果要找到1个，就填写1，如果是多个请填写多个
* @param method 0: TM_SQDIFF平方差匹配法,1: TM_SQDIFF_NORMED归一化平方差匹配方法,2: TM_CCORR相关匹配法,3:
  TM_CCORR_NORMED归一化相关匹配法,4: TM_CCOEFF系数匹配法,5: TM_CCOEFF_NORMED归一化系数匹配法
* @return `Match集合` 匹配到的集合

```javascript showLineNumbers
function main() {
    let req = startEnv();
    if (!req) {
        logd("申请权限失败");
        return;
    }
    let temp = readResAutoImage("tmp.png");
    let rectp = new Rect();
    rectp.left = 0;
    rectp.top = 0;
    rectp.right = 0;
    rectp.bottom = 0;
    let matchs = image.matchTemplateEx(temp, 0.7, 0.9, rectp, -1, 1, 5);
    logd(JSON.stringify(matchs));
    //这玩意是个数组
    if (matchs) {
        for (let i = 0; i < matchs.length; i++) {
            logd(JSON.stringify(matchs[i].point));
        }
    }
    //图片要回收
    image.recycle(aimage)
    //图片要回收
    image.recycle(temp)
}

main();
```

## 灰度
### image.gray 灰度Image

* 灰度图像，使用了opencv函数实现
* EC 脱机 5.11.0+
* @param img AutoImage图片对象
* @return `{null|AutoImage}`

```javascript showLineNumbers
function main() {
    let req = startEnv();
    if (!req) {
        logd("申请权限失败");
        return;
    }
    for (let i = 0; i < 1; i++) {
        sleep(1000);
        let s = new Date().getTime();
        let d = image.captureFullScreenEx();
        if (d) {
            let p = file.getSandBoxFilePath("test1.png")
            let saved = image.saveTo(d, p);
            let s = new Date().getTime();
            let bd = image.gray(d);
            logd("time " + (new Date().getTime() - s))
            logd(bd.uuid);
            if (bd) {
                let p2 = file.getSandBoxFilePath("test2.png")
                let saved = image.saveTo(bd, p2);
                logd("saved " + saved)
                exit()
            }
            //图片要回收
            image.recycle(d)
        }
    }

}

main();
```

## 二值化

### image.binaryzation 二值化Image

* 对AutoImage图片进行二值化
* @param img AutoImage图片对象
* @param threshold 二值化系数，0 ~ 255
* @return AutoImage 对象或者null

```javascript showLineNumbers
function main() {
    let req = startEnv();
    if (!req) {
        logd("申请权限失败");
        return;
    }
    for (let i = 0; i < 1000; i++) {
        sleep(1000);
        let s = new Date().getTime();
        let d = image.captureFullScreen();
        if (d) {
            let s = new Date().getTime();
            let bd = image.binaryzation(d, 200);
            logd("time " + (new Date().getTime() - s))
            logd(bd.uuid);
            //图片要回收
            image.recycle(d)
        }
    }

}

main();
```

### image.binaryzationEx 二值化Image

* 自适应二值化，使用了opencv的adaptiveThreshold函数实现
* EC 脱机 4.5.0+
* @param img AutoImage图片对象
* @param map MAP 参数
    * diameter : 去噪直径 参考opencv的bilateralFilter函数
    * adaptiveMethod：自适应二值化方式分别是0和1 ，ADAPTIVE_THRESH_MEAN_C=0，ADAPTIVE_THRESH_GAUSSIAN_C = 1
    * blockSize：计算单位是像素的邻域块，邻域块取多大，就由这个值作决定，3，5，7这样的奇数
    * c: 偏移值调整量，
    * ```{"diameter":0,"adaptiveMethod":1,"c":0,"blockSize":5}```
* @return `{null|AutoImage}`

```javascript showLineNumbers
function main() {
    let req = startEnv();
    if (!req) {
        logd("申请权限失败");
        return;
    }
    for (let i = 0; i < 1; i++) {
        sleep(1000);
        let s = new Date().getTime();
        let d = image.captureFullScreenEx();
        if (d) {
            let p = file.getSandBoxFilePath("test1.png")
            let saved = image.saveTo(d, p);
            let s = new Date().getTime();
            let bd = image.binaryzationEx(d, {
                "diameter": 0,
                "adaptiveMethod": 1,
                "c": 10, "blockSize": 7
            });
            logd("time " + (new Date().getTime() - s))
            logd(bd.uuid);
            if (bd) {
                let p2 = file.getSandBoxFilePath("test2.png")
                let saved = image.saveTo(bd, p2);
                logd("saved " + saved)
                exit()
            }
            //图片要回收
            image.recycle(d)
        }
    }

}

main();
```

## 其他

### image.rotateImage 旋转图像

* 旋转图片
* 支持EC 脱机版 1.6.0+
* @param img 图片对象
* @param degree 度数，0代表home键在下竖屏模式，-90代表逆时针旋转90度，home键在右，90度代表顺时针旋转90度，home键在左
* @return `{null|AutoImage}`

```javascript showLineNumbers
function main() {
    let img = image.captureFullScreen()
    logd(" img width " + image.getWidth(img))
    let img2 = image.rotateImage(img, -90);
    image.recycle(img)
    logd(" img2 width " + image.getWidth(img2))
    image.recycle(img2)
}

main();
```

### image.readImage 读取文件为Image

* 读取在路径path的图片文件并返回一个 ```{@link AutoImage}``` 对象。如果文件不存在或者文件无法解码则返回null。
* @param path 图片路径
* @return AutoImage 对象或者null

```javascript showLineNumbers
function main() {
    let path = file.getSandBoxFilePath("a.png")
    let autoimg = image.readImage(path);
    //图片要回收
    image.recycle(autoimg)
}

main();
```

### image.argb 颜色转16进制字符串

* 将整型的颜色值转成16进制RGB字符串
* @param color 整型值
* @return `{string}` 颜色字符串

```javascript showLineNumbers
function main() {
    let req = startEnv();
    if (!req) {
        logd("申请权限失败");
        return;
    }
    let aimage = image.captureFullScreen();
    if (aimage != null) {
        let points3 = "765|22|0x1296DB";
        logd("==" + image.argb(image.pixel(aimage, 765, 22)));
        let points = image.cmpColor(aimage, points3, 0.5, 0, 0, 0, 0);
        logd("points " + points);
        //图片要回收
        image.recycle(aimage)
    }
}

main();
```

## 图片转换

### image.saveTo 保存到文件

* 保存到文件中
* @param img 图片对象
* @param path 路径
* @return bool true代表成功，false 代表失败

```javascript showLineNumbers
function main() {
    let req = startEnv();
    if (!req) {
        logd("申请权限失败");
        return;
    }

    let imageX = image.captureFullScreen();
    let path = file.getSandBoxFilePath("a.png")
    let r = image.saveTo(imageX, path);
    logd("result " + r);
    //图片要回收
    image.recycle(imageX)
}

main();
```


### image.base64ToImage base64转Image

* 将base64的数据转换为AutoImage
* @param base64data
* @returns `{AutoImage|null}`

```javascript showLineNumbers
function main() {
  let data = "iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAATFJREFUKFOVUrFKA1EQnAn5CMFGW8HKykYMqI0I7z3RKlrYCkGLYKMo2sVK8wEWdkJu76Wz8sRK8A8k2PkXL2s23B0ELHSrhd2Z2RmW+GfR9p1zKyTPRGS/wnvv9wCcAlgVkeme1bTx3r8AWFfVVp7nhXNugeQXyZ6qLonIzgygVLkieWlsRjABv05ICiMiuQjg0Ga1VKlkZzxZX50RQtgAsK2qJ78BngFsATgSkYeSpAPgDsCuiGS1gnOuTfIWwLENStOmVjQaje5gMPioTVsTQvhMKbVjjO/VsoVA0vz08zw3pTolBbDcbDZHKaVNVY0kH1X1oAxBSXayLOvXsYpIy3vfBdBLKc0Ph8PvEMKNqp5XoNp0ecI9gLnxeLwWY3yrcnfOXZO8MC9GOhPrX77kB5AYkg38B4vzAAAAAElFTkSuQmCC"
  let img = image.base64ToImage(data)
  logd("img "+img+"  "+image.getHeight(img))
  let p = file.getSandBoxFilePath("test1.png")
  let saved = image.saveTo(img, p);
  logd("saved "+saved)
  image.recycle(img)
}

main();
```


### image.toBase64Format Image转base64 

* 转成base64的字符串, jpg格式较小，可以减少内存
* @param img 图片对象
* @param format 格式 jpg或者 png
* @param q 质量 1-100，质量越大 越清晰,png格式无效
* @return 字符串

```javascript showLineNumbers
function main() {
    let req = startEnv();
    if (!req) {
        logd("申请权限失败");
        return;
    }
    let imageX = image.captureFullScreen();
    let r = image.toBase64Format(imageX, "jpg", 50);
    logd("result " + r);
    //图片要回收
    image.recycle(imageX)
}

main();
```

### image.clip 剪切图片

* 剪切图片
* @param img 图片对象
* @param x x起始坐标
* @param y y起始坐标
* @param ex 终点X坐标
* @param ey 终点Y坐标
* @return AutoImage 对象或者null

```javascript showLineNumbers
function main() {
    let req = startEnv();
    if (!req) {
        logd("申请权限失败");
        return;
    }

    let imageX = image.captureFullScreen();
    let r = image.clip(imageX, 100, 100, 300, 400);
    logd("result " + r);
    //图片要回收
    image.recycle(imageX)
    image.recycle(r)
}

main();
```

### image.pixel 图片某点颜色值

* 取得图片的某个点的颜色值
* @param img 图片对象
* @param x x坐标点
* @param y y坐标点
* @return int 颜色值

```javascript showLineNumbers
function main() {
    let req = startEnv();
    if (!req) {
        logd("申请权限失败");
        return;
    }
    let imageX = image.captureFullScreen();
    let r = image.pixel(imageX, 100, 100);
    logd("result " + r);
    //图片要回收
    image.recycle(imageX)
}

main();
```

### image.isRecycled 图片回收判断

* 是否被回收了
* @param img 图片对象
* @return bool true代表已经被回收了

```javascript showLineNumbers
function main() {
    let imageX = image.captureFullScreen();
    let r = image.isRecycled(imageX);
    logd("result " + r);
    //图片要回收
    image.recycle(imageX)
}

main();
```

### image.recycle 回收图片

* 回收图片
* @param img 图片对象

```javascript showLineNumbers
function main() {
    let imageX = image.captureFullScreen();
    //图片要回收
    image.recycle(imageX)
}

main();
```

### image.recycleAllImage 回收所有图像

* 回收所有图像
* 适配EC 脱机 4.8.0+
* @return `bool` true代表成功

```javascript showLineNumbers
function main() {
    let imageX = image.captureFullScreen();
    image.recycleAllImage()
}

main();
```

### image.autoImageToUIImage 转换为UIImage

* 转换为UIImage
* 适配EC 4.2.0+
* @param img AutoImage
* @return swift中的UIImage对象或者null

```javascript showLineNumbers
function main() {
    logd("isServiceOk " + isServiceOk());
    startEnv()
    logd("isServiceOk " + isServiceOk());
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

### image.uiimageToAutoImage UIImage转换为AutoImage

* UIImage转换为AutoImage
* 适配EC 4.2.0+
* @param uiimage swift中的 UIImage 对象
* @return null或者AutoImage对象

```javascript showLineNumbers
function main() {
    logd("isServiceOk " + isServiceOk());
    startEnv()
    logd("isServiceOk " + isServiceOk());
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

### image.imageToMatFormat (UIImage的 AutoImage 转 Mat AutoImage)

* 转换Mat存储格式
* 适合EC iOS 4.6.0+
* @param img `{AutoImage}` 图片对象
* @return `MAT存储格式的AutoImage` 对象或者null

```javascript showLineNumbers
function main() {
    let req = startEnv();
    if (!req) {
        return;
    }
    image.useOpencvMat(0)
    for (let i = 0; i < 100; i++) {
        let d = image.captureFullScreen();
        logd(d)
        sleep(1000);
        if (d) {
            let ds = image.imageToMatFormat(d);
            logd(ds)
            image.recyle(d);
        }
    }
}

main();
```

### image.matToImageFormat (Mat AutoImage  转 UIImage AutoImage)

* 转换普通image存储格式
* 适合EC iOS 4.6.0+
* @param img `{AutoImage}` 图片对象
* @return ` 普通存储格式的AutoImage `对象或者null

```javascript showLineNumbers
function main() {
    let req = startEnv();
    if (!req) {
        return;
    }
    image.useOpencvMat(1)
    for (let i = 0; i < 100; i++) {
        let d = image.captureFullScreen();
        logd(d)
        sleep(1000);
        if (d) {
            let ds = image.matToImageFormat(d);
            logd(ds)
            image.recyle(d);
        }
    }
}

main();
```


