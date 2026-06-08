/**
 * data["eventType"]="HOME_PAGE";
 data["eventId"]="2054033408000987149";
 data["maxTime"]=390;
 */

/*
ipType 1是动态 2是静态 为2时会同步返回staticIp
data["ipType"] = 1;
data["staticIp"] = "";
 */


function 上报事件开始(data){
    postapi200(g_云机api地址+"/remote/maintenance/event/start",{"eventId":data["eventId"]},"上报事件开始")
}
function 上报事件结束(data){
     //private Integer passedFriendCount;
    postapi200(g_云机api地址+"/remote/maintenance/event/end",{"eventId":data["eventId"],"state":data["state"],"ext":data["ext_json"]},"上报事件结束")
}
function 上报任务完成(data){


    模拟人工结束进程(getCtxString("桌面应用名称",""),"yanghao.js,52")
    postapi200(g_云机api地址+"/remote/maintenance/task/complete",{"taskDetailId":g_Context["taskDetailId"],"state":g_Context["state"]},"上报事件完成")
}


function 执行事件_threads(data){
    let 任务结果={"添加好友次数": 0, "结束原因": ""}
    g_添加好友的国家=data["addCountry"]  //业务国家 不是账号的国家 目前都是BR
    if(data["eventType"]==="HOME_PAGE"){
        data["state"]="ig首页养号"  //内部会更新
        data["ext_json"]={}

        threads首页养号(data)
    }
    if(data["eventType"]==="BROWSE_SEARCH"){
        data["state"]="ig搜索关键字养号"
        data["ext_json"]={}
        //ig首页搜索养号事件(data)
    }
    if(data["eventType"]==="VIEW_NOTIFICATION"){
        data["state"]="查看通知"
        data["ext_json"]={}
        //ig查看通知(data)

    }
    if(data["eventType"]==="SEND_POST"){
        data["state"]="ig首页发表posts"
        data["ext_json"]={}
        //ig首页发表posts( data)

    }
    if(data["eventType"]==="VIEW_STORY"){
        data["state"]="查看动态"  //内部会更新
        data["ext_json"]={}
       // ig首页动态(data)
    }
    if(data["eventType"]==="EDIT_PROFILE"){
        data["state"]="ins修改头像和签名"
        data["ext_json"]={}
        data["updateSignature"]=data["updateSign"]
        //ins修改头像和签名(data)
    }
    if(data["eventType"]==="SLEEP"){
        data["state"]="SLEEP"
        data["ext_json"]={}
        if (gettime(10) - data["starttime"] < data["maxruntime"]) {
            长等待(data["maxTime"],"eventType SLEEP")

        }else{
            data["ext_json"]["endReason"] = "整体执行超时"
        }

    }

}
