---
title: WebView内嵌浏览器
description: EasyClick 自动化脚本 android免root WebView内嵌浏览器
keywords:
  - EasyClick 自动化脚本 android免root WebView内嵌浏览器
  - html
  - WebView
  - layout
  - ui
  - H5
  - JS
  - zh
  - cn
  - funcs
  - native
  - EasyClick
  - 手机自动化
  - 自动化测试
  - 脚本开发
  - 安卓自动化
  - iOS自动化
  - 鸿蒙Next
---

## 说明
WebView内嵌浏览器，支持H5和JS操作
## 使用示例
- 第一种 加载layout文件夹中的html
```xml showLineNumbers
<WebView android:layout_height="wrap_parent"
            android:layout_width="match_parent"
            android:url="main.html"
    />
```

- 第二种网络上的html
```xml showLineNumbers
<WebView android:layout_height="wrap_parent"
            android:layout_width="match_parent"
            android:url="http://jd.com"
    />
```


## 属性说明

### 公有属性
请参考 [公有属性](/zh-cn/funcs/ui/ui-native-view.md#公有属性)

### 私有属性

| 属性名 | 说明 | 可选值 |
| :------: | :------: | :------: |
| url | 网页地址 | 支持layout内部的html，也支持http网络上的html |

