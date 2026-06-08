---
title: 文件函数
description: EasyClick 自动化脚本 iOS免越狱 文件函数
keywords:
  - EasyClick 自动化脚本 iOS免越狱 文件函数
  - file
  - getSandBoxDir
  - getSandBoxFilePath
  - readFile
  - return
  - param
  - deleteLine
  - path
  - listDir
  - writeFile
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
- 注意: 中控是运行在电脑上的，所以file操作的是电脑上的路径，每个设备都有自己的沙盒文件夹，使用file.getSandBoxDir()获取
- 如果想获取设备沙盒文件夹中文件路径 请使用 file.getSandBoxFilePath这个函数

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
    var data = file.readFile("D:/test.txt");
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
    //删除包含 时间 字符串的行
    let r = file.deleteLine("D:/a.txt", -1, "时间");
    logd("r " + r);
    //删除第3行
    r = file.deleteLine("D:/a.txt", 3, null);
    logd("r " + r);
}

main();
```

## file.listDir 列出所有文件

* 列出文件下的所有文件
* @param path 路径
* @return 路径字符串数组

```javascript showLineNumbers
function main() {
    var data = file.listDir("D:/");
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
    file.writeFile(data, "D:/test.txt");
}

main();
```

## file.create 创建

* 创建一个文件
* @param path 文件路径
* @return 布尔型 true 代表创建成功

```javascript showLineNumbers
function main() {
    var create = file.create("D:/test.txt");
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
    var t = file.mkdirs("D:/testdir/");
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
    file.deleteAllFile("D:/test.txt");
    // 删除文件夹
    file.deleteAllFile("D:/testdir/");
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
    var t = file.appendLine(data, "D:/test.txt");
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
    var t = file.readLine("D:/test.txt", 1);
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
    var t = file.readAllLines("D:/test.txt");
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
    var t = file.exists("D:/testdir/");
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
    var t = file.copy("D:/a.png", "D:/b.png");
    logd(t);
}

main();
```

## file.readExcelRow 读取Excel的一行数据

* 读取Excel的一行数据
* 适合版本 EC iOS 4.0.0+
* @param path Excel文件的路径
* @param sheetIndex 表格索引，从0开始
* @param row 行号 从0开始
* @return JSON JSON 对象

```javascript showLineNumbers

function testexcel() {
    logd(file.getSandBoxDir())

    let data = file.readExcelAllRow("工作簿1.xlsx", 0)
    logd(JSON.stringify(data))
    let data2 = file.readExcelRow("工作簿1.xlsx", 0, 1)
    logd(JSON.stringify(data2))

}

testexcel();
```

## file.readExcelAllRow 读取Excel的所有数据

* 读取Excel的所有数据
* 这个读出来第一行是表头，剩下的都是数据，返回的值是 类似```[{"名称":2,"性别":222}]```这样的数据，组装好的map格式
* 适合版本 EC iOS 4.0.0+
* @param path Excel文件的路径
* @param sheetIndex 表格索引，从0开始
* @return JSON JSON 对象

```javascript showLineNumbers

function testexcel() {
    logd(file.getSandBoxDir())

    let data = file.readExcelAllRow("工作簿1.xlsx", 0)
    logd(JSON.stringify(data))
    let data2 = file.readExcelRow("工作簿1.xlsx", 0, 1)
    logd(JSON.stringify(data2))

}

testexcel();
```
