/**
 *
 * @param {string} appname
 * @param {string} 调用位置
 * @return {boolean}
 */
function 模拟人工结束进程(appname,调用位置) {

logw("模拟人工结束进程"+appname+"  "+调用位置)
    for (let i = 0; i < 10; i++) {
        recentApps();
        sleep(2000)
        let node = clz("android.widget.FrameLayout").desc(appname).getOneNodeInfo(0)
        if (node) {
            if (node.bounds.right - node.bounds.left > 300) {

                swipeToPoint(343, 851, 346, 188, 150)
                sleep(3000)
                home()
                sleep(2000)
                return true

            } else {
                logw("facebook宽度不对")
            }
        }else{
            按返回键(1,"login.js,21")
            return true

        }


    }
    return false


}

function 点击登陆按钮() {
    logw("点击登陆按钮")
    if (clickpoint_selector_desc("Log in") === false) {
        if (clickpoint_selector_desc("Continue") === false) {
            if (clickpoint_selector_desc("Next") === false) {
                if (语言转换_desc("Loading…") === false) {
                    //截屏上传到服务器(null,"没有_登录按钮_v3")
                    return
                }
            }
        }
    }
    /*
    if(等待节点消失(clz("android.widget.EditText"),30*1000)){
        sleep(2000)
    }

     */
    if (等待节点消失_多语言("desc", "Loading…", 60 * 1000)) {
        sleep(2000)
        return;
    }
    //到这里 说明是很久都没转完圈 不结束是过不去的
    //这里不知道为什么 会直接触发
    logw("dsdsdsd")


}

function 阻塞脚本() {
    logw("脚本停止不下线")
    while (true) {
        sleep(5000)
    }
}

/**
 *
 * @param 结束位置
 */
function 上报备份异常并结束(结束位置) {
    //阻塞脚本()
    //return
    logw("结束位置"+结束位置)
    //截屏上传到服务器(null,"备份异常的_"+结束位置)
    模拟人工结束进程(getCtxString("桌面应用名称",""),"login.js,112")
    云机_回传任务详情结果(8, "备份异常", "", "red", "备份异常")
    exit()
}

