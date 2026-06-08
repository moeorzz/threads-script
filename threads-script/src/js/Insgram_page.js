//忽略封号了检查  //忽略结束脚本检查
//忽略page.indexOf检查
//已经锁定节点
//测试代码
//忽略go检查
//忽略全局变量检查
/**
 *
 * @param {"com.facebook.katana" | "com.facebook.lite"} app包名
 * @param {"Facebook" | "Lite"} 启动的应用
 */

function 通用_结束进程再启动2(app包名, 启动的应用) {
    logw("通用_结束进程再启动2")

    if (语言转换_desc("再试一次")) {
        if (getCtxNumber("点击了重试次数") === 0) {
            clickpoint_selector_desc("再试一次")
            sleep(5000)
            CtxIncr("进程结束次数")
            //g_ctx["进程结束次数"]=g_ctx["进程结束次数"]+1
            g_ctx["上次结束时间"] = gettime(10)
            CtxIncr("点击了重试次数")
            return
        }

    }
    //截屏上传到服务器(null,"通用_结束进程再启动_new")

    home()
    sleep(1000)
    云机_结束进程1()
    if (proxyconfig.isStaticProxy()) {
        if(getCtxBoolean("重启不切换ip")){
            g_ctx["重启不切换ip"]=false
        }else{
            设置代理(true, "", "")
        }

    }
    长等待(10, "addfriends2.js,61")
    点击图标启动app(启动的应用)
    sleep(3000);
    CtxIncr("进程结束次数")

    g_ctx["上次结束时间"] = gettime(10)

}


function 封号事件拦截(notes){
    fbaccount.isblock = true
    let 确定是封号=false
    let 节点文本=获取节点文本()
    节点文本=节点文本.replaceAll("\n"," ")
    if(节点文本.indexOf("confirm you're human to use your account")>-1){
        确定是封号=true
    }
    if(节点文本.indexOf("We suspended your account")>-1){
        确定是封号=true
    }
    if(节点文本.indexOf("Confirm it's you to use your account")>-1){
        确定是封号=true
    }
    if(节点文本.indexOf("confirme que você é humano para usar sua conta")>-1){
        确定是封号=true
    }
    if(节点文本.indexOf("confirm that you're human to use your account")>-1){
        确定是封号=true
    }
    if(节点文本.indexOf("konfirmasikan bahwa Anda adalah manusia untuk menggunakan akun Anda")>-1){
        确定是封号=true
    }
    if(节点文本.indexOf("conferma di essere una persona reale per usare il tuo account")>-1){
        确定是封号=true
    }
    if(节点文本.indexOf("confirma que eres una persona real para usar tu cuenta")>-1){
        确定是封号=true
    }
    if(节点文本.indexOf("Konfirmasikan bahwa ini Anda untuk menggunakan akun Anda")>-1){
        确定是封号=true
    }
    if(节点文本.indexOf("Confirme que você é humano para usar sua conta")>-1){
        确定是封号=true
    }
    if(节点文本.indexOf("Confirm you are human")>-1){
        //好像是谷歌验证码 没加载出来
        确定是封号=true
    }
    if(节点文本.indexOf("Start video selfie")>-1){
        //视频自拍
        确定是封号=true
    }
    if(节点文本.indexOf("Confirm you're human")>-1){

        确定是封号=true
    }
    if(节点文本.indexOf("Start security steps")>-1){
        //Start security steps
        确定是封号=true
    }
    if(节点文本.indexOf("Confirm it's you to use your account")>-1){

        确定是封号=true
    }
    if(节点文本.indexOf("log in with another device to unlock your account")>-1){
        //Start security steps
        确定是封号=true
    }
    if(节点文本.indexOf("Iniciar selfie de vídeo")>-1){
        //视频自拍
        确定是封号=true
    }
    if(节点文本.indexOf("confirm this is your account to unlock it")>-1){
        //账号锁定
        确定是封号=true
    }
    if(节点文本.indexOf(", review your login info to unlock your account")>-1){
        //账号锁定
        确定是封号=true
    }
    if(节点文本.indexOf("Confirma que eres una persona real para usar tu cuenta")>-1){
        //账号锁定
        确定是封号=true
    }
    if(节点文本.indexOf("Konfirmasikan bahwa Anda adalah manusia untuk menggunakan akun Anda")>-1){
        //账号锁定
        确定是封号=true
    }
    if(节点文本.indexOf("Enter the characters you see")>-1){
        //图片的数字字母验证码
        确定是封号=true
    }
    if(确定是封号 && notes!=="处理备份异常"){
        if(fbaccount.uid.length>0){
            //防止注册的时候 还没成功封号导致卡死
            let 桌面应用名称=getCtxString("桌面应用名称","")
            logw(桌面应用名称)
            if( 桌面应用名称==="Messenger" || 桌面应用名称==="Facebook"){
                postapi200(g_云机api地址+"/remote/markAccountAsBanned/"+fbaccount.uid,{},"标记账号封号")
            }
            if( 桌面应用名称==="Instagram" ){
                if(notes!=="ins设置2fa" && notes!=="ins走注册" && notes!=="ins20260311授权方案" ){
                    postapi200(g_云机api地址+"/remote/markInsAccountAsBanned/"+fbaccount.uid,{},"标记ins账号封号")
                }

            }
        }

        return true
    }
    if(确定是封号){
        return true
    }
    截屏上传到服务器(null,"封号了")
return false
}






/**
 * 屏蔽go代码检查用的
 * @param notes
 * @return {*[]}
 * @constructor
 */
function Instagram_获取页面信息_调用一次(notes){
    let page
    lockNode()
    page= Instagram_获取页面信息_(notes) //忽略封号了检查  //忽略结束脚本检查
    releaseNode()
    return page
}
function Instagram_获取页面信息_(notes) {   //忽略封号了检查  //忽略结束脚本检查
    if(getCtxBoolean("结束脚本")){
        return ["结束脚本"]
    }
    //这里存在一种情况 就是一个页面有多个特征 会被先遇到的特征跳出 导致永远无法获取到后面的特征
    let selectors = []
    let node

    if(has(desc("Logging you in..."))){
        selectors.push("正在登录")
    }
    if (语言转换_desc("设置菜单", {"pkg": "com.android.launcher3"})) {
        selectors.push("手机桌面")
    }


    return selectors

}


function countContinuousValues(page, pageCount) {
    // 1. 数组去重
    let uniqueArr = [];
    for (let i = 0; i < page.length; i++) {
        if (uniqueArr.indexOf(page[i]) === -1) {
            uniqueArr.push(page[i]);
        }
    }

    // 2. 空数组：空值+1，超过5清空所有
    if (uniqueArr.length === 0) {
        pageCount['空值'] = (pageCount['空值'] || 0) + 1;

        if (pageCount['空值'] > 5) {
            for (let k in pageCount) {
                if (pageCount.hasOwnProperty(k)) {
                    delete pageCount[k];
                }
            }
            pageCount['空值'] = 6;
        }
        return;
    }

    // 3. 非空数组：空值强制=0
    pageCount['空值'] = 0;

    // 4. 本次出现的key：存在+1，不存在=1
    for (let k = 0; k < uniqueArr.length; k++) {
        let  key = uniqueArr[k];
        if (pageCount.hasOwnProperty(key)) {
            pageCount[key] = pageCount[key] + 1;
        } else {
            pageCount[key] = 1;
        }
    }

    // 5. 未出现的key：全部置0
    for (let key in pageCount) {
        if (pageCount.hasOwnProperty(key) && key !== '空值') {
            if (uniqueArr.indexOf(key) === -1) {
                pageCount[key] = 0;
            }
        }
    }
    // 6. 重复出现的特别大的截图
    for (let key in pageCount) {
        if (pageCount.hasOwnProperty(key) ) {
            if(pageCount[key]%10===0 ){
                //首页养号之类的可能会一直触发 后面再补
                logw(JSON.stringify(pageCount))
                截屏上传到服务器(null,"可能卡死")
                return;
            }
        }
    }
}