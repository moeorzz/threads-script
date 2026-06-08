---
title: UI与脚本互通交互
description: EasyClick 自动化脚本 iOS免越狱 iOS免硬件 iOS脚本 安装开发插件 资源下载
keywords:
  - EasyClick 自动化脚本 iOS免越狱 iOS免硬件 iOS脚本 安装开发插件 资源下载
  - js
  - ui
  - H5
  - main
  - tip
  - UI
  - JS
  - iOS
  - 5.10.0
  - idea
  - EasyClick
  - 手机自动化
  - 自动化测试
  - 脚本开发
  - 安卓自动化
  - iOS自动化
  - 鸿蒙Next
---

## 说明
:::tip
- 本章节主要讲述H5 UI.JS 以及 脚本，三者互通交互
- 该功能从iOS 脱机版本 5.10.0+才能使用
:::
## 如何使用
- 在idea工程中新建脱机的项目，自带的就有交互的实例


## H5->ui.js->脚本调用的流程
:::tip
- 脚本注册一个函数给ui.js，函数是 registeScriptFunctionToUI
- ui.js注册一个H5函数给H5页面，函数是 ui.registeH5Function
- H5 发起调用到ui.js中，ui.js再次调用脚本注册的函数
:::
### H5 文件内容
```html

<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link href="htmljs/bootstrap.min.css" rel="stylesheet">
    <script src="htmljs/bootstrap.min.js"></script>
    <script src="htmljs/jquery.min.js"></script>
</head>

<body>
<div class="alert alert-info" role="alert">
    开始脚本配置
</div>
<div style="margin: 10px">
    <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" id="autoService" disabled>
        <label class="form-check-label" for="autoService">自动化服务</label>
        <span class="badge text-bg-info bg-primary" onclick="refreshIsServiceOk()">刷新</span>
        <p>请点击代理程序图标<br/>或者使用激活器激活自动化<br/>
            手机上出现了Automation Running字样即可
        </p>
    </div>
    <br/>
    <div class="input-group mb-3">
        <span class="input-group-text" id="username1">姓名: </span>
        <input type="text" class="form-control" placeholder="" id="username" aria-label="username"
               aria-describedby="basic-addon1">
    </div>
    <div class="form-group">
        <label>爱好: </label>
        <label class="checkbox-inline">
            <input type="checkbox" name="aihao1" id="aihao1" value="1"> 游戏
        </label>
        <label class="checkbox-inline">
            <input type="checkbox" name="aihao2" id="aihao2" value="2"> 摄影
        </label>
        <label class="checkbox-inline">
            <input type="checkbox" name="aihao3" id="aihao3" value="3"> 旅游
        </label>
    </div>
    <br/>
    <div class="form-group">
        <label>性别: </label>
        <label class="radio-inline">
            <input type="radio" value="1" name="sex"> 男性
        </label>
        <label class="radio-inline">
            <input type="radio" value="2" name="sex"> 女性
        </label>
        <label class="radio-inline">
            <input type="radio" value="3" name="sex"> 中性
        </label>
    </div>
    <br/>
    <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">功能 </span>
        <select class="form-select" aria-label="" id="func">
            <option value="1">功能1</option>
            <option value="2">功能2</option>
            <option value="3">功能3</option>
        </select>
    </div>
    <div>
        <button type="button" class="btn btn-primary" onclick="saveParam()">保存参数</button>
        <button type="button" class="btn btn-success" onclick="start()">执行脚本</button>
        <button type="button" class="btn btn-primary" onclick="pause()">暂停</button>
        <button type="button" class="btn btn-success" onclick="continueRun()">继续</button>

    </div>
    <div>
        <button type="button" class="btn btn-success" onclick="h5calltest()">脚本注入函数测试</button>
    </div>
</div>
<script>
    function updateUserName(data) {
        $("#username").val(data)
    }
    // 用户点击这个函数 会调用到 ui.js的h5calltest注入函数
    function h5calltest() {
        window.ec.call("h5calltest", "我是H5传递的数据")
    }

    function pause() {
        window.ec.setScriptPause({"pause": true, "timeout": 3330}, function (resp) {
            checkPause()
        });
    }

    function checkPause() {
        window.ec.isScriptPause(function (resp) {
            alert("isScriptPause " + resp)
        });
    }
    function continueRun() {
        window.ec.setScriptPause({"pause":false,"timeout":0},function (resp) {

        });
    }
    function refreshIsServiceOk() {
        window.ec.isServiceOk(function (resp) {
            if (resp) {
                $("#autoService").attr("checked", true)
            } else {
                $("#autoService").attr("checked", false)
            }
        })
    }

    function resetParam() {
        window.ec.isServiceOk(function (resp) {
            if (resp) {
                $("#autoService").attr("checked", true)
            } else {
                $("#autoService").attr("checked", false)
            }
        })
        // 读取username
        window.ec.getConfig("uiconfig", function (resp) {
            if (resp == null || resp == undefined) {
                return
            }
            console.log("resp " + resp)
            let p = JSON.parse(resp)
            $("#username").val(p["username"])
            $("#func").val(p["func"])
            if (p["aihao1"]) {
                $("#aihao1").prop("checked", true)
            }
            if (p["aihao2"]) {
                $("#aihao2").prop("checked", true)
            }
            if (p["aihao3"]) {
                $("#aihao3").prop("checked", true)
            }
            $("input[type=radio][name='sex'][value='" + p["sex"] + "']").attr("checked", 'checked')
        })
    }

    function saveParam() {
        let username = $("#username").val()
        var aihao1 = $("#aihao1").prop("checked");
        var aihao2 = $("#aihao2").prop("checked");
        var aihao3 = $("#aihao3").prop("checked");
        let sex = $("input[name='sex']:checked").val();
        let func = $("#func").val()
        // 组装为json
        let mp = {
            "username": username,
            "aihao1": aihao1,
            "aihao2": aihao2,
            "aihao3": aihao3,
            "sex": sex,
            "func": func
        }
        let j = JSON.stringify(mp)
        console.log("saveParam " + j)
        window.ec.saveConfig("uiconfig", j, function (resp) {
            if (resp) {
                alert("保存成功")
            } else {
                alert("保存失败")
            }
            console.log("保存结果: " + resp)
        })
    }

    function start() {
        window.ec.start()
    }

    $(function () {
        resetParam()
    });
</script>
</body>
</html>
```


### ui.js 文件内容
```javascript ui.js
// ui.js 文件内容
function main() {
    ui.layout("main", "index.html")
    uiRegToScript();
}

function uiRegToScript() {
    // // UI注入函数给脚本，方便脚本更新UI
    // // 注入方向  ui.js 调用 ui.registeFunctionToScript，然后脚本执行的时候,调用 callUIRegisteFunction
    // // 注册一个函数 可以让js脚本调用
    // // 脚本调用ui.js的ui-hello->调用到H5的updateUserName函数
    // ui.registeFunctionToScript("ui-hello", function (data) {
    //     logd("UI hello " + data)
    //     // 调用到 H5页面中
    //     ui.evaluateJavaScript("updateUserName('" + data + "');")
    //     return ""
    // })
  
    // H5->调用UI.JS的h5calltest->调用到脚本的js中的script-hello
    // 注册一个函数给H5调用
    ui.registeH5Function("h5calltest", function (data) {
        logd("h5calltest data: " + data)
        // 这里可以调用脚本注入的script-hello函数 
        let bb = ui.callScriptRegisteFunction("script-hello", data)
        logd("bb " + bb)
    })

}
main()

```

### main.js脚本内容
```javascript

function main() {
    //开始再这里编写代码了！！
    logd("检查自动化环境...")
    //如果自动化服务正常
    regToUI()
  
    logd("开始执行脚本...")
    
    // 如果是循环执行 一定要使用脚本是否结束为标志，不能使用while true的方式
    while (!isScriptExit()) {

        // 开始编写自己的业务逻辑
        sleep(1000)
        logd(new Date())
    }
}

function regToUI() {
    // 以下都是例子，具体请看 ui.js的uiRegToScript 代码
    // 注入 script-hello 给UI.js 调用
    registeScriptFunctionToUI("script-hello", function (data) {
        // 如果 脚本不在运行 可能调用不到这个函数
        logd("h5 传递的数据 " + data)
        return "script say hello"
    })

    // // 调用UI.js 注入的 ui-hello 函数
    // let result = callUIRegisteFunction("ui-hello", "我的js数据")
    // logd("ui.js 返回的数据 " + result)

    // 需要的时候进行移出即可
    //removeAllScriptToUIfFunc();
    //removeAllUIToScriptFunc();

}

main();

```

## 脚本->ui.js->H5的调用流程
:::tip
- H5包含一段可执行的js代码，例如updateUserName函数
- ui.js 注册函数给脚本调用,函数是 ui.registeFunctionToScript
- 脚本运行的时候，函数是 callUIRegisteFunction
:::

### main.js脚本内容
```javascript
function main() {
    //开始再这里编写代码了！！
    logd("检查自动化环境...")
    //如果自动化服务正常
    regToUI()
    // 如果是循环执行 一定要使用脚本是否结束为标志，不能使用while true的方式
    while (!isScriptExit()) {
      
        // 开始编写自己的业务逻辑
        sleep(1000)
        logd(new Date())
        // 调用到 ui.js 注入的 ui-hello函数
        callUIRegisteFunction("ui-hello", "我的js数据:"+new Date())
    }
}

function regToUI() {
    // 以下都是例子，具体请看 ui.js的uiRegToScript 代码
    // 调用UI.js 注入的 ui-hello 函数
    let result = callUIRegisteFunction("ui-hello", "我的js数据")
    logd("ui.js 返回的数据 " + result)

    // 需要的时候进行移出即可
    //removeAllScriptToUIfFunc();
    //removeAllUIToScriptFunc();
    
}

main();
```


### ui.js内容
```javascript

function main() {
    ui.layout("main", "index.html")
    uiRegToScript();
}

function uiRegToScript() {
    // UI注入函数给脚本，方便脚本更新UI
    // 注入方向  ui.js 调用 ui.registeFunctionToScript，然后脚本执行的时候,调用 callUIRegisteFunction
    // 注册一个函数 可以让js脚本调用
    // 脚本调用ui.js的ui-hello->调用到H5的updateUserName函数
    ui.registeFunctionToScript("ui-hello", function (data) {
        logd("UI hello " + data)
        // 调用到 H5页面中
        ui.evaluateJavaScript("updateUserName('" + data + "');")
        return ""
    })

}
main()
```

### H5文件内容
```html

<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <link href="htmljs/bootstrap.min.css" rel="stylesheet">
    <script src="htmljs/bootstrap.min.js"></script>
    <script src="htmljs/jquery.min.js"></script>
</head>

<body>
<div class="alert alert-info" role="alert">
    开始脚本配置
</div>
<div style="margin: 10px">
    <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" id="autoService" disabled>
        <label class="form-check-label" for="autoService">自动化服务</label>
        <span class="badge text-bg-info bg-primary" onclick="refreshIsServiceOk()">刷新</span>
        <p>请点击代理程序图标<br/>或者使用激活器激活自动化<br/>
            手机上出现了Automation Running字样即可
        </p>
    </div>
    <br/>
    <div class="input-group mb-3">
        <span class="input-group-text" id="username1">姓名: </span>
        <input type="text" class="form-control" placeholder="" id="username" aria-label="username"
               aria-describedby="basic-addon1">
    </div>
    <div class="form-group">
        <label>爱好: </label>
        <label class="checkbox-inline">
            <input type="checkbox" name="aihao1" id="aihao1" value="1"> 游戏
        </label>
        <label class="checkbox-inline">
            <input type="checkbox" name="aihao2" id="aihao2" value="2"> 摄影
        </label>
        <label class="checkbox-inline">
            <input type="checkbox" name="aihao3" id="aihao3" value="3"> 旅游
        </label>
    </div>
    <br/>
    <div class="form-group">
        <label>性别: </label>
        <label class="radio-inline">
            <input type="radio" value="1" name="sex"> 男性
        </label>
        <label class="radio-inline">
            <input type="radio" value="2" name="sex"> 女性
        </label>
        <label class="radio-inline">
            <input type="radio" value="3" name="sex"> 中性
        </label>
    </div>
    <br/>
    <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">功能 </span>
        <select class="form-select" aria-label="" id="func">
            <option value="1">功能1</option>
            <option value="2">功能2</option>
            <option value="3">功能3</option>
        </select>
    </div>
    <div>
        <button type="button" class="btn btn-primary" onclick="saveParam()">保存参数</button>
        <button type="button" class="btn btn-success" onclick="start()">执行脚本</button>
        <button type="button" class="btn btn-primary" onclick="pause()">暂停</button>
        <button type="button" class="btn btn-success" onclick="continueRun()">继续</button>

    </div>
    <div>
        <button type="button" class="btn btn-success" onclick="h5calltest()">脚本注入函数测试</button>
    </div>
</div>
<script>
    // ui.js 会回调到这个函数然后更新数据
    function updateUserName(data) {
        $("#username").val(data)
    }
    function h5calltest() {
        window.ec.call("h5calltest", "我是H5传递的数据")
    }

    function pause() {
        window.ec.setScriptPause({"pause": true, "timeout": 3330}, function (resp) {
            checkPause()
        });
    }

    function checkPause() {
        window.ec.isScriptPause(function (resp) {
            alert("isScriptPause " + resp)
        });
    }
    function continueRun() {
        window.ec.setScriptPause({"pause":false,"timeout":0},function (resp) {

        });
    }
    function refreshIsServiceOk() {
        window.ec.isServiceOk(function (resp) {
            if (resp) {
                $("#autoService").attr("checked", true)
            } else {
                $("#autoService").attr("checked", false)
            }
        })
    }

    function resetParam() {
        window.ec.isServiceOk(function (resp) {
            if (resp) {
                $("#autoService").attr("checked", true)
            } else {
                $("#autoService").attr("checked", false)
            }
        })
        // 读取username
        window.ec.getConfig("uiconfig", function (resp) {
            if (resp == null || resp == undefined) {
                return
            }
            console.log("resp " + resp)
            let p = JSON.parse(resp)
            $("#username").val(p["username"])
            $("#func").val(p["func"])
            if (p["aihao1"]) {
                $("#aihao1").prop("checked", true)
            }
            if (p["aihao2"]) {
                $("#aihao2").prop("checked", true)
            }
            if (p["aihao3"]) {
                $("#aihao3").prop("checked", true)
            }
            $("input[type=radio][name='sex'][value='" + p["sex"] + "']").attr("checked", 'checked')
        })
    }

    function saveParam() {
        let username = $("#username").val()
        var aihao1 = $("#aihao1").prop("checked");
        var aihao2 = $("#aihao2").prop("checked");
        var aihao3 = $("#aihao3").prop("checked");
        let sex = $("input[name='sex']:checked").val();
        let func = $("#func").val()
        // 组装为json
        let mp = {
            "username": username,
            "aihao1": aihao1,
            "aihao2": aihao2,
            "aihao3": aihao3,
            "sex": sex,
            "func": func
        }
        let j = JSON.stringify(mp)
        console.log("saveParam " + j)
        window.ec.saveConfig("uiconfig", j, function (resp) {
            if (resp) {
                alert("保存成功")
            } else {
                alert("保存失败")
            }
            console.log("保存结果: " + resp)
        })
    }

    function start() {
        window.ec.start()
    }

    $(function () {
        resetParam()
    });
</script>
</body>
</html>
```




## ui.js可用函数

### ui.registeFunctionToScript 注入函数给脚本用

* 注册一个函数，给脚本调用
* 适配EC iOS 脱机 5.10+
* @param funcName 函数名称
* @param callback 函数回调
* @return `{boolean}` true 代表成功，false 代表失败

```javascript showLineNumbers
 // ui.js 文件
function main() {
    ui.registeFunctionToScript("ui-hello", function (data) {
        logd("ui hello call-> " + data);
        //返回给网页的数据
        return new Date().toString()
    })
    ui.layout("main", "main.html");
}

main();
```


### ui.callScriptRegisteFunction 调用脚本注册的函数

* 调用脚本注册的函数
* 适配EC iOS 脱机 5.10+
* @param funcName 函数名称
* @param data 数据
* @return `{string}` 返回的数据

```javascript showLineNumbers
 // ui.js 文件 
function main() {
   // 调用脚本的注入过来的 script-hello 函数
    let a = ui.callScriptRegisteFunction("script-hello", "hello")
    logd(a)
}

main();
```


### ui.evaluateJavaScript 调用H5页面的js代码

* 调用H5页面的js代码
* 适配EC iOS 脱机 5.10+
* @param code js代码
* @return `{string}` 返回的数据

```javascript showLineNumbers
 // ui.js 文件 
function main() {
    let code = 'alert("123")';
    ui.evaluateJavaScript(code)
}

main();
```



### ui.removeFunctionToScript 移出UI注入给脚本函数

* 移出UI注入给脚本函数
* 适配EC iOS 脱机 5.10+
* @param funcName 函数名称
* @return `{boolean}` true 代表成功，false 代表失败

```javascript showLineNumbers
 // ui.js 文件 
function main() {
    ui.removeFunctionToScript("ui-hello")
}

main();
```


### ui.removeAllScriptToUIfFunc 移出UI注入给脚本函数

* 移出所有脚本注册给UI的函数
* 适配EC iOS 脱机 5.10+
* @return `{boolean}` true 代表成功，false 代表失败

```javascript showLineNumbers
 // ui.js 文件 
function main() {
    ui.removeAllScriptToUIfFunc()
}

main();
```


### ui.removeAllUIToScriptFunc 移出所有UI注册给脚本的函数

* 移出所有UI注册给脚本的函数
* 适配EC iOS 脱机 5.10+
* @return `{boolean}` true 代表成功，false 代表失败

```javascript showLineNumbers
 // ui.js 文件 
function main() {
    ui.removeAllUIToScriptFunc()
}

main();
```

## 脚本中可用函数

### registeScriptFunctionToUI 注入函数给UI用

* 注册一段函数给UI使用
* 适配EC iOS 脱机 5.10+
* @param funcName 函数名称
* @param callback 函数回调
* @return `{boolean}` true 代表成功，false 代表失败

```javascript showLineNumbers
 // main.js 文件
function main() {
    registeScriptFunctionToUI("script-hello", function (data) {
        logd("script hello call-> " + data);
        //返回给网页的数据
        return new Date().toString()
    })
}
main();
```


### callUIRegisteFunction 调用UI注册给脚本的函数

* 调用UI注册给脚本的函数
* 适配EC iOS 脱机 5.10+
* @param funcName 函数名称
* @param data 数据
* @return `{string}` 返回的数据

```javascript showLineNumbers
 // main.js 文件 
function main() {
   // 调用脚本的注入过来的 ui-hello 函数
    let a = callUIRegisteFunction("ui-hello", "hello")
    logd(a)
}

main();
```


### removeFunctionToUI 移出脚本注册给UI的函数
* 移出脚本注册给UI的函数
* 适配EC iOS 脱机 5.10+
* @param funcName 函数名称
* @return `{boolean}` true 代表成功 false代表失败

```javascript showLineNumbers
 // main.js 文件 
function main() {
    removeFunctionToUI("script-hello")
}

main();
```




### removeAllScriptToUIfFunc 移出所有脚本注册给UI的函数
* 移出所有脚本注册给UI的函数
* 适配EC iOS 脱机 5.10+
* @return `{boolean}` true 代表成功，false 代表失败

```javascript showLineNumbers
 // main.js 文件 
function main() {
  removeAllScriptToUIfFunc();
}

main();
```


### removeAllUIToScriptFunc 移出所有UI注册给脚本的函数
* 移出所有UI注册给脚本的函数
* 适配EC iOS 脱机 5.10+
* @return `{boolean}` true 代表成功，false 代表失败

```javascript showLineNumbers
 // main.js 文件 
function main() {
  removeAllUIToScriptFunc();
}

main();
```
