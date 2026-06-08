# threads-script

基于 [EasyClick](https://www.ieasyclick.com/) 的云控平台 Android 自动化脚本，目标应用为 **Threads** (`com.instagram.barcelona`)。

## 项目概述

脚本运行在云控平台的云手机上，由服务器统一调度。`main()` 负责设备初始化、版本更新和事件循环，**具体任务逻辑由服务器通过命名入口函数下发执行**。脚本的核心能力包括：

- 代理自动配置（ipweb 动态 / 静态 IP，语言时区适配）
- 多语言节点选择器（自动匹配设备系统语言）
- 页面状态识别与上报
- 卡点自动截图 + UI 树抓取
- 任务结果回传与状态同步

## 项目结构

```
threads-script/
├── src/js/                  # 脚本源代码
│   ├── main.js              # 入口，启动链 + 模拟测试()
│   ├── api.js               # 云机 API 封装（代理/上报/文件/进程/SSH）
│   ├── hhlib.js             # 多语言选择器、长等待、文本工具
│   ├── Insgram_page.js      # 页面识别、进程管理、封号检测
│   ├── static.js            # 账号结构、截图上报、重启等静态工具
│   ├── proxyconfig.js       # 代理配置模块
│   ├── login.js             # 登录流程、阻塞脚本
│   ├── country.js           # 国家/地区配置（语言、时区等）
│   ├── threads.js           # Threads 任务入口函数
│   └── yanghao.js           # 养号事件分派与任务入口
├── src/layout/              # UI 布局文件
├── libs/                    # EasyClick 标准库
├── build/                   # 编译产物
├── lib.json                 # 库配置
├── obfuscator.json          # 代码混淆配置
├── src/update.json          # OTA 更新配置
│
ec_work_config/android/      # CLI 工具（ec-android-cli）
alldocs/                     # EasyClick 多平台 API 文档
.claude/                     # Claude Code 配置与 skill
```

## 框架分层

| 层级 | 说明 | 是否修改 |
|------|------|----------|
| **框架层** | `main.js`、`api.js`、`hhlib.js`、`static.js`、`login.js`、`proxyconfig.js`、`country.js`、`Insgram_page.js` | 仅框架升级时修改 |
| **任务脚本层** | `threads.js`、`yanghao.js` | 日常开发在这里 |

任务入口函数示例：

```javascript
// threads.js — 服务器下发调用
function threads首页养号(任务数据) {
    云机_上报状态_全局("green", "threads首页养号", true)
    // ...
}
```

## 开发环境

- **IDE**: EasyClick 开发工具
- **脚本引擎**: Rhino (稳定模式) / V8 (快速模式)
- **设备**: 云手机（Android）

## 本地测试

在 `main.js` 的 `模拟测试()` 中编写测试代码：

```javascript
function 模拟测试() {
    threads首页养号({ "taskType": "xxx", "maxCount": 10 });
}
```

使用 CLI 运行：

```powershell
.\ec_work_config\android\bin\ec-android-cli preview -m threads-script -p c:\pj\threads-script -f json
.\ec_work_config\android\bin\ec-android-cli run -m threads-script -p c:\pj\threads-script -f json
```

抓取当前 UI 树和截图：

```powershell
.\ec_work_config\android\bin\ec-android-cli capture-node -m threads-script -p c:\pj\threads-script
.\ec_work_config\android\bin\ec-android-cli capture-screen -m threads-script -p c:\pj\threads-script
```

## 任务执行流程

```
服务器下发指令 → 入口函数(任务数据) → 设置代理 → 执行任务逻辑
                                         ↓
                              云机_回传任务详情结果() → 结束进程 → 阻塞等待
```

## 相关文档

- [AGENTS.md](AGENTS.md) — AI 辅助开发工作规范（日志、异常处理、UI 树检查、卡点闭环）
- `alldocs/docs/` — EasyClick Android API 文档
