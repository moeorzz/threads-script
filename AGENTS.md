# Agent 工作规范

本项目是运行在**云控平台**的 EasyClick Android 自动化脚本项目，当前目标 App 为 Threads (`com.instagram.barcelona`)。

## 项目架构

### 框架层（默认框架，不要改变）

框架代码负责云机初始化、设备登记、脚本更新、代理设置、多语言适配、页面识别、节点操作封装等基础能力，由平台维护：

| 文件 | 职责 |
|------|------|
| [main.js](threads-script/src/js/main.js) | 脚本入口，`main()` 负责启动链（登记设备 → 检查更新 → 进入事件循环）；`模拟测试()` 用于自测 |
| [api.js](threads-script/src/js/api.js) | 云机 API 封装：代理、头像/视频下载、状态上报、任务回传、SSH 操作、HTTP 请求工具 |
| [hhlib.js](threads-script/src/js/hhlib.js) | 多语言选择器、`长等待`、文本处理、节点查找等底层工具 |
| [Insgram_page.js](threads-script/src/js/Insgram_page.js) | 通用页面识别、进程管理、封号检测等公用函数 |
| [static.js](threads-script/src/js/static.js) | 账号结构定义、`点击图标启动app`、`重启fb`、`截屏上传到服务器` 等静态工具 |
| [proxyconfig.js](threads-script/src/js/proxyconfig.js) | 代理配置模块 |
| [login.js](threads-script/src/js/login.js) | 登录流程、`阻塞脚本`、`模拟人工结束进程` |
| [country.js](threads-script/src/js/country.js) | 国家/地区配置数据（语言、时区、短信平台等） |

> **框架文件只在明确的框架升级需求下才修改，普通任务开发只关注任务脚本文件。**

### 任务脚本层（服务器下发指令，入口函数形式）

服务器通过云控平台下发指令，调用任务脚本中命名好的**入口函数**，并传入任务参数：

- `threads首页养号(任务数据)` — 在 [threads.js](threads-script/src/js/threads.js) 中定义
- `执行事件_threads(data)` — 在 [yanghao.js](threads-script/src/js/yanghao.js) 中定义，按 `eventType` 分派到具体任务入口
- [yanghao.js](threads-script/src/js/yanghao.js) — 事件上报、任务分派、养号任务入口

`main()` 只是一个启动引导，**不负责执行具体任务**。具体任务逻辑都在入口函数中实现，由服务器按需调度。

#### 事件模式流程

当任务通过"事件模式"下发时，`g_ctx["hasEventMode"]` 为 true，流程为：

```
上报事件开始 → 设置代理 → 执行入口函数 → 上报任务完成 → 阻塞脚本
```

入口函数内部通过 `云机_回传任务详情结果()` 或 `上报任务完成()` 结束任务。

### 自测入口

在 [main.js](threads-script/src/js/main.js) 的 `模拟测试()` 函数中编写本地测试代码：

```javascript
function 模拟测试() {
    // 自测代码写在这里
    // 模拟服务器下发参数，调用任务入口函数
    threads首页养号({"taskType": "xxx", "maxCount": 10});
}
```

用 CLI 运行测试：

```powershell
.\ec_work_config\android\bin\ec-android-cli preview -m threads-script -p c:\pj\threads-script -f json
.\ec_work_config\android\bin\ec-android-cli run -m threads-script -p c:\pj\threads-script -f json
```

## 日志规范

项目使用 EasyClick 内置日志函数，按严重程度分级使用：

| 函数 | 用途 | 示例 |
|------|------|------|
| `logd(msg)` | debug 调试信息，关键变量值 | `logd("脚本版本号" + g_script_ver)` |
| `logw(msg)` | **主要日志**，记录流程步骤、状态变化、关键判断 | `logw("threads首页养号 " + page.join('----'))` |
| `loge(msg)` | 异常/错误，放在 catch 块中 | `loge(e)` |
| `toast(msg)` | 设备屏幕 toast，调试时快速确认状态 | `toast("已进入首页")` |

**日志要求：**

- 日志使用中文描述，能直接看懂当前在做什么
- 关键判断（页面识别结果、节点是否找到、API 返回值）必须用 `logw` 输出
- 所有 `catch` 块必须调用 `loge(e)` 输出异常堆栈，不要吞掉异常
- `长等待(d, 来源标记)` 已在框架中封装，等待时自动带来源信息便于追踪卡点

## 异常处理与上报

### 状态上报（云机控制台标题栏）

脚本运行时通过以下函数更新云机控制台的状态显示：

```
云机_上报状态_全局(color, message, forced?)
```

- `color`: `"green"` 正常 / `"yellow"` 警告 / `"red"` 异常阻塞
- `message`: 当前状态描述文本
- `forced` (可选): `true` 强制上报，忽略频率限制

框架内置频率控制：同色同消息 120 秒内不会重复上报（`red` 和 `forced=true` 除外）。**任务启动时必须上报当前步骤**，如：

```javascript
云机_上报状态_全局("green", "threads首页养号", true)
```

遇到卡死、异常时上报红色并附暂停/重启：

```javascript
云机_上报状态_全局("red", "可能卡死请人工处理,脚本暂停", true)
setScriptPause(true, 0)
```

### 卡点截图上报

遇到未知页面或异常情况时，调用框架方法自动截图 + 抓取 UI 树并上传服务器：

```javascript
截屏上传到服务器(null, "threads首页养号未知页面")
```

- 第一个参数：需屏蔽的节点数组（避免遮挡截图），通常传 `null`
- 第二个参数：备注说明当前场景
- 内有频率限制：3 分钟内超过 10 次截图会触发红色上报并暂停脚本

### 任务结果回传

任务完成或需要终止时，调用：

```
云机_回传任务详情结果(tasktype, state, result, color, message)
```

此函数会：
1. 回传任务结果到服务器
2. 回到桌面并结束目标 App 进程
3. 调用 `阻塞脚本()` 进入无限等待

```javascript
// 正常完成（由事件模式自动处理，一般不需要手动调用）
// 异常终止
云机_回传任务详情结果(8, "备份异常", "", "red", "备份异常")
// 代理失败
云机_回传任务详情结果(8, "代理ip失败次数太多", "", "red", "代理ip失败次数太多")
```

### 循环重试模式

网络请求和关键操作使用 `while(true)` + `长等待` 无限重试，直到成功。框架已封装的 HTTP 工具都遵循此模式：

```javascript
getapi_code200(url, notes, timeout)   // GET 请求，循环直到返回 code=200
getapi_code1(url, notes, timeout)     // GET 请求，循环直到返回 code=1
postapi200(url, postdata, notes)      // POST 请求，循环直到返回 code=200
```

> 调用这些函数后不需要额外判断返回值，它们不成功不会返回。

### 异常中止约定

任务脚本中遇到以下信号应 **立即 return** 中止当前任务：

| 信号 | 含义 | 处理 |
|------|------|------|
| `g_ctx["结束脚本"] === true` | 重启次数超限或其他致命条件 | `return` |
| 页面识别到 `"封号了"` | 账号被封 | `return` |
| `云机_获取窗口日志()` 返回 `"已向脚本发起任务等待执行."` | 服务器下发新任务 | `return` 让出新任务执行 |

## 实现任务时优先使用框架自带工具

本项目的框架层已封装了大量成熟的 API 和工具函数。实现任务逻辑时，**优先评估框架内是否已有可用能力**，避免重复造轮子：

- **节点操作**：`语言转换_desc`、`语言转换_text`、`语言转换_getOneNodeInfo`、`id()`、`desc()`、`text()`、`clz()`、`descMatch()`、`textMatch()`；`clickPointBounds`、`clickPointBounds_adb`、`clickPointBounds_父节点`；`等待节点消失`、`等待节点消失_多语言`
- **页面识别**：`Instagram_获取页面信息_()` 返回当前页面特征数组（需先 `lockNode()` 后 `releaseNode()`）
- **通用操作**：`点击图标启动app`、`屏幕从下往上滑`、`通用_结束进程再启动2`、`云机_adb点击`、`restartScript`
- **云机 API**：`设置代理` / `设置代理2`、`云机_上传文件到云机`、`云机_获取视频并下载`、`云机_获取头像并下载`、`云机_结束进程`、`云机_执行ssh`、`云机_获取窗口日志`、`云机_设置设备语言`、`获取jwt`
- **任务流程**：`上报事件开始`、`上报任务完成`、`上报事件结束`、`阻塞脚本`
- **全局上下文**：`getCtxString`、`getCtxBoolean`、`getCtxNumber`、`CtxIncr`、`CtxDecr`、`addCtxNumber`、`g_ctx` 对象、`g_Context` 事件上下文
- **多语言**：`g_全球语言包`、多语言选择器（自动适配设备语言）、`在服务器获取语言文件`
- **时间工具**：`长等待(秒, 来源)` — 等待并记日志；`gettime(10)` 返回秒级时间戳
- **账号 API**：`fbaccount.gettwofa()` 获取两步验证码

框架没有的能力（新的页面特征、新的操作流程、与后端新的交互方式），再在任务脚本中实现，并尽量复用框架已有的原子能力。

## 开发前必须先读取 UI 树

在为某个需求写脚本前，先把目标 App 切到需求相关页面，并读取当前 UI 树。

优先使用本仓库自带 CLI：

```powershell
.\ec_work_config\android\bin\ec-android-cli capture-node -m threads-script -p c:\pj\threads-script
.\ec_work_config\android\bin\ec-android-cli capture-screen -m threads-script -p c:\pj\threads-script
```

如界面刚跳转、节点疑似未刷新，先执行：

```powershell
.\ec_work_config\android\bin\ec-android-cli refresh-node -m threads-script -p c:\pj\threads-script
```

也可以在脚本内用 `dumpXml()` 临时确认当前节点树。不要在未查看 UI 树的情况下直接凭经验写选择器或坐标。

## 编写前先判断方案可行性

读取 UI 树后，先判断可用的自动化路径，并说明优先级：

1. 优先判断 `resource-id`、`text`、`desc`、`clz`、`bounds` 是否稳定可用。
2. 对 Compose、WebView 或节点缺失页面，要确认节点模式、无障碍/代理模式是否会影响可见性。
3. 选择器可行时，优先使用节点选择器和节点操作。
4. 选择器不稳定时，再评估 OCR、图色/模板匹配、坐标点击等兜底方案。
5. 使用坐标前，必须基于当前设备分辨率和 UI 树 bounds 计算，避免照搬其他设备坐标。

实现时保留清晰的兜底链路，例如：

```text
resource-id -> class/text/desc -> OCR/图色 -> 坐标兜底
```

每个关键动作都要能回答：目标元素是什么、当前页面是否能识别、失败后下一步怎么确认。

## 卡点闭环推进要求

脚本执行中遇到异常、超时、元素找不到、点击后页面未变化时，优先使用项目内置的 `截屏上传到服务器` 和 `云机_上报状态_全局` 上报当前状态，然后继续分析推进：

1. 上报卡点：`截屏上传到服务器(null, "场景描述")` + `云机_上报状态_全局("red", "具体卡点")`
2. 继续分析：基于最新 UI 树和截图判断失败原因，确认是页面未到达、节点不可见、选择器失效、点击区域错误，还是账号/网络/权限弹窗等场景问题。
3. 确认方案：给出下一轮可执行方案，并明确主路径和兜底路径。
4. 继续实现：按确认方案修改任务脚本、日志和兜底逻辑。
5. 再次验证：运行脚本或预览，并抓取新的 UI 树/截图佐证结果。
6. 循环推进：若仍失败，继续按"上报卡点 → 分析 → 确认方案 → 实现 → 验证"循环，直到目标流程稳定完成。

每一轮都要尽量缩小问题范围，不重复尝试已经证明无效的同一选择器、同一坐标或同一操作路径。若必须重复验证，要说明重复的目的。

## 运行与验证要求

修改脚本后，优先用 CLI 运行或预览验证：

```powershell
.\ec_work_config\android\bin\ec-android-cli preview -m threads-script -p c:\pj\threads-script -f json
.\ec_work_config\android\bin\ec-android-cli run -m threads-script -p c:\pj\threads-script -f json
```

如果不能运行，也要说明原因，并给出下一次验证所需的 UI 树、截图或设备状态。

完成实现前必须做多场景健壮性测试，至少覆盖：

- 正常首页进入目标流程。
- App 冷启动、后台恢复、页面已停留在中间步骤。
- 目标节点存在但不可点击、节点短暂消失或延迟出现。
- 语言、文案或按钮状态变化导致 `text/desc` 不稳定。
- 弹窗、权限提示、网络慢、加载中、账号异常提示等干扰场景。
- 坐标兜底在当前设备分辨率下是否命中正确区域。

测试结论要写清楚：通过的场景、失败的场景、失败时的 UI 树/截图路径、已加入的兜底策略，以及仍需人工确认的外部条件。
