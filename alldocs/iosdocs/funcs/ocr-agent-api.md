---
title: OCR识别-手机内执行
description: EasyClick 自动化脚本 iOS免越狱 OCR识别 资源下载
keywords:
  - EasyClick 自动化脚本 iOS免越狱 OCR识别 资源下载
  - OCR
  - ocrAgent
  - initOcr
  - appleVision
  - releaseAll
  - ocrImage
  - ocr
  - getErrorMsg
  - newOcr
  - 9.0.0
  - EasyClick
  - 手机自动化
  - 自动化测试
  - 脚本开发
  - 安卓自动化
  - iOS自动化
  - 鸿蒙Next
---

## 说明

- OCR模块是属于对图像进行识别
- OCR模块的对象前缀是 ocrAgent，例如 ocrAgent.initOcr()这样调用
- 目前的OCR包含了 appleVision

:::tip

- 这个模块运算是在手机内执行的，数据也是存在手机内
-  9.0.0+以后新增了多ocr实例函数，并且支持 appleVision、ocrlite、paddliteOnnxOcr三种，具体请看newOcr函数
-  9.8.0+ 新增了paddleOcrNcnnV5支持
:::


## ocrAgent.releaseAll 释放所有实例
* 释放所有实例
* 适配EC 9.0.0+
```javascript
//请看代码例子
```

## ocrAgent.initOcr 初始化

* 初始化OCR模块
* @param map map参数表
* key分别为：
* type : OCR类型，值分别为 appleVision = ios自带的Vision模块
* 如果类型是 appleVision, 参数设置为 : ```{"type":"appleVision","level":"fast","languages":"zh-Hans,en-US"}```<br/>
* level: fast,代表快速的，accurate:代表精准的
* languages: 识别的语言，默认是zh-Hans,en-US中文简体和英文，
* 支持的有 ```["en-US", "fr-FR", "it-IT", "de-DE", "es-ES", "pt-BR", "zh-Hans", "zh-Hant"]```
* @return `{bool}` 布尔型 成功或者失败

- appleVision OCR例子

```javascript showLineNumbers
function main() {
  
    let appleVision = {
        "type": "appleVision"
    }
  ocrAgent.releaseAll()
  let inited = ocrAgent.initOcr(appleVision)
    logd("初始化结果 -" + inited);
    if (!inited) {
        loge("error : " + ocrAgent.getErrorMsg());
        return;
    }

    for (var ix = 0; ix < 20; ix++) {

        //读取一个bitmap
        let img = imageAgent.captureFullScreen();
        if (!img) {
            loge("读取图片失败");
            continue;
        }
        console.time("1")
        logd("start---ocr");
        // 对图片进行识别
        let result = ocrAgent.ocrImage(img, 20 * 1000, {});
        logd(result)
        if (result) {
            logd("ocr结果-》 " + JSON.stringify(result));
            for (var i = 0; i < result.length; i++) {
                var value = result[i];
                logd("文字 : " + value.label + " x: " + value.x + " y: " + value.y + " width: " + value.width + " height: " + value.height);
            }
        } else {
            logw("未识别到结果");
        }

        logd("耗时: " + console.timeEnd(1) + " ms")
        imageAgent.recycle(img)
        sleep(1000);
        logd("ix = " + ix)
    }
    //释放所有资源
    ocrAgent.releaseAll();
}

main();
```

## ocrAgent.ocrImage 识别文字

* 对 AutoImage 进行OCR，返回的是JSON数据，其中数据类似于与：

```json showLineNumbers
  [
  {
    "label": "奇趣装扮三阶盘化",
    "confidence": 0.48334712,
    "x": 11,
    "y": 25,
    "width": 100,
    "height": 100
  }
]
```

* label: 代表是识别的文字
* confidence：代表识别的准确度
* x: 代表X开始坐标
* Y: 代表Y开始坐标
* width: 代表宽度
* height: 代表高度
* @param bitmap 图片
* @param timeout 超时时间 单位毫秒
* @param extra 扩展参数，map形式，例如 ```{"token":"xxx"}```
* @return `{json}` JSON对象

```javascript showLineNumbers
代码例子常见
OCR初始化
```

## ocr.getErrorMsg 获取错误消息

* 获取OCR错误消息
*
* @return `{string}` null代表没有错误

```javascript showLineNumbers
代码例子常见
OCR初始化
```

## ocrAgent.releaseAllEx 释放OCR资源

* 释放OCR占用的资源
*
* @return `{bool}` 成功或者失败

```javascript showLineNumbers
代码例子常见
OCR初始化
```


## 多实例OCR模式
### ocrAgent.newOcr 实例化
* 生成一个ocr实例
* @return `{OcrInstAgent|null}`
```javascript showLineNumbers
代码例子常见
OCR初始化
```


### initOcr 初始化OCR
* 初始化OCR模块
* @param map map参数表
* key分别为：<br/>
* type : OCR类型，值分别为 paddleOcrNcnnV5=NCNN版本的ppocr-v5模型， ocrLite = ocrLite, paddleLiteOcr=paddleLite appleVision = ios自带的Vision模块<br/>
* 如果类型是 `appleVision`
  * 参数设置为 : `{"ocrType":"appleVision","level":"fast","languages":"zh-Hans,en-US"}`<br/>
  * level: fast,代表快速的，accurate:代表精准的
  * languages: 识别的语言，默认是zh-Hans,en-US中文简体和英文，
  * 支持的有 ["en-US", "fr-FR", "it-IT", "de-DE", "es-ES", "pt-BR", "zh-Hans", "zh-Hant"]
* 如果类型是 paddleNcnnOcrV5，参数设置如下
  * numThread: 线程数量，-1 等于全部，-2 等于设备CPU的一半，0代表不设置，识别速度可以用这个值调整
  * modelsDir: 模型的路径文件路径。默认不写就使用自带的
  * padding: 图像外接白框，用于提升识别率，文字框没有正确框住所有文字时，增加此值。默认 32，识别速度可以用这个值调整
  * maxSideLen 如果输入图像的最大边大于max_side_len，则会按宽高比，将最大边缩放到max_side_len。默认为 640，识别速度可以用这个值调整
  * keysName: 训练的文字标签文件名称，可以是外部的 例如 keys.txt，默认自带有模型 不写这一项即可
  * detName: 检测模型文件名，param 结尾的文件名称，放到 modelsDir 参数的路径下，名字叫det.param就写det，不用带param后缀，默认自带有模型 不写这一项即可
  * recName: 识别模型文件名，onnx 结尾的文件名称，放到 modelsDir 参数的路径下，名字叫rec.param就写det，不用带param后缀，默认自带有模型 不写这一项即可
* 如果类型是 `paddleLiteOcr`, paddleLiteOcr = paddleLite，paddleOnnxOcr = onnxrntime的ppocr-v5的模型实现， 注意 由于onnxruntime和paddlelite冲突，使用onnx重写了paddlelite底层实现,
  * 参数设置为 `{"ocrType":"paddleLiteOcr","cpuThreadNum":2}`
  *  参数解释：
  *  cpuThreadNum 使用的CPU线程数，如果不知道 不写即可，-1 代表全部cpu数量，-2 代表cpu数量的一半
  *  modelPath： 模型路径，如果是外部路径例如 /sdcard/models/代表是sdcard下面的，默认自带有模型 不写这一项即可
  *  labelPath: 训练的文字标签文件路径，可以是外部的 例如 /sdcard/labels/ppocr_keys_v1.txt，默认自带有模型 不写这一项即可
  *  detModelFilename: 检测模型文件名，onnx 结尾的文件名称，放到 modelPath 参数的路径下，默认自带有模型 不写这一项即可
  *  recModelFilename: 识别模型文件名，onnx 结尾的文件名称，放到 modelPath 参数的路径下，默认自带有模型 不写这一项即可
  *  clsModelFilename: 分类模型文件名，onnx 结尾的文件名称，放到 modelPath 参数的路径下，默认自带有模型 不写这一项即可
  *  padding 图像外接白框，用于提升识别率，文字框没有正确框住所有文字时，增加此值。默认 10。
  *  boxThresh 图像中文字部分和背景部分分割阈值。值越大，文字部分会越小。取值范围：[0, 1]，默认值为0.3。
  *  boxScoreThresh 文本检测所得框是否保留的阈值，值越大，召回率越低。取值范围：[0, 1]，默认值为0.5。
  *  unClipRatio 控制文本检测框的大小，值越大，检测框整体越大。取值范围：[1.6, 2.0]，默认值为 1.6。
  *  doAngle 1启用(1)/禁用(0) 文字方向检测，只有图片倒置的情况下(旋转90~270度的图片)，才需要启用文字方向检测，默认1
  *  mostAngle 启用(1)/禁用(0) 角度投票(整张图片以最大可能文字方向来识别)，当禁用文字方向检测时，此项也不起作用，默认1
  *  maxSideLen 如果输入图像的最大边大于max_side_len，则会按宽高比，将最大边缩放到max_side_len。默认为 960
* 如果类型是 `ocrLite`,
  *  参数设置为 : `{"ocrType":"ocrLite","numThread":2,"padding":10,"maxSideLen":0}`<br/>
  *  numThread: 线程数量。 <br/>
  *  padding: 图像预处理，在图片外周添加白边，用于提升识别率，文字框没有正确框住所有文字时，增加此值。<br/>
  *  maxSideLen: 按图片最长边的长度，此值为0代表不缩放，例：1024，如果图片长边大于1024则把图像整体缩小到1024再进行图像分割计算，如果图片长边小于1024则不缩放，如果图片长边小于32，则缩放到32。<br/>
* @return `{boolean}` 布尔型 成功或者失败

```javascript showLineNumbers
function usbagentocr() {
  ocrAgent.releaseAll()
  let ocrInstance = ocrAgent.newOcr();
  logd(ocrInstance.ocrId)
  //numThread 不能太大，否则可能无法识别
  let ocrLiteConfig = {"ocrType": "ocrLite", "numThread": 2, "padding": 10, "maxSideLen": 960}
  // apple vision 配置参数
  let appleVisionConfig = {"ocrType": "appleVision", "level": "accurate", "languages": "zh-Hans,en-US"}
  // paddleOnnxOcr 配置参数
  let paddleOnnxOcrConfig = {"ocrType": "paddleOnnxOcr", "cpuThreadNum": 2, "padding": 10, "maxSideLen": 960}

  // 如果你要paddleonnx自定义模型 就使用上传文件到 agent，返回了文件路径 然后放到参数中 给系统加载
  // let keysFilePath = utils.uploadAgentFile("/Volumes/dev/ppocrv5_mobile_labels.txt", "ppocrv5_mobile_labels.txt")
  // let clsFilePath = utils.uploadAgentFile("/Volumes/dev/ch_ppocr_mobile_v2.0_cls_infer.onnx", "cls.txt")
  // let detFilePath = utils.uploadAgentFile("/Volumes/dev/ch_PP-OCRv5_mobile_det.onnx", "det.txt")
  // let recFilePath = utils.uploadAgentFile("/Volumes/dev/ch_PP-OCRv5_rec_mobile_infer.onnx", "rec.txt")
  // logd("自定义 keysFilePath " + keysFilePath)
  // logd("自定义 clsFilePath " + clsFilePath)
  // logd("自定义 detFilePath " + detFilePath)
  // logd("自定义 recFilePath " + recFilePath)
  // modelPath 就写labels路径就行
  // paddleOnnxOcrConfig["modelPath"] = keysFilePath
  // paddleOnnxOcrConfig["labelPath"] = keysFilePath
  // paddleOnnxOcrConfig["clsModelFilename"] = clsFilePath
  // paddleOnnxOcrConfig["detModelFilename"] = detFilePath
  // paddleOnnxOcrConfig["recModelFilename"] = recFilePath


  let initResult = ocrInstance.initOcr(ocrLiteConfig)


  logd("initResult " + initResult)
  if (!initResult) {
    logd("errorMsg:" + ocrInstance.getErrorMsg())
  } else {
    for (let i = 0; i < 10; i++) {
      let img = imageAgent.captureFullScreen();
      logd("img " + img)
      if (img) {
        console.time(1)
        let result = ocrInstance.ocrImage(img, 20000, {});
        let goTime = console.timeEnd(1)
        logd("耗时 " + goTime + " 结果  " + JSON.stringify(result))
        if (result) {
          for (let j = 0; j < result.length; j++) {
            let rs = result[j];
            console.log("label: {} confidence:{} 范围: {},{},{},{}", rs.label, rs.confidence, rs.x, rs.y, (rs.x + rs.width), (rs.y + rs.height))
          }
        }
      }

      imageAgent.recycle(img)
    }
  }
  ocrInstance.releaseAll();
}
usbagentocr()
```


### PaddleNcnnOcrV5例子
```javascript showLineNumbers
function usbagentocr() {
  ocrAgent.releaseAll()
  let ocrInstance = ocrAgent.newOcr();
  logd(ocrInstance.ocrId)
  //  配置参数
  let paddleNcnnOcrConfig = {"ocrType": "paddleNcnnOcrV5", "cpuThreadNum": 2, "padding": 32, "maxSideLen": 640}

  // 如果你要 paddleNcnnOcrV5 自定义模型 就使用上传文件到 agent，返回了文件路径 然后放到参数中 给系统加载
  // let keysFilePath = utils.uploadAgentFile("/Volumes/dev/keys.txt", "keys.txt")
  // let detParamFilePath = utils.uploadAgentFile("/Volumes/dev/det.ncnn.param", "det.ncnn.param")
  // let detBinFilePath = utils.uploadAgentFile("/Volumes/dev/det.ncnn.bin", "det.ncnn.bin")
  // let recParamFilePath = utils.uploadAgentFile("/Volumes/dev/rec.ncnn.param", "rec.ncnn.param")
  // let recBinFilePath = utils.uploadAgentFile("/Volumes/dev/rec.ncnn.bin", "rec.ncnn.bin")
  // logd("自定义 keysFilePath " + keysFilePath)
  // logd("自定义 detParamFilePath " + detParamFilePath)
  // logd("自定义 detBinFilePath " + detBinFilePath)
  // logd("自定义 recParamFilePath " + recFilePath)
  // logd("自定义 recBinFilePath " + recBinFilePath)
  // modelDirs 就写labels路径就行
  // paddleOnnxOcrConfig["modelDirs"] = keysFilePath
  // paddleOnnxOcrConfig["keysName"] = keys.txt
  // paddleOnnxOcrConfig["detName"] = "det.ncnn"
  // paddleOnnxOcrConfig["recName"] = "rec.ncnn"


  let initResult = ocrInstance.initOcr(paddleNcnnOcrConfig)

  logd("initResult " + initResult)
  if (!initResult) {
    logd("errorMsg:" + ocrInstance.getErrorMsg())
  } else {
    for (let i = 0; i < 10; i++) {
      let img = imageAgent.captureFullScreen();
      logd("img " + img)
      if (img) {
        console.time(1)
        let result = ocrInstance.ocrImage(img, 20000, {"paddinng":32,"numThread":1});
        let goTime = console.timeEnd(1)
        logd("耗时 " + goTime + " 结果  " + JSON.stringify(result))
        if (result) {
          for (let j = 0; j < result.length; j++) {
            let rs = result[j];
            console.log("label: {} confidence:{} 范围: {},{},{},{}", rs.label, rs.confidence, rs.x, rs.y, (rs.x + rs.width), (rs.y + rs.height))
          }
        }
      }

      imageAgent.recycle(img)
    }
  }
  ocrInstance.releaseAll();
}
usbagentocr()
```

### ocrImage 获取错误信息
* ocr识别图像
* @param img AutoImage对象
* @param timeout 超时时间
* @param extra 参数JSON 默认写 `{}`
* @return `{null|JSON} `JSON对象
```javascript showLineNumbers
代码例子常见
OCR初始化
```



### getErrorMsg 获取错误信息
* 获取错误消息
* @return `{string}` null代表没有错误
```javascript showLineNumbers
代码例子常见
OCR初始化
```


### releaseAll 获取错误信息
* 释放OCR占用的资源
* @return `{boolean}` 成功或者失败
```javascript showLineNumbers
代码例子常见
OCR初始化
```


