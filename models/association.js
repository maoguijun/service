/* eslint-disable */

module.exports = (models) => {

  models.account.belongsTo(models.account, {foreignKey: {name: 'createdUsr', readOnly : true}});
  models.account.hasMany(models.account, {foreignKey: {name: 'createdUsr', readOnly : true}});
  
  models.account.belongsTo(models.account, {foreignKey: {name: 'updatedUsr', readOnly : true}});
  models.account.hasMany(models.account, {foreignKey: {name: 'updatedUsr', readOnly : true}});
  
  models.account.belongsToMany(models.role, {through: 'accountRole'});
  models.role.belongsToMany(models.account, {through: 'accountRole'});
  
  models.accountRole.belongsTo(models.role, {foreignKey: {name: 'roleId', allowNull: false}});
  models.role.hasMany(models.accountRole, {foreignKey: {name: 'roleId', allowNull: false}});
  
  models.accountRole.belongsTo(models.account, {foreignKey: {name: 'accountId', allowNull: false}});
  models.account.hasMany(models.accountRole, {foreignKey: {name: 'accountId', allowNull: false}});
  
  models.grant.belongsTo(models.role, {foreignKey: {name: 'seniorRole', allowNull: false}});
  models.role.hasMany(models.grant, {foreignKey: {name: 'seniorRole', allowNull: false}});
  
  models.grant.belongsTo(models.role, {foreignKey: {name: 'juniorRole'}});
  models.role.hasMany(models.grant, {foreignKey: {name: 'juniorRole'}});
  
  models.grant.belongsTo(models.permission, {foreignKey: {name: 'permissionId'}});
  models.permission.hasMany(models.grant, {foreignKey: {name: 'permissionId'}});
  
  models.message.belongsTo(models.account, {foreignKey: {name: 'notifiedUsr', allowNull: false, readOnly : true}});
  models.account.hasMany(models.message, {foreignKey: {name: 'notifiedUsr', allowNull: false, readOnly : true}});
  
  models.representative.belongsTo(models.company, {foreignKey: {name: 'companyId'}});
  models.company.hasMany(models.representative, {foreignKey: {name: 'companyId'}});
  
  models.representative.belongsTo(models.yhStore, {foreignKey: {name: 'yhStoreId'}});
  models.yhStore.hasMany(models.representative, {foreignKey: {name: 'yhStoreId'}});
  
  models.representative.belongsTo(models.yhWorkShop, {foreignKey: {name: 'yhWorkShopId'}});
  models.yhWorkShop.hasMany(models.representative, {foreignKey: {name: 'yhWorkShopId'}});
  
  models.representative.belongsTo(models.district, {foreignKey: {name: 'districtId'}});
  models.district.hasMany(models.representative, {foreignKey: {name: 'districtId'}});
  
  models.company.belongsTo(models.agent, {foreignKey: {name: 'agentId'}});
  models.agent.hasMany(models.company, {foreignKey: {name: 'agentId'}});
  
  models.company.belongsTo(models.finance, {foreignKey: {name: 'financeId'}});
  models.finance.hasMany(models.company, {foreignKey: {name: 'financeId'}});
  
  models.company.belongsTo(models.nameBatch, {foreignKey: {name: 'nameBatchId', allowNull: false}});
  models.nameBatch.hasMany(models.company, {foreignKey: {name: 'nameBatchId', allowNull: false}});
  
  models.company.belongsTo(models.handler, {foreignKey: {name: 'handlerId'}});
  models.handler.hasMany(models.company, {foreignKey: {name: 'handlerId'}});
  
  models.company.belongsTo(models.revenue, {foreignKey: {name: 'revenueId'}});
  models.revenue.hasMany(models.company, {foreignKey: {name: 'revenueId'}});
  
  models.company.belongsTo(models.merchant, {foreignKey: {name: 'merchantId'}});
  models.merchant.hasMany(models.company, {foreignKey: {name: 'merchantId'}});
  
  models.company.belongsTo(models.site, {foreignKey: {name: 'siteId'}});
  models.site.hasMany(models.company, {foreignKey: {name: 'siteId'}});
  
  models.company.belongsTo(models.yhStore, {foreignKey: {name: 'yhStoreId'}});
  models.yhStore.hasMany(models.company, {foreignKey: {name: 'yhStoreId'}});
  
  models.company.belongsTo(models.yhWorkShop, {foreignKey: {name: 'yhWorkShopId'}});
  models.yhWorkShop.hasMany(models.company, {foreignKey: {name: 'yhWorkShopId'}});
  
  models.company.belongsTo(models.district, {foreignKey: {name: 'districtId'}});
  models.district.hasMany(models.company, {foreignKey: {name: 'districtId'}});
  
  models.CA.belongsTo(models.company, {foreignKey: {name: 'companyId'}});
  models.company.hasMany(models.CA, {foreignKey: {name: 'companyId'}});
  
  models.sitePeople.belongsTo(models.site, {foreignKey: {name: 'siteId'}});
  models.site.hasMany(models.sitePeople, {foreignKey: {name: 'siteId'}});
  
  models.revenuePeople.belongsTo(models.revenue, {foreignKey: {name: 'revenueId'}});
  models.revenue.hasMany(models.revenuePeople, {foreignKey: {name: 'revenueId'}});
  
  models.banker.belongsTo(models.bank, {foreignKey: {name: 'bankId'}});
  models.bank.hasMany(models.banker, {foreignKey: {name: 'bankId'}});
  
  models.bankAccount.belongsTo(models.company, {foreignKey: {name: 'companyId'}});
  models.company.hasMany(models.bankAccount, {foreignKey: {name: 'companyId'}});
  
  models.bankAccount.belongsTo(models.bank, {foreignKey: {name: 'bankId'}});
  models.bank.hasMany(models.bankAccount, {foreignKey: {name: 'bankId'}});
  
  models.nameBatchDetail.belongsTo(models.nameBatch, {foreignKey: {name: 'nameBatchId'}});
  models.nameBatch.hasMany(models.nameBatchDetail, {foreignKey: {name: 'nameBatchId'}});
  
  models.transactionRecord.belongsTo(models.company, {foreignKey: {name: 'companyId'}});
  models.company.hasMany(models.transactionRecord, {foreignKey: {name: 'companyId'}});
  
  models.transactionRecord.belongsTo(models.representative, {foreignKey: {name: 'representativeId'}});
  models.representative.hasMany(models.transactionRecord, {foreignKey: {name: 'representativeId'}});
  
  models.flowLog.belongsTo(models.transactionRecord, {foreignKey: {name: 'transactionRecordId'}});
  models.transactionRecord.hasMany(models.flowLog, {foreignKey: {name: 'transactionRecordId'}});
  
  models.yhStore.belongsTo(models.yhHeadOffice, {foreignKey: {name: 'yhHeadOfficeId'}});
  models.yhHeadOffice.hasMany(models.yhStore, {foreignKey: {name: 'yhHeadOfficeId'}});
  
  models.yhStore.belongsTo(models.district, {foreignKey: {name: 'districtId'}});
  models.district.hasMany(models.yhStore, {foreignKey: {name: 'districtId'}});
  
  models.yhWorkShop.belongsToMany(models.yhStore, {through: 'yhWorkShopStore'});
  models.yhStore.belongsToMany(models.yhWorkShop, {through: 'yhWorkShopStore'});
  
  models.yhPartner.belongsTo(models.yhStore, {foreignKey: {name: 'yhStoreId'}});
  models.yhStore.hasMany(models.yhPartner, {foreignKey: {name: 'yhStoreId'}});
  
  models.yhPartner.belongsTo(models.yhWorkShop, {foreignKey: {name: 'yhWorkShopId'}});
  models.yhWorkShop.hasMany(models.yhPartner, {foreignKey: {name: 'yhWorkShopId'}});
  
  models.yhPartner.belongsTo(models.district, {foreignKey: {name: 'districtId'}});
  models.district.hasMany(models.yhPartner, {foreignKey: {name: 'districtId'}});
  
  models.insuranceRateDetail.belongsTo(models.insuranceRate, {foreignKey: {name: 'insuranceRateId'}});
  models.insuranceRate.hasMany(models.insuranceRateDetail, {foreignKey: {name: 'insuranceRateId'}});
  
  models.taxRateDetail.belongsTo(models.taxRate, {foreignKey: {name: 'taxRateId'}});
  models.taxRate.hasMany(models.taxRateDetail, {foreignKey: {name: 'taxRateId'}});
  
};
