---
title: UI与脚本互通交互(高级)
description: EasyClick 自动化脚本 android免root
keywords:
  - EasyClick 自动化脚本 android免root
  - js
  - ui
  - H5
  - main
  - tip
  - UI
  - EC
  - 11.15.0
  - idea
  - vue
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
- 本章节主要讲述ui.js 与 脚本或者H5，三者互通交互
- 该功能从EC 安卓 11.15.0+才能使用
:::
## 如何使用
- 在idea工程中新建项目，自带的就有交互的实例
- 如果新建vue项目，可以看到脚本更新ui.js再更新到h5页面的案例


## ui.js->脚本调用的流程
:::tip
- 脚本注册一个函数给ui.js，函数是 registeScriptFunctionToUI
- ui.callScriptRegisteFunction 调用到脚本注册的函数
:::


### ui.js 文件内容
```javascript ui.js
function main() {
  // 该模板是VUE+ELEMENTUI组成，你可以到 https://uc.ieasyclick.com/designer 在线拖拽UI
  // 然后复制到 HTML文件中即可使用，简单方便
  // 参数设置 = main.html
  // 使用说明 = intr.html
  // 其他 = other.html
  ui.layout("参数设置", "main.html");

  // 注册UI函数与脚本互相交互的例子
  regFuncToScript()

}

function regFuncToScript() {
  // 注册一个 uihello 函数，给脚本使用，让脚本能够调用到这里
  ui.registeFunctionToScript("uihello", function (data) {
    logd("我是registeFunctionToScript的打印:" + data)
    // 更新到vue的模板 name的值
    let up = `updateUserName('${data}')`
    // ui.quickCallJs 是新增的函数，具体请看文档
    ui.quickCallJs("参数设置", up)
    // 调用到 vue中
    return "我是UI返回的值"
  })
  // 在脚本运行的情况下
  // 3秒后调用 scripthello 函数
  // 脚本不运行 调用不到 scripthello 函数
  ui.run(3000, function () {
    ui.callScriptRegisteFunction("scripthello", "123")
  })
}

main();

```

### main.js脚本内容
```javascript
function main() {
  //开始再这里编写代码了！！
  toast("Hello World");
  var name = readConfigString("name");
  logd("姓名: " + name);

  // 注册函数给UI调用的例子
  regFuncToUI();
  // 调用UI uihello 函数例子
  let uih = callUIRegisteFunction("uihello", "-date-" + new Date());
  logd("调用 uihello 函数结果：" + uih)

  
  home();
}

function regFuncToUI() {
  // 注册一个scripthello函数，UI可以调用
  registeScriptFunctionToUI("scripthello", function (data) {
    logd("我是 regFuncToUI 的打印:" + data)
    return "" + new Date();
  })

  // 在合适的时候移出注册的函数，一般不移出已不会影响
  //removeAllUIToScriptFunc();
  //removeAllScriptToUIFunc()
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
  toast("Hello World");
  var name = readConfigString("name");
  logd("姓名: " + name);

  // 注册函数给UI调用的例子
  regFuncToUI();
  // 调用UI uihello 函数例子
  let uih = callUIRegisteFunction("uihello", "-date-" + new Date());
  logd("调用 uihello 函数结果：" + uih)
  
  home();
}

function regFuncToUI() {
  // 注册一个scripthello函数，UI可以调用
  registeScriptFunctionToUI("scripthello", function (data) {
    logd("我是 regFuncToUI 的打印:" + data)
    return "" + new Date();
  })

  // 在合适的时候移出注册的函数，一般不移出已不会影响
  //removeAllUIToScriptFunc();
  //removeAllScriptToUIFunc()
}
main();

```


### ui.js内容
```javascript

function main() {
  // 该模板是VUE+ELEMENTUI组成，你可以到 https://uc.ieasyclick.com/designer 在线拖拽UI
  // 然后复制到 HTML文件中即可使用，简单方便
  // 参数设置 = main.html
  // 使用说明 = intr.html
  // 其他 = other.html
  ui.layout("参数设置", "main.html");

  // 注册UI函数与脚本互相交互的例子
  regFuncToScript()

}

function regFuncToScript() {
  // 注册一个 uihello 函数，给脚本使用，让脚本能够调用到这里
  ui.registeFunctionToScript("uihello", function (data) {
    logd("我是registeFunctionToScript的打印:" + data)
    // 更新到vue的模板 name的值
    let up = `updateUserName('${data}')`
    // ui.quickCallJs 是新增的函数，具体请看文档
    ui.quickCallJs("参数设置", up)
    // 调用到 vue中
    return "我是UI返回的值"
  })
  // 在脚本运行的情况下
  // 3秒后调用 scripthello 函数
  // 脚本不运行 调用不到 scripthello 函数
  ui.run(3000, function () {
    ui.callScriptRegisteFunction("scripthello", "123")
  })
}

main();
```

### H5文件内容
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- import CSS -->
    <link rel="stylesheet" href="/css/elementui.css">
</head>
<body>
<div id="app">
    <el-tag type="success">这个是由elementui+vue离线版本创建的模板,仅仅作为演示使用</el-tag>
    <el-form style="margin-top: 10px" :rules="rules" ref="form" :model="form" label-width="80px" size="mini">
        <el-form-item label="卡密" prop="cardNo">
            <el-input v-model="form.cardNo"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="form.sex" size="medium">
                <el-radio border label="男"></el-radio>
                <el-radio border label="女"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item size="large">
            <el-button type="primary" @click="submitForm">保存</el-button>
            <el-button type="primary" @click="runScript">运行脚本</el-button>
        </el-form-item>
    </el-form>
</div>
</body>
<!-- import Vue before Element -->
<script src="/htmljs/vue2.7.16.js"></script>
<!-- import JavaScript -->
<script src="/htmljs/elementui2.15.14.js"></script>
<script src="/htmljs/form-create.min.js"></script>
<script>
    // 这个可以被ui.js调用，然后更新vue的数据
    function updateUserName(data) {
        vueInstance.updateUserName(data);
    }

    let vueInstance = new Vue({
        el: '#app',
        data: function () {
            return {
                form: {
                    name: '',
                    cardNo: '',
                    sex: '',
                },
                rules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                    ],
                    cardNo: [
                        {required: true, message: '请输入卡密', trigger: 'blur'},
                    ],
                    sex: [
                        {required: true, message: '请选择性别', trigger: 'blur'},
                    ],
                }
            }
        },
        created() {
            this.resetValue()
        },
        methods: {
            updateUserName(data) {
                console.log("updateUserName " + data)
                this.form.name = data;
            },
            resetValue() {
                let name = window.ec.getConfig("name");
                let sex = window.ec.getConfig("sex");
                let cardNo = window.ec.getConfig("cardNo");
                this.form.name = name
                this.form.cardNo = cardNo
                this.form.sex = sex
            },
            save() {
                window.ec.saveConfig("name", this.form.name);
                window.ec.saveConfig("cardNo", this.form.cardNo);
                window.ec.saveConfig("sex", this.form.sex);

                this.$notify.info({
                    title: '消息',
                    duration: 2000,
                    message: '保存参数成功'
                });
            },
            submitForm() {

                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.save();
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: '参数不完整'
                        });
                        return false;
                    }
                });
            },
            runScript() {
                window.ec.start()
            },
        }
    })
</script>
</html>
```




## ui.js可用函数

### ui.registeFunctionToScript 注入函数给脚本用

* 注册一个函数，给脚本调用
* 适配EC 安卓11.15.0+
* @param funcName 函数名称
* @param callback 函数回调
* @return `{boolean}` true 代表成功，false 代表失败

```javascript showLineNumbers
 // ui.js 文件
function main() {
  ui.layout("参数设置", "main.html");

  ui.registeFunctionToScript("uihello", function (data) {
    logd("我是registeFunctionToScript的打印:" + data)
    // 更新到vue的模板 name的值
    let up = `updateUserName('${data}')`
    // ui.quickCallJs 是新增的函数，具体请看文档
    ui.quickCallJs("参数设置", up)
    // 调用到 vue中
    return "我是UI返回的值"
  })
  
}

main();
```


### ui.callScriptRegisteFunction 调用脚本注册的函数

* 调用脚本注册的函数
* 适配EC 安卓11.15.0+
* @param funcName 函数名称
* @param data 要传递的数据
* @return `{string}` 返回的数据

```javascript showLineNumbers
 // ui.js 文件 
function main() {
   // 调用脚本的注入过来的 scripthello 函数
    let a = ui.callScriptRegisteFunction("scripthello", "hello")
    logd(a)
}

main();
```


### ui.quickCallJs 调用H5页面的js代码

* 调用ui中的webview的js代码
* 适配EC 安卓11.15.0+
* 这个会根据标签，自动查找页面是否是webview，然后调用
* @param name 页面标签名称，和 ui.layout的name保持一致
* @param jscode js 代码
* @return `{string}` 返回的数据

```javascript showLineNumbers
 // ui.js 文件 
function main() {
    let code = 'alert("123")';
    let a = ui.quickCallJs("参数设置",code)
    logd(a)
}

main();
```



### ui.removeFunctionToScript 移出UI注入给脚本函数

* 移出UI注入给脚本函数
* @param funcName 函数名称
* 适配EC 安卓11.15.0+
* @return `{boolean}` true 代表成功，false 代表失败

```javascript showLineNumbers
 // ui.js 文件 
function main() {
    ui.removeFunctionToScript("uihello")
}

main();
```


### ui.removeAllScriptToUIFunc 移出UI注入给脚本函数

* 移出所有脚本注册给UI的函数
* 适配EC 11.15.0+
* @return `{boolean}` true 成功

```javascript showLineNumbers
 // ui.js 文件 
function main() {
    ui.removeAllScriptToUIFunc()
}

main();
```


### ui.removeAllUIToScriptFunc 移出所有UI注册给脚本的函数

* 移出所有UI注册给脚本的函数
* 适配EC 安卓11.15.0+
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
* 适配EC 11.15.0+
* @param funcName 函数名称
* @param callback 函数回调
* @return `{boolean}` true 代表成功，false 代表失败

```javascript showLineNumbers
 // main.js 文件
function main() {
    registeScriptFunctionToUI("scripthello", function (data) {
        logd("script hello call-> " + data);
        //返回给网页的数据
        return new Date().toString()
    })
}
main();
```


### callUIRegisteFunction 调用UI注册给脚本的函数

* 调用UI注册给脚本的函数
* 适配EC 11.15.0+
* @param funcName 函数名称
* @param data 数据
* @return `{string}` 返回数据

```javascript showLineNumbers
 // main.js 文件 
function main() {
   // 调用脚本的注入过来的 ui-hello 函数
    let a = callUIRegisteFunction("uihello", "hello")
    logd(a)
}

main();
```


### removeFunctionToUI 移出脚本注册给UI的函数
* 移出脚本注册给UI的函数
* 适配EC 11.15.0+
* @param funcName 函数名称
* @return `{boolean}` true 代表成功 false代表失败

```javascript showLineNumbers
 // main.js 文件 
function main() {
    removeFunctionToUI("scripthello")
}

main();
```




### removeAllScriptToUIFunc 移出所有脚本注册给UI的函数
* 移出所有脚本注册给UI的函数
* 适配EC 11.15.0+
* @return `{boolean}` true 代表成功，false 代表失败

```javascript showLineNumbers
 // main.js 文件 
function main() {
  removeAllScriptToUIFunc();
}

main();
```


### removeAllUIToScriptFunc 移出所有UI注册给脚本的函数
* 移出所有UI注册给脚本的函数
* 适配EC 11.15.0+
* @return `{boolean}` true 代表成功，false 代表失败

```javascript showLineNumbers
 // main.js 文件 
function main() {
  removeAllUIToScriptFunc();
}

main();
```
