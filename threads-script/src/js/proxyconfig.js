//云机代理信息 这个太多地方 太多逻辑修改目前替换不了 原因是注册的恢复备份处理的不一样
proxyconfig={}
proxyconfig.user=""
proxyconfig.pwd=""  //密码
proxyconfig.host=""  //服务器
proxyconfig.port=""  //端口号
proxyconfig.country=""  //国家
proxyconfig.city=""  //城市
proxyconfig.expire="" //时效
proxyconfig.platform="" //代理平台 ipweb 或者 static(静态ip专属) 需要赋值 proxyconfig.staticproxy
proxyconfig.language="" //语言
proxyconfig.timeZone="" //时区
proxyconfig.staticproxy="" //静态ip字符串
/**
 * 判断是不是使用的静态ip
 * @return {boolean}
 */
proxyconfig.isStaticProxy=function (){
    if(proxyconfig.platform==="static"){
        return true
    }
    return false
}

/**
 * 解析ipweb代理字符串  这个是因为定义了很多国家的代理服务器 使用只能先在服务器获取 而且服务器端能实现在线更新
 * @param ipweb
 */
proxyconfig.parseIpweb=function (ipweb){
    //socks5://S_42924_BR_1551__90_bjEXmIFP:asd1234@gate2.ipweb.cc:7778#ipweb
    let proxyStr=文本_取出中间文本(ipweb,"socks5://","#ipweb")

    // 1. 先按 @ 分割 → 得到 [ 账号密码部分, 地址端口部分 ]
    let atSplit = proxyStr.split("@");
    let userPass = atSplit[0];
    let hostPort = atSplit[1];

    // 2. 账号密码按 : 分割 → 用户名、密码
    let up = userPass.split(":");
    let username = up[0].split("_");
    proxyconfig.user=username[1]
    proxyconfig.country=username[2]
    proxyconfig.city=username[3]

    proxyconfig.pwd = up[1];

    // 3. 地址端口按 : 分割 → host、port
    let hp = hostPort.split(":");
    proxyconfig.host = hp[0];
    proxyconfig.port = hp[1];


}

/**
 * 获取代理连接字符串
 * @return {string}
 */
proxyconfig.getProxy=function (){
    logw("proxyconfig.platform",proxyconfig.platform)
    if(proxyconfig.platform==="ipweb"){
        return "socks5://B_"+proxyconfig.user+"_"+proxyconfig.country+"_"+proxyconfig.city+"__90_"+laoleng_RndStr_caseAndNum2(8)+":"+proxyconfig.pwd+"@"+proxyconfig.host+":"+proxyconfig.port+"#ipweb"
    }
    if(proxyconfig.platform==="static"){
        return proxyconfig.staticproxy
    }




    return ""
}
/**
 *
 * @return {{proxy: string, ids: number[], timeZone: (string|*), language: (string|*)}}
 */
proxyconfig.getyunjipostdata=function (){
    return  {
        "ids": [Number(g_sid)],
        "proxy": proxyconfig.getProxy(),
        "language": proxyconfig.language,
        "timeZone": proxyconfig.timeZone
        //经纬度暂时不传
    }

}
/**
 *
 * @param language
 */
proxyconfig.setlanguage=function (language){
    proxyconfig.language=language
}
/**
 *
 * @param timeZone
 */
proxyconfig.settimeZone=function (timeZone){
    proxyconfig.timeZone=timeZone
}


