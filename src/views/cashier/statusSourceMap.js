

/**
 * @cashier  出纳信息
 *  -use 通途
 *  -settle 结算方式
 *  -cashierTime 出纳日期
 *  -type 类型
 *  -bill 关联票据
 *  -number 结算单号
 *  -linked 关联预开
 * @unit 付款单位
 *  -campus 校内人员
 *  -otherAccount 对方账户
 *  -accountName 人员账户
 *  -bank 所属银行
 *  -account 银行账户
 *  -bankAddress 开户行
 */
export const statusMap = {
  0: {
    cashier: {
      use: false,
      settle: true,
      cashierTime: true,
      type: [false, false],
      number: true,
      linked: [true, true]
    },
    unit: {
      campus: true,
      otherAccount: true,
      accountName: true,
      bank: false,
      account: true,
      bankAddress: false,
    }
  },
  1: {
    cashier: {
      use: false,
      settle: false,
      cashierTime: true,
      type: [false, false],
      number: true,
      linked: [true, true]
    },
    unit: {
      campus: true,
      otherAccount: true,
      accountName: true,
      bank: false,
      account: true,
      bankAddress: false,
    }
  },
  2: {
    cashier: {
      use: true,
      settle: true,
      cashierTime: true,
      type: [false, true],
      number: true,
      bill: true,
      linked: [false, false]
    },
    unit: {
      campus: true,
      otherAccount: true,
      accountName: true,
      bank: true,
      account: true,
      bankAddress: true,
    }
  }
}
