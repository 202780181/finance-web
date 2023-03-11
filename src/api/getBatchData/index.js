import { request } from 'mars-ui-frame'

/**
 * 获取批次列表
 * @param {*} params
 */
export function GetBatchs_Cb5eDKqtFB(data) {
    return request({
        url: '/budgetproject/budgetproject/GetBatchs_Cb5eDKqtFB',
        method: 'post',
        dataType: 'json',
        data,
    })
}

/**
 * 根据批次号获取批次的详细项目列表
 * @param {*} params
 */
export function GetProjects_6P4EQuiEB5(data) {
    return request({
        url: '/budgetproject​/budgetproject​/GetProjects_6P4EQuiEB5',
        method: 'post',
        dataType: 'json',
        data
    })
}

/**
 * 单个编辑保存
 * @param {*} params
 */
export function SaveProject_LdCz7Cv7re(data) {
    return request({
        url: '/budgetproject/budgetproject/SaveProject_LdCz7Cv7re',
        method: 'post',
        dataType: 'json',
        data
    })
}

/**
 * 根据预算项目编号获取一个项目
 * @param {*} params
 */
export function GetProject_3EMxpS4U31(data) {
    return request({
        url: '/budgetproject/budgetproject/GetProject_3EMxpS4U31',
        method: 'post',
        dataType: 'json',
        data
    })
}

/**
 * 批量编辑保存
 * @param {*} params
 */
export function SaveProjects_iePTommUNR(data) {
    return request({
        url: '/budgetproject/budgetproject/SaveProjects_iePTommUNR',
        method: 'post',
        dataType: 'json',
        data
    })
}

/**
 * 根据批次号获得项目列表（用于上一个下一个切换）
 * @param {*} params
 */
export function GetProjectCodesByBatchCode_k32OhaYMQ7(data) {
    return request({
        url: '/budgetproject/budgetproject/GetProjectCodesByBatchCode_k32OhaYMQ7',
        method: 'post',
        dataType: 'json',
        data
    })
}

/**
 * 将某个批次设置为已完成
 * @param {*} params
 */
export function Finished_9kVgt2kewj(data) {
    return request({
        url: '/budgetproject/budgetproject/Finished_9kVgt2kewj',
        method: 'post',
        dataType: 'json',
        data
    })
}


/**
 * 下达回收批次列表 下达回收批次管理
 * @param {*} params
 */
export function QueryList_GrpNBNUgJX(data) {
    return request({
        url: '/budgetproject/releaserecycling/QueryList_GrpNBNUgJX',
        method: 'post',
        dataType: 'json',
        data
    })
}

/**
 * 批次添加项目时，根据项目编号列表返回相关数据
 * @param {*} params
 */
export function AddByQueryProject_eXNKvKzWqi(data) {
    return request({
        url: '/budgetproject/releaserecycling/AddByQueryProject_eXNKvKzWqi',
        method: 'post',
        dataType: 'json',
        data
    })
}

/**
 * 根据批次号获取一个批次的详细信息用于编辑、查看、打印额度下达回收单
 * @param {*} params
 */
export function QueryByBatchNo_79cuq4FwH7(data) {
    return request({
        url: '/budgetproject/releaserecycling/QueryByBatchNo_79cuq4FwH7',
        method: 'post',
        dataType: 'json',
        data
    })
}

/**
 * 新增_编辑_保存单个批次
 * @param {*} params
 */
export function Save_J9SHlVUzWk(data) {
    return request({
        url: '/budgetproject/releaserecycling/Save_J9SHlVUzWk',
        method: 'post',
        dataType: 'json',
        data
    })
}

/**
 * 删除批次
 * @param {*} params
 */
export function Delete_gd9PEQqLWL(data) {
    return request({
        url: '/budgetproject/releaserecycling/Delete_gd9PEQqLWL',
        method: 'post',
        dataType: 'json',
        data
    })
}

/**
 * 取消审核
 * @param {*} params
 */
export function CancelAudit_yGuhhq9frB(data) {
    return request({
        url: '/budgetproject/releaserecycling/CancelAudit_yGuhhq9frB',
        method: 'post',
        dataType: 'json',
        data
    })
}

/**
 * 重新生成凭证
 * @param {*} params
 */
export function GenVoucher_CMvLOzTHIK(data) {
    return request({
        url: '/budgetproject/releaserecycling/GenVoucher_CMvLOzTHIK',
        method: 'post',
        dataType: 'json',
        data
    })
}

/**
 * 审核
 * @param {*} params
 */
export function Audit_ps7QVtrkzX(data) {
    return request({
        url: '/budgetproject/releaserecycling/Audit_ps7QVtrkzX',
        method: 'post',
        dataType: 'json',
        data
    })
}

/**
 * 取消审核\复核界面中的退回
 * @param {*} params
 */
export function CancelAudit_pz89OOvxWp(data) {
    return request({
        url: '/budgetproject/releaserecycling/CancelAudit_pz89OOvxWp',
        method: 'post',
        dataType: 'json',
        data
    })
}

/**
 * 复核
 * @param {*} params
 */
export function Review_VKJpioF22t(data) {
    return request({
        url: '/budgetproject/releaserecycling/Review_VKJpioF22t',
        method: 'post',
        dataType: 'json',
        data
    })
}


/**
 * 取消复核
 * @param {*} params
 */
export function CancelReview_C0pDufjJux(data) {
    return request({
        url: '/budgetproject/releaserecycling/CancelReview_C0pDufjJux',
        method: 'post',
        dataType: 'json',
        data
    })
}

/**
 * 下达回收明细列表
 * @param {*} params
 */
export function QueryItems_cPXfeHilxG(data) {
    return request({
        url: '/budgetproject/releaserecycling/QueryItems_cPXfeHilxG',
        method: 'post',
        dataType: 'json',
        data
    })
}


