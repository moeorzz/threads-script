---
title: YOLO函数-手机内执行
description: EasyClick 自动化脚本 iOS免越狱 YOLO函数 资源下载
keywords:
  - EasyClick 自动化脚本 iOS免越狱 YOLO函数 资源下载
  - yolov8
  - yolov8Agent
  - Yolov8AgentUtil
  - onnx
  - ONNX
  - EC
  - 9.0.0
  - YOLO
  - releaseAll
  - newYolov8
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
- [YOLO使用说明](/docs/zh-cn/advance/yolov8) 请看安卓版本的，训练教程都是一样
- yolov8Agent模块是属于对yolo识别模块进行识别
- 该模块运行在手机中，利用手机的算力，减少电脑的消耗
:::


## yolov8Agent.releaseAll 释放所有实例
* 释放所有实例
* 适配EC 9.0.0+
```javascript
// 请看代码例子
```

## yolov8Agent.newYolov8 初始化yolov8实例

* 初始化yolov8实例
* 适配EC 9.0.0+
* @return  `Yolov8AgentUtil` 对象

```javascript showLineNumbers
function yoloagenttest2() {
  yolov8Agent.releaseAll()
  let yoloInstance = yolov8Agent.newYolov8()
  logd("yoloInstance " + yoloInstance.yolov8AgentId)
  let config = yoloInstance.getDefaultConfig("yolov8s-640", 640, 0.25,
    0.35, "ALL", 0, ["aixin", "pinglun"])
  config["num_thread"] = 1;
  logd("Start upload model file...")
  // 上传模型文件到 agent中，让yolo初始化
  let paramPath = utils.uploadAgentFile("/Users/x/iosidea/tjyolo/src/res/model.ncnn.param", "model2.ncnn.param")
  let binPath = utils.uploadAgentFile("/Users/x/iosidea/tjyolo/src/res/model.ncnn.bin", "model2.ncnn.bin")
  let ok = yoloInstance.initYoloModel(config, paramPath, binPath)
  if (!ok) {
    console.log("err " + yoloInstance.getErrorMsg())
    return;
  }
  //上传图片到agent中，用来识别 也可以使用 imageAgent模块的截图函数截屏识别
  let img = utils.uploadToAutoImage("/Users/x/iosidea/yolo-onnx/src/res/1.png")
  logd("img -> " + img)
  for (let i = 0; i < 10; i++) {
    console.time(1)
    let result = yoloInstance.detectImage(img, [])
    logd("result " + console.timeEnd(1) + " ms ---> " + result)
  }
  imageAgent.recycle(img)
  yoloInstance.release();

}

yoloagenttest2();
```

## yolov8Agent.newYolov8Onxx 初始化yolov8 onnx 实例,支持多实例

* 初始化yolov8 onnx 实例
* 适配EC 9.0.0+
* @return  `Yolov8AgentUtil` 实例对象

```javascript showLineNumbers
function yoloagenttest() {
  yolov8Agent.releaseAll()
  let yoloOnnxInstance = yolov8Agent.newYolov8Onnx()

  logd("yoloOnnxInstance " + yoloOnnxInstance.yolov8AgentId)
  let onnxConfig = yoloOnnxInstance.getOnnxConfig(["aixin", "pinglun"], 0, 0, 0.35, 0.55, -1)
  logd("Start upload onnx file...")
  // 上传模型文件 并且初始化 
  let onnxPath = utils.uploadAgentFile("/Users/x/iosidea/yolo-onnx/src/res/best.onnx", "onnx.onnx")
  let onnxOk = yoloOnnxInstance.initYoloModel(onnxConfig, onnxPath, "")
  if (!onnxOk) {
    console.log("err " + yoloOnnxInstance.getErrorMsg())
    return;
  }
  let img = utils.uploadToAutoImage("/Users/x/iosidea/yolo-onnx/src/res/1.png")
  logd("img -> " + img)

  for (let i = 0; i < 10; i++) {
    console.time(1)
    let result = yoloOnnxInstance.detectImage(img, ["aixin"])
    logd("result " + console.timeEnd(1) + " ms ---> " + result)
  }

  imageAgent.recycle(img)

  yoloOnnxInstance.release();

}

yoloagenttest();
```

## Yolov8AgentUtil.getOnnxConfig ONNX的配置选项

* ONNX的配置选项
* @param obj_names obj_names JSON数组，可以不写的情况下，onnx从模型中获取，训练的时候分类名称例如 ["star","common","face"]
* @param input_width 训练的图片尺寸宽度，写0 就是onnx自己提取
* @param input_height 训练的图片尺寸高度，写0 就是onnx自己提取
* @param confThreshold 指在ONNX模型推理过程中用于确定检测目标的最小置信度阈值
* @param iouThreshold 阈值在ONNX模型中用于确定检测框的重叠程度，通常用于非极大值抑制（NMS）过程中
* @param numThread 线程数量 一般为cpu个数的一般，如果不知道 不写即可
* @return `{JSON}`

```text
   代码例子请看 `初始化yolov8实例`
```

## Yolov8AgentUtil.getDefaultConfig 获取 yolov8 默认配置

* 获取 yolov8 默认配置
* 适配EC 9.0.0+
* @param model_name 模型名称 默认写 yolov8s-640 即可
* @param input_size yolov8训练时候的imgsz参数，默认写640即可
* @param box_thr 检测框系数，默认写0.25即可
* @param iou_thr 输出系数，，默认写0.35 即可
* @param bind_cpu 是否绑定CPU，选项为ALL,BIG,LITTLE 三个,默认写ALL
* @param use_vulkan_compute 是否启用硬件加速，1是，0否 默认写0即可
* @param obj_names JSON数组，训练的时候分类名称例如 ["star","common","face"]
* @return JSON数据

```text
   代码例子请看 `初始化yolov8实例`
```

## Yolov8Util.initYoloModel 初始化yolov8模型

* 初始化yolov8模型
* 具体如何生成param和bin文件，请参考文件的yolo使用章节，通过yolo的pt转成ncnn的param、bin文件,
* 对于onnx模型，binPath参数写null即可，paramPath是onnx文件路径
* 适配EC 9.0.0+
* @param map 参数表 参考 getDefaultConfig函数获取默认的参数，onnx参考getOnnxConfig函数
* @param paramPath param文件路径
* @param binPath bin文件路径
* @return boolean true代表成功 false代表失败

```text
   代码例子请看 `初始化yolov8实例`
```


## Yolov8AgentUtil.detectImage 检测AutoImage

* 检测图片
* 适配EC 9.0.0+
* 返回数据例如
* `[{"name":"heart","confidence":0.92,"left":957,"top":986,"right":1050,"bottom":1078}]`
* name: 代表是分类，confidence:代表可信度，left,top,right,bottom代表结果坐标选框
* @param image AutoImage对象
* @param obj_names JSON数组，不写代表不过滤，写了代表只取填写的分类
* @return string 字符串数据

```text
   代码例子请看 `初始化yolov8实例`
```

## Yolov8AgentUtil.release 释放yolov8资源

* 释放yolov8资源
* 适配EC 9.0.0+
* @return boolean

```text
   代码例子请看 `初始化yolov8实例`
   释放函数在脚本结束的的时候释放，无需要每次使用都释放
```

## Yolov8AgentUtil.getErrorMsg 获取YOLOV8错误消息

* 获取YOLOV8错误消息
* 适配EC 9.0.0+
* @return string 字符串

```text
   代码例子请看 `初始化yolov8实例`
```
