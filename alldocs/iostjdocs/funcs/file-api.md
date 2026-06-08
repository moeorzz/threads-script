---
title: 文件函数
description: EasyClick 自动化脚本 iOS免越狱 文件函数
keywords:
  - EasyClick 自动化脚本 iOS免越狱 文件函数
  - file
  - return
  - getSandBoxFilePath
  - readFile
  - getInternalDir
  - getSandBoxDir
  - deleteLine
  - param
  - documents
  - deleteLineEx
  - EasyClick
  - 手机自动化
  - 自动化测试
  - 脚本开发
  - 安卓自动化
  - iOS自动化
  - 鸿蒙Next
---

## 说明

- 文件模块函数主要是跟文件信息相关联
- 文件模块的对象前缀是file，例如 file.readFile()这样调用
- 如果想获取设备沙盒文件夹中文件路径 请使用 file.getSandBoxFilePath这个函数

## file.getInternalDir 获取内部存储地址

* 获取内部存储地址
* @param type，documents,library,temp,libraryCaches，documents文件夹类型可以通过爱思导出
* @return 字符串

```javascript showLineNumbers
function main() {
    var data = file.getInternalDir("documents");
    logd(data);
}

main();
```

## file.getSandBoxDir 获取沙盒的文件夹路径

* 获取当前设备沙盒的文件夹路径
* @return 字符串

```javascript showLineNumbers
function main() {
    var data = file.getSandBoxDir();
    logd(data);
}

main();
```

## file.getSandBoxFilePath 获取沙盒中的文件路径

* 拼接出一个带沙盒路径的文件地址
* @return 字符串

```javascript showLineNumbers
function main() {
    var data = file.getSandBoxFilePath("a.txt");
    logd(data);
}

main();
```

## file.readFile 读取为字符串

* 将文件读取为字符串
* @param path 文件路径
* @return 字符串

```javascript showLineNumbers
function main() {
    let p = file.getSandBoxFilePath("a.txt");
    var data = file.readFile(p);
    logd(data);
}

main();
```

## file.deleteLine 删除文件某一行

* 删除文件某一行或者根据包含条件删除
* 运行环境: 无限制
* @param path 文件路径
* @param line 行数，如果是-1 代表这个条件不生效
* @param contains 包含某个字符串就删除，如果为null代表这个条件不生效
* @return `{bool}` true 成功 false 失败

```javascript showLineNumbers
function main() {
    let p = file.getSandBoxFilePath("a.txt");
    //删除包含 时间 字符串的行
    let r = file.deleteLine(p, -1, "时间");
    logd("r " + r);
    //删除第3行
    r = file.deleteLine(p, 3, null);
    logd("r " + r);
}

main();
```

## file.deleteLineEx 删除文件某一行

* 删除文件某一行或者根据包含条件删除
* 适合大文件
* 适配 EC 4.7.3+
* @param path 文件路径
* @param line 行数，如果是-1 代表这个条件不生效
* @param contains 包含某个字符串就删除，如果为null代表这个条件不生效
* @return `{bool}` true 成功 false 失败

```javascript showLineNumbers
function main() {
    let p = file.getSandBoxFilePath("a.txt");
    //删除包含 时间 字符串的行
    let r = file.deleteLineEx(p, -1, "时间");
    logd("r " + r);
    //删除第3行
    r = file.deleteLineEx(p, 3, null);
    logd("r " + r);
}

main();
```

## file.listDir 列出所有文件

* 列出文件下的所有文件，会递归
* @param path 路径
* @return 路径字符串数组

```javascript showLineNumbers
function main() {
    let p = file.getSandBoxDir();
    var data = file.listDir(p);
    for (var i = 0; i < data.length; i++) {
        logd("path " + data[i]);
    }
}

main();
```

## file.listDir2 列出文件(递归配置)

* 列出文件下文件和文件夹
* 适配EC 脱机 4.1.0+
* @param path 路径
* @param recursion true代表递归子文件夹，false代表不递归
* @return 路径字符串数组

```javascript showLineNumbers
function main() {
    let p = file.getSandBoxDir();
    var data = file.listDir2(p, false);
    for (var i = 0; i < data.length; i++) {
        logd("path " + data[i]);
    }
}

main();
```

## file.writeFile 写入文件

* 将字符串存储到文件中
* @param data 字符串 数据
* @param path 文件路径

```javascript showLineNumbers
function main() {
    var data = "Test";
    let p = file.getSandBoxFilePath("a.txt");
    file.writeFile(data, p);
}

main();
```

## file.create 创建

* 创建一个文件
* @param path 文件路径
* @return 布尔型 true 代表创建成功

```javascript showLineNumbers
function main() {
    let p = file.getSandBoxFilePath("a.txt");
    var create = file.create(p);
    logd(create);
}

main();
```

## file.mkdirs 创建文件夹

* 创建文件夹
* @param path 路径
* @return 布尔型 true 代表成功，false代表失败

```javascript showLineNumbers
function main() {
    let p = file.getSandBoxDir();
    p = p + "/ad"
    var t = file.mkdirs(p);
    logd(t);
}

main();
```

## file.deleteAllFile 删除

* 删除所有文件或者文件夹
* @param path 文件或者文件路径

```javascript showLineNumbers
function main() {
    // 删除文件
    let filePath = file.getSandBoxFilePath("a.txt");
    file.deleteAllFile(filePath);
    // 删除文件夹
    let dirPath = file.getSandBoxFilePath("a/");
    file.deleteAllFile(dirPath);
}

main();
```

## file.appendLine 追加字符串

* 写入一行到文件中,追加模式
* @param data 行数据
* @param path 文件或者文件路径
* @return 布尔型 true代表成功 false代表失败

```javascript showLineNumbers
function main() {
    var data = "sss";
    let p = file.getSandBoxFilePath("a.txt");
    var t = file.appendLine(data, p);
    logd(t);
}

main();
```

## file.appendLineEx 追加字符串

* 写入一行到文件中,追加模式
* 适合大文件
* 适配 EC 4.7.3+
* @param data 行数据
* @param path 文件或者文件路径
* @return 布尔型 true代表成功 false代表失败

```javascript showLineNumbers
function main() {
    var data = "sss";
    let p = file.getSandBoxFilePath("a.txt");
    var t = file.appendLineEx(data, p);
    logd(t);
}

main();
```

## file.readLine 读取一行

* 读取一行数据，如果行号不对，返回的是空
* @param path 路径
* @param lineNo 行号
* @return 字符串 返回一行字符串

```javascript showLineNumbers
function main() {
    let p = file.getSandBoxFilePath("a.txt");
    var t = file.readLine(p, 1);
    logd(t);
}

main();
```

## file.readLineEx 读取一行

* 读取一行数据，如果行号不对，返回的是空
* 适合大文件
* 适配 EC 4.7.3+
* @param path 路径
* @param lineNo 行号
* @return 字符串 返回一行字符串

```javascript showLineNumbers
function main() {
    let p = file.getSandBoxFilePath("a.txt");
    var t = file.readLineEx(p, 1);
    logd(t);
}

main();
```

## file.readAllLines 读取所有行

* 读取所有数据
* @param path 路径
* @return 字符串数组|null

```javascript showLineNumbers
function main() {
    let p = file.getSandBoxFilePath("a.txt");
    var t = file.readAllLines(p);
    logd(t);
}

main();
```

## file.exists 是否存在

* 文件或者文件夹是否存在
* @param path 路径
* @return 布尔型 true 代表成功，false代表失败

```javascript showLineNumbers
function main() {
    let p = file.getSandBoxFilePath("a.txt");
    var t = file.exists(p);
    logd(t);
}

main();
```

## file.copy 文件复制

* 复制文件
*
* @param src 源文件路径
* @param dest 目标文件路径
* @return 布尔型 true 代表成功

```javascript showLineNumbers
function main() {
    let p1 = file.getSandBoxFilePath("a1.txt");
    let p2 = file.getSandBoxFilePath("a2.txt");
    var t = file.copy(p1, p2);
    logd(t);
}

main();
```
