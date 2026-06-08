# EasyClick 鸿蒙Next自动化开发 Skill

## 前置阅读

**必须先阅读**：
1. [全局强制性规则](easyclick-global-rules.md) - 所有平台通用的绝对禁止规则
2. [通用开发规范](easyclick-dev-guide.md) - 跨平台开发流程和编码规范

**本文内容**：仅包含鸿蒙平台特有的技术细节和API使用规范。

---

## 概述

**鸿蒙Next自动化特点**：
- 必须使用HID硬件模式（无法使用传统无障碍服务）
- 支持不开启自动化服务获取节点和截图
- 依赖图色识别、OCR、YOLO进行屏幕内容识别
- 使用HID主控程序进行硬件级触摸操作
- 需要安装WinUSB驱动

---

## 开发流程

```
┌─────────────────────────────────────────────────────────────────┐
│                        开发者PC                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ 终端/编辑器    │───▶│ IDEA+EC插件   │───▶│ HID主控程序       │  │
│  └──────────────┘    └──────────────┘    └──────────────────┘  │
│                              │                      │           │
│                              │                      │ USB连接    │
│                              ▼                      ▼           │
│                       ┌──────────────┐    ┌──────────────┐     │
│                       │ 脚本工程      │    │ 鸿蒙设备      │     │
│                       │ (JS脚本)      │    │              │     │
│                       └──────────────┘    └──────────────┘     │
└─────────────────────────────────────────────────────────────────┘
```

**开发步骤**：
1. **环境准备**
   - 安装IntelliJ IDEA + EasyClick插件
   - 安装HID主控程序并配置WinUSB驱动
   - USB连接鸿蒙设备

2. **创建工程**
   - 在IDEA中创建鸿蒙工程
   - 编写脚本到`src/`目录

3. **运行调试**
   - 使用IDEA插件连接设备
   - 运行/停止脚本
   - 查看日志输出

4. **打包部署**
   - 构建IEC文件
   - 通过插件部署到设备

---

## 工程结构规范

```
hm_project/
├── src/
│   └── main.js              # 主脚本入口
├── res/                     # 资源文件
│   └── images/
├── project.json             # 工程配置
└── hm_project.iml           # IDEA模块配置
```

**关键说明**：
- 鸿蒙Next**无UI**，纯脚本执行
- 通过IDEA插件直接运行和调试
- 脚本入口在`src/main.js`
- 必须使用HID模式操作

---

## 文档结构说明

### 权威来源优先级

1. **本仓库 `hmdocs/` 目录** - 鸿蒙专用文档
2. **在线文档**：`https://ieasyclick.com/docs/zh-cn/funcs`

### 核心文档路径

#### 全局模块

| 文档 | 路径 | 说明 |
|------|------|------|
| 全局模块 | `hmdocs/funcs/global/global.md` | 全局函数、版本判断 |
| 全局快捷事件 | `hmdocs/funcs/global/global-shortcut.md` | 快捷点击、滑动 |

#### 节点操作

| 文档 | 路径 | 说明 |
|------|------|------|
| 节点函数 | `hmdocs/funcs/node-api.md` | 鸿蒙节点操作 |

#### HID事件（核心）

| 文档 | 路径 | 对象前缀 | 说明 |
|------|------|---------|------|
| HID事件 | `hmdocs/funcs/hid-event-api.md` | `hidEvent` | HID硬件操作 |

#### 核心功能模块

| 文档 | 路径 | 对象前缀 | 说明 |
|------|------|---------|------|
| 图色函数 | `hmdocs/funcs/image-api.md` | `image` | 截图找图 |
| OCR识别 | `hmdocs/funcs/ocr-api.md` | `ocr` | 文字识别 |
| YOLO检测 | `hmdocs/funcs/yolo-api.md` | `yolo` | 目标检测 |
| 事件函数 | `hmdocs/funcs/event-api.md` | - | 基础事件 |
| 设备函数 | `hmdocs/funcs/device-api.md` | `device` | 设备信息 |
| 文件函数 | `hmdocs/funcs/file-api.md` | `file` | 文件操作 |
| HTTP函数 | `hmdocs/funcs/http-api.md` | `http` | 网络请求 |
| 线程函数 | `hmdocs/funcs/thread-api.md` | `thread` | 多线程 |
| 存储函数 | `hmdocs/funcs/storage-api.md` | `storage` | 键值存储 |
| 工具函数 | `hmdocs/funcs/utils-api.md` | `utils` | 常用工具 |
| 网络验证 | `hmdocs/funcs/netcard-api.md` | `netcard` | 卡密验证 |
| JDBC | `hmdocs/funcs/jdbcmysql-api.md` | `jdbc` | 数据库连接 |
| 插件开发 | `hmdocs/funcs/plugin/plugins.md` | - | 插件系统 |
| JavaJS交互 | `hmdocs/funcs/plugin/javajs.md` | - | Java与JS交互 |

---

## 运行模式选择原则

**鸿蒙Next只有一种运行模式：USB HID模式**

当涉及点击/触摸操作时：先阅读`hmdocs/funcs/hid-event-api.md`章节，再使用`hidEvent`对象进行硬件级操作；禁止尝试使用其他模式（无障碍/代理/Root等）。

### HID模式核心要点

- **必须使用**`hidEvent`对象进行所有触摸操作
- **必须使用**`type=1`申请截图权限
- **必须**先激活HID才能操作
- 节点选择器**可用**但点击**必须用HID**

## 鸿蒙Next与安卓的主要区别

### 1. 运行模式差异

| 特性 | 鸿蒙Next | 安卓 |
|------|---------|------|
| 无障碍模式 | ❌ 不支持 | ✅ 支持 |
| 代理模式 | ❌ 不支持 | ✅ 支持 |
| Root模式 | ❌ 不支持 | ✅ 支持 |
| 蓝牙HID | ❌ 不支持 | ✅ 支持 |
| OTG HID | ❌ 不支持 | ✅ 支持 |
| **USB HID** | ✅ **支持（唯一模式）** | ✅ 支持 |

### 2. 核心差异

**鸿蒙Next必须使用USB HID模式**：

```javascript
// ✅ 鸿蒙Next标准流程
function main() {
    // 1. 初始化HID
    hidEvent.setHidCenter("http://127.0.0.1:8988");
    
    // 2. 激活HID（关键步骤）
    activeHid();
    
    // 3. 申请截图权限（HID模式用type=1）
    image.requestScreenCapture(10000, 1);
    
    // 4. 截图+图色识别+HID点击
    let img = image.captureScreen();
    let point = image.findColor(img, "#FF0000", {});
    if (point) {
        hidEvent.click(point.x, point.y);
    }
}
```

### 3. 节点选择器可用性

鸿蒙Next**支持**获取节点，但**必须通过HID点击**：

```javascript
// ✅ 鸿蒙Next：可以获取节点
let node = text("设置").getOneNodeInfo(5000);
if (node) {
    // 但必须用HID点击，不能用click(node)
    hidEvent.click(node.bounds.centerX(), node.bounds.centerY());
}
```

---

## 环境准备

### 1. 驱动安装（Windows）

需要安装**三次**WinUSB驱动：

1. **插入设备时** - 使用Zadig选择设备，安装WinUSB驱动
2. **关闭USB调试** - 到手机开发者选项关闭USB调试，再用Zadig安装WinUSB驱动
3. **激活HID后** - HID主控激活HID模式后，vid变成18D1，再用Zadig安装WinUSB驱动

### 2. HID主控程序

- 下载地址：网盘【EasyClick HID主控程序激活HID】
- 默认地址：`http://127.0.0.1:8988`
- 运行主控程序后才能使用HID功能

### 3. 鸿蒙Next中控

也可以使用鸿蒙Next中控一键激活HID，无需手动操作。

---

## 鸿蒙特有编码规范

### HID模式强制要求

鸿蒙必须使用HID硬件模式，有以下特殊限制：

**绝对禁止（鸿蒙特有）**：
- ❌ 禁止尝试使用无障碍/代理/Root模式（鸿蒙不支持）
- ❌ 禁止使用`click()`/`swipe()`等普通事件函数（必须使用HID）
- ❌ 禁止不使用HID主控直接调用HID函数
- ❌ 禁止截图时不使用`type=1`参数

### 鸿蒙特有API

**全局对象**：
- `hidEvent` - HID硬件操作
- `image` - 截图（必须用`type=1`）
- `ocr` - OCR识别
- `yolo` - YOLO识别

**正确实现流程**：
1. 设置HID主控地址
2. 调用`activeHid()`激活
3. 申请截图权限（`type=1`）
4. 获取屏幕内容（截图/节点/OCR/YOLO）
5. 使用`hidEvent`进行HID操作

### 基础模板

1. **设置HID主控地址** - 配置HID服务地址
2. **激活HID** - 调用`activeHid()`初始化
3. **申请截图权限** - 使用`type=1`参数
4. **获取屏幕内容** - 截图/节点/OCR/YOLO
5. **HID操作** - 使用`hidEvent`进行点击滑动

### 基础模板

```javascript
function main() {
    // ========== 1. 初始化HID ==========
    // 设置HID主控地址（如使用默认可省略）
    hidEvent.setHidCenter("http://127.0.0.1:8988");
    
    // 激活HID（关键步骤）
    if (!activeHid()) {
        loge("HID激活失败");
        return;
    }
    logd("HID激活成功");
    
    // ========== 2. 申请截图权限 ==========
    // HID模式必须使用type=1
    let result = image.requestScreenCapture(10000, 1);
    if (!result) {
        loge("截图权限申请失败");
        return;
    }
    logd("截图权限申请成功");
    
    // ========== 3. 执行业务 ==========
    // 示例：使用节点选择器+HID点击
    businessWithNode();
    
    // 或：使用图色识别+HID点击
    // businessWithImage();
    
    // 或：使用OCR+HID点击
    // businessWithOCR();
}

// 使用节点选择器
function businessWithNode() {
    // 获取节点
    let node = text("设置").getOneNodeInfo(5000);
    if (node) {
        logd("找到节点: " + node.text);
        
        // 使用HID点击节点中心
        let x = node.bounds.centerX();
        let y = node.bounds.centerY();
        hidEvent.click(x, y);
        
        logd("点击坐标: " + x + ", " + y);
    } else {
        loge("未找到节点");
    }
}

// 使用图色识别
function businessWithImage() {
    // 截图
    let img = image.captureScreen();
    
    // 找色
    let point = image.findColor(img, "#FF0000", {
        "threshold": 20
    });
    
    if (point) {
        logd("找到颜色，坐标: " + point.x + ", " + point.y);
        // HID点击
        hidEvent.click(point.x, point.y);
    } else {
        loge("未找到颜色");
    }
    
    // 释放图片
    image.recycle(img);
}

// 使用OCR识别
function businessWithOCR() {
    // 截图
    let img = image.captureScreen();
    
    // OCR识别
    let ocrObj = ocr.newOcr();
    let results = ocrObj.ocrImage(img);
    
    // 查找目标文字
    for (let i = 0; i < results.length; i++) {
        if (results[i].label.indexOf("设置") >= 0) {
            let x = results[i].x + results[i].width / 2;
            let y = results[i].y + results[i].height / 2;
            
            logd("找到文字，坐标: " + x + ", " + y);
            hidEvent.click(x, y);
            break;
        }
    }
    
    // 释放资源
    ocrObj.releaseAll();
    image.recycle(img);
}

// 激活HID函数
function activeHid() {
    // 检查是否已连接
    if (hidEvent.isUsbConnected()) {
        logd("USB已连接");
    } else {
        logw("USB未连接");
    }
    
    // 模拟关闭USB调试
    hidEvent.simCloseUsbDebug();
    sleep(1000);
    
    // 模拟开启USB调试
    hidEvent.simOpenUsbDebug();
    sleep(1000);
    
    // 初始化HID设备
    let result = hidEvent.initHidDevice();
    if (result) {
        logd("HID设备初始化成功");
        return true;
    } else {
        loge("HID设备初始化失败");
        return false;
    }
}

main();
```

---

## 节点选择器

### 鸿蒙Next支持的选择器

鸿蒙Next**支持**使用节点选择器获取节点信息：

```javascript
// 文本匹配
text("文本内容");
textContains("包含文本");
textStartsWith("开头文本");
textMatches("正则表达式");

// ID匹配
id("id值");
idMatch("正则表达式");

// 类名匹配
clz("类名");

// 描述匹配
desc("描述内容");

// xpath选择
xpath("//node[@text='设置']");

// 组合选择
text("设置").id("setting_id").clz("Text");

// 父子关系
parent(childSelector);
child(parentSelector);
```

### 节点属性

```javascript
let node = text("设置").getOneNodeInfo(5000);
if (node) {
    logd("text: " + node.text);        // 文本内容
    logd("id: " + node.id);            // 控件id
    logd("clz: " + node.clz);          // 类名
    logd("desc: " + node.desc);        // 描述
    logd("x: " + node.bounds.x);       // x坐标
    logd("y: " + node.bounds.y);       // y坐标
    logd("w: " + node.bounds.width);   // 宽度
    logd("h: " + node.bounds.height);  // 高度
    logd("centerX: " + node.bounds.centerX());  // 中心X
    logd("centerY: " + node.bounds.centerY());  // 中心Y
}
```

### 节点操作示例

```javascript
// 获取单个节点
let node = text("设置").getOneNodeInfo(5000);

// 获取多个节点
let nodes = text("设置").getNodeInfo(5000);
for (let i = 0; i < nodes.length; i++) {
    logd("节点" + i + ": " + nodes[i].text);
}

// 使用HID点击节点中心
if (node) {
    hidEvent.click(node.bounds.centerX(), node.bounds.centerY());
}
```

---

## HID事件操作

### HID初始化

```javascript
// 设置HID主控地址
hidEvent.setHidCenter("http://127.0.0.1:8988");

// 检查USB连接状态
let connected = hidEvent.isUsbConnected();

// 模拟关闭USB调试
hidEvent.simCloseUsbDebug();

// 模拟开启USB调试
hidEvent.simOpenUsbDebug();

// 初始化HID设备
let result = hidEvent.initHidDevice();
```

### HID点击操作

```javascript
// 单击
hidEvent.click(x, y);

// 长按
hidEvent.longClick(x, y);
hidEvent.longClick(x, y, duration); // 指定时长（毫秒）

// 双击
hidEvent.doubleClick(x, y);
```

### HID滑动操作

```javascript
// 滑动
hidEvent.swipe(x1, y1, x2, y2, duration);

// 上滑（从下到上）
hidEvent.swipe(500, 1500, 500, 500, 300);

// 下滑（从上到下）
hidEvent.swipe(500, 500, 500, 1500, 300);

// 左滑（从右到左）
hidEvent.swipe(800, 1000, 200, 1000, 300);

// 右滑（从左到右）
hidEvent.swipe(200, 1000, 800, 1000, 300);
```

### 系统按键

```javascript
// Home键
hidEvent.pressHome();

// 返回键
hidEvent.pressBack();

// 最近任务键
hidEvent.pressRecent();

// 电源键
hidEvent.pressPower();

// 音量加
hidEvent.pressVolumeUp();

// 音量减
hidEvent.pressVolumeDown();
```

### 文本输入

```javascript
// 输入文本（模拟键盘输入）
hidEvent.inputText("文本内容");

// 输入完成后按回车
hidEvent.inputText("文本内容", true);
```

---

## 图色识别

### 截图权限（重要）

鸿蒙Next必须使用`type=1`申请截图权限：

```javascript
// ✅ 正确
image.requestScreenCapture(10000, 1);

// ❌ 错误（安卓可以用，鸿蒙不行）
image.requestScreenCapture(10000);
```

### 截图操作

```javascript
// 申请权限
image.requestScreenCapture(10000, 1);

// 截图
let img = image.captureScreen();

// 保存截图
image.saveToFile(img, "/sdcard/screenshot.png");

// 释放图片
image.recycle(img);
```

### 找图找色

```javascript
// 读取模板图片
let template = image.readFile("/sdcard/template.png");

// 找图
let point = image.findImage(img, template, {
    "threshold": 0.9,    // 相似度阈值
    "maxLevel": 5        // 金字塔层级
});

// 找色
let point = image.findColor(img, "#FF0000", {
    "threshold": 20,     // 颜色阈值
    "direction": 1       // 查找方向
});

// 多点找色
let point = image.findMultiColors(img, "#FF0000", [
    [10, 10, "#00FF00"],
    [20, 20, "#0000FF"]
]);

// 全屏找色
let point = image.findColorInRegion(img, "#FF0000", 0, 0, 1080, 1920, 20);
```

### 图片处理

```javascript
// 裁剪图片
let cropped = image.clip(img, x, y, w, h);

// 保存图片
image.saveToFile(img, "/sdcard/image.png");

// 获取图片尺寸
let width = image.getWidth(img);
let height = image.getHeight(img);

// 释放图片（重要，防止内存泄漏）
image.recycle(img);
```

---

## OCR识别

### 基础OCR

```javascript
// 创建OCR对象
let ocrObj = ocr.newOcr();

// 识别图片
let results = ocrObj.ocrImage(img);

// 遍历结果
for (let i = 0; i < results.length; i++) {
    logd("文字: " + results[i].label);
    logd("位置: (" + results[i].x + ", " + results[i].y + ")");
    logd("大小: " + results[i].width + "x" + results[i].height);
    
    // 计算中心点
    let centerX = results[i].x + results[i].width / 2;
    let centerY = results[i].y + results[i].height / 2;
}

// 释放OCR资源
ocrObj.releaseAll();
```

### OCR+HID点击示例

```javascript
function clickText(targetText) {
    // 截图
    let img = image.captureScreen();
    
    // OCR识别
    let ocrObj = ocr.newOcr();
    let results = ocrObj.ocrImage(img);
    
    // 查找目标文字
    let found = false;
    for (let i = 0; i < results.length; i++) {
        if (results[i].label.indexOf(targetText) >= 0) {
            let x = results[i].x + results[i].width / 2;
            let y = results[i].y + results[i].height / 2;
            
            logd("找到文字 '" + targetText + "'，点击坐标: (" + x + ", " + y + ")");
            hidEvent.click(x, y);
            found = true;
            break;
        }
    }
    
    if (!found) {
        loge("未找到文字: " + targetText);
    }
    
    // 释放资源
    ocrObj.releaseAll();
    image.recycle(img);
    
    return found;
}
```

---

## YOLO目标检测

### 基础YOLO

```javascript
// 创建YOLO对象
let yoloObj = yolo.newYolo();

// 设置模型（如有自定义模型）
// yoloObj.setModel("/sdcard/model.onnx");

// 检测图片
let results = yoloObj.detect(img);

// 遍历检测结果
for (let i = 0; i < results.length; i++) {
    logd("类别: " + results[i].label);
    logd("置信度: " + results[i].confidence);
    logd("位置: (" + results[i].x + ", " + results[i].y + ")");
    logd("大小: " + results[i].width + "x" + results[i].height);
}

// 释放YOLO资源
yoloObj.releaseAll();
```

### YOLO+HID点击示例

```javascript
function clickTarget(targetLabel) {
    // 截图
    let img = image.captureScreen();
    
    // YOLO检测
    let yoloObj = yolo.newYolo();
    let results = yoloObj.detect(img);
    
    // 查找目标
    let found = false;
    for (let i = 0; i < results.length; i++) {
        if (results[i].label == targetLabel && results[i].confidence > 0.8) {
            let x = results[i].x + results[i].width / 2;
            let y = results[i].y + results[i].height / 2;
            
            logd("找到目标 '" + targetLabel + "'，点击坐标: (" + x + ", " + y + ")");
            hidEvent.click(x, y);
            found = true;
            break;
        }
    }
    
    if (!found) {
        loge("未找到目标: " + targetLabel);
    }
    
    // 释放资源
    yoloObj.releaseAll();
    image.recycle(img);
    
    return found;
}
```

---

## 设备函数

```javascript
// 获取屏幕宽度
let width = device.getScreenWidth();

// 获取屏幕高度
let height = device.getScreenHeight();

// 获取设备型号
let model = device.getDeviceModel();

// 获取系统版本
let version = device.getOSVersion();

// 获取设备ID
let deviceId = device.getDeviceId();
```

---

## 最佳实践

### 1. 完整的HID初始化流程

```javascript
function initHID() {
    // 设置HID主控地址
    hidEvent.setHidCenter("http://127.0.0.1:8988");
    
    // 检查USB连接
    if (!hidEvent.isUsbConnected()) {
        logw("USB未连接，尝试连接...");
    }
    
    // 模拟关闭USB调试
    hidEvent.simCloseUsbDebug();
    sleep(1000);
    
    // 模拟开启USB调试
    hidEvent.simOpenUsbDebug();
    sleep(1000);
    
    // 初始化HID设备
    let result = hidEvent.initHidDevice();
    if (!result) {
        loge("HID初始化失败");
        return false;
    }
    
    logd("HID初始化成功");
    return true;
}
```

### 2. 截图权限申请

```javascript
function requestCapturePermission() {
    // HID模式必须使用type=1
    let result = image.requestScreenCapture(10000, 1);
    if (result) {
        logd("截图权限申请成功");
        return true;
    } else {
        loge("截图权限申请失败");
        return false;
    }
}
```

### 3. 安全点击（节点+HID）

```javascript
function safeClick(selector, timeout) {
    timeout = timeout || 5000;
    
    // 获取节点
    let node = selector.getOneNodeInfo(timeout);
    if (!node) {
        loge("未找到节点: " + selector);
        return false;
    }
    
    // 计算中心坐标
    let x = node.bounds.centerX();
    let y = node.bounds.centerY();
    
    // HID点击
    logd("点击坐标: (" + x + ", " + y + ")");
    hidEvent.click(x, y);
    
    return true;
}

// 使用示例
safeClick(text("设置"));
safeClick(id("button_id"));
```

### 4. 异常处理

```javascript
function main() {
    try {
        // 初始化HID
        if (!initHID()) {
            throw new Error("HID初始化失败");
        }
        
        // 申请截图权限
        if (!requestCapturePermission()) {
            throw new Error("截图权限申请失败");
        }
        
        // 执行业务
        doBusiness();
        
    } catch (e) {
        loge("脚本异常: " + e.message);
        // 截图保存
        let img = image.captureScreen();
        image.saveToFile(img, "/sdcard/error_" + new Date().getTime() + ".png");
        image.recycle(img);
    }
}
```

### 5. 资源释放

```javascript
function business() {
    let img = null;
    let ocrObj = null;
    
    try {
        // 截图
        img = image.captureScreen();
        
        // OCR识别
        ocrObj = ocr.newOcr();
        let results = ocrObj.ocrImage(img);
        
        // 处理结果...
        
    } finally {
        // 确保资源释放
        if (ocrObj) {
            ocrObj.releaseAll();
        }
        if (img) {
            image.recycle(img);
        }
    }
}
```

---

## 调试技巧

### 1. 查看日志
- IDEA插件日志面板实时显示
- 使用`logd()`/`loge()`输出调试信息
- 日志级别：debug/info/warning/error

### 2. 截图分析
- `image.captureScreen()`获取屏幕截图
- `image.saveToFile()`保存到本地分析
- 用于验证图色识别参数

### 3. 节点分析
- 使用`text("").getNodeInfo()`获取所有节点
- 打印节点属性确认选择器正确性
- 结合IDEA插件的节点查看功能

### 4. HID状态检查
- `hidEvent.isUsbConnected()`检查USB连接
- `hidEvent.initHidDevice()`返回初始化结果
- 日志输出HID操作返回值

---

## 排障要点

### 1. HID激活失败
- 检查WinUSB驱动是否安装正确（需要安装3次）
- 检查HID主控程序是否运行
- 检查USB连接是否正常
- 尝试重启HID主控程序

### 2. 截图失败
- 确认使用`image.requestScreenCapture(10000, 1)`（type=1）
- 检查HID是否已激活
- 检查USB连接是否正常

### 3. HID点击没反应
- 检查HID是否已激活（`initHidDevice`）
- 检查坐标是否正确（屏幕范围内）
- 检查HID主控程序是否正常运行

### 4. 节点选择器获取不到节点
- 鸿蒙Next支持节点选择器，但可能需要等待页面加载
- 尝试增加超时时间
- 使用图色识别或OCR作为备选方案

### 5. 应用切换问题
- 使用`hidEvent.pressRecent()`打开最近任务
- 配合图色或OCR定位目标应用
- 注意添加适当的sleep等待

---

## 常见问题

### Q1: HID激活失败？

**A**: 
1. 检查WinUSB驱动是否安装正确（需要安装3次）
2. 检查HID主控程序是否运行
3. 检查USB连接是否正常
4. 尝试重启HID主控程序

### Q2: 截图失败？

**A**: 
1. 确认使用`image.requestScreenCapture(10000, 1)`（type=1）
2. 检查HID是否已激活
3. 检查USB连接是否正常

### Q3: HID点击没反应？

**A**: 
1. 检查HID是否已激活（`initHidDevice`）
2. 检查坐标是否正确（屏幕范围内）
3. 检查HID主控程序是否正常运行

### Q4: 节点选择器获取不到节点？

**A**: 
1. 鸿蒙Next支持节点选择器，但可能需要等待页面加载
2. 尝试增加超时时间
3. 使用图色识别或OCR作为备选方案

### Q5: 如何切换应用？

**A**: 
```javascript
// 使用最近任务键
hidEvent.pressRecent();
sleep(1000);
// 然后点击目标应用（使用图色或OCR定位）
```

---

## 参考文档

- 鸿蒙文档目录：`hmdocs/funcs/`
- 在线文档：https://ieasyclick.com/docs/zh-cn/funcs
- HID驱动教程：https://ieasyclick.com/docs/docs/zh-cn/advance/hid
