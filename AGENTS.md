# Agent 工作规范

本项目是 EasyClick Android 自动化脚本项目。开始编写或修改脚本前，必须先完成界面感知、方案判断，再进入代码实现；脚本运行中遇到异常时，必须上报当前界面信息和卡点，并继续分析、确认方案、修正实现、再次验证，循环推进到脚本完成多场景健壮性测试。

## 开发前必须先读取 UI 树

在为某个需求写脚本前，先把目标 App 切到需求相关页面，并读取当前 UI 树。

优先使用本仓库自带 CLI：

```powershell
.\ec_work_config\android\bin\ec-android-cli capture-node -m auto-test -p c:\pj\auto-test
.\ec_work_config\android\bin\ec-android-cli capture-screen -m auto-test -p c:\pj\auto-test
```

如界面刚跳转、节点疑似未刷新，先执行：

```powershell
.\ec_work_config\android\bin\ec-android-cli refresh-node -m auto-test -p c:\pj\auto-test
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

## 异常时必须上报界面和卡点

脚本执行中遇到异常、超时、元素找不到、点击后页面未变化、输入失败等情况时，不要只输出“失败”。必须记录并上报以下信息：

- 当前执行步骤，例如 `openThreads`、`clickCreateTab`、`inputPostText`。
- 预期页面或元素，例如目标 `id/text/desc/clz`、期望按钮或输入框。
- 实际卡点，例如未找到节点、点击无响应、页面仍停留在上一页、输入框不可编辑。
- 当前 UI 树或 UI 树文件路径。
- 当前截图文件路径。
- 当前包名/页面特征、屏幕分辨率、关键节点 bounds。
- 已尝试的方案和最后失败的选择器/坐标。
- 相关日志片段和异常堆栈。

推荐异常日志格式：

```text
[BLOCKED] step=inputPostText
expected=找到发帖输入框并输入内容
actual=未找到 new_thread_screen_composer，也未找到 EditText
screen=ec_work_config/android/nodeimage/xxx.png
node=ec_work_config/android/nodeimage/xxx.uix
tried=id(new_thread_screen_composer), clz(android.widget.EditText), bounds fallback
resolution=1080x2220
next=需要确认当前是否已进入发帖页，或切换节点模式/使用 OCR 定位输入区域
```

## 卡点闭环推进要求

卡点上报不是终点。除非设备未连接、需求缺少关键信息、目标账号状态不可用等外部条件阻塞，否则必须继续推进：

1. 上报卡点：记录当前界面、UI 树、截图、失败步骤和已尝试方案。
2. 继续分析：基于最新 UI 树和截图判断失败原因，确认是页面未到达、节点不可见、选择器失效、点击区域错误、输入 API 错误，还是账号/网络/权限弹窗等场景问题。
3. 确认方案：给出下一轮可执行方案，并明确主路径和兜底路径。
4. 继续实现：按确认方案修改脚本、日志和兜底逻辑。
5. 再次验证：运行脚本或预览，并抓取新的 UI 树/截图佐证结果。
6. 循环推进：若仍失败，继续按“上报卡点 -> 分析 -> 确认方案 -> 实现 -> 验证”循环，直到目标流程稳定完成。

每一轮都要尽量缩小问题范围，不重复尝试已经证明无效的同一选择器、同一坐标或同一操作路径。若必须重复验证，要说明重复的目的，例如确认偶发性、确认页面状态差异或确认节点模式变化。

## 运行与验证要求

修改脚本后，优先用 CLI 运行或预览验证：

```powershell
.\ec_work_config\android\bin\ec-android-cli preview -m auto-test -p c:\pj\auto-test -f json
.\ec_work_config\android\bin\ec-android-cli run -m auto-test -p c:\pj\auto-test -f json
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

## 项目约定

- 脚本入口和核心逻辑位于 `auto-test/src/js/`。
- 目标 App 当前为 Threads：`com.instagram.barcelona`。
- 自动化策略以当前设备 UI 树为准，不以历史坐标或其他设备截图为准。
- 新增能力时要把关键步骤、失败原因和兜底策略写进日志，方便后续继续排查。
