---
title: OCR识别
description: EasyClick 自动化脚本 iOS免越狱 OCR识别 资源下载
keywords:
  - EasyClick 自动化脚本 iOS免越狱 OCR识别 资源下载
  - OCR
  - ocr
  - initOcr
  - appleVision
  - ocrImage
  - ocrMut
  - releaseAll
  - map
  - getErrorMsg
  - TesseractOcr
  - EasyClick
  - 手机自动化
  - 自动化测试
  - 脚本开发
  - 安卓自动化
  - iOS自动化
  - 鸿蒙Next
---


:::tip

- OCR模块是属于对图像进行识别
- OCR模块的对象前缀是ocr，例如 ocr.initOcr()这样调用
- 目前的OCR包含了 appleVision
- 3.18.0+ 新增了ocrMut作为多实例模式的ocr前缀
- 5.12.0 新增了paddleLiteOcr
- 5.21.0 新增了paddleNcnnOcrV5
:::

## 单实例模式

### ocr.initOcr 初始化

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
  let appleVision = {"type": "appleVision", "level": "accurate", "languages": "zh-Hans,en-US"}
  let inited = ocr.initOcr(appleVision)
  logd("初始化结果 -" + inited);
  if (!inited) {
    loge("error : " + ocr.getErrorMsg());
    return;
  }
  for (var ix = 0; ix < 20; ix++) {
    //读取一个bitmap
    let img = image.captureFullScreen();
    if (img == null || img == undefined || img.uuid == null || img.uuid == undefined || img.uuid == "") {
      loge("读取图片失败");
      continue;
    }
    console.time("1")
    logd("start---ocr");
    // 对图片进行识别
    let result = ocr.ocrImage(img, 20 * 1000, {});
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
    image.recycle(img)
    sleep(1000);
    logd("ix = " + ix)
  }
  //释放所有资源
  ocr.releaseAll();
}

main();
```

### ocr.ocrImage 识别文字

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
* @return `{JSON}` JSON对象

```javascript showLineNumbers
代码例子常见
OCR初始化
```

### ocr.getErrorMsg 获取错误消息

* 获取OCR错误消息
*
* @return `{string}` null代表没有错误

```javascript showLineNumbers
代码例子常见
OCR初始化
```

### ocr.releaseAll 释放OCR资源

* 释放OCR占用的资源
*
* @return `{bool}` 成功或者失败

```javascript showLineNumbers
代码例子常见
OCR初始化
```

## 多实例模式

### ocrMut.releaseAll 释放所有
* EC 脱机 5.17.0+
```javascript
// 见代码例子
```

### ocrMut.initOcr 初始化

* 初始化OCR模块
* @param map map参数表
* key分别为：
* type : OCR类型，值分别为 appleVision = ios自带的Vision模块 tess = TesseractOcr, ocrLite=ncnn神经网络的ocrLite ,
  paddleOcrOnline = EC自带的PC端的paddleOcr服务程序,paddleLiteOcr = paddleLite，paddleNcnnOcrV5=ncnn版本的paddleocr，paddleOnnxOcr = onnxruntime的ppocr-v5的模型实现
* 如果类型是 appleVision, 参数设置为 : ```{"type":"appleVision","level":"fast","languages":"zh-Hans,en-US"}```<br/>
  * level: fast,代表快速的，accurate:代表精准的<br/>
  * languages: 识别的语言，默认是zh-Hans,en-US中文简体和英文，<br/>
  * 支持的有 ```["en-US", "fr-FR", "it-IT", "de-DE", "es-ES", "pt-BR", "zh-Hans", "zh-Hant"]```<br/>
    paddleLiteOcr = paddleLite，paddleOnnxOcr = onnxrntime的ppocr-v5的模型实现，
 
* 如果类型是`paddleLiteOcr`, paddleLiteOcr = paddleLite，paddleOnnxOcr = onnxrntime的ppocr-v5的模型实现，
  * 注意 5.16+由于onnxruntime和paddlelite冲突，使用onnx重写了paddlelite底层实现,
  * 如果是 paddleLiteOcr或者paddleOnnxOcr，参数如下 `{"type":"paddleLiteOcr","cpuThreadNum":2}`
  * cpuThreadNum 使用的CPU线程数，如果不知道 不写即可，-1 代表全部cpu数量，-2 代表cpu数量的一半，识别速度可以用这个值调整
  * modelPath： 模型路径，如果是外部路径例如 /sdcard/models/代表是sdcard下面的，默认自带有模型 不写这一项即可
  * labelPath: 训练的文字标签文件路径，可以是外部的 例如 /sdcard/labels/ppocr_keys_v1.txt，默认自带有模型 不写这一项即可
  * detModelFilename: 检测模型文件名，onnx 结尾的文件名称，放到 modelPath 参数的路径下，默认自带有模型 不写这一项即可
  * recModelFilename: 识别模型文件名，onnx 结尾的文件名称，放到 modelPath 参数的路径下，默认自带有模型 不写这一项即可
  * clsModelFilename: 分类模型文件名，onnx 结尾的文件名称，放到 modelPath 参数的路径下，默认自带有模型 不写这一项即可
  * padding 图像外接白框，用于提升识别率，文字框没有正确框住所有文字时，增加此值。默认 10。识别速度可以用这个值调整
  * boxThresh 图像中文字部分和背景部分分割阈值。值越大，文字部分会越小。取值范围：[0, 1]，默认值为0.3。
  * boxScoreThresh 文本检测所得框是否保留的阈值，值越大，召回率越低。取值范围：[0, 1]，默认值为0.5。
  * unClipRatio 控制文本检测框的大小，值越大，检测框整体越大。取值范围：[1.6, 2.0]，默认值为 1.6。
  * doAngle 1启用(1)/禁用(0) 文字方向检测，只有图片倒置的情况下(旋转90~270度的图片)，才需要启用文字方向检测，默认1
  * mostAngle 启用(1)/禁用(0) 角度投票(整张图片以最大可能文字方向来识别)，当禁用文字方向检测时，此项也不起作用，默认1
  * maxSideLen 如果输入图像的最大边大于max_side_len，则会按宽高比，将最大边缩放到max_side_len。默认为 960，识别速度可以用这个值调整
* 如果类型是 paddleNcnnOcrV5，参数设置如下
  * numThread: 线程数量，-1 等于全部，-2 等于设备CPU的一半，0代表不设置，识别速度可以用这个值调整
  * modelsDir: 模型的路径文件路径。默认不写就使用自带的
  * padding: 图像外接白框，用于提升识别率，文字框没有正确框住所有文字时，增加此值。默认 32，识别速度可以用这个值调整
  * maxSideLen 如果输入图像的最大边大于max_side_len，则会按宽高比，将最大边缩放到max_side_len。默认为 640，识别速度可以用这个值调整
  * keysName: 训练的文字标签文件名称，可以是外部的 例如 keys.txt，默认自带有模型 不写这一项即可
  * detName: 检测模型文件名，param 结尾的文件名称，放到 modelsDir 参数的路径下，名字叫det.param就写det，不用带param后缀，默认自带有模型 不写这一项即可
  * recName: 识别模型文件名，onnx 结尾的文件名称，放到 modelsDir 参数的路径下，名字叫rec.param就写det，不用带param后缀，默认自带有模型 不写这一项即可
* 如果类型是 `tess`
  * 参数设置为 : `{"type":"tess",path:"","rillevel":2,"language":"eng+chi_sim"}`<br/>
  * path: TesseractOcr的traineddata文件夹路径，例如/Application/tessdata，最好是使用file模块复制到sandbox文件夹下，参考例子
  * language: TesseractOcr 的 要识别的语言数据集文件，例如 chi_sim.traineddata 代表是中文简体语言，参数就填写
    chi_sim,多个可以用+链接，例如:chi_sim+eng+num，多个请用+链接，例如eng+chi_sim代表TesseractOcr官方的英文和简体中文，自动寻找path文件夹下的traineddata文件
  * rilLevel: PageIteratorLevel 参数，-1 自适应， 0: RIL_BLOCK, 1: RIL_PARA, 2: RIL_TEXTLINE, 3: RIL_WORD, 4:RIL_SYMBOL
  * ocrEngineMode: 识别引擎类型，0 OEM_TESSERACT_ONLY ， 1 OEM_LSTM_ONLY,2 OEM_TESSERACT_LSTM_COMBINED,3 OEM_DEFAULT
  * tessedit_char_blacklist: 黑名单
  * tessedit_char_whitelist: 白名单

* 如果类型设置是: `ocrLite`，参数为:<br/>

```json showLineNumbers
   {
  "type": "ocrLite",
  "padding": 10,
  "maxSideLen": 0,
  "boxScoreThresh": 0.6,
  "boxThresh": 0.3,
  "unClipRatio": 1.6,
  "doAngle": 0,
  "mostAngle": 0
}
```

```text
* numThread: 线程数量，-1 等于全部，-2 等于设备CPU的一半，0代表不设置，程序自定义，建议设置为-2
*  padding 图像外接白框，用于提升识别率，文字框没有正确框住所有文字时，增加此值。默认50。<br/>
*  maxSideLen 按图像长边进行总体缩放，放大增加识别耗时但精度更高，缩小减小耗时但精度降低，maxSideLen为0表示不缩放。<br/>
*  boxScoreThresh 文字框置信度门限，文字框没有正确框住所有文字时，减小此值 <br/>
*  boxThresh 同上，自行试验。<br/>
*  unClipRatio 单个文字框大小倍率，越大时单个文字框越大。<br/>
*  doAngle 启用(1)/禁用(0) 文字方向检测，只有图片倒置的情况下(旋转90~270度的图片)，才需要启用文字方向检测，默认关闭。<br/>
*  mostAngle 启用(1)/禁用(0) 角度投票(整张图片以最大可能文字方向来识别)，当禁用文字方向检测时，此项也不起作用，默认关闭。<br/>
```

* 如果类型设置为: `paddleOcrOnline` 请到网盘中下载**EasyClick-PaddleOcr.zip文件解压运行**<br/>

```json showLineNumbers
  {
  "type": "paddleOcrOnline",
  "ocrType": "ONNX_PPOCR_V3",
  "padding": 50,
  "maxSideLen": 0,
  "boxScoreThresh": 0.5,
  "boxThresh": 0.3,
  "unClipRatio": 1.6,
  "doAngleFlag": 0,
  "mostAngleFlag": 0
}
```

```text
*  ocrType : 模型 ONNX_PPOCR_V3,ONNX_PPOCR_V4,NCNN_PPOCR_V3
*  serverUrl：paddle ocr服务器地址，可以在其他电脑部署，然后中控链接，例如 192.168.2.8:9022，部署在电脑就改ip地址即可，端口是 9022 可以不写
*  padding 图像外接白框，用于提升识别率，文字框没有正确框住所有文字时，增加此值。默认50。<br/>
*  maxSideLen 按图像长边进行总体缩放，放大增加识别耗时但精度更高，缩小减小耗时但精度降低，maxSideLen为0表示不缩放。<br/>
*  boxScoreThresh 文字框置信度门限，文字框没有正确框住所有文字时，减小此值 <br/>
*  boxThresh 同上，自行试验。<br/>
*  unClipRatio 单个文字框大小倍率，越大时单个文字框越大。<br/>
*  doAngleFlag 启用(1)/禁用(0) 文字方向检测，只有图片倒置的情况下(旋转90~270度的图片)，才需要启用文字方向检测，默认关闭。<br/>
*  mostAngleFlag 启用(1)/禁用(0) 角度投票(整张图片以最大可能文字方向来识别)，当禁用文字方向检测时，此项也不起作用，默认关闭。<br/>
*  limit 代表每1秒执行ocr请求个数 默认1000。可以适当降低减少cpu占用<br/>
*  checkImage 检查数据是否是图像(1是 0否)默认关闭。<br/>
```

* @return `{bool}` 布尔型 成功或者失败

```javascript showLineNumbers
function main() {
    //开头 释放所有ocr资源，防止之前未释放的资源占用
    ocrMut.releaseAll();
    logd("开始执行脚本...")

    // 初始化一个实例
    let ocrtest = ocrMut.newOcr();
    let vision = {"type": "appleVision", "level": "accurate", "languages": "zh-Hans,en-US"}
    //paddleOcr参数
    let paddleOcrOnline = {
        "type": "paddleOcrOnline",
        "ocrType": "ONNX_PPOCR_V3",
        "serverUrl": "192.168.2.13:9022",
        "limit": 12,
        "checkImage": "1",
        "padding": 200
    }
    let ocrLite = {"type": "ocrLite","numThread":2}
    let paddleLiteOcrMap = {"type": "paddleLiteOcr","cpuThreadNum":2,"cpuPowerMode":"LITE_POWER_FULL"}
    let inited = ocrtest.initOcr(ocrLite)
    // let inited = ocrtest.initOcr(paddleLiteOcrMap)
    if (!inited) {
        loge("inited ocr error : " + ocrtest.getErrorMsg())
        return
    } else {
        logd("ocr inited ok")
    }
    for (let i = 0; i < 3; i++) {
        let img = image.captureFullScreen()
        let ocrResult = ocrtest.ocrImage(img, 20000, null)
        logd("ocrResult " + JSON.stringify(ocrResult));
        if (ocrResult) {
            logd("ocr结果-》 " + JSON.stringify(ocrResult));
            for (var j = 0; j < ocrResult.length; j++) {
                var value = ocrResult[j];
                logd("文字 : " + value.label + " x: " + value.x + " y: " + value.y + " width: " + value.width + " height: " + value.height);
            }
        } else {
            logw("未识别到结果");
        }
        image.recycle(img)

        sleep(2000)
    }
    //脚本运行完成了释放即可 不需要每次用完都释放
    ocrtest.releaseAll()
}

main();
```

### TesseractOcr 例子

```javascript showLineNumbers
function main() {
  //开头 释放所有ocr资源，防止之前未释放的资源占用
  ocrMut.releaseAll();
  logd("Start")
  let ts = file.getSandBoxDir()
  let tessdataDir = ts + "/tessdata"
  logd("tessdataDir=> ", tessdataDir)
  file.mkdirs(tessdataDir)
  //保存数据集 traineddata 放到res文件夹下 自动复制到  tessdataDir
  // 复制英文数据集
  let saved = saveResToFile("eng.traineddata", tessdataDir + "/eng.traineddata")
  // 复制中文数据集
  let saved2 = saveResToFile("chi_sim.traineddata", tessdataDir + "/chi_sim.traineddata")
  logd("saved ", saved)
  if (!saved) {
    logd("copy eng error")
    return;
  }
  if (!saved2) {
    logd("copy chi_sim error")
    return;
  }
  let tessocr = ocrMut.newOcr()
  // 初始话 中文+英文
  let intx = tessocr.initOcr({
    "type": "ocrLite",
    "path": tessdataDir,
    "language": "eng+chi_sim",
    "rilLevel": 2,
  })

  logd("tessocr initOcr " + intx)
  if (!intx) {
    logd(tessocr.getErrorMsg());
    return
  }

  for (let i = 0; i < 10; i++) {
    // 这里可以改为截图
    //let aa = image.captureFullScreen();
    let aa = readResAutoImage("2.png")

    console.time(1)
    let rse = tessocr.ocrImage(aa, 10 * 1000, {})
    logd("消耗时间 time - ", console.timeEnd(1))
    image.recycle(aa)

    logd(JSON.stringify(rse));
    for (let i = 0; i < rse.length; i++) {
      let a = rse[i]
      logd(JSON.stringify(a))
      let b = a.x + "," + a.y + "," + (a.x + a.width) + "," + (a.y + a.height)
      logd(a.label, b)
    }

  }

  tessocr.releaseAll()

  logd("end--")
}


main();
```



### PaddleOnnxOcr 例子

```javascript showLineNumbers
function main() {
  //开头 释放所有ocr资源，防止之前未释放的资源占用
  ocrMut.releaseAll();
  logd("开始执行脚本...")
  let ocrtest = ocrMut.newOcr()
  let modelPath = file.getSandBoxFilePath("")
  let labelPath = file.getSandBoxFilePath("ppocrv5_mobile_labels.txt")
  let detModelFilename = "ch_PP-OCRv5_mobile_det.onnx"
  let recModelFilename = "ch_PP-OCRv5_rec_mobile_infer.onnx"
  let clsModelFilename = "ch_ppocr_mobile_v2.0_cls_infer.onnx"
  // 内部自带的ocr模型
  let paddleOnnxOcrMap1 = {"type": "paddleOnnxOcr", "cpuThreadNum": 2, "padding": 10, "maxSideLen": 960}

  // 使用外部的模型
  let paddleOnnxOcrMap2 = {
    "type": "paddleOnnxOcr", "cpuThreadNum": 2, "padding": 10, "maxSideLen": 960,
    "modelPath": modelPath,
    "labelPath": labelPath,
    "detModelFilename": detModelFilename,
    "recModelFilename": recModelFilename,
    "clsModelFilename": clsModelFilename,
  }
  let inited = ocrtest.initOcr(paddleOnnxOcrMap1)
  if (!inited) {
    loge("inited ocr error : " + ocrtest.getErrorMsg())
    return
  } else {
    logd("ocr inited ok")
  }
  for (let i = 0; i < 100; i++) {
    let img = image.captureFullScreen()


    console.time(1)

    let ocrResult = ocrtest.ocrImage(img, 20000, {"cpuThreadNum": 2, "padding": 10, "maxSideLen": 960})

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


main()
```



### PaddleNcnnOcrV5 例子

```javascript showLineNumbers
function main() {
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
  for (let i = 0; i < 100; i++) {
    let img = image.captureFullScreen()


    console.time(1)

    // 这里也可以设置动态的参数
    let ocrResult = ocrtest.ocrImage(img, 20000, {"numThread":2,"padding":32})

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


main()
```


### ocrInstance.ocrImage 识别文字

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
* @return `{JSON}` JSON对象

```javascript showLineNumbers
代码例子常见
OCR初始化
```

### ocrInstance.getErrorMsg 获取错误消息

* 获取OCR错误消息
*
* @return `{string}` null代表没有错误

```javascript showLineNumbers
代码例子常见
OCR初始化
```

### ocrInstance.releaseAll 释放OCR资源

* 释放OCR占用的资源
*
* @return `{bool}` 成功或者失败

```javascript showLineNumbers
代码例子常见
OCR初始化
```

## PaddleOcrOnline Http调用

- 低于3.18.0+的EC，可以通过HTTP方式调用ocr
- 前提是需要下载**EasyClick-PaddleOcr.zip文件解压运行**

```javascript showLineNumbers
function httpPaddleOcr(filePath) {
  // ocr的服务地址
  // 其他参数参考上面的说明
  let url = "http://192.168.2.13:9022/devapi/uploadOcr"
  let ocrType = "ONNX_PPOCR_V3"
  let limit = "1000"
  let ocrParam = {
    "padding": 50,
    "maxSideLen": 0,
    "boxScoreThresh": 0.5,
    "boxThresh": 0.3,
    "unClipRatio": 1.6,
    "doAngleFlag": 0,
    "mostAngleFlag": 0
  }
  ocrParam = utils.base64Encode(JSON.stringify(ocrParam));
  let param = {
    "ocrType": ocrType,
    "limit": limit,
    "ocrParam": ocrParam
  };
  let files = {
    "file": filePath
  }
  let result = http.httpPost(url, param, files, 20 * 1000, {"User-Agent": "test"});
  if (result == null || result == undefined || result == "") {
    return null;
  }

  try {
    result = JSON.parse(result)
    return result["data"]
  } catch (e) {
    return null;
  }

}

function callPaddleOcrTest() {
  let img = image.captureFullScreen()
  if (!img) {
    loge("截图失败");
    return
  }
  let filePath = file.getSandBoxFilePath("ocrtmp.jpg")
  image.saveTo(img, filePath)
  let result = httpPaddleOcr(filePath);
  logd("result " + JSON.stringify(result));


}

callPaddleOcrTest()
```

