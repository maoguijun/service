exports.bigNum = 100000000

// 小规模纳税人增值税率
exports.VATRate = 0.03

// 普通纳税人增值税率
exports.comVATRate = 0.06

// 增值税附加税率
exports.surtaxRate = 0.12


// 记账费用
exports.agencyCost = 100

// 管理成本
exports.managerCost = 0

// 小规模纳税人税上税
exports.minTaxOnTax = 0.0337

// 一般纳税人
exports.comTaxOnTax = 0.0677

// 核定利润率
exports.profitRate = 0.1

// 国内 or 国外
exports.location = {
  domestic: 'domestic', // 国内
  oversea: 'oversea', // 国外
}

// 国内个体工资薪金免征额
exports.domesticExemption = 3500

// 国外个体工资薪金免征额
exports.overseeExemption = 4800

// 计算类别
exports.calculatorType = {
  soleCompany: 'soleCompany', // 个人独资企业
  soleLabor: 'soleLabor', // 个人所得税-劳务报酬
  soleSalary: 'soleSalary', // 个人所得税-工资薪金
}

// 所有的城市
exports.cityArr = {
  ShangHai: 'ShangHai'
}

// 上下限基数类别
exports.baseType = {
  socialSecurity: 'socialSecurity', // 社保
  housingFund: 'housingFund', // 公积金
}

// 付款人类别
exports.payorType = {
  individual: 'individual', // 个人的
  company: 'company', // 公司的
}

// 社保类别
exports.insuranceType = {
  housingFund: 'housingFund', //  住房公积金
  retirementInsurance: 'retirementInsurance', // 养老保险
  healthInsurance: 'healthInsurance', // 医疗保险
  unemploymentInsurance: 'unemploymentInsurance', // 失业保险
  injuryInsurance: 'injuryInsurance', // 工伤保险
  maternityInsurance: 'maternityInsurance', // 生育保险
  supplyHousingFund: 'supplyHousingFund', //   补充住房公积金
  supplyRetirementInsurance: 'supplyRetirementInsurance', // 补充养老保险
  supplyHealthInsurance: 'supplyHealthInsurance', // 补充医疗保险
}

