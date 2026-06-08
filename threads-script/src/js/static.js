fbaccount = {}
igaccount = {}
igaccount.fullname = ""
igaccount.username = ""
igaccount.pwd = ""
igaccount.phone = ""
igaccount.twofa = ""
igaccount.pk = ""
igaccount.status = ""
igaccount.email = ""
igaccount.emailcode=""  //邮箱验证码

fbaccount.user = "" //用户名 注册或者登陆的那个 这个好像只有手机号 fb和ins不一样
fbaccount.pwd = ""  //密码
fbaccount.twofa = ""  //2fa
fbaccount.fullname = "" //昵称 可以重复的那种 不是个性签名
fbaccount.phone = ""  //手机号 这个可空
fbaccount.region = "" //手机号的国家代码 这个是标准的 2个字母的那种 不是火狐狸的那种 这个就是手机号的 和rola 火狐狸 ipweb这些没关系

fbaccount.email = ""  //手机号 这个可空
fbaccount.notes = "" //账号备注 封号的提示之类的内容
fbaccount.ipcity = ""  //ip国家 rola和ipweb的 使用的时候注意转换大小写
fbaccount.ip = ""  //注册的ip
fbaccount.bindemail = false //是否绑定邮箱
fbaccount.changephone = false //是否修改手机号
fbaccount.isblock = false //是否封号了
fbaccount.isblocknotes = ""  //封号原因 后面区分数据有点用
fbaccount.isupdate = false //如果数据有变动就更新这个字段的值
fbaccount.openamg = true  //切换amg
fbaccount.loadcontacts = true
fbaccount.username = "" //在网页中可以跳转的那个username
fbaccount.proxy = "" //登陆的时候会有这个 注册的没有 因为有一些是静态线路
fbaccount.mysqlid = 0  //账号的数据库记录id
fbaccount.gps = "" //经纬度 用逗号分割的
fbaccount.cityname = ""  //经纬度对应的城市 微霸那里用
fbaccount.iptype = ""  //登陆的时候用的 主要是区分忍者云
fbaccount.ipwebcity = "BR"  //ipweb的国家代码

fbaccount.uid = ""
fbaccount.nick = ""  //这个其实是注册的名字
fbaccount.ipaddr = ""
fbaccount.avatar_group = ""
//不需要修改
fbaccount.gettwofa = function (twofa) {

    //设置监听点("获取2fa结果 需要在instagram输入2fa内容页面")
    while (true) {

        try {
            let tfa = twofa !== undefined ? twofa : fbaccount.twofa
            let ret = http.httpGetDefault("https://" + g_domain + "/goapi/twofactor/getcode?code=" + tfa, 30 * 1000, {
                "X-User-Token": g_token,
                "Authorization": "Bearer " + g_jwt,
                "Connection": "close"
            });
            logw(ret)
            let js = JSON.parse(ret)
            if (js.code === 1) {
                return js.msg
            }
        } catch (e) {
            loge(e)
        }
        loge("获取2fa失败")
        sleep(5000);
    }


}



















function 点击图标启动app(appname) {
    // while (true){
    if (appname === "" || appname === undefined) {
        appname = "Facebook"
    }
    if(getCtxBoolean("首次不启动目标app")){
        //执行上一行恢复任务之前调用 g_ctx["首次不启动目标app"]=true 可以避免重新打开应用
        g_ctx["首次不启动目标app"]=false
        return;
    }
    云机_上报状态_全局("green","点击桌面图标启动 " + appname,true)
    logw("点击桌面图标启动fb " + appname)
    home()
    sleep(2000)

    if(clickpoint_selector(desc(appname))===false){
        云机_上报状态_全局("red","手机桌面没有"+appname,true)
        removeNodeFlag(0)
        //长等待(120,"手机桌面没有"+appname)
    }
    let 在桌面次数=0
    //长等待(30,"static.js,1937")
    sleep(5000)
    let page
    for (let i = 0; i < 30; i++) {
        sleep(1000)
        releaseNode()
        lockNode()
        page = Instagram_获取页面信息_("点击图标启动app")
        releaseNode()
        loge("点击图标启动app " + page.join("----"))

        if (page.length === 0 || page.indexOf("手机桌面")>-1) {  //忽略page.indexOf检查



            if (has(text("Google Play services").pkg("com.android.settings"))) {
                clickpoint_selector(id("com.android.systemui:id/back"))
                continue
            }
            if (语言转换_desc("设置菜单", {"pkg": "com.android.launcher3"})) {
                if(appname==="Instagram"){
                    //检测闪退
                    在桌面次数=在桌面次数+1
                    //if(Number(云机_执行ssh_返回结果("logcat -b crash -d | grep com.instagram.android | grep DEBUG | wc -l"))>0){
                    if(在桌面次数>=10){

                        云机_回传任务详情结果(8, "缺少目标app", JSON.stringify({"ig闪退": {  "开始时间": gettime(10), "结束时间": gettime(10) }}), "red", "ig闪退")
                        阻塞脚本()
                    }

                }


                if(clickpoint_selector(desc(appname))===false){
                    logw("滑动桌面再启动")
                    swipeToPoint(579,738,104,697,400)
                    sleep(5000)
                    if(clickpoint_selector(desc(appname))===false){
                        //截屏上传到服务器(null,"缺少目标app")

                        云机_回传任务详情结果(8, "缺少目标app", JSON.stringify({"缺少目标app": {  "开始时间": gettime(10), "结束时间": gettime(10),"应用名称":appname }}), "red", "缺少目标app"+appname)
                        阻塞脚本()

                    }
                }
                removeNodeFlag(0)
                //长等待(30,"static.js,1937")
                sleep(5000)
                continue
            } else {
                releaseNode()
                logw("不在手机桌面")
                if(appname==="Threads" ){
                    return;
                }
            }
            /*
            //容易出现递归
            try{
                if(id("android:id/content").getOneNodeInfo(0).child(0)===null){  //忽略go检查
                    logw("可能是无效节点页面")
                    重启fb()
                    continue
                }
            }catch (e) {
                loge(e)
            }

             */
        }
        if(page.indexOf("ig需要修改密码")>-1){
            if(waitExistNode_自定义(text("New password"),10*1000)){
                let new_password=laoleng_RndStr_caseAndNum2(random(10,13))
                sleep(1000)

                inputText(text("New password"),new_password)
                sleep(1000)
                inputText(text("Verify password"),new_password)
                sleep(1000)
                clickpoint_selector(desc("Submit"))
                长等待(20,"222")
                修改ins账号2fa("","","",new_password,"")
                igaccount.pwd=new_password
                截屏上传到服务器(null,"修改密码了") //不确定后续流程
                g_ctx["结束脚本"]=true
                return;
            }else{
                截屏上传到服务器(null,"修改密码没有输入框") //不确定后续流程
            }
        }
        if(page.indexOf("通知")>-1){
            clickpoint_selector_descMatch("顶部小房子")
            continue
        }
        if (page.indexOf("封号了") > -1) {
            break
        }
        if (page.indexOf("结束脚本") > -1) {
            break
        }
        if (page.length > 0 && page.indexOf("循环") === -1) {  //忽略page.indexOf检查
            长等待(random(3, 6), "点击图标启动app")
            break
        }
        if(page.indexOf("短视频")>-1){
            clickpoint_selector_descMatch("顶部小房子")
        }
        if(语言转换_desc("主页发帖框1")){
            云机_上报状态_全局("green","在fb主页",true) // 防止变黄
            return;
        }
        if(page.indexOf("此页面当前不可用")>-1){
            return;
        }
        if("Instagram Lite"===appname){
            if(has(id("com.instagram.lite:id/main_layout"))){
                return
            }
        }
        if(appname==="Instagram"){
            if(has(textMatch("What.* your mobile number."))){
                return;
            }
            if(has(id("com.instagram.android:id/title_logo"))){
                return;
            }
            if(has(text("Swipe to easily access Reels and messages"))){
                clickpoint_selector(id("com.instagram.android:id/igds_headline_primary_action_button"))
                return;

            }
        }
        if(appname==="Messenger"){
            if(has(id("android:id/content").pkg("com.facebook.orca"))){
                return;

            }
        }

    }


    // }
}





/**
 *
 * @param {number} count
 * @return {string}
 * @constructor
 */
function RndStr_casesnum(count) {

    let text = '1234567890', ret = ''
    for (let i = 0, len = text.length - 1; i < count; i++) {
        ret += text[random(0, len)]
    }
    return ret
}










function main() {
    //提取文件里面的tag()
    //logw(千问筛选tag("카포에이라"))
    //exit()
    //输出需要修改语言的()
    // exit()
    /*
        启动代理环境(false)
        图色初始化()
        g_token="222"
        g_pcid="1"
        g_sid="222"

        截屏上传到服务器(null,"测试")
        exit()

     */
    file.mkdirs("/sdcard/posts")
    file.mkdirs("/sdcard/cache/")
    file.mkdirs("/sdcard/aaa/截图/")
    启动代理环境(false)
    //g_全球语言包=加载全局语言包()
    在服务器获取语言文件()

    勾选图色权限()
    图色初始化()


    image.setFindColorImageMode(2)

    //initOcrpaddle()
    /*
    if (utils.isAppExist("uni.app.UNIF0A3F82")) {
        shell.uninstallApp("uni.app.UNIF0A3F82")
    }
    if (utils.isAppExist("com.fbanzhuo.katana")) {
        shell.uninstallApp("com.fbanzhuo.katana")
    }

     */
    // let osVersion = device.getOSVersion();
    //logw(osVersion)  //这个好像有些时候获取不到

    let osVersion = String(device.getOSVersion());
    logw(osVersion)
    if (osVersion === "9") {
        logw("模拟器")
        g_云手机 = false
    } else {
        logw("云机")
        g_云手机 = true
    }


    if (g_云手机) {
        if(has(id("com.android.systemui:id/back"))){
            设备高度=1208  //云机屏蔽下面的导航菜单
        }

        g_sid = 云机_读取设备编号()
        //g_sid=g_sid.replace(/\s+/g, '');
        if (g_sid === "") {
            alert_dialog("提示", "没有读取到云机编号")
            exit()
        }

    } else {


        g_sid = readConfigString("ui_sid")
    }


    //logd("脚本版本号"+String(g_script_ver))
    if (g_云手机) {
        g_pcid = "yunji"
        //g_token = readConfigString("token")

        g_token = "8167003faab82ce3b64c87aa7da34cac"  //固定值



        g_jwt = 获取jwt()


    }




    if (g_sid === "") {

            alert_dialog("提示", "设备编号未设置 无法启动")
            exit()


    }
    if (g_sid.indexOf(".") > -1 || g_sid.indexOf("-") > -1) {
        alert_dialog("提示", "模拟器/云手机编号错误 请手动设置")
        exit()
    }
    g_sid = g_sid.replace(/\s/g, '');

    fbaccount.gps = "-46.6364,-23.5480"



    //logw("触发更新了")

    if (startWithStr(g_token, "-")) {

        g_token = g_token.substring(1)

    }

    if (startWithStr(g_jwt, "-")) {

        g_jwt = g_jwt.substring(1)

    }
    模拟测试()
    脚本更新()
    登记设备()



    logw(g_domain, g_token)


    showLogWindow();
    setLogViewSizeEx({
        "x": 0,
        "y": 100,
        "w": 200,
        "h": 400,
        "textSize": 12,
        "backgroundColor": "#336699",
        "title": g_pcid + "_" + g_sid,
        "showTitle": true
    });
    sleep(1000);
    closeLogWindow()

    //云机启动
    执行最后一次的恢复任务()

//=========================这里写ws的部分==================
//
    let result = [];
//新建一个ws连接
    //logw("wss://" + g_domain + "/ws/token/" + String(g_sid))
    var ws = http.newWebsocket("wss://" + g_domain + "/ws/token/" + String(g_sid), {   //忽略全局变量检查
        "X-User-Token": g_token,
        "Authorization": "Bearer " + g_jwt
    }, 1);
// 设置type=1的时候链接参数
    ws.setCallTimeout(5);
    ws.setReadTimeout(5);
    ws.setWriteTimeout(5);
    //心跳检测
    ws.setPingInterval(10)

//设置连接打开的时候监听器
    ws.onOpen(function (ws1, code, msg) {
        logi("onOpen code " + code + "  msg:" + msg);
        /*
        if(g_云手机){
            if(code==101){
                thread.execAsync(function () {
                    let 云机日志=云机_获取窗口日志()
                    if(云机日志=="重启脚本"){
                        云机_上报状态_全局("green","空闲")
                    }

                })
            }
        }


         */


    })
//设置有文本信息监听器
    ws.onText(function (ws1, txt) {
        if (txt === "ok") {
            return
        } else {
            /*
            if (txt === "exit") {
                logi("token失效")
                exit()
            }

             */
            logi(" onText " + txt);
        }

        try {

            /**
             *
             * @type {{add_friend_count:number,taskDetailId:string,tag_action:string,newscript:string,friends_city:string,cmd:string,addnum:number,cc:string,num:number,iptype:string,ipwebcity:string,cc2:number,gender:string,SMS_platform:string,avatar_group:string,change_ip_city:string,taskid:string,count_:string,fbuid:string,comment:string,title:string,scriptcode:string}}
             */




            let js = JSON.parse(txt)

            g_接收的内容 = js
            let cmd = js.cmd
            logd("[" + cmd + "]")







            if (cmd === "停止正在执行的脚本") {
                thread.stopAll()

            }
            if (cmd === "getui") {
                //thread.stopAll()
                thread.execAsync(function () {
                    截屏上传到服务器(null, "主动截屏")
                });
            }
            if (cmd === "getui2") {
                //thread.stopAll()
                thread.execAsync(function () {
                    let title = g_接收的内容.title  //标记数量
                    if (title === undefined) {
                        title = ""
                    }
                    if (title.indexOf("尝试唤醒") > -1) {

                        let 窗口日志 = 云机_获取窗口日志()

                        云机_上报状态_全局("green", 窗口日志)
                    }
                    截屏上传到服务器(null, "机器人主动截屏_" + title)
                });
            }
            if (cmd === "executable_code") {
                //thread.stopAll()
                thread.execAsync(function () {
                    try {
                        let 脚本代码 = g_接收的内容.scriptcode
                        if (g_接收的内容.hasOwnProperty("taskDetailId")) {
                            if(getCtxBoolean("已经启动任务")){
                                loge("重复任务忽略执行")
                                return
                            }
                            g_ctx["已经启动任务"]=true
                            g_ctx["恢复备份的任务id"] = g_接收的内容.taskDetailId
                            长等待(10,"延迟执行")
                        }
                        logw(脚本代码);
                        execScript(2, 脚本代码)
                    } catch (e) {
                        loge(e)
                    }


                });
            }
            if (cmd === "弹出窗口") {
                thread.execAsync(function () {
                    alert_dialog("中控弹窗", "设备号:" + g_pcid + "-" + g_sid)
                });
            }

            if (cmd === "更新脚本") {


                thread.execAsync(function () {
                    脚本更新()
                });
            }

            if (cmd === "弹出设备id") {


                thread.execAsync(function () {
                    alert_dialog(g_pcid + "-" + g_sid)
                });
            }


            //ws处理线程

        } catch (e) {
            loge(e)
        }

    })
//设置关闭时候的监听器
    ws.onClose(function (ws1, code, reason) {
        logi(" onClose  " + code + "  reason : " + reason + " remote:");
    })
    ws.onError(function (ws1, msg) {
        logi(" onError  " + msg);
        result[0] = "error";
    })


//每20秒 发送一次文本心跳数据
    ws.startHeartBeat(function () {
        return null;
    }, function () {
        return new Date().toISOString();
    }, 20 * 1000, true);


//停止发送心跳
//ws.stopHeartBeat()

//开始连接   阻塞的
    let r = ws.connect(10000);
//设置自动重连
    ws.setAutoReconnect(true);
    logd("connect {} rr = {}", result[0], r);
    let t_token = g_token
    while (true) {

        //logd("isconnect " + ws.isConnected());
        //长等待(30,"static.js,4813")
        for (let wsi = 0; wsi < 30; wsi++) {
            sleep(1000)
        }
        if (ws.isConnected()) {
            //这里不发送内容
            sleep(1000)
            //logi("发送心跳包")
            ws.sendText(t_token)  //定时传token
        } else {
            logd("可能需要重置连接")
            //重置链接
            /*
                           let reset = ws.reset();
                           logd("reset {}",reset)
                           if (reset) {
                              logd("开始重连...");
                                let rc = ws.connect(10000);
                                logd("重连--> "+rc);
                           }

             */
        }
    }
    //logd("isClosed " + ws.isClosed())
    //sleep(1000)
//关闭连接
    // ws.close();


}







/**
 *
 * @param {number} n 秒
 * @return {boolean} true消失了 false 没有消失
 */
function 等待加载中消失(n) {
    logw("等待加载中消失,时长"+String(n)+"秒")
    for (let i = 0; i < n; i++) {
        removeNodeFlag(0) //不加这个有些时候页面不更新
        if (语言转换_text("Loading") === false ) {
            if(语言转换_desc("Loading") === false){
                return true

            }

        }
        sleep(1000);
    }
    return false

}











function waitExistNode_自定义(node, d) {
    if (d === undefined) {
        d = 5000
    }
    //logi(node)
    //logw(JSON.stringify(node))
    //logi(typeof(node))
    let s = gettime(13)
    while (Math.abs(gettime(13) - s) < d) {

        if (has(node)) {

            return true
        }
        sleep(500);
    }

    return false
}




/**
 *
 * @param {number} count
 * @return {string}
 * @constructor
 */
function RndStr_cases(count) {

    let text = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', ret = ''
    for (let i = 0, len = text.length - 1; i < count; i++) {
        ret += text[random(0, len)]
    }
    return ret
}















function 获取节点文本特征() {

    let list = []
    let node = textMatch(".+").getNodeInfo(0)
    if (node) {
        for (let i = 0; i < node.length; i++) {
            //logw(node[i].text)
            /*
            if(node[i].pkg==="com.android.systemui"){
                if(node[i].bounds.bottom<40){
                    //屏蔽一部分顶部的信息 减少顶部时间的干扰
                    continue
                }
            }

             */
            list.push(node[i].text)
        }
    }

    node = descMatch(".+").getNodeInfo(0)
    if (node) {
        for (let i = 0; i < node.length; i++) {
            //logw(node[i].desc)
            /*
            if(node[i].pkg==="com.android.systemui"){
                if(node[i].bounds.bottom<40){
                    //屏蔽一部分顶部的信息 减少顶部时间的干扰
                    continue
                }
            }

             */
            list.push(node[i].desc)
        }
    }
    node = idMatch(".+").getNodeInfo(0)
    if (node) {
        for (let i = 0; i < node.length; i++) {
            //logw(node[i].id)
            /*
            //会导致需要看日志的时候看不到
            if(node[i].pkg==="com.android.systemui"){
                if(node[i].bounds.bottom<40){
                    //屏蔽一部分顶部的信息 减少顶部时间的干扰
                    continue
                }
            }

             */
            list.push(node[i].id)
        }
    }

    return utils.dataMd5(list.join("\r\n"))

}

function 获取节点文本() {

    let list = []
    let node = textMatch(".+").getNodeInfo(0)
    if (node) {
        for (let i = 0; i < node.length; i++) {
            //logw(node[i].text)
            if(node[i].pkg==="com.android.systemui"){
                //系统节点 垃圾信息
                continue
            }
            if(node[i].pkg==="com.gibb.easyclick"){
                //系统节点 垃圾信息
                continue
            }
            list.push(node[i].text)
        }
    }
    list.push("==========")
    node = descMatch(".+").getNodeInfo(0)
    if (node) {
        for (let i = 0; i < node.length; i++) {
            //logw(node[i].desc)
            if(node[i].pkg==="com.android.systemui"){
                //系统节点 垃圾信息
                continue
            }
            if(node[i].pkg==="com.gibb.easyclick"){
                //系统节点 垃圾信息
                continue
            }
            list.push(node[i].desc)
        }
    }
    list.push("==========")
    node = idMatch(".+").getNodeInfo(0)
    if (node) {
        for (let i = 0; i < node.length; i++) {
            //logw(node[i].id)
            if(node[i].pkg==="com.android.systemui"){
                //系统节点 垃圾信息
                continue
            }
            if(node[i].pkg==="com.gibb.easyclick"){
                //脚本节点 垃圾信息
                continue
            }
            if(node[i].id==="com.facebook.orca:id/(name removed)"){
                continue
            }
            if(node[i].id==="com.gibb.easyclick:id/st_ctrl_iv"){
                //脚本节点 垃圾信息
                continue
            }
            if (node[i].id==="com.instagram.android:id/action_bar_root") {
                //垃圾id
                continue
            }
            if (node[i].id==="com.instagram.android:id/layout_container_parent") {
                continue
            }
            if (node[i].id==="android:id/content") {
                continue
            }
            if (node[i].id==="com.instagram.android:id/layout_container_main") {
                continue
            }
            if(node[i].id==="com.facebook.katana:id/(name removed)"){
                //垃圾id
                continue
            }
            list.push(node[i].id)
        }
    }

    return list.join("----") + "=======================----"

}

function 界面截屏和xml保存在本地(path) {
    let uimd5 = ''
    file.deleteAllFile("/sdcard/tmp.zip")
    try {
        sleep(2000);

        let cap = image.captureScreenBitmap("jpg", 0, 0, device.getScreenWidth(), device.getScreenHeight(), 10);
        if (cap) {
            image.saveBitmap(cap, "jpg", 30, path + ".jpg");
            //图片要回收
            image.recycle(cap)
            logw("截图成功")
        } else {
            loge("截图失败")
            return "截图失败"
        }

        let xmldata = dumpXml()
        file.writeFile(xmldata, path + ".uix")
        uimd5 = 获取节点文本特征()

        let logdata = 读取最后一个日志文件()
        //logw(logdata.length)
        if (logdata.length > 0) {
            file.writeFile(logdata, path + ".txt")
        }
        //压缩
        let zipFile = "/sdcard/tmp.zip"
        //压缩文件

        let files = [path + ".txt", path + ".uix"]
         utils.zip(zipFile, "", files);
        //logd("压缩结果: "+re);

        logw("截图成功")

        return uimd5
    } catch (e) {
        logw(e)
    }
    return ""


}

function 勾选图色权限() {

    thread.execAsync(function () {
        for (let i = 0; i < 30; i++) {
            //葡萄牙语
            if (has(textMatch("* começará a capturar tudo o que for exibido na tela."))) {
                sleep(1000);
                click(id("com.android.systemui:id/remember"))
                sleep(1000);
                click(text("INICIAR AGORA"))
                sleep(1000);
                logw("点击了")
                return;
            }
            //下面这个是云机的 葡萄牙语
            if (has(textMatch("* Iniciar grava.* transmiss.*ace.*"))) {
                sleep(1000);

                click(text("INICIAR AGORA"))
                sleep(1000);
                logw("点击了")
                return;
            }

            sleep(1000);
            //界面特征文本.push(获取节点文本())
        }
        //file.writeFile(界面特征文本,"/sdcard/uiinfo.txt")
    });


}



function 清理可能存在的历史图片(){
    logw("清理可能存在的历史图片")
    //"/sdcard/截屏"
    for (let j = 0; j <5 ; j++) {
        try {
            let filelist=file.listDir("/sdcard/")
            if(filelist){
                for (let i = 0; i <filelist.length ; i++) {
                    if(filelist[i].indexOf("/截屏")>-1){
                        file.deleteAllFile(filelist[i])
                    }
                }
            }else{
                break
            }
        }catch (e) {
            loge(e)
        }

    }

}
/**
 *
 * @param 屏蔽的节点数组 有些节点存在的情况下不上传截图 空填null 否则是数组
 *     多个节点同时判断的 外部控制
 * @param 备注  一般就是日志内容
 */
function 截屏上传到服务器(屏蔽的节点数组, 备注) {
    logw(获取节点文本())
    if(备注.indexOf('%')>-1){
        备注=备注.replace('%','')

    }
    if(备注==="机器人主动截屏_尝试唤醒:sms平台账号被禁用,一分钟以后重试"){
        return;
    }
    logw("截屏上传到服务器 " + 备注)
    if (屏蔽的节点数组 != null) {
        for (let i = 0; i < 屏蔽的节点数组.length; i++) {
            if (has(屏蔽的节点数组[i])) {
                return
            }

        }
    }

    let js

    let save_path = "/sdcard/截屏" + gettime(13)
    //logw("截屏文件名"+save_path)
    let uimd5 = 界面截屏和xml保存在本地(save_path)  //截屏是有可能失败的


    if (uimd5 === "截图失败") {
        file.deleteAllFile(save_path + ".txt")



        return;
    }

    let ret = http.httpPost("https://www.juhe.host/api/screenshot/screenshot_query", {
            "appname": "dm",
            "uimd5": uimd5,
        "notes":备注
        }, null
        , 30 * 1000, {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"})
    logd(ret)
    try {
        js = JSON.parse(ret)
        if (js.msg === "ok") {
            logw("已经存在截图")
            file.deleteAllFile(save_path + ".jpg")
            file.deleteAllFile(save_path + ".png")
            file.deleteAllFile(save_path + ".uix")
            file.deleteAllFile("/sdcard/tmp.zip")
            file.deleteAllFile(save_path + ".txt")

            //设置服务器日志和执行操作("空闲:截屏成功","")

            return;
        }
    } catch (e) {
        loge(e)

        loge("截图查询失败")
    }


    ret = http.httpPost("https://www.juhe.host/api/screenshot/upload", {
        "appname": "dm",
        "notes": 备注,
        "pcid": g_pcid,
        "sid": g_sid,
        "scriptver": g_script_ver,

        "uimd5": uimd5,
        "fbuid": fbaccount.uid
    }, {
        "png": save_path + ".jpg",
        "uix_and_log": "/sdcard/tmp.zip"
    }, 30 * 1000, {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"})

    logd(ret)
    try {
        js = JSON.parse(ret)
        if (js.msg === "ok") {
            logi("截图上传成功")
            //设置服务器日志和执行操作("空闲:截屏成功","")
        }
    } catch (e) {
        loge(e)
        loge("失败")
    }
    file.deleteAllFile(save_path + ".jpg")
    file.deleteAllFile(save_path + ".png")
    file.deleteAllFile(save_path + ".uix")
    file.deleteAllFile("/sdcard/tmp.zip")
    file.deleteAllFile(save_path + ".txt")
    //高频截图大概1分钟一次 3分钟足够了
    if(gettime(10)- getCtxNumber("上次截图时间")>3*60){
        g_ctx["累计截图次数"]=0
    }
    g_ctx["上次截图时间"]=gettime(10)
    if(getCtxNumber("累计截图次数")>10){
        g_ctx["累计截图次数"]=0
        云机_上报状态_全局("red","可能卡死请人工处理,脚本暂停",true)
        setScriptPause(true,0)
    }

    addCtxNumber("累计截图次数",1)
}



function 清理aaa文件夹() {

    //g_script_ver
    let list = file.listDir("/sdcard/aaa/")
    if (list) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].indexOf(".iec") > -1) {
                let ver = 文本_取左边(list[i], ".iec")
                if (String(ver) < g_script_ver) {
                    file.deleteAllFile(list[i])
                }
            }
            /*
            if (list[i].indexOf(".txt") > -1) {
                file.deleteAllFile(list[i])
            }

             */
        }
    }


}
/**
 * 结束进程再启动fb到主页
 * @param {string} 重启原因
 * @return {boolean}
 */
function 重启fb(重启原因) {
    if(重启原因==="首页停留次数太多"){
        截屏上传到服务器(null,"首页停留次数太多")
        云机_上报状态_全局("red","需要测试的窗口,首页停留次数太多",true)
        setScriptPause(true,0)
        exit()
    }
    g_ctx["帖子公开模式设置次数"] = 0
    云机_上报状态_全局("green", "重启fb_原因:"+重启原因, true)
    logw("重启fb")
    if (getCtxNumber("进程结束次数") >= getCtxNumber("进程最大结束次数")) {
        g_ctx["结束脚本"] = true
        logw("fb结束次数超过3次")
        return false
    }
    通用_结束进程再启动2(getCtxString("启动的应用包名",""), getCtxString("桌面应用名称",""))
    云机_上报状态_全局("green", "重启fb完成", true)
    return true
}





/**
 *
 * @param {number} num
 * @param {string} 返回原因
 */
function 按返回键(num,返回原因) {
    logw("按" + num + "次 返回键  "+返回原因)
    for (let i = 0; i < num; i++) {
        /*
        //会导致在reels播放页面不返回
        if (语言转换_desc("fb主页图标")) {
            logw("有主页图标 不返回")
            break
        }

         */
        back()
        sleep(random(1000, 3000))
    }
    releaseNode()
    removeNodeFlag(0)
    sleep(1000)
}



