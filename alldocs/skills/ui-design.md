# EasyClick UI设计规范 Skill

## 概述

本Skill指导AI如何正确设计EasyClick UI界面。EasyClick支持两种UI方案：

| UI类型 | 适用平台 | 技术栈 | 特点 |
|--------|---------|--------|------|
| **H5 UI** | 安卓、iOS脱机版 | HTML5 + Vue/React | 跨平台、美观、灵活 |
| **原生XML UI** | 仅安卓 | Android XML布局 | 原生体验、性能高 |

**平台选择指南**：
- **安卓**：两种UI都支持，推荐使用H5 UI（更美观）或原生XML（性能优先）
- **iOS脱机版**：仅支持H5 UI
- **iOS USB版**：不支持UI（无界面）
- **鸿蒙**：参考安卓方案

## 文档结构

### H5 UI文档（跨平台）

| 文档 | 路径 | 说明 | 适用平台 |
|------|------|------|---------|
| H5 UI索引 | `docs/funcs/ui/index.md` | H5 UI总体介绍 | 安卓、iOS脱机版 |
| iOS脱机版UI | `iostjdocs/funcs/ui/index.md` | iOS脱机版H5 UI | iOS脱机版 |
| JS交互 | `docs/funcs/ui/ui-js-inter.md` | H5与脚本交互 | 安卓、iOS脱机版 |
| JS高级交互 | `docs/funcs/ui/ui-js-inter-adv.md` | 高级交互 | 安卓、iOS脱机版 |

### 原生XML UI文档（仅安卓）

| 文档 | 路径 | 说明 |
|------|------|------|
| UI编写规范 | `docs/EC-UI-编写规范.md` | XML详细规范 |
| UI模板 | `docs/funcs/ui/ui-js-template.md` | XML模板示例 |
| 原生View | `docs/funcs/ui/ui-native-view.md` | 原生View |
| RecyclerView | `docs/funcs/ui/ui-recycleview.md` | 列表控件 |
| HTML自定义 | `docs/funcs/ui/html-ui-custom.md` | HTML混合 |

### XML控件详细文档（仅安卓）

位于 `docs/funcs/ui/uidetail/` 目录：

- `button.md` - 按钮
- `textview.md` - 文本
- `edittext.md` - 输入框
- `imageview.md` - 图片
- `checkbox.md` - 复选框
- `radiobutton.md` - 单选按钮
- `radiogroup.md` - 单选组
- `switch.md` - 开关
- `spinner.md` - 下拉选择
- `linearlayout.md` - 线性布局
- `relativelayout.md` - 相对布局
- `framelayout.md` - 帧布局
- `scrollview.md` - 滚动视图
- `h_scrollview.md` - 水平滚动
- `cardview.md` - 卡片视图
- `webview.md` - 网页视图
- `view.md` - 基础视图
- `canvas.md` - 画布
- `flexboxlayout.md` - 弹性布局
- `includetag.md` - 包含标签

## XML基础规范（仅安卓）

### ⚠️ 大原则（最重要 - 红线）

1. **EC不是完整Android**：EC的XML只支持文档明确列出的标签和属性，**任何文档没列的属性都不许写**
2. **统一使用 `android:` 前缀**：EasyClick 要求**所有**属性（包括公有属性和控件私有属性）必须带有 `android:` 前缀。严禁省略前缀或使用 `app:`、`tools:` 等其他命名空间。
3. **禁止照搬Android Studio习惯**：`textStyle`、`elevation`、`fontFamily`、`drawableLeft`、`MaterialButton`、`ConstraintLayout`、`tools:xxx`等一律不要写
4. **入口必须是`layout/ui.js`**：工程入口配置指向`layout/ui.js`，不是`js/main.js`。UI 子控制文件（JS）目录为 `layout/subjs/`（如 `layout/subjs/sub.js`）。其他 JS 插件类型文件可放在 `layout/subjs/plg.js` 中引用。
5. **不要在ui.js阻塞主线程**：禁止`while(true)`、长`sleep`、同步HTTP等。**最佳实践**：网络请求、文件读写等耗时操作必须开启异步线程处理。

### 工程结构

```
src/
├─ layout/
│   ├─ ui.js          # UI入口（工程入口配置指向这里）
│   ├─ main.xml       # 主布局
│   └─ subjs/         # UI 子控制及插件目录
│       ├─ sub.js     # UI 子控制文件
│       └─ plg.js     # JS 插件类型文件
├─ js/
│   └─ main.js        # 业务脚本（ui.start()后被执行）
└─ res/               # 图片资源
```

### 文件头

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<LinearLayout
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:android="http://schemas.android.com/apk/res/android"
    xsi:noNamespaceSchemaLocation="layout.xsd"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">
    <!-- 子控件 -->
</LinearLayout>
```

### 单位规范（强制）

| 用途 | 单位 | 正确示例 | 错误示例 |
|------|------|---------|---------|
| 文字大小 | **sp** | `android:textSize="16sp"` | `android:textSize="16dp"` |
| 宽高/边距 | **dp** | `android:layout_width="100dp"` | `android:layout_width="100px"` |
| 颜色 | **#RRGGBB** 或 **#AARRGGBB** | `android:textColor="#000000"` 或 `android:background="#80000000"` | 支持八位十六进制表示透明度，**禁止**使用 `alpha` 属性 |

### 宽高取值（强制）

| 值 | 含义 | 使用场景 |
|----|------|---------|
| `match_parent` | 填满父容器 | 根布局、需要填满的容器 |
| `wrap_content` | 自适应内容 | 子控件、ScrollView的子节点 |
| `wrap_parent` | 填满父容器 | EC 特有写法，等同于 match_parent |
| `0dp` | 配合weight使用 | 需要权重分配时 |

**⚠️ 注意**：EC 支持 `wrap_parent`，但建议优先使用 `match_parent` 以保持与 Android 标准的兼容性。

### EC支持的容器（白名单）

| 标签 | 用途 | 关键私有属性 |
| --- | --- | --- |
| `LinearLayout` | 线性布局（最常用） | `orientation` (vertical/horizontal) |
| `FrameLayout` | 帧布局，重叠摆放 | `layout_weight` |
| `RelativeLayout` | 相对布局 | `layout_weight`、`gravity` |
| `ScrollView` | 纵向滚动，**只能1个直接子节点** | `fillViewport` (true/false) |
| `HorizontalScrollView` | 横向滚动，**只能1个直接子节点** | `fillViewport` |
| `CardView` | 卡片 | `cardBackgroundColor`、`cardCornerRadius`、`cardElevation` |
| `RadioGroup` | 包裹RadioButton实现单选 | `orientation`（继承自LinearLayout） |
| `FlexboxLayout` | 弹性盒子（少用） | 需查官方文档 |

### EC支持的子控件（白名单）

`Button` / `TextView` / `EditText` / `CheckBox` / `RadioButton` / `Spinner` / `Switch` / `ImageView` / `WebView` / `View` / `include` / `Canvas`

**重要限制**：
- **不支持自定义XML组件**
- **不支持XML样式文件**（没有`styles.xml`）
- **不支持国际化语言文件**（没有`strings.xml`）
- RecyclerView要在JS里`new RecyclerView(context)`动态构建

### 公有属性（每个控件都能用）

| 属性 | 说明 | 取值 |
| --- | --- | --- |
| `layout_width` / `layout_height` | 宽/高 | `wrap_content` / `match_parent` / `具体数字+dp` |
| `background` | 背景色 | `#RRGGBB` 或 `#AARRGGBB` |
| `tag` | 标识，JS中用`ui.<tag>`访问 | 推荐英文 |
| `visibility` | 是否显示 | `gone` / `visible` / `invisible` |
| `clickable` | 是否可点击 | `true` / `false` |
| `enable` | 是否启用 | `true` / `false` |
| `minHeight` / `minWidth` | 最小尺寸 | `数字+dp` |
| `padding` / `paddingLeft/Top/Right/Bottom` | 内边距 | `数字+dp` |
| `layout_margin` / `layout_marginLeft/Top/Right/Bottom` | 外边距 | `数字+dp` |
| `layout_gravity` | 自身相对父容器对齐 | `top/bottom/left/right/center/center_vertical/center_horizontal/fill/...` |
| `cornerRadius` | **通用圆角**（CardView 除外） | `数字+dp` |

## 常用控件规范

### 1. TextView 文本

**私有属性**：
- `text` - 文本内容
- `textColor` - 文字颜色
- `textSize` - 文字大小（sp）
- `gravity` - 文字对齐
- `maxLength` - 最大长度（**不推荐在 XML 中使用**，建议在 `ui.js` 中通过 Java 方式实现）
- `lines` / `maxLines` - 行数限制（**不推荐在 XML 中使用**，建议在 `ui.js` 中通过 Java 方式实现）
- `ellipsize` - 省略方式（**不推荐在 XML 中使用**，建议在 `ui.js` 中通过 Java 方式实现）
- `layout_weight` - 权重（**所有布局均支持，但根布局禁止使用**。使用时需配合 `0dp` 宽度或高度）

**❌ 不支持**：`textStyle`、`fontFamily`、`drawableLeft`、`shadowColor`等

```xml
<TextView
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="标题文本"
    android:textSize="16sp"
    android:textColor="#000000"
    android:gravity="center" />
```

**💡 如需自定义字体样式**：在JS中获取View后使用Android Java方法：
```javascript
textView.setTypeface(Typeface.DEFAULT_BOLD);
```

### 2. EditText 输入框

**私有属性**（继承TextView全部属性，再加）：
- `hint` - 占位提示文本
- `inputType` - 输入类型

**inputType取值**（仅支持这5种）：
- `text` - 普通文本
- `phone` - 电话号码
- `number` - 数字
- `textPassword` - 密码（显示圆点）
- `numberPassword` - 数字密码

**❌ 不支持**：`numberDecimal`、`textEmailAddress`等

```xml
<EditText
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:tag="input_username"
    android:hint="请输入用户名"
    android:textSize="14sp"
    android:inputType="text" />
```

**💡 hint动态设置**：需在JS中使用：
```javascript
editText.setHint("提示文字");
editText.setHintTextColor(Color.parseColor("#999999"));
```

### 3. Button 按钮

```xml
<Button
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:tag="btn_login"
    android:text="登录"
    android:textSize="16sp"
    android:textColor="#FFFFFF"
    android:background="#2196F3" />
```

### 4. CheckBox 复选框

```xml
<CheckBox
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:tag="cb_agree"
    android:text="同意协议"
    android:checked="true" />
```

### 5. Spinner 下拉选择（重要 - 和原生Android不一样）

**私有属性**：
- `text` - **用`|`分隔**作为下拉项（不是`entries`）
- `defaultText` - 默认选中的项（必须是`text`中的某一个）
- `mode` - `dialog`（对话框模式）或 `dropdown`（下拉模式）
- `popupHeight` - 弹出框高度（`数字+dp`）
- `textColor`、`textSize`、`gravity`、`layout_weight`

**⚠️ 重要**：Spinner用`text="选项1|选项2|选项3"`，**不是`entries`、不是`android:entries`**

```xml
<Spinner
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:tag="spinner_city"
    android:text="北京|上海|广州|深圳"
    android:defaultText="北京"
    android:mode="dialog" />
```

**💡 下拉监听**：必须使用EC的监听方式：
```javascript
ui.setEvent(spinner, "itemSelected", function(position, value) {
    logd("选中: " + position + " = " + value);
});
```

### 6. ScrollView 滚动视图

```xml
<ScrollView
    android:layout_width="match_parent"
    android:layout_height="0dp"
    android:layout_weight="1"
    android:fillViewport="true">
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical">
        <!-- 内容 -->
    </LinearLayout>
</ScrollView>
```

**⚠️ 注意**：
- ScrollView内部只能有**1个**直接子节点
- 子节点高度必须是 `wrap_content`

### 7. CardView 卡片布局

**私有属性**：
- `cardBackgroundColor` - 卡片背景色
- `cardCornerRadius` - 圆角（`数字+dp`）
- `cardElevation` - 阴影z值（`数字+dp`）
- `cardMaxElevation` - 阴影最大值（`数字+dp`）

**⚠️ 重要规范**：在 EasyClick 中，**所有**属性都必须添加 `android:` 前缀。

```xml
<CardView
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_margin="8dp"
    android:cardBackgroundColor="#FFFFFF"
    android:cardCornerRadius="8dp"
    android:cardElevation="4dp">
    
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:padding="16dp">
        
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="卡片标题"
            android:textSize="18sp" />
            
    </LinearLayout>
    
</CardView>
```

### 8. ImageView 图像

**私有属性**：
- `src` - 图片源
  - `@drawable/xxx`：引用工程`src/res`目录下的图片
  - `http://...`：网络URL
  - `res/xxx.png`：在JS中使用

**💡 scaleType设置**：建议在JS中设置：
```javascript
imageView.setScaleType(ImageView.ScaleType.CENTER_CROP);
```

---

## 常见错误对照表

| 错误写法 | 现象 | 正确做法 |
| --- | --- | --- |
| `android:textStyle="bold"` | 预览空白/手机端不显示UI | **删除该属性**（EC不支持加粗） |
| `android:elevation="4dp"`（普通View上） | 同上 | 删除；只有`CardView.cardElevation`合法 |
| `android:fontFamily="..."` | 同上 | 删除 |
| `tools:xxx`命名空间 | 同上 | 删除，EC不识别`tools:` |
| `app:xxx`命名空间 | 同上 | 删除，EC XML只用`android:`前缀 |
| `ConstraintLayout`根布局 | 同上 | 改`LinearLayout`/`RelativeLayout` |
| `ScrollView`直接子View多于1个 | 同上 | 内部包一个`LinearLayout` |
| `match_parent`写成`fill_parent` | 老API写法不一定支持 | 统一写`match_parent` 或 `wrap_parent` |
| `12`纯数字 | 解析失败 | 改成`12dp`或`12sp` |
| Spinner用`entries` | 选项不显示 | 改用`text="A\|B\|C"` |
| EditText `inputType="numberDecimal"` | 解析失败 | 只用`text/phone/number/textPassword/numberPassword` |
| CardView 属性无前缀 (如 `cardCornerRadius`) | 属性不生效 | 必须写成 `android:cardCornerRadius` |
| 任何属性省略 `android:` 前缀 | 解析失败或属性无效 | 统一补全为 `android:xxx` |
| `padding="10 20"` (简写) | 解析失败 | 必须带单位，如 `padding="10dp"` |

> **快速诊断**：UI预览打不开或手机端看不到时，按上表逐项排查；80%是属性/标签不在白名单里。

## 布局规范

### 1. LinearLayout 线性布局

```xml
<LinearLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="horizontal"
    android:padding="16dp"
    android:gravity="center_vertical">
    
    <TextView
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_weight="1"
        android:text="标签" />
        
    <EditText
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_weight="3"
        android:tag="input_value" />
        
</LinearLayout>
```

### 2. RelativeLayout 相对布局

```xml
<RelativeLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content">
    
    <TextView
        android:id="@+id/tv_label"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="标签" />
        
    <EditText
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_toRightOf="@id/tv_label"
        android:tag="input_value" />
        
</RelativeLayout>
```

### 3. CardView 卡片视图

```xml
<CardView
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_margin="8dp"
    android:padding="16dp">
    
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical">
        
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="卡片标题"
            android:textSize="18sp"
            android:textStyle="bold" />
            
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="卡片内容"
            android:textSize="14sp" />
            
    </LinearLayout>
    
</CardView>
```

## JS交互规范（仅安卓XML UI）

### tag命名规范

- **每个需要在代码里访问或保存的控件都必须有`android:tag="..."`**
- tag推荐英文+下划线（如`xhs_api_key`、`startBtn`、`saveAllBtn`）
- ui.js里先调用`ui.resetUIVar()`，然后通过`ui.<tag>`直接拿到View
- **自动恢复机制**：如果业务中调用了 `ui.saveAllConfig()`，EC 框架会在下次启动 UI 时**自动**将保存的值恢复到对应的 `ui.<tag>` 控件上。**不需要**在代码中手动读取并赋值。
- **禁止手动取值**：**严禁**在代码中使用 `ui.getConfig()` 或 `ui.getViewValue()` 来获取控件值。如需读取已保存的配置，必须使用全局函数 `readConfigString("key")`、`readConfigInt("key")` 等。
- **tag名不要重复**，否则`ui.<tag>`只能拿到第一个

### 基础模板

```javascript
function main() {
    // 1. 加载布局
    ui.layout("标题", "main.xml");
    
    // 2. 重置UI变量（获取视图前必须调用）
    ui.resetUIVar();
    
    // 3. 通过tag获取视图
    let usernameInput = ui.input_username;
    let passwordInput = ui.input_password;
    let loginBtn = ui.btn_login;
    
    // 4. 绑定事件
    ui.setEvent(loginBtn, "click", function(view) {
        // 获取输入值
        let username = usernameInput.getText();
        let password = passwordInput.getText();
        
        logd("用户名: " + username);
        logd("密码: " + password);
        
        // 保存配置
        ui.saveAllConfig();
        
        toast("登录成功");
    });
}

main();
```

### ui.js API索引

#### 布局/视图查找
- `ui.layout(tabName, "xxx.xml")` → 渲染界面
- `ui.parseView("xxx.xml")` → 仅解析返回View，不渲染
- `ui.findViewByTag("tag")` → 通过tag查View
- `ui.resetUIVar()` → 把所有tag注册成`ui.<tag>`属性
- `ui.getRootView()` → 拿到所有tab的根View数组

#### 配置读写（持久化）
- `ui.saveAllConfig()` → 把所有tag控件的值存进EC配置
- `ui.saveConfig(key, value)` → 单独存一个key
- **禁止使用**：`ui.getConfig()`、`ui.getViewValue()`。严禁在代码中直接调用这些函数获取值。
- `ui.getConfigJSON()` → 拿到所有配置的JSON字符串
- `ui.removeAllUIConfig()` → 清空所有配置
- **推荐读取方式**：统一使用全局函数 `readConfigString("key")`、`readConfigInt("key")`、`readConfigBoolean("key")` 等读取已存储的值。

#### 控件值
- `ui.setViewValue(tagOrView, value)` → 赋值
- `ui.getViewValue(tagOrView)` → 取值
- 直接用：`ui.<tag>.setText(...)`、`ui.<tag>.getText()`、`ui.<tag>.setChecked(true)`

#### 内存共享数据（UI ↔ 脚本传引用）
- `ui.putShareData(key, value)` / `ui.getShareData(key)` / `ui.clearAllShareData()`

#### 事件
```javascript
ui.setEvent(view, "click", function(view) { ... });
ui.setEvent(view, "checkedChange", function(view, isChecked) { ... });
ui.setEvent(view, "itemSelected", function(position, value) { ... });
ui.setEvent(view, "itemClick", function(...) { ... });
```
事件类型只有：`click` / `checkedChange` / `itemClick` / `itemSelected`

#### Activity生命周期
- `ui.onActivityEvent("onResume"|"onPause"|"onStop"|"onDestroy", callback)`
- 典型场景：用户从「无障碍设置」回来时，在`onResume`里刷新权限按钮状态

#### 主线程切换
- `ui.run(delayMs, callback)` → 主线程上延后执行（0=立即）
- `ui.getHandler()` → 原生Handler

#### 提示框/对话框
- `ui.toast(msg)` → 短提示
- `ui.alert({title,msg,cancelText,okText,cancelable}, okCb, cancelCb, dismissCb)` → 标准弹窗
- `ui.inputDialog(...)` → 带输入框的弹窗
- `ui.customDialog({fullScreen,cancelable}, view, onViewBind, dismissCb)` → 自定义视图弹窗

#### 浮窗（启停/日志/控制悬浮窗）
- `ui.hasFloatViewPermission()` / `ui.requestFloatViewPermissionAsync(timeout, cb)`
- `ui.showCtrlWindow()` / `ui.closeCtrlWindow()` — 启停控制悬浮窗
- `ui.showLogWindow()` / `ui.closeLogWindow()` — 日志悬浮窗
- `ui.showScriptCtrlFloatView()` / `ui.closeScriptCtrlFloatView()` — 脚本暂停控制悬浮窗

#### 脚本启停/模式
- `ui.isServiceOk()` → 自动化服务是否正常
- `ui.isAccMode()` / `ui.isAgentMode()` → 当前运行模式
- `ui.setRunningMode(1=代理|2=无障碍)`
- `ui.startEnvAsync(cb)` → 异步启动自动化环境
- `ui.start()` → 启动脚本（脚本入口跑`js/main.js`）
- `ui.stopTask()` → 停止脚本
- `ui.isScriptRunning()`

> **⚠️ 注意**：脚本启停功能**仅适用于无障碍模式、代理模式和Root模式**。
> **不适用于蓝牙HID、OTG HID等硬件控制模式**。

#### 跳转系统设置
```javascript
ui.openActivity({
    "action": "android.settings.ACCESSIBILITY_SETTINGS"
});
```

### 多标签页

```javascript
function main() {
    // 创建多个标签页
    ui.layout("设置", "settings.xml");
    ui.layout("日志", "logs.xml");
    ui.layout("关于", "about.xml");
    
    ui.resetUIVar();
    
    // 每个标签页独立操作
    // ...
}

main();
```

### 常用视图操作

```javascript
// ✅ 正确：通过 View 对象获取当前输入值
let value = ui.keyInput.getText();
let text = textView.getText();
let checked = checkBox.isChecked();

// ❌ 错误：禁止使用 ui.getConfig() 获取当前输入
// let value = ui.getConfig("keyInput"); // 这是错误的！getConfig 只能读历史配置

// 设置文本
textView.setText("新文本");
editText.setText("默认值");

// 设置勾选
checkBox.setChecked(true);

// 设置可见性
view.setVisibility(true);   // 可见
view.setVisibility(false);  // 不可见

// 设置启用/禁用
view.setEnabled(true);
view.setEnabled(false);
```

## 完整示例（规范版）

### 登录界面

**login.xml**（符合EC规范的完整可用模板）：
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<ScrollView xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xmlns:android="http://schemas.android.com/apk/res/android"
            xsi:noNamespaceSchemaLocation="layout.xsd"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:fillViewport="true">
    <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="vertical"
            android:padding="16dp">

        <TextView
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:text="用户登录"
                android:textColor="#1A1A1A"
                android:textSize="18sp"
                android:paddingBottom="12dp"
                android:gravity="center"/>

        <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="用户名"
                android:textSize="14sp"
                android:textColor="#666666"/>

        <EditText
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:tag="input_username"
                android:hint="请输入用户名"
                android:inputType="text"
                android:textColor="#222222"
                android:textSize="14sp"
                android:padding="10dp"
                android:background="#F0F0F0"
                android:layout_marginBottom="16dp"/>

        <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="密码"
                android:textSize="14sp"
                android:textColor="#666666"/>

        <EditText
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:tag="input_password"
                android:hint="请输入密码"
                android:inputType="textPassword"
                android:textColor="#222222"
                android:textSize="14sp"
                android:padding="10dp"
                android:background="#F0F0F0"
                android:layout_marginBottom="16dp"/>

        <CheckBox
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:tag="cb_remember"
                android:text="记住密码"
                android:layout_marginBottom="16dp"/>

        <Button
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:layout_marginTop="16dp"
                android:tag="btn_login"
                android:text="登录"
                android:textColor="#FFFFFF"
                android:textSize="14sp"
                android:cornerRadius="6dp"
                android:background="#FF2442"/>
    </LinearLayout>
</ScrollView>
```

**login.js**:
```javascript
function main() {
    ui.layout("用户登录", "login.xml");
    ui.resetUIVar();
    
    let usernameInput = ui.input_username;
    let passwordInput = ui.input_password;
    let rememberCb = ui.cb_remember;
    let loginBtn = ui.btn_login;
    
    ui.setEvent(loginBtn, "click", function(view) {
        let username = usernameInput.getText();
        let password = passwordInput.getText();
        let remember = rememberCb.isChecked();
        
        if (!username || !password) {
            toast("用户名和密码不能为空");
            return;
        }
        
        logd("登录信息 - 用户名: " + username + ", 记住密码: " + remember);
        
        ui.saveAllConfig();
        toast("登录成功！");
    });
}

main();
```

---

## H5 UI规范（跨平台）

### 适用平台

| 平台 | 支持情况 | 说明 |
|------|---------|------|
| **安卓** | ✅ 支持 | 推荐使用 |
| **iOS脱机版** | ✅ 支持 | 唯一UI方案 |
| **iOS USB版** | ❌ 不支持 | 无UI界面 |
| **鸿蒙** | ✅ 支持 | 参考安卓 |

### H5 UI特点

- 使用标准HTML5浏览器内核
- 支持Vue、React等前端框架
- 支持CSS3动画和样式
- 跨平台，一套代码多端运行
- 与脚本通过JS交互

### H5 UI基础模板

**index.html**:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EasyClick H5 UI</title>
    <style>
        body {
            margin: 0;
            padding: 16px;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
        }
        .btn {
            width: 100%;
            padding: 12px;
            background: #2196F3;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            margin-top: 16px;
        }
        .input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
            margin-top: 8px;
            box-sizing: border-box;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>用户登录</h2>
        <input type="text" id="username" class="input" placeholder="请输入用户名">
        <input type="password" id="password" class="input" placeholder="请输入密码">
        <button class="btn" onclick="login()">登录</button>
    </div>
    
    <script>
        function login() {
            var username = document.getElementById('username').value;
            var password = document.getElementById('password').value;
            
            // 调用脚本函数
            script.call('onLogin', JSON.stringify({
                username: username,
                password: password
            }));
        }
        
        // 接收脚本消息
        function onScriptMessage(data) {
            console.log('收到脚本消息:', data);
        }
    </script>
</body>
</html>
```

**script.js**:
```javascript
function main() {
    // 加载H5 UI
    ui.layout("用户登录", "index.html");
}

// H5调用的函数
function onLogin(data) {
    var obj = JSON.parse(data);
    logd("用户名: " + obj.username);
    logd("密码: " + obj.password);
    
    // 返回数据给H5
    ui.runJavaScript("onScriptMessage('登录成功')");
}

main();
```

### H5与脚本交互

| 方向 | 方法 | 说明 |
|------|------|------|
| H5 → 脚本 | `script.call('funcName', data)` | H5调用脚本函数 |
| 脚本 → H5 | `ui.runJavaScript('jsCode')` | 脚本执行H5 JS |

### Vue/React支持

iOS脱机版和安卓都支持现代前端框架：

```html
<!-- Vue示例 -->
<div id="app">
    <input v-model="username" placeholder="用户名">
    <button @click="submit">提交</button>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
<script>
    new Vue({
        el: '#app',
        data: { username: '' },
        methods: {
            submit: function() {
                script.call('onSubmit', this.username);
            }
        }
    });
</script>
```

---

## 平台选择建议

### 什么时候用H5 UI？

✅ **推荐使用场景**：
- 需要跨平台（安卓+iOS脱机版）
- 需要复杂美观的界面
- 需要使用Vue/React等框架
- 需要CSS3动画效果
- iOS脱机版开发（唯一选择）

### 什么时候用原生XML UI？

✅ **推荐使用场景**：
- 仅安卓平台
- 追求极致性能
- 需要原生Android组件
- 简单的配置界面

❌ **不适用场景**：
- iOS脱机版（不支持XML）
- 需要跨平台

---

## 参考文档

### H5 UI文档

- 安卓H5 UI：`docs/funcs/ui/index.md`
- iOS脱机版H5 UI：`iostjdocs/funcs/ui/index.md`
- H5 JS交互：`docs/funcs/ui/ui-js-inter.md`
- H5高级交互：`docs/funcs/ui/ui-js-inter-adv.md`
- iOS脱机版JS交互：`iostjdocs/funcs/ui/ui-js-inter.md`

### 原生XML UI文档（仅安卓）

- UI编写规范：`docs/EC-UI-编写规范.md`
- 控件文档：`docs/funcs/ui/uidetail/*.md`
- JS交互文档：`docs/funcs/ui/ui-js-inter.md`
