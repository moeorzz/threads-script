# EasyClick 通用开发规范

## 概述

本规范适用于所有EasyClick平台（安卓、iOS、鸿蒙）的自动化脚本开发。

**核心原则**：所有平台的开发流程一致，主要区别在于使用的API对象前缀不同。

---

## 通用开发流程

```
┌─────────────────────────────────────────────────────────────────┐
│  1. 取证    →   2. 查API   →   3. 写定位   →   4. 写动作        │
│                                                                  │
│  截图/节点    确认函数用法      选择器优先       点击/输入       │
│  树/日志                     坐标兜底注释       关键步骤日志     │
└─────────────────────────────────────────────────────────────────┘
```

### 四步开发法

| 步骤 | 动作 | 输出 | 注意事项 |
|------|------|------|---------|
| **1. 取证** | 获取控件树、截图、日志 | 原始数据 | 禁止假设界面布局 |
| **2. 查API** | 查阅平台文档确认函数 | 函数签名 | 禁止编造API |
| **3. 写定位** | 优先选择器，坐标兜底 | 定位代码 | 坐标需注释原因 |
| **4. 写动作** | 点击/输入/滑动 | 操作代码 | 关键步骤加日志 |

---

## 工程结构规范

### 标准工程目录

```
project/
├── src/
│   ├── main.js              # 主脚本入口（必须）
│   ├── layout/              # UI文件（如支持UI）
│   │   ├── ui.js            # UI入口
│   │   └── main.xml         # 布局文件（安卓XML/iOS H5）
│   └── js/                  # 业务脚本（安卓）
│       └── logic.js
├── res/                     # 资源文件
│   └── images/
│       └── template.png
├── docs/                    # 文档（可选）
├── project.json             # 工程配置
└── *.iml                    # IDEA模块配置
```

### 各平台差异

| 平台 | UI支持 | 入口文件 | 工程配置 |
|------|--------|---------|---------|
| **安卓** | XML UI / H5 UI | `layout/ui.js` | `project.json` + `.iml` |
| **iOS USB版** | ❌ 无UI | `src/main.js` | `project.json` + `.iml` |
| **iOS 脱机版** | H5 UI | `src/main.js` + `src/ui/` | `project.json` + `package.json` |
| **鸿蒙** | ❌ 无UI | `src/main.js` | `project.json` + `.iml` |

---

## 编码规范

### 绝对禁止

- ❌ **禁止假设**界面布局、控件坐标、属性值
- ❌ **禁止编造**EC API（必须先查文档）
- ❌ **禁止**在未获取真实节点树前写选择器
- ❌ **禁止**在有可用控件属性时使用坐标点击
- ❌ **禁止**在UI入口中使用`while(true)`、长`sleep`、同步HTTP等阻塞操作

### 代码模板

```javascript
// 语言：JavaScript（Rhino引擎）
// 全局对象无需import

function main() {
    // 1. 启动环境
    startEnv();
    
    // 2. 等待页面加载
    sleep(1000);
    
    // 3. 定位元素（优先选择器）
    let selector = text("设置").id("title");
    let node = selector.getNodeInfo(5000);
    
    // 4. 判断并操作
    if (node) {
        logd("找到设置按钮，准备点击");
        click(selector);
    } else {
        loge("未找到设置按钮");
        // 截图留证
        captureScreen("/sdcard/error.png");
    }
}

main();
```

### 选择器优先级

```javascript
// ✅ 优先使用属性选择器（最推荐）
text("设置").id("com.example:id/title").clz("android.widget.TextView")

// ✅ 使用xpath（复杂场景）
xpath("//node[@text='设置' and @id='title']")

// ✅ 父级定位+子级属性
id("parent_container").child(text("目标文本"))

// ⚠️ 坐标兜底（必须注释原因）
// clickPoint(100, 200)  // 原因：弹窗无节点，已截图确认坐标
```

### 日志规范

```javascript
// 调试日志 - 开发阶段使用
logd("步骤说明: 变量值=" + value);

// 信息日志 - 关键流程节点
logi("信息说明: 信息内容");

// 警告日志 - 非致命异常
logw("警告说明: 警告内容");

// 错误日志 - 致命错误
loge("错误说明: 错误信息");
```

---

## 平台API对照表

### 节点选择器（通用）

| 功能 | 安卓 | iOS | 鸿蒙 |
|------|------|-----|------|
| 文本匹配 | `text("")` | `label("")` | `text("")` |
| 包含文本 | `textContains("")` | `labelContains("")` | `textContains("")` |
| ID匹配 | `id("")` | `id("")` | `id("")` |
| 类名匹配 | `clz("")` | `name("")` | `clz("")` |
| 描述匹配 | `desc("")` | `value("")` | `desc("")` |
| XPath | `xpath("")` | `xpath("")` | `xpath("")` |

### 点击操作

| 平台 | 节点选择器点击 | 坐标点击 | 说明 |
|------|---------------|---------|------|
| **安卓** | `click(selector)` | `clickPoint(x, y)` | 无障碍/代理模式支持选择器 |
| **iOS USB** | `nodeAgent.click(node)` | `nodeAgent.clickPoint(x, y)` | 代理模式使用nodeAgent |
| **iOS 脱机** | ❌ 不支持 | `bleEvent.clickPoint(x, y)` / `otgEvent.click(x, y)` | HID模式只能坐标点击 |
| **鸿蒙** | ❌ 不支持 | `hidEvent.click(x, y)` | 仅支持HID坐标点击 |

### 截图操作

| 平台 | 申请权限 | 截图 | 说明 |
|------|---------|------|------|
| **安卓** | `image.requestScreenCapture(timeout)` | `image.captureScreen()` | 无障碍/代理模式 |
| **安卓 HID** | `image.requestScreenCapture(timeout, 1)` | `image.captureScreen()` | type=1 |
| **iOS USB** | 无需申请 | `imageAgent.captureScreen()` | 代理模式 |
| **iOS 脱机** | 无需申请 | `activeSelf.screenshot(timeout)` | 自主激活截图 |
| **鸿蒙** | `image.requestScreenCapture(timeout, 1)` | `image.captureScreen()` | 必须使用type=1 |

### 滑动操作

| 平台 | 函数 | 示例 |
|------|------|------|
| **安卓** | `swipe(x1, y1, x2, y2, duration)` | `swipe(500, 1500, 500, 500, 300)` |
| **iOS USB** | `nodeAgent.swipe(x1, y1, x2, y2, duration)` | `nodeAgent.swipe(500, 1500, 500, 500, 300)` |
| **iOS 脱机** | `bleEvent.swipe(x1, y1, x2, y2, duration)` | `bleEvent.swipe(500, 1500, 500, 500, 300)` |
| **鸿蒙** | `hidEvent.swipe(x1, y1, x2, y2, duration)` | `hidEvent.swipe(500, 1500, 500, 500, 300)` |

### 输入文本

| 平台 | 函数 | 示例 |
|------|------|------|
| **安卓** | `inputText(selector, text)` | `inputText(text("输入框"), "内容")` |
| **iOS USB** | `nodeAgent.inputText(node, text)` | `nodeAgent.inputText(node, "内容")` |
| **iOS 脱机** | `bleEvent.inputText(text)` | `bleEvent.inputText("内容")` |
| **鸿蒙** | `hidEvent.inputText(text)` | `hidEvent.inputText("内容")` |

---

## 运行模式对照

### 安卓运行模式

| 模式 | 对象前缀 | 节点选择器 | 截图 | 特点 |
|------|---------|-----------|------|------|
| 无障碍 | `acEvent` | ✅ | ✅ | 常规自动化 |
| 代理 | `agentEvent` | ✅ | ✅ | 功能最全 |
| Root | `shell` | ✅ | ✅ | 系统级操作 |
| 蓝牙HID | `bleEvent` | ❌ | ✅ | 硬件操作 |
| OTG HID | `otgEvent` | ❌ | ✅ | 硬件操作 |

### iOS运行模式

| 版本 | 模式 | 对象前缀 | 节点选择器 | 截图 | 特点 |
|------|------|---------|-----------|------|------|
| USB版 | 代理 | `nodeAgent` / `agentEvent` | ✅ | ✅ | 功能最全 |
| USB版 | 蓝牙HID | `bleEvent` | ❌ | ❌ | 硬件操作 |
| 脱机版 | 自主激活 | `activeSelf` | ❌ | ✅ | 独立运行 |
| 脱机版 | 蓝牙HID | `bleEvent` | ❌ | ❌ | 硬件操作 |
| 脱机版 | OTG HID | `otgEvent` | ❌ | ❌ | 硬件操作 |
| 脱机版 | 激活器 | `tjCenter` | ✅ | ✅ | 局域网控制 |

### 鸿蒙运行模式

| 模式 | 对象前缀 | 节点选择器 | 截图 | 特点 |
|------|---------|-----------|------|------|
| USB HID | `hidEvent` | ⚠️ 有限支持 | ✅ | 唯一模式 |

---

## 通用最佳实践

### 1. 异常处理模板

```javascript
function safeClick(selector, timeout) {
    timeout = timeout || 5000;
    let node = selector.getNodeInfo(timeout);
    if (node) {
        click(selector);
        logd("点击成功: " + selector);
        return true;
    } else {
        loge("点击失败，未找到元素: " + selector);
        captureScreen("/sdcard/error_" + new Date().getTime() + ".png");
        return false;
    }
}
```

### 2. 循环等待模板

```javascript
function waitFor(selector, timeout) {
    let start = new Date().getTime();
    while (new Date().getTime() - start < timeout) {
        let node = selector.getNodeInfo(1000);
        if (node) {
            return true;
        }
        sleep(500);
    }
    return false;
}
```

### 3. 资源释放模板

```javascript
function business() {
    let img = null;
    let ocrObj = null;
    
    try {
        img = image.captureScreen();
        ocrObj = ocr.newOcr();
        let results = ocrObj.ocrImage(img);
        // 处理结果...
    } finally {
        if (ocrObj) ocrObj.releaseAll();
        if (img) image.recycle(img);
    }
}
```

### 4. 页面状态判断

```javascript
function isPageLoaded() {
    // 通过关键元素判断页面是否加载完成
    return text("关键元素").getNodeInfo(3000) != null;
}
```

---

## 调试技巧

### 1. 日志查看

| 平台 | 查看方式 |
|------|---------|
| 安卓 | IDEA插件日志面板、CLI日志文件 |
| iOS USB | IDEA插件日志面板 |
| iOS 脱机 | 内置日志查看器 |
| 鸿蒙 | IDEA插件日志面板 |

### 2. 节点分析

```javascript
// 获取所有节点并打印
let nodes = text("").getNodeInfo(1000);
logd("节点数量: " + nodes.length);
for (let i = 0; i < nodes.length; i++) {
    logd("节点" + i + ": text=" + nodes[i].text + ", id=" + nodes[i].id);
}
```

### 3. 截图对比

```javascript
// 截图保存用于分析
captureScreen("/sdcard/debug_" + new Date().getTime() + ".png");
```

### 4. 使用CLI工具

#### 安卓 CLI

```bash
# 抓取节点树
ec-android-cli capture-node -m app -d /tmp/nodes

# 截图
ec-android-cli capture-screen -m app -d /tmp/screenshots

# OCR测试
ec-android-cli ocr-screen -m app
```

#### iOS CLI

```bash
# 抓取节点树
ec-ios-cli capture-node -m app -d /tmp/nodes

# 截图
ec-ios-cli capture-image -m app -d /tmp/screenshots

# OCR测试
ec-ios-cli ocr-screen -m app
```

---

## 排障要点

### 通用问题

| 问题 | 排查步骤 |
|------|---------|
| 节点选择不到 | 1. 确认运行模式支持选择器<br>2. 增加超时时间<br>3. 使用截图/OCR验证界面 |
| 点击不生效 | 1. 检查运行模式是否支持点击<br>2. 确认元素已找到<br>3. 添加sleep等待 |
| 截图失败 | 1. 检查权限申请<br>2. 确认运行模式支持截图<br>3. 检查存储权限 |

### 平台特有问题

| 平台 | 常见问题 | 解决方案 |
|------|---------|---------|
| **安卓** | IDEA插件连接失败 | 检查USB调试、重启IDEA |
| **iOS USB** | 代理IPA未运行 | 确认代理IPA已启动 |
| **iOS 脱机** | 激活失败 | 检查网络、激活器地址 |
| **鸿蒙** | HID激活失败 | 检查WinUSB驱动、HID主控程序 |

---

## 平台选择建议

| 场景 | 推荐平台 | 推荐模式 |
|------|---------|---------|
| 需要UI界面 | 安卓 / iOS脱机版 | XML UI / H5 UI |
| 无需电脑控制 | iOS脱机版 | 自主激活 |
| 功能最全 | 安卓 / iOS USB版 | 代理模式 |
| 无法开启无障碍 | 安卓 / iOS / 鸿蒙 | HID模式 |
| 纯图色自动化 | 鸿蒙 | USB HID |

---

## 参考文档

| 平台 | 文档路径 | 在线文档 |
|------|---------|---------|
| **安卓** | `docs/funcs/` | https://ieasyclick.com/docs/zh-cn/funcs |
| **iOS USB版** | `iosdocs/funcs/` | https://ieasyclick.com/docs/zh-cn/funcs |
| **iOS 脱机版** | `iostjdocs/funcs/` | https://ieasyclick.com/docs/zh-cn/funcs |
| **鸿蒙** | `hmdocs/funcs/` | https://ieasyclick.com/docs/zh-cn/funcs |

---

## 快速参考卡片

### 脚本开头模板

```javascript
function main() {
    // 1. 启动环境
    startEnv();
    
    // 2. 等待页面稳定
    sleep(1000);
    
    // 3. 执行业务
    doBusiness();
}

function doBusiness() {
    // 业务逻辑
}

main();
```

### 安全操作模板

```javascript
// 安全点击
function safeClick(selector, timeout) {
    timeout = timeout || 5000;
    let node = selector.getNodeInfo(timeout);
    if (node) {
        click(selector);
        logd("点击成功");
        return true;
    }
    loge("点击失败: " + selector);
    return false;
}

// 安全等待
function waitFor(selector, timeout) {
    let start = new Date().getTime();
    while (new Date().getTime() - start < timeout) {
        if (selector.getNodeInfo(1000)) return true;
        sleep(500);
    }
    return false;
}
```

### 资源管理模板

```javascript
function withResources(callback) {
    let img = null;
    let ocrObj = null;
    try {
        img = image.captureScreen();
        ocrObj = ocr.newOcr();
        return callback(img, ocrObj);
    } finally {
        if (ocrObj) ocrObj.releaseAll();
        if (img) image.recycle(img);
    }
}
```
