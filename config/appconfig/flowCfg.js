// 取名批次的流程状态
exports.nameBatchStatus = {
  Created: 'Created', // 已创建
  Selected: 'Selected', // 已选入
  Failed: 'Failed', // 失败
  Success: 'Success', // 已成功
}


// 生成名的状态
exports.buildNameStatus = {
  ToApprove: 'ToApprove', // 待审核
  Failed: 'Failed', // 失败，已被其它公司占用
  Success: 'Success', // 已成功申请
  NotUsed: 'NotUsed', // 未使用的
}

// fill submit receive refuse
exports.trOpts = {
  fillCompanyApply: 'fillCompanyApply',
  companyApplySubmit: 'companyApplySubmit',
  refuseCompanyApply: 'refuseCompanyApply',
  receivePreNotice: 'receivePreNotice',
  sendNewCompanyApply: 'sendNewCompanyApply',

  fillRegisterInfo: 'fillRegisterInfo',
  registerInfoSubmit: 'registerInfoSubmit',
  receiveBusinessLicense: 'receiveBusinessLicense',
  fillBankAccountInfo: 'fillBankAccountInfo',
  openAccount: 'openAccount',
  receiveAccountLicense: 'receiveAccountLicense',

  fillTaxInspect: 'fillTaxInspect',
  taxInspectSubmit: 'taxInspectSubmit',
  receiveTaxLicense: 'receiveTaxLicense',
}

exports.trStatus = {
  companyApplied: 'companyApplied',
  companyApplySubmitted: 'companyApplySubmitted',
  waitToSendNewCompanyApplied: 'waitToSendNewCompanyApplied',
  receivedPreNotice: 'receivedPreNotice',
  sendNewCompanyApplied: 'sendNewCompanyApplied',

  filledRegisterInfo: 'filledRegisterInfo',
  registerInfoSubmitted: 'registerInfoSubmitted',
  receivedBusinessLicense: 'receivedBusinessLicense',

  filledTaxInspect: 'filledTaxInspect',
  taxInspectSubmitted: 'taxInspectSubmitted',
  receivedTaxLicense: 'receivedTaxLicense',
}

exports.trRepresentativeOpts = {
  fillRepresentativeCertificate: 'fillRepresentativeCertificate',
  receiveRepresentativeCertificate: 'receiveRepresentativeCertificate',
  receiveBusinessLicense2: 'receiveBusinessLicense2',
}

exports.trRepresentativeStatus = {
  filledRepresentativeCertificate: 'filledRepresentativeCertificate',
  receivedRepresentativeCertificate: 'receivedRepresentativeCertificate',
  receivedBusinessLicense2: 'receivedBusinessLicense2',
}

exports.trAccountOpts = {
  fillBankAccountInfo: 'fillBankAccountInfo',
  openAccount: 'openAccount',
  receiveAccountLicense: 'receiveAccountLicense'
}

exports.trAccountStatus = {
  filledBankAccountInfo: 'filledBankAccountInfo',
  openedAccount: 'openedAccount',
  receivedAccountLicense: 'receivedAccountLicense'
}

exports.transaction = {
  fillCompanyApply: 'companyApplied',
  companyApplySubmit: 'companyApplySubmitted',
  refuseCompanyApply: 'waitToSendNewCompanyApplied',
  receivePreNotice: 'receivedPreNotice',
  sendNewCompanyApply: 'sendNewCompanyApplied',

  fillRegisterInfo: 'filledRegisterInfo',
  registerInfoSubmit: 'registerInfoSubmitted',
  receiveBusinessLicense: 'receivedBusinessLicense',

  fillTaxInspect: 'filledTaxInspect',
  taxInspectSubmit: 'taxInspectSubmitted',
  receiveTaxLicense: 'receivedTaxLicense',
}

exports.representativeTransaction = {
  fillRepresentativeCertificate: 'filledRepresentativeCertificate',
  receiveRepresentativeCertificate: 'receivedRepresentativeCertificate',
  receiveBusinessLicense2: 'receivedBusinessLicense2',
}

exports.accountTransaction = {
  fillBankAccountInfo: 'filledBankAccountInfo',
  openAccount: 'openedAccount',
  receiveAccountLicense: 'receivedAccountLicense',
}

exports.personalAgreementOpts = {
  providePersonalBankInfo: 'providePersonalBankInfo',
  receivePersonalTripleAgreement: 'receivePersonalTripleAgreement',
  examinePersonalTripleAgreement: 'examinePersonalTripleAgreement'
}

exports.personalAgreementStatus = {
  providedPersonalBankInfo: 'providedPersonalBankInfo',
  receivedPersonalTripleAgreement: 'receivedPersonalTripleAgreement',
  examinedPersonalTripleAgreement: 'examinedPersonalTripleAgreement'
}

exports.personalAgreementTransaction = {
  providePersonalBankInfo: 'providedPersonalBankInfo',
  receivePersonalTripleAgreement: 'receivedPersonalTripleAgreement',
  examinePersonalTripleAgreement: 'examinedPersonalTripleAgreement'
}

exports.allStatus = {
  ...exports.trStatus,
  ...exports.trRepresentativeStatus,
  ...exports.trAccountStatus,
  ...exports.personalAgreementStatus,
  examinedTripleAgreement: 'examinedTripleAgreement'
}
