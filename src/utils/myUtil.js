/**
 * 全局的自封装整合的工具类
 * 作者:simachaoyong
 * 日期:2023-01-03
 *
 */
let myUtil = {}
/**
 * 千分位格式化函数
 * @param {*} number 要转化格式的值，number类型
 */
myUtil.thsm = function (number) {
    /*
     * 参数说明：
     * number：要格式化的数字
     * decimals：保留几位小数
     * dec_point：小数点符号
     * thousands_sep：千分位符号
     * */
    var decimals = 2;
    var dec_point = '.';
    var thousands_sep = ',';
    number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            return (n).toFixed(2);
        };
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');

    var re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
        s[0] = s[0].replace(re, "$1" + sep + "$2");
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

export default myUtil
