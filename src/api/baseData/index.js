import { request } from 'mars-ui-frame'

/**
 * 获取所有项目类别
 * @param {*} params
 */
export function GetAll_uR8YTYIK20(data) {
    return request({
        url: '/xmkt/projecttype/GetAll_uR8YTYIK20',
        method: 'post',
        dataType: 'json',
        data,
    })
}

/**
 * 获取科目数据
 * @param {*} params
 */
export function QueryAll_3PUSmhqzSp(data) {
    return request({
        url: '/km/subject/QueryAll_3PUSmhqzSp',
        method: 'post',
        dataType: 'json',
        data
    })
}

/**
 * 获取经济分类数据
 * @param {*} params
 */
export function QueryAll_K4be4zbP7Q(data) {
    return request({
        url: '/km/economysubject/QueryAll_K4be4zbP7Q',
        method: 'post',
        dataType: 'json',
        data
    })
}

/**
 * 获取资金来源数据
 * @param {*} params
 */
export function QueryAll_LStvbphNQE(data) {
    return request({
        url: '/km/fundsoriginsubject/QueryAll_LStvbphNQE',
        method: 'post',
        dataType: 'json',
        data
    })
}

/**
 * 获取所有字典项
 * @param {*} params
 */
export function Query_HfcOXVLBiX(data) {
    return request({
        url: '/sysparam/dictionary/Query_HfcOXVLBiX',
        method: 'post',
        dataType: 'json',
        data
    })
}

/**
 * 获取所有凭证类型
 * @param {*} params
 */
export function GetAllVoucherType_2J3oot80aS(data) {
    return request({
        url: '/kjhs/vouchertype/GetAllVoucherType_2J3oot80aS',
        method: 'post',
        dataType: 'json',
        data
    })
}

/**
 * 获取人员数据
 * @param {*} params
 */
export function queryPersonInfo(data) {
    return request({
        url: '/bizService/platform/queryPersonInfo',
        method: 'post',
        dataType: 'json',
        data
    })
}

/**
 * 获取部门数据
 * @param {*} params
 */
export function queryDepartment(data) {
    return request({
        url: '/bizService/platform/queryDepartment',
        method: 'post',
        dataType: 'json',
        data
    })
}

/**
 * 项目选择
 * @param {*} params
 */
export function SearchProject_AOFZuAWEg4(data) {
    return request({
        url: '/budgetproject/budgetproject/SearchProject_AOFZuAWEg4',
        method: 'post',
        dataType: 'json',
        data
    })
}