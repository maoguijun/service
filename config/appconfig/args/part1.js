

exports.status = {
  normal: 1,
  deleted: 0
}

// 性别
exports.gender = {
  Male: 'Male',
  Female: 'Female',
  X: 'X'
}

// 前后缀类别
exports.logType = {
  prefix: 'prefix', // 前缀
  postfix: 'postfix', // 后缀
  bankName: 'bankName', // 银行名称
  bankBrief: 'bankBrief', // 银行简称
  businessScope: 'businessScope', // 企业经营范围,
  transactionRecord: 'transactionRecord'
}

exports.companyType = {
  SPE: '个人独资企业',
  LLC: '有限责任公司',
  LLP: '合伙企业'
}

exports.transactionRecordStage = {
  prevInspect: '预核名中',
  officialRegister: '正式注册中',
  applyBankAccount: '银行开户中',
  checkTax: '核税中',
  completed: '已完成注册',
  discarded: '已放弃注册'
}
