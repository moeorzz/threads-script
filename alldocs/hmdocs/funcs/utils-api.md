---
title: 工具函数
description: EasyClick 自动化脚本 鸿蒙Next自动化 工具函数
keywords:
  - EasyClick 自动化脚本 鸿蒙Next自动化 工具函数
  - utils
  - param
  - zip
  - MD5
  - zipFile
  - unzipWithEncode
  - unzip
  - passwd
  - ip
  - return
  - EasyClick
  - 手机自动化
  - 自动化测试
  - 脚本开发
  - 安卓自动化
  - iOS自动化
  - 鸿蒙Next
---

## 说明

## 解压缩

### utils.zip 压缩

* 将多个文件压缩成一个zip文件
* @param zipFile 目标zip文件的路径
* @param passwd 目标ip文件密码，空代表无密码
* @param files 要压缩的文件或者文件夹，文件数组例如: ["c:/a.txt","c:/bb/"]
* @return `{bool}` true 代表成功 false代表失败

```javascript showLineNumbers
function main() {
    let zipFile = "c:/a.zip"
    //压缩文件
    let passwd = "123";
    let files = ["D:/test.json", "D:/gifshow"]
    let re = utils.zip(zipFile, passwd, files);
    logd("压缩结果: " + re);

    let ure = utils.unzip(zipFile, passwd, "D:/test111/");
    logd("解压结果: " + ure);


    let data = utils.readFileInZip("D:/a.zip", passwd, "test.json")
    logd("读取数据结果: " + data);
}

main()
```

### utils.unzipWithEncode 解压带编码

* 解压文件
* 将zip文件解压到一个文件夹中
* @param zipFile 目标zip文件的路径
* @param passwd 目标ip文件密码
* @param destDir 要解压到的目标文件夹
* @param fileNameEncode 文件名的编码，Windows压缩的写GBK，其他平台都是UTF-8
* @return `{bool}` true 代表成功 false代表失败

```javascript showLineNumbers
function main() {
    let zipFile = "C:/a.zip"
    let ure = utils.unzipWithEncode(zipFile, "", "c:/test111/", "GBK");
    logd("解压结果: " + ure);
}

main()
```

### utils.unzip 解压

* 将zip文件解压到一个文件夹中
* @param zipFile 目标zip文件的路径
* @param passwd 目标ip文件密码
* @param destDir 要解压到的目标文件夹
* @return `{bool}` true 代表成功 false代表失败

```javascript showLineNumbers
function main() {
    zipFile = "C:/a.zip"
    //压缩文件
    let passwd = "123";
    let files = ["D:/test.json", "D:/gifshow"]
    let re = utils.zip(zipFile, passwd, files);
    logd("压缩结果: " + re);

    let ure = utils.unzip(zipFile, passwd, "D:/test111/");
    logd("解压结果: " + ure);


    let data = utils.readFileInZip("D:/a.zip", passwd, "test.json")
    logd("读取数据结果: " + data);
}

main()
```

### utils.readFileInZip ZIP中读取

* 从zip文件中读取数据
* @param zipFile zip文件的路径
* @param passwd zip文件密码
* @param filePathInZip 文件在zip中的路径，例如 a/b.txt
* @return `{string}` 解析后的字符串

```javascript showLineNumbers
function main() {

    zipFile = "c:/a.zip"
    //压缩文件
    let passwd = "123";
    let files = ["D:/test.json", "D:/gifshow"]
    let re = utils.zip(zipFile, passwd, files);
    logd("压缩结果: " + re);

    let ure = utils.unzip(zipFile, passwd, "D:/test111/");
    logd("解压结果: " + ure);


    let data = utils.readFileInZip("D:/a.zip", passwd, "test.json")
    logd("读取数据结果: " + data);
}

main()
```

### utils.getRatio 取得比例

* 取得比例，例如10参数，就是返回10%的比例，如果是true，说明随机比例正确，否则不正确
* @param ratio 浮点型 1-100
* @return true或者false

```javascript showLineNumbers
function main() {
    var ratio = utils.getRatio(20);
    logd(ratio);
}

main();
```

### utils.getRangeInt 取得某个范围的随机值

* 取得某个范围的随机值
* @param min 最小值
* @param max 最大值
* @return 在min和max中间的值,包含最大和最小值

```javascript showLineNumbers
function main() {
    var value = utils.getRangeInt(1, 100);
    logd(value);
}

main();
```

## MD5

### utils.fileMd5 文件的MD5

* 文件的MD5
* @param file 文件路径
* @return 文件MD5字符串或者null

```javascript showLineNumbers
function main() {
    var md5 = utils.fileMd5("D:/a.txt");
}

main();
```

### utils.dataMd5 数据计算出来的MD5

* 数据计算出来的MD5
* @param data 数据
* @return 数据MD5字符串或者null

```javascript showLineNumbers
function main() {
    var md5 = utils.dataMd5("data");
}

main();
```

## 随机

### utils.randomInt 随机整型数据

* 随机整型数据
* @param length 位数，要随机产生多少位的整型数据
* @return 整型

```javascript showLineNumbers
function main() {
    var r = utils.randomInt(2);
}

main();
```

### utils.randomCharNumber 取得随机的数字和字母

* 取得随机的数字和字母
* @param length 长度
* @return 字符串数字混合

```javascript showLineNumbers
function main() {
    var r = utils.randomCharNumber(2);
}

main();
```

## 音乐

### utils.playMp3 播放mp3

* 播放mp3
* @param path 文件路径 电脑上的mp3文件
* @param volume 音量大小 0 - 100
* @param queue 是否是队列模式播放，选择否，代表立刻播放
* @param stopWhenScriptEnd 脚本结束后 就不播放
* @return boolean true代表播放成功 false代表失败

```javascript showLineNumbers
function main() {
    //如果想把MP3内置到脚本中,将MP3文件放到res目录下
    saveResToFile("a.mp3", "d:/a.mp3")
    let r = utils.playMp3("d:/a.mp3", 100, false, false);
    sleep(10000)
    utils.stopMp3();
}

main();
```

### utils.stopMp3 停止播放mp3

* 停止播放mp3
* @return boolean true代表成功 false代表失败

```javascript showLineNumbers
function main() {
    //如果想把MP3内置到脚本中,将MP3文件放到res目录下
    saveResToFile("a.mp3", "d:/a.mp3")
    let r = utils.playMp3("d:/a.mp3", 100, false, false);
    sleep(10000)
    utils.stopMp3();
}

main();
```



