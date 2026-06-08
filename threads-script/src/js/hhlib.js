//多国语言包专用
//简化特征定义和括号数量  可以对存在的特征进行定义 不存在的不定义 解决差异化


/**
 * 多语言而且完全匹配开头部分
 * @param {string} str
 * @param {string} key
 * @returns {string} 匹配成功返回字符串 失败返回""
 */
function 文本_取右边_完整匹配前缀_多语言版(str, key) {
    let 特征 = g_全球语言包[key]
    if (特征 === undefined) {
        return ""
    }

    for (let i = 0; i < 特征.length; i++) {
        if (str.substring(0, 特征[i].length) === 特征[i]) {
            return str.substring(特征[i].length);
        }
    }
    return ""

}

/**
 *
 * @param {number} count
 * @return {string}
 */
function caseAndNum(count) {

    let text = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', ret = ''
    for (let i = 0, len = text.length - 1; i < count; i++) {
        ret += text[random(0, len)]
    }
    return ret
}


/**
 *
 * @param key
 * @param {{desc?: string, pkg?: string, clz?: string, text?: string,selected?: boolean,id?:string}=} obj 附加的判断节点信息 其他同理 把 clz("android.widget.Button") 改成 {"clz":"android.widget.Button"}
 * @returns {boolean}
 */
function 语言转换_desc(key, obj) {
    //logw("语言转换_desc "+key)
    let 特征 = g_全球语言包[key]
    if (特征 === undefined) {
        return false
    }
    let node
    let 是否匹配=false
    for (let i = 0; i < 特征.length; i++) {
        //某些历史原因导致有混合特征或者不方便拆分
        if(特征[i].indexOf("*")>-1){
            是否匹配=has(descMatch(特征[i]))
        }else{
            是否匹配=has(desc(特征[i]))
        }


        if (是否匹配) {
            if (obj === undefined) {
                logw("语言转换_desc 找到 key " + key + "   " + 特征[i])
                return true
            } else {
                if(特征[i].indexOf("*")>-1){

                    node = descMatch(特征[i]).getOneNodeInfo(0)
                }else{

                    node = desc(特征[i]).getOneNodeInfo(0)
                }

                if (node) {
                    if (obj) {
                        if (obj.hasOwnProperty("desc")) {

                            if (node.desc !== obj.desc) {
                                continue
                            }
                        }
                        if (obj.hasOwnProperty("text")) {

                            if (node.text !== obj.text) {
                                continue
                            }
                        }
                        if (obj.hasOwnProperty("selected")) {

                            if (node.selected !== obj.selected) {
                                continue
                            }
                        }

                        if (obj.hasOwnProperty("pkg")) {
                            if (node.pkg !== obj.pkg) {
                                continue
                            }
                        }
                        if (obj.hasOwnProperty("clz")) {

                            if (node.clz !== obj.clz) {
                                continue
                            }
                        }
                        if (obj.hasOwnProperty("id")) {

                            if (node.id !== obj.id) {
                                continue
                            }
                        }
                    }
                    logw("语言转换_desc 找到 key " + key + "   " + 特征[i])
                    return true
                }
            }


        }
    }
    return false

}


/**
 * 多语言模版匹配正则表达式 返回匹配的对象 外部根据实际情况进行细节处理
 * @param {string} key  generallanguage.js的key  这个一定要是正则表达式 大多数情况下需要有括号
 * @param {string} str   需要用正则表达式匹配的字符串
 * @returns {Array|null} 失败返回null
 */
function 语言转换_正则表达式匹配和提取(key, str) {
    //logw("语言转换_desc "+key)
    let 特征 = g_全球语言包[key]
    if (特征 === undefined) {
        return null
    }

    for (let i = 0; i < 特征.length; i++) {
        let reg = new RegExp(特征[i]);
        let reg_match = str.match(reg)
        if (reg_match) {
            logw("匹配到 " + key + "   " + 特征[i])
            logw("匹配到前 " + str)
            return reg_match
        }
    }
    return null

}

/**
 *
 * @param {string} key
 * @param {{checked?:boolean,desc?: string, pkg?: string, clz?: string, text?: string,selected?: boolean}=} obj  附加的判断节点信息 其他同理 把 clz("android.widget.Button") 改成 {"clz":"android.widget.Button"}
 * @returns {boolean}
 */
function 语言转换_descMatch(key, obj) {
    //logw("语言转换_descMatch "+key)
    let 特征 = g_全球语言包[key]
    if (特征 === undefined) {
        return false
    }
    for (let i = 0; i < 特征.length; i++) {
        if (has(descMatch(特征[i]))) {
            if (obj === undefined) {
                logw("语言转换_descMatch 找到 key " + key + "   " + 特征[i])
                return true
            } else {
                let node = descMatch(特征[i]).getOneNodeInfo(0)
                if (node) {
                    if (obj) {
                        if (obj.hasOwnProperty("desc")) {

                            if (node.desc !== obj.desc) {
                                continue
                            }
                        }
                        if (obj.hasOwnProperty("checked")) {
                            if (node.checked !== obj.checked) {
                                continue
                            }
                        }
                        if (obj.hasOwnProperty("text")) {
                            if (node.text !== obj.text) {
                                continue
                            }
                        }
                        if (obj.hasOwnProperty("selected")) {

                            if (node.selected !== obj.selected) {
                                continue
                            }
                        }
                        if (obj.hasOwnProperty("pkg")) {
                            if (node.pkg !== obj.pkg) {
                                continue
                            }
                        }
                        if (obj.hasOwnProperty("clz")) {

                            if (node.clz !== obj.clz) {
                                continue
                            }
                        }
                    }
                    logw("语言转换_descMatch 找到 key " + key + "   " + 特征[i])
                    return true
                }
            }
        }
    }
    return false

}


/**
 *
 * @param {"descMatch" | "desc" | "text" | "textMatch"} method
 * @param {string} key
 * @param {{desc?: string, pkg?: string, clz?: string, text?: string,selected?: boolean,multiLine?: boolean}=} obj
 * @returns {NodeInfo[]|null}
 */

function 语言转换_getNodeInfo(method, key, obj) {
    //logw("语言转换_getNodeInfo "+key)
    let 特征 = g_全球语言包[key]
    if (特征 === undefined) {
        return null
    }
    let node
    let 有效节点 = []
    for (let i = 0; i < 特征.length; i++) {
        if (method === "descMatch") {
            node = descMatch(特征[i]).getNodeInfo(0)
        }
        if (method === "desc") {
            if(特征[i].indexOf("*")>-1){
                node = descMatch(特征[i]).getNodeInfo(0)
            }else{
                node = desc(特征[i]).getNodeInfo(0)
            }

            //logw(JSON.stringify(node))
        }
        if (method === "text") {

            if(特征[i].indexOf("*")>-1){
                node = textMatch(特征[i]).getNodeInfo(0)
            }else{
                node = text(特征[i]).getNodeInfo(0)
            }
        }
        if (method === "textMatch") {
            node = textMatch(特征[i]).getNodeInfo(0)
        }

        if (node) {

            for (let j = 0; j < node.length; j++) {
                if (obj) {
                    if (obj.hasOwnProperty("desc")) {


                        if (node[j].desc !== obj.desc) {
                            continue
                        }
                    }
                    if (obj.hasOwnProperty("text")) {

                        if (node[j].text !== obj.text) {
                            continue
                        }
                    }
                    if (obj.hasOwnProperty("selected")) {

                        if (node[j].selected !== obj.selected) {
                            continue
                        }
                    }
                    if (obj.hasOwnProperty("pkg")) {

                        if (node[j].pkg !== obj.pkg) {
                            continue
                        }
                    }
                    if (obj.hasOwnProperty("clz")) {
                        // logw(node[j].clz, obj.clz)
                        if (node[j].clz !== obj.clz) {
                            continue
                        }
                    }
                    if (obj.hasOwnProperty("multiLine")) {

                        if (node[j].multiLine !== obj.multiLine) {
                            continue
                        }
                    }

                }
                logw("语言转换_getNodeInfo找到 method " + method + " 找到 key " + key + "   " + 特征[i])
                有效节点.push(node[j])  //这里是j 不能是i

            }


        }

    }
    if (有效节点.length > 0) {
        return 有效节点
    }
    return null


}

/**
 * 判断一个文本是不是在多语言定义里面 完整比较
 * @param {string} key
 * @param {string} 需要对比的字符串
 * @return {boolean}
 */
function 语言转换_文本对比(key, 需要对比的字符串) {
    if (需要对比的字符串 === undefined) {
        return false
    }
    let 特征 = g_全球语言包[key]
    if (特征 === undefined) {
        return false
    }
    for (let i = 0; i < 特征.length; i++) {
        if (特征[i] === 需要对比的字符串) {
            return true
        }
    }
    return false


}

/**
 * 判断一个文本是不是在多语言定义里面 正则表达式的
 * @param {string} key
 * @param {string} 需要对比的字符串
 * @param {string} search_str
 * @param {string} replace_str
 * @return {boolean}
 */
function 语言转换_文本对比_正则(key, 需要对比的字符串, search_str, replace_str) {
    if (需要对比的字符串 === undefined) {
        return false
    }
    let 特征 = g_全球语言包[key]
    if (特征 === undefined) {
        return false
    }


    for (let i = 0; i < 特征.length; i++) {
        let 新特征 = 特征[i].replace(search_str, replace_str)
        if (新特征 === 需要对比的字符串) {
            return true
        }
    }
    return false


}

/**
 * ES5兼容版 - 判断字符串是否以指定子串结尾（替代ES6的endsWith）
 * @param {string} str 原字符串
 * @param {string} searchStr 要检测的后缀子串
 * @param {number} [length=str.length] 检测的字符串长度（可选，默认整个字符串）
 * @returns {boolean} 是否以指定子串结尾
 */
function endsWithStr(str, searchStr, length) {

    // 处理长度参数（兼容原生endsWith的第二个参数）
    let len = length === undefined ? str.length : Number(length);
    len = Math.min(len, str.length); // 边界值处理
    // 核心逻辑：截取结尾部分对比
    return str.substring(len - searchStr.length, len) === searchStr;
}

/**
 * ES5兼容版 - 判断字符串是否以指定子串开头（替代ES6的startsWith）
 * @param {string} str 原字符串（必传，非字符串会自动转字符串）
 * @param {string} searchStr 要检测的子串（必传）
 * @param {number} [position=0] 开始检测的位置（可选，默认从开头）
 * @returns {boolean} 是否以指定子串开头
 */
function startWithStr(str, searchStr, position) {
    // 处理参数默认值（ES5兼容写法，不用ES6的默认参数）
    position = position || 0;
    // 强制转字符串，避免非字符串类型报错
    str = String(str);
    searchStr = String(searchStr);

    // 边界值处理：起始位置超出字符串长度，直接返回false
    if (position < 0 || position > str.length) {
        return false;
    }
    // 核心逻辑：截取字符串开头部分对比
    return str.substring(position, position + searchStr.length) === searchStr;
}

/**
 * @description 随机_大小写字母,数字,符号
 * @param {number?} count 随机个数,默认1个
 * @return {String} 随机结果
 */
function laoleng_RndStr_caseAndNum2(count) {

    let text = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', ret = ''
    for (let i = 0, len = text.length - 1; i < count; i++) {
        ret += text[random(0, len)]
    }
    return ret
}
/**
 * @description getRunningPkg替代
 * @return {null|*|string}
 */
function getRunningPkgEx() {
    let node = bounds(100, 200, device.getScreenWidth(), device.getScreenHeight() - 100).getOneNodeInfo(0)
    return node ? node.pkg : ""
}
/**
 * 点击指定desc的key
 * @param {string} key
 * @param {string|null=} clztext  可空 这个是字符串
 * @param {number=} py  特殊情况下是需要提供
 * @returns {boolean}
 */
function clickpoint_selector_desc(key, clztext, py) {
    if (py === undefined) {
        py = 5
    }
    云机_消除输入法()
    if (has(id("com.android.inputmethod.keyboard.Key")) || has(id("com.google.android.inputmethod.latin:id/0_resource_name_obfuscated"))) {
        logw("消除键盘")
        back()
        sleep(2000);

    }

    //selectors[0].text
    let node
    let 特征 = g_全球语言包[key]
    if (特征 === undefined) {
        return false
    }
    if (clztext === undefined) {
        for (let i = 0; i < 特征.length; i++) {
            if(特征[i].indexOf("*")>-1){
                node = descMatch(特征[i]).getOneNodeInfo(0)
            }else{
                node = desc(特征[i]).getOneNodeInfo(0)
            }

            if (node) {
                logw("找到对象 " + 特征[i] + JSON.stringify(格式化输出对象(node)))
                break
            }
        }
    } else {
        for (let i = 0; i < 特征.length; i++) {
            if(特征[i].indexOf("*")>-1){
                node = descMatch(特征[i]).clz(clztext).getOneNodeInfo(0)
            }else{
                node = desc(特征[i]).clz(clztext).getOneNodeInfo(0)
            }

            if (node) {
                logw("找到对象 " + 特征[i] + JSON.stringify(格式化输出对象(node)))
                break
            }
        }
    }


    //logw(console.timeEnd("1"))
    if (node) {
        if (node.bounds == null) {
            return false
        }
        // logw(设备高度)
        if (node.bounds.bottom > 设备高度 && node.bounds.top+5>设备高度) {

            logw("元素超过屏幕" + JSON.stringify(格式化输出对象(node)) + " 设备高度 " + String(设备高度))
            //swipeToPoint(318,1200,363,873,300)
            //sleep(2000)
            return false
        }
        let x = random(node.bounds.left + 5, node.bounds.right - 5)
        let y
        if (node.bounds.top < 30) {
            y = random(30, node.bounds.bottom - 2)
        } else {
            if (node.bounds.bottom > 设备高度){
                y = node.bounds.top + 2  //几乎被遮挡的
            }else{
                y = random(node.bounds.top + py, node.bounds.bottom - py)
            }

        }
        //let selector_t=selector
        //delete selector_t

        logw("点击 " + x + "  " + y + "   " + JSON.stringify(格式化输出对象(node)))
        //logw("点击 " + x + "  " + y)
        let 隐藏控制窗口 = false
        if (x < 90) {
            隐藏控制窗口 = true

        }
        if (隐藏控制窗口) {
            closeCtrlWindow()
            sleep(1000);
        }

        ///logw("点击")

        clickPoint(x, y)


        //  clickPointPressure(x, y, random(2, 6) * 0.1)

        if (隐藏控制窗口) {
            sleep(1000);
            showCtrlWindow()
        }
        sleep(random(1000, 2000));
        return true
    } else {
        logw("批量的没有对象" + key)
    }
    return false
}

/**
 * 点击指定desc的key 同时判断pkg键
 * @param {string} key
 * @param {string} pkgtext
 * @param {number=} py  特殊情况下是需要提供
 * @returns {boolean}
 */
function clickpoint_selector_desc_pkg(key, pkgtext, py) {
    if (py === undefined) {
        py = 5
    }
    云机_消除输入法()
    if (has(id("com.android.inputmethod.keyboard.Key"))) {
        logw("消除键盘")
        back()
        sleep(2000);

    }

    //selectors[0].text
    let node
    let 特征 = g_全球语言包[key]
    if (特征 === undefined) {
        return false
    }
    if (pkgtext === undefined) {
        for (let i = 0; i < 特征.length; i++) {
            if(特征[i].indexOf("*")>-1){
                node = descMatch(特征[i]).getOneNodeInfo(0)
            }else{
                node = desc(特征[i]).getOneNodeInfo(0)
            }
            if (node) {
                logw("找到对象 " + 特征[i] + JSON.stringify(格式化输出对象(node)))
                break
            }
        }
    } else {
        for (let i = 0; i < 特征.length; i++) {
            if(特征[i].indexOf("*")>-1){
                node = descMatch(特征[i]).pkg(pkgtext).getOneNodeInfo(0)
            }else{
                node = desc(特征[i]).pkg(pkgtext).getOneNodeInfo(0)
            }

            if (node) {
                logw("找到对象 " + 特征[i] + JSON.stringify(格式化输出对象(node)))
                break
            }
        }
    }


    //logw(console.timeEnd("1"))
    if (node) {
        if (node.bounds == null) {
            return false
        }
        // logw(设备高度)
        if (node.bounds.bottom > 设备高度 && node.bounds.top+5>设备高度) {

            logw("元素超过屏幕" + JSON.stringify(格式化输出对象(node)) + " 设备高度 " + String(设备高度))
            //swipeToPoint(318,1200,363,873,300)
            //sleep(2000)
            return false
        }
        let x = random(node.bounds.left + 5, node.bounds.right - 5)
        let y
        if (node.bounds.top < 30) {
            y = random(30, node.bounds.bottom - 2)
        } else {

            if (node.bounds.bottom > 设备高度){
                y = node.bounds.top + 2  //几乎被遮挡的
            }else{
                y = random(node.bounds.top + py, node.bounds.bottom - py)
            }
        }
        //let selector_t=selector
        //delete selector_t

        logw("点击 " + x + "  " + y + "   " + JSON.stringify(格式化输出对象(node)))
        //logw("点击 " + x + "  " + y)
        let 隐藏控制窗口 = false
        if (x < 90) {
            隐藏控制窗口 = true

        }
        if (隐藏控制窗口) {
            closeCtrlWindow()
            sleep(1000);
        }

        clickPoint(x, y)


        //  clickPointPressure(x, y, random(2, 6) * 0.1)

        if (隐藏控制窗口) {
            sleep(1000);
            showCtrlWindow()
        }
        sleep(random(1000, 2000));
        return true
    } else {
        logw("批量的没有对象" + key)
    }
    return false
}

/**
 * 滑动距离随机 滑完以后随机等待1-5秒
 */
function 屏幕从上往下滑() {
    logw("屏幕从上往下滑")
    let y1 = random(148, 300)
    let y2 = random(720, 935)

    swipeToPoint(random(144, 610), y1, random(144, 610), y2, random(500, 1000))
    sleep(random(1000, 6000))
}

/**
 * 滑动距离随机 滑完以后随机等待1-5秒
 */
function 屏幕从下往上滑() {
    logw("屏幕从下往上滑")
    let y1 = random(108, 200)
    let y2 = random(780, 935)

    swipeToPoint(random(144, 610), y2, random(144, 610), y1, random(200, 500))
    sleep(random(1000, 6000))
}

/**
 * 增强版 swipe_ToPoint
 * 解决不触发加载、loading不动的问题
 */
function enhancedSwipe() {
    // 1. 坐标微随机化：避免每次都点在同一个像素点
    let startX = 333 + random(-10, 10);
    let startY = 900 + random(-20, 20);
    let endX = 336 + random(-10, 10);
    let endY = 236 + random(-20, 20);

    // 2. 关键：模拟“快甩”动作。
    // 如果之前 300-600ms 不行，尝试更快的速度（180-300ms）
    // 快速位移更容易触发 App 的惯性滚动监听器
    let duration = random(180, 320);

    // 3. 执行滑动
    let result = swipeToPoint(startX, startY, endX, endY, duration);

    // 4. 强制等待：滑动结束后给系统 200ms 处理惯性逻辑，不要立即执行下一步动作
    sleep(200);

    return result;
}

function 格式化输出对象(jsonobj_) {
    if(jsonobj_==null){
        return {}
    }
    //这里必须赋值一下 不然变成引用对象 导致外层对象被修改
    let jsonobj = jsonobj_
    delete jsonobj.visibleBounds
    delete jsonobj.childCount
    delete jsonobj.checkable
    delete jsonobj.checked
    delete jsonobj.clickable
    delete jsonobj.enabled
    delete jsonobj.focusable
    delete jsonobj.focused
    delete jsonobj.longClickable
    delete jsonobj.scrollable
    delete jsonobj.selected
    //delete jsonobj.nid
    delete jsonobj.parentId
    delete jsonobj.index
    delete jsonobj.depth
    delete jsonobj.visible
    delete jsonobj.drawingOrder
    delete jsonobj.editable
    delete jsonobj.password
    delete jsonobj.index
    delete jsonobj.multiLine
    delete jsonobj.dismissable

    return jsonobj

}

/**
 * clickpoint_selector_descMatch
 * @param {string} key   语言包的key
 * @param {string=} clztext 节点的clz属性文本
 * @param {boolean=} no_back  可选参数 true是不消除输入法
 * @returns {boolean}
 */
function clickpoint_selector_descMatch(key, clztext, no_back) {
    if (no_back) {
        sleep(1)
    } else {
        云机_消除输入法()
        if (has(id("com.android.inputmethod.keyboard.Key"))) {
            logw("消除键盘")
            back()
            sleep(2000);

        }
    }


    //selectors[0].text
    let node
    let 特征 = g_全球语言包[key]
    if (特征 === undefined) {
        return false
    }
    if (clztext === undefined) {
        for (let i = 0; i < 特征.length; i++) {
            node = descMatch(特征[i]).getOneNodeInfo(0)
            if (node) {
                logw("找到对象 " + 特征[i] + JSON.stringify(格式化输出对象(node)))
                break
            }
        }
    } else {
        for (let i = 0; i < 特征.length; i++) {
            node = descMatch(特征[i]).clz(clztext).getOneNodeInfo(0)
            if (node) {
                logw("找到对象 " + 特征[i] + JSON.stringify(格式化输出对象(node)))
                break
            }
        }
    }


    //logw(console.timeEnd("1"))
    if (node) {
        if (node.bounds == null) {
            return false
        }
        // logw(设备高度)
        if (node.bounds.bottom > 设备高度 && node.bounds.top+5>设备高度) {

            logw("元素超过屏幕" + JSON.stringify(格式化输出对象(node)) + " 设备高度 " + String(设备高度))
            //swipeToPoint(318,1200,363,873,300)
            //sleep(2000)
            return false
        }
        let x = random(node.bounds.left + 5, node.bounds.right - 5)
        let y
        if (node.bounds.top < 30) {
            y = random(30, node.bounds.bottom - 2)
        } else {
            if (node.bounds.bottom > 设备高度){
                y = node.bounds.top + 2  //几乎被遮挡的
            }else{
                y = random(node.bounds.top + 5, node.bounds.bottom - 5)
            }

        }
        //let selector_t=selector
        //delete selector_t

        logw("点击 " + x + "  " + y + "   " + JSON.stringify(格式化输出对象(node)))
        //logw("点击 " + x + "  " + y)
        let 隐藏控制窗口 = false
        if (x < 90) {
            隐藏控制窗口 = true

        }
        if (隐藏控制窗口) {
            closeCtrlWindow()
            sleep(1000);
        }

        clickPoint(x, y)


        //  clickPointPressure(x, y, random(2, 6) * 0.1)

        if (隐藏控制窗口) {
            sleep(1000);
            showCtrlWindow()
        }
        sleep(random(1000, 2000));
        return true
    } else {
        logw("批量的没有对象" + key)
    }
    return false
}


/**
 * 点击添加好友和删除按钮之类的
 * @param {string} key  语言包的key
 * @param {string|null=} clztext
 * @param {boolean} no_back 可选参数 true是不消除输入法
 * @param {string} search_str generallanguage.js定义的值的可变部分 一般是 (.*)或者.*
 * @param {string} replace_str  需要替换的真实内容 一般是好友昵称 也可能是其他的
 * @returns {boolean}
 */
function clickpoint_selector_desc可变节点(key, clztext, no_back, search_str, replace_str) {
    if (no_back) {
        sleep(1)
    } else {
        云机_消除输入法()
        if (has(id("com.android.inputmethod.keyboard.Key"))) {
            logw("消除键盘")
            back()
            sleep(2000);

        }
    }

    let 新特征
    //selectors[0].text
    let node
    let 特征 = g_全球语言包[key]
    if (特征 === undefined) {
        return false
    }
    if (clztext === undefined || clztext === null) {
        for (let i = 0; i < 特征.length; i++) {
            新特征 = 特征[i].replace(search_str, replace_str)
            if (新特征.indexOf("'") > -1) {
                for (let j = 0; j <5 ; j++) {
                    新特征 = 新特征.replace("'", ".*")
                    if(新特征.indexOf("'")===-1){
                        break
                    }
                }

                node = descMatch(新特征).getOneNodeInfo(0)
            } else {
                node = desc(新特征).getOneNodeInfo(0)
            }

            if (node) {
                logw("找到对象 " + 新特征 + JSON.stringify(格式化输出对象(node)))
                break
            }
        }
    } else {
        for (let i = 0; i < 特征.length; i++) {
            新特征 = 特征[i].replace(search_str, replace_str)
            if (新特征.indexOf("'") > -1) {
                for (let j = 0; j <5 ; j++) {
                    新特征 = 新特征.replace("'", ".*")
                    if(新特征.indexOf("'")===-1){
                        break
                    }
                }
                node = descMatch(新特征).clz(clztext).getOneNodeInfo(0)
            } else {
                node = desc(新特征).clz(clztext).getOneNodeInfo(0)
            }
            if (node) {
                logw("找到对象 " + 新特征 + JSON.stringify(格式化输出对象(node)))
                break
            }
        }
    }


    //logw(console.timeEnd("1"))
    if (node) {
        if (node.bounds == null) {
            return false
        }
        // logw(设备高度)
        if (node.bounds.bottom > 设备高度 && node.bounds.top+5>设备高度) {

            logw("元素超过屏幕" + JSON.stringify(格式化输出对象(node)) + " 设备高度 " + String(设备高度))
            //swipeToPoint(318,1200,363,873,300)
            //sleep(2000)
            return false
        }
        let x = random(node.bounds.left + 5, node.bounds.right - 5)
        let y
        if (node.bounds.top < 30) {
            y = random(30, node.bounds.bottom - 2)
        } else {
            if (node.bounds.bottom > 设备高度){
                y = node.bounds.top + 2  //几乎被遮挡的
            }else{
                y = random(node.bounds.top + 5, node.bounds.bottom - 5)
            }
        }
        //let selector_t=selector
        //delete selector_t

        logw("点击 " + x + "  " + y + "   " + JSON.stringify(格式化输出对象(node)))
        //logw("点击 " + x + "  " + y)
        let 隐藏控制窗口 = false
        if (x < 90) {
            隐藏控制窗口 = true

        }
        if (隐藏控制窗口) {
            closeCtrlWindow()
            sleep(1000);
        }

        clickPoint(x, y)


        //  clickPointPressure(x, y, random(2, 6) * 0.1)

        if (隐藏控制窗口) {
            sleep(1000);
            showCtrlWindow()
        }
        sleep(random(1000, 2000));
        return true
    } else {
        logw("批量的没有对象" + key)
    }
    return false
}


/**
 * 点击指定的text元素
 * @param {string} key
 * @param {string=} clztext
 * @returns {boolean}
 */
function clickpoint_selector_text(key, clztext) {

    云机_消除输入法()
    if (has(id("com.android.inputmethod.keyboard.Key"))) {
        logw("消除键盘")
        back()
        sleep(2000);
    }

    //selectors[0].text
    let node
    let 特征 = g_全球语言包[key]
    if (特征 === undefined) {
        return false
    }
    if (clztext === undefined || clztext == null) {
        for (let i = 0; i < 特征.length; i++) {
            if(特征[i].indexOf("*")>-1){
                node = textMatch(特征[i]).getOneNodeInfo(0)
            }else{
                node = text(特征[i]).getOneNodeInfo(0)
            }

            if (node) {
                logw("找到对象 " + 特征[i] + JSON.stringify(格式化输出对象(node)))
                break
            }
        }
    } else {
        for (let i = 0; i < 特征.length; i++) {
            if(特征[i].indexOf("*")>-1){
                node = textMatch(特征[i]).clz(clztext).getOneNodeInfo(0)
            }else{
                node = text(特征[i]).clz(clztext).getOneNodeInfo(0)
            }

            if (node) {
                logw("找到对象 " + 特征[i] + JSON.stringify(格式化输出对象(node)))
                break
            }
        }
    }


    //logw(console.timeEnd("1"))
    if (node) {
        if (node.bounds == null) {
            return false
        }
        // logw(设备高度)
        if (node.bounds.bottom > 设备高度 && node.bounds.top+5>设备高度) {


            logw("元素超过屏幕" + JSON.stringify(格式化输出对象(node)) + " 设备高度 " + String(设备高度))
            //swipeToPoint(318,1200,363,873,300)
            //sleep(2000)
            return false
        }
        let x = random(node.bounds.left + 5, node.bounds.right - 5)
        let y
        if (node.bounds.top < 30) {
            y = random(30, node.bounds.bottom - 2)
        } else {
            if (node.bounds.bottom > 设备高度){
                y = node.bounds.top + 2  //几乎被遮挡的
            }else{
                y = random(node.bounds.top + 5, node.bounds.bottom - 5)
            }
        }
        //let selector_t=selector
        //delete selector_t

        logw("点击 " + x + "  " + y + "   " + JSON.stringify(格式化输出对象(node)))
        //logw("点击 " + x + "  " + y)
        let 隐藏控制窗口 = false
        if (x < 90) {
            隐藏控制窗口 = true

        }
        if (隐藏控制窗口) {
            closeCtrlWindow()
            sleep(1000);
        }


        clickPoint(x, y)


        //  clickPointPressure(x, y, random(2, 6) * 0.1)

        if (隐藏控制窗口) {
            sleep(1000);
            showCtrlWindow()
        }
        sleep(random(1000, 2000));
        return true
    } else {
        logw("批量的没有对象" + key)
    }
    return false
}

/**
 * clickpoint_selector_textMatch
 * @param {string} key
 * @param {string=} clztext
 * @returns {boolean}
 */

function clickpoint_selector_textMatch(key, clztext) {

    云机_消除输入法()
    if (has(id("com.android.inputmethod.keyboard.Key"))) {
        logw("消除键盘")
        back()
        sleep(2000);
    }

    //selectors[0].text
    let node
    let 特征 = g_全球语言包[key]
    if (特征 === undefined) {
        return false
    }
    if (clztext === undefined || clztext == null) {
        for (let i = 0; i < 特征.length; i++) {
            node = textMatch(特征[i]).getOneNodeInfo(0)
            if (node) {
                logw("找到对象 " + 特征[i] + JSON.stringify(格式化输出对象(node)))
                break
            }
        }
    } else {
        for (let i = 0; i < 特征.length; i++) {
            node = textMatch(特征[i]).clz(clztext).getOneNodeInfo(0)
            if (node) {
                logw("找到对象 " + 特征[i] + JSON.stringify(格式化输出对象(node)))
                break
            }
        }
    }


    //logw(console.timeEnd("1"))
    if (node) {
        if (node.bounds == null) {
            return false
        }
        // logw(设备高度)
        if (node.bounds.bottom > 设备高度 && node.bounds.top+5>设备高度) {

            logw("元素超过屏幕" + JSON.stringify(格式化输出对象(node)) + " 设备高度 " + String(设备高度))
            //swipeToPoint(318,1200,363,873,300)
            //sleep(2000)
            return false
        }
        let x = random(node.bounds.left + 5, node.bounds.right - 5)
        let y
        if (node.bounds.top < 30) {
            y = random(30, node.bounds.bottom - 2)
        } else {

            if (node.bounds.bottom > 设备高度){
                y = node.bounds.top + 2  //几乎被遮挡的
            }else{
                y = random(node.bounds.top + 5, node.bounds.bottom - 5)
            }
        }
        //let selector_t=selector
        //delete selector_t

        logw("点击 " + x + "  " + y + "   " + JSON.stringify(格式化输出对象(node)))
        //logw("点击 " + x + "  " + y)
        let 隐藏控制窗口 = false
        if (x < 90) {
            隐藏控制窗口 = true

        }
        if (隐藏控制窗口) {
            closeCtrlWindow()
            sleep(1000);
        }

        clickPoint(x, y)


        //  clickPointPressure(x, y, random(2, 6) * 0.1)

        if (隐藏控制窗口) {
            sleep(1000);
            showCtrlWindow()
        }
        sleep(random(1000, 2000));
        return true
    } else {
        logw("批量的没有对象" + key)
    }
    return false
}


function clickpoint_selector(selector, notlog) {

    云机_消除输入法()
    if (has(id("com.android.inputmethod.keyboard.Key"))) {
        logw("消除键盘")
        back()
        sleep(2000);

    }

    //selectors[0].text
    let node

    //console.time("1")
    node = selector.getOneNodeInfo(0)

    //logw(console.timeEnd("1"))
    if (node) {
        if (node.bounds == null) {
            return false
        }
        // logw(设备高度)
        if (node.bounds.bottom > 设备高度 && node.bounds.top+5>设备高度) {
            if (notlog) {
                return false
            }
            logw("元素超过屏幕" + JSON.stringify(格式化输出对象(node)) + " 设备高度 " + String(设备高度))
            //swipeToPoint(318,1200,363,873,300)
            //sleep(2000)
            return false
        }
        let x = random(node.bounds.left + 5, node.bounds.right - 5)
        let y
        if (node.bounds.top < 30) {
            y = random(30, node.bounds.bottom - 2)
        } else {
            if (node.bounds.bottom > 设备高度){
                y = node.bounds.top + 2  //几乎被遮挡的
            }else{
                y = random(node.bounds.top + 5, node.bounds.bottom - 5)
            }
        }
        //let selector_t=selector
        //delete selector_t

        logw("点击 " + x + "  " + y + "   " + JSON.stringify(格式化输出对象(node)))
        //logw("点击 " + x + "  " + y)
        let 隐藏控制窗口 = false
        if (x < 90) {
            隐藏控制窗口 = true

        }
        if (隐藏控制窗口) {
            closeCtrlWindow()
            sleep(1000);
        }

        clickPoint(x, y)


        //  clickPointPressure(x, y, random(2, 6) * 0.1)

        if (隐藏控制窗口) {
            sleep(1000);
            showCtrlWindow()
        }
        sleep(random(1000, 2000));
        return true
    } else {
        if (notlog) {
            return false
        }
        logw("点击失败 不存在节点 " + JSON.stringify(selector))
    }
    return false
}

/**
 * 语言转换_getOneNodeInfo
 * @param {"descMatch" | "desc" | "text" | "textMatch"} method
 * @param {string} key
 * @param {{desc?: string, pkg?: string, clz?: string, text?: string,selected?: boolean,multiLine?: boolean,nid?:string}=} obj
 * @returns {NodeInfo} 对象或者null
 */
function 语言转换_getOneNodeInfo(method, key, obj) {
    //logw("语言转换_getNodeInfo "+key)
    let 特征 = g_全球语言包[key]
    if (特征 === undefined) {
        return null
    }
    let node
    //内部用数组是因为有多个的时候 判断附加条件就有可能不符合
    for (let i = 0; i < 特征.length; i++) {
        if (method === "descMatch") {
            node = descMatch(特征[i]).getNodeInfo(0)
        }
        if (method === "desc") {
            if(特征[i].indexOf("*")>-1){
                node = descMatch(特征[i]).getNodeInfo(0)
            }else{
                node = desc(特征[i]).getNodeInfo(0)
            }

        }
        if (method === "text") {

            if(特征[i].indexOf("*")>-1){
                node = textMatch(特征[i]).getNodeInfo(0)
            }else{
                node = text(特征[i]).getNodeInfo(0)
            }
        }
        if (method === "textMatch") {
            node = textMatch(特征[i]).getNodeInfo(0)
        }

        if (node) {

            for (let j = 0; j < node.length; j++) {
                if (obj) {
                    if (obj.hasOwnProperty("desc")) {
                        if (node[j].desc !== obj.desc) {
                            continue
                        }
                    }
                    if (obj.hasOwnProperty("text")) {
                        if (node[j].text !== obj.text) {
                            continue
                        }
                    }
                    if (obj.hasOwnProperty("selected")) {

                        if (node[j].selected !== obj.selected) {
                            continue
                        }
                    }
                    if (obj.hasOwnProperty("nid")) {

                        if (node[j].nid !== obj.nid) {
                            continue
                        }
                    }
                    if (obj.hasOwnProperty("pkg")) {

                        if (node[j].pkg !== obj.pkg) {
                            continue
                        }
                    }
                    if (obj.hasOwnProperty("clz")) {

                        if (node[j].clz !== obj.clz) {
                            continue
                        }
                    }
                    if (obj.hasOwnProperty("multiLine")) {

                        if (node[j].multiLine !== obj.multiLine) {
                            continue
                        }
                    }
                }
                logw("语言转换_getOneNodeInfo method: " + method + " 找到 key " + key + "  " + 特征[i])
                return node[j]
            }


        }

    }
    return null

}
/**
 * 语言转换_getOneNodeInfo
 * @param { "desc" | "text" | "descMatch" } method
 * @param {string} key
 * @param {{desc?: string, pkg?: string, clz?: string, text?: string,selected?: boolean,multiLine?: boolean}=} obj
 * @param {string} search_str
 * @param {string} replace_str
 * @returns {NodeInfo} 对象或者null
 */
function 语言转换_getOneNodeInfo_可变节点(method, key, obj, search_str, replace_str) {
    //logw("语言转换_getNodeInfo "+key)
    let 特征 = g_全球语言包[key]
    if (特征 === undefined) {
        return null
    }
    let node
    //内部用数组是因为有多个的时候 判断附加条件就有可能不符合
    for (let i = 0; i < 特征.length; i++) {
        let 新特征 = 特征[i].replace(search_str, replace_str)

        if (新特征.indexOf("'") > -1) {

            for (let j = 0; j <5 ; j++) {
                新特征 = 新特征.replace("'", ".*")
                if(新特征.indexOf("'")===-1){
                    break
                }
            }
        }
        if (method === "descMatch") {
          node = descMatch(新特征).getNodeInfo(0)
        }
        if (method === "desc") {
            if(新特征.indexOf("*")>-1){
                node = descMatch(新特征).getNodeInfo(0)
            }else{
                node = desc(新特征).getNodeInfo(0)
            }

        }
        if (method === "text") {
            if(新特征.indexOf("*")>-1){
                node = textMatch(新特征).getNodeInfo(0)
            }else{
                node = text(新特征).getNodeInfo(0)
            }

        }


        if (node) {

            for (let j = 0; j < node.length; j++) {
                if (obj) {
                    if (obj.hasOwnProperty("desc")) {
                        if (node[j].desc !== obj.desc) {
                            continue
                        }
                    }
                    if (obj.hasOwnProperty("text")) {
                        if (node[j].text !== obj.text) {
                            continue
                        }
                    }
                    if (obj.hasOwnProperty("selected")) {

                        if (node[j].selected !== obj.selected) {
                            continue
                        }
                    }
                    if (obj.hasOwnProperty("pkg")) {

                        if (node[j].pkg !== obj.pkg) {
                            continue
                        }
                    }
                    if (obj.hasOwnProperty("clz")) {

                        if (node[j].clz !== obj.clz) {
                            continue
                        }
                    }
                    if (obj.hasOwnProperty("multiLine")) {

                        if (node[j].multiLine !== obj.multiLine) {
                            continue
                        }
                    }
                }
                return node[j]
            }


        }

    }
    return null

}

/**
 * 语言转换_text
 * @param {string} key
 * @param {{desc?: string, pkg?: string, clz?: string, text?: string,selected?: boolean,multiLine?: boolean,id?:string}=} obj
 * @returns {boolean}
 */
function 语言转换_text(key, obj) {
    //logw("语言转换_text "+key)
    let 特征 = g_全球语言包[key]
    if (特征 === undefined) {
        return false
    }
    let node
    let 是否匹配=false
    for (let i = 0; i < 特征.length; i++) {
        if(特征[i].indexOf("*")>-1){
            是否匹配=has(textMatch(特征[i]))
        }else{
            是否匹配=has(text(特征[i]))
        }
        if (是否匹配) {
            if (obj === undefined) {
                logw("语言转换_text 找到 key " + key + "  " + 特征[i])


                return true
            } else {
                if(特征[i].indexOf("*")>-1) {
                     node = textMatch(特征[i]).getOneNodeInfo(0)
                }else{
                     node = text(特征[i]).getOneNodeInfo(0)
                }
                if (node) {
                    if (obj) {
                        if (obj.hasOwnProperty("desc")) {

                            if (node.desc !== obj.desc) {
                                continue
                            }
                        }
                        if (obj.hasOwnProperty("text")) {

                            if (node.text !== obj.text) {
                                continue
                            }
                        }
                        if (obj.hasOwnProperty("selected")) {

                            if (node.selected !== obj.selected) {
                                continue
                            }
                        }
                        if (obj.hasOwnProperty("id")) {

                            if (node.id !== obj.id) {
                                continue
                            }
                        }
                        if (obj.hasOwnProperty("pkg")) {

                            if (node.pkg !== obj.pkg) {
                                continue
                            }
                        }
                        if (obj.hasOwnProperty("clz")) {

                            if (node.clz !== obj.clz) {
                                continue
                            }
                        }
                        if (obj.hasOwnProperty("multiLine")) {

                            if (node.multiLine !== obj.multiLine) {
                                continue
                            }
                        }

                    }

                    logw("语言转换_text 找到 key " + key + "   " + 特征[i])

                    return true
                }
            }
        }
    }
    return false
}

/**
 *
 * @param {string} key
 * @param {{desc?: string, pkg?: string, clz?: string, text?: string,selected?: boolean,multiLine?: boolean}=} obj   附加的判断节点信息 其他同理 把 clz("android.widget.Button") 改成 {"clz":"android.widget.Button"}
 * @returns {boolean}
 */
function 语言转换_textMatch(key, obj) {
    //logw("语言转换_textMatch "+key)
    let 特征 = g_全球语言包[key]
    if (特征 === undefined) {
        return false
    }
    for (let i = 0; i < 特征.length; i++) {
        if (has(textMatch(特征[i]))) {
            if (obj === undefined) {
                logw("语言转换_textMatch 找到 key " + key + "  " + 特征[i])
                return true
            } else {
                let node = textMatch(特征[i]).getOneNodeInfo(0)
                if (node) {
                    if (obj) {
                        if (obj.hasOwnProperty("desc")) {

                            if (node.desc !== obj.desc) {
                                continue
                            }
                        }
                        if (obj.hasOwnProperty("text")) {

                            if (node.text !== obj.text) {
                                continue
                            }
                        }
                        if (obj.hasOwnProperty("selected")) {

                            if (node.selected !== obj.selected) {
                                continue
                            }
                        }
                        if (obj.hasOwnProperty("pkg")) {

                            if (node.pkg !== obj.pkg) {
                                continue
                            }
                        }
                        if (obj.hasOwnProperty("clz")) {

                            if (node.clz !== obj.clz) {
                                continue
                            }
                        }
                        if (obj.hasOwnProperty("multiLine")) {

                            if (node.multiLine !== obj.multiLine) {
                                continue
                            }
                        }

                    }
                    logw("语言转换_textMatch 找到 key " + key + "  " + 特征[i])
                    return true
                }
            }
        }
    }
    return false
}

//===================================


function 图色初始化() {
    image.setInitParam({"action_timeout": 10000});
    let request = image.requestScreenCapture(10000, 0);
    if (!request) {
        request = image.requestScreenCapture(10000, 0);
    }
    logi("申请截图结果... " + request)
    if (!request) {
        logw("申请截图权限失败,检查是否开启后台弹出,悬浮框等权限")
        exit()
    }
}

/**
 * 返回找到的元素的索引
 * @param {array} node  这个是元素特征数组 格式[id("222"),id("33")]
 * @param {number} d  超时时间 毫秒
 * @returns {number}  没有出现任何元素返回-1  其他的返回索引 0是第一个
 */
function waitExistNode_自定义_多元素(node, d) {
    let s = gettime(13)
    while (Math.abs(gettime(13) - s) < d) {
        //logi("查找多元素")
        for (let i = 0; i < node.length; i++) {
            if (has(node[i])) {
                delete node[i].attr
                logi("出现的元素是 " + JSON.stringify(node[i]))
                return i
            }
        }
        sleep(500)
    }
    return -1
}

/**
 * 返回找到的元素的索引
 * @param {array} node  这个是元素特征数组 格式[{"desc":"1111"},{"text":"测试"},{"语言转换_text":"fb主页"}] 同时支持ec原生节点 复杂的封装函数
 * @param {number} d  超时时间 毫秒
 * @returns {number}  没有出现任何元素返回-1  其他的返回索引 0是第一个
 */

function waitExistNode_自定义_多元素_多语言版(node, d) {
    let s = gettime(13)
    while (Math.abs(gettime(13) - s) < d) {
        //logi("查找多元素")
        lockNode()
        for (let i = 0; i < node.length; i++) {

            if (node[i].hasOwnProperty("selectors")) {
                if (has(node[i])) {
                    releaseNode()
                    return i
                }
            }


            if (node[i].hasOwnProperty("语言转换_desc")) {
                if (语言转换_desc(node[i].语言转换_desc, node[i].obj)) {
                    releaseNode()
                    return i
                }
            }
            if (node[i].hasOwnProperty("语言转换_descMatch")) {
                if (语言转换_descMatch(node[i].语言转换_descMatch, node[i].obj)) {
                    releaseNode()
                    return i
                }
            }
            if (node[i].hasOwnProperty("语言转换_text")) {
                if (语言转换_text(node[i].语言转换_text, node[i].obj)) {
                    releaseNode()
                    return i
                }
            }
            if (node[i].hasOwnProperty("语言转换_textMatch")) {
                if (语言转换_textMatch(node[i].语言转换_textMatch, node[i].obj)) {
                    releaseNode()
                    return i
                }
            }

            if (node[i].hasOwnProperty("desc")) {
                if (has(desc(node[i].desc))) {
                    releaseNode()
                    return i
                }
            }
            if (node[i].hasOwnProperty("descMatch")) {
                if (has(descMatch(node[i].descMatch))) {
                    releaseNode()
                    return i
                }
            }
            if (node[i].hasOwnProperty("text")) {
                if (has(text(node[i].text))) {
                    releaseNode()
                    return i
                }
            }
            if (node[i].hasOwnProperty("textMatch")) {
                if (has(textMatch(node[i].textMatch))) {
                    releaseNode()
                    return i
                }
            }

            if (node[i].hasOwnProperty("id")) {
                if (has(id(node[i].id))) {
                    releaseNode()
                    return i
                }
            }
        }
        releaseNode()
        sleep(500)
    }
    return -1
}

/**
 * 返回找到的元素的索引
 * @param node  这个是元素特征数组 格式{"desc":"1111"}或者 {"text":"测试"}或者{"语言转换_text":"fb主页"} 同时支持ec原生节点 复杂的封装函数
 * @param {number} d  超时时间 毫秒
 * @returns {boolean}  没有出现任何元素返回-1  其他的返回索引 0是第一个
 */
function waitExistNode_自定义_多语言版(node, d) {
    logw("等待元素出现" + JSON.stringify(node))
    let s = gettime(13)
    while (Math.abs(gettime(13) - s) < d) {
        //logi("查找多元素")
        lockNode()
        if (node.hasOwnProperty("selectors")) {
            if (has(node)) {
                releaseNode()
                return true
            }
        }
        if (node.hasOwnProperty("语言转换_desc")) {
            if (语言转换_desc(node.语言转换_desc)) {
                releaseNode()
                return true
            }
        }
        if (node.hasOwnProperty("语言转换_descMatch")) {
            if (语言转换_descMatch(node.语言转换_descMatch)) {
                releaseNode()
                return true
            }
        }
        if (node.hasOwnProperty("语言转换_text")) {
            if (语言转换_text(node.语言转换_text)) {
                releaseNode()
                return true
            }
        }
        if (node.hasOwnProperty("语言转换_textMatch")) {
            if (语言转换_textMatch(node.语言转换_textMatch)) {
                releaseNode()
                return true
            }
        }

        if (node.hasOwnProperty("desc")) {
            if (has(desc(node.desc))) {
                releaseNode()
                return true
            }
        }
        if (node.hasOwnProperty("descMatch")) {
            if (has(descMatch(node.descMatch))) {
                releaseNode()
                return true
            }
        }
        if (node.hasOwnProperty("text")) {
            if (has(text(node.text))) {
                releaseNode()
                return true
            }
        }
        if (node.hasOwnProperty("textMatch")) {
            if (has(textMatch(node.textMatch))) {
                releaseNode()
                return true
            }
        }
        if (node.hasOwnProperty("id")) {
            if (has(id(node.id))) {
                releaseNode()
                return true
            }
        }

        releaseNode()
        sleep(500)
    }
    return false
}

/**
 * 获取指定范围的节点对象 在多个里面会挑一个出来
 * @param selectors  节点信息 比如desc("send")
 * @param x1  空就是null 否则填数字
 * @param y1  空就是null 否则填数字
 * @param x2  空就是null 否则填数字
 * @param y2  空就是null 否则填数字
 * @returns {null}
 */
function 获取指定范围的节点对象(selectors, x1, y1, x2, y2) {
    if (selectors == null) {
        logw("获取指定范围的节点对象 selectors 为null");
        return null
    }
    let node = selectors.getNodeInfo(0)
    if (node) {
        for (let i = 0; i < node.length; i++) {
            if (x1) {
                if (node[i].bounds.left < x1) {
                    continue
                }
            }
            if (x2) {
                if (node[i].bounds.right > x2) {
                    continue
                }
            }
            if (y1) {
                if (node[i].bounds.top < y1) {
                    continue
                }
            }
            if (y2) {
                if (node[i].bounds.bottom > y2) {
                    continue
                }
            }
            return node[i]
        }


    }
    return null

}






/**
 * 等待元素消失
 * @param selector  节点选择器
 * @param {number} d  等待时间 毫秒
 * @param {string} txt  日志
 * @returns {boolean}  true消失了 false没消失
 */

function 等待元素消失(selector, d, txt) {
    logw("等待元素消失")
    if (selector == null) {
        return true
    }

    logi(txt)
    logw(JSON.stringify(selector))

    let s = gettime(13)
    while (Math.abs(gettime(13) - s) < d) {
       if(has(selector)===false){
           return true
       }
        sleep(500)
    }
    return false


}


/**
 * 点击当前节点的一级子节点
 * @param node 这个是节点对象
 * @param i  子节点索引
 */
function 点击下一级子节点(node, i) {
    if (node == null) {
        logw("父节点不存在 点击失败")

        return
    }
    let x = node.child(i)
    if (x) {

        x.click()
        sleep(1000);
    } else {
        logw("没有符合条件的子节点 点击失败")
    }


}

/**
 * 点击当前节点的一级子节点
 * @param node 这个是节点对象
 * @param i  子节点索引
 */
function 点击下一级子节点_坐标点击(node, i) {
    if (node == null) {
        logw("父节点不存在 点击失败")

        return
    }
    let x = node.child(i)
    if (x) {

        clickPointBounds(x)
        sleep(1000);
    } else {
        logw("没有符合条件的子节点 点击失败")
    }


}

function 读取最后一个日志文件() {
    let 最后一个日志文件路径 = ""

    for (let i = 0; i < 1000; i++) {
        if (file.exists("/sdcard/aaa/logs_" + i + ".txt")) {
            最后一个日志文件路径 = "/sdcard/aaa/logs_" + i + ".txt"
        } else {
            break
        }
    }
    if (最后一个日志文件路径 === "") {
        return ""
    }
    return file.readFile(最后一个日志文件路径)
}

function 清除垃圾文件夹() {
    let list = file.listDir("/sdcard/")
    for (let i = 0; i < list.length; i++) {
        //logw(list[i].length,list[i])
        if (list[i].length === 53 && list[i].indexOf("/sdcard/a") > -1) {
            file.deleteAllFile(list[i])

        }
    }
}

/**
 * 获取符合条件的兄弟节点  类似电脑端的查找子窗口句柄 找到就返回对象 没找到返回null
 * @param node 父节点对象
 * @param condition 这个是数组 大概格式是 {"desc":"搜索","text":"222"}
 */

function 获取符合条件的兄弟节点(node, condition) {

    if (node) {
        let x = node.siblings();
        if (x) {
            //这玩意是个数组
            for (let i = 0; i < x.length; i++) {
                logi(x[i])
                for (let key in condition) {
                    if (condition.hasOwnProperty(key)) {
                        let value = condition[key];
                        if (key === "desc") {
                            if (x[i].desc === value) {
                                return x[i]
                            }
                        }
                        if (key === "text") {
                            if (x[i].text === value) {
                                return x[i]
                            }
                        }
                        if (key === "clz") {
                            if (x[i].clz === value) {
                                return x[i]
                            }
                        }
                    }
                }
            }
        } else {
            logw("没有兄弟节点")
        }

    } else {
        logw("获取符合条件的兄弟节点 失败 主节点为null")
    }
    return null


}


function getText安全版(selector) {
    let val = getText(selector);
    if (Array.isArray(val)) {
        val = val[0];
    }
    if (val == null) {
        val = "";
    }
    return String(val);
}



/**
 * 除了标准的fb://profile/ 还有根据版本号改成搜索的 因为外部调用流程比较复杂
 * @param {string} url
 */
function app页面跳转(url) {

    url = url.replace(/\s/g, "");
    logw("[" + url + "]")

    let map = {
        "uri": url
    };
    utils.openActivity(map);
}

/**
 * 等待指定秒数
 * @param {number} d
 * @param {string} notes 调用的位置
 */
function 长等待(d, notes) {
    if (d > 1000) {
        d = d / 1000

    }
    logi(notes + " 长等待" + String(d) + "秒")
    for (let idswwwww = 0; idswwwww < d; idswwwww++) {
        //logi("长等待,等待中 "+idswwwww);
        sleep(1000);
    }
    sleep(1000);
    logw(notes + " 等待结束")
}


function 启动代理环境(isdaili) {
    file.mkdirs("/sdcard/aaa/")
    setSaveLog(true, "/sdcard/aaa/", 1024 * 1024);
    //setFetchNodeMode(2, false, true);  脚本最开始的 大部分功能是这个  这个at的时候 列表抓不到数据
    setFetchNodeMode(1, false, true); //at的时候可以抓取到at列表
    let isok
    if (isdaili) {
        isok = isAgentMode()
    } else {
        isok = isAccMode()
    }

    if (isok) {
        if (isServiceOk() === false) {
            logd("服务未启动")
            while (startEnv() === false) {
                logd("代理服务启动失败 重新启动");
                sleep(3000);
            }
        }
    } else {
        logd("仅支持代理模式");
        exit();
    }

    setStopCallback(function () {
        logd("脚本已经停止");
        //释放所有资源,一般不需要调用,或者放到setStopCallback中
        logi("释放 paddleLite 对象")
        paddlelite && paddlelite.releaseAll()
        logi("释放ocrLite对象")
        ocrLite && ocrLite.releaseAll()
    });
    setExceptionCallback(function (msg) {
        logd(" 异常停止消息: " + msg);

    });


}


/**
 *
 * @param {{"label":string,"confidence":number,"x":number,"y":number,"width":number,"height":number}} obj
 * @return {boolean}
 */
function 点击ocr识别节点(obj){


    try {


        let x = obj.x + Math.ceil(obj.width * (random(30, 70) / 100))
        let y = obj.y+ Math.ceil(obj.height * (random(30, 70) / 100))


        logw("点击ocr结果 " +obj.label  +"  "+ String(x) + "," + String(y))
        clickPoint(x, y)

        sleep(random(500, 1000))

        return true
    } catch (e) {
        loge(e)
    }
    return false

}
//通过ocr识别的结果数组 点击指定的节点信息
function 点击ocr识别节点_匹配结果(result,str){

    logd("ocr结果-》 " + JSON.stringify(result))
    for (let i = 0; i < result.length; i++) {
        let obj = result[i]
        if(obj.label!==str){
            continue
        }



        try {


            let x = obj.x + Math.ceil(obj.width * (random(30, 70) / 100))
            let y = obj.y + Math.ceil(obj.height * (random(30, 70) / 100))


            logw("点击ocr结果 " + obj.label + "  " + String(x) + "," + String(y))
            clickPoint(x, y)

            sleep(random(500, 1000))

            return true
        } catch (e) {
            loge(e)
        }
    }
    return false

}

function 文本_取出中间文本(str, key1, key2) {
    let start = str.indexOf(key1);
    if (start === -1) {
        return "";
    }
    let endpos = str.indexOf(key2, start + key1.length);
    if (endpos === -1) {
        return "";
    }
    return str.substring(start + key1.length, endpos);
}

function 文本_取右边(str, key1) {
    let start = str.lastIndexOf(key1);
    if (start === -1) {
        return "";
    }
    return str.substring(start + key1.length);
}

function 文本_取左边(str, key1) {
    let start = str.indexOf(key1);
    //logi(start)
    if (start === -1) {
        return "";
    }
    return str.substring(0, start);
}


/**
 * 获取unix时间戳
 * @param {number} format 时间戳位数 10或者13
 * @returns {number}  unix时间戳
 */
function gettime(format) {

    let d = new Date()

    if (format === 10 || format === 0) {
        return Math.ceil(d.getTime() / 1000); //10位unix时间戳
    } else {
        return d.getTime(); //13位unix时间戳
    }

}


