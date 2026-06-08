---
title: 节点函数
description: EasyClick 自动化脚本 鸿蒙Next自动化 节点函数
keywords:
  - EasyClick 自动化脚本 鸿蒙Next自动化 节点函数
  - xpath
  - id
  - key
  - type
  - getNodeInfo
  - getOneNodeInfo
  - idMatch
  - hint
  - timeout
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

- 节点模块函数主要是跟节点操作相关联
- 该模块没有模块前缀，可以直接调用函数
- 建议获取节点后进行锁定节点后，在进行查找,防止部分使用parent或者child函数问题

## getNodeInfo 获取节点集合

* timeout 超时时间，单位毫秒
* @return `{array}` 节点对象集合**

```javascript showLineNumbers
function main() {
    let nodes = text("aaa").getNodeInfo(0)
    if (nodes){
        logd(JSON.stringify(nodes))
        for (let i = 0; i < nodes.length; i++) {
            logd(JSON.stringify(nodes[i]))
            logd(nodes[i].text)
            logd(nodes[i].bounds.top)
            logd(nodes[i].bounds.centerX())
        }
    }
}

main();
```

## getOneNodeInfo 获取单节点

* timeout 超时时间，单位毫秒
* @return `{NodeInfo}` 节点对象

```javascript showLineNumbers
function main() {
    let node = text("aaa").getOneNodeInfo(0);
    if (node){
        logd(JSON.stringify(node));
        logd(node.text)
        logd(node.bounds.top)
        logd(node.bounds.centerX())
    }
}

main();
```


## 以下是选择器函数

### xpath 选择

* xpath选择器，xpath技术请看 : https://www.jianshu.com/p/c205334122b3 和 https://www.runoob.com/xpath/xpath-syntax.html
* xpath使用请到idea的节点面板查看xpath属性以及测试xpath功能
* @param value 例如 //node[@value='易点云测'] 代表选取文本等于易点云测的节点

```javascript showLineNumbers
function main() {
    //获取选择器对象
    var selector = xpath("//node[@value='易点云测']");
    let n = selector.getNodeInfo(1000);
    logd(JSON.stringify(n))
}

main();
```

### id id 属性全匹配

* id 属性全匹配

```javascript showLineNumbers
function main() {
    //开始再这里编写代码了！！
    logd("检查自动化环境...")
    //如果自动化服务正常
    if (!autoServiceStart(3)) {
        logd("自动化服务启动失败，无法执行脚本")
        exit();
        return;
    }
    logd("开始执行脚本...")
    // 先释放老的数据
    releaseNode();
    // 锁定新的节点数据
    lockNode();
    // 进入查找状态
    // 按照 id 查找
    let nd = id("设置").getOneNodeInfo(1000)
    if (nd) {
        console.log("id 查找  节点信息 {}  ", JSON.stringify(nd))
        // 如果找到了 就点击
        let c = clickPoint(nd.bounds.centerX(), nd.bounds.centerY());
        logd("点他: {}", c)
    } else {
        console.log("id 未查找  节点信息  ")
    }
    // 按照 正则表达式匹配
    nd = idMatch(".*置.*").getNodeInfo(1000)
    if (nd) {
        console.log("idMatch 查找  节点信息 {}  ", JSON.stringify(nd))
    } else {
        console.log("idMatch 未查找  节点信息  ")
    }
    // 先释放老的数据
    releaseNode();
}

function autoServiceStart(time) {
    for (let i = 0; i < time; i++) {
        if (isServiceOk()) {
            return true;
        }
        let started = startEnv();
        logd("第" + (i + 1) + "次启动服务结果: " + started);
        if (isServiceOk()) {
            return true;
        }
    }
    return isServiceOk();
}

main()
```


### idMatch id 属性正则匹配

* id 属性正则匹配

```javascript showLineNumbers
function main() {
    //开始再这里编写代码了！！
    logd("检查自动化环境...")
    //如果自动化服务正常
    if (!autoServiceStart(3)) {
        logd("自动化服务启动失败，无法执行脚本")
        exit();
        return;
    }
    logd("开始执行脚本...")
    // 先释放老的数据
    releaseNode();
    // 锁定新的节点数据
    lockNode();
    // 进入查找状态
    // 按照 id 查找
    let nd = id("设置").getOneNodeInfo(1000)
    if (nd) {
        console.log("id 查找  节点信息 {}  ", JSON.stringify(nd))
        // 如果找到了 就点击
        let c = clickPoint(nd.bounds.centerX(), nd.bounds.centerY());
        logd("点他: {}", c)
    } else {
        console.log("id 未查找  节点信息  ")
    }
    // 按照 正则表达式匹配
    nd = idMatch(".*置.*").getNodeInfo(1000)
    if (nd) {
        console.log("idMatch 查找  节点信息 {}  ", JSON.stringify(nd))
    } else {
        console.log("idMatch 未查找  节点信息  ")
    }
    // 先释放老的数据
    releaseNode();
}

function autoServiceStart(time) {
    for (let i = 0; i < time; i++) {
        if (isServiceOk()) {
            return true;
        }
        let started = startEnv();
        logd("第" + (i + 1) + "次启动服务结果: " + started);
        if (isServiceOk()) {
            return true;
        }
    }
    return isServiceOk();
}

main()
```

### key key属性全匹配
* key 属性全匹配
```javascript showLineNumbers
function main() {
    //开始再这里编写代码了！！
    logd("检查自动化环境...")
    //如果自动化服务正常
    if (!autoServiceStart(3)) {
        logd("自动化服务启动失败，无法执行脚本")
        exit();
        return;
    }
    logd("开始执行脚本...")
    // 先释放老的数据
    releaseNode();
    // 锁定新的节点数据
    lockNode();
    // 进入查找状态
    // key
    let nd = key("设置").getOneNodeInfo(1000)
    if (nd) {
        console.log("key 查找  节点信息 {}  ", JSON.stringify(nd))
        // 如果找到了 就点击
        let c = clickPoint(nd.bounds.centerX(), nd.bounds.centerY());
        logd("点他: {}", c)
    } else {
        console.log("key 未查找  节点信息  ")
    }
    // 按照 正则表达式匹配
    nd = keyMatch(".*置.*").getNodeInfo(1000)
    if (nd) {
        console.log("keyMatch 查找  节点信息 {}  ", JSON.stringify(nd))
    } else {
        console.log("keyMatch 未查找  节点信息  ")
    }
    // 先释放老的数据
    releaseNode();
}

function autoServiceStart(time) {
    for (let i = 0; i < time; i++) {
        if (isServiceOk()) {
            return true;
        }
        let started = startEnv();
        logd("第" + (i + 1) + "次启动服务结果: " + started);
        if (isServiceOk()) {
            return true;
        }
    }
    return isServiceOk();
}

main()
```

### keyMatch key

* key 属性正则匹配

```javascript showLineNumbers
function main() {
    //开始再这里编写代码了！！
    logd("检查自动化环境...")
    //如果自动化服务正常
    if (!autoServiceStart(3)) {
        logd("自动化服务启动失败，无法执行脚本")
        exit();
        return;
    }
    logd("开始执行脚本...")
    // 先释放老的数据
    releaseNode();
    // 锁定新的节点数据
    lockNode();
    // 进入查找状态
    let nd = keyMatch("设置").getOneNodeInfo(1000)
    if (nd) {
        console.log("key 查找  节点信息 {}  ", JSON.stringify(nd))
        // 如果找到了 就点击
        let c = clickPoint(nd.bounds.centerX(), nd.bounds.centerY());
        logd("点他: {}", c)
    } else {
        console.log("keyMatch 未查找  节点信息  ")
    }
    // 按照 正则表达式匹配
    nd = keyMatch(".*置.*").getNodeInfo(1000)
    if (nd) {
        console.log("keyMatch 查找  节点信息 {}  ", JSON.stringify(nd))
    } else {
        console.log("keyMatch 未查找  节点信息  ")
    }
    // 先释放老的数据
    releaseNode();
}

function autoServiceStart(time) {
    for (let i = 0; i < time; i++) {
        if (isServiceOk()) {
            return true;
        }
        let started = startEnv();
        logd("第" + (i + 1) + "次启动服务结果: " + started);
        if (isServiceOk()) {
            return true;
        }
    }
    return isServiceOk();
}

main()
```


### type type属性全匹配

* type 属性全匹配

```javascript showLineNumbers
function main() {
    //开始再这里编写代码了！！
    logd("检查自动化环境...")
    //如果自动化服务正常
    if (!autoServiceStart(3)) {
        logd("自动化服务启动失败，无法执行脚本")
        exit();
        return;
    }
    logd("开始执行脚本...")
    // 先释放老的数据
    releaseNode();
    // 锁定新的节点数据
    lockNode();
    // 进入查找状态
    // 按照 type 查找
    let nd = type("Item").getOneNodeInfo(1000)
    if (nd) {
        console.log("type 查找  节点信息 {}  ", JSON.stringify(nd))
        // 如果找到了 就点击
        let c = clickPoint(nd.bounds.centerX(), nd.bounds.centerY());
        logd("点他: {}", c)
    } else {
        console.log("label 未查找  节点信息  ")
    }
    // 按照 type 正则表达式匹配
    nd = typeMatch(".*Item.*").getNodeInfo(1000)
    if (nd) {
        console.log("typeMatch 查找  节点信息 {}  ", JSON.stringify(nd))
    } else {
        console.log("typeMatch 未查找  节点信息  ")
    }
    // 先释放老的数据
    releaseNode();
}

function autoServiceStart(time) {
    for (let i = 0; i < time; i++) {
        if (isServiceOk()) {
            return true;
        }
        let started = startEnv();
        logd("第" + (i + 1) + "次启动服务结果: " + started);
        if (isServiceOk()) {
            return true;
        }
    }
    return isServiceOk();
}

main()
```

### typeMatch type属性正则匹配

* type 属性正则匹配

```javascript showLineNumbers
function main() {
    //开始再这里编写代码了！！
    logd("检查自动化环境...")
    //如果自动化服务正常
    if (!autoServiceStart(3)) {
        logd("自动化服务启动失败，无法执行脚本")
        exit();
        return;
    }
    logd("开始执行脚本...")
    // 先释放老的数据
    releaseNode();
    // 锁定新的节点数据
    lockNode();
    // 进入查找状态
    // 按照 type 查找
    let nd = type("Item").getOneNodeInfo(1000)
    if (nd) {
        console.log("type 查找  节点信息 {}  ", JSON.stringify(nd))
        // 如果找到了 就点击
        let c = clickPoint(nd.bounds.centerX(), nd.bounds.centerY());
        logd("点他: {}", c)
    } else {
        console.log("label 未查找  节点信息  ")
    }
    // 按照 type 正则表达式匹配
    nd = typeMatch(".*Item.*").getNodeInfo(1000)
    if (nd) {
        console.log("typeMatch 查找  节点信息 {}  ", JSON.stringify(nd))
    } else {
        console.log("ltypeMatch 未查找  节点信息  ")
    }
    // 先释放老的数据
    releaseNode();
}

function autoServiceStart(time) {
    for (let i = 0; i < time; i++) {
        if (isServiceOk()) {
            return true;
        }
        let started = startEnv();
        logd("第" + (i + 1) + "次启动服务结果: " + started);
        if (isServiceOk()) {
            return true;
        }
    }
    return isServiceOk();
}

main()
```

### hint hint 属性全匹配
* hint 属性全匹配
```javascript showLineNumbers
function main() {
    //开始再这里编写代码了！！
    logd("检查自动化环境...")
    //如果自动化服务正常
    if (!autoServiceStart(3)) {
        logd("自动化服务启动失败，无法执行脚本")
        exit();
        return;
    }
    logd("开始执行脚本...")
    // 先释放老的数据
    releaseNode();
    // 锁定新的节点数据
    lockNode();
    // 进入查找状态
    let nd = hint("123").getOneNodeInfo(1000)
    if (nd) {
        console.log("value 查找  节点信息 {}  ", JSON.stringify(nd))
        // 如果找到了 就点击
        let c = clickPoint(nd.bounds.centerX(), nd.bounds.centerY());
        logd("点他: {}", c)
    } else {
        console.log("value 未查找  节点信息  ")
    }
    nd = textMatch(".*123.*").getNodeInfo(1000)
    if (nd) {
        console.log("textMatch 查找  节点信息 {}  ", JSON.stringify(nd))
    } else {
        console.log("textMatch 未查找  节点信息  ")
    }
    // 先释放老的数据
    releaseNode();
}

function autoServiceStart(time) {
    for (let i = 0; i < time; i++) {
        if (isServiceOk()) {
            return true;
        }
        let started = startEnv();
        logd("第" + (i + 1) + "次启动服务结果: " + started);
        if (isServiceOk()) {
            return true;
        }
    }
    return isServiceOk();
}

main()
```

### hintMatch hint 属性正则匹配
* hint 属性正则匹配
```javascript showLineNumbers
function main() {
    //开始再这里编写代码了！！
    logd("检查自动化环境...")
    //如果自动化服务正常
    if (!autoServiceStart(3)) {
        logd("自动化服务启动失败，无法执行脚本")
        exit();
        return;
    }
    logd("开始执行脚本...")
    // 先释放老的数据
    releaseNode();
    // 锁定新的节点数据
    lockNode();
    // 进入查找状态
    let nd = hintMatch("123").getOneNodeInfo(1000)
    if (nd) {
        console.log(" 查找  节点信息 {}  ", JSON.stringify(nd))
        // 如果找到了 就点击
        let c = clickPoint(nd.bounds.centerX(), nd.bounds.centerY());
        logd("点他: {}", c)
    } else {
        console.log(" 未查找  节点信息  ")
    }
    nd = textMatch(".*123.*").getNodeInfo(1000)
    if (nd) {
        console.log("textMatch 查找  节点信息 {}  ", JSON.stringify(nd))
    } else {
        console.log("textMatch 未查找  节点信息  ")
    }
    // 先释放老的数据
    releaseNode();
}
function autoServiceStart(time) {
    for (let i = 0; i < time; i++) {
        if (isServiceOk()) {
            return true;
        }
        let started = startEnv();
        logd("第" + (i + 1) + "次启动服务结果: " + started);
        if (isServiceOk()) {
            return true;
        }
    }
    return isServiceOk();
}

main()
```


### text text 属性全匹配
* text 属性全匹配
```javascript showLineNumbers
function main() {
    //开始再这里编写代码了！！
    logd("检查自动化环境...")
    //如果自动化服务正常
    if (!autoServiceStart(3)) {
        logd("自动化服务启动失败，无法执行脚本")
        exit();
        return;
    }
    logd("开始执行脚本...")
    // 先释放老的数据
    releaseNode();
    // 锁定新的节点数据
    lockNode();
    // 进入查找状态
    let nd = text("123").getOneNodeInfo(1000)
    if (nd) {
        console.log("value 查找  节点信息 {}  ", JSON.stringify(nd))
        // 如果找到了 就点击
        let c = clickPoint(nd.bounds.centerX(), nd.bounds.centerY());
        logd("点他: {}", c)
    } else {
        console.log("value 未查找  节点信息  ")
    }
    nd = textMatch(".*123.*").getNodeInfo(1000)
    if (nd) {
        console.log("textMatch 查找  节点信息 {}  ", JSON.stringify(nd))
    } else {
        console.log("textMatch 未查找  节点信息  ")
    }
    // 先释放老的数据
    releaseNode();
}

function autoServiceStart(time) {
    for (let i = 0; i < time; i++) {
        if (isServiceOk()) {
            return true;
        }
        let started = startEnv();
        logd("第" + (i + 1) + "次启动服务结果: " + started);
        if (isServiceOk()) {
            return true;
        }
    }
    return isServiceOk();
}

main()
```

### textMatch text 属性正则匹配
* text 属性正则匹配
```javascript showLineNumbers
function main() {
    //开始再这里编写代码了！！
    logd("检查自动化环境...")
    //如果自动化服务正常
    if (!autoServiceStart(3)) {
        logd("自动化服务启动失败，无法执行脚本")
        exit();
        return;
    }
    logd("开始执行脚本...")
    // 先释放老的数据
    releaseNode();
    // 锁定新的节点数据
    lockNode();
    // 进入查找状态
    let nd = text("123").getOneNodeInfo(1000)
    if (nd) {
        console.log(" 查找  节点信息 {}  ", JSON.stringify(nd))
        // 如果找到了 就点击
        let c = clickPoint(nd.bounds.centerX(), nd.bounds.centerY());
        logd("点他: {}", c)
    } else {
        console.log(" 未查找  节点信息  ")
    }
    nd = textMatch(".*123.*").getNodeInfo(1000)
    if (nd) {
        console.log("textMatch 查找  节点信息 {}  ", JSON.stringify(nd))
    } else {
        console.log("textMatch 未查找  节点信息  ")
    }
    // 先释放老的数据
    releaseNode();
}
function autoServiceStart(time) {
    for (let i = 0; i < time; i++) {
        if (isServiceOk()) {
            return true;
        }
        let started = startEnv();
        logd("第" + (i + 1) + "次启动服务结果: " + started);
        if (isServiceOk()) {
            return true;
        }
    }
    return isServiceOk();
}

main()
```



### hostWindowId hostWindowId 属性全匹配
* hostWindowId 属性全匹配
```javascript showLineNumbers
function main() {
    //开始再这里编写代码了！！
    logd("检查自动化环境...")
    //如果自动化服务正常
    if (!autoServiceStart(3)) {
        logd("自动化服务启动失败，无法执行脚本")
        exit();
        return;
    }
    logd("开始执行脚本...")
    // 先释放老的数据
    releaseNode();
    // 锁定新的节点数据
    lockNode();
    // 进入查找状态
    let nd = hostWindowId("123").getOneNodeInfo(1000)
    if (nd) {
        console.log("value 查找  节点信息 {}  ", JSON.stringify(nd))
        // 如果找到了 就点击
        let c = clickPoint(nd.bounds.centerX(), nd.bounds.centerY());
        logd("点他: {}", c)
    } else {
        console.log("value 未查找  节点信息  ")
    }
    nd = hostWindowIdMatch(".*123.*").getNodeInfo(1000)
    if (nd) {
        console.log("hostWindowIdMatch 查找  节点信息 {}  ", JSON.stringify(nd))
    } else {
        console.log("hostWindowIdMatch 未查找  节点信息  ")
    }
    // 先释放老的数据
    releaseNode();
}

function autoServiceStart(time) {
    for (let i = 0; i < time; i++) {
        if (isServiceOk()) {
            return true;
        }
        let started = startEnv();
        logd("第" + (i + 1) + "次启动服务结果: " + started);
        if (isServiceOk()) {
            return true;
        }
    }
    return isServiceOk();
}

main()
```

### hostWindowIdMatch hostWindowId
* hostWindowId 属性正则匹配
```javascript showLineNumbers
function main() {
    //开始再这里编写代码了！！
    logd("检查自动化环境...")
    //如果自动化服务正常
    if (!autoServiceStart(3)) {
        logd("自动化服务启动失败，无法执行脚本")
        exit();
        return;
    }
    logd("开始执行脚本...")
    // 先释放老的数据
    releaseNode();
    // 锁定新的节点数据
    lockNode();
    // 进入查找状态
    let nd = hostWindowId("123").getOneNodeInfo(1000)
    if (nd) {
        console.log(" 查找  节点信息 {}  ", JSON.stringify(nd))
        // 如果找到了 就点击
        let c = clickPoint(nd.bounds.centerX(), nd.bounds.centerY());
        logd("点他: {}", c)
    } else {
        console.log(" 未查找  节点信息  ")
    }
    nd = hostWindowIdMatch(".*123.*").getNodeInfo(1000)
    if (nd) {
        console.log("textMatch 查找  节点信息 {}  ", JSON.stringify(nd))
    } else {
        console.log("textMatch 未查找  节点信息  ")
    }
    // 先释放老的数据
    releaseNode();
}
function autoServiceStart(time) {
    for (let i = 0; i < time; i++) {
        if (isServiceOk()) {
            return true;
        }
        let started = startEnv();
        logd("第" + (i + 1) + "次启动服务结果: " + started);
        if (isServiceOk()) {
            return true;
        }
    }
    return isServiceOk();
}

main()
```




### description description 属性全匹配
* description 属性全匹配
```javascript showLineNumbers
function main() {
    //开始再这里编写代码了！！
    logd("检查自动化环境...")
    //如果自动化服务正常
    if (!autoServiceStart(3)) {
        logd("自动化服务启动失败，无法执行脚本")
        exit();
        return;
    }
    logd("开始执行脚本...")
    // 先释放老的数据
    releaseNode();
    // 锁定新的节点数据
    lockNode();
    // 进入查找状态
    let nd = description("123").getOneNodeInfo(1000)
    if (nd) {
        console.log("value 查找  节点信息 {}  ", JSON.stringify(nd))
        // 如果找到了 就点击
        let c = clickPoint(nd.bounds.centerX(), nd.bounds.centerY());
        logd("点他: {}", c)
    } else {
        console.log("value 未查找  节点信息  ")
    }
    // 先释放老的数据
    releaseNode();
}

function autoServiceStart(time) {
    for (let i = 0; i < time; i++) {
        if (isServiceOk()) {
            return true;
        }
        let started = startEnv();
        logd("第" + (i + 1) + "次启动服务结果: " + started);
        if (isServiceOk()) {
            return true;
        }
    }
    return isServiceOk();
}

main()
```

### descriptionMatch description
* description 属性正则匹配
```javascript showLineNumbers
function main() {
    //开始再这里编写代码了！！
    logd("检查自动化环境...")
    //如果自动化服务正常
    if (!autoServiceStart(3)) {
        logd("自动化服务启动失败，无法执行脚本")
        exit();
        return;
    }
    logd("开始执行脚本...")
    // 先释放老的数据
    releaseNode();
    // 锁定新的节点数据
    lockNode();
    // 进入查找状态
    let nd = description("123").getOneNodeInfo(1000)
    if (nd) {
        console.log(" 查找  节点信息 {}  ", JSON.stringify(nd))
        // 如果找到了 就点击
        let c = clickPoint(nd.bounds.centerX(), nd.bounds.centerY());
        logd("点他: {}", c)
    } else {
        console.log(" 未查找  节点信息  ")
    }
    nd = descriptionMatch(".*123.*").getNodeInfo(1000)
    if (nd) {
        console.log("descriptionMatch 查找  节点信息 {}  ", JSON.stringify(nd))
    } else {
        console.log("descriptionMatch 未查找  节点信息  ")
    }
    // 先释放老的数据
    releaseNode();
}
function autoServiceStart(time) {
    for (let i = 0; i < time; i++) {
        if (isServiceOk()) {
            return true;
        }
        let started = startEnv();
        logd("第" + (i + 1) + "次启动服务结果: " + started);
        if (isServiceOk()) {
            return true;
        }
    }
    return isServiceOk();
}

main()
```





### bundleName bundleName 属性全匹配
* bundleName 属性全匹配
```javascript showLineNumbers
function main() {
    //开始再这里编写代码了！！
    logd("检查自动化环境...")
    //如果自动化服务正常
    if (!autoServiceStart(3)) {
        logd("自动化服务启动失败，无法执行脚本")
        exit();
        return;
    }
    logd("开始执行脚本...")
    // 先释放老的数据
    releaseNode();
    // 锁定新的节点数据
    lockNode();
    // 进入查找状态
    let nd = bundleName("123").getOneNodeInfo(1000)
    if (nd) {
        console.log("value 查找  节点信息 {}  ", JSON.stringify(nd))
        // 如果找到了 就点击
        let c = clickPoint(nd.bounds.centerX(), nd.bounds.centerY());
        logd("点他: {}", c)
    } else {
        console.log("value 未查找  节点信息  ")
    }
    // 先释放老的数据
    releaseNode();
}

function autoServiceStart(time) {
    for (let i = 0; i < time; i++) {
        if (isServiceOk()) {
            return true;
        }
        let started = startEnv();
        logd("第" + (i + 1) + "次启动服务结果: " + started);
        if (isServiceOk()) {
            return true;
        }
    }
    return isServiceOk();
}

main()
```

### bundleNameMatch bundleName
* bundleName 属性正则匹配
```javascript showLineNumbers
function main() {
    //开始再这里编写代码了！！
    logd("检查自动化环境...")
    //如果自动化服务正常
    if (!autoServiceStart(3)) {
        logd("自动化服务启动失败，无法执行脚本")
        exit();
        return;
    }
    logd("开始执行脚本...")
    // 先释放老的数据
    releaseNode();
    // 锁定新的节点数据
    lockNode();
    // 进入查找状态
    let nd = bundleName("123").getOneNodeInfo(1000)
    if (nd) {
        console.log(" 查找  节点信息 {}  ", JSON.stringify(nd))
        // 如果找到了 就点击
        let c = clickPoint(nd.bounds.centerX(), nd.bounds.centerY());
        logd("点他: {}", c)
    } else {
        console.log(" 未查找  节点信息  ")
    }
    nd = bundleNameMatch(".*123.*").getNodeInfo(1000)
    if (nd) {
        console.log("bundleNameMatch 查找  节点信息 {}  ", JSON.stringify(nd))
    } else {
        console.log("bundleNameMatch 未查找  节点信息  ")
    }
    // 先释放老的数据
    releaseNode();
}
function autoServiceStart(time) {
    for (let i = 0; i < time; i++) {
        if (isServiceOk()) {
            return true;
        }
        let started = startEnv();
        logd("第" + (i + 1) + "次启动服务结果: " + started);
        if (isServiceOk()) {
            return true;
        }
    }
    return isServiceOk();
}

main()
```



### pagePath pagePath 属性全匹配
* pagePath 属性全匹配
```javascript showLineNumbers
function main() {
    //开始再这里编写代码了！！
    logd("检查自动化环境...")
    //如果自动化服务正常
    if (!autoServiceStart(3)) {
        logd("自动化服务启动失败，无法执行脚本")
        exit();
        return;
    }
    logd("开始执行脚本...")
    // 先释放老的数据
    releaseNode();
    // 锁定新的节点数据
    lockNode();
    // 进入查找状态
    let nd = pagePath("123").getOneNodeInfo(1000)
    if (nd) {
        console.log("value 查找  节点信息 {}  ", JSON.stringify(nd))
        // 如果找到了 就点击
        let c = clickPoint(nd.bounds.centerX(), nd.bounds.centerY());
        logd("点他: {}", c)
    } else {
        console.log("value 未查找  节点信息  ")
    }
    // 先释放老的数据
    releaseNode();
}

function autoServiceStart(time) {
    for (let i = 0; i < time; i++) {
        if (isServiceOk()) {
            return true;
        }
        let started = startEnv();
        logd("第" + (i + 1) + "次启动服务结果: " + started);
        if (isServiceOk()) {
            return true;
        }
    }
    return isServiceOk();
}

main()
```

### pagePathMatch pagePath
* pagePath 属性正则匹配
```javascript showLineNumbers
function main() {
    //开始再这里编写代码了！！
    logd("检查自动化环境...")
    //如果自动化服务正常
    if (!autoServiceStart(3)) {
        logd("自动化服务启动失败，无法执行脚本")
        exit();
        return;
    }
    logd("开始执行脚本...")
    // 先释放老的数据
    releaseNode();
    // 锁定新的节点数据
    lockNode();
    // 进入查找状态
    let nd = pagePath("123").getOneNodeInfo(1000)
    if (nd) {
        console.log(" 查找  节点信息 {}  ", JSON.stringify(nd))
        // 如果找到了 就点击
        let c = clickPoint(nd.bounds.centerX(), nd.bounds.centerY());
        logd("点他: {}", c)
    } else {
        console.log(" 未查找  节点信息  ")
    }
    nd = pagePathMatch(".*123.*").getNodeInfo(1000)
    if (nd) {
        console.log("pagePathMatch 查找  节点信息 {}  ", JSON.stringify(nd))
    } else {
        console.log("pagePathMatch 未查找  节点信息  ")
    }
    // 先释放老的数据
    releaseNode();
}
function autoServiceStart(time) {
    for (let i = 0; i < time; i++) {
        if (isServiceOk()) {
            return true;
        }
        let started = startEnv();
        logd("第" + (i + 1) + "次启动服务结果: " + started);
        if (isServiceOk()) {
            return true;
        }
    }
    return isServiceOk();
}

main()
```




### longClickable longClickable 属性全匹配
* longClickable 属性全匹配
```javascript showLineNumbers
function main() {
    //开始再这里编写代码了！！
    logd("检查自动化环境...")
    //如果自动化服务正常
    if (!autoServiceStart(3)) {
        logd("自动化服务启动失败，无法执行脚本")
        exit();
        return;
    }
    logd("开始执行脚本...")
    // 先释放老的数据
    releaseNode();
    // 锁定新的节点数据
    lockNode();
    // 进入查找状态
    // 按照 longClickable  查找
    let nd = longClickable(true).getOneNodeInfo(1000)
    if (nd) {
        console.log(" 查找  节点信息 {}  ", JSON.stringify(nd))
        // 如果找到了 就点击
        let c = clickPoint(nd.bounds.centerX(), nd.bounds.centerY());
        logd("点他: {}", c)
    } else {
        console.log(" 未查找  节点信息  ")
    }
    // 先释放老的数据
    releaseNode();
}

function autoServiceStart(time) {
    for (let i = 0; i < time; i++) {
        if (isServiceOk()) {
            return true;
        }
        let started = startEnv();
        logd("第" + (i + 1) + "次启动服务结果: " + started);
        if (isServiceOk()) {
            return true;
        }
    }
    return isServiceOk();
}

main()
```


### enable enable属性全匹配
* enable 属性全匹配
```javascript showLineNumbers
function main() {
    //开始再这里编写代码了！！
    logd("检查自动化环境...")
    //如果自动化服务正常
    if (!autoServiceStart(3)) {
        logd("自动化服务启动失败，无法执行脚本")
        exit();
        return;
    }
    logd("开始执行脚本...")
    // 先释放老的数据
    releaseNode();
    // 锁定新的节点数据
    lockNode();
    // 进入查找状态
    // 按照 enable  查找
    let nd = enable(true).getOneNodeInfo(1000)
    if (nd) {
        console.log(" 查找  节点信息 {}  ", JSON.stringify(nd))
        // 如果找到了 就点击
        let c = clickPoint(nd.bounds.centerX(), nd.bounds.centerY());
        logd("点他: {}", c)
    } else {
        console.log(" 未查找  节点信息  ")
    }
    // 先释放老的数据
    releaseNode();
}

function autoServiceStart(time) {
    for (let i = 0; i < time; i++) {
        if (isServiceOk()) {
            return true;
        }
        let started = startEnv();
        logd("第" + (i + 1) + "次启动服务结果: " + started);
        if (isServiceOk()) {
            return true;
        }
    }
    return isServiceOk();
}

main()
```


### visible visible属性全匹配

* visible 属性全匹配

```javascript showLineNumbers
function main() {
    //开始再这里编写代码了！！
    logd("检查自动化环境...")
    //如果自动化服务正常
    if (!autoServiceStart(3)) {
        logd("自动化服务启动失败，无法执行脚本")
        exit();
        return;
    }
    logd("开始执行脚本...")
    // 先释放老的数据
    releaseNode();
    // 锁定新的节点数据
    lockNode();
    // 进入查找状态
    // 按照 visible  查找
    let nd = visible(true).getOneNodeInfo(1000)
    if (nd) {
        console.log(" 查找  节点信息 {}  ", JSON.stringify(nd))
        // 如果找到了 就点击
        let c = clickPoint(nd.bounds.centerX(), nd.bounds.centerY());
        logd("点他: {}", c)
    } else {
        console.log(" 未查找  节点信息  ")
    }
    // 先释放老的数据
    releaseNode();
}

function autoServiceStart(time) {
    for (let i = 0; i < time; i++) {
        if (isServiceOk()) {
            return true;
        }
        let started = startEnv();
        logd("第" + (i + 1) + "次启动服务结果: " + started);
        if (isServiceOk()) {
            return true;
        }
    }
    return isServiceOk();
}

main()
```


### zIndex zIndex 属性全匹配

* zIndex 属性全匹配

```javascript showLineNumbers
function main() {
    //开始再这里编写代码了！！
    logd("检查自动化环境...")
    //如果自动化服务正常
    if (!autoServiceStart(3)) {
        logd("自动化服务启动失败，无法执行脚本")
        exit();
        return;
    }
    logd("开始执行脚本...")
    // 先释放老的数据
    releaseNode();
    // 锁定新的节点数据
    lockNode();
    // 进入查找状态
    // 按照 zIndex  查找
    let nd = zIndex(1).getOneNodeInfo(1000)
    if (nd) {
        console.log(" 查找 节点信息 {}  ", JSON.stringify(nd))
        // 如果找到了 就点击
        let c = clickPoint(nd.bounds.centerX(), nd.bounds.centerY());
        logd("点他: {}", c)
    } else {
        console.log(" 未查找  节点信息  ")
    }
    // 先释放老的数据
    releaseNode();
}

function autoServiceStart(time) {
    for (let i = 0; i < time; i++) {
        if (isServiceOk()) {
            return true;
        }
        let started = startEnv();
        logd("第" + (i + 1) + "次启动服务结果: " + started);
        if (isServiceOk()) {
            return true;
        }
    }
    return isServiceOk();
}

main()
```

### index index属性全匹配

* index 属性全匹配

```javascript showLineNumbers
function main() {
    //开始再这里编写代码了！！
    logd("检查自动化环境...")
    //如果自动化服务正常
    if (!autoServiceStart(3)) {
        logd("自动化服务启动失败，无法执行脚本")
        exit();
        return;
    }
    logd("开始执行脚本...")
    // 先释放老的数据
    releaseNode();
    // 锁定新的节点数据
    lockNode();
    // 进入查找状态
    // 按照 index  查找
    let nd = index(1).getOneNodeInfo(1000)
    if (nd) {
        console.log(" 查找 节点信息 {}  ", JSON.stringify(nd))
        // 如果找到了 就点击
        let c = clickPoint(nd.bounds.centerX(), nd.bounds.centerY());
        logd("点他: {}", c)
    } else {
        console.log(" 未查找  节点信息  ")
    }
    // 先释放老的数据
    releaseNode();
}

function autoServiceStart(time) {
    for (let i = 0; i < time; i++) {
        if (isServiceOk()) {
            return true;
        }
        let started = startEnv();
        logd("第" + (i + 1) + "次启动服务结果: " + started);
        if (isServiceOk()) {
            return true;
        }
    }
    return isServiceOk();
}

main()
```

### depth depth 属性全匹配

* depth 属性全匹配

```javascript showLineNumbers
function main() {
    //开始再这里编写代码了！！
    logd("检查自动化环境...")
    //如果自动化服务正常
    if (!autoServiceStart(3)) {
        logd("自动化服务启动失败，无法执行脚本")
        exit();
        return;
    }
    logd("开始执行脚本...")
    // 先释放老的数据
    releaseNode();
    // 锁定新的节点数据
    lockNode();
    // 进入查找状态
    // 按照 depth  查找
    let nd = depth(1).getOneNodeInfo(1000)
    if (nd) {
        console.log(" 查找 节点信息 {}  ", JSON.stringify(nd))
        // 如果找到了 就点击
        let c = clickPoint(nd.bounds.centerX(), nd.bounds.centerY());
        logd("点他: {}", c)
    } else {
        console.log(" 未查找  节点信息  ")
    }
    // 先释放老的数据
    releaseNode();
}

function autoServiceStart(time) {
    for (let i = 0; i < time; i++) {
        if (isServiceOk()) {
            return true;
        }
        let started = startEnv();
        logd("第" + (i + 1) + "次启动服务结果: " + started);
        if (isServiceOk()) {
            return true;
        }
    }
    return isServiceOk();
}

main()
```



### focused focused 属性全匹配
* focused 属性全匹配
```javascript showLineNumbers
function main() {
    //开始再这里编写代码了！！
    logd("检查自动化环境...")
    //如果自动化服务正常
    if (!autoServiceStart(3)) {
        logd("自动化服务启动失败，无法执行脚本")
        exit();
        return;
    }
    logd("开始执行脚本...")
    // 先释放老的数据
    releaseNode();
    // 锁定新的节点数据
    lockNode();
    // 进入查找状态
    let nd = focused(true).getOneNodeInfo(1000)
    if (nd) {
        console.log(" 查找 节点信息 {}  ", JSON.stringify(nd))
        // 如果找到了 就点击
        let c = clickPoint(nd.bounds.centerX(), nd.bounds.centerY());
        logd("点他: {}", c)
    } else {
        console.log(" 未查找  节点信息  ")
    }
    // 先释放老的数据
    releaseNode();
}

function autoServiceStart(time) {
    for (let i = 0; i < time; i++) {
        if (isServiceOk()) {
            return true;
        }
        let started = startEnv();
        logd("第" + (i + 1) + "次启动服务结果: " + started);
        if (isServiceOk()) {
            return true;
        }
    }
    return isServiceOk();
}

main()
```


### enabled enabled 属性全匹配
* enabled 属性全匹配
```javascript showLineNumbers
function main() {
    //开始再这里编写代码了！！
    logd("检查自动化环境...")
    //如果自动化服务正常
    if (!autoServiceStart(3)) {
        logd("自动化服务启动失败，无法执行脚本")
        exit();
        return;
    }
    logd("开始执行脚本...")
    // 先释放老的数据
    releaseNode();
    // 锁定新的节点数据
    lockNode();
    // 进入查找状态
    let nd = enabled(true).getOneNodeInfo(1000)
    if (nd) {
        console.log(" 查找 节点信息 {}  ", JSON.stringify(nd))
        // 如果找到了 就点击
        let c = clickPoint(nd.bounds.centerX(), nd.bounds.centerY());
        logd("点他: {}", c)
    } else {
        console.log(" 未查找  节点信息  ")
    }
    // 先释放老的数据
    releaseNode();
}

function autoServiceStart(time) {
    for (let i = 0; i < time; i++) {
        if (isServiceOk()) {
            return true;
        }
        let started = startEnv();
        logd("第" + (i + 1) + "次启动服务结果: " + started);
        if (isServiceOk()) {
            return true;
        }
    }
    return isServiceOk();
}

main()
```

### selected selected 属性全匹配
* selected 属性全匹配
```javascript showLineNumbers
function main() {
    //开始再这里编写代码了！！
    logd("检查自动化环境...")
    //如果自动化服务正常
    if (!autoServiceStart(3)) {
        logd("自动化服务启动失败，无法执行脚本")
        exit();
        return;
    }
    logd("开始执行脚本...")
    // 先释放老的数据
    releaseNode();
    // 锁定新的节点数据
    lockNode();
    // 进入查找状态
    // 按照 selected  查找
    let nd = selected(true).getOneNodeInfo(1000)
    if (nd) {
        console.log(" 查找 节点信息 {}  ", JSON.stringify(nd))
        // 如果找到了 就点击
        let c = clickPoint(nd.bounds.centerX(), nd.bounds.centerY());
        logd("点他: {}", c)
    } else {
        console.log(" 未查找  节点信息  ")
    }
    // 先释放老的数据
    releaseNode();
}
function autoServiceStart(time) {
    for (let i = 0; i < time; i++) {
        if (isServiceOk()) {
            return true;
        }
        let started = startEnv();
        logd("第" + (i + 1) + "次启动服务结果: " + started);
        if (isServiceOk()) {
            return true;
        }
    }
    return isServiceOk();
}
main()
```


### checkable checkable 属性全匹配
* checkable 属性全匹配
```javascript showLineNumbers
function main() {
    //开始再这里编写代码了！！
    logd("检查自动化环境...")
    //如果自动化服务正常
    if (!autoServiceStart(3)) {
        logd("自动化服务启动失败，无法执行脚本")
        exit();
        return;
    }
    logd("开始执行脚本...")
    // 先释放老的数据
    releaseNode();
    // 锁定新的节点数据
    lockNode();
    // 进入查找状态
    // 按照 checkable  查找
    let nd = checkable(true).getOneNodeInfo(1000)
    if (nd) {
        console.log(" 查找 节点信息 {}  ", JSON.stringify(nd))
        // 如果找到了 就点击
        let c = clickPoint(nd.bounds.centerX(), nd.bounds.centerY());
        logd("点他: {}", c)
    } else {
        console.log(" 未查找  节点信息  ")
    }
    // 先释放老的数据
    releaseNode();
}
function autoServiceStart(time) {
    for (let i = 0; i < time; i++) {
        if (isServiceOk()) {
            return true;
        }
        let started = startEnv();
        logd("第" + (i + 1) + "次启动服务结果: " + started);
        if (isServiceOk()) {
            return true;
        }
    }
    return isServiceOk();
}
main()
```


### checked checked 属性全匹配
* checked 属性全匹配
```javascript showLineNumbers
function main() {
    //开始再这里编写代码了！！
    logd("检查自动化环境...")
    //如果自动化服务正常
    if (!autoServiceStart(3)) {
        logd("自动化服务启动失败，无法执行脚本")
        exit();
        return;
    }
    logd("开始执行脚本...")
    // 先释放老的数据
    releaseNode();
    // 锁定新的节点数据
    lockNode();
    // 进入查找状态
    // 按照 checked  查找
    let nd = checked(true).getOneNodeInfo(1000)
    if (nd) {
        console.log(" 查找 节点信息 {}  ", JSON.stringify(nd))
        // 如果找到了 就点击
        let c = clickPoint(nd.bounds.centerX(), nd.bounds.centerY());
        logd("点他: {}", c)
    } else {
        console.log(" 未查找  节点信息  ")
    }
    // 先释放老的数据
    releaseNode();
}
function autoServiceStart(time) {
    for (let i = 0; i < time; i++) {
        if (isServiceOk()) {
            return true;
        }
        let started = startEnv();
        logd("第" + (i + 1) + "次启动服务结果: " + started);
        if (isServiceOk()) {
            return true;
        }
    }
    return isServiceOk();
}
main()
```

### childcount childcount属性全匹配

* childcount 属性全匹配

```javascript showLineNumbers
function main() {
    //开始再这里编写代码了！！
    logd("检查自动化环境...")
    //如果自动化服务正常
    if (!autoServiceStart(3)) {
        logd("自动化服务启动失败，无法执行脚本")
        exit();
        return;
    }
    logd("开始执行脚本...")
    // 先释放老的数据
    releaseNode();
    // 锁定新的节点数据
    lockNode();
    // 进入查找状态
    // 按照 childCount  查找
    let nd = childCount(2).getOneNodeInfo(1000)
    if (nd) {
        console.log(" 查找  节点信息 {}  ", JSON.stringify(nd))
        // 如果找到了 就点击
        let c = clickPoint(nd.bounds.centerX(), nd.bounds.centerY());
        logd("点他: {}", c)
    } else {
        console.log(" 未查找  节点信息  ")
    }
    // 先释放老的数据
    releaseNode();
}

function autoServiceStart(time) {
    for (let i = 0; i < time; i++) {
        if (isServiceOk()) {
            return true;
        }
        let started = startEnv();
        logd("第" + (i + 1) + "次启动服务结果: " + started);
        if (isServiceOk()) {
            return true;
        }
    }
    return isServiceOk();
}

main()
```

### bounds bounds属性范围匹配

* bounds 属性范围匹配

```javascript showLineNumbers
function main() {
    //开始再这里编写代码了！！
    logd("检查自动化环境...")
    //如果自动化服务正常
    if (!autoServiceStart(3)) {
        logd("自动化服务启动失败，无法执行脚本")
        exit();
        return;
    }
    logd("开始执行脚本...")
    // 先释放老的数据
    releaseNode();
    // 锁定新的节点数据
    lockNode();
    // 进入查找状态
    // 按照 bounds  查找
    let nd = bounds(100, 100, 300, 300).getOneNodeInfo(1000)
    if (nd) {
        console.log(" 查找  节点信息 {}  ", JSON.stringify(nd))
        // 如果找到了 就点击
        let c = clickPoint(nd.bounds.centerX(), nd.bounds.centerY());
        logd("点他: {}", c)
    } else {
        console.log(" 未查找  节点信息  ")
    }
    // 先释放老的数据
    releaseNode();
}

function autoServiceStart(time) {
    for (let i = 0; i < time; i++) {
        if (isServiceOk()) {
            return true;
        }
        let started = startEnv();
        logd("第" + (i + 1) + "次启动服务结果: " + started);
        if (isServiceOk()) {
            return true;
        }
    }
    return isServiceOk();
}

main()
```

## 点击节点

### clickCenter 点击节点中心点

* 点击节点中心点
* @return `{bool}` true 成功，false 失败

```javascript showLineNumbers
function main() {
    let node = text("地图").getOneNodeInfo(10000)
    logd(JSON.stringify(node))
    if (node) {
        logd(node.clickCenter())
    }

}

main()
```

### clickRandom 随机点击节点

* 随机点击节点的坐标
* @return `{bool}` true 成功，false 失败

```javascript showLineNumbers
function main() {
    let node = text("地图").getOneNodeInfo(10000)
    logd(JSON.stringify(node))
    if (node) {
        logd(node.clickRandom())
    }

}

main()
```

## 多属性级联查询


```javascript showLineNumbers
function main() {
    //开始再这里编写代码了！！
    logd("检查自动化环境...")
    //如果自动化服务正常
    if (!autoServiceStart(3)) {
        logd("自动化服务启动失败，无法执行脚本")
        exit();
        return;
    }
    logd("开始执行脚本...")
    // 先释放老的数据
    releaseNode();
    // 锁定新的节点数据
    lockNode();
    // 进入查找状态
    // 按照 级联模式  查找
    let nd = textMatch(".*1.*").enabled(true).bounds(100, 100, 300, 300).getOneNodeInfo(1000)
    if (nd) {
        console.log(" 查找  节点信息 {}  ", JSON.stringify(nd))
        // 如果找到了 就点击
        let c = clickPoint(nd.bounds.centerX(), nd.bounds.centerY());
        logd("点他: {}", c)
    } else {
        console.log(" 未查找  节点信息  ")
    }
    // 先释放老的数据
    releaseNode();
}

function autoServiceStart(time) {
    for (let i = 0; i < time; i++) {
        if (isServiceOk()) {
            return true;
        }
        let started = startEnv();
        logd("第" + (i + 1) + "次启动服务结果: " + started);
        if (isServiceOk()) {
            return true;
        }
    }
    return isServiceOk();
}

main()
```

## 以下是节点的级联操作


### 级联获取一个子节点操作 getOneNodeInfo

* 通过选择器 获取第一个节点信息
* @param timeout 等待时间，单位是毫秒, 如果是0，代表不等待
* @return NodeInfo 对象 或者null

```javascript showLineNumbers
function main() {
    //获取选择器对象
    var node =type("Text").getOneNodeInfo(10000);
    if (node) {
        //获取其中一个子节点
        node = node.getOneNodeInfo(text("广告"), 10000);
        if (!node) {
            toast("无子节点");
            return;
        }
        var x = node.click();
        logd(x);
    } else {
        toast("无节点");
    }
}

main(); 
```

### 级联获取多个子节点操作 getNodeInfo

* 获取节点信息
* @param timeout 等待时间，单位是毫秒, 如果是0，代表不等待
* @return NodeInfo 节点信息集合

```javascript showLineNumbers
function main() {
    //获取选择器对象
    //选择 节点 type=Text 的节点，
    var node = type("Text").getOneNodeInfo(10000);
    if (node) {
        //获取所有子节点
        node = node.getNodeInfo(text("广告").type("Text"), 10000);
        if (!node) {
            toast("无子节点");
            return;
        }
        var x = node[0].click();
        logd(x);
    } else {
        toast("无节点");
    }
}

main(); 
```

### parent 查询节点的父级

* 查询节点的父级
* @return `{NodeInfo}` 节点对象

```javascript showLineNumbers
function main() {
    // 进入查找状态
    let nd = textMatch(".*1.*").getOneNodeInfo(1000)
    if (nd) {
        console.log(" 查找  节点信息 {}  ", JSON.stringify(nd))
        let parent = nd.parent()
        console.log(" 查找 parent {}  ", JSON.stringify(parent))
    } else {
        console.log(" 未查找  节点信息  ")
    }
// 先释放老的数据
    releaseNode();
}


main()
```

### child 取得单个子节点

* 取得单个子节点
* @param index – 子节点索引
* @return `{NodeInfo}` NodeInfo 对象 或者null

```javascript showLineNumbers
function main() {
    // 进入查找状态
    let nd = textMatch(".*1.*").getOneNodeInfo(1000)
    if (nd) {
        console.log(" 查找  节点信息 {}  ", JSON.stringify(nd))
        let child1 = nd.child(0)
        console.log(" 查找 child {}  ", JSON.stringify(child1))
    } else {
        console.log(" 未查找  节点信息  ")
    }
// 先释放老的数据
    releaseNode();
}


main()
```

### allChildren 取得所有子节点

* 取得所有子节点
* @return `{array}` NodeInfo 节点集合

```javascript showLineNumbers
function main() {
    // 进入查找状态
    let nd = textMatch(".*1.*").getOneNodeInfo(1000)
    if (nd) {
        console.log(" 查找  节点信息 {}  ", JSON.stringify(nd))
        let allChildren = nd.allChildren()
        console.log(" 查找 allChildren {}  ", JSON.stringify(allChildren))
    } else {
        console.log(" 未查找  节点信息  ")
    }
// 先释放老的数据
    releaseNode();
}


main()
```

### siblings 取得所有兄弟节点

* 当前节点的所有兄弟节点
* @return `{array}` NodeInfo 节点集合

```javascript showLineNumbers
function main() {
    // 进入查找状态
    let nd = labelMatch(".*1.*").getOneNodeInfo(1000)
    if (nd) {
        console.log(" 查找  节点信息 {}  ", JSON.stringify(nd))
        let siblings = nd.siblings()
        console.log(" 查找 siblings {}  ", JSON.stringify(siblings))
    } else {
        console.log(" 未查找  节点信息  ")
    }
// 先释放老的数据
    releaseNode();
}

main()
```

### previousSiblings 取得前面的兄弟节点

* 在当前节点前面的兄弟节点
* 支持版本: EC 鸿蒙Next 1.0.0+
* @return `{array}` NodeInfo 节点集合

```javascript showLineNumbers
function main() {
    // 进入查找状态
    let nd = textMatch(".*1.*").getOneNodeInfo(1000)
    if (nd) {
        console.log(" 查找  节点信息 {}  ", JSON.stringify(nd))
        let previousSiblings = nd.previousSiblings()
        console.log(" 查找 previousSiblings {}  ", JSON.stringify(previousSiblings))
    } else {
        console.log(" 未查找  节点信息  ")
    }
// 先释放老的数据
    releaseNode();
}

main()
```

### nextSiblings 取得后面的兄弟节点

* 在当前节点后面的兄弟节点
* @return `{array}` NodeInfo 节点集合

```javascript showLineNumbers
function main() {
    // 进入查找状态
    let nd = textMatch(".*1.*").getOneNodeInfo(1000)
    if (nd) {
        console.log(" 查找  节点信息 {}  ", JSON.stringify(nd))
        let nextSiblings = nd.nextSiblings()
        console.log(" 查找 nextSiblings {}  ", JSON.stringify(nextSiblings))
    } else {
        console.log(" 未查找  节点信息  ")
    }
// 先释放老的数据
    releaseNode();
}

main()
```

