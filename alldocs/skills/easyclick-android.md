# EasyClick 安卓自动化开发 Skill

## 前置阅读

**必须先阅读**：
1. [全局强制性规则](easyclick-global-rules.md) - 所有平台通用的绝对禁止规则
2. [通用开发规范](easyclick-dev-guide.md) - 跨平台开发流程和编码规范

**本文内容**：仅包含安卓平台特有的技术细节和API使用规范。

---

## 概述

**EasyClick安卓开发特点**：
- 双平面架构：控制面（IDEA+插件）+ 编写面（脚本工程）
- 五种运行模式：无障碍、代理、Root、蓝牙HID、OTG HID
- 支持CLI工具链驱动IDEA插件
- 支持原生XML UI和H5 UI

---

## 开发架构

### 双平面架构

```
┌─────────────────────────────────────────────────────────────┐
│                     开发者PC                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │ 终端/编辑器    │───▶│ ec-android-cli│───▶│ IDEA+EC插件   │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│                              │                      │       │
│                              │                      ▼       │
│                              │              ┌──────────────┐│
│                              │              │   设备连接    ││
│                              │              └──────────────┘│
│                              │                      │       │
└──────────────────────────────┼──────────────────────┼───────┘
                               │                      │
                               ▼                      ▼
                        ┌──────────────┐    ┌──────────────┐
                        │  脚本工程      │    │ Android设备  │
                        │  (JS脚本+资源) │    │ EC运行时     │
                        └──────────────┘    └──────────────┘
```

**控制面**：IntelliJ IDEA + EasyClick开发插件 + 已连接设备
- 连接手机、下发/停止脚本、编译打包
- 抓取界面信息、输出引擎/插件日志

**编写面**：在IDEA或外部编辑器中编辑仓库中的脚本与资源

---

## 工程结构规范

### 标准工程结构

```
ec_project/
├── src/
│   ├── layout/
│   │   ├── ui.js              # UI入口（工程入口配置指向这里）
│   │   └── main.xml           # 主布局文件
│   ├── js/
│   │   └── main.js            # 业务脚本（ui.start()后被执行）
│   └── res/                   # 图片资源
│       └── icon.png
├── docs/                      # 文档目录
├── ec_work_config/
│   └── android/
│       └── bin/
│           └── ec-android-cli # CLI工具
└── project.json               # 工程配置
```

### 关键文件说明

| 文件 | 作用 | 注意事项 |
|------|------|---------|
| `layout/ui.js` | UI入口 | 工程入口必须指向这里，不是`js/main.js` |
| `layout/*.xml` | XML布局 | 仅安卓支持，iOS脱机版用H5 |
| `js/main.js` | 业务脚本 | 点击启动后执行 |
| `res/*` | 资源文件 | 图片等静态资源 |

---

## CLI工具链（ec-android-cli）

### 概述

`ec-android-cli`是用命令行去"远程按键"控制IDEA里的EasyClick插件。

**前置条件**：
- [ ] IntelliJ IDEA已启动
- [ ] EasyClick开发工具插件已加载且可响应
- [ ] `-m`参数与IDEA工程模块名一致
- [ ] 设备已在IDEA侧连接好

### CLI使用纪律

- 优先使用仓库相对路径调用（Windows可用`ec-android-cli.exe`或系统可解析的等价命令）
- **`-m/--module`必须与IDEA工程模块名一致**；多工程/多窗口时用**`-p/--project`**指向工程根目录消歧（以`SKILL.md`为准）
- 默认日志多为**stderr JSON行**；自动化解析以`SKILL.md`为准

### 子命令一览

| 分组 | 子命令 | 作用 | 需要`-m` |
|------|--------|------|---------|
| 生命周期 | `preview` | 预览工程 | ✅ |
| 生命周期 | `run` | 运行工程 | ✅ |
| 生命周期 | `stop` | 停止当前运行 | ✅ |
| 构建 | `build` | 构建IEC | ✅ |
| 感知 | `capture-screen` | 截图并输出路径 | ✅ |
| 感知 | `capture-node` | 抓UI节点（UIX/XML） | ✅ |
| 感知 | `ocr-local-image` | OCR本地图片 | ✅ |
| 感知 | `ocr-screen` | OCR当前屏幕 | ✅ |
| 感知 | `test-image` | 图片模板匹配测试 | ✅ |
| 日志 | `monitor` | 仅持续输出日志流 | ❌ |

### 通用参数

| 参数 | 含义 | 默认值 |
|------|------|--------|
| `-m` / `--module` | **必填**（monitor除外）。IDEA模块名 | - |
| `-p` / `--project` | 工程根目录（多工程时消歧） | - |
| `-f` / `--format` | 日志格式：`text`或`json` | `json` |
| `-o` / `--log` | 日志追加写入文件路径 | - |
| `-k` / `--stop-on` | 日志包含该子串时退出 | 见下文 |
| `-w` / `--monitor-logs` | 是否持续跟日志 | 见下文 |
| `-r` / `--random-log` | 在`ai_logs/`下自动生成日志文件 | `false` |

**`-k`多关键字**：用`|||`连接多个子串，表示OR（任一子串出现即退出）

**默认`-k/-w`**：
- `preview`：默认`-k 执行UI结束`，`-w true`
- `run`：默认`-k 脚本已运行结束`，`-w true`
- `stop`：默认`-k 停止失败|||停止运行成功|||无设备连接`，`-w true`
- `build`：默认`-k release.iec|||编译IEC成功|||编译失败`，`-w false`

### 使用示例

```bash
# 设置CLI路径
EC=./ec_work_config/android/bin/ec-android-cli

# 预览工程
$EC preview -m app

# 运行工程（带日志）
$EC run -m app -f json -o /tmp/easyclick.log

# 停止运行
$EC stop -m app

# 构建IEC
$EC build -m app

# 截图
$EC capture-screen -m app -d /tmp/screenshots

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

#### capture-screen（截图）

```bash
$EC capture-screen -m app
$EC capture-screen -m app -n              # 仅网络截图
$EC capture-screen -m app -d /tmp/shots   # 指定保存目录
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
$EC ocr-local-image -m app -i a.jpg -t paddleOcrOnnxV5 -P 48 -X 960
```

**参数**：
- `-i/--path`：本地图像路径（必填）
- `-t/--ocr-type`：模型类型，默认`paddleOcrNcnnV5`
- `-P/--padding`：默认`32`
- `-X/--max-side-len`：默认`640`
- `-R/--release`：是否释放资源，默认`false`

#### ocr-screen（OCR屏幕）

```bash
$EC ocr-screen -m app
$EC ocr-screen -m app -t paddleOcrOnnxV5 -P 48 -X 960
```

#### test-image（图片测试）

```bash
# 抓屏测试（默认）
$EC test-image -m app -s /tmp/s.png

# 本图测试
$EC test-image -m app -T 1 -s s.png -B b.png

# 完整参数
$EC test-image -m app -s /tmp/s.png -F findImage -g 0,0,0,0 -l 1 -E 0.7 -H 0.8
```

**参数**：
- `-s/--small-image-path`：小图路径（必填）
- `-T/--test-type`：`1`本图测试，`2`抓屏测试（默认）
- `-B/--big-image-path`：大图路径（test-type=1时需要）
- `-F/--func`：函数名，`findImageByColor|findImage|matchTemplate`（默认`findImage`）
- `-M/--method`：模板匹配方式，默认`5`
- `-g/--range`：范围，默认`0,0,0,0`
- `-l/--limit`：限制，默认`1`
- `-L/--max-level`：最大层级，默认`-1`
- `-E/--weak-threshold`：弱阈值，默认`0.7`
- `-H/--threshold`：阈值，默认`0.8`
- `-C/--opencv-mat`：是否使用Mat，`1`否，`2`是（默认`1`）

---

## 文档结构说明

### 权威来源优先级（从高到低）

1. **本仓库 `docs/` 目录** - 以 `docs/funcs/index.md` 为索引入口
2. **脚本函数在线总索引**：`https://ieasyclick.com/docs/zh-cn/funcs`
3. **开发文档总站**：`https://www.ieasyclick.net/docs/`

### 核心文档路径

| 模块 | 文档路径 | 说明 |
|------|---------|------|
| 全局模块 | `docs/funcs/global/global.md` | 全局函数、版本判断、插件加载 |
| 选择器&节点 | `docs/funcs/global/selector-node.md` | 节点选择器、xpath、属性匹配 |
| 全局快捷事件 | `docs/funcs/global/global-shortcut.md` | 快捷点击、滑动、系统按键 |
| 无障碍事件 | `docs/funcs/acevent-api.md` | 无障碍模式专用API |
| 代理事件 | `docs/funcs/event-api.md` | 代理模式专用API |
| HID事件 | `docs/funcs/hid-event-api.md` | HID硬件模式API |
| 蓝牙HID | `docs/funcs/blehid-event-api.md` | 蓝牙HID硬件API |
| OTG HID | `docs/funcs/otghid-event-api.md` | OTG HID硬件API |
| 图色函数 | `docs/funcs/image-api.md` | 截图、找图、找色 |
| OCR识别 | `docs/funcs/ocr-api.md` | 文字识别 |
| YOLO函数 | `docs/funcs/yolo-api.md` | 目标检测 |
| 设备函数 | `docs/funcs/device-api.md` | 设备信息获取 |
| 网络函数 | `docs/funcs/http-api.md` | HTTP请求 |
| 文件函数 | `docs/funcs/file-api.md` | 文件操作 |
| 悬浮窗 | `docs/funcs/floaty-api.md` | 悬浮窗UI |
| 线程函数 | `docs/funcs/thread-api.md` | 多线程 |
| UI编写 | `docs/funcs/ui/index.md` | 原生UI编写 |
| 中控投屏 | `docs/funcs/center-api.md` | 中控系统API |
| ADB函数 | `docs/funcs/adbClient-api.md` | 无线ADB |
| Shell命令 | `docs/funcs/shell-api.md` | Shell执行 |
| SQLite | `docs/funcs/sqlite-api.md` | 数据库操作 |
| Storage | `docs/funcs/storage-api.md` | 键值存储 |
| 工具函数 | `docs/funcs/utils-api.md` | 常用工具 |
| 网络验证 | `docs/funcs/netcard-api.md` | 卡密验证 |
| JDBC MySQL | `docs/funcs/jdbcmysql-api.md` | 数据库连接 |

---

## 运行模式说明

**运行模式选择原则**：当涉及点击/触摸链路选择时，先阅读`docs/funcs/acevent-api.md`、`docs/funcs/event-api.md`等对应章节，再选择**无障碍/代理/HID**等路径；禁止混用互不兼容的假设。

### 五种运行模式

| 模式 | 对象前缀 | 特点 | 适用场景 |
|------|---------|------|---------|
| **无障碍模式** | `acEvent` | 需要开启无障碍服务 | 常规自动化 |
| **代理模式** | `agentEvent` | 需要启动代理服务 | 免root、功能最全 |
| **Root模式** | `shell` | 需要root权限 | 系统级操作 |
| **蓝牙HID** | `bleEvent` | 需要蓝牙HID硬件 | 无法开启无障碍 |
| **OTG HID** | `otgEvent` | 需要OTG HID硬件 | 无法开启无障碍 |

### 模式功能详细对比

| 功能 | 无障碍 | 代理 | Root | 蓝牙HID | OTG HID |
|------|--------|------|------|---------|---------|
| **节点选择器** | ✅ | ✅ | ✅ | ❌ | ❌ |
| **图色识别** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **OCR识别** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **YOLO检测** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **点击/滑动** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **输入文本** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Shell命令** | ❌ | ✅ | ✅ | ❌ | ❌ |
| **系统按键** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **截图** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **节点属性获取** | ✅ | ✅ | ✅ | ❌ | ❌ |
| **手势操作** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **应用启动** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **剪贴板操作** | ✅ | ✅ | ✅ | ❌ | ❌ |
| **输入法操作** | ✅ | ✅ | ✅ | ❌ | ❌ |

### 各模式特点详解

#### 1. 无障碍模式 (`acEvent`)

**前置条件**：
- 开启无障碍服务
- 授权EC无障碍权限

**特点**：
- 系统原生支持，稳定性好
- 支持节点选择器和属性获取
- 无需root或额外硬件
- 部分系统可能限制后台运行

**适用场景**：
- 常规自动化任务
- 能正常开启无障碍的设备
- 不需要系统级操作的场景

**代码示例**：
```javascript
function main() {
    // 无障碍模式直接使用全局函数
    startEnv();
    
    // 使用选择器获取节点
    let node = text("设置").getNodeInfo(5000);
    if (node) {
        click(text("设置"));
    }
}
```

#### 2. 代理模式 (`agentEvent`)

**前置条件**：
- 安装并启动EC代理服务
- 设备与电脑在同一网络（无线代理）或USB连接

**特点**：
- 功能最全，支持所有操作
- 免root即可执行Shell命令
- 支持更多高级功能
- 需要保持代理服务运行

**适用场景**：
- 需要功能最全的自动化
- 免root但需要Shell命令
- 复杂自动化任务

**代码示例**：
```javascript
function main() {
    // 代理模式使用agentEvent设置参数
    agentEvent.setAgentCallParam({"remoteCallTimeout": 10000});
    
    // 节点选择器与无障碍模式相同（使用全局API）
    let node = text("设置").getNodeInfo(5000);
    if (node) {
        node.click();
    }
    
    // 执行Shell命令（免root）
    let result = shell.execAgentCommand("ls /sdcard");
}
```

#### 3. Root模式 (`shell`)

**前置条件**：
- 设备已root
- 授权EC root权限

**特点**：
- 可执行系统级操作
- 支持所有Shell命令
- 不依赖无障碍或代理服务
- 需要设备已root

**适用场景**：
- 需要系统级操作
- 设备已root
- 需要修改系统文件或配置

**代码示例**：
```javascript
function main() {
    // Root模式使用shell.sudo执行root命令
    let result = shell.sudo("ls /data");
    logd("结果: " + result);
    
    // 或使用execCommand自动区分代理/root
    let result2 = shell.execCommand("echo 'test' > /sdcard/test.txt");
}
```

#### 4. 蓝牙HID模式 (`bleEvent`)

**前置条件**：
- 蓝牙HID硬件设备
- 设备与HID硬件配对连接
- **无需开启无障碍服务**

**与自动化服务的关系**：
- HID模式**不能使用**安卓无障碍服务（`startEnv()`会失败）
- 通过蓝牙硬件直接发送触摸事件，完全绕过系统
- 无需开启任何系统服务，直接操作硬件
- 适合对安全性要求高的场景（如银行App、部分游戏）
- **注意**：HID模式下节点选择器不可用，只能使用坐标操作

**特点**：
- 硬件级操作，绕过系统限制
- 无需开启无障碍
- 不支持节点选择器（只能坐标操作）
- 需要额外硬件

**适用场景**：
- 无法开启无障碍的设备
- 需要绕过系统限制
- 有蓝牙HID硬件

**代码示例**：
```javascript
function main() {
    // 蓝牙HID模式使用bleEvent前缀
    // 1. 连接蓝牙设备
    let result = bleEvent.startConnect("BLE设备名", true, 15000);
    if (result != null && result != "") {
        loge("连接失败: " + result);
        return;
    }
    
    // 2. 恢复坐标
    bleEvent.resetZero();
    
    // 3. 设置屏幕缩放
    let scale = bleEvent.getIPhoneScale();
    bleEvent.setScale(scale, scale);
    
    // 4. 执行操作（坐标点击）
    bleEvent.clickPoint(500, 800);
    
    // 5. 截图（HID模式用type=1）
    image.requestScreenCapture(10000, 1);
    let img = image.captureScreen();
}
```

#### 5. OTG HID模式 (`otgEvent`)

**前置条件**：
- OTG HID硬件设备
- 设备支持OTG功能
- **无需开启无障碍服务**

**与自动化服务的关系**：
- HID模式**不能使用**安卓无障碍服务（`startEnv()`会失败）
- 通过OTG线连接硬件，直接发送触摸事件
- 完全绕过系统，无需开启任何服务
- 稳定性高于蓝牙HID（有线连接）
- **注意**：HID模式下节点选择器不可用，只能使用坐标操作

**特点**：
- 硬件级操作，绕过系统限制
- 无需开启无障碍
- 不支持节点选择器（只能坐标操作）
- 通过OTG线连接

**适用场景**：
- 无法开启无障碍的设备
- 需要绕过系统限制
- 有OTG HID硬件

**代码示例**：
```javascript
function main() {
    // OTG HID模式使用otgEvent前缀
    // 1. 检查OTG连接
    if (!otgEvent.isConnected()) {
        loge("OTG未连接");
        return;
    }
    
    // 2. 设置屏幕尺寸
    otgEvent.setScreenSize(1080, 1920);
    
    // 3. 重置坐标
    otgEvent.resetZero();
    
    // 4. 执行操作
    otgEvent.click(500, 800);
    otgEvent.swipe(500, 1500, 500, 500, 300);
    
    // 系统按键
    otgEvent.systemKey("home");
}
```

### 模式选择建议

| 场景 | 推荐模式 |
|------|---------|
| 普通自动化，能开无障碍 | 无障碍模式 |
| 需要功能最全，免root | 代理模式 |
| 需要系统级操作，有root | Root模式 |
| 无法开启无障碍，有蓝牙设备 | 蓝牙HID |
| 无法开启无障碍，有OTG设备 | OTG HID |

---

## 安卓特有编码规范

### 运行模式相关规范

**模式选择原则**：
- 无障碍模式：标准自动化，支持节点操作
- 代理模式：需要代理服务，支持Shell命令
- Root模式：需要Root权限，支持系统级操作
- HID模式（蓝牙/OTG）：硬件级操作，不支持节点选择器

**禁止混用不兼容模式**：
- ❌ HID模式下调用`startEnv()`（HID不需要启动环境）
- ❌ 代理模式使用`shell.sudo()`（应使用`shell.execAgentCommand()`）

### 安卓特有API示例

```javascript
// 启动环境（无障碍/代理/Root模式需要）
startEnv();

// 安卓节点选择器示例
let node = text("设置").id("com.android.settings:id/title").getNodeInfo(5000);
if (node) {
    click(node);
}

// 不同模式的Shell命令
// 无障碍/Root模式：
let result = shell.sudo("ls /data");

// 代理模式：
let result = shell.execAgentCommand("ls /data");
```

---

## UI编写规范

### XML规范（仅安卓）

**⚠️ 大原则**：
1. EC不是完整Android，只支持文档明确列出的标签和属性
2. 禁止照搬Android Studio习惯（`ConstraintLayout`、`textStyle`、`elevation`等不支持）
3. 入口必须是`layout/ui.js`
4. 不要在`ui.js`阻塞主线程

**EC支持的容器**：
- `LinearLayout` - 线性布局（最常用）
- `FrameLayout` - 帧布局
- `RelativeLayout` - 相对布局
- `ScrollView` - 纵向滚动（**只能1个直接子节点**）
- `HorizontalScrollView` - 横向滚动（**只能1个直接子节点**）
- `CardView` - 卡片布局

**EC支持的控件**：
`Button` / `TextView` / `EditText` / `CheckBox` / `RadioButton` / `Spinner` / `Switch` / `ImageView` / `WebView` / `View` / `include` / `Canvas`

### 控件详细规范

**EditText输入框**：
```xml
<EditText
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:tag="input_card"
    android:hint="请输入卡密"           <!-- ✅ hint做提示，不是text -->
    android:textSize="14sp"
    android:inputType="text" />        <!-- text/phone/number/textPassword/numberPassword -->
```

**Spinner下拉选择**：
```xml
<Spinner
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:tag="spinner_sex"
    android:text="男|女|保密"            <!-- ✅ 竖线分隔选项 -->
    android:defaultText="男"            <!-- 默认选中 -->
    android:mode="dialog" />            <!-- dialog 或 dropdown -->
```

**ScrollView滚动视图**：
```xml
<!-- ✅ 内部只能有1个直接子节点，且高度必须是wrap_content -->
<ScrollView
    android:layout_width="match_parent"
    android:layout_height="0dp"
    android:layout_weight="1"
    android:fillViewport="true">
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content">  <!-- ✅ 必须是wrap_content -->
        <!-- 内容 -->
    </LinearLayout>
</ScrollView>
```

**XML示例**：
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<LinearLayout
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:android="http://schemas.android.com/apk/res/android"
    xsi:noNamespaceSchemaLocation="layout.xsd"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp">
    
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="标题"
        android:textSize="16sp"
        android:textColor="#000000" />
        
    <EditText
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:tag="input_field"
        android:hint="请输入内容"
        android:textSize="14sp" />
        
    <Button
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:tag="btn_submit"
        android:text="提交" />
        
</LinearLayout>
```

### 单位规范

| 用途 | 单位 | 示例 |
|------|------|------|
| 文字大小 | sp | `android:textSize="16sp"` |
| 宽高/边距 | dp | `android:layout_width="100dp"` |
| 颜色 | #RRGGBB | `android:textColor="#000000"` |

### 宽高取值

- `match_parent` - 填满父容器
- `wrap_content` - 自适应内容
- `0dp` - 配合weight使用

**⚠️ 严禁使用`wrap_parent` / `fill_parent`**

### JS交互规范

```javascript
function main() {
    // 加载布局 - 每个ui.layout()会创建一个标签页
    // 如需多标签：ui.layout("标签1", "main.xml"); ui.layout("标签2", "page2.xml");
    ui.layout("标题", "main.xml");
    
    // 重置UI变量（获取视图前必须调用）
    ui.resetUIVar();
    
    // 通过tag获取视图
    let inputField = ui.input_field;
    let submitBtn = ui.btn_submit;
    
    // 绑定事件
    ui.setEvent(submitBtn, "click", function(view) {
        let value = inputField.getText();
        logd("输入值: " + value);
        ui.saveAllConfig();
    });
}

main();
```

### 常见错误对照表

| 错误写法 | 正确写法 | 说明 |
|----------|----------|------|
| `encoding="utf-8"` | `encoding="UTF-8"` | 大写 |
| `android:layout_height="wrap_parent"` | `android:layout_height="wrap_content"` | 关键词错误 |
| `android:textSize="14dp"` | `android:textSize="14sp"` | 字体用sp |
| `android:hit="提示"` | `android:hint="提示"` | 拼写错误 |
| `android:text="提示"`（EditText） | `android:hint="提示"` | EditText用hint |
| ScrollView子节点`match_parent` | ScrollView子节点`wrap_content` | 高度问题 |

### tag命名规范

- 每个需要在代码里访问的控件必须有`android:tag`
- 推荐英文+下划线（如`input_username`、`btn_submit`）
- tag名不要重复

### 重要限制

- **不支持自定义XML组件**
- **不支持XML样式文件**（没有`styles.xml`）
- **不支持国际化语言文件**（没有`strings.xml`）
- **不支持`ConstraintLayout`**
- **不支持`textStyle`、`fontFamily`、`drawableLeft`等属性**
- RecyclerView要在JS里动态构建

### H5 UI（跨平台）

安卓也支持H5 UI，与iOS脱机版共用相同技术栈：
- 使用HTML5 + CSS + JavaScript
- 支持Vue、React等前端框架
- 通过`ui.loadHtml()`加载
- 参考`docs/funcs/ui/index.md`

**H5 UI vs XML UI对比**：

| 特性 | H5 UI | XML UI |
|------|-------|--------|
| 跨平台 | ✅ 安卓+iOS | ❌ 仅安卓 |
| 美观度 | 高（CSS样式丰富） | 一般（原生样式） |
| 性能 | 一般 | 高 |
| 开发难度 | 低（前端技术） | 低（简单XML） |
| 功能丰富度 | 高 | 有限 |

---

## 常用函数速查

### 全局函数

```javascript
// 启动环境
startEnv();

// 睡眠等待
sleep(1000);

// 点击
click(selector);
clickPoint(x, y);

// 滑动
swipe(x1, y1, x2, y2, duration);

// 输入文本
inputText(selector, text);

// 截图
captureScreen(path);

// 查找节点
let node = selector.getNodeInfo(timeout);
```

### 选择器函数

```javascript
// 文本匹配
text("文本");
textContains("包含文本");
textStartsWith("开头文本");
textMatches("正则表达式");

// ID匹配
id("id值");

// 类名匹配
clz("类名");

// 描述匹配
desc("描述");

// 组合选择
text("设置").id("title").clz("TextView");

// 父子关系
parent(childSelector);
child(parentSelector);
sibling(selector);
```

### 设备函数

```javascript
// 获取屏幕尺寸
let width = device.getScreenWidth();
let height = device.getScreenHeight();

// 获取Android ID
let androidId = device.getAndroidId();

// 获取SDK版本
let sdk = device.getSdkInt();

// 获取设备标识
let identifier = device.getDeviceIdentifier();
```

### 图色函数

```javascript
// 申请截图权限
image.requestScreenCapture(timeout);
image.requestScreenCapture(timeout, 1); // HID模式用type=1

// 截图
let img = image.captureScreen();

// 找图
let point = image.findImage(img, templateImg, options);

// 找色
let point = image.findColor(img, color, options);

// 多点找色
let point = image.findMultiColors(img, mainColor, subColors);

// 释放图片
image.recycle(img);
```

### OCR函数

```javascript
// 初始化OCR
let ocrObj = ocr.newOcr();

// 识别图片
let result = ocrObj.ocrImage(img);

// 释放资源
ocrObj.releaseAll();
```

### HTTP函数

```javascript
// GET请求
let response = http.get(url);

// POST请求
let response = http.post(url, data);

// 下载文件
http.downloadFile(url, path);
```

### 文件函数

```javascript
// 读取文件
let content = file.readFile(path);

// 写入文件
file.writeFile(path, content);

// 判断文件存在
let exists = file.exists(path);
```

---

## 调试技巧

### 1. 使用CLI抓取节点树

```bash
# 抓取当前页面节点树
$EC capture-node -m app -d /tmp/nodes

# 分析生成的UIX文件，获取控件属性
```

### 2. 使用CLI截图对比

```bash
# 截图保存
$EC capture-screen -m app -d /tmp/screenshots
```

### 3. 使用CLI测试图色参数

```bash
# 测试模板匹配参数
$EC test-image -m app -s /tmp/template.png -F findImage -E 0.7 -H 0.8
```

### 4. 代码中节点树分析

```javascript
// 获取当前页面所有节点
let nodes = text("").getNodeInfo(1000);
logd("节点数量: " + nodes.length);
for (let i = 0; i < nodes.length; i++) {
    logd("节点" + i + ": text=" + nodes[i].text + ", id=" + nodes[i].id);
}
```

### 5. 日志分级

```javascript
logd("调试信息");  // debug
logi("普通信息");  // info
logw("警告信息");  // warning
loge("错误信息");  // error
```

---

## 最佳实践

### 1. 异常处理

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

### 2. 循环等待

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

### 3. 页面状态判断

```javascript
function isPageLoaded() {
    // 通过关键元素判断页面是否加载完成
    return text("关键元素").getNodeInfo(3000) != null;
}
```

### 4. 使用Mat模式优化图色

```javascript
// 初始化Mat模式（节省内存）
image.useOpencvMat(1);

// 设置找图超时
image.setInitParam({"action_timeout": 5000});

// 截图并处理
let img = image.captureScreen();
let point = image.findImage(img, templateImg, {
    "threshold": 0.9,
    "maxLevel": 5
});

// 释放图片
image.recycle(img);
```

### 5. 悬浮窗使用

```javascript
// 显示悬浮窗
floaty.show("悬浮窗标题", "content.html", 300, 400);

// 关闭悬浮窗
floaty.closeAll();

// 发送消息到悬浮窗
floaty.sendMessage("message");
```

### 6. 多线程使用

```javascript
// 创建线程
let threadId = thread.createThread(function() {
    logd("子线程执行中");
    // 子线程任务
});

// 等待线程结束
thread.waitForThread(threadId, 10000);

// 停止线程
thread.stopThread(threadId);
```

**⚠️ 注意**：
- 子线程中不能使用UI相关操作
- 子线程中不能使用节点选择器（除非使用代理模式）
- 注意线程同步和资源竞争

---

## 排障要点

### CLI常见问题

1. **IDEA没开/插件没加载**：CLI表现为异常日志或超时；先回到IDEA手动验证设备连接
2. **设备未连接**：日志里可能出现`无设备连接`；先在IDEA侧把连接走通
3. **`-m`写错**：模块名与工程不一致；这是高频配置错误
4. **多工程未带`-p`**：命中错误IDEA实例；加`-p`指向当前工程根
5. **把`build`当`run`**：`build`关注编译成功失败关键字；调试主循环通常是`preview/run/stop`

### 脚本常见问题

1. **节点选择不到**：先用CLI抓取节点树确认属性
2. **点击不生效**：检查运行模式是否支持节点操作
3. **截图失败**：检查权限申请和运行模式
4. **OCR识别率低**：调整padding和max-side-len参数

---

## 参考文档

- 完整API文档：`docs/funcs/`
- UI编写规范：`docs/funcs/ui/index.md`
- CLI工具：`ec_work_config/android/bin/ec-android-cli -h`
- 在线文档：https://ieasyclick.com/docs/zh-cn/funcs
