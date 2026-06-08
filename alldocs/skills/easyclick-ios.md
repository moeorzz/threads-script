# EasyClick iOS自动化开发 Skill

## 前置阅读

**必须先阅读**：
1. [全局强制性规则](easyclick-global-rules.md) - 所有平台通用的绝对禁止规则
2. [通用开发规范](easyclick-dev-guide.md) - 跨平台开发流程和编码规范

**本文内容**：仅包含iOS平台特有的技术细节和API使用规范。

---

## 概述

**iOS自动化特点**：
- 免越狱方案
- 两个版本：USB版（连接电脑）和脱机版（独立运行）
- 多种运行模式：代理模式、蓝牙HID、OTG HID
- 脱机版支持HTML5 UI（Vue/React等框架）

---

## 开发流程

### USB版开发流程

```
┌─────────────────────────────────────────────────────────────────┐
│                        开发者PC                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ 终端/编辑器    │───▶│ IDEA+EC插件   │───▶│ iOS设备(代理IPA)  │  │
│  └──────────────┘    └──────────────┘    └──────────────────┘  │
│                              │                      │           │
│                              │                      │ USB连接    │
│                              ▼                      ▼           │
│                       ┌──────────────┐    ┌──────────────┐     │
│                       │ 脚本工程      │    │ 被控App界面   │     │
│                       │ (JS脚本)      │    │              │     │
│                       └──────────────┘    └──────────────┘     │
└─────────────────────────────────────────────────────────────────┘
```

**开发步骤**：
1. **环境准备**
   - 安装IntelliJ IDEA + EasyClick iOS插件
   - iOS设备安装（根据模式选择）：
     - 代理模式：主程序 + 代理程序（两个IPA，都需要签名）
     - HID模式：主程序可选，代理IPA可选（有代理时可使用部分功能）
   - USB连接设备

2. **创建工程**
   - 在IDEA中创建iOS工程
   - 编写脚本到`src/`目录

3. **运行调试**
   - 使用IDEA插件连接设备
   - 运行/停止脚本
   - 查看日志输出

4. **打包部署**
   - 构建为 `.iec` 文件（中控执行）
   - 通过插件部署到设备

**编译产物**：`.iec` 文件（在中控PC端执行）

### 脱机版开发流程

```
┌─────────────────────────────────────────────────────────────────┐
│                        开发者PC                                  │
│  ┌──────────────┐    ┌──────────────┐                          │
│  │ 代码编辑器     │───▶│ 打包工具      │                          │
│  └──────────────┘    └──────────────┘                          │
│                              │                                  │
│                              │ 生成脱机包                        │
│                              ▼                                  │
│                       ┌──────────────┐                         │
│                       │ 脱机工程包    │                         │
│                       │ (JS+H5+资源)  │                         │
│                       └──────────────┘                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ 安装到设备
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     iOS设备(脱机运行)                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│  │ EC脱机运行时   │───▶│ 执行JS脚本    │───▶│ H5 UI界面    │      │
│  └──────────────┘    └──────────────┘    └──────────────┘      │
│         │                                                      │
│         │ 自主激活/蓝牙HID/OTG HID/激活器                        │
│         ▼                                                      │
│  ┌──────────────┐                                              │
│  │  被控App界面  │                                              │
│  └──────────────┘                                              │
└─────────────────────────────────────────────────────────────────┘
```

**开发步骤**：
1. **环境准备**
   - 安装EC脱机版IPA到iOS设备
   - 激活设备（自主激活或激活器）
   - 准备HID硬件（如使用HID模式）

2. **创建工程**
   - 创建脱机工程目录结构
   - 编写JS脚本
   - 编写H5 UI（可选）

3. **打包工程**
   - 使用脱机打包工具生成工程包
   - 将资源文件放入正确位置

4. **部署运行**
   - 编译为 `.ipa` 文件（需签名）
   - 通过iTunes/爱思助手等方式安装到iOS设备
   - 在设备上运行

**编译产物**：`.ipa` 文件（需签名安装到iOS设备端执行）

---

## CLI工具链（ec-ios-cli）

### 概述

`ec-ios-cli`是用命令行控制IDEA里的EasyClick iOS插件，支持USB版和脱机版。

**前置条件**：
- [ ] IntelliJ IDEA已启动
- [ ] EasyClick iOS插件已加载且可响应
- [ ] `-m`参数与IDEA工程模块名一致
- [ ] 设备已在IDEA侧连接好

### CLI使用纪律

- 优先使用仓库相对路径调用（Windows可用`ec-ios-cli.exe`或系统可解析的等价命令）
- **`-m/--module`必须与IDEA工程模块名一致**；多工程/多窗口时用**`-p/--project`**指向工程根目录消歧（以`SKILL.md`为准）
- 默认日志多为**stderr JSON行**；自动化解析以`SKILL.md`为准

### 子命令一览

| 分组 | 子命令 | 作用 | 需要`-m` |
|------|--------|------|---------|
| 生命周期 | `preview` | 预览工程 | ✅ |
| 生命周期 | `run` | 运行工程 | ✅ |
| 生命周期 | `stop` | 停止当前运行 | ✅ |
| 构建 | `build` | 构建IEC | ✅ |
| 感知 | `capture-image` | 截图并返回路径 | ✅ |
| 感知 | `capture-node` | 抓取节点(UIX) | ✅ |
| 感知 | `ocr-local-image` | OCR本地图片 | ✅ |
| 感知 | `ocr-screen` | OCR当前屏幕 | ✅ |
| 感知 | `test-image` | 测试模板匹配 | ✅ |
| 日志 | `monitor` | 仅持续输出日志流 | ❌ |

### 通用参数

| 参数 | 含义 | 默认值 |
|------|------|--------|
| `-m` / `--module` | **必填**（monitor除外）。IDEA模块名 | - |
| `-p` / `--project` | 工程根目录（多工程时消歧） | - |
| `-f` / `--format` | 日志格式：`text`或`json` | `json` |
| `-o` / `--log` | 日志追加写入文件路径 | - |
| `-r` / `--random-log` | 在`ai_logs/`下自动生成日志文件 | `false` |
| `-k` / `--stop-on` | 日志包含该子串时退出 | 见下文 |
| `-w` / `--monitor-logs` | 是否持续跟日志 | 见下文 |

**`-k`多关键字**：用`|||`连接多个子串，表示OR（任一子串出现即退出）

**默认`-k/-w`**：
- `preview`：默认`-k 执行错误|||脚本执行异常|||...`，`-w true`
- `run`：默认`-k 执行错误|||脚本执行异常|||USB版项目无法运行|||...`，`-w true`
- `stop`：默认`-k 停止失败|||停止运行成功|||无设备连接`，`-w true`
- `build`：默认`-k release.iec|||编译IEC成功|||编译失败`，`-w false`

### 使用示例

```bash
# 设置CLI路径
EC=./ec_work_config/ios/bin/ec-ios-cli

# 预览工程
$EC preview -m app

# 运行工程（带日志）
$EC run -m app -f json -o /tmp/easyclick.log

# 停止运行
$EC stop -m app

# 构建IEC
$EC build -m app

# 截图
$EC capture-image -m app -d /tmp/screenshots

# 抓取节点
$EC capture-node -m app -d /tmp/nodes

# OCR屏幕
$EC ocr-screen -m app

# 图片测试
$EC test-image -m app -s /tmp/template.png

# 仅监控日志
$EC monitor -f text
```

### 感知校准命令详解

#### capture-image（截图）

```bash
$EC capture-image -m app
$EC capture-image -m app -d /tmp/shots   # 指定保存目录
```

#### capture-node（抓取节点）

```bash
$EC capture-node -m app
$EC capture-node -m app -d /tmp/nodes     # 指定保存目录
```

输出UIX（XML格式）文件路径，用于分析控件树。

#### ocr-local-image（OCR本地图片）

```bash
$EC ocr-local-image -m app -i /path/to/image.png
```

#### ocr-screen（OCR屏幕）

```bash
$EC ocr-screen -m app
```

#### test-image（图片测试）

```bash
# 抓屏测试
$EC test-image -m app -s /tmp/template.png

# 本图测试
$EC test-image -m app -T 1 -s s.png -B b.png
```

---

## iOS版本说明

iOS有两个完全不同的版本：

| 版本 | 文档目录 | 连接方式 | UI类型 | 特点 |
|------|---------|---------|--------|------|
| **USB版** | `iosdocs/` | USB连接电脑 | **无UI** | 功能最全，需要电脑 |
| **脱机版** | `iostjdocs/` | 独立运行 | **HTML5 UI** | 无需电脑，支持Vue/React |

### 版本选择建议

| 场景 | 推荐版本 |
|------|---------|
| 需要电脑控制、功能最全 | USB版 |
| 无需电脑、独立运行 | 脱机版 |
| 需要复杂UI界面 | 脱机版（HTML5） |
| 需要开发工具支持 | USB版 |

---

## 文档结构说明

### USB版文档 (`iosdocs/`)

#### 全局模块

| 文档 | 路径 | 说明 |
|------|------|------|
| 全局模块 | `iosdocs/funcs/global/global.md` | 全局函数、版本判断 |
| 全局快捷事件 | `iosdocs/funcs/global/global-shortcut.md` | 快捷点击、滑动 |

#### 节点操作（两种API）

| 文档 | 路径 | 对象前缀 | 说明 |
|------|------|---------|------|
| 节点函数 | `iosdocs/funcs/node-api.md` | - | 普通模式节点操作 |
| 代理节点 | `iosdocs/funcs/node-agent-api.md` | `nodeAgent` | 代理模式节点操作 |

#### 事件操作

| 文档 | 路径 | 对象前缀 | 说明 |
|------|------|---------|------|
| 代理事件 | `iosdocs/funcs/event-api.md` | `agentEvent` | 代理模式事件 |
| 蓝牙HID | `iosdocs/funcs/ble-event-api.md` | `bleEvent` | 蓝牙硬件事件 |

#### 图色识别（两种API）

| 文档 | 路径 | 对象前缀 | 说明 |
|------|------|---------|------|
| 图色函数 | `iosdocs/funcs/image-api.md` | `image` | 普通模式图色 |
| 图色代理 | `iosdocs/funcs/image-agent-api.md` | `imageAgent` | 代理模式图色 |

#### OCR识别（两种API）

| 文档 | 路径 | 对象前缀 | 说明 |
|------|------|---------|------|
| OCR函数 | `iosdocs/funcs/ocr-api.md` | `ocr` | 普通模式OCR |
| OCR代理 | `iosdocs/funcs/ocr-agent-api.md` | `ocrAgent` | 代理模式OCR |

#### YOLO检测（两种API）

| 文档 | 路径 | 对象前缀 | 说明 |
|------|------|---------|------|
| YOLO函数 | `iosdocs/funcs/yolo-api.md` | `yolo` | 普通模式YOLO |
| YOLO代理 | `iosdocs/funcs/yolo-agent-api.md` | `yoloAgent` | 代理模式YOLO |

#### 其他模块

| 文档 | 路径 | 说明 |
|------|------|------|
| 设备函数 | `iosdocs/funcs/device-api.md` | 设备信息获取 |
| 文件函数 | `iosdocs/funcs/file-api.md` | 文件操作 |
| HTTP函数 | `iosdocs/funcs/http-api.md` | 网络请求 |
| 线程函数 | `iosdocs/funcs/thread-api.md` | 多线程 |
| 存储函数 | `iosdocs/funcs/storage-api.md` | 键值存储 |
| 输入法 | `iosdocs/funcs/ime-api.md` | 输入法操作 |
| 应用辅助 | `iosdocs/funcs/apphelper-api.md` | 应用管理、相册、剪贴板 |
| 网络验证 | `iosdocs/funcs/netcard-api.md` | 卡密验证 |
| JDBC | `iosdocs/funcs/jdbcmysql-api.md` | 数据库连接 |
| 插件开发 | `iosdocs/funcs/plugin/plugins.md` | 插件系统 |
| JavaJS交互 | `iosdocs/funcs/plugin/javajs.md` | Java与JS交互 |

### 脱机版文档 (`iostjdocs/`)

#### 核心模块

| 文档 | 路径 | 对象前缀 | 说明 |
|------|------|---------|------|
| 全局模块 | `iostjdocs/funcs/global/global.md` | - | 全局函数 |
| 全局快捷事件 | `iostjdocs/funcs/global/global-shortcut.md` | - | 快捷事件 |
| 节点函数 | `iostjdocs/funcs/node-api.md` | - | 节点操作 |
| 事件函数 | `iostjdocs/funcs/event-api.md` | - | 基础事件 |
| 设备函数 | `iostjdocs/funcs/device-api.md` | `device` | 设备信息 |
| 激活器 | `iostjdocs/funcs/tjcenter-api.md` | `tjCenter` | 脱机激活器 |
| 自主激活 | `iostjdocs/funcs/active_self-api.md` | `activeSelf` | 自主激活截图 |
| 云控 | `iostjdocs/funcs/ecloud-tj-api.md` | `ecloud` | 云控系统 |
| 插件 | `iostjdocs/funcs/plugin-api.md` | - | 插件系统 |
| 工作器 | `iostjdocs/funcs/worker-api.md` | `worker` | 多工作器 |

#### HID操作（脱机版特有）

| 文档 | 路径 | 对象前缀 | 说明 |
|------|------|---------|------|
| 蓝牙BLE | `iostjdocs/funcs/ble-hid-tj-api.md` | `bleEvent` | 蓝牙HID |
| OTG HID | `iostjdocs/funcs/otg-hid-tj-api.md` | `otgEvent` | OTG HID |

#### UI模块（脱机版特有）

| 文档 | 路径 | 说明 |
|------|------|------|
| UI编写 | `iostjdocs/funcs/ui/index.md` | HTML5 UI说明 |
| JS交互 | `iostjdocs/funcs/ui/ui-js-inter.md` | H5与脚本交互 |
| JS高级交互 | `iostjdocs/funcs/ui/ui-js-inter-adv.md` | 高级交互 |

---

## 运行模式对比

**重要区别**：
- **USB版**：脚本在中控（PC端）执行，编译产物为 `.iec` 文件
- **脱机版**：脚本在iOS设备端执行，编译产物为 `.ipa` 文件（需签名安装）

**运行模式选择原则**：当涉及点击/触摸链路选择时，先阅读`iosdocs/funcs/event-api.md`、`iosdocs/funcs/node-agent-api.md`等对应章节，再选择**代理/HID**等路径；禁止混用互不兼容的假设。

### USB版运行模式（中控执行）

| 模式 | 对象前缀 | 特点 | 适用场景 |
|------|---------|------|---------|
| **代理模式** | `agentEvent` / `nodeAgent` / `imageAgent` / `ocrAgent` / `yoloAgent` | 功能最全，需安装主程序+代理程序（都需要签名） | 推荐首选 |
| **蓝牙HID** | `bleEvent` | 硬件级操作，代理IPA可选 | 无法安装主程序时使用 |

**执行位置**：中控（PC端）执行编译后的 `.iec` 文件，通过USB与iOS设备通信
**安装要求**：
- 代理模式：需安装主程序+代理程序（两个IPA，都需要签名）
- HID模式：主程序可选，代理IPA可选（有代理IPA时可使用其部分功能辅助操作）

### 脱机版运行模式（设备端执行）

| 模式 | 对象前缀 | 特点 | 适用场景 |
|------|---------|------|---------|
| **自主激活** | `activeSelf` | 无需电脑，自主截图 | 完全独立运行 |
| **蓝牙HID** | `bleEvent` | 蓝牙硬件操作 | 需要硬件支持 |
| **OTG HID** | `otgEvent` | OTG硬件操作 | 需要硬件支持 |
| **激活器** | `tjCenter` | 通过电脑激活器控制 | 局域网控制 |

**执行位置**：iOS设备端执行，需安装编译后的 `.ipa` 文件（需签名）
**安装要求**：
- 主程序：必须要
- 代理IPA：根据是否使用HID决定（使用HID则不需要，不使用HID则需要）

---

## 自动化服务与硬件外设关系

### iOS与安卓的差异

| 特性 | 安卓 | iOS |
|------|------|-----|
| **无障碍服务** | 系统提供，可开启/关闭 | iOS无传统无障碍服务概念 |
| **代理模式** | 需要安装代理App | 需要安装代理IPA |
| **HID硬件** | 蓝牙HID / OTG HID | 蓝牙HID / OTG HID（脱机版） |
| **系统限制** | 部分App限制无障碍 | 系统级限制更严格 |

### HID模式的优势

**为什么使用HID硬件？**

1. **绕过系统限制**
   - iOS系统对自动化限制严格，无法像安卓一样开启无障碍服务
   - HID硬件直接发送触摸事件，不依赖系统API
   - 可以操作绝大多数App（包括银行、游戏等）

2. **无需越狱/代理**
   - 脱机版使用HID模式，无需安装代理IPA
   - 无需连接电脑，完全独立运行
   - 适合批量部署和长期运行

3. **稳定性高**
   - 不依赖系统服务，不会被系统清理
   - 不受App更新影响
   - 7×24小时稳定运行

### HID模式的工作原理

```
┌─────────────────────────────────────────────┐
│              iOS设备                          │
│  ┌──────────────┐    ┌──────────────────┐  │
│  │ EC脱机运行时  │───▶│   被控App界面     │  │
│  └──────────────┘    └──────────────────┘  │
│         │                                    │
│         │ 蓝牙/OTG                            │
│         ▼                                    │
│  ┌──────────────┐    ┌──────────────────┐  │
│  │  HID硬件设备  │───▶│  模拟人手触摸     │  │
│  └──────────────┘    └──────────────────┘  │
└─────────────────────────────────────────────┘
```

**流程**：
1. EC脚本通过蓝牙/OTG发送指令给HID硬件
2. HID硬件模拟手指触摸屏幕
3. 被控App响应触摸事件（如同真人操作）

### 各模式与自动化服务的关系

| 模式 | 依赖服务 | 系统限制 | 适用场景 |
|------|---------|---------|---------|
| **USB代理** | 代理IPA | 需连接电脑 | 开发调试 |
| **自主激活** | 截图权限 | 较少 | 独立运行 |
| **蓝牙HID** | HID硬件 | 无 | 无法安装代理 |
| **OTG HID** | HID硬件 | 无 | 高稳定性要求 |
| **激活器** | 局域网 | 需电脑 | 局域网控制 |

---

## iOS特有编码规范

### iOS节点属性差异

iOS节点属性与安卓不同，常见属性包括：
- `label`（文本）
- `value`（值）
- `element`（元素类型）
- `rect`（位置）

### 版本差异规范

**USB版特有**：
- 使用`nodeAgent`获取节点（不是`node`）
- 通过`agentEvent`调用Java插件
- 支持CLI工具

**脱机版特有**：
- 使用`node`获取节点（与安卓一致）
- 支持H5 UI
- 使用`activeSelf`自主激活

### 运行模式相关

**代理模式（USB版）**：
```javascript
// 设置代理通信参数
agentEvent.setAgentCallParam({"remoteCallTimeout": 10000});

// 使用nodeAgent获取节点
let node = nodeAgent.getNodeInfo(label("设置"), 5000);
```

**HID模式**：
- 蓝牙HID：`bleEvent`对象
- OTG HID：`otgEvent`对象
- 脱机自主激活：`activeSelf`对象

---

## USB版编码规范

### 基础模板（代理模式-推荐）

```javascript
function main() {
    // 1. 设置节点获取参数（优化速度）
    setFetchNodeParam({
        "labelFilter": "2",
        "maxDepth": "20",
        "visibleFilter": "2"
    });
    
    // 2. 设置代理通信超时
    agentEvent.setAgentCallParam({"remoteCallTimeout": 10000});
    
    // 3. 等待设备就绪
    sleep(1000);
    
    // 4. 获取节点（使用Agent API）
    let node = nodeAgent.getNodeInfo(label("设置"), 5000);
    
    // 5. 判断并操作
    if (node) {
        logd("找到节点: " + JSON.stringify(node));
        
        // 锁定节点
        let locked = lockNode(node);
        if (locked) {
            // 点击
            let result = nodeAgent.click(node);
            logd("点击结果: " + result);
            
            // 解锁节点
            unlockNode(node);
        }
    } else {
        loge("未找到节点");
    }
}

main();
```

### 基础模板（蓝牙HID模式-USB版）

```javascript
function main() {
    // 1. 检查设备授权
    if (!isDeviceAuthOk(1)) {
        logw("设备授权已过期");
        return;
    }
    
    // 2. 初始化鼠标
    initMouse();
    
    // 3. 打开蓝牙连接
    if (!openConnect(1, 15000)) {
        logw("蓝牙连接失败");
        return;
    }
    
    logd("蓝牙连接成功");
    
    // 4. 恢复鼠标原始坐标
    let r = bleEvent.resetZero();
    if (!_bleResultOk(r)) {
        loge("恢复坐标失败: " + r);
        return;
    }
    
    // 5. 设置屏幕缩放
    let scale = bleEvent.getIPhoneScale();
    bleEvent.setScale(scale, scale);
    // 如果是绝对坐标固件，使用 bleEvent.setScale(1, 1);
    
    // 6. 执行操作
    // 移动鼠标
    let mv = bleEvent.mouseMove(300, 588);
    if (_bleResultOk(mv)) {
        logd("移动成功");
        sleep(500);
    }
    
    // 点击
    let cr = bleEvent.clickPoint(300, 400);
    if (_bleResultOk(cr)) {
        logd("点击成功");
    }
}

// 检查结果是否成功
function _bleResultOk(result) {
    return result == null || result == "";
}

main();
```

---

## 脱机版编码规范

### 基础模板（自主激活模式）

```javascript
function main() {
    // 1. 检查激活状态
    if (!activeSelf.isActive()) {
        loge("未激活，请先激活");
        return;
    }
    
    // 2. 截图
    let img = activeSelf.screenshot(10000);
    if (!img) {
        loge("截图失败");
        return;
    }
    
    // 3. 图色识别或OCR
    // 使用image模块处理截图
    let point = image.findColor(img, "#FF0000", {});
    
    // 4. 执行操作（通过HID或其他方式）
    if (point) {
        logd("找到目标: " + point.x + ", " + point.y);
        // 使用HID点击或其他方式
    }
    
    // 5. 释放资源
    image.recycle(img);
}

main();
```

### 基础模板（蓝牙HID模式-脱机版）

```javascript
function main() {
    // 1. 连接蓝牙设备
    let result = bleEvent.startConnect("BLE设备名", true, 15000);
    if (result != null && result != "") {
        loge("蓝牙连接失败: " + result);
        return;
    }
    logd("蓝牙连接成功");
    
    // 2. 恢复鼠标坐标
    let zr = bleEvent.resetZero();
    if (!_isBleResultOk(zr)) {
        logw("鼠标归零失败");
        return;
    }
    
    // 3. 设置屏幕缩放
    let rr = bleEvent.setLastScale();
    if (rr != null && rr != "") {
        // 上一次没有设置过，需要重新设置
        let scale = bleEvent.getIPhoneScale();
        logd("scale is " + scale);
        bleEvent.setScale(scale, scale);
    }
    
    // 4. 执行操作
    testMoveDistance();
}

function testMoveDistance() {
    logd("测试鼠标移动功能");
    let mv = bleEvent.move(300, 588);
    if (_isBleResultOk(mv)) {
        logd("移动鼠标成功");
        sleep(3000);
    } else {
        logw("移动鼠标失败");
    }
    
    // 点击
    logd("测试点击功能");
    let cr = bleEvent.clickPoint(300, 400);
    if (_isBleResultOk(cr)) {
        logd("点击坐标成功");
    } else {
        logw("点击坐标失败");
    }
}

function _isBleResultOk(r) {
    return r == null || r == "";
}

main();
```

### 基础模板（OTG HID模式-脱机版）

```javascript
function main() {
    // 1. 检查OTG连接
    if (!otgEvent.isConnected()) {
        loge("OTG未连接");
        return;
    }
    
    // 2. 设置屏幕尺寸（通过截图获取）
    let img = activeSelf.screenshot(10000);
    if (img) {
        let set = otgEvent.setScreenSize(img.getWidth(), img.getHeight());
        if (_isOtgResultOk(set)) {
            logd("设置屏幕尺寸成功");
        }
        image.recycle(img);
    }
    
    // 3. 重置坐标
    if (!_isOtgResultOk(otgEvent.resetZero())) {
        logw("鼠标归零失败");
        return;
    }
    
    // 4. 执行操作
    testSystemKey();
    testClick();
}

function testSystemKey() {
    logd("测试系统按键功能");
    sleep(200);
    
    // Home键
    let hm = otgEvent.systemKey("home");
    if (_isOtgResultOk(hm)) {
        logd("执行home成功");
    }
    sleep(3000);
    
    // 最近任务
    let rc = otgEvent.systemKey("recents");
    if (_isOtgResultOk(rc)) {
        logd("执行recents成功");
    }
}

function testClick() {
    logd("开始测试点击");
    sleep(1000);
    
    otgEvent.setStep(100);
    
    // 点击坐标
    let result = otgEvent.click(500, 800);
    if (_isOtgResultOk(result)) {
        logd("点击成功");
    }
}

function _isOtgResultOk(r) {
    return r == null || r == "";
}

main();
```

### 基础模板（激活器模式）

```javascript
function main() {
    // 1. 设置激活器地址
    let set = tjCenter.setCenterUrl("http://192.168.2.6:8020");
    if (set != null && set != "") {
        loge("设置激活器地址失败: " + set);
        return;
    }
    logd("设置激活器地址成功");
    
    // 2. 获取设备ID
    let deviceId = device.getDeviceId();
    logd("当前设备ID: " + deviceId);
    
    // 3. 启动App
    let appLaunch = tjCenter.appLaunch(deviceId, "com.tencent.mttlite", false);
    if (appLaunch == null || appLaunch == "") {
        logd("启动App成功");
    } else {
        loge("启动App失败: " + appLaunch);
    }
    
    // 4. 其他操作...
}

main();
```

---

## 脱机版HTML5 UI

### UI特点

- 使用标准HTML5浏览器内核
- 支持Vue、React等前端框架
- 支持H5与脚本的交互
- **USB版无UI**，只有脱机版支持UI

### UI文档路径

- `iostjdocs/funcs/ui/index.md` - UI编写说明
- `iostjdocs/funcs/ui/ui-js-inter.md` - JS交互
- `iostjdocs/funcs/ui/ui-js-inter-adv.md` - 高级交互

### H5 UI编写规范

**⚠️ 大原则**：
1. 使用标准HTML5 + CSS + JavaScript
2. 支持Vue、React等前端框架
3. 通过`script.call()`与脚本交互
4. 不要在UI线程执行耗时操作

**工程结构**：
```
src/
├── main.js          # 主脚本入口
├── ui/
│   ├── index.html   # H5 UI入口
│   ├── style.css    # 样式文件
│   └── app.js       # H5逻辑
└── res/             # 资源文件
```

**简单示例**：

```html
<!-- ui/index.html -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>EC iOS UI</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>EasyClick iOS</h1>
        <button onclick="startTask()">开始任务</button>
        <button onclick="stopTask()">停止任务</button>
        <div id="log"></div>
    </div>
    <script src="app.js"></script>
</body>
</html>
```

```javascript
// ui/app.js - H5端
function startTask() {
    // 调用脚本函数
    script.call('startAutomation');
    document.getElementById('log').innerHTML += '<p>任务已启动</p>';
}

function stopTask() {
    script.call('stopAutomation');
    document.getElementById('log').innerHTML += '<p>任务已停止</p>';
}

// 接收脚本消息
window.onScriptMessage = function(msg) {
    document.getElementById('log').innerHTML += '<p>' + msg + '</p>';
};
```

```javascript
// main.js - 脚本端
function startAutomation() {
    logd("开始自动化任务");
    // 发送消息到H5
    ui.sendMessage("任务进行中...");
    // 执行业务逻辑
}

function stopAutomation() {
    logd("停止自动化任务");
    ui.sendMessage("任务已停止");
}
```

### 常见错误对照表

| 错误写法 | 正确写法 | 说明 |
|----------|----------|------|
| `onclick="startTask()"` | `onclick="script.call('startTask')"` | 必须调用script.call |
| 同步XHR请求 | 使用异步请求 | 避免阻塞UI线程 |
| 在HTML中直接写业务逻辑 | 业务逻辑放到main.js | 分离UI与业务 |
| 不处理script.call返回值 | 添加错误处理 | 提高健壮性 |

---

## 节点选择器

### iOS专用选择器（USB版和脱机版通用）

```javascript
// label匹配（iOS最常用）
label("设置");
labelContains("设置");
labelStartsWith("设");

// id匹配
id("id值");
idMatch("正则表达式");

// name匹配
name("name值");

// value匹配
value("value值");

// xpath
xpath("//node[@label='设置']");

// 组合选择
label("设置").id("setting_id");
```

### 节点属性

```javascript
let node = label("设置").getOneNodeInfo(5000);
if (node) {
    logd("label: " + node.label);      // 标签文本
    logd("id: " + node.id);            // 控件id
    logd("name: " + node.name);        // 名称
    logd("value: " + node.value);      // 值
    logd("visible: " + node.visible);  // 是否可见
    logd("enabled: " + node.enabled);  // 是否可用
    logd("x: " + node.bounds.x);       // x坐标
    logd("y: " + node.bounds.y);       // y坐标
    logd("w: " + node.bounds.width);   // 宽度
    logd("h: " + node.bounds.height);  // 高度
}
```

---

## 常用操作速查

### USB版 - 代理模式

```javascript
// 获取节点
let node = nodeAgent.getNodeInfo(label("设置"), 5000);

// 点击
nodeAgent.click(node);
nodeAgent.clickPoint(x, y);

// 长按
nodeAgent.longClick(node);

// 滑动
nodeAgent.swipe(x1, y1, x2, y2, duration);

// 输入文本
nodeAgent.inputText(node, "文本内容");

// 截图
let img = imageAgent.captureScreen();

// OCR
let ocrObj = ocrAgent.newOcr();
let result = ocrAgent.ocrImage(img);
```

### USB版 - 蓝牙HID

```javascript
// 打开串口
bleEvent.openSerial(15000);

// 恢复坐标
bleEvent.resetZero();

// 设置缩放
bleEvent.setScale(1.0, 1.0);

// 移动
bleEvent.mouseMove(x, y);

// 点击
bleEvent.clickPoint(x, y);

// 长按
bleEvent.press(x, y, duration);

// 滑动
bleEvent.swipe(x1, y1, x2, y2, duration);
```

### 脱机版 - 自主激活

```javascript
// 检查激活
activeSelf.isActive();

// 截图
let img = activeSelf.screenshot(10000);

// 获取屏幕方向
let orientation = activeSelf.deviceOrientation(10000);
```

### 脱机版 - 蓝牙HID

```javascript
// 连接蓝牙
bleEvent.startConnect("设备名", true, 15000);

// 检查连接
bleEvent.isConnected();

// 恢复坐标
bleEvent.resetZero();

// 设置缩放
bleEvent.setScale(scale, scale);

// 移动
bleEvent.move(x, y);

// 点击
bleEvent.clickPoint(x, y);
```

### 脱机版 - OTG HID

```javascript
// 检查连接
otgEvent.isConnected();

// 设置URL（如使用网络HID）
otgEvent.setUrl("http://...");

// 设置超时
otgEvent.setTimeout(10000);

// 设置屏幕尺寸
otgEvent.setScreenSize(width, height);

// 重置坐标
otgEvent.resetZero();

// 系统按键
otgEvent.systemKey("home");
otgEvent.systemKey("recents");
otgEvent.systemKey("back");

// 点击
otgEvent.click(x, y);

// 滑动
otgEvent.swipe(x1, y1, x2, y2, duration);
```

### 脱机版 - 激活器

```javascript
// 设置激活器地址
tjCenter.setCenterUrl("http://192.168.2.6:8020");

// 启动App
tjCenter.appLaunch(deviceId, bundleId, killExist);

// 杀死App
tjCenter.appKillByBundleId(deviceId, bundleId);

// 安装App
tjCenter.appInstall(deviceId, ipaPath);

// 卸载App
tjCenter.appUninstall(deviceId, bundleId);
```

---

## 版本差异总结

| 功能 | USB版 | 脱机版 |
|------|-------|--------|
| 连接方式 | USB连接电脑 | 独立运行 |
| UI | 无 | HTML5 |
| 代理模式 | ✅ | ❌ |
| 蓝牙HID | ✅ | ✅ |
| OTG HID | ❌ | ✅ |
| 自主激活 | ❌ | ✅ |
| 激活器 | ❌ | ✅ |
| 开发工具 | ✅ | ❌ |
| 云控 | ❌ | ✅ |
| 多工作器 | ❌ | ✅ |

---

## 最佳实践

### 1. 节点获取优化（USB版）

```javascript
setFetchNodeParam({
    "labelFilter": "2",
    "maxDepth": "20",
    "visibleFilter": "2",
    "excludedAttributes": "selected,enabled"
});
```

### 2. 蓝牙HID坐标校准

```javascript
// 绝对坐标固件
bleEvent.setScale(1.0, 1.0);

// 相对坐标固件
let scale = bleEvent.getIPhoneScale();
bleEvent.setScale(scale, scale);
```

### 3. 异常处理

```javascript
function main() {
    try {
        if (!isDeviceAuthOk(1)) {
            throw new Error("设备授权过期");
        }
        doBusiness();
    } catch (e) {
        loge("异常: " + e.message);
    }
}
```

---

## 工程结构规范

### USB版工程结构

```
ios_project/
├── src/
│   └── main.js              # 主脚本入口
├── res/                     # 资源文件
│   └── images/
├── project.json             # 工程配置
└── ios_project.iml          # IDEA模块配置
```

**关键说明**：
- USB版**无UI**，纯脚本执行
- 通过IDEA插件直接运行和调试
- 脚本入口在`src/main.js`

### 脱机版工程结构

```
iostj_project/
├── src/
│   ├── main.js              # 主脚本入口
│   └── ui/                  # H5 UI文件（可选）
│       ├── index.html
│       ├── style.css
│       └── app.js
├── res/                     # 资源文件
│   └── images/
├── project.json             # 工程配置
└── package.json             # 脱机包配置
```

**关键说明**：
- 脱机版支持**HTML5 UI**
- UI文件放在`src/ui/`目录
- 通过打包工具生成脱机工程包
- 部署到设备后独立运行

---

## 调试技巧

### USB版调试

1. **查看日志**
   - IDEA插件日志面板实时显示
   - 使用`logd()`/`loge()`输出调试信息

2. **节点分析**
   - 使用IDEA插件的"节点查看"功能
   - 获取当前界面控件树

3. **截图对比**
   - 使用`imageAgent.captureScreen()`截图
   - 保存到本地分析

### 脱机版调试

1. **日志查看**
   - 脱机版内置日志查看器
   - 使用`logd()`/`loge()`输出

2. **H5 UI调试**
   - H5页面可在浏览器预览
   - 使用Safari开发者工具调试

3. **自主激活截图**
   - `activeSelf.screenshot()`获取屏幕截图
   - 用于图色识别调试

---

## 排障要点

### USB版常见问题

1. **设备连接失败**
   - 检查USB线是否正常
   - 确认代理IPA已安装并运行
   - 检查IDEA插件版本

2. **节点获取失败**
   - 调整`setFetchNodeParam`参数
   - 确认被控App已在前台

3. **蓝牙HID连接失败**
   - 确认蓝牙设备已配对
   - 检查设备授权状态

### 脱机版常见问题

1. **激活失败**
   - 检查网络连接（自主激活）
   - 确认激活器地址正确
   - 检查设备时间是否准确

2. **H5 UI不显示**
   - 检查HTML文件路径
   - 确认UI文件已打包

3. **HID操作无效**
   - 确认HID硬件已连接
   - 检查坐标设置是否正确

---

## 参考文档

- USB版文档：`iosdocs/funcs/`
- 脱机版文档：`iostjdocs/funcs/`
- 在线文档：https://ieasyclick.com/docs/zh-cn/funcs
