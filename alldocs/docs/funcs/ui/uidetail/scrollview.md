---
title: ScrollView滚动框
description: EasyClick 自动化脚本 android免root ScrollView滚动框
keywords:
  - EasyClick 自动化脚本 android免root ScrollView滚动框
  - ui
  - ScrollView
  - zh
  - cn
  - funcs
  - native
  - view
  - md
  - layout
  - weight
  - EasyClick
  - 手机自动化
  - 自动化测试
  - 脚本开发
  - 安卓自动化
  - iOS自动化
  - 鸿蒙Next
---


## 说明
可以滚动的布局控件，子元素只能有一个
## 使用示例
```xml showLineNumbers
<ScrollView
            android:fillViewport="true"
            android:layout_width="match_parent"
            android:layout_height="match_parent">
        <LinearLayout android:layout_height="match_parent"
                      android:orientation="vertical"
                      android:layout_width="match_parent">
            <TextView android:layout_width="match_parent"
                      android:layout_height="match_parent"
                      android:tag="sctest"
                      />
        </LinearLayout>

</ScrollView>

```

## 属性说明

### 公有属性
请参考 [公有属性](/zh-cn/funcs/ui/ui-native-view.md#公有属性)

### 私有属性

| 属性名 | 说明 | 可选值 |
| :------: | :------: | :------: |
| layout_weight | 子元素权重 | 数字<br/>当父级为LinearLayout的时候，子控件可以设置权重|
| fillViewport | 填充所有视图 | true: 是 false:否 |
