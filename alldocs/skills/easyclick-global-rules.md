# EasyClick 全局强制性开发规则

## 绝对禁止（硬红线）

以下规则适用于所有EasyClick平台（安卓、iOS、鸿蒙），违反任何一条都可能导致脚本无法运行或产生不可预期行为。

### 1. 禁止假设/猜测

- ❌ **禁止假设**界面布局、控件坐标、控件属性值
- ❌ **禁止假设**页面状态、API名称/参数/返回值
- ❌ **禁止假设**函数行为细节

**正确做法**：
- ✅ 先取证（获取控件树/截图/日志）
- ✅ 再查文档确认API
- ✅ 基于真实数据编写代码

### 2. 禁止编造API

- ❌ **禁止编造**EC API
- ❌ **禁止**把其他框架/其他版本的函数当成EC API
- ❌ **禁止**凭`libs/*.js`猜测API语义

**正确做法**：
- ✅ 以`docs/`目录文档为准
- ✅ 不确定时查阅在线文档
- ✅ 优先使用本仓库`docs/`（与工程版本一致）

### 3. 禁止未取证写选择器

- ❌ **禁止**在未获得真实设备侧结构信息前写选择器/坐标
- ❌ **禁止**在未读取文档前编写业务实现

**正确做法**：
- ✅ 先输出获取节点树/截图/日志的命令
- ✅ 分析真实数据后再写选择器
- ✅ 允许先输出"将读取哪些文档路径/将执行哪些取证命令"的准备步骤

### 4. 禁止坐标优先

- ❌ **禁止**在存在可用控件属性（`text/desc/id/clz`等）时使用坐标点击
- ❌ **禁止**用"扩大模糊匹配"来掩盖不唯一（例如过宽正则）

**坐标兜底必须同时满足**：
1. 已证明控件属性不可用或不唯一
2. 在代码注释写明原因与依据（引用节点树摘录或证据文件名/路径）

### 5. 禁止照搬Android Studio习惯

- ❌ **禁止**照搬Android Studio / 原生Android XML习惯写EC UI
- ❌ **禁止**使用文档未列出的标签和属性
- ❌ **禁止**使用`tools:` / `app:`命名空间
- ❌ **禁止**使用`ConstraintLayout`、`MaterialButton`、`RecyclerView`（直接写在XML中）

**正确做法**：
- ✅ 以`docs/EC-UI-编写规范.md`为准
- ✅ 只能使用`docs/funcs/ui/uidetail/*.md`明确白名单的标签与属性

### 6. 禁止阻塞UI线程

- ❌ **禁止**在`ui.js`中使用`while(true)`、长`sleep`、同步HTTP等阻塞操作
- ❌ **禁止**在UI事件处理中执行耗时操作

**正确做法**：
- ✅ `ui.js`只负责渲染与绑定
- ✅ `main.js`负责业务逻辑
- ✅ 耗时操作使用异步或放到子线程

### 7. 禁止混用不兼容模式

- ❌ **禁止**混用互不兼容的运行模式假设
- ❌ **禁止**HID模式下调用`startEnv()`
- ❌ **禁止**代理模式API与无障碍模式API混用（节点选择器除外）

**正确做法**：
- ✅ 先确定运行模式
- ✅ 按模式使用对应API
- ✅ HID模式不使用节点选择器

---

## 唯一正确实现流程（必须按顺序）

```
┌─────────────────────────────────────────────────────────────┐
│  1. 取证  →  2. 查API  →  3. 写定位  →  4. 写动作          │
├─────────────────────────────────────────────────────────────┤
│  获取控件树/截图/日志                                        │
│  从docs/确认函数用法                                         │
│  优先选择器定位（处理唯一性）                                 │
│  点击/输入/滑动 + 关键步骤日志                                │
└─────────────────────────────────────────────────────────────┘
```

### 步骤1：取证（设备真实界面）

**必须获取**：
- 控件树/节点信息（UIX/XML）
- 截图留证（关键界面）
- 日志输出（排查问题）

**取证手段**：
- CLI工具（`ec-android-cli` / `ec-ios-cli`）
- IDEA插件节点查看
- 代码中`captureScreen()`截图

**前置条件**（使用CLI时）：
- IntelliJ IDEA已启动
- EasyClick插件可响应
- 设备已在IDEA侧连接可用

### 步骤2：查API

**权威来源优先级**（从高到低）：
1. **本仓库`docs/`**（以`docs/README.md`为索引入口）
2. **脚本函数在线总索引**：`https://ieasyclick.com/docs/zh-cn/funcs`
3. **开发文档总站**：`https://www.ieasyclick.net/docs/`

**冲突裁决**：
- `docs/`与在线文档冲突时，默认以**`docs/`（与本工程版本一致）**为准
- `docs/`缺失/明显过期时，必须显式说明并引用在线章节作为依据

### 步骤3：写定位

**选择器优先级**：
1. **属性选择器**（`text/desc/id/clz`等）
2. **XPath选择器**
3. **父级定位+子级属性**
4. **坐标兜底**（必须注释原因）

**当页唯一性（强制）**：
- 单属性可能匹配多个节点时，必须升级为**联合定位**
- 常见组合：`text + id`、`desc + id`、`id + clz`、**父级定位+子级属性**
- 代码必须显式处理`0 / 1 / >1`三种情况
- `>1`时禁止直接点击第一个；应记录日志并改为更强联合条件

### 步骤4：写动作与日志

**动作**：点击/输入/滑动等

**日志要求**：
- 关键步骤必须`logd/loge`输出
- 内容：步骤名、选择器摘要、结果（成功/失败原因）
- 避免打印敏感隐私与超长文本（可截断）

---

## 术语与规范

### 语言与运行时

- **脚本语言**：JavaScript（基于Rhino）
- **代码围栏**：统一使用`javascript`
- **全局对象**：`node/image/http/device/floaty/storage/thread/shell/utils/event/acEvent/...`
- **无需import**：全局对象直接使用（以`docs/README.md`列举为准）

### 控件=节点

- 术语与字段名以`docs/funcs/global/selector-node.md`与节点树导出为准
- 例如文档使用`clz`表示类名时，不要用"口头className"替代真实字段

### 封装与命名

- 允许将重复流程封装为函数
- 业务封装函数可用**中文命名**以提高可读性
- EC官方API调用名必须与`docs/`一致
- 封装层不得发明"看起来像官方"的函数名冒充EC API

---

## UI编写强制规范（涉及XML时必须遵守）

### XML文件头

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<LinearLayout
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:android="http://schemas.android.com/apk/res/android"
    xsi:noNamespaceSchemaLocation="layout.xsd">
```

### 单位规范（强制）

| 用途 | 单位 | 正确示例 | 错误示例 |
|------|------|---------|---------|
| 文字大小 | **sp** | `android:textSize="16sp"` | `android:textSize="16dp"` |
| 宽高/边距 | **dp** | `android:layout_width="100dp"` | `android:layout_width="100px"` |
| 颜色 | **#RRGGBB** | `android:textColor="#000000"` | `android:textColor="black"` |

### 宽高取值（强制）

| 值 | 含义 | 使用场景 |
|----|------|---------|
| `match_parent` | 填满父容器 | 根布局、需要填满的容器 |
| `wrap_content` | 自适应内容 | 子控件、ScrollView的子节点 |
| `0dp` | 配合weight使用 | 需要权重分配时 |

**⚠️ 严禁使用`wrap_parent` / `fill_parent`**

### 常见错误对照表

| 错误写法 | 正确写法 | 说明 |
|----------|----------|------|
| `encoding="utf-8"` | `encoding="UTF-8"` | 大写 |
| `android:layout_height="wrap_parent"` | `android:layout_height="wrap_content"` | 关键词错误 |
| `android:textSize="14dp"` | `android:textSize="14sp"` | 字体用sp |
| `android:hit="提示"` | `android:hint="提示"` | 拼写错误 |
| `android:text="提示"`（EditText） | `android:hint="提示"` | EditText用hint |
| ScrollView子节点`match_parent` | ScrollView子节点`wrap_content` | 高度问题 |

---

## CLI使用纪律

### 基本规则

- 优先使用仓库相对路径调用
- **`-m/--module`必须与IDEA工程模块名一致**
- 多工程/多窗口时用**`-p/--project`**指向工程根目录消歧

### 默认行为

- 默认日志多为**stderr JSON行**
- 自动化解析以`SKILL.md`为准

---

## 输出策略（信息不足时）

**先输出最短阻塞点与下一步**：
1. 要读取哪些`docs`路径
2. 要运行哪些取证命令
3. 需要用户确认哪些参数（例如模块名、设备连接状态）

**信息足够后再输出**：
- 可落地代码
- 关键日志
- 预期执行流程

---

## 严格禁止（补充）

- ❌ 禁止用过时第三方博客替代`docs/`作为API依据
- ❌ 禁止把`https://www.ieasyclick.net/docs/`当作脚本API的唯一入口
- ❌ 需要API时优先打开 **`/funcs`索引**或本仓库`docs/`

---

## 各平台特殊规则

### 安卓

- HID模式**不能使用**`startEnv()`
- HID模式**不能使用**节点选择器
- 代理模式使用`shell.execAgentCommand()`执行Shell
- Root模式使用`shell.sudo()`执行root命令

### iOS

- USB版**无UI**
- 脱机版**必须**使用HID硬件或自主激活
- iOS**无传统无障碍服务**概念

### 鸿蒙

- **必须使用**HID模式
- 截图申请必须使用`type=1`
- 节点选择器支持有限

---

## 参考文档

- **全局规则**：`alldocs/skills/easyclick-global-rules.md`（本文件）
- **通用开发规范**：`alldocs/skills/easyclick-dev-guide.md`
- **安卓开发**：`alldocs/skills/easyclick-android.md`
- **iOS开发**：`alldocs/skills/easyclick-ios.md`
- **鸿蒙开发**：`alldocs/skills/easyclick-harmony.md`
- **UI设计**：`alldocs/skills/ui-design.md`
