const {models, Models, sequelize} = require('../models'),
  {ApiDialect, Arg} = require('api-dialect'),
  {$, _, dftRemovedFields, init} = require('config'),
  fs = require('fs');

const getApiFiles = () => {
  let result = {};

  fs
    .readdirSync(__dirname, 'utf8')
    .filter(file => file !== 'index.js' && file.endsWith('.js'))
    .forEach(file => {
      result[file.replace(/\.js$/, '')] = require(`./${file}`);
    });

  return result;
};

exports.init = (req, res) => {
  const api = new ApiDialect(req, res);
  const run = async t => {
    await sequelize.sync({force: true});
    // 角色权限相关
    await models.account.bulkCreate(init.account, {transaction: t});
    await models.role.bulkCreate(init.role, {transaction: t});
    await models.accountRole.bulkCreate(init.accountRole, {transaction: t});

    let interfaces = getApiFiles();
    let permissions = [];
    let grants = [];

    Object.keys(interfaces).forEach(object => {
      Object.keys(interfaces[object]).forEach(operation => {
        permissions.push({
          id: `${operation}_${object}`,
          object,
          operation
        });

        grants.push({
          seniorRole: 'developer',
          permissionId: `${operation}_${object}`
        });

        grants.push({
          seniorRole: 'manager',
          permissionId: `${operation}_${object}`
        });
      });
    });

    await models.permission.bulkCreate(permissions, {transaction: t});
    await models.grant.bulkCreate(grants, {transaction: t});
    // 业务初始化数据
    // await Models.representative.create(init.representative, t)
    // await Models.agent.create(init.agent, t)
    // await Models.handler.create(init.handler, t)
    // await Models.merchant.create(init.merchant, t)
    // await Models.finance.create(init.finance, t)
    // await Models.site.create(init.site, t)
    // await Models.sitePeople.create(init.sitePeople, t)
    // await Models.revenue.create(init.revenue, t)
    // await Models.revenuePeople.create(init.revenuePeople, t)
    // await Models.nameBatch.create(init.nameBatch, t)
    // await models.nameBatchDetail.bulkCreate(init.nameBatchDetail, {transaction: t})
    // await models.company.bulkCreate(init.company, {transaction: t})
    // await models.bank.bulkCreate(init.bank, {transaction: t})
    // await models.banker.bulkCreate(init.banker, {transaction: t})
    // await models.transactionRecord.bulkCreate(init.transactionRecord, {transaction: t})
    // await models.bankAccount.bulkCreate(init.bankAccount, {transaction: t})
    // await Models.yhHeadOffice.create(init.yhHeadOffice, t)
    // await Models.district.create(init.district, t)
    // await Models.yhStore.create(init.yhStore, t)
    // await Models.yhWorkShop.create(init.yhWorkShop, t)
    // await Models.yhPartner.create(init.yhPartner, t)

    // 税金计算相关
    // 初始化缴费基数上下限
    // await models.baseBound.bulkCreate(init.baseBounds, {transaction: t})

    // 初始化缴费比率
    // for (let i = 0, len = init.insuranceRates.length; i < len; i++) {
    //   let rate = init.insuranceRates[i];
    //   let $rate = await models.insuranceRate.create(rate, {transaction: t});

    //   rate.details.forEach(item => item.insuranceRateId = $rate.id);
    //   await models.insuranceRateDetail.bulkCreate(rate.details, {transaction: t});
    // }

    // 初始化所得税率
    // for (let i = 0, len = init.taxRates.length; i < len; i++) {
    //   let taxRate = init.taxRates[i];
    //   let $taxRate = await models.taxRate.create(taxRate, {transaction: t});

    //   taxRate.details.forEach(item => item.taxRateId = $taxRate.id);
    //   await models.taxRateDetail.bulkCreate(taxRate.details, {transaction: t});
    // }

    return '初始化数据成功';
  };

  sequelize
    .transaction(t => run(t))
    .then(obj => {
      api.setResponse(obj).send({remove: dftRemovedFields});
    })
    .catch(err => api.error(err));
};
