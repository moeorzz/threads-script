function 服务器调用的函数(){
    设置代理2(false,"","BR",{})
    云机_获取视频并下载("BR")
    等待云机恢复完成()
    app页面跳转("")
    Instagram_获取页面信息_调用一次("测试")
    RndStr_casesnum(8)
    云机_获取代理城市编号_ig("")
    getapi_code1("","测试",30*1000)
    执行事件_threads({})
    main()
    上报事件开始({})
    上报事件结束({})
}


/**
 *
 * @param {string} url
 * @param postdata
 * @param {string} notes
 * @return {any}
 */
function postapi200(url, postdata, notes) {
    logw(url)
    logw(JSON.stringify(postdata))
    let 重试次数_501=0
    while (true) {
        logw(notes)
        try {

            let ret = http.postJSON(url, postdata, 30 * 1000, {"instanceId": g_sid, "version": g_script_ver});
            logw(ret)
            let js = JSON.parse(ret)
            if (js.code === 200) {

                return js
            }
            if(url===g_云机api地址+"/remote/unsealUpdateTaskResult"){
                if(js.code===501){
                    if(重试次数_501>0){
                        return js
                    }
                    重试次数_501=重试次数_501+1

                }
            }


        } catch (e) {
            loge(e)
        }
        长等待(15, "api.js,21")
    }

}











function 在服务器获取语言文件() {
    while (true) {
        try {
            let ret = http.httpGetDefault(g_云机api地址+"/remote/getLanguagesAsJson", 30 * 1000, {})
            g_全球语言包 = JSON.parse(ret)
            return
        } catch (e) {
            loge(e)
        }
        logw("获取服务器的语言文件失败")
        长等待(15, "api.js,373")


    }
}


/**
 * 云机_获取头像并下载 头像分组名称是 fbaccount.avatar_group
 */
function 云机_获取头像并下载() {
    清理可能存在的历史图片()  //尽量避免出现 相册有多张图片
    if (g_云手机 === false) {
        return;

    }
    if (g_已经下载头像 === false) {
        g_已经下载头像 = true
    } else {
        return;
    }

    //let countryjs = 获取国家配置信息(cc)
    while (true) {
        logw("云机_获取头像")
        try {
            let ret = http.httpGetDefault(g_云机api地址+"/remote/getRandomAvatar?type=" + encodeURIComponent(fbaccount.avatar_group), 30 * 1000, {
                "instanceId": g_sid,
                "version": g_script_ver
            });
            logw(ret)

            let js = JSON.parse(ret)

            if (js.code === 200) {

                let 图片地址 = js.data.url
                图片地址 = 图片地址.replace("https://cdn.mpdata.org", "oss://cloudphone-saved-bucket-android-dev")
                //下载图片(图片地址,"/sdcard/posts/dd.jpg")
                云机_上传文件到云机("/sdcard/posts/dd.jpg", 图片地址,false)
                return;
            }

        } catch (e) {
            loge(e)
        }
        长等待(15, "api.js,444")
    }

}


/**
 *
 * @param country
 * @return {string} 视频文案
 */
function 云机_获取视频并下载(country) {

    if (g_云手机 === false) {
        return "";
    }


    //let countryjs = 获取国家配置信息(cc)
    while (true) {
        logw("云机_获取视频")
        try {
            let ret = http.httpGetDefault(g_云机api地址+"/remote/video/random?groupName=" + encodeURIComponent(fbaccount.avatar_group)+"&country="+country, 30 * 1000, {
                "instanceId": g_sid,
                "version": g_script_ver
            });
            logw(ret)
            let js = JSON.parse(ret)
            if (js.code === 200) {

                let 图片地址 = js.data.url
                图片地址 = 图片地址.replace("https://cdn.mpdata.org", "oss://cloudphone-saved-bucket-android-dev")
                //下载图片(图片地址,"/sdcard/posts/dd.jpg")

                云机_上传文件到云机("/sdcard/posts/video.mp4", 图片地址,true)
                return js.data.textContent;
            }

        } catch (e) {
            loge(e)
        }
        长等待(15, "api.js,444")
    }

}


function 云机_获取窗口日志() {
    if (g_云手机 === false) {
        return ""
    }
    while (true) {
        logw("云机_获取窗口日志")
        try {
            let url = g_云机api地址+"/remote/instance/" + g_sid
            logw(url)
            let ret = http.httpGetDefault(url, 30 * 1000, {"instanceId": g_sid, "version": g_script_ver});

            logw(ret)
            let js = JSON.parse(ret)
            if (js.code === 200) {


                return js.data.message
            }

        } catch (e) {
            loge(e)
        }
        长等待(15, "api.js,570")
    }
}











/**
 * 上报状态增强版 解决上报频率太高和超时不上报导致的变黄的 上报触发时间 颜色变化或者时间超过1分钟 红色的强制上报
 * @param {string} color
 * @param {string} message
 * @param {boolean?} forced
 * @returns {number}
 */
function 云机_上报状态_全局(color, message, forced) {
    if (g_云手机 === false) {
        return 1
    }
    if (forced === undefined) {
        forced = false
    }
    if (color !== "red" && forced === false) {
        //logw(color,forced)
        //logw(getCtxString("color"),getCtxNumber("YunjiTtitleLastUpdateTime"))
        if (getCtxString("color","green") === color && gettime(10) - getCtxNumber("YunjiTtitleLastUpdateTime") < 120) {
            //logw("本次不上报状态"+String(gettime(10)-getCtxNumber("YunjiTtitleLastUpdateTime")))
            return 1
        }
    }
    if (color === "red") {
        //logw(getCtxString("message"),message)
        if (getCtxString("message","") === message) {
            //这里是为了防止红色的一直更新 导致后端自动处理永远达不到超时时间
            //logw("红色的 本次不上报了")
            return 1
        }

    }


    let postdata = {
        "instanceId": Number(g_sid),
        "color": color,
        "message": message
    }
    logw("上报状态" + JSON.stringify(postdata))
    while (true) {

        try {
            let ret = http.postJSON(g_云机api地址+"/remote/statusReport", postdata, 30 * 1000, {
                "instanceId": String(g_sid),
                "version": g_script_ver
            });
            logw(ret)

            let js = JSON.parse(ret)

            if (js.code === 200) {
                //logw("返回")
                g_ctx["color"] = color
                g_ctx["message"] = message
                g_ctx["YunjiTtitleLastUpdateTime"] = gettime(10)
                return 1
            }

        } catch (e) {
            loge(e)
        }
        长等待(15, "api.js,857")
    }
}

/**
 * 云机_上传文件到云机
 * @param {string} path
 * @param {string} url
 * @param {boolean} isvideo
 */
function 云机_上传文件到云机(path, url,isvideo) {
    if (g_云手机 === false) {
        return;
    }
    for (let i = 0; i < 30; i++) {


        logw("云机_上传文件到云机")
        try {
            let ret = http.postJSON(g_云机api地址+"/remote/uploadFileV2", {
                "path": path,
                "url": url,
                "id": Number(g_sid)
            }, 30 * 1000, {"instanceId": g_sid, "version": g_script_ver});
            logw(ret)

            let js = JSON.parse(ret)

            if (js.code === 200) {
                //logw("返回")

                if(isvideo){
                    utils.insertVideoToAlbum(path)
                }else{
                    utils.insertImageToAlbum(path);
                }

                return
            }

        } catch (e) {
            loge(e)
        }
        长等待(15, "api.js,887")
    }
}

function 云机_读取设备编号() {
    while (true) {
        try {
            let url = g_云机api地址+"/remote/getDeviceIdByIp";
            logw(url);
            let ret = http.httpGetDefault(url, 30 * 1000, {});
            logd(ret)
            let js = JSON.parse(ret)
            if (js.code === 200) {
                return String(js.data.deviceId)
            }
        } catch (e) {
            logd(e)

        }
        长等待(15, "api.js,907")
    }


}

/**
 * 更改设备语言为英语
 */
function 云机_设置设备语言(){
    postapi200(g_云机api地址+"/remote/setLanguage/"+g_sid+"/en_US",{},"更改设备语言")
}




function 云机_结束进程() {
    let pkgname
    if (g_云手机 === false) {
        return;

    }

    if (g_青春版) {
        pkgname = "com.facebook.lite"
    } else {
        pkgname = "com.facebook.katana"
        if (模拟人工结束进程(getCtxString("桌面应用名称",""),"api.js,834")) {
            return;
        }
    }
    while (true) {

        try {

            let ret = http.postJSON(g_云机api地址+"/remote/stopProcess/" + g_sid, {

                "packageName": " " + pkgname   //" com.facebook.katana"
            }, 30 * 1000, {"instanceId": g_sid, "version": g_script_ver});
            logw(ret)
            let js = JSON.parse(ret)

            if (js.code === 200) {

                return
            }

        } catch (e) {
            loge(e)
        }
        长等待(15, "api.js,1050")
    }
}


/**
 *
 * @param {string} command ssh命令
 * @return {boolean}
 */
function 云机_执行ssh(command){
    try {
        let ret = http.postJSON(g_云机api地址+"/remote/ssh" , {

            "command": command,"instanceId":g_sid,"timeout":5
        }, 30 * 1000, {"instanceId": g_sid, "version": g_script_ver});
        logw(ret)
        let js=JSON.parse(ret)
        if(js.code===200){
            return true
        }

    } catch (e) {
        loge(e)
    }
    return false
}

function 云机_结束进程1() {

    if (g_云手机 === false) {
        return;

    }

    模拟人工结束进程(getCtxString("桌面应用名称",""),"api.js,963")

}

/**
 *
 * @param {string} country
 * @param {string} result
 */
function 上报ip成功情况(country,result){
    postapi200(g_云机api地址+"/remote/reportIpResult",{"instanceId":Number(g_sid),"country":"","result":result},"上报ip成功情况")
}


/**
 * 云机设置代理
 * @param cc  数字的国家代码 不提供填"" 填了会修改语言时区 不填不修改
 * @returns {boolean}
 */
function 云机_设置代理( cc) {

    let countryjs, postdata

    if (g_云手机 === false) {
        return false;

    }
    if (cc === "62" || cc === "55") {
        //印尼和巴西随机分配
        proxyconfig.city=""
    }
    logw(cc)
    countryjs = 获取国家配置信息(cc)
    if(proxyconfig.country===""){
        proxyconfig.country=countryjs.phone_region
    }

    /*
    //下面3行的
    临时数组 = proxy_str.split("_")
    临时数组[2]="000"  //强制全球随机
    proxy_str = 临时数组.join("_")

    */
    if(g_lite解封模式){
        g_青春版=true
    }


    if (cc === "" || cc === undefined) {
        postdata=proxyconfig.getyunjipostdata()
        delete postdata.language
        delete postdata.timeZone
    } else {

        if (g_青春版 || g_仅上线模式) {
            proxyconfig.language="en-US"
            proxyconfig.timeZone=countryjs.proxy_timeZone
            postdata = proxyconfig.getyunjipostdata()
            //云机_设置设备语言("en-US")
        } else {
            if(proxyconfig.language===""){
                proxyconfig.language = countryjs.proxy_language
            }

            proxyconfig.timeZone = countryjs.proxy_timeZone
            postdata = proxyconfig.getyunjipostdata()
        }


    }

    postdata["taskDetailsId"] = getCtxString("恢复备份的任务id","")





    logw(JSON.stringify(postdata))
    logw("云机_设置代理")
    try {
        //这个一定要用juhe.host 不能用原始接口 原始接口非常容易超时
        let ret = http.postJSON(g_云机api地址+"/remote/startProxyV2", postdata, 30 * 1000, {
            "instanceId": g_sid,
            "version": g_script_ver
        });
        logw(ret)
        let js = JSON.parse(ret)
        if (js.code === 200) {
            return true
        }
    } catch (e) {
        loge(e)
    }
    return true

}






function 云机_消除输入法() {
    if (has(id("com.google.android.inputmethod.latin:id/key_pos_ime_action"))) {
        //输入法的对号
        //click(id("com.google.android.inputmethod.latin:id/key_pos_ime_action"))  //这里不能用封装的那个 坐标点击 用那个会出现递归调用导致崩溃
        logw("消除键盘")

        back()

        sleep(1000);
    }
}

/**
 *
 * @param ip 完整的代理地址
 * @param country  英文的
 */
function 云机_上报异常ip(ip, country) {
    let postdata = {
        "ip": ip,
        "country": country
    }
    logw("云机_上报异常ip" + JSON.stringify(postdata))

    while (true) {
        try {
            let ret = http.postJSON(g_云机api地址+"/remote/reportExceptionIp", postdata, 30 * 1000, {
                "instanceId": g_sid,
                "version": g_script_ver
            });
            logw(ret)
            let js = JSON.parse(ret)
            if (js.code === 200) {
                return 200
            }
            if (js.code === 501) {
                return 501
            }
            if (js.code === 500) {
                return 500
            }
        } catch (e) {
            logw(e)
        }
        长等待(15, "api.js,1363")
    }


}


/**
 * ig专用
 * @param {string} phone
 */
function 云机_获取代理城市编号_ig(phone) {
    igaccount.phone=phone
    let js = getapi_code200(g_云机api地址+"/remote/getInsAccountByPhone?phone=" + phone, "云机_获取代理城市编号_ig", 30 * 1000)
    if (js.data.city ) {
        proxyconfig.city = js.data.city
    }
    if (js.data.country ) {

        proxyconfig.country = js.data.country

        fbaccount.ipwebcity = js.data.country
        logw(js.data.country, fbaccount.ipwebcity)
        fbaccount.region = 英文大写国家编码转数字(js.data.country)
        logw("国家代码数字 ", fbaccount.region, " 字母 ", fbaccount.ipwebcity)

    }


    if (js.data.ip ) {
        proxyconfig.staticproxy = js.data.ip
        proxyconfig.platform="static"

    }else{
        proxyconfig.platform="ipweb"
    }

    try {
        if (js.data.twoFactor.length > 0) {
            igaccount.twofa = js.data.twoFactor
        }
        if (js.data.username.length > 0) {
            igaccount.username = js.data.username
        }
        if (js.data.password.length > 0) {
            igaccount.pwd = js.data.password
        }
        if (js.data.name.length) {
            igaccount.fullname = js.data.name
        }
        if (js.data.phone.length > 0) {
            igaccount.user = js.data.phone
        }
    } catch (e) {
        loge(e)
    }
    let countryjs = 获取国家配置信息(fbaccount.region)
    if (js.data.ipType === 1) {
        //1 动态 2 静态 和js.data.ip是有可能共存的 ipType优先  好像是历史原因设置过静态 但是后面屏蔽了静态
        proxyconfig.staticproxy = ""
        logw("清除")
        proxyconfig.platform="ipweb"
    }
    if (js.data.timeZone == null) {

        proxyconfig.timeZone = countryjs.proxy_timeZone
    } else {
        proxyconfig.timeZone  = js.data.timeZone
    }
    if (js.data.language == null) {
        proxyconfig.language  = countryjs.proxy_language
    } else {
        proxyconfig.language  = js.data.language
    }

    //return js.data.city


}


/**
 *
 * @param {number} tasktype 任务类型 1 补粉任务 2 过活任务 3标记任务
 * @param {string} state 备注 没有小人之类的
 * @param {string} result 加好友数量之类的 是json  addFriendCount
 * @param {string} color 云机标题的颜色
 * @param {string} message  云机的标题
 */
function 云机_回传任务详情结果(tasktype, state, result, color, message) {
    if(getCtxBoolean("hasEventMode")){
        g_Context["state"]=state
        上报任务完成()
        阻塞脚本()
    }
    try{
        if(g_Context["loginType"]==="auth"){
            上报ip成功情况(g_Context["targetRegion"],state)
        }
    }catch (e) {
        loge(e)
    }
    if(state.indexOf("封号")>-1){
        if(getCtxNumber("注册ins绑定邮箱的位置")===1){
            state=state+"_注册成功之前绑定的邮箱"
        }
        if(getCtxNumber("注册ins绑定邮箱的位置")===2){
            state=state+"_注册成功之后绑定的邮箱"
        }
    }


    let postdata = {
        "fbuid": fbaccount.uid,
        "type": tasktype,
        "state": state,
        "result": result,
        "instanceId": g_sid,
        "color": color,
        "message": message,
        "taskDetailsId": getCtxString("恢复备份的任务id",""),
        "hasExecuteNext":true
    }
    logw("云机_回传任务详情结果" + JSON.stringify(postdata))
    /*
    if(state==="备份异常"){
        云机_上报状态_全局("red","备份异常",true)
        阻塞脚本()
    }

     */
    let 重试次数 = 0
    while (true) {
        try {
            let ret = http.postJSON(g_云机api地址+"/remote/updateTaskResult", postdata, 30 * 1000, {
                "instanceId": g_sid,
                "version": g_script_ver
            });
            logw(ret)

            let js = JSON.parse(ret)

            if (js.code === 200) {
                home()
                sleep(2000)
                云机_结束进程()
                logw("脚本结束 陷入空循环")
                阻塞脚本()

            }
            if (js.code === 477) {
                exit()
            }
            if (js.code === 501) {
                重试次数 = 重试次数 + 1
                if (重试次数 > 1) {
                    home()
                    sleep(2000)
                    云机_结束进程()
                    logw("脚本结束 陷入空循环")
                    阻塞脚本()
                }

            }
            if (js.code === 500) {
                重试次数 = 重试次数 + 1
                if (重试次数 > 1) {
                    home()
                    sleep(2000)
                    云机_结束进程()
                    logw("脚本结束 陷入空循环")
                    阻塞脚本()
                }

            }
        } catch (e) {
            logw(e)
        }
        长等待(15, "api.js,1457")
    }
}



function 等待云机恢复完成() {

    while (true) {
        let ret = 云机_获取窗口日志()
        logw("等待云机恢复完成 " + ret)
        if (ret === "恢复完成") {
            return
        }
        if (ret === "开始验证设备在线") {
            return
        }
        if (ret === "已向脚本发起任务等待执行.") {
            return
        }
        if (ret === "重启脚本") {
            return;
        }
        if (ret === "空闲") {
            return;
        }
        长等待(15, "api.js,1494")
    }
}



function 获取jwt() {
    logw("获取设备审核结果")
    while (true) {
        try {


            let ret = http.postJSON("https://www.juhe.host/goapi/gettoken", {
                "client": 3,
                "sid": Number(g_sid),
                "pcid": "yunji",
                "groups": "云机",
                "notes": ""
            }, 30 * 1000, {"X-User-Token": g_token});
            logw(ret)
            let js = JSON.parse(ret)
            if (js.code === 1) {
                return js.data
            }


        } catch (e) {
            logw(e)
        }
        长等待(30, "api.js,1535")
    }


}



/**
 *
 * @param {string} twoFactor
 * @param {string} pk
 * @param {string} username
 * @param {string} password
 * @param {string} email
 */
function 修改ins账号2fa(twoFactor,pk,username,password,email){
    postapi200(g_云机api地址+"/remote/updateInsAccount",{"fbuid":fbaccount.uid,"twoFactor":twoFactor,"pk":pk,"username":username,"password":password,"email":email},"修改ins2fa或者pk值")
}

/**
 *
 * @param x
 * @param y
 */
function 云机_adb点击(x, y){
    // ADB 点击坐标
    云机_执行ssh("input tap "+x+" "+y)

}




/**
 * 访问fastadmin的get请求 成功才返回
 * @param {string} url  完整的geturl
 * @param {string} notes  请求备注 会输出日志
 * @param {number} timeout  超时时间 毫秒
 * @returns {{code:number,msg:string,data:null | Array | string}}  返回json对象 外部读取需要的参数
 */
function getapi_code1(url, notes, timeout) {

    while (true) {
        logw(url,notes)
        try {
            let ret = http.httpGetDefault(url, timeout, {
                "X-User-Token": g_token,
                "Authorization": "Bearer " + g_jwt,
                "Connection": "close"
            })
            logw(notes + "   " + ret)
            let js = JSON.parse(ret)
            if (js.code === 1) {
                return js
            }
        } catch (e) {
            loge(e)
        }

        长等待(15, "api.js,1952")
    }
}


function 关闭gms后台(){
    return;


}

/**
 * 访问云机的get请求 成功才返回
 * @param {string} url  完整的geturl
 * @param {string} notes  请求备注 会输出日志
 * @param {number} timeout  超时时间 毫秒
 * @returns {{code:number,msg:string,data:null | Array | string | {friendFbuid : string} | {message : string} |{isBlack: boolean} | {name:string} | {pk:string} | {url: string} | {id: string}| {twoFactor: string} | {uid: string} | {username: string} | {password: string} | {groupUrl: string} |{ipType:number}  | {friendCount:number,friends:Array} | {phone:string} | {city:string,timeZone:string,ip:string,language:string,country string}} }  返回json对象 外部读取需要的参数
 */
function getapi_code200(url, notes, timeout) {
    logw(url)

    while (true) {
        logw(notes)
        try {
            let ret = http.httpGetDefault(url, timeout, {"instanceId": g_sid, "version": g_script_ver})
            logw(notes + "   " + ret)
            let js = JSON.parse(ret)
            if (js.code === 200) {
                return js
            }

            if (js.code === 500) {
                let 需要截图=true
                if (js.msg === "账号不存在") {
                    需要截图=false

                }
                if (js.msg === "暂无可用主页") {

                    需要截图=false

                }
               // if(需要截图){
                   // 截屏上传到服务器(null, "api返回500")
                //}
                if (js.msg === "账号不存在") {
                    云机_回传任务详情结果(8, "备份异常", "", "red", "备份异常")
                    //云机_上报状态_全局("red","api返回500,请恢复下一个账号")

                    exit()
                }
                if (js.msg === "没有可用的分享链接") {
                    云机_上报状态_全局("yellow", notes + " 没有可用的分享链接")
                }
                if (js.msg === "暂无可用主页") {
                    云机_上报状态_全局("yellow",notes+" 暂无可用主页")
                    //这里return会导致后面异常
                    /*
                    错误码500次数 = 错误码500次数 + 1
                    if (错误码500次数 >= 3) {
                        return js
                    }


                     */
                }
            }
        } catch (e) {
            loge(e)
        }

        长等待(15, "api.js,1991")
    }
}







function alert_dialog(title, msg) {
    msg = msg || title
    let p = {
        "title": title,
        "msg": msg,
        "cancelable": false,
        "cancelText": "否",
        "okText": "是"
    }
    let a = 0
    ui.alert(p,
        function (dialog) {
            //让对话消失掉
            // noinspection JSUnresolvedFunction
            dialog.doDismiss()
            a = 1
            return true
        },
        function (dialog) {
            //让对话消失掉
            // noinspection JSUnresolvedFunction
            dialog.doDismiss()
            a = 2
            return true
        },
        function () {
            return true
        })
    while (a === 0) {
        sleep(200)
    }
    return a === 1
}



/**
 * @description 随机点击范围
 * @param x1 {number}
 * @param y1{number}
 * @param x2{number}
 * @param y2{number}
 * @param noDelay {boolean?}不加延迟,默认false,加延迟
 */
function clickPointRnd(x1, y1, x2, y2, noDelay) {
    clickPoint(random(x1, x2), random(y1, y2))
    if (!noDelay) {
        sleep(random(500, 1000))
    }
}








/**
 *
 * @param obj
 * @param d  毫秒的时间
 * @returns {boolean} 消失了返回true
 */
function 等待节点消失(obj, d) {
    let 开始时间 = time()

    while (time() - 开始时间 < d) {

        if (has(obj)) {
            sleep(2000);
        } else {
            return true
        }
        sleep(500);
    }
    return false
}
