# EasyClick Java插件开发 Skill（iOS USB版）

## 前置阅读

**必须先阅读**：
1. [全局强制性规则](easyclick-global-rules.md) - 所有平台通用的绝对禁止规则
2. [通用开发规范](easyclick-dev-guide.md) - 跨平台开发流程和编码规范
3. [安卓Java插件](easyclick-java-plugin-android.md) - 了解Java插件基础（iOS插件类似但运行在PC端）

**本文内容**：仅包含iOS USB版Java插件特有的技术细节和规范。

---

## 概述

**iOS Java插件特点**：
- **运行在PC端**（IDEA插件侧），不是运行在iOS设备端
- 使用**Java/Kotlin**编写，编译为**jar包**（不是dex/apk）
- 通过EC IDEA插件加载执行
- 适合复杂算法、PC端资源访问、第三方SDK集成

**⚠️ 与安卓插件的重要区别**：

| 特性 | 安卓Java插件 | iOS USB版Java插件 |
|------|-------------|------------------|
| **运行位置** | 安卓设备端 | PC端（中控通过USB与手机通信） |
| **编译产物** | apk | jar包 |
| **加载方式** | `loadDex()` | `loadDex()`（与安卓相同） |
| **可访问资源** | 安卓设备文件系统 | PC端文件系统 |
| **调用方式** | JS直接调用Java类 | JS直接调用Java类（与安卓相同） |

**注意**：iOS USB版Java插件是历史遗留功能，文档未明确说明，但实际上支持且调用方式与安卓插件基本一致。

---

## 工程结构

### EC插件项目标准目录结构

```
ios_plugin_project/
├── src/
│   ├── js/
│   │   └── main.js              # JS调用插件的测试入口
│   └── com/                     # Java源码目录
│       └── example/
│           ├── IOSPlugin.java   # 默认生成的插件入口类
│           └── utils/
│               └── PCUtils.java # PC端工具类
├── libs/
│   ├── jarlibs/                 # 三方jar包（会被合并到插件）
│   │   ├── gson-2.8.9.jar
│   │   └── okhttp-3.14.9.jar
│   └── jslibs/                  # JS类库（仅测试用，不编译到插件）
│       └── utils.js
└── project.properties           # 工程配置
```

**目录说明**：

| 目录 | 用途 | 编译结果 |
|------|------|----------|
| `src/js/main.js` | JS调用插件的测试入口 | 不编译，仅测试 |
| `src/com/` | Java源码目录 | 编译到jar |
| `libs/jarlibs/` | 三方jar包 | 合并到插件jar |
| `libs/jslibs/` | JS类库 | 不编译，仅测试调用 |

**⚠️ 与安卓版的区别**：
- iOS版可以使用**任意Java三方库**（不限于安卓版）
- 没有`solibs/`和`resources/`目录（PC端不需要）

### 插件目录位置

**放置位置**：`src/plugins/`

```
target_project/
└── src/
    └── plugins/
        └── ios-plugin.jar                     # iOS Java插件（jar格式）
```

---

## 开发流程

### 1. 创建Java插件工程

**EC插件项目标准结构**（使用IDEA）：

**工程配置要求**：
- **JDK版本**：必须使用**JDK 1.8**（与安卓版一致）
- **构建工具**：EC IDEA插件自动编译
- **输出格式**：**jar包**（不是apk/dex）
- **第三方库**：可以使用**任意Java三方库**（不限于安卓版）

**project.properties配置**：
```properties
# Java版本
java.source=1.8
java.target=1.8

# 插件包名
package=com.example.plugin

# 入口类
main.class=com.example.IOSPlugin
```

**⚠️ 与安卓版的区别**：
- iOS版可以使用**任意Java三方库**（如Apache Commons、Jackson等）
- 不限于安卓版库

### 2. 编写插件代码

**IOSPlugin.java示例**：
```java
package com.example;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;

public class IOSPlugin {
    private static final String TAG = "IOSPlugin";
    
    // 无参构造
    public IOSPlugin() {
        System.out.println("[" + TAG + "] Plugin initialized");
    }
    
    // 带参构造
    public IOSPlugin(String config) {
        System.out.println("[" + TAG + "] Plugin initialized with config: " + config);
    }
    
    // 处理PC端文件
    public String readPCFile(String filePath) {
        try {
            // 读取PC端文件（不是设备端）
            byte[] content = Files.readAllBytes(Paths.get(filePath));
            return new String(content, "UTF-8");
        } catch (Exception e) {
            return "ERROR: " + e.getMessage();
        }
    }
    
    // 复杂计算（在PC端执行，性能更好）
    public String complexCalculation(String input) {
        // 复杂算法...
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < 10000; i++) {
            result.append(input).append(i);
        }
        return result.toString();
    }
    
    // 调用第三方SDK（PC端）
    public String callThirdPartySDK(String param) {
        // 调用PC端安装的SDK
        // ...
        return "SDK result for: " + param;
    }
    
    // 静态方法
    public static int add(int a, int b) {
        return a + b;
    }
}
```

### 3. 编译插件

**使用EC IDEA插件编译**：

1. 在IDEA中右键项目 → EasyClick → 编译插件
2. 或使用快捷键（如有配置）
3. 生成的jar包位置：`build/libs/ios-plugin.jar`

**⚠️ 注意**：
- EC IDEA插件会自动处理编译和打包
- `libs/jarlibs/`中的三方jar会被自动合并

### 4. 部署插件

**部署到目标项目**：

插件编译产物（jar/apk）需要放在**目标项目**的`src/plugins/`目录下：

```
target_project/                  # 目标iOS USB版EC项目
├── src/
│   ├── js/main.js                  # 主脚本
│   └── plugins/                 # 插件目录
│       └── ios-plugin.jar       # iOS Java插件（jar格式）
└── project.json
```

**部署步骤**：
```bash
# 复制jar包到目标项目的plugins目录
copy build\ios-plugin.jar target_project\src\plugins\
```

**⚠️ 重要说明**：
- iOS Java插件（jar格式）放在目标项目的`src/plugins/`目录
- 打包IEC时会自动包含plugins目录下的所有插件
- 不是放在`ec_work_config/`目录

### 5. 脚本中调用

**调用方式（与安卓插件相同）**：
```javascript
function main() {
    // 加载插件（与安卓相同，使用loadDex）
    let result = loadDex("ios-plugin.jar");
    if (!result) {
        loge("插件加载失败");
        return;
    }
    logd("插件加载成功");
    
    // 导入Java类
    importClass(com.example.IOSPlugin);
    
    // 方式1：调用静态方法
    let sum = com.example.IOSPlugin.add(1, 2);
    logd("求和结果: " + sum);  // 输出: 3
    
    // 方式2：创建实例并调用方法
    let plugin = new com.example.IOSPlugin("config_string");
    
    // 读取PC端文件（插件运行在PC端）
    let content = plugin.readPCFile("C:/Users/test/data.txt");
    logd("文件内容: " + content);
    
    // 方式3：复杂计算
    let calcResult = plugin.complexCalculation("test");
    logd("计算结果长度: " + calcResult.length);
}

main();
```

---

## iOS插件特有规范

### PC端运行限制

**绝对禁止**：
- ❌ 禁止在插件中操作iOS设备UI（插件运行在PC端，无法直接操作设备）
- ❌ 禁止在插件中调用Android API（不是安卓环境）
- ❌ 禁止在插件主线程执行阻塞IO（会卡住IDEA插件）
- ❌ 禁止访问iOS设备文件系统（只能访问PC文件系统）

**推荐做法**：
- ✅ 插件只暴露纯逻辑接口
- ✅ 耗时操作使用多线程
- ✅ 异常处理完善，返回错误信息而不是抛出
- ✅ 使用简单数据类型（String/int/boolean等）

### 数据类型映射

| Java类型 | JavaScript类型 | 说明 |
|---------|---------------|------|
| `String` | `string` | 自动转换 |
| `int`/`Integer` | `number` | 自动转换 |
| `long`/`Long` | `number` | 自动转换 |
| `double`/`Double` | `number` | 自动转换 |
| `boolean`/`Boolean` | `boolean` | 自动转换 |
| `List` | `array` | JS数组 |
| `Map` | `object` | JSON对象 |
| `void` | `undefined` | 无返回值 |

---

## 高级用法

### 1. 使用PC端资源

```java
public class PCResourcePlugin {
    // 读取PC端配置文件
    public String loadConfig(String configName) {
        String userDir = System.getProperty("user.home");
        String configPath = userDir + "/.ec/configs/" + configName;
        try {
            return new String(Files.readAllBytes(Paths.get(configPath)));
        } catch (Exception e) {
            return "{}";
        }
    }
    
    // 访问PC端数据库
    public String queryLocalDB(String sql) {
        // 连接PC端SQLite/MySQL
        // ...
        return "query result";
    }
    
    // 调用PC端命令行
    public String executeCommand(String command) {
        try {
            Process process = Runtime.getRuntime().exec(command);
            process.waitFor();
            // 读取输出...
            return "command output";
        } catch (Exception e) {
            return "ERROR: " + e.getMessage();
        }
    }
}
```

```javascript
// JS端调用
function main() {
    loadDex("ios-plugin.jar");
    importClass(com.example.PCResourcePlugin);
    
    let plugin = new com.example.PCResourcePlugin();
    
    // 读取PC端配置
    let config = plugin.loadConfig("app.json");
    logd("配置: " + config);
    
    // 执行PC端命令
    let result = plugin.executeCommand("ipconfig");
    logd("命令输出: " + result);
}

main();
```

### 2. 异步操作

```java
public class AsyncPlugin {
    // 异步接口
    public interface Callback {
        void onComplete(String result);
    }
    
    // 异步方法
    public void asyncTask(String param, Callback callback) {
        new Thread(() -> {
            // 耗时操作
            try {
                Thread.sleep(5000);
                callback.onComplete("Async result: " + param);
            } catch (InterruptedException e) {
                callback.onComplete("ERROR: " + e.getMessage());
            }
        }).start();
    }
}
```

```javascript
// JS端异步调用
function main() {
    loadDex("ios-plugin.jar");
    importClass(com.example.AsyncPlugin);
    
    // 创建插件实例（传入回调函数名）
    let plugin = new com.example.AsyncPlugin("asyncCallback");
    
    // 设置回调
    setCallback("asyncCallback", function(result) {
        logd("异步结果: " + result);
    });
    
    // 调用异步方法
    plugin.asyncTask("test");
    
    // 等待异步完成
    sleep(6000);
}

main();
```

### 3. 与设备端交互

```javascript
function main() {
    // 1. 从设备获取数据
    let node = nodeAgent.getNodeInfo(label("设置"), 5000);
    let deviceData = node ? node.label : "";
    
    // 2. 发送到PC端Java插件处理
    loadDex("ios-plugin.jar");
    importClass(com.example.DataProcessor);
    let plugin = new com.example.DataProcessor();
    let processedData = plugin.process(deviceData);
    
    // 3. 将处理结果返回设备操作
    logd("处理结果: " + processedData);
    // ... 根据结果操作设备
}

main();
```

---

## 常见问题

### Q1: 插件放在哪里？

**A**: 放在目标项目的`src/plugins/`目录下，与安卓插件相同。

```
target_project/
└── src/
    └── plugins/
        └── ios-plugin.jar
```

### Q2: 如何调试插件？

**A**: 两种方式：
1. **IDEA调试**：在插件工程中设置Remote Debug，连接到运行中的IDEA插件进程
2. **日志输出**：使用`System.out.println()`输出到IDEA控制台

### Q3: 可以访问iOS设备文件吗？

**A**: **不可以**。Java插件运行在PC端，只能访问PC文件系统。要访问设备文件，需要使用iOS设备端的API（如`file`模块）。

### Q4: 插件更新后需要重启吗？

**A**: 需要重启IDEA或重新加载插件。iOS USB版暂不支持热更新。

### Q5: 可以使用哪些Java库？

**A**: 可以使用标准Java库和打包到jar中的第三方库：
```gradle
dependencies {
    implementation 'com.google.code.gson:gson:2.8.9'
    implementation 'org.apache.httpcomponents:httpclient:4.5.13'
    // ... 其他库
}
```

---

## 最佳实践

### 1. 插件设计原则

```java
// ✅ 好的设计：PC端专用功能
public class PCDataProcessor {
    // 大数据分析（利用PC性能）
    public String analyzeBigData(String rawData) { ... }
    
    // 访问PC端数据库
    public String queryLocalDB(String sql) { ... }
    
    // 调用PC端AI模型
    public String aiRecognition(String imagePath) { ... }
}

// ❌ 坏的设计：尝试操作设备
public class BadPlugin {
    // 错误：插件运行在PC端，无法直接点击设备
    public void clickDevice(int x, int y) { ... }
    
    // 错误：无法访问设备文件系统
    public String readDeviceFile(String path) { ... }
}
```

### 2. 错误处理

```java
public class SafePlugin {
    public String safeOperation(String input) {
        try {
            return doSomething(input);
        } catch (Exception e) {
            // 返回错误信息而不是抛出
            return "ERROR: " + e.getClass().getSimpleName() + " - " + e.getMessage();
        }
    }
}
```

```javascript
// JS端处理
loadDex("ios-plugin.jar");
importClass(com.example.SafePlugin);
let plugin = new com.example.SafePlugin();
let result = plugin.safeOperation("test");
if (result.startsWith("ERROR:")) {
    loge("操作失败: " + result);
} else {
    logd("操作成功: " + result);
}
```

### 3. 性能优化

```java
public class OptimizedPlugin {
    // 缓存实例，避免重复创建
    private static Map<String, Object> cache = new HashMap<>();
    
    public static Object getCachedInstance(String key, String className) {
        if (!cache.containsKey(key)) {
            try {
                Class<?> clazz = Class.forName(className);
                Object instance = clazz.newInstance();
                cache.put(key, instance);
            } catch (Exception e) {
                return null;
            }
        }
        return cache.get(key);
    }
}
```

---

## 参考文档

- **iOS代理API**：`iosdocs/funcs/node-agent-api.md`
- **iOS事件API**：`iosdocs/funcs/event-api.md`
- **安卓Java插件**：`easyclick-java-plugin-android.md`（本目录）
- **iOS开发指南**：`easyclick-ios.md`（本目录）

---

## 总结

**iOS USB版Java插件开发要点**：

1. **运行在PC端** - 中控通过USB与iOS设备通信，插件在PC端执行
2. **编译为jar包** - 不是apk，放在`src/plugins/`
3. **调用方式与安卓相同** - 使用`loadDex()`加载，然后`importClass()`导入调用
4. **访问PC资源** - 文件系统、数据库、命令行等都是PC端的
5. **与设备交互** - 通过iOS设备端API（如`nodeAgent`/`imageAgent`等）

**推荐开发流程**：
1. 创建EC插件项目（与安卓插件项目类似）
2. 编写PC端专用功能（复杂计算、资源访问等）
3. 编译为jar包，放入`src/plugins/`
4. 在脚本中使用`loadDex()`和`importClass()`调用Java方法
5. 结合iOS设备端API实现完整功能

**注意**：iOS USB版Java插件是历史遗留功能，文档未明确说明，但实际上支持且调用方式与安卓插件基本一致。
