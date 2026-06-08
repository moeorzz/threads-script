# EasyClick AI Skills 索引

本目录包含EasyClick自动化开发的AI Skill文件，供AI助手阅读和遵循。

## 阅读顺序（重要）

AI助手必须**按顺序阅读**以下文件：

1. **[easyclick-global-rules.md](./easyclick-global-rules.md)** - **必读第一**
   - 所有平台通用的绝对禁止规则
   - 权威来源与优先级
   - 术语与实现流程

2. **[easyclick-dev-guide.md](./easyclick-dev-guide.md)** - **必读第二**
   - 跨平台通用开发流程（四步法）
   - 通用工程结构
   - 通用编码规范

3. **根据目标平台选择**：
   - [easyclick-android.md](./easyclick-android.md) - 安卓特有内容
   - [easyclick-ios.md](./easyclick-ios.md) - iOS特有内容
   - [easyclick-harmony.md](./easyclick-harmony.md) - 鸿蒙特有内容

4. **根据需要选择**：
   - [ui-design.md](./ui-design.md) - UI设计规范
   - [easyclick-java-plugin-android.md](./easyclick-java-plugin-android.md) - 安卓Java插件
   - [easyclick-java-plugin-ios.md](./easyclick-java-plugin-ios.md) - iOS Java插件

## Skill文件列表

| Skill文件 | 适用平台 | 内容说明 |
|----------|---------|---------|
| [easyclick-global-rules.md](./easyclick-global-rules.md) | 所有平台 | **全局强制性规则**（硬红线） |
| [easyclick-dev-guide.md](./easyclick-dev-guide.md) | 所有平台 | **通用开发规范**（流程、结构、编码） |
| [easyclick-android.md](./easyclick-android.md) | Android | 安卓特有：运行模式、API、工程结构 |
| [easyclick-ios.md](./easyclick-ios.md) | iOS | iOS特有：双版本差异、API、工程结构 |
| [easyclick-harmony.md](./easyclick-harmony.md) | HarmonyOS | 鸿蒙特有：HID模式、API |
| [ui-design.md](./ui-design.md) | Android/iOS | UI设计：H5 UI、原生XML UI |
| [easyclick-java-plugin-android.md](./easyclick-java-plugin-android.md) | Android | 安卓Java插件开发 |
| [easyclick-java-plugin-ios.md](./easyclick-java-plugin-ios.md) | iOS | iOS Java插件开发（PC端运行） |

## 文件内容职责

### 全局规则（easyclick-global-rules.md）
- ✅ 绝对禁止（硬红线）
- ✅ 权威来源与优先级
- ✅ 术语与实现流程
- ❌ 不包含平台特有API

### 开发指南（easyclick-dev-guide.md）
- ✅ 通用开发流程（四步法）
- ✅ 通用工程结构
- ✅ 通用编码规范
- ❌ 不包含平台特有内容

### 平台Skill（android/ios/harmony）
- ✅ 平台特有运行模式
- ✅ 平台特有API
- ✅ 平台特有工程结构
- ✅ 引用全局规则和开发指南
- ❌ 不包含通用规则（避免重复）

## 文档目录结构

```
alldocs/
├── skills/                          # AI Skill文件（本目录）
│   ├── README.md                   # 本文件（索引）
│   ├── easyclick-global-rules.md   # 全局强制性规则
│   ├── easyclick-dev-guide.md      # 通用开发规范
│   ├── easyclick-android.md        # 安卓Skill
│   ├── easyclick-ios.md            # iOS Skill
│   ├── easyclick-harmony.md        # 鸿蒙Skill
│   ├── ui-design.md                # UI设计Skill
│   ├── easyclick-java-plugin-android.md  # 安卓Java插件
│   └── easyclick-java-plugin-ios.md      # iOS Java插件
│
├── docs/                           # 安卓详细文档
│   └── funcs/                      # API函数文档
│
├── iosdocs/                        # iOS详细文档
│   └── funcs/                      # iOS API文档
│
└── hmdocs/                         # 鸿蒙详细文档
    └── funcs/                      # 鸿蒙API文档
```

## 在线资源

- **官网**：https://ieasyclick.com
- **在线文档**：https://ieasyclick.com/docs/zh-cn/funcs
- **开发文档**：https://www.ieasyclick.net/docs/

## 版本信息

- 本Skills适用于最新版EasyClick IDEA插件
- 最后更新：2026年5月
