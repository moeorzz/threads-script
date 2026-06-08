---
title: 代理事件
description: EasyClick 自动化脚本 鸿蒙Next自动化 代理事件
keywords:
  - EasyClick 自动化脚本 鸿蒙Next自动化 代理事件
  - setAgentCallParam
  - agentEvent
  - clickPoint
  - param
  - data
  - remoteCallTimeout
  - return
  - 'true'
  - 'false'
  - EasyClick
  - 手机自动化
  - 自动化测试
  - 脚本开发
  - 安卓自动化
  - iOS自动化
  - 鸿蒙Next
  - 远程投屏
---

## 说明

- 代理事件模块的对象前缀是agentEvent，例如 agentEvent.clickPoint这样调用
- 这里列出来的是代理模式特有的函数，其他调用可以直接使用全局函数

## 设置

### setAgentCallParam 代理全局通信设置超时

* 设置代理模式参数
* @param data 参数表
* 例子: ```{"remoteCallTimeout":10000}```
* remoteCallTimeout: 调用的超时时间，单位是毫秒，默认是10秒
* @return `{bool}` true 成功 false 失败

```javascript showLineNumbers
function main() {
    var result = agentEvent.setAgentCallParam({"remoteCallTimeout": 10000});
    if (result) {
        logd("是");
    } else {
        logd("否");
    }
}

main();
```

