---
title: 脚本函数
description: EasyClick 安卓自动化脚本函数API文档索引
keywords:
  - EasyClick
  - 手机自动化
  - 自动化测试
  - 脚本开发
  - 安卓自动化
  - iOS自动化
  - 鸿蒙Next
  - 远程投屏
  - OCR
  - PPOCR
  - YOLO
  - Cursor
  - AI编程
  - 脚本函数
  - API文档
---

# 脚本函数

> 来源：https://ieasyclick.com/docs/zh-cn/funcs

---

## AI助手使用指引

如果你是AI助手，请先阅读以下Skill文件：

- [安卓自动化Skill](../../skills/easyclick-android.md) - 安卓开发完整规范
- [iOS自动化Skill](../../skills/easyclick-ios.md) - iOS开发规范
- [鸿蒙自动化Skill](../../skills/easyclick-harmony.md) - 鸿蒙Next开发规范
- [UI设计Skill](../../skills/ui-design.md) - UI界面设计规范

### 核心原则

1. **先取证后编码** - 获取真实节点树/截图后再写选择器
2. **先查文档后实现** - 确认API用法后再编写代码
3. **优先选择器** - 能用属性定位就不用坐标
4. **关键步骤加日志** - 便于调试和问题排查

---

## 索引说明

本文档按模块拆分为同级 `*-api.md` 与 `global/*.md`，文件名即主题，可全文检索。

**UI 相关**见 [UI编写](ui/index.md)（不在本页重复列出）。

---

## 全局模块

| 文档 | 说明 |
|------|------|
| [全局模块](global/global.md) | 全局函数、版本判断、插件加载 |
| [全局快捷事件](global/global-shortcut.md) | 快捷点击、滑动、系统按键 |
| [选择器&节点](global/selector-node.md) | 节点选择器、xpath、属性匹配 |

## 事件模块（按运行模式选择）

| 文档 | 运行模式 | 说明 |
|------|---------|------|
| [无障碍事件](acevent-api.md) | 无障碍模式 | acEvent对象API |
| [代理事件](event-api.md) | 代理模式 | agentEvent对象API |
| [HID事件](hid-event-api.md) | HID模式 | hidEvent对象API |
| [蓝牙HID事件](blehid-event-api.md) | 蓝牙HID | bleEvent对象API |
| [OTG HID事件](otghid-event-api.md) | OTG HID | otgEvent对象API |

## 核心功能模块

| 文档 | 说明 | 运行模式兼容性 |
|------|------|---------------|
| [图色函数](image-api.md) | 截图、找图、找色 | ✅ 所有模式 |
| [YOLO函数](yolo-api.md) | 目标检测 | ✅ 所有模式 |
| [OCR识别](ocr-api.md) | 文字识别 | ✅ 所有模式 |
| [设备函数](device-api.md) | 设备信息获取 | ✅ 所有模式 |
| [悬浮窗函数](floaty-api.md) | 悬浮窗UI | ✅ 所有模式 |
| [文件函数](file-api.md) | 文件操作 | ✅ 所有模式 |
| [Storage存储函数](storage-api.md) | 键值存储 | ✅ 所有模式 |
| [网络函数](http-api.md) | HTTP请求 | ✅ 所有模式 |
| [线程函数](thread-api.md) | 多线程 | ✅ 所有模式 |
| [常用工具函数](utils-api.md) | 常用工具 | ✅ 所有模式 |
| [Shell命令函数](shell-api.md) | Shell执行 | ⚠️ Root/代理模式 |
| [Sqlite命令函数](sqlite-api.md) | 数据库操作 | ✅ 所有模式 |
| [ADB函数](adbClient-api.md) | 无线ADB | ✅ 所有模式 |

## 业务模块

| 文档 | 说明 |
|------|------|
| [中控投屏模块](center-api.md) | 中控系统API |
| [JDBC MYSQL 命令函数](jdbcmysql-api.md) | 数据库连接（支持MySQL 5.x） |
| [网络验证函数](netcard-api.md) | 卡密验证、云变量 |

## 开发工具

| 文档 | 说明 |
|------|------|
| [开发工具索引](devtools/dev-tools.md) | 开发工具总览 |
| [颜色工具](devtools/dev-tools-color.md) | 颜色选择器 |
| [设备管理](devtools/dev-tools-device.md) | 设备连接管理 |
| [项目配置](devtools/dev-tools-project.md) | 项目设置 |
| [远程投屏](devtools/dev-tools-remote.md) | 远程控制 |
| [节点查看](devtools/dev-tools-node.md) | 节点树分析 |
| [词库管理](devtools/dev-tools-word.md) | 词库编辑 |
| [设置说明](devtools/dev-tools-settings.md) | 工具设置 |
| [安装说明](devtools/dev-tools-install.md) | 安装指南 |

## 其他平台

| 平台 | 文档目录 | 说明 |
|------|---------|------|
| iOS | [iosdocs/funcs/](../../iosdocs/funcs/) | iOS免越狱自动化 |
| 鸿蒙Next | [hmdocs/funcs/](../../hmdocs/funcs/) | 鸿蒙Next自动化 |
| iOS脱机版 | [iostjdocs/funcs/](../../iostjdocs/funcs/) | iOS脱机运行 |

---

## 运行模式说明

### 五种运行模式

| 模式 | 对象前缀 | 特点 | 适用场景 |
|------|---------|------|---------|
| **无障碍模式** | `acEvent` | 需要开启无障碍服务 | 常规自动化 |
| **代理模式** | `agentEvent` | 需要启动代理服务 | 免root、功能最全 |
| **Root模式** | `shell` | 需要root权限 | 系统级操作 |
| **蓝牙HID** | `bleEvent` | 需要蓝牙HID硬件 | 无法开启无障碍 |
| **OTG HID** | `otgEvent` | 需要OTG HID硬件 | 无法开启无障碍 |

### 模式兼容性速查

| 功能 | 无障碍 | 代理 | Root | 蓝牙HID | OTG HID |
|------|--------|------|------|---------|---------|
| 节点选择器 | ✅ | ✅ | ❌ | ❌ | ❌ |
| 图色识别 | ✅ | ✅ | ✅ | ✅ | ✅ |
| OCR识别 | ✅ | ✅ | ✅ | ✅ | ✅ |
| YOLO检测 | ✅ | ✅ | ✅ | ✅ | ✅ |
| Shell命令 | ❌ | ✅ | ✅ | ❌ | ❌ |
| 系统按键 | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## 快速开始

### 1. 基础脚本模板

```javascript
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
        logd("找到元素，准备点击");
        click(selector);
    } else {
        loge("未找到元素");
    }
}

main();
```

### 2. 图色识别模板（HID模式）

```javascript
function main() {
    // 1. 申请截图权限（HID模式用type=1）
    image.requestScreenCapture(10000, 1);
    
    // 2. 截图
    let img = image.captureScreen();
    
    // 3. 找图/找色/OCR
    let point = image.findColor(img, "#FF0000", {});
    
    // 4. HID点击
    if (point) {
        hidEvent.click(point.x, point.y);
    }
    
    // 5. 释放资源
    image.recycle(img);
}

main();
```

### 3. UI界面模板

```javascript
function main() {
    // 1. 加载布局
    ui.layout("标题", "main.xml");
    
    // 2. 重置UI变量
    ui.resetUIVar();
    
    // 3. 获取视图
    let btn = ui.btn_submit;
    
    // 4. 绑定事件
    ui.setEvent(btn, "click", function(view) {
        toast("点击了按钮");
        ui.saveAllConfig();
    });
}

main();
```

---

## 在线资源

- **官网**：https://ieasyclick.com
- **在线文档**：https://ieasyclick.com/docs/zh-cn/funcs
- **开发文档**：https://www.ieasyclick.net/docs/

---

## 文档版本

- 适用版本：EasyClick 10.x+
- 最后更新：2025年
