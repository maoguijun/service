/* eslint-disable */

const
    Sequelize = require('sequelize')
  , cfg = require('../config/appconfig/args')
  , flowCfg = require('../config/appconfig/flowCfg')
  ;

module.exports = (sequelize)=>{

  const account = sequelize.define("account", {
    id: {type: Sequelize.STRING , primaryKey: true,}, // 唯一ID，域账户用户名
    name: {type: Sequelize.STRING , allowNull: false, }, // 姓名，
    password: {type: Sequelize.STRING , allowNull: false, }, // 密码，
    title: {type: Sequelize.STRING ,}, // 职位，
    mail: {type: Sequelize.STRING ,}, // 邮箱，
    telephoneNumber: {type: Sequelize.STRING ,}, // 分机号，
    status: {type: Sequelize.INTEGER , defaultValue: 1,  readOnly: true, }, // 状态，1：存在；0：删除
    remark: {type: Sequelize.STRING ,}, // 备注，
  },{
    freezeTableName: true,
    indexes:[
      {method: 'BTREE',fields: ['name']},
      {method: 'BTREE',fields: ['title']},
      {method: 'BTREE',fields: ['status']},
      
    ],
    description: '用户'
  });

  const role = sequelize.define("role", {
    id: {type: Sequelize.STRING , primaryKey: true,}, // 角色ID，
    name: {type: Sequelize.STRING , allowNull: false, }, // 角色名，
    status: {type: Sequelize.INTEGER , defaultValue: 1,  readOnly: true, }, // 状态，1：存在；0：删除
  },{
    freezeTableName: true,
    indexes:[
      {method: 'BTREE',fields: ['name']},
      {method: 'BTREE',fields: ['status']},
      
    ],
    description: '角色'
  });

  const accountRole = sequelize.define("accountRole", {
    id: {type: Sequelize.UUID , primaryKey: true, defaultValue: Sequelize.UUIDV1,  readOnly: true, }, // ，
    status: {type: Sequelize.INTEGER , defaultValue: 1,  readOnly: true, }, // 当前状态，默认1，是否被删除
  },{
    freezeTableName: true,
    indexes:[
      
    ],
    description: '用户角色关联表'
  });

  const permission = sequelize.define("permission", {
    id: {type: Sequelize.STRING , primaryKey: true,}, // 权限ID，操作方式+操作对象
    object: {type: Sequelize.STRING , allowNull: false, }, // 操作对象，
    operation: {type: Sequelize.STRING , allowNull: false, }, // 操作方式，
    status: {type: Sequelize.INTEGER , defaultValue: 1,  readOnly: true, }, // 状态，1：存在；0：删除
  },{
    freezeTableName: true,
    indexes:[
      {method: 'BTREE',fields: ['status']},
      
    ],
    description: '权限表'
  });

  const grant = sequelize.define("grant", {
    id: {type: Sequelize.UUID , primaryKey: true, defaultValue: Sequelize.UUIDV1,  readOnly: true, }, // ，
    status: {type: Sequelize.INTEGER , defaultValue: 1,  readOnly: true, }, // 状态，1：存在；0：删除
  },{
    freezeTableName: true,
    indexes:[
      {method: 'BTREE',fields: ['status']},
      
    ],
    description: '角色权限关联表'
  });

  const message = sequelize.define("message", {
    id: {type: Sequelize.UUID , primaryKey: true, defaultValue: Sequelize.UUIDV1,  readOnly: true, }, // ，
    msg: {type: Sequelize.TEXT , allowNull: false, }, // 文字描述，
    readFlag: {type: Sequelize.ENUM('Y','N') , defaultValue: 'N',  allowNull: false,  readOnly: true, }, // 已读字段，
    status: {type: Sequelize.INTEGER , defaultValue: 1,  readOnly: true, }, // 状态，
  },{
    freezeTableName: true,
    indexes:[
      {method: 'BTREE',fields: ['readFlag']},
      {method: 'BTREE',fields: ['status']},
      
    ],
    description: '通知消息表'
  });

  const representative = sequelize.define("representative", {
    id: {type: Sequelize.STRING , primaryKey: true,}, // ，
    name: {type: Sequelize.STRING , allowNull: false, }, // 姓名，
    gender: {type: Sequelize.ENUM , values: Object.values(cfg.gender) ,}, // 性别，
    birthday: {type: Sequelize.DATE ,}, // 生日，
    nation: {type: Sequelize.STRING ,}, // 民族，
    culturalLevel: {type: Sequelize.STRING ,}, // 文化程度，
    politicalLevel: {type: Sequelize.STRING ,}, // 政治面貌，
    mobile: {type: Sequelize.STRING , allowNull: false, }, // 移动电话，
    telephone: {type: Sequelize.STRING , allowNull: false, }, // 固定电话，
    post: {type: Sequelize.STRING , allowNull: false, }, // 邮政编码，
    email: {type: Sequelize.STRING , allowNull: false, }, // 邮箱，
    idNum: {type: Sequelize.STRING , allowNull: false, }, // 证件号码，
    idPlace: {type: Sequelize.STRING , allowNull: false, }, // 证件居所，
    idStartDate: {type: Sequelize.DATE ,}, // 证件开始日期，
    idEndDate: {type: Sequelize.DATE ,}, // 证件结束日期，
    idFrontPhoto: {type: Sequelize.STRING ,}, // 证件正面照，
    idReversePhoto: {type: Sequelize.STRING ,}, // 证件反面照，
    idHandledPhoto: {type: Sequelize.STRING ,}, // 手持证件照，
    representativeCertificate: {type: Sequelize.STRING ,}, // 法人一证通照片，
    authorizationPhoto: {type: Sequelize.STRING ,}, // 手持开柜授权书照，
    bankName: {type: Sequelize.STRING , allowNull: false, }, // 收款银行，
    accountNum: {type: Sequelize.STRING , allowNull: false, }, // 收款账号，
    occupation: {type: Sequelize.STRING ,}, // 申请前职业状况，
    validFlag: {type: Sequelize.ENUM('Y','N') , defaultValue: 'Y', }, // 是否采用当前法人，
    idType: {type: Sequelize.STRING ,}, // 证件类型，
    stockPercentage: {type: Sequelize.DECIMAL(6,4) , defaultValue: 1, }, // 持股比例，
    limitedPartnerFlag: {type: Sequelize.ENUM('Y','N') ,}, // 是否为有限合伙企业合伙人，
    ownPersonalFlag: {type: Sequelize.ENUM('Y','N') ,}, // 是否有个人独资企业，
    ownABCCardFlag: {type: Sequelize.ENUM('Y','N') ,}, // 是否有中国农业银行借记卡，
    agreementWithFreetopiaPhoto: {type: Sequelize.STRING ,}, // 法人协议，
    status: {type: Sequelize.INTEGER , defaultValue: 1,  readOnly: true, }, // 状态，1：存在；0：删除
    remark: {type: Sequelize.STRING ,}, // 备注，
  },{
    freezeTableName: true,
    indexes:[
      {method: 'BTREE',fields: ['name']},
      {method: 'BTREE',fields: ['status']},
      
    ],
    description: '法人代表'
  });

  const company = sequelize.define("company", {
    id: {type: Sequelize.STRING , primaryKey: true, allowNull: false, }, // 编号，规则待定
    name: {type: Sequelize.STRING ,}, // 正式名称-2，
    registeredCapital: {type: Sequelize.INTEGER ,}, // 注册资金，
    companyType: {type: Sequelize.STRING , allowNull: false, }, // 企业类型，
    businessScope: {type: Sequelize.TEXT , allowNull: false, }, // 经营范围，
    rentStartDate: {type: Sequelize.DATE ,}, // 租房开始日期-2，
    rentEndDate: {type: Sequelize.DATE ,}, // 租房结束日期-2，
    approvalNum: {type: Sequelize.STRING ,}, // 名称核准文号-2，
    registeredAdd: {type: Sequelize.STRING ,}, // 注册地址-2，
    businessAdd: {type: Sequelize.STRING , allowNull: false, }, // 经营地址，
    post: {type: Sequelize.STRING , allowNull: false, }, // 邮政编号，
    telephone: {type: Sequelize.STRING , allowNull: false, }, // 固定电话，
    socialCreditNum: {type: Sequelize.STRING ,}, // 统一社会信用代码号-3，
    establishDate: {type: Sequelize.DATE ,}, // 成立日期-3，
    generalTaxpayerFlag: {type: Sequelize.ENUM('Y','N') , allowNull: false, }, // 是否一般纳税人，
    invNum: {type: Sequelize.INTEGER , allowNull: false, }, // 发票月使用量，
    CANum: {type: Sequelize.STRING ,}, // CA证书序列号-5，
    companyAdd: {type: Sequelize.STRING , defaultValue: '上海新村', }, // 企业住所地，
    landlord: {type: Sequelize.STRING , defaultValue: '上海新村经济小区管理委员会', }, // 企业发租方，
    region: {type: Sequelize.STRING , defaultValue: '上海新村经济小区', }, // 小区，
    rentYear: {type: Sequelize.INTEGER , defaultValue: 10, }, // 租房年限，
    rentAmount: {type: Sequelize.INTEGER , defaultValue: 1200000, }, // 年租金，
    registerPhone: {type: Sequelize.STRING , defaultValue: '59650861', }, // 注册联系电话，
    registerPost: {type: Sequelize.STRING , defaultValue: '202172', }, // 注册邮政编码，
    ownerFlag: {type: Sequelize.ENUM('0','1') , defaultValue: '1', }, // 股东或实际控制人标识，
    ownerType: {type: Sequelize.ENUM('1','2','3','4','5','6') , defaultValue: '6', }, // 股东或实际控制人类型，
    country: {type: Sequelize.STRING , defaultValue: '中国', }, // 国家，
    currency: {type: Sequelize.STRING , defaultValue: '人民币', }, // 币种，
    investType: {type: Sequelize.ENUM('1','2','3','4','5','6') , defaultValue: '1', }, // 出资方式，
    responsibleFlag: {type: Sequelize.ENUM('0','1') , defaultValue: '0', }, // 法定代表人或负责人标识，
    authorizeBusiness: {type: Sequelize.STRING , defaultValue: '1,2', }, // 授权办理业务，逗号分隔
    authorizePermission: {type: Sequelize.ENUM('1','2') , defaultValue: '1', }, // 授权权限，
    accountSoftware: {type: Sequelize.STRING , defaultValue: '用友T3', }, // 会计核算软件，
    businessLicense: {type: Sequelize.STRING ,}, // 营业执照，
    accountLicense: {type: Sequelize.STRING ,}, // 开户许可证，
    status: {type: Sequelize.INTEGER , defaultValue: 1,  readOnly: true, }, // 状态，1：存在；0：删除
  },{
    freezeTableName: true,
    indexes:[
      {method: 'BTREE',fields: ['status']},
      
    ],
    description: '企业'
  });

  const CA = sequelize.define("CA", {
    id: {type: Sequelize.UUID , primaryKey: true, defaultValue: Sequelize.UUIDV1,  readOnly: true, }, // ，
    serialNum: {type: Sequelize.STRING , allowNull: false, }, // 序列号，
    password: {type: Sequelize.STRING , allowNull: false, }, // 序列号密码，
    validFlag: {type: Sequelize.ENUM('Y','N') , defaultValue: 'N', }, // 是否被采用，
    status: {type: Sequelize.INTEGER , defaultValue: 1,  readOnly: true, }, // 当前状态，默认1，是否被删除
  },{
    freezeTableName: true,
    indexes:[
      
    ],
    description: '企业CA证书'
  });

  const agent = sequelize.define("agent", {
    id: {type: Sequelize.UUID , primaryKey: true, defaultValue: Sequelize.UUIDV1,  readOnly: true, }, // ，
    name: {type: Sequelize.STRING , allowNull: false, }, // 姓名，
    mobile: {type: Sequelize.STRING , allowNull: false, }, // 移动电话，
    email: {type: Sequelize.STRING , allowNull: false, }, // 邮箱，
    gender: {type: Sequelize.ENUM , values: Object.values(cfg.gender) , allowNull: false, }, // 性别，
    idNum: {type: Sequelize.STRING , allowNull: false, }, // 证件号码，
    idPlace: {type: Sequelize.STRING , allowNull: false, }, // 证件居所，
    idFrontPhoto: {type: Sequelize.STRING ,}, // 证件正面照，
    idReversePhoto: {type: Sequelize.STRING ,}, // 证件反面照，
    idType: {type: Sequelize.STRING , allowNull: false, }, // 证件类型，
    position: {type: Sequelize.STRING , defaultValue: '项目经理', }, // 职务，
    status: {type: Sequelize.INTEGER , defaultValue: 1,  readOnly: true, }, // 当前状态，默认1，是否被删除
  },{
    freezeTableName: true,
    indexes:[
      
    ],
    description: '代理人'
  });

  const handler = sequelize.define("handler", {
    id: {type: Sequelize.UUID , primaryKey: true, defaultValue: Sequelize.UUIDV1,  readOnly: true, }, // 唯一ID，
    name: {type: Sequelize.STRING , allowNull: false,  unique: true, }, // 经办人姓名，
    idNum: {type: Sequelize.STRING , allowNull: false, }, // 经办人身份证，
    telephone: {type: Sequelize.STRING , allowNull: false, }, // 经办人固定电话，
    status: {type: Sequelize.INTEGER , defaultValue: 1,  readOnly: true, }, // 状态，1：存在；0：删除
  },{
    freezeTableName: true,
    indexes:[
      {method: 'BTREE',fields: ['status']},
      
    ],
    description: '经办人'
  });

  const merchant = sequelize.define("merchant", {
    id: {type: Sequelize.UUID , primaryKey: true, defaultValue: Sequelize.UUIDV1,  readOnly: true, }, // 唯一ID，
    name: {type: Sequelize.STRING , defaultValue: '张琼',  allowNull: false,  unique: true, }, // 招商人员姓名，
    mobile: {type: Sequelize.STRING , defaultValue: '15221364715',  allowNull: false, }, // 招商人员手机，
    telephone: {type: Sequelize.STRING , defaultValue: '59650861',  allowNull: false, }, // 招商人员电话，
    status: {type: Sequelize.INTEGER , defaultValue: 1,  readOnly: true, }, // 状态，1：存在；0：删除
  },{
    freezeTableName: true,
    indexes:[
      {method: 'BTREE',fields: ['status']},
      
    ],
    description: '招商人员'
  });

  const finance = sequelize.define("finance", {
    id: {type: Sequelize.UUID , primaryKey: true, defaultValue: Sequelize.UUIDV1,  readOnly: true, }, // ，
    name: {type: Sequelize.STRING , allowNull: false, }, // 姓名，
    mobile: {type: Sequelize.STRING , allowNull: false, }, // 移动电话，
    email: {type: Sequelize.STRING , allowNull: false, }, // 邮箱，
    idNum: {type: Sequelize.STRING , allowNull: false, }, // 身份证号码，
    idFrontPhoto: {type: Sequelize.STRING ,}, // 证件正面照，
    idReversePhoto: {type: Sequelize.STRING ,}, // 证件反面照，
    jobCertificatePhoto: {type: Sequelize.STRING ,}, // 上岗证照片，
    idType: {type: Sequelize.STRING , allowNull: false, }, // 身份证件类型，
    status: {type: Sequelize.INTEGER , defaultValue: 1,  readOnly: true, }, // 当前状态，默认1，是否被删除
  },{
    freezeTableName: true,
    indexes:[
      
    ],
    description: '财务'
  });

  const linkman = sequelize.define("linkman", {
    id: {type: Sequelize.UUID , primaryKey: true, defaultValue: Sequelize.UUIDV1,  readOnly: true, }, // ，
    name: {type: Sequelize.STRING , allowNull: false, }, // 姓名，
    mobile: {type: Sequelize.STRING , allowNull: false, }, // 移动电话，
    email: {type: Sequelize.STRING , allowNull: false, }, // 邮箱，
    idNum: {type: Sequelize.STRING , allowNull: false, }, // 身份证号码，
    status: {type: Sequelize.INTEGER , defaultValue: 1,  readOnly: true, }, // 当前状态，默认1，是否被删除
  },{
    freezeTableName: true,
    indexes:[
      
    ],
    description: '联络员'
  });

  const site = sequelize.define("site", {
    id: {type: Sequelize.UUID , primaryKey: true, defaultValue: Sequelize.UUIDV1,  readOnly: true, }, // ，
    name: {type: Sequelize.STRING , allowNull: false,  unique: true, }, // 园区名称，
    address: {type: Sequelize.STRING , allowNull: false, }, // 园区地址，
    status: {type: Sequelize.INTEGER , defaultValue: 1,  readOnly: true, }, // 当前状态，默认1，是否被删除
  },{
    freezeTableName: true,
    indexes:[
      
    ],
    description: '园区'
  });

  const sitePeople = sequelize.define("sitePeople", {
    id: {type: Sequelize.UUID , primaryKey: true, defaultValue: Sequelize.UUIDV1,  readOnly: true, }, // ，
    name: {type: Sequelize.STRING , allowNull: false, }, // 姓名，
    mobile: {type: Sequelize.STRING ,}, // 手机，
    telephone: {type: Sequelize.STRING ,}, // 电话，
    position: {type: Sequelize.STRING ,}, // 职位，
    chargeFlag: {type: Sequelize.ENUM('Y','N') , defaultValue: 'N', }, // 是否是负责人，
    status: {type: Sequelize.INTEGER , defaultValue: 1,  readOnly: true, }, // 当前状态，默认1，是否被删除
  },{
    freezeTableName: true,
    indexes:[
      
    ],
    description: '园区工作人员'
  });

  const revenue = sequelize.define("revenue", {
    id: {type: Sequelize.UUID , primaryKey: true, defaultValue: Sequelize.UUIDV1,  readOnly: true, }, // ，
    name: {type: Sequelize.STRING , allowNull: false,  unique: true, }, // 税务局名称，
    address: {type: Sequelize.STRING , allowNull: false, }, // 税务局地址，
    status: {type: Sequelize.INTEGER , defaultValue: 1,  readOnly: true, }, // 当前状态，默认1，是否被删除
  },{
    freezeTableName: true,
    indexes:[
      
    ],
    description: '税务局'
  });

  const revenuePeople = sequelize.define("revenuePeople", {
    id: {type: Sequelize.UUID , primaryKey: true, defaultValue: Sequelize.UUIDV1,  readOnly: true, }, // ，
    name: {type: Sequelize.STRING , allowNull: false, }, // 姓名，
    mobile: {type: Sequelize.STRING ,}, // 手机，
    telephone: {type: Sequelize.STRING ,}, // 电话，
    position: {type: Sequelize.STRING ,}, // 职位，
    chargeFlag: {type: Sequelize.ENUM('Y','N') , defaultValue: 'N', }, // 是否是负责人，
    status: {type: Sequelize.INTEGER , defaultValue: 1,  readOnly: true, }, // 当前状态，默认1，是否被删除
  },{
    freezeTableName: true,
    indexes:[
      
    ],
    description: '税务局工作人员'
  });

  const bank = sequelize.define("bank", {
    id: {type: Sequelize.UUID , primaryKey: true, defaultValue: Sequelize.UUIDV1,  readOnly: true, }, // ，
    name: {type: Sequelize.STRING , allowNull: false, }, // 开户行名称，
    brief: {type: Sequelize.STRING , allowNull: false, }, // 银行简称，
    address: {type: Sequelize.STRING ,}, // 地址，
    telephone: {type: Sequelize.STRING ,}, // 联系电话，
    remark: {type: Sequelize.STRING ,}, // 备注，
    status: {type: Sequelize.INTEGER , defaultValue: 1,  readOnly: true, }, // 当前状态，默认1，是否被删除
  },{
    freezeTableName: true,
    indexes:[
      
    ],
    description: '银行'
  });

  const banker = sequelize.define("banker", {
    id: {type: Sequelize.UUID , primaryKey: true, defaultValue: Sequelize.UUIDV1,  readOnly: true, }, // ，
    name: {type: Sequelize.STRING , allowNull: false, }, // 姓名，
    mobile: {type: Sequelize.STRING , allowNull: false, }, // 移动电话，
    telephone: {type: Sequelize.STRING ,}, // 固定电话，
    email: {type: Sequelize.STRING , allowNull: false, }, // 邮箱，
    gender: {type: Sequelize.ENUM , values: Object.values(cfg.gender) ,}, // 性别，
    position: {type: Sequelize.STRING ,}, // 职位，
    remark: {type: Sequelize.STRING ,}, // 备注，
    status: {type: Sequelize.INTEGER , defaultValue: 1,  readOnly: true, }, // 当前状态，默认1，是否被删除
  },{
    freezeTableName: true,
    indexes:[
      
    ],
    description: '银行人员'
  });

  const bankAccount = sequelize.define("bankAccount", {
    id: {type: Sequelize.UUID , primaryKey: true, defaultValue: Sequelize.UUIDV1,  readOnly: true, }, // ，
    name: {type: Sequelize.STRING , allowNull: false, }, // 开户行名称，
    accountNum: {type: Sequelize.STRING ,}, // 对公账户，
    registrationNum: {type: Sequelize.STRING ,}, // 开户登记证号，
    licenseDate: {type: Sequelize.DATE ,}, // 开户许可证发证日期，
    openingDate: {type: Sequelize.DATE ,}, // 对公开户日期，
    type: {type: Sequelize.ENUM('official','personal') , defaultValue: 'official', }, // 账号类型，
    remark: {type: Sequelize.STRING ,}, // 备注，
    status: {type: Sequelize.INTEGER , defaultValue: 1,  readOnly: true, }, // 当前状态，默认1，是否被删除
  },{
    freezeTableName: true,
    indexes:[
      
    ],
    description: '银行账号'
  });

  const nameBatch = sequelize.define("nameBatch", {
    id: {type: Sequelize.STRING , primaryKey: true,}, // ，
    representativeName: {type: Sequelize.STRING , allowNull: false, }, // 法人，
    idNum: {type: Sequelize.STRING , allowNull: false, }, // 法人身份证号，
    prefix: {type: Sequelize.STRING ,}, // 前缀，
    postfix: {type: Sequelize.STRING ,}, // 后缀，
    limitWord: {type: Sequelize.STRING ,}, // 限定词，
    banWord: {type: Sequelize.STRING ,}, // 禁用词，可能有多个字，逗号分隔
    buildNum: {type: Sequelize.INTEGER , allowNull: false, }, // 生成字数，
    flowStatus: {type: Sequelize.ENUM , values: Object.values(flowCfg.nameBatchStatus) , allowNull: false,  readOnly: true, }, // 流程状态，
    feedbackDate: {type: Sequelize.DATE ,}, // 反馈日期，
    status: {type: Sequelize.INTEGER , defaultValue: 1,  readOnly: true, }, // 状态，1：存在；0：删除
    remark: {type: Sequelize.STRING ,}, // 备注，
  },{
    freezeTableName: true,
    indexes:[
      {method: 'BTREE',fields: ['status']},
      
    ],
    description: '公司取名批次'
  });

  const nameBatchDetail = sequelize.define("nameBatchDetail", {
    id: {type: Sequelize.UUID , primaryKey: true, defaultValue: Sequelize.UUIDV1,  readOnly: true, }, // 唯一ID，
    index: {type: Sequelize.INTEGER , allowNull: false, }, // 序号，
    buildName: {type: Sequelize.STRING , allowNull: false, }, // 生成名，
    spell: {type: Sequelize.STRING , allowNull: false, }, // 拼音，
    name: {type: Sequelize.STRING , allowNull: false, }, // 公司全称，
    flowStatus: {type: Sequelize.ENUM , values: Object.values(flowCfg.buildNameStatus) , allowNull: false,  readOnly: true, }, // 生成名状态，
    status: {type: Sequelize.INTEGER , defaultValue: 1,  readOnly: true, }, // 状态，1：存在；0：删除
    remark: {type: Sequelize.STRING ,}, // 备注，
  },{
    freezeTableName: true,
    indexes:[
      {method: 'BTREE',fields: ['index']},
      {method: 'BTREE',fields: ['status']},
      
    ],
    description: '公司取名 log 详情'
  });

  const transactionRecord = sequelize.define("transactionRecord", {
    id: {type: Sequelize.STRING , primaryKey: true,}, // ，
    stage: {type: Sequelize.ENUM , values: Object.values(cfg.transactionRecordStage) , readOnly: true, }, // 进程描述，
    flowStatus: {type: Sequelize.ENUM , values: Object.values(flowCfg.trStatus) , readOnly: true, }, // 主流程，
    representativeFlowStatus: {type: Sequelize.ENUM , values: Object.values(flowCfg.trRepresentativeStatus) , readOnly: true, }, // 法人一证通流程，
    accountFlowStatus: {type: Sequelize.ENUM , values: Object.values(flowCfg.trAccountStatus) , readOnly: true, }, // 银行开户流程，
    examinedTripleAgreement: {type: Sequelize.ENUM('Y','N') ,}, // 已验证三方协议，
    personalAgreementFlosStatus: {type: Sequelize.ENUM , values: Object.values(flowCfg.personalAgreementStatus) ,}, // 金税盘后个人验证流程，
    status: {type: Sequelize.INTEGER , defaultValue: 1,  readOnly: true, }, // 当前状态，默认1，是否被删除
  },{
    freezeTableName: true,
    indexes:[
      {method: 'BTREE',fields: ['flowStatus']},
      
    ],
    description: '文书'
  });

  const flowLog = sequelize.define("flowLog", {
    id: {type: Sequelize.UUID , primaryKey: true, defaultValue: Sequelize.UUIDV1,  readOnly: true, }, // ，
    flowStatus: {type: Sequelize.ENUM , values: Object.values(flowCfg.allStatus) , allowNull: false,  readOnly: true, }, // 文书状态，
    remark: {type: Sequelize.STRING ,}, // 备注，
    date: {type: Sequelize.DATE , allowNull: false, }, // 确认日期，
    status: {type: Sequelize.INTEGER , defaultValue: 1,  readOnly: true, }, // 当前状态，默认1，是否被删除
  },{
    freezeTableName: true,
    indexes:[
      
    ],
    description: '文书流程记录'
  });

  const filedLog = sequelize.define("filedLog", {
    id: {type: Sequelize.UUID , primaryKey: true, defaultValue: Sequelize.UUIDV1,  readOnly: true, }, // 唯一ID，
    logType: {type: Sequelize.ENUM , values: Object.values(cfg.logType) , allowNull: false, }, // log类别，
    content: {type: Sequelize.STRING , allowNull: false, }, // 内容，
    status: {type: Sequelize.INTEGER , defaultValue: 1,  readOnly: true, }, // 状态，1：存在；0：删除
    remark: {type: Sequelize.STRING ,}, // 备注，
  },{
    freezeTableName: true,
    indexes:[
      {method: 'BTREE',fields: ['status']},
      
    ],
    description: '字段历史记录'
  });

  const yhHeadOffice = sequelize.define("yhHeadOffice", {
    id: {type: Sequelize.UUID , primaryKey: true, defaultValue: Sequelize.UUIDV1,  readOnly: true, }, // 唯一ID，
    name: {type: Sequelize.STRING , allowNull: false, }, // 总部名称，
    managerName: {type: Sequelize.STRING , allowNull: false, }, // 负责人姓名，
    mobile: {type: Sequelize.STRING ,}, // 负责人手机，
    telephone: {type: Sequelize.STRING ,}, // 负责人电话，
    status: {type: Sequelize.INTEGER , defaultValue: 1,  readOnly: true, }, // 状态，1：存在；0：删除
  },{
    freezeTableName: true,
    indexes:[
      {method: 'BTREE',fields: ['status']},
      
    ],
    description: '永辉总部'
  });

  const yhStore = sequelize.define("yhStore", {
    id: {type: Sequelize.STRING , primaryKey: true,}, // 门店编号，
    name: {type: Sequelize.STRING , allowNull: false, }, // 门店全称，
    brief: {type: Sequelize.STRING , allowNull: false, }, // 简称，
    province: {type: Sequelize.STRING , allowNull: false, }, // 省份，
    city: {type: Sequelize.STRING , allowNull: false, }, // 城市，
    county: {type: Sequelize.STRING ,}, // 区县，
    address: {type: Sequelize.STRING , allowNull: false, }, // 地址，
    managerName: {type: Sequelize.STRING ,}, // 负责人姓名，
    mobile: {type: Sequelize.STRING ,}, // 负责人手机号，
    telephone: {type: Sequelize.STRING ,}, // 负责人固定电话，
    status: {type: Sequelize.INTEGER , defaultValue: 1,  readOnly: true, }, // 状态，1：存在；0：删除
  },{
    freezeTableName: true,
    indexes:[
      {method: 'BTREE',fields: ['status']},
      
    ],
    description: '永辉门店'
  });

  const yhWorkShop = sequelize.define("yhWorkShop", {
    id: {type: Sequelize.STRING , primaryKey: true,}, // 工坊编号，
    name: {type: Sequelize.STRING , allowNull: false, }, // 工坊名称，
    managerName: {type: Sequelize.STRING ,}, // 负责人姓名，
    mobile: {type: Sequelize.STRING ,}, // 负责人手机，
    telephone: {type: Sequelize.STRING ,}, // 负责人电话，
    position: {type: Sequelize.STRING ,}, // 负责人职位，
    status: {type: Sequelize.INTEGER , defaultValue: 1,  readOnly: true, }, // 状态，1：存在；0：删除
  },{
    freezeTableName: true,
    indexes:[
      {method: 'BTREE',fields: ['status']},
      
    ],
    description: '永辉工坊'
  });

  const yhWorkShopStore = sequelize.define("yhWorkShopStore", {
    id: {type: Sequelize.UUID , primaryKey: true, defaultValue: Sequelize.UUIDV1,  readOnly: true, }, // 唯一ID，
    yhWorkShopId: {type: Sequelize.STRING ,}, // 工坊编号，
    yhStoreId: {type: Sequelize.STRING ,}, // 门店编号，
    status: {type: Sequelize.INTEGER , defaultValue: 1,  readOnly: true, }, // 状态，1：存在；0：删除
  },{
    freezeTableName: true,
    indexes:[
      {method: 'BTREE',fields: ['status']},
      
    ],
    description: '永辉门店_工坊中间表'
  });

  const district = sequelize.define("district", {
    id: {type: Sequelize.STRING , primaryKey: true,}, // 实体编号，
    name: {type: Sequelize.STRING , allowNull: false, }, // 实体全称，
    brief: {type: Sequelize.STRING , allowNull: false, }, // 简称，
    socialCreditNum: {type: Sequelize.STRING ,}, // 统一社会信用代码号-3，
    address: {type: Sequelize.STRING , allowNull: false, }, // 地址，
    tel: {type: Sequelize.STRING ,}, // 公司电话，
    bankName: {type: Sequelize.STRING ,}, // 公司开户行，
    bankAccount: {type: Sequelize.STRING ,}, // 银行账号，
    bankAdd: {type: Sequelize.STRING ,}, // 银行地址，
    managerName: {type: Sequelize.STRING ,}, // 负责人姓名，
    mobile: {type: Sequelize.STRING ,}, // 负责人手机号，
    telephone: {type: Sequelize.STRING ,}, // 负责人固定电话，
    position: {type: Sequelize.STRING ,}, // 负责人职位，
    businessLicense: {type: Sequelize.STRING ,}, // 营业执照，
    agreementWithFreetopiaPhoto: {type: Sequelize.STRING ,}, // 与freetopia的协议照，
    status: {type: Sequelize.INTEGER , defaultValue: 1,  readOnly: true, }, // 状态，1：存在；0：删除
  },{
    freezeTableName: true,
    indexes:[
      {method: 'BTREE',fields: ['status']},
      
    ],
    description: '经营实体'
  });

  const yhPartner = sequelize.define("yhPartner", {
    id: {type: Sequelize.STRING , primaryKey: true,}, // ，
    name: {type: Sequelize.STRING , allowNull: false, }, // 姓名，
    gender: {type: Sequelize.ENUM , values: Object.values(cfg.gender) ,}, // 性别，
    birthday: {type: Sequelize.DATE , allowNull: false, }, // 出生日期，
    mobile: {type: Sequelize.STRING , allowNull: false, }, // 移动电话，
    telephone: {type: Sequelize.STRING ,}, // 固定电话，
    post: {type: Sequelize.STRING ,}, // 邮政编码，
    email: {type: Sequelize.STRING ,}, // 邮箱，
    idType: {type: Sequelize.STRING ,}, // 证件类型，
    idNum: {type: Sequelize.STRING , allowNull: false, }, // 证件号码，
    idPlace: {type: Sequelize.STRING ,}, // 证件居所，
    bankName: {type: Sequelize.STRING , allowNull: false, }, // 收款银行，
    accountNum: {type: Sequelize.STRING , allowNull: false, }, // 收款账号，
    status: {type: Sequelize.INTEGER , defaultValue: 1,  readOnly: true, }, // 状态，1：存在；0：删除
    remark: {type: Sequelize.STRING ,}, // 备注，
  },{
    freezeTableName: true,
    indexes:[
      {method: 'BTREE',fields: ['name']},
      {method: 'BTREE',fields: ['status']},
      
    ],
    description: '内加盟商其他合伙人'
  });

  const baseBound = sequelize.define("baseBound", {
    id: {type: Sequelize.UUID , primaryKey: true, defaultValue: Sequelize.UUIDV1, }, // 唯一ID，
    validDate: {type: Sequelize.DATE , allowNull: false, }, // 生效日，
    city: {type: Sequelize.ENUM , values: Object.values(cfg.cityArr) , allowNull: false, }, // 城市，
    baseType: {type: Sequelize.ENUM , values: Object.values(cfg.baseType) , allowNull: false, }, // 基数类别，
    baseMax: {type: Sequelize.INTEGER , allowNull: false, }, // 上限，
    baseMin: {type: Sequelize.INTEGER , allowNull: false, }, // 下限，
    averageWage: {type: Sequelize.DECIMAL(18,6) , allowNull: false, }, // 平均工资，
    status: {type: Sequelize.INTEGER , defaultValue: 1,  readOnly: true, }, // 状态，1：存在；0：删除
    remark: {type: Sequelize.STRING ,}, // 备注，
  },{
    freezeTableName: true,
    indexes:[
      {method: 'BTREE',fields: ['validDate']},
      {method: 'BTREE',fields: ['city']},
      {method: 'BTREE',fields: ['baseMax']},
      {method: 'BTREE',fields: ['status']},
      
    ],
    description: '基数上下限'
  });

  const insuranceRate = sequelize.define("insuranceRate", {
    id: {type: Sequelize.UUID , primaryKey: true, defaultValue: Sequelize.UUIDV1, }, // 唯一ID，
    validDate: {type: Sequelize.DATE , allowNull: false, }, // 生效日，
    city: {type: Sequelize.ENUM , values: Object.values(cfg.cityArr) , allowNull: false, }, // 城市，
    payorType: {type: Sequelize.ENUM , values: Object.values(cfg.payorType) , allowNull: false, }, // 付款人类别，个人、公司
    status: {type: Sequelize.INTEGER , defaultValue: 1,  readOnly: true, }, // 状态，1：存在；0：删除
    remark: {type: Sequelize.STRING ,}, // 备注，
  },{
    freezeTableName: true,
    indexes:[
      {method: 'BTREE',fields: ['validDate']},
      {method: 'BTREE',fields: ['city']},
      {method: 'BTREE',fields: ['status']},
      
    ],
    description: '缴费比率'
  });

  const insuranceRateDetail = sequelize.define("insuranceRateDetail", {
    id: {type: Sequelize.UUID , primaryKey: true, defaultValue: Sequelize.UUIDV1, }, // 唯一ID，
    insuranceType: {type: Sequelize.ENUM , values: Object.values(cfg.insuranceType) , allowNull: false, }, // 社保比率类别，
    rate: {type: Sequelize.DECIMAL(18,6) ,}, // 值，
    status: {type: Sequelize.INTEGER , defaultValue: 1,  readOnly: true, }, // 状态，1：存在；0：删除
    remark: {type: Sequelize.STRING ,}, // 备注，
  },{
    freezeTableName: true,
    indexes:[
      {method: 'BTREE',fields: ['status']},
      
    ],
    description: '缴费比率详情'
  });

  const taxRate = sequelize.define("taxRate", {
    id: {type: Sequelize.UUID , primaryKey: true, defaultValue: Sequelize.UUIDV1, }, // 唯一ID，
    validDate: {type: Sequelize.DATE , allowNull: false, }, // 生效日，
    city: {type: Sequelize.ENUM , values: Object.values(cfg.cityArr) , allowNull: false, }, // 城市，
    calculatorType: {type: Sequelize.ENUM , values: Object.values(cfg.calculatorType) , allowNull: false, }, // 所得税计算类别，
    status: {type: Sequelize.INTEGER , defaultValue: 1,  readOnly: true, }, // 状态，1：存在；0：删除
    remark: {type: Sequelize.STRING ,}, // 备注，
  },{
    freezeTableName: true,
    indexes:[
      {method: 'BTREE',fields: ['validDate']},
      {method: 'BTREE',fields: ['city']},
      {method: 'BTREE',fields: ['status']},
      
    ],
    description: '所得税率主表'
  });

  const taxRateDetail = sequelize.define("taxRateDetail", {
    id: {type: Sequelize.UUID , primaryKey: true, defaultValue: Sequelize.UUIDV1, }, // 唯一ID，
    min: {type: Sequelize.INTEGER ,}, // 最小值，
    max: {type: Sequelize.INTEGER , allowNull: false, }, // 最大值，
    rate: {type: Sequelize.DECIMAL(18,6) ,}, // 税率，
    deduction: {type: Sequelize.INTEGER , _description: '10000', }, // 速算扣除数，
    status: {type: Sequelize.INTEGER , defaultValue: 1,  readOnly: true, }, // 状态，1：存在；0：删除
    remark: {type: Sequelize.STRING ,}, // 备注，
  },{
    freezeTableName: true,
    indexes:[
      {method: 'BTREE',fields: ['status']},
      
    ],
    description: '所得税率详情'
  });
};
