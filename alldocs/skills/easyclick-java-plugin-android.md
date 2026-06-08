# EasyClick Java插件开发 Skill（安卓版）

## 前置阅读

**必须先阅读**：
1. [全局强制性规则](easyclick-global-rules.md) - 所有平台通用的绝对禁止规则
2. [通用开发规范](easyclick-dev-guide.md) - 跨平台开发流程和编码规范

**本文内容**：仅包含安卓Java插件特有的技术细节和规范。

---

## 概述

**Java插件特点**：
- 使用Java/Kotlin编写核心逻辑，JS调用
- 适合复杂算法、第三方SDK集成、性能敏感操作
- 插件以**apk形式**加载（不是dex/jar）
- 支持热更新（EC 7.1.0+）

**⚠️ 重要限制**：

| 限制项 | 说明 |
|--------|------|
| **打包格式** | 只能打包为**apk**（不是dex/jar/aar） |
| **JDK版本** | 必须使用**JDK 1.8**（不支持更高版本） |
| **第三方库** | 只能使用**安卓版**三方库（不支持纯Java库） |
| **AAR支持** | **不支持**aar格式（只能使用jar） |
| **Android API** | 可以调用Android SDK API |

---

## 工程结构

### 标准插件工程结构

```
plugin_project/
├── src/
│   └── main/
│       └── java/
│           └── com/
│               └── example/
│                   ├── PluginMain.java      # 插件入口类
│                   └── utils/
│                       └── Utils.java       # 工具类
├── libs/
│   └── android.jar                          # Android SDK
├── build.gradle                             # Gradle配置
└── AndroidManifest.xml                      # 清单文件
```

### 脚本工程结构（使用插件）

```
ec_project/
├── src/
│   ├── main.js                              # 主脚本
│   └── plugin/
│       └── myplugin.apk                     # 插件文件（打包时放入）
└── project.json
```

---

## 开发流程

### 1. 创建Java插件工程

**EC插件项目标准目录结构**：

```
plugin_project/
├── src/
│   ├── js/
│   │   └── main.js              # JS调用插件的测试入口
│   └── com/                     # Java源码目录
│       └── example/
│           ├── PluginClz.java   # 默认生成的插件入口类
│           └── utils/
│               └── Utils.java   # 工具类
├── libs/
│   ├── jarlibs/                 # 三方jar包（会被合并到插件）
│   │   └── gson-2.8.9.jar
│   ├── solibs/                  # so库（会被编译到lib/）
│   │   └── libnative.so
│   ├── resources/               # 资源文件（会被编译到resources/）
│   │   └── config.json
│   └── jslibs/                  # JS类库（仅测试用，不编译到插件）
│       └── utils.js
└── project.properties           # 工程配置
```

**目录说明**：

| 目录 | 用途 | 编译结果 |
|------|------|----------|
| `src/js/main.js` | JS调用插件的测试入口 | 不编译，仅测试 |
| `src/com/` | Java源码目录 | 编译到classes.dex |
| `libs/jarlibs/` | 三方jar包 | 合并到插件 |
| `libs/solibs/` | so库文件 | 编译到`lib/`文件夹 |
| `libs/resources/` | 资源文件 | 编译到`resources/`文件夹 |
| `libs/jslibs/` | JS类库 | 不编译，仅测试调用 |

**工程配置要求**：
- **JDK版本**：必须使用**JDK 1.8**（不支持更高版本）
- **构建工具**：EC IDEA插件自动编译
- **输出格式**：**apk**（不是dex/jar/aar）
- **第三方库**：只能使用**jar格式**的安卓版库（不支持aar）

**project.properties配置**：
```properties
# Android目标版本
target=android-30

# Java版本（必须使用1.8）
java.source=1.8
java.target=1.8

# 插件包名
package=com.example.plugin

# 入口类
main.class=com.example.PluginClz
```

**⚠️ 注意区分**：
- **EC插件项目/混合项目**：使用IDEA构建，标准目录结构如上
- **独立安卓Java插件**：使用Android Studio独立开发（通用apk）

### 2. 编写插件代码

**PluginMain.java示例**：
```java
package com.example;

import android.util.Log;

public class PluginMain {
    private static final String TAG = "ECPlugin";
    
    // 无参构造
    public PluginMain() {
        Log.d(TAG, "Plugin initialized");
    }
    
    // 带参构造
    public PluginMain(String config) {
        Log.d(TAG, "Plugin initialized with config: " + config);
    }
    
    // 普通方法
    public String processData(String input) {
        return "Processed: " + input;
    }
    
    // 静态方法
    public static int add(int a, int b) {
        return a + b;
    }
    
    // 回调接口（用于异步操作）
    public interface Callback {
        void onResult(String result);
    }
    
    // 异步方法
    public void asyncOperation(String param, Callback callback) {
        new Thread(() -> {
            // 耗时操作
            try {
                Thread.sleep(1000);
                callback.onResult("Async result: " + param);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }).start();
    }
}
```

### 3. 编译插件

**方式1：EC插件项目（使用IDEA）**
1. 在IDEA中右键项目 → EasyClick → 编译插件
2. 生成的apk位置：`build/*.apk`

**方式2：独立开发（使用Android Studio）**
1. Build → Build Bundle(s) / APK(s) → Build APK(s)
2. 生成的apk位置：`app/build/outputs/apk/debug/*.apk` 或 `app/build/outputs/apk/release/*.apk`

**⚠️ 注意**：
- 只能使用**apk格式**（不是dex/jar/aar）
- 确保使用**JDK 1.8**编译
- 第三方库必须是**jar格式**（不支持aar）

**验证apk内容**：
```bash
# 解压apk查看内容
unzip -l plugin.apk

# 应该包含：
# - classes.dex（编译后的Java代码）
# - AndroidManifest.xml
# - res/（资源文件，可选）
# - lib/（so库，可选）
# - META-INF/
```

### 4. 脚本中加载使用

**基础加载方式**：
```javascript
function main() {
    // 加载插件（从插件目录或绝对路径）
    // 方式1：从IEC插件目录加载（推荐）
    let result = loadDex("myplugin.apk");
    // 方式2：从sdcard加载
    // let result = loadDex("/sdcard/myplugin.apk");
    
    if (!result) {
        loge("插件加载失败");
        return;
    }
    logd("插件加载成功");
    
    // 导入Java类
    importClass(com.example.PluginMain);
    
    // 创建实例（调用无参构造）
    let plugin = new com.example.PluginMain();
    
    // 调用方法
    let output = plugin.processData("Hello");
    logd("输出: " + output);  // 输出: Processed: Hello
    
    // 调用静态方法
    let sum = com.example.PluginMain.add(1, 2);
    logd("求和: " + sum);  // 输出: 3
}

main();
```

**⚠️ 加载注意事项**：
- 只能加载**apk格式**（loadDex支持apk）
- 插件必须放在目标项目的`src/plugins/`目录
- 打包IEC时会自动包含plugins目录下的所有插件

**插件部署位置**：
```
target_project/                  # 目标安卓EC项目
├── src/
│   ├── js/main.js                  # 主脚本
│   └── plugins/                 # 插件目录
│       └── android-plugin.apk   # 安卓Java插件（apk格式）
└── project.json
```

**带参数构造**：
```javascript
function main() {
    loadDex("myplugin.apk");
    importClass(com.example.PluginMain);
    
    // 创建实例（调用带参构造）
    let plugin = new com.example.PluginMain("config_string");
    
    // 使用实例
    let result = plugin.processData("test");
    logd(result);
}

main();
```

---

## 安卓插件特有规范

### 插件开发限制

**绝对禁止**：
- ❌ 禁止在插件中引用EC内部类（插件应独立）
- ❌ 禁止在插件中操作UI（无Activity上下文）
- ❌ 禁止在插件主线程执行耗时操作（会阻塞JS）
- ❌ 禁止使用Android隐藏API（可能随系统版本变化）

**推荐做法**：
- ✅ 插件只暴露纯逻辑接口
- ✅ 耗时操作使用异步回调
- ✅ 异常处理完善，不抛出到JS层
- ✅ 使用简单数据类型（String/int/boolean等）

### 数据类型映射

| Java类型 | JavaScript类型 | 说明 |
|---------|---------------|------|
| `String` | `string` | 自动转换 |
| `int` | `number` | 自动转换 |
| `long` | `number` | 自动转换 |
| `double` | `number` | 自动转换 |
| `boolean` | `boolean` | 自动转换 |
| `Object` | `object` | JSON对象 |
| `Array` | `array` | JS数组 |
| `void` | `undefined` | 无返回值 |

---

## 高级用法

### 1. 热更新支持（EC 7.1.0+）

```javascript
function main() {
    // 设置允许重复加载（用于热更新）
    setRepeatLoadDex(true);
    
    // 加载插件
    loadDex("myplugin.apk");
    
    // ... 使用插件
    
    // 更新插件后重新加载
    // 无需重启脚本，直接重新loadDex即可
}

main();
```

### 2. 导入整个包

```javascript
function main() {
    loadDex("myplugin.apk");
    
    // 导入整个包（包下所有类）
    importPackage(com.example);
    
    // 直接使用类名（无需完整包名）
    let plugin = new PluginMain();
    let utils = new Utils();
}

main();
```

### 3. 使用Android系统类

```javascript
function main() {
    // 方式1：使用importClass导入单个类
    importClass(android.util.Log);
    importClass(android.graphics.Bitmap);
    importClass(android.graphics.BitmapFactory);
    
    // 使用系统类
    let bitmap = BitmapFactory.decodeFile("/sdcard/test.png");
    Log.d("EC", "Bitmap width: " + bitmap.getWidth());
}

main();
```

**使用importPackage导入整个包**：
```javascript
function main() {
    // 方式2：使用importPackage导入整个包
    importPackage(android.util);
    importPackage(android.graphics);
    
    // 直接使用类名（无需完整包名）
    let bitmap = BitmapFactory.decodeFile("/sdcard/test.png");
    Log.d("EC", "Bitmap width: " + bitmap.getWidth());
}

main();
```

### 4. 使用第三方库（jar格式）

**添加jar库**：
将第三方jar文件放入`libs/jarlibs/`目录：
```
plugin_project/
├── libs/
│   ├── jarlibs/                         # 三方jar包目录
│   │   ├── gson-2.8.9.jar               # ✅ Gson库（jar格式）
│   │   └── okhttp-3.14.9.jar            # ✅ OkHttp库（jar格式）
│   ├── solibs/                          # so库目录
│   │   └── libnative.so
│   └── resources/                       # 资源文件目录
│       └── config.json
```

**⚠️ 无需手动配置**

EC的IDEA插件会自动处理编译：
- `jarlibs/`中的jar会被合并到插件
- `solibs/`中的so会被编译到`lib/`文件夹
- `resources/`中的文件会被编译到`resources/`文件夹

**如果只有aar怎么办**：
```bash
# 手动解压aar获取jar
unzip sdk.aar -d sdk_extracted/
# 使用 sdk_extracted/classes.jar
# 将classes.jar重命名并放入libs/jarlibs/
cp sdk_extracted/classes.jar libs/jarlibs/sdk-classes.jar
```

**使用示例**：
```java
// 在插件中使用Gson
import com.google.gson.Gson;
import com.google.gson.JsonObject;

public class JsonPlugin {
    private Gson gson = new Gson();
    
    public String toJson(String key, String value) {
        JsonObject obj = new JsonObject();
        obj.addProperty(key, value);
        return gson.toJson(obj);
    }
}
```

### 4. 回调接口实现

```javascript
function main() {
    loadDex("myplugin.apk");
    importClass(com.example.PluginMain);
    
    let plugin = new PluginMain();
    
    // 实现Java回调接口
    let callback = new com.example.PluginMain.Callback({
        onResult: function(result) {
            logd("回调结果: " + result);
        }
    });
    
    // 调用异步方法
    plugin.asyncOperation("test", callback);
    
    // 等待异步完成
    sleep(2000);
}

main();
```

---

## 常见问题

### 1. ClassNotFoundException

**原因**：
- 类名错误
- 包名错误
- 插件未加载成功

**解决**：
```javascript
// 确认类名正确
importClass(com.example.PluginMain);  // 注意大小写

// 打印类路径调试用
try {
    importClass(com.example.PluginMain);
} catch (e) {
    loge("导入失败: " + e.message);
}
```

### 2. NoSuchMethodException

**原因**：
- 方法名错误
- 参数类型不匹配
- 方法不存在

**解决**：
```javascript
// 确认方法签名匹配
// Java: public String process(String input)
// JS: plugin.process("test")  ✓
// JS: plugin.process(123)     ✗ 类型不匹配
```

### 3. 插件过大导致加载慢

**解决**：
```javascript
// 使用setRepeatLoadDex优化
setRepeatLoadDex(false);  // 不重复加载，加快速度
loadDex("large_plugin.apk");
```

### 4. 内存泄漏

**解决**：
```javascript
// 及时释放不再使用的对象
let plugin = new com.example.PluginMain();
// ... 使用
plugin = null;  // 释放引用

// 主动触发GC（必要时）
java.lang.System.gc();
```

---

## 最佳实践

### 1. 插件设计原则

```java
// ✅ 好的设计：单一职责
public class ImageProcessor {
    public Bitmap resize(Bitmap src, int width, int height) { ... }
    public Bitmap crop(Bitmap src, int x, int y, int w, int h) { ... }
    public String recognizeText(Bitmap src) { ... }
}

// ❌ 坏的设计：功能混杂
public class Utils {
    // 图片处理
    public Bitmap processImage(...) { ... }
    // 网络请求
    public String httpRequest(...) { ... }
    // 文件操作
    public void fileOperation(...) { ... }
}
```

### 2. 错误处理

```java
public class SafePlugin {
    public String safeOperation(String input) {
        try {
            // 可能抛出异常的操作
            return doSomething(input);
        } catch (Exception e) {
            // 捕获异常，返回错误信息
            return "ERROR: " + e.getMessage();
        }
    }
}
```

```javascript
// JS端处理
let result = plugin.safeOperation("test");
if (result.startsWith("ERROR:")) {
    loge("操作失败: " + result);
} else {
    logd("操作成功: " + result);
}
```

### 3. 日志输出

```java
// Java端使用Android Log
import android.util.Log;

public class PluginMain {
    private static final String TAG = "ECPlugin";
    
    public void doSomething() {
        Log.d(TAG, "Debug message");
        Log.i(TAG, "Info message");
        Log.w(TAG, "Warning message");
        Log.e(TAG, "Error message");
    }
}
```

```javascript
// JS端查看日志
// 使用IDEA的日志窗口或adb logcat查看
```

---

## 参考文档

- **插件加载**：`docs/funcs/global/global.md` - loadDex/importClass/importPackage
- **Java-JS交互**：`docs/funcs/plugin/javajs.md`（如有）
- **Android API**：官方Android开发者文档
- **Rhino引擎**：Mozilla Rhino文档（了解JS-Java交互细节）
