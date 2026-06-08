---
name: threads-easyclick-framework
description: 用于在 c:\pj\threads-script 仓库开发、修改、审查或调试 Threads EasyClick Android 自动化脚本，包括任务入口函数、事件模式分发、UI 节点选择器、页面识别、云机状态上报、代理设置、截图卡点闭环，以及必须遵循现有框架约定的代码。
---

# Threads EasyClick Framework

## 核心原则

把本仓库当作运行在云控平台上的 EasyClick Android 自动化脚本项目，目标 App 是 Threads `com.instagram.barcelona`。除非用户明确要求框架升级，否则不要改框架层；普通任务开发优先改任务层文件，例如 `threads-script/src/js/threads.js` 和 `threads-script/src/js/yanghao.js`。

一个容易读错的项目细节：实际 `main()` 定义在 `threads-script/src/js/static.js`；`threads-script/src/js/main.js` 主要放全局变量、`g_ctx`、上下文工具、代理入口、`模拟测试()` 和脚本更新逻辑。

## 开始工作

1. 先判断请求属于任务层开发、框架层修改、代码审查，还是只需要分析。
2. 涉及选择器、页面跳转、坐标点击时，写代码前先抓当前 UI 树和截图：

```powershell
.\ec_work_config\android\bin\ec-android-cli refresh-node -m threads-script -p c:\pj\threads-script
.\ec_work_config\android\bin\ec-android-cli capture-node -m threads-script -p c:\pj\threads-script
.\ec_work_config\android\bin\ec-android-cli capture-screen -m threads-script -p c:\pj\threads-script
```

3. 用 `rg` 先查附近实现和现有工具，优先复用框架函数。
4. 当流程依赖 UI 稳定性时，先说明自动化路径优先级：`resource-id -> text/desc/class -> OCR/图色 -> 基于当前 bounds 或分辨率的坐标兜底`。
5. 修改后优先用 EasyClick CLI 预览或运行验证：

```powershell
.\ec_work_config\android\bin\ec-android-cli preview -m threads-script -p c:\pj\threads-script -f json
.\ec_work_config\android\bin\ec-android-cli run -m threads-script -p c:\pj\threads-script -f json
```

如果设备、IDEA 插件或 CLI 环境不可用，要说明无法验证的原因，并写清下一轮需要的 UI 树、截图或设备状态。

## 项目文件地图

| 文件 | 职责 | 修改原则 |
| --- | --- | --- |
| `threads-script/src/js/threads.js` | Threads 任务逻辑，当前入口是 `threads首页养号(任务数据)`。 | 普通任务开发的主要修改点。 |
| `threads-script/src/js/yanghao.js` | 事件开始/结束上报，`执行事件_threads(data)` 分发 `eventType`。 | 新增或调整事件类型时修改。 |
| `threads-script/src/js/main.js` | 全局配置、`g_ctx`、上下文工具、`设置代理/设置代理2`、`模拟测试()`、更新逻辑。 | 除自测或框架升级外尽量不改。 |
| `threads-script/src/js/static.js` | 实际 `main()`、账号结构、桌面启动、截图上传、重启工具。 | 除框架行为变化外尽量不改。 |
| `threads-script/src/js/api.js` | 云机 API、状态上报、任务结果回传、HTTP 重试、ADB 点击。 | 先复用，只有 API 契约变化才改。 |
| `threads-script/src/js/hhlib.js` | 多语言选择器、点击、等待、OCR 点击、时间和文本工具。 | 先复用，只有通用工具缺失才改。 |
| `threads-script/src/js/Insgram_page.js` | 页面识别、通用进程重启、封号识别。 | 新增稳定页面特征时修改。 |
| `threads-script/src/js/proxyconfig.js` | 代理模型和云机代理 payload。 | 只有代理契约变化才改。 |
| `threads-script/src/js/login.js` | 登录辅助、模拟人工结束进程、`阻塞脚本()`。 | 除登录/阻塞逻辑变化外尽量不改。 |
| `threads-script/src/js/country.js` | 国家、语言、时区配置。 | 只有国家配置变化才改。 |

## 执行模型

服务器下发任务时调用命名好的入口函数，不是直接让 `main()` 执行业务逻辑。

- Threads 主任务入口：`threads首页养号(任务数据)`，位于 `threads.js`。
- 事件分发入口：`执行事件_threads(data)`，位于 `yanghao.js`。
- 本地自测入口：在 `main.js` 的 `模拟测试()` 中模拟服务器参数并调用任务入口。
- 事件模式：`g_ctx["hasEventMode"] === true`，流程是 `上报事件开始 -> 设置代理 -> 执行任务入口 -> 上报任务完成 -> 阻塞脚本`。

新增事件类型时，按现有分发风格写：

```javascript
function 执行事件_threads(data) {
    if (data["eventType"] === "NEW_EVENT") {
        data["state"] = "中文任务状态";
        data["ext_json"] = {};
        新任务入口(data);
    }
}
```

本地自测写在 `模拟测试()`：

```javascript
function 模拟测试() {
    threads首页养号({"taskType": "HOME_PAGE", "maxCount": 10});
}
```

## 任务循环模板

长流程 UI 任务优先沿用“页面识别循环”模式：

```javascript
function 新任务入口(data) {
    云机_上报状态_全局("green", "新任务入口", true);

    while (true) {
        if (g_ctx["结束脚本"] === true) {
            return;
        }

        sleep(1000);
        lockNode();
        let page = Instagram_获取页面信息_("新任务入口");
        releaseNode();

        logw("新任务入口 " + page.join("----"));

        if (page.length === 0) {
            截屏上传到服务器(null, "新任务入口未知页面");
            云机_上报状态_全局("yellow", "新任务入口未知页面");
            长等待(5, "新任务入口未知页面等待");
            continue;
        }

        if (page.indexOf("手机桌面") > -1) {
            点击图标启动app(getCtxString("桌面应用名称", "Threads"));
            continue;
        }

        if (page.indexOf("封号了") > -1 || page.indexOf("结束脚本") > -1) {
            return;
        }

        // 在这里处理具体页面动作
    }
}
```

不要吞异常。所有 `catch` 都要 `loge(e)`。日志用中文描述当前步骤、页面识别结果、节点是否找到、API 返回值和失败原因。

## UI 自动化策略

选择器必须基于当前 UI 树或临时 `dumpXml()` 结果，不要凭经验硬写。优先顺序：

1. 稳定的 `resource-id`、`id()`、`desc()`、`text()`、`clz()` 和当前 UI 树中的 `bounds`。
2. 文案或语言可能变化时，使用多语言封装函数。
3. Compose、WebView 或节点缺失页面，再评估 OCR、图色或模板匹配。
4. 坐标点击只作为兜底，必须从当前设备分辨率或节点 bounds 计算。

常用点击封装：

```javascript
clickPointBounds(node);          // 在节点 30%-70% 区域随机点击
clickPointBounds_父节点(node);   // 点击父节点 bounds
clickPointBounds_adb(node);      // 通过 ADB tap 兜底点击
clickpoint_selector(selector);   // 项目已有 selector 点击封装
```

页面识别不完整时，先抓 UI 树确认特征，再在 `Instagram_获取页面信息_(notes)` 中增加稳定判断。页面特征名保持短、中文可读，例如 `"Threads首页"`、`"threads评论输入框"`。

## 上报与退出

任务启动时强制上报绿色状态：

```javascript
云机_上报状态_全局("green", "任务中文名称", true);
```

遇到未知页面或卡点时，先截图上传并上报状态：

```javascript
截屏上传到服务器(null, "任务中文名称未知页面");
云机_上报状态_全局("red", "任务中文名称卡点请人工处理", true);
```

终止性异常使用 `云机_回传任务详情结果(tasktype, state, result, color, message)`。它会回传服务器、回桌面、结束目标 App 进程，并进入 `阻塞脚本()`。事件模式下会转到 `上报任务完成()` 后阻塞。

任务逻辑遇到这些信号要立即 `return`：

- `g_ctx["结束脚本"] === true`
- 页面识别包含 `"封号了"`
- 页面识别包含 `"结束脚本"`
- `云机_获取窗口日志()` 返回 `"已向脚本发起任务等待执行."`

网络请求和关键云机 API 一般使用 `while (true)` 加 `长等待()` 无限重试。调用 `getapi_code200`、`getapi_code1`、`postapi200` 后不需要再判断成功状态，因为这些函数只会在成功时返回。

## 验证清单

完成前尽量覆盖这些场景：

- 从 Threads 首页正常进入目标流程。
- App 冷启动、后台恢复、已经停在中间步骤。
- 目标节点存在但不可点击，或节点短暂消失/延迟出现。
- 语言、文案或按钮状态变化导致 `text/desc` 不稳定。
- 弹窗、权限提示、网络慢、加载中、账号异常提示。
- 坐标兜底在当前设备分辨率下是否命中正确区域。

最终说明哪些场景通过，哪些场景因环境不可用未验证；如果失败，给出 UI 树、截图路径或日志关键内容，并说明已加入的兜底策略。

## 工具类速查表

### CLI

| 场景 | 命令 |
| --- | --- |
| 预览脚本 | `.\ec_work_config\android\bin\ec-android-cli preview -m threads-script -p c:\pj\threads-script -f json` |
| 运行脚本 | `.\ec_work_config\android\bin\ec-android-cli run -m threads-script -p c:\pj\threads-script -f json` |
| 刷新 UI 节点 | `.\ec_work_config\android\bin\ec-android-cli refresh-node -m threads-script -p c:\pj\threads-script` |
| 抓取 UI 树 | `.\ec_work_config\android\bin\ec-android-cli capture-node -m threads-script -p c:\pj\threads-script` |
| 抓取截图 | `.\ec_work_config\android\bin\ec-android-cli capture-screen -m threads-script -p c:\pj\threads-script` |
| OCR 当前屏幕 | `.\ec_work_config\android\bin\ec-android-cli ocr-screen -m threads-script -p c:\pj\threads-script` |
| 监听日志 | `.\ec_work_config\android\bin\ec-android-cli monitor -f json` |

### 任务与事件

| 工具 | 文件 | 用途 |
| --- | --- | --- |
| `threads首页养号(任务数据)` | `threads.js` | Threads 首页养号任务入口。 |
| `执行事件_threads(data)` | `yanghao.js` | 按服务器 `eventType` 分发到具体任务入口。 |
| `上报事件开始(data)` | `yanghao.js` | 向云机 API 上报事件开始。 |
| `上报事件结束(data)` | `yanghao.js` | 上报事件结束，携带 `state` 和 `ext_json`。 |
| `上报任务完成(data)` | `yanghao.js` | 事件模式任务完成并关闭 App。 |
| `阻塞脚本()` | `login.js` | 任务终态后让脚本保持在线等待。 |

### 云机与 API

| 工具 | 用途 |
| --- | --- |
| `云机_上报状态_全局(color, message, forced)` | 更新云机控制台状态；任务启动用强制绿色，卡点用红色。 |
| `截屏上传到服务器(null, notes)` | 未知页面、异常、卡点时上传截图和 UI 树。 |
| `云机_回传任务详情结果(tasktype, state, result, color, message)` | 终止性任务结果回传；结束目标 App 并阻塞。 |
| `postapi200(url, postdata, notes)` | POST 循环重试，直到 `code === 200`。 |
| `getapi_code200(url, notes, timeout)` | 云机 GET 循环重试，直到 `code === 200`。 |
| `getapi_code1(url, notes, timeout)` | fastadmin 风格 GET 循环重试，直到 `code === 1`。 |
| `云机_获取窗口日志()` | 读取云机窗口消息，用于判断恢复完成、新任务等待等状态。 |
| `云机_执行ssh(command)` | 在云机执行 SSH 命令。 |
| `云机_adb点击(x, y)` | 通过 `input tap` 进行 ADB 坐标点击。 |

### 上下文与运行时

| 工具 | 用途 |
| --- | --- |
| `g_ctx` | 运行时标记、计数器、状态缓存、事件模式标记。 |
| `g_Context` | 当前服务器任务或事件上下文。 |
| `getCtxString(key, defaultValue)` | 安全读取 `g_ctx` 字符串。 |
| `getCtxBoolean(key)` | 安全读取 `g_ctx` 布尔值；不存在返回 `false`。 |
| `getCtxNumber(key)` | 安全读取 `g_ctx` 数字；不存在返回 `0`。 |
| `CtxIncr(key)` / `CtxDecr(key)` / `addCtxNumber(key, num)` | 修改 `g_ctx` 计数器。 |
| `gettime(10)` / `gettime(13)` | 获取秒级或毫秒级时间戳。 |
| `长等待(secondsOrMs, notes)` | 带日志的等待；大于 `1000` 的值按毫秒转换。 |

### 页面与节点

| 工具 | 用途 |
| --- | --- |
| `Instagram_获取页面信息_(notes)` | 返回当前页面特征数组；循环中要配合 `lockNode()` 和 `releaseNode()`。 |
| `Instagram_获取页面信息_调用一次(notes)` | 单次页面识别封装，内部加锁和释放节点。 |
| `语言转换_desc/text/descMatch/textMatch(key, obj)` | 多语言存在性判断，可附加节点属性过滤。 |
| `语言转换_getOneNodeInfo(method, key, obj)` | 获取多语言节点，`method` 为 `desc`、`descMatch`、`text` 或 `textMatch`。 |
| `waitExistNode_自定义_多语言版(node, d)` | 等待一个自定义或多语言节点特征出现。 |
| `waitExistNode_自定义_多元素_多语言版(nodes, d)` | 等待多个节点特征中的任意一个出现，返回索引。 |
| `等待节点消失_多语言(method, key, obj, d)` | 等待多语言节点消失。 |
| `等待节点消失(selector, d)` | 等待原生 selector 消失。 |
| `获取指定范围的节点对象(selector, x1, y1, x2, y2)` | 在指定 bounds 范围内筛选节点。 |
| `获取节点文本()` / `获取节点文本特征()` | 调试时输出当前界面文本和特征。 |

### 点击、手势、OCR 与 App

| 工具 | 用途 |
| --- | --- |
| `点击图标启动app(appname)` | 从桌面启动目标 App，并处理常见启动状态。 |
| `通用_结束进程再启动2(pkg, appName)` | 结束并重启目标 App，静态代理模式下会处理代理。 |
| `重启fb(reason)` | 带截图和状态上报的重启流程。 |
| `按返回键(num, reason)` | 带日志的返回键操作。 |
| `屏幕从下往上滑()` / `屏幕从上往下滑()` | 项目内封装的滑动手势。 |
| `clickPointBounds(node, noDelay)` | 在节点 bounds 内随机点击，并避开底部不可点击区域。 |
| `clickPointBounds_父节点(node, noDelay)` | 在父节点 bounds 内随机点击。 |
| `clickPointBounds_adb(node, noDelay)` | 从节点 bounds 计算坐标后用 ADB 点击。 |
| `clickPointRnd(x1, y1, x2, y2, noDelay)` | 在原始矩形范围内随机点击。 |
| `点击ocr识别节点(obj)` | 点击 OCR 识别结果对象。 |
| `点击ocr识别节点_匹配结果(result, str)` | 从 OCR 结果数组中点击指定文本。 |
| `图色初始化()` | 初始化截图和图色能力，`main()` 中已调用。 |

### 代理、国家与账号

| 工具 | 用途 |
| --- | --- |
| `设置代理(true, "", countryCode)` | 普通代理入口，可能读取 `g_Context["targetRegion"]`。 |
| `设置代理2(true, "", countryCode, data)` | 事件模式代理入口，读取 `ipType` 和 `staticIp`。 |
| `proxyconfig.isStaticProxy()` | 判断当前是否使用静态代理。 |
| `proxyconfig.getProxy()` | 生成当前代理字符串。 |
| `proxyconfig.getyunjipostdata()` | 生成云机代理配置 payload，包含语言和时区。 |
| `获取国家配置信息(countryCode)` | 读取国家配置。 |
| `英文大写国家编码转数字(cc)` | 二字母国家代码转数字国家代码。 |
| `fbaccount.gettwofa(twofa)` | 获取两步验证码。 |

