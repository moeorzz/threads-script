---
title: 图色函数
description: EasyClick 自动化脚本 iOS免越狱 图色函数 资源下载
keywords:
  - EasyClick 自动化脚本 iOS免越狱 图色函数 资源下载
  - image
  - param
  - useOpencvMat
  - setInitParam
  - mat
  - EC
  - iOS
  - return
  - startPreCapScreen
  - startScreenStream
  - EasyClick
  - 手机自动化
  - 自动化测试
  - 脚本开发
  - 安卓自动化
  - iOS自动化
  - 鸿蒙Next
---

## 说明

## 设置

### image.useOpencvMat 初始化参数

* 切换图片存储模式为opencv的mat格式
* 适合EC iOS 7.11.0+
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

### image.setInitParam 初始化参数

* 设置图色模块初始化参数,设置找图超时时间
* @param params 超时时间，单位是毫秒

```javascript showLineNumbers
function main() {
  //action_timeout 找图找色动作的最大时间，超时后会自动返回避免阻塞
  image.setInitParam({"action_timeout": 1000});
  image.setInitParam(
    {
      "action_timeout": 1000,
      "auto_click_request_dialog": false
    }
  );
}

main();
```

### image.setFindColorImageMode 设置找色的算法模式

* 设置找色找图的算法模式
* 适合EC iOS 6.11.0+
* @param type 1 代表老的查找算法，2代表新的查找算法
* @return boolean

```javascript showLineNumbers
function main() {

  image.setFindColorImageMode(1);

}

main();
```

## 流式截图

### image.startPreCapScreen 预截图的函数

* 预截图的函数，后台会开启线程循环截图
* 可以提高截图效率
* 适合EC iOS USB版本 6.18.0+
* 这个配合蓝牙BLE时间，可以实现不安装代理IPA实现自动化操作，types设置为10
* @param types:
* 10 代表PNG格式，没有任何压缩，不开自动化也能截图
* 1 代表截图 jpg格式的方式1
* 2 代表截图 jpg格式方式2
* 3 代表png格式，png不支持质量参数 ，根据自己机器情况调用
* @param quality: 图片质量，type=1的时候，支持 1， 50， 100，三种不同的质量标准
* 当type =2 的时候，支持1-100图片质量
* @param delay 循环预先截图的间隔时间，单位是毫秒
* @return boolean true代表成功 false代表失败

```javascript showLineNumbers
function main() {
  logd("isServiceOk " + isServiceOk());
  startEnv()
  logd("isServiceOk " + isServiceOk());

  let start = image.startPreCapScreen("1", 50, 20);
  logd("startPreCapScreen {}", start)
  for (let i = 0; i < 10; i++) {
    sleep(1000);
    console.time("1")
    let img = image.captureScreenStream()
    logd("img {} time: {}", img, console.timeEnd("1"))
    if (img) {
      image.saveTo(img, "a.png");
    }
    image.recycle(img)
  }
  image.stopScreenStream()

}

main();
```

### image.startScreenStream 开启流式截图

* 初始化一个图像流的截屏模式，这个速度比其他的方式要快
* @return 布尔型 true 代表成功 false代表失败

```javascript showLineNumbers
function main() {
  logd("isServiceOk " + isServiceOk());
  startEnv()
  logd("isServiceOk " + isServiceOk());

  let cap = image.startScreenStream()
  logd("截图: " + cap)

}

main();
```

### image.stopScreenStream 停止流式截图

* 停止图像流
* @return 布尔型 true 代表成功 false代表失败

```javascript showLineNumbers
function main() {
  logd("isServiceOk " + isServiceOk());
  startEnv()
  logd("isServiceOk " + isServiceOk());

  let cap = image.stopScreenStream()
  logd("截图: " + cap)

}

main();
```

### image.isScreenStreamOk 流式截图是否正常

* 流式截图是否正常
* @return 布尔型 true 代表成功 false代表失败

```javascript showLineNumbers
function testScreen() {
  let start = image.startScreenStream();
  logd("start {}", start)
  setAgentSetting({"screenStreamQuality": 100})

  thread.execAsync(function () {
    while (true) {
      sleep(2000)
      // 服务不在的情况下
      let serviceOk = isServiceOk();
      if (!serviceOk) {
        serviceOk = startEnv();
      }
      if (!serviceOk) {
        // 适当加上重置USB链接
        resetUsbConn();
        continue
      }
      if (image.isScreenStreamOk()) {
        continue
      }
      // 判断截屏是否成
      logd("重启流式截图状态")

      let start = image.startScreenStream()
      logd("startScreenStream :{}", start)
    }
  })


  while (true) {
    sleep(1000);
    console.time("1")
    let img = image.captureScreenStream()
    logd("img {} time: {}", img, console.timeEnd("1"))
    if (img) {
      image.saveTo(img, "a.png");
    }
    image.recycle(img)
  }

}


function main() {
  logd("isServiceOk " + isServiceOk());
  startEnv()
  // 带守护的 流式截图，可以设置投屏质量 
  testScreen()

}

main();
```

### image.captureScreenStream 图像流

* 从图像流中获取一张图片
* @return AutoImage对象或者null

```javascript showLineNumbers
function main() {
  logd("isServiceOk " + isServiceOk());
  startEnv()
  logd("isServiceOk " + isServiceOk());
  for (let i = 0; i < 10; i++) {
    let cap = image.captureScreenStream()
    logd("截图数据: " + cap)
    sleep(1000)
    //图片要回收
    image.recycle(cap)
  }
}

main();
```

## 普通截图 jpg

### image.captureFullScreenEx 截取全屏Image对象

* 抓取全屏，格式是JPG
* 适配EC iOS 3.1.0+
* @param ext 扩展参数，可以调整截图的方式和质量，可以分别是
* type: 1 代表截图 jpg格式的方式1 2 代表截图 jpg格式方式2 3代表png格式，png不支持质量参数 ，根据自己机器情况调用
* quality: 图片质量，type=1的时候，支持 1， 50， 100，三种不同的质量标准
* 当type =2 的时候，支持1-100图片质量
* @return AutoImage对象或者null

```javascript showLineNumbers
function main() {
  logd("isServiceOk " + isServiceOk());
  startEnv()
  logd("isServiceOk " + isServiceOk());
  for (let i = 0; i < 10; i++) {
    console.time(1)
    let cap = image.captureFullScreenEx({"type": "1", "quality": 50})
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

## 普通截图 png

### image.captureFullScreenPng 截取全屏Image对象

* 截取当前屏幕并返回一个Image对象，这个格式是PNG。
* @return AutoImage对象或者null

```javascript showLineNumbers
function main() {
  logd("isServiceOk " + isServiceOk());
  startEnv()
  logd("isServiceOk " + isServiceOk());
  for (let i = 0; i < 10; i++) {
    let cap = image.captureFullScreenPng()
    logd("截图数据: " + cap)
    sleep(1000)
    //图片要回收
    image.recycle(cap)
  }
}

main();
```


### image.resetCaptureScreenNoAutoEnv 重置无权限截图环境

* 重置无权限截图的环境
* 因为在iOS17+系统需要提前启动隧道，就需要调用这个函数
* 这个会关闭之前的通信隧道，开启新的，对于低于17版本的，该函数无效，调用也不报错
* 适配EC iOS USB版本 9.21.0+
* @returns `{boolean}` true 代表成功 false代表失败

```javascript showLineNumbers
// 参考 image.captureFullScreenNoAuto 例子
```

### image.captureFullScreenNoAuto 无需自动化截图

* 无需自动化截图
* 这个稍微慢点，如果需要速度快，请看[startPreCapScreen]函数
* 这个配合蓝牙BLE事件模块，可以实现不安装代理IPA即可完成自动化操作
* 适配EC iOS USB版本 6.25.0+
* @return AutoImage对象或者null

```javascript showLineNumbers
let tocr = null;

function ocrimage(img) {
    if (tocr == null) {
        let paddleOcrOn = {
            "type": "paddleOcrNcnnV5",
            "numThread": 1,
            "single": 0,
            "matMode": 1
        }
        // 先进行释放 防止之前未释放的资源占用
        ocr.releaseAll()
        tocr = ocr.newOcr()
        let inited = tocr.initOcr(paddleOcrOn)
        logd("初始化结果 -" + inited);
        if (!inited) {
            loge("error : " + tocr.getErrorMsg());
            return;
        }
    }
    let result = tocr.ocrImage(img, 30 * 1000, {"padding": 32, "numThread": 1});
    logd("ocr result: " + JSON.stringify(result))

}


function testCap() {
    image.useOpencvMat(1)
    let tt = 0;
    let timex = 0;
    logd("start resetCaptureScreenNoAutoEnv")
    image.resetCaptureScreenNoAutoEnv();
    logd("end resetCaptureScreenNoAutoEnv")
    while (!isScriptExit()) {
        let sp = utils.getRangeInt(200, 500)
        timex = timex + sp
        sleep(sp)
        tt++;
        logd("call captureFullScreenNoAuto " )
        console.time(1)
        let img = image.captureFullScreenNoAuto();
        logd("img {}", img +"  耗时: "+console.timeEnd(1))
        if (img != null) {
            let cl2 = image.clip(img, 10, 10, 600, 600)
            logd("cl2  " + cl2)
            ocrimage(cl2)
            logd("截图成功，次数: " + tt + "  运行总时间 ：" + timex + " ms")
            image.recycle(cl2)
            image.recycle(img)
        } else {
            logd("截图失败，成功总次数: " + tt + "  运行总时间 ：" + timex + " ms")
            logd("调用resetCaptureScreenNoAutoEnv 并等待恢复")
            // 等待恢复
            image.resetCaptureScreenNoAutoEnv();
            sleep(10000)
        }
    }

}

testCap();
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
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
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
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
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

  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
  let points3 = "205|1130|0xff944b-0x101010,211|1158|0xff8e42,191|1175|0xfcfbf7";
  let points = image.cmpColorEx(points3, 0.9, 0, 0, 0, 0);
  logd("points " + points);

}

main();
```

### image.cmpMultiColor 多组比色

* 多点或者多点数组比色，找到所有符合标准的点，依次查找，如果找到就返回当前points的索引值，如果返回-1，说明都没有找到
* @param image1 图片
* @param points 数组类似这样 ["6|1|0x969696-0x000010,1|12|0x969696,-4|0|0x969696","6|1|0x969696"]
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
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
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
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
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
* @param points 数组类似这样 ["6|1|0x969696-0x000010,1|12|0x969696,-4|0|0x969696","6|1|0x969696"]
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
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
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
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
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
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
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
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
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

### image.findColorExJ 自动截屏单点找色(JSON)

* 当前屏幕中找到颜色和color完全相等的点，参数从JSON中获取如果没有找到，则返回null。
* @param jsonFileName res文件中取色工具生成的JSON文件，
* @return 多个Point 坐标点数组或者null

```javascript showLineNumbers
function main() {
  let req = startEnv();
  if (!req) {
    logd("申请权限失败");
    return;
  }
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
  let points = image.findColorExJ("金币.json");
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
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
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
* @param image1 要找色的图片
* @param jsonFileName 使用图色工具生成JSON文件,存储到res文件夹中,例如 a.json
* @return `{null|Point[]}` 坐标点数组或者null

```javascript showLineNumbers
function main() {
  let req = startEnv();
  if (!req) {
    logd("申请权限失败");
    return;
  }
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
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

  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
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

### image.findMultiColorExJ 自动截屏多点找色(JSON)

* 多点找色，找到所有符合标准的点，自动抓取当前屏幕的图片,参数从JSON文件中读取，类似于按键精灵的多点找色
* @param jsonFileName 使用图色工具生成JSON文件,存储到res文件夹中,例如 a.json
* @return 多个Point 坐标点数组或者null

```javascript showLineNumbers
function main() {
  let req = startEnv();
  if (!req) {
    logd("申请权限失败");
    return;
  }
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
  let points = image.findMultiColorExJ("金币.json");
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
* 适配EC USB 6.30.0+
* @param image 图片
* @param color 要寻找的颜色类似， 0xCDD7E9-0x101010,0xCDD7E9-0x101010,EC 工具生成
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
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
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
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
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
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
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
* @param image1 大图片
* @param jsonFileName 使用图色工具生成JSON文件,存储到res文件夹中,例如 a.json, 小图路径请到json文件配置
* @return `{null|Point[]}` 坐标点数组或者null

```javascript showLineNumbers
function main() {

  //抓取屏幕
  let aimage = image.captureFullScreen();
  logd("aimage " + aimage);
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
* @param image1 大图片
* @param jsonFileName 使用图色工具生成JSON文件,存储到res文件夹中,例如 a.json, 小图路径请到json文件配置
* @return `{null|Point[]}` 坐标点数组或者null

```javascript showLineNumbers
function main() {
  sleep(1000)
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

### image.initOpenCV 初始化OpenCV

* 初始化OPENCV 类库
* 如果使用找图请先调用这个函数，第一次初始化需要复制类库，时间可能较长，以后再次执行就很快
* @return 布尔型 true 代表成功 false代表失败

```javascript showLineNumbers
function main() {
  let req = startEnv();
  if (!req) {
    logd("申请权限失败");
    return;
  }
  sleep(1000)
  let d = image.initOpenCV();
  logd(d)
}

main();
```

### image.findImage 找图

* 找图。在大图片image中查找小图片template的位置（模块匹配），找到时返回位置坐标区域(Rect)，找不到时返回null。
* @param image 大图片
* @param template 小图片（模板）
* @param x 找图区域 x 起始坐标
* @param y 找图区域 y 起始坐标
* @param ex 终点X坐标
* @param ey 终点Y坐标
* @param weakThreshold 弱阈值。该值用于在每一轮模板匹配中检验是否继续匹配。如果相似度小于该值，则不再继续匹配。取值范围为0~
  1的浮点数。默认值为0.7。
* @param threshold 图片相似度。取值范围为0~1的浮点数。默认值为0.9。
* @param limit 限制结果的数量，如果要找到1个，就填写1，如果是多个请填写多个
* @param method 0: TM_SQDIFF平方差匹配法,1: TM_SQDIFF_NORMED归一化平方差匹配方法,2: TM_CCORR相关匹配法,3:
  TM_CCORR_NORMED归一化相关匹配法,4:
  TM_CCOEFF系数匹配法,5: TM_CCOEFF_NORMED归一化系数匹配法
* @return Rect 区域坐标对象数组或者null

```javascript showLineNumbers
function main() {
  let req = startEnv();
  if (!req) {
    logd("申请权限失败");
    return;
  }
  let d = image.initOpenCV();
  logd(d)
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
  //从工程目录下res文件夹下读取sms.png文件
  let sms = readResAutoImage("sms.png");
  //抓取屏幕
  let aimage = image.captureFullScreen();
  logd("aimage " + aimage);
  if (aimage != null) {
    //在图片中查找
    let points = image.findImage(aimage, sms, 0, 0, 0, 0, 0.7, 0.9, 21, 5);
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
  //图片要回收
  image.recycle(sms)
}

main();
```

### image.findImageJ 找图(JSON)

* 找图。在大图片image中查找小图片template的位置（模块匹配），找到时返回位置坐标区域(Rect)，找不到时返回null。
* @param image1 大图片
* @param jsonFileName 使用图色工具生成JSON文件,存储到res文件夹中,例如 a.json, 小图路径请到json文件配置
* @return `{null|Rect[]}` 区域坐标对象数组或者null

```javascript showLineNumbers
function main() {
  let req = startEnv();
  if (!req) {
    logd("申请权限失败");
    return;
  }
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
  let d = image.initOpenCV();
  logd(d)
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
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

### image.findImage2 找图

* 找图。在大图片image中查找小图片template的位置（模块匹配），找到时返回位置坐标区域(Rect)，找不到时返回null。
* 注意: 自带含缩放功能
* EC iOS 6.45.0+
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
  TM_CCORR_NORMED归一化相关匹配法,4:
  TM_CCOEFF系数匹配法,5: TM_CCOEFF_NORMED归一化系数匹配法
* @return Rect 区域坐标对象数组或者null

```javascript showLineNumbers
function main() {
  let req = startEnv();
  if (!req) {
    logd("申请权限失败");
    return;
  }
  let d = image.initOpenCV();
  logd(d)
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
  //从工程目录下res文件夹下读取sms.png文件
  let sms = readResAutoImage("sms.png");
  //抓取屏幕
  let aimage = image.captureFullScreen();
  logd("aimage " + aimage);
  if (aimage != null) {
    //在图片中查找
    let points = image.findImage2(aimage, sms, 0, 0, 0, 0, 0.7, 0.9, 21, 5);
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
  //图片要回收
  image.recycle(sms)
}

main();
```

### image.findImage2J 找图(JSON)

* 找图。在大图片image中查找小图片template的位置（模块匹配），找到时返回位置坐标区域(Rect)，找不到时返回null。
* @param image1 大图片
* @param jsonFileName 使用图色工具生成JSON文件,存储到res文件夹中,例如 a.json, 小图路径请到json文件配置
* @return `{null|Rect[]}` 区域坐标对象数组或者null

```javascript showLineNumbers
function main() {
  let req = startEnv();
  if (!req) {
    logd("申请权限失败");
    return;
  }
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
  //抓取屏幕
  let aimage = image.captureFullScreen();
  logd("aimage " + aimage);
  if (aimage != null) {
    //在图片中查找
    let points = image.findImage2J(aimage, "a.json");
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
    image.recycle(aimage)
  }
}

main();
```

### image.findImageEx 自动截屏找图

* 找图。在当前屏幕中查找小图片template的位置（模块匹配），找到时返回位置坐标区域(Rect)，找不到时返回null。
* @param template 小图片（模板）
* @param x 找图区域 x 起始坐标
* @param y 找图区域 y 起始坐标
* @param ex 终点X坐标
* @param ey 终点Y坐标
* @param weakThreshold 弱阈值。该值用于在每一轮模板匹配中检验是否继续匹配。如果相似度小于该值，则不再继续匹配。取值范围为0~
  1的浮点数。默认值为0.7。
* @param threshold 图片相似度。取值范围为0~1的浮点数。默认值为0.9。
* @param limit 限制结果的数量，如果要找到1个，就填写1，如果是多个请填写多个
* @param method 0: TM_SQDIFF平方差匹配法,1: TM_SQDIFF_NORMED归一化平方差匹配方法,2: TM_CCORR相关匹配法,3:
  TM_CCORR_NORMED归一化相关匹配法,4:
  TM_CCOEFF系数匹配法,5: TM_CCOEFF_NORMED归一化系数匹配法
* @return Rect 区域坐标对象数组或者null

```javascript showLineNumbers
function main() {
  let req = startEnv();
  if (!req) {
    logd("申请权限失败");
    return;
  }
  let d = image.initOpenCV();
  logd(d)
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
  //从工程目录下res文件夹下读取sms.png文件
  let sms = readResAutoImage("sms.png");
  //在当前屏幕中查找，并且限制只查找一个
  let points = image.findImageEx(sms, 0, 0, 0, 0, 0.7, 0.9, 21, 5);
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

### image.matchTemplate 图片模板匹配

* OpenCV模板匹配封装
* @param image 大图片
* @param template 小图片（模板）
* @param weakThreshold 弱阈值。该值用于在每一轮模板匹配中检验是否继续匹配。如果相似度小于该值，则不再继续匹配。取值范围为0~
  1的浮点数。默认值为0.9。
* @param threshold 强阈值。该值用于检验最终匹配结果，以及在每一轮匹配中如果相似度大于该值则直接返回匹配结果。。取值范围为0~
  1的浮点数。默认值为0.9。
* @param rect 找图区域。参见findColor函数关于 rect 的说明。
* @param maxLevel 默认为-1，一般而言不必修改此参数。不加此参数时该参数会根据图片大小自动调整。找图算法是采用图像金字塔进行的,
  level参数表示金字塔的层次,
  level越大可能带来越高的找图效率，但也可能造成找图失败（图片因过度缩小而无法分辨）或返回错误位置。因此，除非您清楚该参数的意义并需要进行性能调优，否则不需要用到该参数。
* @param limit 限制结果的数量，如果要找到1个，就填写1，如果是多个请填写多个
* @param method 0: TM_SQDIFF平方差匹配法,1: TM_SQDIFF_NORMED归一化平方差匹配方法,2: TM_CCORR相关匹配法,3:
  TM_CCORR_NORMED归一化相关匹配法,4:
  TM_CCOEFF系数匹配法,5: TM_CCOEFF_NORMED归一化系数匹配法
* @return Match集合 或者null

```javascript showLineNumbers
function main() {
  let req = startEnv();
  if (!req) {
    logd("申请权限失败");
    return;
  }
  let d = image.initOpenCV();
  logd(d)
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
  let aimage = image.captureFullScreen();
  if (aimage != null) {
    let temp = readResAutoImage("tmp.png");
    let rectp = new Rect();
    rectp.left = 0;
    rectp.top = 0;
    rectp.right = device.getScreenWidth();
    rectp.bottom = device.getScreenHeight();
    let matchs = image.matchTemplate(aimage, temp, 0.7, 0.9, rectp, -1, 10, 5);
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
    //图片要回收
    image.recycle(temp)
  }
}

main();
```

### image.matchTemplateJ 图片模板匹配(JSON)

* OpenCV模板匹配封装
* @param image1 大图片
* @param jsonFileName 使用图色工具生成JSON文件,存储到res文件夹中,例如 a.json, 小图路径请到json文件配置
* @return `{null|Match[]}` 匹配到的集合

```javascript showLineNumbers
function main() {
  let d = image.initOpenCV();
  logd(d)
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
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

### image.matchTemplate2 图片模板匹配

* OpenCV模板匹配封装
* 注意: 自带缩放查找
* EC iOS 6.45.0+
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
  TM_CCORR_NORMED归一化相关匹配法,4:
  TM_CCOEFF系数匹配法,5: TM_CCOEFF_NORMED归一化系数匹配法
* @return Match集合 匹配到的集合

```javascript showLineNumbers
function main() {
  let req = startEnv();
  if (!req) {
    logd("申请权限失败");
    return;
  }
  let d = image.initOpenCV();
  logd(d)
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
  let aimage = image.captureFullScreen();
  if (aimage != null) {
    let temp = readResAutoImage("tmp.png");
    let rectp = new Rect();
    rectp.left = 0;
    rectp.top = 0;
    rectp.right = device.getScreenWidth();
    rectp.bottom = device.getScreenHeight();
    let matchs = image.matchTemplate2(aimage, temp, 0.7, 0.9, rectp, -1, 10, 5);
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
    //图片要回收
    image.recycle(temp)
  }
}

main();
```



### image.matchTemplate2J 图片模板匹配(JSON)

* OpenCV模板匹配封装
* @param image1 大图片
* @param jsonFileName 使用图色工具生成JSON文件,存储到res文件夹中,例如 a.json, 小图路径请到json文件配置
* @return `{null|Match[]}` 匹配到的集合

```javascript showLineNumbers
function main() {
  let d = image.initOpenCV();
  logd(d)
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
  let aimage = image.captureFullScreen();
  if (aimage != null) {
    let matchs = image.matchTemplate2J(aimage, "a.json");
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

### image.matchTemplateEx 图片模板匹配

* OpenCV模板匹配封装，在当前屏幕截图中进行匹配
* @param template 小图片（模板）
* @param weakThreshold 弱阈值。该值用于在每一轮模板匹配中检验是否继续匹配。如果相似度小于该值，则不再继续匹配。取值范围为0~
  1的浮点数。默认值为0.9。
* @param threshold 强阈值。该值用于检验最终匹配结果，以及在每一轮匹配中如果相似度大于该值则直接返回匹配结果。。取值范围为0~
  1的浮点数。默认值为0.9。
* @param rect 找图区域。参见findColor函数关于 rect 的说明。
* @param maxLevel 默认为-1，一般而言不必修改此参数。不加此参数时该参数会根据图片大小自动调整。找图算法是采用图像金字塔进行的,
  level参数表示金字塔的层次,
  level越大可能带来越高的找图效率，但也可能造成找图失败（图片因过度缩小而无法分辨）或返回错误位置。因此，除非您清楚该参数的意义并需要进行性能调优，否则不需要用到该参数。
* @param limit 限制结果的数量，如果要找到1个，就填写1，如果是多个请填写多个
* @param method 0: TM_SQDIFF平方差匹配法,1: TM_SQDIFF_NORMED归一化平方差匹配方法,2: TM_CCORR相关匹配法,3:
  TM_CCORR_NORMED归一化相关匹配法,4:
  TM_CCOEFF系数匹配法,5: TM_CCOEFF_NORMED归一化系数匹配法
* @return Match 集合 或者null

```javascript showLineNumbers
function main() {
  let req = startEnv();
  if (!req) {
    logd("申请权限失败");
    return;
  }
  let d = image.initOpenCV();
  logd(d)
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
  let temp = readResAutoImage("tmp.png");
  let rectp = new Rect();
  rectp.left = 0;
  rectp.top = 0;
  rectp.right = device.getScreenWidth();
  rectp.bottom = device.getScreenHeight();
  let matchs = image.matchTemplateEx(temp, 0.7, 0.9, rectp, -1, 1, 5);
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
  //图片要回收
  image.recycle(temp)
}

main();
```


## 灰度


### image.gray 灰度Image

* 灰度图像，使用了opencv函数实现
* 适配EC iOS USB版本 8.18.0+
* @param img AutoImage图片对象
* @return `{null|AutoImage}`

```javascript showLineNumbers
function main() {
  let req = startEnv();
  if (!req) {
    logd("申请权限失败");
    return;
  }
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
  for (let i = 0; i < 1000; i++) {
    sleep(1000);
    let s = new Date().getTime();
    let d = image.captureFullScreenEx();
    if (d) {
      let saved = image.saveTo(d, "D:/testb.png");
      let s = new Date().getTime();
      let bd = image.gray(d);
      logd("time " + (new Date().getTime() - s))
      logd(bd.uuid);
      if (bd) {
        let saved = image.saveTo(bd, "D:/testb2.png");
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
* @param type 二值化类型，一般写1即可
* 0 灰度值大于阈值为最大值，其他值为0
* 1 灰度值大于阈值为0，其他值为最大值
* 2 灰度值大于阈值的为阈值，其他值不变
* 3 灰度值大于阈值的不变，其他值为0
* 4 灰度值大于阈值的为零，其他值不变
* 7 暂不支持
* 8 大津法自动寻求全局阈值
* 16 三角形法自动寻求全局阈值
* @param threshold 二值化系数，0 ~ 255
* @return AutoImage 对象或者null

```javascript showLineNumbers
function main() {
  let req = startEnv();
  if (!req) {
    logd("申请权限失败");
    return;
  }
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
  for (let i = 0; i < 1000; i++) {
    sleep(1000);
    let s = new Date().getTime();
    let d = image.captureFullScreenEx();
    if (d) {
      let saved = image.saveTo(d, "D:/testb.png");
      let s = new Date().getTime();
      let bd = image.binaryzation(d, 1, 200);
      logd("time " + (new Date().getTime() - s))
      logd(bd.uuid);
      if (bd) {
        let saved = image.saveTo(bd, "D:/testb2.png");
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

### image.binaryzationBitmap 二值化 BufferedImage

* 对JAVA BufferedImage 图片进行二值化
* @param bitmap BufferedImage 图片对象
* @param type 二值化类型，一般写1即可
* 0 灰度值大于阈值为最大值，其他值为0
* 1 灰度值大于阈值为0，其他值为最大值
* 2 灰度值大于阈值的为阈值，其他值不变
* 3 灰度值大于阈值的不变，其他值为0
* 4 灰度值大于阈值的为零，其他值不变
* 7 暂不支持
* 8 大津法自动寻求全局阈值
* 16 三角形法自动寻求全局阈值
* @param threshold 二值化系数，0 ~ 255
* @return BufferedImage 对象或者null

```javascript showLineNumbers
function main() {
  let req = startEnv();
  if (!req) {
    logd("申请权限失败");
    return;
  }
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
  for (let i = 0; i < 1000; i++) {
    sleep(1000);
    let s = new Date().getTime();
    let d = image.captureFullScreen();
    if (d) {
      let s = new Date().getTime();
      let bd = image.binaryzationBitmap(image.imageToBitmap(d), 1, 200);
      logd("time " + (new Date().getTime() - s))
      logd(bd);
      if (bd) {
        exit()
      }
      //图片要回收
      image.recycle(d)
    }
  }

}

main();
```

### image.binaryzationBitmapEx 二值化 BufferedImage

* 自适应二值化，使用了opencv的adaptiveThreshold函数实现
* @param bitmap BufferedImage 图片对象
* @param map MAP 参数
    * diameter : 去噪直径 参考opencv的bilateralFilter函数
    * adaptiveMethod：自适应二值化方式分别是0和1 ，ADAPTIVE_THRESH_MEAN_C=0，ADAPTIVE_THRESH_GAUSSIAN_C = 1
    * blockSize：计算单位是像素的邻域块，邻域块取多大，就由这个值作决定，3，5，7这样的奇数
    * c: 偏移值调整量，
    * ```{"diameter":20,"adaptiveMethod":1,"c":9,"blockSize":51}```
* @return BufferedImage 对象或者null

```javascript showLineNumbers
function main() {
  let req = startEnv();
  if (!req) {
    logd("申请权限失败");
    return;
  }
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
  for (let i = 0; i < 1000; i++) {
    sleep(1000);
    let d = image.captureFullScreen();
    if (d) {
      let s = new Date().getTime();
      let bd = image.binaryzationBitmapEx(image.imageToBitmap(d),
        {
          "diameter": 20,
          "adaptiveMethod": 1,
          "c": 9, "blockSize": 51
        });
      logd("time " + (new Date().getTime() - s))
      logd(bd);
      if (bd) {
        exit()
      }
      //图片要回收
      image.recycle(d)
    }
  }
}

main();
```

### image.binaryzationEx 二值化Image

* 自适应二值化，使用了opencv的adaptiveThreshold函数实现
* @param img AutoImage图片对象
* @param map MAP 参数
    * diameter : 去噪直径 参考opencv的bilateralFilter函数
    * adaptiveMethod：自适应二值化方式分别是0和1 ，ADAPTIVE_THRESH_MEAN_C=0，ADAPTIVE_THRESH_GAUSSIAN_C = 1
    * blockSize：计算单位是像素的邻域块，邻域块取多大，就由这个值作决定，3，5，7这样的奇数
    * c: 偏移值调整量，
    * ```{"diameter":20,"adaptiveMethod":1,"c":9,"blockSize":51}```
* @return `{null|AutoImage}`

```javascript showLineNumbers
function main() {
  let req = startEnv();
  if (!req) {
    logd("申请权限失败");
    return;
  }
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
  for (let i = 0; i < 1000; i++) {
    sleep(1000);
    let s = new Date().getTime();
    let d = image.captureFullScreenEx();
    if (d) {
      let saved = image.saveTo(d, "D:/testb.png");
      let s = new Date().getTime();
      let bd = image.binaryzationEx(d, {
        "diameter": 20,
        "adaptiveMethod": 1,
        "c": 9, "blockSize": 51
      });
      logd("time " + (new Date().getTime() - s))
      logd(bd.uuid);
      if (bd) {
        let saved = image.saveTo(bd, "D:/testb2.png");
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
* 支持EC iOS中控 6.0+
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

### image.scaleImage 缩放图像

* 缩放图像
* 适合 EC iOS 6.45.0+
* @param img `{AutoImage}` 图片对象
* @param w 宽度
* @param h 高度
* @return AutoImage 对象或者null

```javascript showLineNumbers
function main() {
  let img = image.captureFullScreen()
  logd(" img width " + image.getWidth(img2))
  let img2 = image.scaleImage(img, 100, 200);
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
  let autoimg = image.readImage("F:/a.png");
  //图片要回收
  image.recycle(autoimg)
}

main();
```

### image.readBitmap 读取文件为Bitmap

* 读取在路径path的图片文件并返回一个 ```{@link AutoImage}``` 对象。如果文件不存在或者文件无法解码则返回null。
* @param path 图片路径
* @return android的bitmap对象或者null

```javascript showLineNumbers
function main() {
  let autoimg = image.readBitmap("F:/a.png");
  //图片要回收
  image.recycle(autoimg)
}

main();
```

### image.scaleBitmap 缩放图片

* 缩放图片
* 适合 EC iOS 6.45.0+
* @param img `{BufferedImage}` 图片对象
* @param w 宽度
* @param h 高度
* @return BufferedImage 对象或者null

```javascript showLineNumbers
function main() {
  let autoimg = image.readBitmap("F:/a.png");
  let bbs = image.scaleBitmap(autoimg, 100, 200)
  logd("bb " + bbs)
  //这里执行保存到文件查看
}

main();
```

### image.pixelInImage 图像坐标点颜色

* 返回图片image在点(x, y)处的像素的ARGB值。
* 该值的格式为0xAARRGGBB，是一个"32位整数"
* 坐标系以图片左上角为原点。以图片左侧边为y轴，上侧边为x轴。
* @param image 图片
* @param x 要获取的像素的横坐标。
* @param y 要获取的像素的纵坐标。
* @return 整型

```javascript showLineNumbers
function main() {
  let request = image.requestScreenCapture(10000, 0);
  if (!request) {
    request = image.requestScreenCapture(10000, 0);
  }
  logd("申请截图结果... " + request)
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
  let imageX = image.captureFullScreen();
  let color = image.pixelInImage(imageX, 100, 100);
  //图片要回收
  image.recycle(imageX)
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
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
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

### image.getWidth 取得宽度

* 取得宽度
* @param img 图片对象
* @return int

```javascript showLineNumbers
function main() {
  let req = startEnv();
  if (!req) {
    logd("申请权限失败");
    return;
  }
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
  let aimage = image.captureFullScreen();
  if (aimage != null) {
    let w = image.getWidth(aimage);
    logd("w " + w);
    //图片要回收
    image.recycle(aimage)
  }
}

main();
```

### image.getHeight 取得高度

* 取得高度
* @param img 图片对象
* @return int

```javascript showLineNumbers
function main() {
  let req = startEnv();
  if (!req) {
    logd("申请权限失败");
    return;
  }
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
  let aimage = image.captureFullScreen();
  if (aimage != null) {
    let h = image.getHeight(aimage);
    logd("h " + h);
    //图片要回收
    image.recycle(aimage)
  }
}

main();
```

### image.argb RGB字符串

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
  logd("申请截图结果... " + request)
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
  let imageX = image.captureFullScreen();
  let color = image.pixel(imageX, 100, 100);
  logd(image.argb(color))
  //图片要回收
  image.recycle(imageX)
}

main();
```

### image.getPixelBitmap 取得Bitmap单点颜色

* 取得Bitmap图片的某个点的颜色值
* @param bitmap 图片对象
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
  logd("申请截图结果... " + request)
  ///申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
  let bitmap = image.captureFullScreen("jpg", 800, 800, 100, 100, 100);
  let color = image.getPixelBitmap(image.imageToBitmap(bitmap), 100, 100);
  //图片要回收
  image.recycle(bitmap)
}

main();
```

### image.getPixelsBitmap 取得Bitmap区域颜色

* 取得Bitmap图片的某个区域点的颜色值，等同于 Bitmap.getPixels
* @param bitmap 图片对象
* @param arraySize 要返回的区域数组的大小
* @param offset 写入到pixels[]中的第一个像素索引值
* @param stride pixels[]中的行间距个数值(必须大于等于位图宽度)。可以为负数
* @param x 从位图中读取的第一个像素的x坐标值。
* @param y 从位图中读取的第一个像素的y坐标值
* @param width 从每一行中读取的像素宽度
* @param height 读取的行数
* @return int 颜色值数组

```javascript showLineNumbers
function main() {
  let req = startEnv();
  if (!req) {
    logd("申请权限失败");
    return;
  }
  logd("申请截图结果... " + request)
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
  let bitmap = image.captureFullScreen();
  let w = bitmap.getWidth();
  let h = bitmap.getHeight();
  let mPixels = image.getPixelsBitmap(image.imageToBitmap(bitmap), w * h, 0, w, 0, 0, w, h);
  //图片要回收
  image.recycle(bitmap)
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
  logd("申请截图结果... " + request)
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
  let imageX = image.captureFullScreen();
  let r = image.saveTo(imageX, "D:/a.png");
  logd("result " + r);
  //图片要回收
  image.recycle(imageX)
}

main();
```

### image.saveBitmap 保存bitmap图像

* 保存bitmap图像
* 适用版本(EC 5.15.0+)
* @param bitmap 图片
* @param format 要保存图像格式，有 png，jpg，webp
* @param q 要保存图像质量，1-100,png格式无效
* @param path 要保存图像路径
* @return `{bool}` true 成功 false 失败

```javascript showLineNumbers
function main() {

  let bot = image.readBitmap("D:/yyb2.png");
  logd("bot " + bot);
  //保存的到文件
  let saved = image.saveBitmap(bot, "png", 100, "D:/tmp.png");
  logd("saved " + saved);
  //回收掉防止内存暴涨
  if (bot) {
    bot.recycle()
  }

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
  logd("申请截图结果... " + request)
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
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
  logd("申请截图结果... " + request)
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
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
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
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

### image.recycleAllImage 回收图片

* 回收所有图片
* 适合 EC iOS 7.16.0+
* @return `boolean` true代表成功

```javascript showLineNumbers
function main() {
  let imageX = image.captureFullScreen();
  //图片要回收
  image.recycleAllImage()

}

main();
```

### image.clipBitmap (剪裁bitmap)

* 剪裁图片，请自行判断参数，正确性
* @param bitmap 图片
* @param x 开始X坐标
* @param y 开始Y坐标
* @param w 剪裁宽度
* @param h 剪裁高度
* @return `{Bitmap}` 安卓的Bitmap对象

```javascript showLineNumbers
function main() {
  let req = startEnv();
  if (!req) {
    logd("申请权限失败");
    return;
  }
  logd("申请截图结果... " + request)
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
  for (let i = 0; i < 100; i++) {
    let d = image.captureFullScreen();
    logd(d)
    sleep(1000);
    if (d) {
      d = image.imageToBitmap(d)
      d = image.clipBitmap(d, 100, 100, 200, 200);
      let ds = image.bitmapBase64(d, "jpg", 100);
      logd(ds)
      loge(image.base64Bitmap(ds, 0))
      //图片要回收
      image.recycle(d)
    }
  }
}

main();
```

### image.base64Bitmap (base64转bitmap)

* base64字符串转为Bitmap图片
* @param data base64 数据
* @param flag base64格式的标示，一般为0，
* 可选参数为 ：0 默认， 1 无填充模式，2 无换行模式，4 换行模式
* @return `{Bitmap}` 安卓的Bitmap对象

```javascript showLineNumbers
function main() {
  let req = startEnv();
  if (!req) {
    logd("申请权限失败");
    return;
  }
  logd("申请截图结果... " + request)
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
  for (let i = 0; i < 100; i++) {
    let d = image.captureFullScreen();
    logd(d)
    sleep(1000);
    if (d) {
      d = image.clipBitmap(d, 100, 100, 200, 200);
      let ds = image.bitmapBase64(d, "jpg", 100);
      logd(ds)
      loge(image.base64Bitmap(ds, 0))
      //图片要回收
      image.recycle(d)
    }
  }

}

main();
```

### image.bitmapBase64 (bitmap转base64)

* bitmap转为base64
* @param bitmap 图片
* @param format 格式，jpg或者png
* @param q 质量 1 - 100,png格式无效
* @return `{string}` base64字符串

```javascript showLineNumbers
function main() {
  let req = startEnv();
  if (!req) {
    logd("申请权限失败");
    return;
  }
  logd("申请截图结果... " + request)
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
  for (let i = 0; i < 100; i++) {
    let d = image.captureFullScreen();
    logd(d)
    sleep(1000);
    if (d) {
      d = image.imageToBitmap(d)
      d = image.clipBitmap(d, 100, 100, 200, 200);
      let ds = image.bitmapBase64(d, "jpg", 100);
      logd(ds)
      loge(image.base64Bitmap(ds, 0))
      //图片要回收
      image.recycle(d)
    }
  }

}

main();
```

### image.imageToBitmap (AutoImage转Bitmap)

* 将AutoImage转换为原生的 BufferedImage 对象
* @param img `{AutoImage}`
* @return `{BufferedImage}` 对象

```javascript showLineNumbers
function main() {
  let req = startEnv();
  if (!req) {
    logd("申请权限失败");
    return;
  }
  logd("申请截图结果... " + request)
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
  for (let i = 0; i < 100; i++) {
    let d = image.captureFullScreen();
    logd(d)
    sleep(1000);
    if (d) {
      let ds = image.imageToBitmap(d);
      logd(ds)
      image.recyle(d);
    }
  }

}

main();
```

### image.bitmapToImage (BufferedImage 转AutoImage)

* 将BufferedImage对象转换为AutoImage
* @param img `{BufferedImage}` 对象
* @return `{AutoImage}` 对象

```javascript showLineNumbers
function main() {
  let req = startEnv();
  if (!req) {
    logd("申请权限失败");
    return;
  }
  logd("申请截图结果... " + request)
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
  for (let i = 0; i < 100; i++) {
    let d = image.captureFullScreen();
    logd(d)
    sleep(1000);
    if (d) {
      let ds = image.imageToBitmap(d);
      logd(ds)
      //再次转换为autoimage对象
      let sy = image.bitmapToImage(ds);
      logd(sy)
      image.recyle(d);
    }

  }
}

main();
```

### image.imageToMatFormat (BufferedImage转Mat AutoImage)

* 转换Mat存储格式
* 适合 EC iOS 7.11.0+
* @param img `{AutoImage}` 图片对象
* @return `MAT存储格式的AutoImage` 对象或者null

```javascript showLineNumbers
function main() {
  let req = startEnv();
  if (!req) {
    logd("申请权限失败");
    return;
  }
  logd("申请截图结果... " + request)
  //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
  sleep(1000)
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

### image.matToImageFormat (Mat AutoImage  转BufferedImage AutoImage)

* 转换普通image存储格式
* 适合 EC iOS 7.11.0+
* @param img `{AutoImage}` 图片对象
* @return ` 普通存储格式的AutoImage `对象或者null

```javascript showLineNumbers
function main() {
  let req = startEnv();
  if (!req) {
    logd("申请权限失败");
    return;
  }
  logd("申请截图结果... " + request)
  sleep(1000)
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
