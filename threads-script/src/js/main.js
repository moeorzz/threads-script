
//云机的脚本更新接口在ins 香港服务器的 ins项目 api soft里面定义的版本信息
/*


 g_ctx["首次不设置代理"]=true
g_ctx["首次不启动目标app"]=true

增加国家需要修改

云机_查询设备语言
main_还原的账号标记 (里面增加首页图标特征和放大镜的特征)
通过首页放大镜识别语言
 */
//19902未处理
/**
 * 任务数据
 * @typedef {Object} TaskData
 * @property {string} fbuid - 文件下载地址（明确属性名和类型，对应接口返回字段）
 * @property {string} taskType
 * @property {string} maxCount
 * @property {string} maxTime
 * @property {number} maxdelcount
 * @property {number} randomsleep
 * @property {number} groupsleep
 * @property {string} taskDetailId
 */
var g_云机api地址="http://172.25.255.206:8081" //忽略全局变量检查



var g_domain = "www.juhe.host"  //忽略全局变量检查

var g_script_ver = 10  //忽略全局变量检查

var g_云手机 = false  //忽略全局变量检查

var g_jwt = "" //忽略全局变量检查
var paddlelite = null //忽略全局变量检查

var ocrLite = null  //忽略全局变量检查

var g_添加好友的国家 = "" //暂时只有巴西和印度  //忽略全局变量检查
var g_Context={} //全局上下文参数  //忽略全局变量检查
var g_青春版 = false  //忽略全局变量检查
var g_全球语言包 = {}  //忽略全局变量检查
var g_已经下载头像 = false  //忽略全局变量检查
var g_云机静态ip线路 = ""  //如果是"" 就获取静态线路 不是就用这个  //忽略全局变量检查
var g_lite解封模式=false  //忽略全局变量检查
var g_仅上线模式 = false  //忽略全局变量检查
var g_sid = ""  //忽略全局变量检查
//g_ctx 是全局变量对象 不要删
var g_ctx = {   //忽略全局变量检查
    "结束脚本": false,  //为true的时候直接return 代替fbaccount.isblock 因为有些时候不是封号 但是也无法继续执行 比如静态ip失效 功能限制或者其他原因
    "进程结束次数": 0,  //这个是没有网络或者类似的原因重启fb的次数的 如果达到3次 结束脚本并且设置 "结束脚本" 为true
    "上次结束时间": 0,  //这个其实暂时没有使用
    "color": "", //上报的云机文本颜色
    "message": "",  //云机的标题文本
    "YunjiTtitleLastUpdateTime": 0, //云机上次上报的时间 秒 时间戳
    "出现盾牌": false,
    "盾牌提示内容": "",  //出现盾牌 为true才有这个
    "最近10次页面数组": [],
    "恢复备份的任务id": "",  //设置代理的时候可能用得上
    "已经添加好友数量": 0, //多模块加好友累积用的 防止加的好友少的
    "停止刷reels": false,  //无法继续执行reels的时候设置为true 目前一般出现在搜索reels的时候 搜索的有些时候和现有的reels冲突较大
    "停止刷reels原因": "",
    "进程最大结束次数": 10,
    "帖子公开模式设置次数": 0,
    "没有小人图标": false,
    "连续空页面次数": 0,   //防止异常超时的
    "上次调用方法名":"", //给上线封号用的 要保持和key一样
    "重启不切换ip":false,   //有些情况下重启不需要切换ip
    "启动的应用包名":"com.facebook.katana",
    "桌面应用名称":"Facebook",  //"Instagram"
    "检查ctw备份":true,  //在fb主页查询备份状态的
    "首次不设置代理":false,  //执行上一行恢复任务之前调用 g_ctx["首次不设置代理"]=true 可以避免重新设置代理
    "首次不启动目标":false,  //执行上一行恢复任务之前调用 g_ctx["首次不启动目标"]=true 可以避免重新启动应用
    "messenger小号uid需要添加好友":true,  //默认都是这个 但是有些时候 比如第2天再次发送 可以用前一天的 这个时候就是设置为false
    "接口返回好友数":0,  //message上报需要 因为会清理不能发的 所以保存原始的数量
    "累计截图次数":0,  //遇到未知卡点 可能无限截图 限制一下
    "上次截图时间":0 , //区分截图间隔 有些任务会有多次截图
    "相机图标处理次数":0,  //太多次大概率卡死
    "hasEventMode":false,
    "已经启动任务":false,  //防止云端重复下发导致多线程执行的
    "执行的任务方法":"",
    "输入过账号密码":false,  //处理备份异常输入过账号密码 2fa就会是true 需要覆盖备份 目前主要影响message
    "分享链接记录id":"",
    "注册ins绑定邮箱的位置":0 //0未绑定 1 注册的时候绑定 2 注册成功以后绑定
}
//logw(g_ctx["结束脚本"])
/*
g_ctx["首次不设置代理"]=true
g_ctx["首次不启动目标"]=true
 */

var 设备高度 = device.getScreenHeight()  //忽略全局变量检查


fbaccount.ip = ""


/**
 * 获取全局对象的字符串值
 * @param {string} key
 * @param {string} default_value  默认值
 * @returns {string}
 */
function getCtxString(key,default_value) {
    let tdata = g_ctx[key]
    if (tdata === undefined) {
        return default_value
    }

    return String(tdata)
}

/**
 * 获取全局对象的指定key的逻辑值
 * @param {string} key
 * @returns {boolean}
 */
function getCtxBoolean(key) {
    let tdata = g_ctx[key]
    // logw(tdata)
    if (tdata === undefined) {
        return false
    }
    return tdata
}

/**
 * 获取全局对象的指定key的整数值
 * @param {string} key
 * @returns {number}  不存在返回0
 */
function getCtxNumber(key) {
    let tdata = g_ctx[key]
    if (tdata === undefined) {
        return 0
    }
    return Number(tdata)
}

/**
 * 全局对象自增1
 * @param {string} key
 * @returns {number}
 */
function CtxIncr(key) {
    let tdata = g_ctx[key]
    if (tdata === undefined) {
        g_ctx[key] = 1
    } else {
        g_ctx[key] = g_ctx[key] + 1
    }
    return g_ctx[key]
}
/**
 * 全局对象减1 有可能是负数
 * @param {string} key
 * @returns {number}
 */
function CtxDecr(key) {
    let tdata = g_ctx[key]
    if (tdata === undefined) {
        g_ctx[key] = -1
    } else {

        g_ctx[key] = tdata - 1
    }
    return g_ctx[key]
}
/**
 * 全局对象加指定数量
 * @param {string} key
 * @param {number} num
 * @returns {number}
 */
function addCtxNumber(key, num) {
    logw(key, num)
    try {
        let tdata = g_ctx[key]
        if (tdata === undefined) {

            g_ctx[key] = Number(num)
        } else {
            g_ctx[key] = g_ctx[key] + Number(num)
        }
        return g_ctx[key]
    } catch (e) {
        loge(e)
    }
    return 0
}





function 脚本在线() {
    while (true) {
        logd("记录脚本在线时间")
        try {
            let ret = http.postJSON("https://" + g_domain + "/api/fbapi/st", {
                "pcid": g_pcid,
                "simulatorid": g_sid

            }, 30 * 1000, {"X-User-Token": g_token, "Authorization": "Bearer " + g_jwt, "Connection": "close"});
            logd(ret)
            let js = JSON.parse(ret)
            if (js.code === 1) {

                return
            }
        } catch (e) {
            loge(e)
        }
        长等待(15, "main.js,142")
    }
}

function 登记设备() {

    let uid
    if (g_云手机) {
        uid = ""  //云手机目前是注册 所以第一次默认不读取 减少设备交互 提高反应速度

    }


    while (true) {
        logd("登记设备")
        try {
            let ret = http.postJSON("https://" + g_domain + "/goapi/fbapi/addfbdevice", {
                "pcid": g_pcid,
                "simulatorid": g_sid,
                "ver": String(g_script_ver),
                "fbuid": uid
            }, 30 * 1000, {"X-User-Token": g_token, "Authorization": "Bearer " + g_jwt, "Connection": "close"});
            logd(ret)
            let js = JSON.parse(ret)
            if (js.code === 1) {
                脚本在线(uid)
                return
            }
        } catch (e) {
            loge(e)
        }
        长等待(15, "main.js,176")
    }
}


/**
 *
 * @param {"descMatch" | "desc" | "text" | "textMatch"} method
 * @param {string} key  多语言键
 * @param {{desc?: string, pkg?: string, clz?: string, text?: string,selected?: boolean,multiLine?: boolean,nid?:string}=} obj
 * @param {number} d  毫秒的时间
 * @returns {boolean}
 */
function 等待节点消失_多语言(method, key, obj, d) {
    let 开始时间 = time()

    while (time() - 开始时间 < d) {
        let node = 语言转换_getOneNodeInfo(method, key, obj)
        if (node) {
            sleep(2000);
        } else {
            return true
        }
        sleep(500);
    }
    return false
}

//输入的内容都是需要严格控制的 因为输入失败都会导致失败 所以卡住也必须等待












/**
 * @description 随机点击节点30%-70%区域的坐标
 * @param nodeInfo {NodeInfo?}节点信息,默认g_ret
 * @param noDelay {boolean?}不加延迟,默认false,加延迟
 */
function clickPointBounds(nodeInfo, noDelay) {
    if (nodeInfo == null) {
        return false
    }
    try {
        //let x=random(nodeInfo.bounds.left + 5, nodeInfo.bounds.right - 5)
        //let y=random(nodeInfo.bounds.top + 5, nodeInfo.bounds.bottom - 5)

        let 宽度 = nodeInfo.bounds.right - nodeInfo.bounds.left
        let 高度 = nodeInfo.bounds.bottom - nodeInfo.bounds.top
        let x = nodeInfo.bounds.left + Math.ceil(宽度 * (random(30, 70) / 100))
        let y = nodeInfo.bounds.top + Math.ceil(高度 * (random(30, 70) / 100))
        //let y=random(nodeInfo.bounds.top + 5, nodeInfo.bounds.bottom - 5)
        if(y>设备高度){
            logw("点击" + String(x) + "," + String(y)+"失败 底部超过可点击区域")
            return false
        }

        logw("点击" + String(x) + "," + String(y))
        clickPoint(x, y)
        if (!noDelay) {
            sleep(random(500, 1000))
        }
        return true
    } catch (e) {
        loge(e)
    }
    return false
}
/**
 * @description 随机点击节点30%-70%区域的坐标 目前基本上是threads使用
 * @param node {NodeInfo?}节点信息,默认g_ret
 * @param noDelay {boolean?}不加延迟,默认false,加延迟
 */
function clickPointBounds_父节点(node, noDelay) {
    if (node == null) {
        return false
    }
    let nodeInfo
    try {

        nodeInfo=node.parent()
        //let x=random(nodeInfo.bounds.left + 5, nodeInfo.bounds.right - 5)
        //let y=random(nodeInfo.bounds.top + 5, nodeInfo.bounds.bottom - 5)


        let 宽度 = nodeInfo.bounds.right - nodeInfo.bounds.left
        let 高度 = nodeInfo.bounds.bottom - nodeInfo.bounds.top
        let x = nodeInfo.bounds.left + Math.ceil(宽度 * (random(30, 70) / 100))
        let y = nodeInfo.bounds.top + Math.ceil(高度 * (random(30, 70) / 100))
        //let y=random(nodeInfo.bounds.top + 5, nodeInfo.bounds.bottom - 5)
        if(y>设备高度){
            logw("点击" + String(x) + "," + String(y)+"失败 底部超过可点击区域")
            return false
        }

        logw("点击" + String(x) + "," + String(y))
        clickPoint(x, y)
        if (!noDelay) {
            sleep(random(500, 1000))
        }
        return true
    } catch (e) {
        loge(e)
    }
    return false
}
/**
 * @description 随机点击节点30%-70%区域的坐标 adb版本
 * @param nodeInfo {NodeInfo?}节点信息,默认g_ret
 * @param noDelay {boolean?}不加延迟,默认false,加延迟
 */
function clickPointBounds_adb(nodeInfo, noDelay) {
    if (nodeInfo == null) {
        return false
    }
    try {
        //let x=random(nodeInfo.bounds.left + 5, nodeInfo.bounds.right - 5)
        //let y=random(nodeInfo.bounds.top + 5, nodeInfo.bounds.bottom - 5)

        let 宽度 = nodeInfo.bounds.right - nodeInfo.bounds.left
        let 高度 = nodeInfo.bounds.bottom - nodeInfo.bounds.top
        let x = nodeInfo.bounds.left + Math.ceil(宽度 * (random(30, 70) / 100))
        let y = nodeInfo.bounds.top + Math.ceil(高度 * (random(30, 70) / 100))
        //let y=random(nodeInfo.bounds.top + 5, nodeInfo.bounds.bottom - 5)
        if(y>设备高度){
            logw("点击" + String(x) + "," + String(y)+"失败 底部超过可点击区域")
            return false
        }

        logw("点击" + String(x) + "," + String(y))
        //clickPoint(x, y)
        云机_adb点击(x, y)
        if (!noDelay) {
            sleep(random(500, 1000))
        }
        return true
    } catch (e) {
        loge(e)
    }
    return false
}






/**
 * 设置代理总入口
 * @param {boolean} 新建代理  这个只针对小师妹有效
 * @param {string} 外部代理字符串  设置静态代理可能会提供 否则一般都是""
 * @param {string} 国家代码  数字的国家代码
 */
function 设置代理_云机专用(新建代理, 外部代理字符串, 国家代码) {
    logw(新建代理, 外部代理字符串, 国家代码)
    //这个大部分只有中英文双语 少部分有很多种语言
    let countryjs
    let 上报code
    //closeLogWindow()




    let 代理重试次数 = 20

    let 窗口日志
    for (let i = 0; i < 代理重试次数; i++) {
        //g_我同意之前的代理字符串=代理参数
        if (云机_设置代理( 国家代码)) {
            logw("设置了代理 20秒之后检查语言")
            长等待(20, "main.js,1267")

            for (let ii = 0; ii < 36; ii++) {
                窗口日志 = 云机_获取窗口日志()
                if (窗口日志 === "开启代理成功") {
                    break
                }
                if (窗口日志.indexOf("失败原因") > -1) {
                    break
                }
                if (窗口日志.indexOf("开启代理失败:") > -1) {
                    break
                }
                if (窗口日志.indexOf("执行超时") > -1) {
                    break
                }
                if (窗口日志.indexOf("code: 400") > -1) {
                    break
                }
                if (窗口日志.indexOf("无法连接代理服务") > -1) {
                    break
                }
                长等待(10, "main.js,1287")
            }

            if (窗口日志 === "开启代理成功") {

                return;

            }


        }

        loge("代理无效 切换")
        //获取代理字符串()  发起代理的是会生成新的动态
        长等待(15, "main.js,1336")

    }

    if (g_云机静态ip线路 === "") {

        云机_回传任务详情结果(8, "代理ip失败次数太多", "", "red", "代理ip失败次数太多")
        exit()


    } else {
        countryjs = 获取国家配置信息(国家代码)
        上报code = 云机_上报异常ip(g_云机静态ip线路, countryjs.phone_region)
        if (上报code === 200) {
            云机_回传任务详情结果(8, "代理ip失败次数太多", "", "red", "代理ip失败次数太多")
            exit()
            云机_上报状态_全局("red", "代理ip失败次数太多,请恢复下一个账号")
        }
        if (上报code === 500) {
            云机_回传任务详情结果(8, "代理ip失败次数太多", "", "red", "代理ip失败次数太多")
            exit()
            云机_上报状态_全局("red", "该国家没有可用的备用ip")
        }
        while (true) {
            //这里不能停止脚本 停止以后云机自动化有问题
            sleep(1000)
        }
        //exit()
    }


}

/**
 * 设置代理总入口
 * @param {boolean} 新建代理  这个只针对小师妹有效
 * @param {string} 外部代理字符串  设置静态代理可能会提供 否则一般都是""
 * @param {string} 国家代码  数字的国家代码
 */
function 设置代理(新建代理, 外部代理字符串, 国家代码) {

    if(getCtxBoolean("首次不设置代理")){
        //执行上一行恢复任务之前调用 g_ctx["首次不设置代理"]=true 可以避免重新设置代理
        g_ctx["首次不设置代理"]=false
        return;
    }
    logw(g_Context.hasOwnProperty("targetRegion"))
    try {
        //fb转ins的时候可能用
        if(g_Context.hasOwnProperty("targetRegion")){
            logw("111")
            设置代理_云机专用(新建代理, 外部代理字符串,英文大写国家编码转数字(  g_Context["targetRegion"]))
            return;
        }
    }catch (e) {
        logw(e)
    }





    //logw("222")
    设置代理_云机专用(新建代理, 外部代理字符串, 国家代码)




}
/**
 * 设置代理总入口 最新版的 执行事件专用的 服务器下发调用
 * @param {boolean} 新建代理  这个只针对小师妹有效
 * @param {string} 外部代理字符串  设置静态代理可能会提供 否则一般都是""
 * @param {string} 国家代码  数字的国家代码
 * @param data
 */
function 设置代理2(新建代理, 外部代理字符串, 国家代码,data) {
    g_ctx["hasEventMode"]=true
    logw(data["ipType"])
    if(data["ipType"]===1){
        //ipType 1是动态 2是静态 为2时会同步返回staticIp
        proxyconfig.platform="ipweb"

    }
    if(data["ipType"]===2){
        //ipType 1是动态 2是静态 为2时会同步返回staticIp
        proxyconfig.platform="static"
        proxyconfig.staticproxy=data["staticIp"]
    }
    if(getCtxBoolean("首次不设置代理")){
        //执行上一行恢复任务之前调用 g_ctx["首次不设置代理"]=true 可以避免重新设置代理
        g_ctx["首次不设置代理"]=false
        return;
    }



    try {
        //fb转ins的时候可能用
        if(g_Context.hasOwnProperty("targetRegion")){
            设置代理_云机专用(新建代理, 外部代理字符串, g_Context["targetRegion"])
            return;
        }
    }catch (e) {
        logw(e)
    }



    设置代理_云机专用(新建代理, 外部代理字符串, 国家代码)
}

function 模拟测试() {
    //测试功能代码的
}


function http_request_get(url) {

    let header = {"X-User-Token": g_token, "Authorization": "Bearer " + g_jwt, "Connection": "close"}
    let params = {
        "url": url,
        "method": "GET",
        "header": header, "timeout": 30 * 1000
    };

    let x = http.request(params);

    if (x) {
        //logd("header=" + x.header);
        //logd("cookie=" + x.cookie);
        logd("statusCode=" + x.statusCode);
        if (x.statusCode === 404) {
            logw("出现致命错误 无法启动");
            exit()
        }

        logd("statusMessage=" + x.statusMessage);
        //logd("charset=" + x.charset);
        //logd("contentType=" + x.contentType);
        logd("body=" + x.body);
        return x.body
    } else {
        loge("请求失败");
    }
    return null


}

function 脚本更新(提示信息) {
    let ret
    清理aaa文件夹()
    logd("脚本版本号" + g_script_ver)
    while (true) {
        try {
            //logw(g_脚本id)
            if (g_云手机) {
                ret = http_request_get(g_云机api地址+"/remote/getLatestVersionUrl?instanceId=" + g_sid)

            } else {
                ret = http_request_get(g_云机api地址+"/remote/getLatestVersionUrl")

            }


            logd(ret)
            /**
             * 解析后的接口数据对象
             * @type {{ download_url: string,version : number}}
             */
            let js = JSON.parse(ret);

            //logw(js.download_url)
            logd(g_script_ver)
            if (js.version > g_script_ver) {
                logd("下载新脚本")
                //云机_上报状态_全局("green", "开始更新脚本")
                let 下载地址 = js.download_url
                if (下载地址.indexOf("https://cdn.mpdata.org") > -1) {
                    下载地址 = 下载地址.replace("https://cdn.mpdata.org", "http://cloudphone-saved-bucket-android-dev.oss-cn-hongkong-internal.aliyuncs.com")
                }
                let x = http.downloadFileDefault(js.download_url, "/sdcard/aaa/fb" + String(js.version) + ".iec", {"User-Agent": "test"});
                if (x === false) {
                    logw("脚本更新失败");
                } else {
                    //重启脚本
                    if (g_云手机) {
                        let 窗口日志 = 云机_获取窗口日志()
                        if (窗口日志.indexOf("恢复") === -1) {
                            云机_上报状态_全局("green", "重启脚本")
                        }
                    }


                    restartScript("/sdcard/aaa/fb" + String(js.version) + ".iec", true, 5)
                    长等待(15, "main.js,1960")
                    exit()
                }
            } else {
                logd("不用更新")
                if ("注册完成升级脚本" === 提示信息) {

                    云机_上报状态_全局("green", "空闲")
                }
                return
            }
        } catch (e) {
            loge(e)
            logw("脚本更新失败");
        }
        长等待(10, "main.js,1974")
    }


}





function 执行最后一次的恢复任务(){
    thread.execAsync(function () {
        let 次数=0

        长等待(120,"等待延迟") //必须等待
        let 开始时间=gettime(10)
        while (gettime(10)-开始时间<120){
            let 窗口日志 = 云机_获取窗口日志()

            if(窗口日志==="已向脚本发起任务等待执行." || 窗口日志==="重启脚本"){
                次数=次数+1
                if(次数>3){
                    return
                }
                if(次数>1){
                    try {
                        postapi200(g_云机api地址+"/remote/lastRestore/"+g_sid,{},"执行最后一次的恢复任务")
                    }catch (e) {
                        loge(e)
                    }

                }

            }
            长等待(15,"等待延迟") //必须等待
        }


    });

}

main()

