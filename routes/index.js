const fs = require('fs'),
  fns = require('./fns'),
  multer = require('multer'),
  storage = multer.diskStorage({
    destination (req, file, cb) {
      let path = fns.representativeFilePath(req, file);

      cb(null, path);
    },
    filename (req, file, cb) {
      cb(
        null,
        `${req.query.description}-${file.originalname.split(/\s/g).join('')}`
      );
    }
  }),
  upload = multer({storage});

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

const r = getApiFiles();

module.exports = (router, passport, rbac) => {
  router.route('/init').post(r.init.init);

  router
    .route('/upload')
    .post(rbac.can('upload', 'common'), upload.single('file'), r.common.upload);

  router
    .route('/match/cities')
    .get(rbac.can('cityMatch', 'common'), r.common.cityMatch);

  router.route('/args').get(rbac.can('args', 'common'), r.common.args);

  router.route('/login').post(
    passport.authenticate('local', {
      failureRedirect: '/errors/login',
      failureFlash: true
    }),
    r.account.login
  );

  router.route('/logout').put(rbac.can('logout', 'account'), r.account.logout);

  router.route('/errors/:type').get(r.error.handler);

  // router
  //   .route('/accounts')
  //   .get(rbac.can('getlist', 'account'), r.account.getlist)
  //   .post(rbac.can('new', 'account'), r.account.new);

  // router
  //   .route('/accounts/:id')
  //   .get(rbac.can('get', 'account'), r.account.get)
  //   .put(rbac.can('update', 'account'), r.account.update)
  //   .delete(rbac.can('delete', 'account'), r.account.delete);

  // router
  //   .route('/roles')
  //   .get(rbac.can('getlist', 'role'), r.role.getlist)
  //   .post(rbac.can('new', 'role'), r.role.new);

  // router
  //   .route('/roles/:id')
  //   .get(rbac.can('get', 'role'), r.role.get)
  //   .put(rbac.can('update', 'role'), r.role.update)
  //   .delete(rbac.can('delete', 'role'), r.role.delete);

  // router
  //   .route('/accountRoles')
  //   .get(rbac.can('getlist', 'accountRole'), r.accountRole.getlist)
  //   .post(rbac.can('new', 'accountRole'), r.accountRole.new);

  // router
  //   .route('/accountRoles/:id')
  //   .get(rbac.can('get', 'accountRole'), r.accountRole.get)
  //   .put(rbac.can('update', 'accountRole'), r.accountRole.update)
  //   .delete(rbac.can('delete', 'accountRole'), r.accountRole.delete);

  // router
  //   .route('/messages')
  //   .get(rbac.can('getlist', 'message'), r.message.getlist)
  //   .post(rbac.can('new', 'message'), r.message.new);

  // router
  //   .route('/messages/:id')
  //   .get(rbac.can('get', 'message'), r.message.get)
  //   .put(rbac.can('update', 'message'), r.message.update)
  //   .delete(rbac.can('delete', 'message'), r.message.delete);

  //   router.route('/representatives')
  //     .get(rbac.can('getlist', 'representative'), r.representative.getlist)
  //     .post(rbac.can('new', 'representative'), r.representative.new)

  //   router.route('/representatives/:id')
  //     .get(rbac.can('get', 'representative'), r.representative.get)
  //     .put(rbac.can('update', 'representative'), r.representative.update)
  //     .delete(rbac.can('delete', 'representative'), r.representative.delete)

  //   router.route('/companies')
  //     .get(rbac.can('getlist', 'company'), r.company.getlist)
  //     .post(rbac.can('new', 'company'), r.company.new)

  //   router.route('/companies/:id')
  //     .get(rbac.can('get', 'company'), r.company.get)
  //     .put(rbac.can('update', 'company'), r.company.update)
  //     .delete(rbac.can('delete', 'company'), r.company.delete)

  //   router.route('/agents')
  //     .get(rbac.can('getlist', 'agent'), r.agent.getlist)
  //     .post(rbac.can('new', 'agent'), r.agent.new)

  //   router.route('/agents/:id')
  //     .get(rbac.can('get', 'agent'), r.agent.get)
  //     .put(rbac.can('update', 'agent'), r.agent.update)
  //     .delete(rbac.can('delete', 'agent'), r.agent.delete)

  //   router.route('/handlers')
  //     .get(rbac.can('getlist', 'handler'), r.handler.getlist)
  //     .post(rbac.can('new', 'handler'), r.handler.new)

  //   router.route('/handlers/:id')
  //     .get(rbac.can('get', 'handler'), r.handler.get)
  //     .put(rbac.can('update', 'handler'), r.handler.update)
  //     .delete(rbac.can('delete', 'handler'), r.handler.delete)

  //   router.route('/merchants')
  //     .get(rbac.can('getlist', 'merchant'), r.merchant.getlist)
  //     .post(rbac.can('new', 'merchant'), r.merchant.new)

  //   router.route('/merchants/:id')
  //     .get(rbac.can('get', 'merchant'), r.merchant.get)
  //     .put(rbac.can('update', 'merchant'), r.merchant.update)
  //     .delete(rbac.can('delete', 'merchant'), r.merchant.delete)

  //   router.route('/finances')
  //     .get(rbac.can('getlist', 'finance'), r.finance.getlist)
  //     .post(rbac.can('new', 'finance'), r.finance.new)

  //   router.route('/finances/:id')
  //     .get(rbac.can('get', 'finance'), r.finance.get)
  //     .put(rbac.can('update', 'finance'), r.finance.update)
  //     .delete(rbac.can('delete', 'finance'), r.finance.delete)

  //   router.route('/banks')
  //     .get(rbac.can('getlist', 'bank'), r.bank.getlist)
  //     .post(rbac.can('new', 'bank'), r.bank.new)

  //   router.route('/banks/:id')
  //     .get(rbac.can('get', 'bank'), r.bank.get)
  //     .put(rbac.can('update', 'bank'), r.bank.update)
  //     .delete(rbac.can('delete', 'bank'), r.bank.delete)

  //   router.route('/nameBatchs')
  //     .get(rbac.can('getlist', 'nameBatch'), r.nameBatch.getlist)
  //     .post(rbac.can('new', 'nameBatch'), r.nameBatch.new)

  //   router.route('/nameBatchs/:id')
  //     .get(rbac.can('get', 'nameBatch'), r.nameBatch.get)
  //     .put(rbac.can('update', 'nameBatch'), r.nameBatch.update)
  //     .delete(rbac.can('delete', 'nameBatch'), r.nameBatch.delete)

  //   router.route('/nameBatchs/release/:id')
  //     .put(rbac.can('release', 'nameBatch'), r.nameBatch.release)

  //   router.route('/filedLogs')
  //     .get(rbac.can('getlist', 'fixLog'), r.fixLog.getlist)
  //     .post(rbac.can('new', 'fixLog'), r.fixLog.new)

  //   router.route('/filedLogs/:id')
  //     .get(rbac.can('get', 'fixLog'), r.fixLog.get)
  //     .put(rbac.can('update', 'fixLog'), r.fixLog.update)
  //     .delete(rbac.can('delete', 'fixLog'), r.fixLog.delete)

  //   router.route('/representativeNumber')
  //     .get(rbac.can('representativeNumber', 'nameBatch'), r.nameBatch.representativeNumber)

  //   router.route('/linkmen')
  //     .get(rbac.can('getlist', 'linkman'), r.linkman.getlist)
  //     .post(rbac.can('new', 'linkman'), r.linkman.new)

  //   router.route('/linkmen/:id')
  //     .get(rbac.can('get', 'linkman'), r.linkman.get)
  //     .put(rbac.can('update', 'linkman'), r.linkman.update)
  //     .delete(rbac.can('delete', 'linkman'), r.linkman.delete)

  //   router.route('/generator/id')
  //     .get(rbac.can('idGenerator', 'common'), r.common.idGenerator)

  //   router.route('/generator/name')
  //     .get(rbac.can('nameGenerator', 'nameBatch'), r.nameBatch.nameGenerator)

  //   router.route('/generator/representative')
  //     .get(rbac.can('idGenerator', 'representative'), r.representative.idGenerator)

  //   router.route('/generator/representative/createFromExcel')
  //     .post(upload.single('excel'), r.common.generateYHRepresentativeFromExcel)

  //   router.route('/transactionRecords')
  //     .get(rbac.can('getlist', 'transactionRecord'), r.transactionRecord.getlist)
  //     .post(rbac.can('new', 'transactionRecord'), r.transactionRecord.new)

  //   router.route('/transactionRecords/:id')
  //     .get(rbac.can('get', 'transactionRecord'), r.transactionRecord.get)
  //     .put(rbac.can('process', 'transactionRecord'), r.transactionRecord.process)

  //   router.route('/CAs')
  //     .get(rbac.can('getlist', 'ca'), r.ca.getlist)
  //     .post(rbac.can('new', 'ca'), r.ca.new)

  //   router.route('/CAs/:id')
  //     .put(rbac.can('update', 'ca'), r.ca.update)
  //     .delete(rbac.can('delete', 'ca'), r.ca.delete)

  //   router.route('/bankAccounts/:id')
  //     .post(rbac.can('new', 'bankAccount'), r.bankAccount.new)
  //     .put(rbac.can('update', 'bankAccount'), r.bankAccount.update)

  //   router.route('/sites')
  //     .get(rbac.can('getlist', 'site'), r.site.getlist)
  //     .post(rbac.can('new', 'site'), r.site.new)

  //   router.route('/sites/:id')
  //     .get(rbac.can('get', 'site'), r.site.get)
  //     .put(rbac.can('update', 'site'), r.site.update)
  //     .delete(rbac.can('delete', 'site'), r.site.delete)

  //   router.route('/revenues')
  //     .get(rbac.can('getlist', 'revenue'), r.revenue.getlist)
  //     .post(rbac.can('new', 'revenue'), r.revenue.new)

  //   router.route('/revenues/:id')
  //     .get(rbac.can('get', 'revenue'), r.revenue.get)
  //     .put(rbac.can('update', 'revenue'), r.revenue.update)
  //     .delete(rbac.can('delete', 'revenue'), r.revenue.delete)

  //   /** * 永辉相关 ***/
  //   router.route('/yhHeadOffices')
  //     .get(rbac.can('getlist', 'yhHeadOffice'), r.yhHeadOffice.getlist)
  //     .post(rbac.can('new', 'yhHeadOffice'), r.yhHeadOffice.new)

  //   router.route('/yhHeadOffices/:id')
  //     .get(rbac.can('get', 'yhHeadOffice'), r.yhHeadOffice.get)
  //     .put(rbac.can('update', 'yhHeadOffice'), r.yhHeadOffice.update)
  //     .delete(rbac.can('delete', 'yhHeadOffice'), r.yhHeadOffice.delete)

  //   router.route('/yhStores')
  //     .get(rbac.can('getlist', 'yhStore'), r.yhStore.getlist)
  //     .post(rbac.can('new', 'yhStore'), r.yhStore.new)

  //   router.route('/yhStores/:id')
  //     .get(rbac.can('get', 'yhStore'), r.yhStore.get)
  //     .put(rbac.can('update', 'yhStore'), r.yhStore.update)
  //     .delete(rbac.can('delete', 'yhStore'), r.yhStore.delete)

  //   router.route('/yhWorkShops')
  //     .get(rbac.can('getlist', 'yhWorkShop'), r.yhWorkShop.getlist)
  //     .post(rbac.can('new', 'yhWorkShop'), r.yhWorkShop.new)

  //   router.route('/yhWorkShops/:id')
  //     .get(rbac.can('get', 'yhWorkShop'), r.yhWorkShop.get)
  //     .put(rbac.can('update', 'yhWorkShop'), r.yhWorkShop.update)
  //     .delete(rbac.can('delete', 'yhWorkShop'), r.yhWorkShop.delete)

  //   router.route('/yhPartners')
  //     .get(rbac.can('getlist', 'yhPartner'), r.yhPartner.getlist)
  //     .post(rbac.can('new', 'yhPartner'), r.yhPartner.new)

  //   router.route('/yhPartners/:id')
  //     .get(rbac.can('get', 'yhPartner'), r.yhPartner.get)
  //     .put(rbac.can('update', 'yhPartner'), r.yhPartner.update)
  //     .delete(rbac.can('delete', 'yhPartner'), r.yhPartner.delete)

  //   router.route('/districts')
  //     .get(rbac.can('getlist', 'district'), r.district.getlist)
  //     .post(rbac.can('new', 'district'), r.district.new)

  //   router.route('/districts/:id')
  //     .get(rbac.can('get', 'district'), r.district.get)
  //     .put(rbac.can('update', 'district'), r.district.update)
  //     .delete(rbac.can('delete', 'district'), r.district.delete)

  //   /** *********************** ejs 渲染路由 **************************/
  //   router.route('/render')
  //     .get(rbac.can('htmlify', 'render'), r.render.htmlify)

  //   /* ****************** 税金计算的相关接口 *************************/
  //   router.route('/baseBounds')
  //     .get(rbac.can('getlist', 'baseBound'), r.baseBound.getlist)
  //     .post(rbac.can('new', 'baseBound'), r.baseBound.new)

  //   router.route('/baseBounds/:id')
  //     .get(rbac.can('get', 'baseBound'), r.baseBound.get)
  //     .put(rbac.can('update', 'baseBound'), r.baseBound.update)
  //     .delete(rbac.can('delete', 'baseBound'), r.baseBound.delete)

  //   router.route('/insuranceRates')
  //     .get(rbac.can('getlist', 'insuranceRate'), r.insuranceRate.getlist)
  //     .post(rbac.can('new', 'insuranceRate'), r.insuranceRate.new)

  //   router.route('/insuranceRates/:id')
  //     .get(rbac.can('get', 'insuranceRate'), r.insuranceRate.get)
  //     .put(rbac.can('update', 'insuranceRate'), r.insuranceRate.update)
  //     .delete(rbac.can('delete', 'insuranceRate'), r.insuranceRate.delete)

  //   router.route('/taxRates')
  //     .get(rbac.can('getlist', 'taxRate'), r.taxRate.getlist)
  //     .post(rbac.can('new', 'taxRate'), r.taxRate.new)

  //   router.route('/taxRates/:id')
  //     .get(rbac.can('get', 'taxRate'), r.taxRate.get)
  //     .put(rbac.can('update', 'taxRate'), r.taxRate.update)
  //     .delete(rbac.can('delete', 'taxRate'), r.taxRate.delete)

  //   router.route('/calculator/quotation')
  //     .get(rbac.can('quotationCalculator', 'calculator'), r.calculator.quotationCalculator)
};
