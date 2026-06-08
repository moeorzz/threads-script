

function threads首页养号(任务数据){
    //测试代码 参数暂时固定
    //proxyconfig.country=  g_Context["targetRegion"]
    //fbaccount.ipwebcity=g_Context["targetRegion"] //ipweb一定要处理这个


    云机_上报状态_全局("green","threads首页养号",true)
    设置代理(true,"",英文大写国家编码转数字( proxyconfig.country)) //注册的 所以是 fbaccount.region  //测试代码
    let 可以点击的文案对象
    let page
    let node
    let threads_pk=""
    let 已经处理的文案md5数组=[]
    while (true){
        sleep(1000)
        lockNode()
        page = Instagram_获取页面信息_("threads首页养号")
        releaseNode()

        logw("threads首页养号 " + page.join('----'))
        toast()
        if(page.length===0){
            截屏上传到服务器(null,"threads首页养号未知页面")
        }

        if(page.indexOf("手机桌面")>-1){
            点击图标启动app(getCtxString("桌面应用名称",""))
            continue
        }
        if(page.indexOf("threads评论输入框")>-1){
            //进行点赞之类的操作
            //点击进入评论区之前 要判断昵称 确定是不是误判

        }

        if(page.indexOf("Threads首页")>-1){
            云机_上报状态_全局("green","在Threads首页",true)

            可以点击的文案对象=获取threads首页作品指定国家文案对象(已经处理的文案md5数组,proxyconfig.country)
            if(可以点击的文案对象){
                clickPointBounds(可以点击的文案对象)
                sleep(random(2000,5000))
                continue
            }
            屏幕从下往上滑()
            长等待(random(5,15),"threads首页随机滑动")
            continue
        }

        if(page.indexOf("封号了")>-1){
            return
        }

        if(page.indexOf("结束脚本")>-1){
            return;
        }

    }







}

/**
 *
 * @param {string} 文案
 * @param {string} 国家代码 字母的国家代码
 */
function qianwen查询threads文案(文案, 国家代码) {

    let countryjs = 获取国家配置信息(国家代码)

    let ccnum = 英文大写国家编码转数字(国家代码)
    let postdata={
        "nick": 文案,
        "cc": countryjs.name,
        "ccnum": String(ccnum)
    }
    try {
        let ret = http.postJSON("http://47.86.7.90:9505/queryThreadPostTextHandler", postdata, 40 * 1000, {})
        logw(ret)
        let js = JSON.parse(ret)
        if (js.code === 1) {
            if(js.data==="符合条件"){
                return true
            }
        }
    } catch (e) {
        loge(e)
    }
    return false



}


/**
 * 获取文案内容并查询文案是否是指定国家相关的内容 如果是返回节点对象 内部有去重复
 * @param {string[]} 已经处理的文案md5数组
 * @param {string} 国家代码  //大写国家代码
 * @return {null|NodeInfo}
 */
function 获取threads首页作品指定国家文案对象(已经处理的文案md5数组,国家代码){
    let 文案
    let node=id("feed_post_text").getNodeInfo(0)
    if (node) {
        for (let i = 0; i <node.length ; i++) {
            try{
                文案=node[i].child(0).child(0)
                if(文案){
                    let datamd5=utils.dataMd5(文案)
                    if(已经处理的文案md5数组.indexOf(datamd5)>-1){
                        logw("文案重复了")
                        continue
                    }
                    已经处理的文案md5数组.push(datamd5)
                    if(qianwen查询threads文案(文案,国家代码)){
                        return node[i]
                    }

                }
            }catch (e) {
                loge(e)
            }

        }

    }
    return null

}



function 获取threads账号的pk(){
    while (true){
        let ret= http.httpGetDefault(g_云机api地址+"/remote/threads/getThreadsPk/"+g_sid,30*1000 ,{"instanceId": g_sid, "version": g_script_ver});
        logw(ret)

        let js=JSON.parse(ret)
        if(js.code===500){
            return ""
        }
        if(js.code===200){
            return js.data.pk
        }
        长等待(15,"获取threads账号的pk失败")
    }
   // getapi_code200(g_云机api地址+"/remote/threads/getThreadsPk/"+g_sid,"获取threads账号的pk",30*1000)
}
