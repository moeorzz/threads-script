---
title: 节点函数-手机内执行
description: EasyClick 自动化脚本 iOS免越狱 节点函数
keywords:
  - EasyClick 自动化脚本 iOS免越狱 节点函数
  - nodeAgent
  - setFetchNodeParam
  - visible
  - 'true'
  - label
  - getNodeInfo
  - getOneNodeInfo
  - parent
  - child
  - allChildren
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
- 由于IOS的限制，可能**部分机器获取节点过慢**，建议获取节点后进行锁定节点后，在进行查找
- 也可以使用设置节点获取参数的方式进行
- **不适合的页面：比如适配播放页面等**

:::tip
这个模块运算是在手机内执行的，数据也是存在手机内
:::

## nodeAgent.setFetchNodeParam 设置节点参数

* 设置获取节点的基础参数，这个参数可以有效减少获取节点的数量和消耗的时间
* 支持版本: EC iOS 中控 5.0.0+
* @param ext 是一个map，例如 ```{"visibleFilter":1}```
* visibleFilter 1 代表不管visible是true还是false都获取，2 代表只获取 visible=true的节点
* labelFilter 1 代表不管label是否有值都获取，2 代表只获取label有值的节点
* boundsFilter 1 代表不过滤 2 bounds 区域属性x,y,w,h都小于0就被过滤
* maxDepth 代表要获取节点的层级，越少速度越快，建议 1 - 500
* maxChildCount 最大获取子节点数量，0代表不限制
* excludedAttributes 代表要过滤的属性，用英文逗号分割，可以增加抓取速度，例如 visible,selected,enable
* @return `{bool}` true 成功，false 失败

```javascript showLineNumbers
function main() {
    // 脚本开头执行一次即可
    var data = nodeAgent.setFetchNodeParam({
        "labelFilter": "2",
        "maxDepth": "20",
        "visibleFilter": "2",
        "boundsFilter": "1",
        "excludedAttributes": ""
    })
    logd(data);
}

main();
```

## nodeAgent.getNodeInfo 获取节点集合

* 支持版本: EC iOS 中控 5.0.0+
* @param selectors 节点选择器
* @param timeout 超时时间，单位毫秒
* @return `{array}` 节点对象集合

```javascript showLineNumbers
function main() {
    var data = nodeAgent.getNodeInfo(label("aaa"), 1000);
    logd(JSON.stringify(data));
}

main();
```

## nodeAgent.getOneNodeInfo 获取单节点

* 支持版本: EC iOS 中控 5.0.0+
* @param selectors 节点选择器
* @param timeout 超时时间，单位毫秒
* @return `{NodeInfo}` 节点对象

```javascript showLineNumbers
function main() {
    var data = nodeAgent.getOneNodeInfo(label("aaa"), 1000);
    logd(JSON.stringify(data));
}

main();
```

## nodeAgent.parent 查询节点的父级

* 查询节点的父级
* @param nodeInfo NodeInfo 节点对象
* @return NodeInfo ```{NodeInfo 对象|null}```

```javascript showLineNumbers
function main() {
    let n = nodeAgent.getOneNodeInfo(name("Other").name("文件"), 1000)
    if (n) {
        logd(JSON.stringify(n))
        let p = nodeAgent.parent(n)
        let allc = nodeAgent.getOneChildNodeInfo(p, name("小红书"), 10000);
        logd("getOneChildNodeInfo JSON " + JSON.stringify(allc))
    }
}

main()
```

## nodeAgent.child 取得单个子节点

* 取得单个子节点
* 支持版本: EC iOS 中控 5.0.0+
* @param nodeInfo NodeInfo 节点对象
* @param index – 子节点索引
* @return `{NodeInfo}` NodeInfo 对象 或者null

```javascript showLineNumbers
function main() {
    let n = nodeAgent.getOneNodeInfo(name("Other").name("文件"), 1000)
    if (n) {
        logd(JSON.stringify(n))
        let p = nodeAgent.parent(n)
        let allc = nodeAgent.child(p, 0);
        logd("child JSON " + JSON.stringify(allc))
    }
}


main()
```

## nodeAgent.allChildren 取得所有子节点

* 取得所有子节点
* 支持版本: EC iOS 中控 5.0.0+
* @param nodeInfo NodeInfo 节点对象
* @return `{array}` NodeInfo 节点集合

```javascript showLineNumbers
function main() {
    let n = nodeAgent.getOneNodeInfo(name("Other").name("文件"), 1000)
    if (n) {
        logd(JSON.stringify(n))
        logd(n.bounds.centerX())
        logd(n.bounds.centerY())
        let parentX = nodeAgent.parent(n);
        logd("parent JSON " + JSON.stringify(parentX))
        logd(JSON.stringify(nodeAgent.allChildren(parentX)));
    }

}

main()
```

## nodeAgent.siblings 取得所有兄弟节点

* 当前节点的所有兄弟节点
* 支持版本: EC iOS 中控 5.0.0+
* @param nodeInfo NodeInfo 节点对象
* @return `{array}` NodeInfo 节点集合

```javascript showLineNumbers
function main() {
    let n = nodeAgent.getOneNodeInfo(name("Other").name("文件"), 1000)
    if (n) {
        logd(JSON.stringify(n))
        let allc = nodeAgent.siblings(n);
        logd("siblings JSON " + JSON.stringify(allc))
        if (allc) {
            for (let i = 0; i < allc.length; i++) {
                logd("siblings " + JSON.stringify(allc[i]))
            }
        }
    }
}


main()
```

## nodeAgent.previousSiblings 取得前面的兄弟节点

* 在当前节点前面的兄弟节点
* 支持版本: EC iOS 中控 5.0.0+
* @param nodeInfo NodeInfo 节点对象
* @return `{array}` NodeInfo 节点集合

```javascript showLineNumbers
function main() {
    let n = nodeAgent.getOneNodeInfo(name("Other").name("文件"), 1000)
    if (n) {
        logd(JSON.stringify(n))
        let allc = nodeAgent.previousSiblings(n);
        logd("previousSiblings JSON " + JSON.stringify(allc))
        if (allc) {
            for (let i = 0; i < allc.length; i++) {
                logd("previousSiblings " + JSON.stringify(allc[i]))
            }
        }
    }
}

main()
```

## nodeAgent.nextSiblings 取得后面的兄弟节点

* 在当前节点后面的兄弟节点
* 支持版本: EC iOS 中控 5.0.0+
* @param nodeInfo NodeInfo 节点对象
* @return `{array}` NodeInfo 节点集合

```javascript showLineNumbers
function main() {
    let n = nodeAgent.getOneNodeInfo(name("Other").name("文件"), 1000)
    if (n) {
        logd(JSON.stringify(n))
        let allc = nodeAgent.nextSiblings(n);
        logd("nextSiblings JSON " + JSON.stringify(allc))
        if (allc) {
            for (let i = 0; i < allc.length; i++) {
                logd("nextSiblings " + JSON.stringify(allc[i]))
            }
        }
    }
}

main()
```

## nodeAgent.getOneChildNodeInfo 级联筛选子节点

* 在当前节点后面的兄弟节点
* 支持版本: EC iOS 中控 5.0.0+
* @param nodeInfo NodeInfo 节点对象
* @return `{NodeInfo}` NodeInfo 节点对象

```javascript showLineNumbers
function main() {
    let n = nodeAgent.getOneNodeInfo(name("Other").name("文件"), 1000)
    if (n) {
        logd(JSON.stringify(n))
        let p = nodeAgent.parent(n)
        let allc = nodeAgent.getOneChildNodeInfo(p, name("小红书"), 10000);
        logd("getOneChildNodeInfo JSON " + JSON.stringify(allc))
    }
}

main()
```

## nodeAgent.getChildNodeInfo 级联筛选多个子节点

* 级联筛选多个子节点
* 支持版本: EC iOS 中控 5.0.0+
* @param nodeInfo NodeInfo 节点对象
* @param selectors 节点选择器
* @param timeout 超时时间，单位毫秒
* @return `{array}` NodeInfo 节点集合

```javascript showLineNumbers
function main() {
    let n = nodeAgent.getOneNodeInfo(name("Other").name("文件"), 1000)
    if (n) {
        logd(JSON.stringify(n))
        let p = nodeAgent.parent(n)
        let allc = nodeAgent.getChildNodeInfo(p, name("小红书"), 10000);
        logd("getChildNodeInfo JSON " + JSON.stringify(allc))
    }
}

main()
```

## nodeAgent.lockNode 锁定节点

* 锁定节点
* 支持版本: EC iOS 中控 5.0.0+

```javascript showLineNumbers
function main() {
    nodeAgent.lockNode()
    for (let i = 0; i < 100; i++) {
        sleep(1000)
        let n = nodeAgent.getOneNodeInfo(name("Other").name("文件"), 1000)
        if (n) {
            logd(JSON.stringify(n))
            let p = nodeAgent.parent(n)
            let allc = nodeAgent.getChildNodeInfo(p, name("小红书"), 10000);
            logd("getOneChildNodeInfo JSON " + JSON.stringify(allc))
        } else {
            logd("无节点信息")
        }
    }
    nodeAgent.releaseNode()
}

main()
```

## nodeAgent.releaseNode 释放节点

* 释放节点
* 支持版本: EC iOS 中控 5.0.0+

```javascript showLineNumbers
function main() {
    nodeAgent.lockNode()
    for (let i = 0; i < 100; i++) {
        sleep(1000)
        let n = nodeAgent.getOneNodeInfo(name("Other").name("文件"), 1000)
        if (n) {
            logd(JSON.stringify(n))
            let p = nodeAgent.parent(n)
            let allc = nodeAgent.getChildNodeInfo(p, name("小红书"), 10000);
            logd("getOneChildNodeInfo JSON " + JSON.stringify(allc))
        } else {
            logd("无节点信息")
        }
    }
    nodeAgent.releaseNode()
}

main()
```

## nodeAgent.dumpXml 导出节点

* 导出节点
* 支持版本: EC iOS 中控 5.0.0+
* @return `{string}` 节点字符串

```javascript showLineNumbers
function main() {
    logd(nodeAgent.dumpXml())
}

main()
```
