---
title: CheckBox复选框
description: EasyClick 自动化脚本 android免root CheckBox复选框
keywords:
  - EasyClick 自动化脚本 android免root CheckBox复选框
  - br
  - center
  - vertical
  - fill
  - horizontal
  - ui
  - clip
  - CheckBox
  - zh
  - cn
  - EasyClick
  - 手机自动化
  - 自动化测试
  - 脚本开发
  - 安卓自动化
  - iOS自动化
  - 鸿蒙Next
---

## 说明
复选框
## 使用示例
```xml showLineNumbers
<CheckBox android:layout_height="wrap_parent"
            android:layout_width="match_parent"
            android:tag="btn"
            android:text="按钮"
            android:textColor="#669999"
            android:textSize="14dp"
            android:gravity="center"
            android:checked="true"

    />
```

## 属性说明

### 公有属性
请参考 [公有属性](/zh-cn/funcs/ui/ui-native-view.md#公有属性)

### 私有属性

| 属性名 | 说明 | 可选值 |
| :------: | :------: | :------: |
| layout_weight | 子元素权重 | 数字<br/>当父级为LinearLayout的时候，子控件可以设置权重|
| gravity | 内部的控件对齐方式 |[用法参考](https://blog.csdn.net/gaojinshan/article/details/44917205)<br/>top<br/>bottom<br/>left<br/>right<br/>center_vertical<br/>fill_vertical<br/>center_horizontal<br/>fill_horizontal<br/>center<br/>fill<br/>clip_vertical<br/>clip_horizontal<br/> |
| checked | 是否选择 | true:选中 false:不选中 |
| text | 文字 | 字符串 |
| textColor | 文字颜色 | 16进制，例如#FFFFFF |
| textSize | 文字大小 | 具体数字+dp |

