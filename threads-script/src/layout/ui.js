/**
 * 该文件由EasyClick开发工具自动创建
 */
function main() {

    var set = ui.layout("参数设置", "main.xml");

    //saveAllBtn 保存参数事件
    ui.setEvent(ui.saveAllBtn, "click", function (view) {
        var s = ui.saveAllConfig();

        ui.logd("保存所有参数结果 " + s)
        ui.toast("保存成功")
    });



}



main();