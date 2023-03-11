export default {
    /**
     * 格式化日期格式
     * @param {*} date new Date() 实例
     * @param {*} fmt 格式， 例如： yyyy-MM-dd HH:mm:ss
     * @return {*} 返回整理之后的时间
     */
    formate(date, fmt) {
        if (!date) return "";
        let o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    /*
    **字符串转化成年月日
    */
    parseMonth(str) {
        if (!str) return
        let year = str.slice(0, 4)
        let month = str.slice(4, 6)
        let day = str.slice(6, 8)
        let hour = str.slice(8, 10)
        let minute = str.slice(10, 12)
        return `${year}年${month}月${day}日 ${hour}点${minute}分`
    },


    /*除法函数，用来得到精确的除法结果
    * 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
    * 调用：accDiv(arg1,arg2)
    * 返回值：arg1除以arg2的精确结果
    */
    accDiv(arg1, arg2) {
        let t1 = 0,
            t2 = 0,
            r1, r2;
        try {
            t1 = arg1.toString().split(".")[1].length
        } catch (e) { }
        try {
            t2 = arg2.toString().split(".")[1].length
        } catch (e) { }
        r1 = Number(arg1.toString().replace(".", ""));
        r2 = Number(arg2.toString().replace(".", ""));
        return (r1 / r2) * Math.pow(10, t2 - t1);
    },

    /*乘法函数，用来得到精确的乘法结果
     * 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
     * 调用：accMul(arg1,arg2)
     * 返回值：arg1乘以arg2的精确结果
     */
    accMul(arg1, arg2) {
        let m = 0,
            s1 = arg1.toString(),
            s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length
        } catch (e) { }
        try {
            m += s2.split(".")[1].length
        } catch (e) { }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    },

}