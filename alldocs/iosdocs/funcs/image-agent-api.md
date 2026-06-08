---
title: 图色函数-手机内执行
description: EasyClick 自动化脚本 iOS免越狱 图色函数-手机内执行 资源下载
keywords:
  - EasyClick 自动化脚本 iOS免越狱 图色函数-手机内执行 资源下载
  - imageAgent
  - AutoImage
  - useOpencvMat
  - setInitParam
  - jpg
  - captureFullScreenEx
  - mat
  - param
  - captureFullScreen
  - cmpColor
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

- 这个模块运算是在手机内执行的，数据也是存在手机内,所以不用传输数据到中控
- 其次可以通过函数和中控的图像进行交换
- 这样大大提高USB的性能，节省传输的时间
  :::

## 设置

### imageAgent.useOpencvMat 初始化参数

* 切换图片存储模式为opencv的mat格式
* 适合EC iOS 7.16.0+
* 切换后抓图、读取图片、找图、找色等都会切换到mat格式，速度更快内存更少
* 实测内存减少50%-80%，CPU减少20%-30%，速度提升100%-200%
* 如果让图片格式切换请参考 imageToMatFormat和matToImageFormat两个函数
* @param use 1 是 0 否
* @return `{boolean|*}` true 成功 false 失败

```javascript showLineNumbers
function main() {
    let r = imageAgent.useOpencvMat(1);
    logd(r)
    //剩下的代码和之前一样 找色 找图等操作
}

main();
```

### imageAgent.setInitParam 初始化参数

* @param params 参数待定

```javascript showLineNumbers
function main() {
    imageAgent.setInitParam({});
}

main();
```

## 普通截图 jpg

### imageAgent.captureFullScreenEx 截取全屏 AutoImage 对象

* 抓取全屏，格式是JPG
* 适配EC USB版 iOS 5.0.0+
* @param ext 扩展参数，可以调整截图的方式和质量，可以分别是
* type: 1 代表截图 jpg格式的方式1
* 2 代表截图 jpg格式方式2
* 3 代表png格式，png不支持质量参数 ，根据自己机器情况调用
* quality: 图片质量，type=1的时候，支持 1， 50， 100，三种不同的质量标准
* 当type =2 的时候，支持1-100图片质量
* @return `{null|AutoImage}`

```javascript showLineNumbers
function main() {
    logd("isServiceOk " + isServiceOk());
    startEnv()
    logd("isServiceOk " + isServiceOk());
    for (let i = 0; i < 10; i++) {
        console.time(1)
        let cap = imageAgent.captureFullScreenEx({"type": "1", "quality": 50})
        logd("截图数据: " + cap + "  耗时: " + console.timeEnd(1))
        sleep(1000)
        //图片要回收
        imageAgent.recycle(cap)
    }
}
```

### imageAgent.captureFullScreen 截取全屏 AutoImage 对象

* 截取当前屏幕并返回一个 AutoImage 对象, 这个格式是jpg。
* @return AutoImage 对象或者null

```javascript showLineNumbers
function main() {
    logd("isServiceOk " + isServiceOk());
    startEnv()
    logd("isServiceOk " + isServiceOk());
    for (let i = 0; i < 10; i++) {
        let cap = imageAgent.captureFullScreen()
        logd("截图数据: " + cap)
        sleep(1000)
        //图片要回收
        imageAgent.recycle(cap)
    }
}

main();
```

## 比色

### imageAgent.cmpColor 多点比色

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
    let aimage = imageAgent.captureFullScreen();
    if (aimage != null) {
        let points3 = "205|1130|0xff944b-0x101010,211|1158|0xff8e42,191|1175|0xfcfbf7";
        let points = imageAgent.cmpColor(aimage, points3, 0.9, 0, 0, 0, 0);
        logd("points " + points);
        //图片要回收
        imageAgent.recycle(aimage)
    }

}

main();
```

### imageAgent.cmpColorEx 多点比色扩展

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
    let points = imageAgent.cmpColorEx(points3, 0.9, 0, 0, 0, 0);
    logd("points " + points);

}

main();
```

### imageAgent.cmpMultiColor 多组比色

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
    let aimage = imageAgent.captureFullScreen();
    if (aimage != null) {
        let points1 = "205|112230|0xff944b,211|1158|0xff8e42,191|1175|0xfcfbf7";
        let points2 = "205|113022|0xff944b,211|1158|0xff8e42,191|1175|0xfcfbf7";
        let points3 = "205|1130|0xff944b,211|1158|0xff8e42,191|1175|0xfcfbf7";
        let points = imageAgent.cmpMultiColor(aimage, [points1, points2, points3], 0.9, 0, 0, 0, 0);
        logd("points " + points);
        //图片要回收
        imageAgent.recycle(aimage)
    }
}

main();
```

### imageAgent.cmpMultiColorEx 多组比色扩展

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
    let points = imageAgent.cmpMultiColorEx([points1, points2, points3], 0.9, 0, 0, 0, 0);
    logd("points " + points);
}

main();
```

## 找色

### imageAgent.findColor 单点找色

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
    let aimage = imageAgent.captureFullScreen();
    if (aimage != null) {
        let points = imageAgent.findColor(aimage, "0xCDD7E9-0x101010,0xCDD7E9-0x101010", 0.9, 0, 0, 0, 0, 10, 1);
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
        imageAgent.recycle(aimage)
    }

}

main();
```

### imageAgent.findColorEx 自动截屏单点找色

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

### imageAgent.findMultiColor 多点找色

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
    let aimage = imageAgent.captureFullScreen();
    if (aimage != null) {
        let points = imageAgent.findMultiColor(aimage, "0xDD7A5F-0x101010", "29|25|0xBB454B-0x101010,58|44|0xA6363A-0x101010", 0.9, 0, 0, 0, 0, 10, 1);
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
        imageAgent.recycle(aimage)
    }

}

main();
```

### imageAgent.findMultiColorEx 自动截屏多点找色

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
    let points = imageAgent.findMultiColorEx("0xDD7A5F-0x101010", "29|25|0xBB454B-0x101010,58|44|0xA6363A-0x101010", 0.9, 0, 0, 0, 0, 10, 1);
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

### imageAgent.findNotColor 找非色

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
    let aimage = imageAgent.captureFullScreen();
    if (aimage != null) {
        let points = imageAgent.findNotColor(aimage, "0xCDD7E9-0x101010,0xCDD7E9-0x101010", 0.9, 0, 0, 0, 0, 10, 1);
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
        imageAgent.recycle(aimage)
    }

}

main();
```

## 找图

### imageAgent.findImageByColor 透明找图

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
    let sms = imageAgent.readResAutoImage("sms.png");
    //抓取屏幕
    let aimage = imageAgent.captureFullScreen();
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
        imageAgent.recycle(aimage)
    }
    //图片要回收
    imageAgent.recycle(sms)
}

main();
```

### imageAgent.findImageByColorEx 透明找图扩展

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
        let img = imageAgent.captureFullScreen();
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
        let points = imageAgent.findImageByColorEx(img, smallTmplate, 0, 0, 0, 0, 100, extra);
        logd("time-{}", console.timeEnd(1))
        //这玩意是个数组
        if (points) {
            logd("points " + JSON.stringify(points));
        }
        imageAgent.recycle(img)
    }
    imageAgent.recycle(smallTmplate)
}

main()
```

### imageAgent.findImage 找图

* 找图。在大图片image中查找小图片template的位置（模块匹配），找到时返回位置坐标区域(Rect)，找不到时返回null。
* 适配 EC USB 7.16.0+
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
    //从工程目录下res文件夹下读取sms.png文件
    let sms = imageAgent.readResAutoImage("sms.png");
    //抓取屏幕
    let aimage = imageAgent.captureFullScreen();
    logd("aimage " + aimage);
    if (aimage != null) {
        //在图片中查找
        let points = imageAgent.findImage(aimage, sms, 0, 0, 0, 0, 0.7, 0.9, 21, 5);
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
        imageAgent.recycle(aimage)
    }
    //图片要回收
    imageAgent.recycle(sms)
}

main();
```

### imageAgent.matchTemplate 图片模板匹配

* OpenCV模板匹配封装
* 适合 EC iOS 7.16.0+
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
    //申请完权限至少等1s(垃圾设备多加点)再截图,否则会截不到图
    sleep(1000)
    let aimage = imageAgent.captureFullScreen();
    if (aimage != null) {
        let temp = imageAgent.readResAutoImage("tmp.png");
        let rectp = new Rect();
        rectp.left = 0;
        rectp.top = 0;
        rectp.right = 0;
        rectp.bottom = 0;
        let matchs = imageAgent.matchTemplate(aimage, temp, 0.7, 0.9, rectp, -1, 10, 5);
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
        imageAgent.recycle(aimage)
        //图片要回收
        imageAgent.recycle(temp)
    }
}

main();
```

## 灰度
### imageAgent.gray 灰度图片

* 灰度图片
* 适配EC iOS USB版本 8.18.0+
* @param img
* @return `{null|AutoImage}`

```javascript showLineNumbers
function main() {
    let req = startEnv();
    if (!req) {
        logd("申请权限失败");
        return;
    }
    let screenImage = imageAgent.captureFullScreenEx({"type": "1", "quality": 100});
    logd("start...")
    if (screenImage != null) {
        //二值化
        let newimage = imageAgent.gray(screenImage);
        if (newimage) {
            logd("newimage " + newimage.uuid);
            // 把图像数据拉到中控里面来
            let imginCenter = imageAgent.pullImageToCenter(newimage)
            logd("imginCenter " + imginCenter);
            // 使用中控函数 保存到电脑
            image.saveTo(imginCenter, "aaa.jpg")
        }
        //图片要回收
        imageAgent.recycle(screenImage)
    }
}

main();
```

## 二值化

### imageAgent.binaryzation 二值化Image

* 对AutoImage图片进行二值化
* @param img AutoImage图片对象
* @param threshold 二值化系数，0 ~ 255
* @return AutoImage 对象或者null

```javascript showLineNumbers
function main() {
    for (let i = 0; i < 1; i++) {
//抓取屏幕
        let screenImage = imageAgent.captureFullScreenEx({"type": "1", "quality": 100});
        logd("start...")
        if (screenImage != null) {
            //二值化
            let newimage = imageAgent.binaryzation(screenImage, 200);
            if (newimage) {
                logd("newimage " + newimage.uuid);
                // 把图像数据拉到中控里面来
                let imginCenter = imageAgent.pullImageToCenter(newimage)
                logd("imginCenter " + imginCenter);
                // 使用中控函数 保存到电脑
                image.saveTo(imginCenter, "aaa.jpg")
            }
            //图片要回收
            imageAgent.recycle(screenImage)
        }
    }

}

main();
```

### imageAgent.binaryzationEx 自适应二值化

* 自适应二值化，使用了opencv的adaptiveThreshold函数实现
* 适配 EC USB 7.16.0+
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
    let screenImage = imageAgent.captureFullScreenEx({"type": "1", "quality": 100});
    logd("start...")
    if (screenImage != null) {
        //二值化
        let newimage = imageAgent.binaryzationEx(d, {
            "diameter": 20,
            "adaptiveMethod": 1,
            "c": 9, "blockSize": 51
        });
        if (newimage) {
            logd("newimage " + newimage.uuid);
            // 把图像数据拉到中控里面来
            let imginCenter = imageAgent.pullImageToCenter(newimage)
            logd("imginCenter " + imginCenter);
            // 使用中控函数 保存到电脑
            image.saveTo(imginCenter, "aaa.jpg")
        }
        //图片要回收
        imageAgent.recycle(screenImage)
    }
}

main();
```

## 其他

### imageAgent.rotateImage 旋转图像

* 旋转图片
* 支持EC iOS中控 6.0+
* @param img 图片对象
* @param degree 度数，0代表home键在下竖屏模式，-90代表逆时针旋转90度，home键在右，90度代表顺时针旋转90度，home键在左
* @return AutoImage 对象或者null

```javascript showLineNumbers
function main() {
    let img = imageAgent.captureFullScreen()
    logd(" img width " + imageAgent.getWidth(img2))
    let img2 = imageAgent.rotateImage(img, -90);
    imageAgent.recycle(img)
    logd(" img2 width " + imageAgent.getWidth(img2))
    imageAgent.recycle(img2)
}

main();
```

### imageAgent.readImage 读取文件为Image

* 读取在路径path的图片文件并返回一个 ```{@link AutoImage}``` 对象。如果文件不存在或者文件无法解码则返回null。
* @param path 图片路径
* @return AutoImage 对象或者null

```javascript showLineNumbers
function main() {
    let autoimg = imageAgent.readImage("F:/a.png");
    //图片要回收
    imageAgent.recycle(autoimg)
}

main();
```

### imageAgent.readResAutoImage 读取res文件为Image

* 读取在IEC res 文件夹中的图片文件并返回一个 ```{@link AutoImage}``` 对象。如果文件不存在或者文件无法解码则返回null。
* @param res 图片路径
* @return AutoImage 对象或者null

```javascript showLineNumbers
function main() {
    let autoimg = imageAgent.readResAutoImage("a.png");
    //图片要回收
    imageAgent.recycle(autoimg)
}

main();
```

### imageAgent.argb 颜色转16进制字符串

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
    let aimage = imageAgent.captureFullScreen();
    if (aimage != null) {
        let points3 = "765|22|0x1296DB";
        logd("==" + imageAgent.argb(imageAgent.pixel(aimage, 765, 22)));
        let points = imageAgent.cmpColor(aimage, points3, 0.5, 0, 0, 0, 0);
        logd("points " + points);
        //图片要回收
        imageAgent.recycle(aimage)
    }
}

main();
```

### imageAgent.pixel 取得图片的某个点的颜色值

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
    let aimage = imageAgent.captureFullScreen();
    if (aimage != null) {
        let points3 = "765|22|0x1296DB";
        logd("==" + imageAgent.argb(imageAgent.pixel(aimage, 765, 22)));
        let points = imageAgent.cmpColor(aimage, points3, 0.5, 0, 0, 0, 0);
        logd("points " + points);
        //图片要回收
        imageAgent.recycle(aimage)
    }
}

main();
```

### imageAgent.getWidth 取得宽度

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
    let aimage = imageAgent.captureFullScreen();
    if (aimage != null) {
        let w = imageAgent.getWidth(aimage);
        logd("w " + w);
        //图片要回收
        imageAgent.recycle(aimage)
    }
}

main();
```

### imageAgent.getHeight 取得高度

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
    let aimage = imageAgent.captureFullScreen();
    if (aimage != null) {
        let h = imageAgent.getHeight(aimage);
        logd("h " + h);
        //图片要回收
        imageAgent.recycle(aimage)
    }
}

main();
```

## 图片转换

### imageAgent.imageToMatFormat

* 转换Mat存储格式
* 适合 EC iOS 7.16.0+
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
    imageAgent.useOpencvMat(0)
    for (let i = 0; i < 100; i++) {
        let d = imageAgent.captureFullScreen();
        logd(d)
        sleep(1000);
        if (d) {
            let ds = imageAgent.imageToMatFormat(d);
            logd(ds)
            imageAgent.recyle(d);
        }

    }
}

main();
```

### imageAgent.matToImageFormat

* 转换普通image存储格式
* 适合 EC iOS 7.16.0+
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
    imageAgent.useOpencvMat(1)
    for (let i = 0; i < 100; i++) {
        let d = imageAgent.captureFullScreen();
        logd(d)
        sleep(1000);
        if (d) {
            let ds = imageAgent.matToImageFormat(d);
            logd(ds)
            imageAgent.recyle(d);
        }

    }
}

main();
```

### imageAgent.clip 剪切图片

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
    let imageX = imageAgent.captureFullScreen();
    let r = imageAgent.clip(imageX, 100, 100, 300, 400);
    logd("result " + r);
    //图片要回收
    imageAgent.recycle(imageX)
    imageAgent.recycle(r)
}

main();
```

### imageAgent.toBase64 转Base64

* 取得图片的base64字符串
* 适配 EC iOS USB版本 6.26.0+
* @param img 图片对象
* @return `{string}` base64的数据

```javascript showLineNumbers
function main() {
    let req = startEnv();
    if (!req) {
        logd("申请权限失败");
        return;
    }
    sleep(1000)
    let aimage = imageAgent.captureFullScreen();
    if (aimage != null) {
        let h = imageAgent.toBase64(aimage);
        logd("h " + h);
        //图片要回收
        imageAgent.recycle(aimage)
    }
}

main();
```

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
    let imageX = imageAgent.captureFullScreen();
    let r = imageAgent.clip(imageX, 100, 100, 300, 400);
    logd("result " + r);
    //图片要回收
    imageAgent.recycle(imageX)
    imageAgent.recycle(r)
}

main();
```

## 图片交换

### imageAgent.pushImageToAgent 推送图像到手机

* 将中控图片数据推送到手机环境中
* @param img autoimage对象，这个对象是在中控中
* @return AutoImage 对象或者null

```javascript showLineNumbers
function main() {
    let screenImage = image.captureFullScreenEx({"type": "1", "quality": 100});
    logd("==>中控图片 " + screenImage.uuid)
    let age = imageAgent.pushImageToAgent(screenImage)
    logd("--手机中的图片 " + age.uuid)
    logd("--手机中的图片getWidth " + imageAgent.getWidth(age))
}

main();
```

### imageAgent.pullImageToCenter 拉取图像到中控

* 将图片数据拉到中控环境中
* @param img autoimage对象，这个对象是在手机中
* @return AutoImage 对象或者null

```javascript showLineNumbers
function main() {
    for (let i = 0; i < 1; i++) {
//抓取屏幕
        let screenImage = imageAgent.captureFullScreenEx({"type": "1", "quality": 100});
        logd("start...")
        if (screenImage != null) {
            // clip
            imageAgent
            let newimage = imageAgent.clip(screenImage, 200, 200, 400, 500);
            //这玩意是个数组
            if (newimage) {
                logd("newimage " + newimage.uuid);
                let imginCenter = imageAgent.pullImageToCenter(newimage)
                logd("imginCenter " + imginCenter);
                image.saveTo(imginCenter, "aaa.jpg")
            }
            //图片要回收
            imageAgent.recycle(screenImage)
        }
    }
}

main();
```

## 图片回收

### imageAgent.isRecycled 图片回收判断

* 是否被回收了
* @param img 图片对象
* @return bool true代表已经被回收了

```javascript showLineNumbers
function main() {
    let imageX = imageAgent.captureFullScreen();
    let r = imageAgent.isRecycled(imageX);
    logd("result " + r);
    //图片要回收
    imageAgent.recycle(imageX)
}

main();
```

### imageAgent.recycle 回收图片

* 回收图片
* @param img 图片对象

```javascript showLineNumbers
function main() {
    let imageX = imageAgent.captureFullScreen();
    //图片要回收
    imageAgent.recycle(imageX)

}

main();
```

### imageAgent.recycleAllImage 回收图片

* 回收所有图片
* 适合 EC iOS 7.16.0+
* @return `boolean` true代表成功

```javascript showLineNumbers
function main() {
    let imageX = imageAgent.captureFullScreen();
    //图片要回收
    imageAgent.recycleAllImage()
}

main();
```
