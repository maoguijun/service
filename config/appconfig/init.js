const moment = require('moment')
const today = moment().format('YYYY-MM-DD')
const cfg = require('./args')

module.exports = {
  account: [
    {
      id: 'developer',
      name: 'test',
      password: '123',
      title: 'test',
      mail: 'test',
      telephoneNumber: 13052029063,
      remark: ''
    },
    {
      id: 'manager',
      name: '陈本',
      password: '123',
      title: '经理',
      mail: 'ben.chen@freetopia.com',
      telephoneNumber: 13052029063,
      remark: ''
    }
  ],
  role: [
    {
      id: 'manager',
      name: '经理'
    },
    {
      id: 'developer',
      name: '开发者'
    },
    {
      id: 'tester',
      name: '测试'
    }
  ],
  accountRole: [
    {
      roleId: 'developer',
      accountId: 'developer'
    },
    {
      roleId: 'manager',
      accountId: 'manager'
    }
  ],
  representative: [
    {
      id: 'LP000001',
      name: '陈亮亮',
      gender: 'Male',
      birthday: '1984-10-10',
      nation: '汉',
      culturalLevel: '本科',
      politicalLevel: '党员',
      mobile: '13052029063',
      telephone: '021-88888888',
      post: '255000',
      email: 'liang.chen@qq.com',
      idNum: '370303199303312155',
      idPlace: '上海市徐汇区凯旋路3131号闵申忠新大厦1210室',
      idStartDate: today,
      idEndDate: today,
      idFrontPhoto: '/path.jpg',
      idReversePhoto: '/path.jpg',
      idHandledPhoto: '/path.jpg',
      bankName: '中国农业银行上海市曲阳支行',
      accountNum: '上海汇演网络科技有限公司',
      occupation: '技术部主任',
      idType: '居民身份证',
      stockPercentage: 1,
      validFlag: 'Y',
      limitedPartnerFlag: 'Y',
      ownPersonalFlag: 'Y',
      ownABCCardFlag: 'Y',
      storeNo: '',
      franchiseeNo: '',
      YHFlag: 'N',
      remark: ''
    }
  ],
  agent: [
    {
      id: 'agent001',
      name: '陈本',
      mobile: '13052029063',
      email: '420602270@qq.com',
      gender: 'Male',
      idNum: '370303199303312163',
      idPlace: '上海市徐汇区凯旋路3131号闵申忠新大厦1210室',
      idType: '居民身份证',
      position: '业务经理',
      accountId: 'developer',
      roleId: ''
    }
  ],
  handler: [
    {
      id: 'handler001',
      name: '陈本',
      idNum: '370303199303312163',
      telephone: '13052029063'
    }
  ],
  merchant: [
    {
      id: 'merchant001',
      name: '陈本',
      mobile: '13052029063',
      telephone: '011-43001431'
    }
  ],
  finance: [
    {
      id: 'finance001',
      name: '陈本',
      mobile: '13052029063',
      email: '420602270@qq.com',
      idNum: '370303199303312163',
      idType: '居民身份证',
      accountId: 'developer',
      roleId: ''
    }
  ],
  site: [
    {
      id: 'site001',
      name: '上海徐汇区',
      address: '上海徐汇区凯旋路3103号'
    }
  ],
  sitePeople: [
    {
      id: 'sitePeople001',
      name: '刘德华',
      mobile: '13052029063',
      telephone: '0211-88888866',
      position: '园区区长',
      chargeFlag: 'N',
      siteId: 'site001',
    },
    {
      id: 'sitePeople002',
      name: '张耀扬',
      mobile: '13052029063',
      telephone: '0211-88888866',
      position: '园区专员',
      chargeFlag: 'Y',
      siteId: 'site001',
    }
  ],
  revenue: [
    {
      id: 'revenue001',
      name: '上海徐汇区税务局',
      address: '上海徐汇区凯旋路3103号'
    }
  ],
  revenuePeople: [
    {
      id: 'revenuePeople001',
      name: '王俊凯',
      mobile: '13052029063',
      telephone: '0211-88888866',
      position: '税务局局长',
      chargeFlag: 'N',
      revenueId: 'revenue001',
    },
    {
      id: 'revenuePeople002',
      name: '刘烨',
      mobile: '13052029063',
      telephone: '0211-88888866',
      position: '税务局专员',
      chargeFlag: 'Y',
      revenueId: 'revenue001',
    }
  ],
  nameBatch: [
    {
      id: '0001-陈亮',
      representativeName: '陈亮',
      idNum: '123',
      prefix: '上海',
      postfix: '网络科技有限公司',
      limitWord: '岚智',
      banWord: '不好,不坏',
      buildNum: 2,
      flowStatus: 'Created',
      remark: ''
    }
  ],
  nameBatchDetail: [...nameBatchDetail30()],
  company: [
    {
      id: 'company001',
      name: '上海岚智网络技术有限公司',
      registeredCapital: 1000000,
      companyType: '有限责任公司',
      businessScope: '从事（网络、信息）科技领域内的技术开发、技术转让、技术咨询、技术服务，网页设计、制作，网站建设，计算机软件开发，计算机系统集成服务，电子商务（不得从事增值电信、金融业务），广告设计、制作、代理、发布，市场营销策划，公关活动策划，企业形象策划，会务服务，展览展示服务，商务咨询，市场信息咨询与调查（不得从事社会调查、社会调研、民意调查、民意测验），以服务外包方式从事企业管理。',
      rentStartDate: today,
      rentEndDate: today,
      approvalNum: '123456789123',
      registeredAdd: '上海市崇明区新村乡耀洲路741号5幢2314室（上海新村经济小区）',
      businessAdd: '上海市崇明区新村乡耀洲路741号5幢2314室（上海新村经济小区）',
      post: '255000',
      telephone: '13052029063',
      socialCreditNum: '91310230MA1JYNMM4W',
      establishDate: today,
      generalTaxpayerFlag: 'Y',
      invNum: 100,
      CANum: '214324142134123',
      companyAdd: '上海市崇明区新村乡耀洲路741号5幢2314室（上海新村经济小区）',
      landlord: '上海新村经济小区管理委员会',
      region: '上海新村经济小区',
      rentYear: 2,
      rentAmount: 500000,
      registerPhone: '13052029063',
      registerPost: '255000',
      handlerId: 'handler001',
      merchantId: 'merchant001',
      ownerFlag: '1',
      ownerType: '2',
      country: '中国',
      currency: '人民币',
      investType: '1',
      responsibleFlag: '1',
      authorizeBusiness: 'test',
      authorizePermission: '2',
      accountSoftware: '用友T3',
      agentId: 'agent001',
      financeId: 'finance001',
      nameBatchId: '0001-陈亮'
    }
  ],
  linkman: [
    {
      id: 'linkman001',
      name: '陈本',
      mobile: '13052029063',
      email: 'ben.chen@qq.com',
      idNum: '370303199303312163'
    }
  ],
  bank: [
    {
      id: 'bank001',
      name: '中国农业银行上海市曲阳支行',
      brief: '曲阳支行',
      address: '上海市虹口区曲阳路2号',
      telephone: '021-55158980'
    },
    {
      id: 'bank002',
      name: '中国银行上海市曲阳支行',
      brief: '曲阳支行',
      address: '上海市虹口区曲阳路3号',
      telephone: '021-55158980'
    }
  ],
  banker: [
    {
      id: 'banker001',
      name: '王思聪',
      mobile: '13052029063',
      telephone: '0211-133333',
      email: 'sicong.wang@qq.com',
      gender: 'X',
      position: 'manager',
      bankId: 'bank001'
    }
  ],
  transactionRecord: [
    {
      id: 'WS000001',
      stage: '预核名中',
      flowStatus: 'companyApplied',
      companyId: 'company001',
      representativeId: 'LP000001'
    }
  ],
  bankAccount: [
    {
      id: 'bankAccount001',
      name: '中国农业银行上海市曲阳支行',
      accountNum: '6228480402564890018',
      registrationNum: '8888-66666666',
      licenseDate: today,
      openingDate: today,
      type: 'official',
      companyId: 'company001',
      bankId: 'bank001'
    },
    {
      id: 'bankAccount002',
      name: '中国银行上海市曲阳支行',
      accountNum: '6228480402564890018',
      registrationNum: '8888-77777777',
      licenseDate: today,
      openingDate: today,
      type: 'personal',
      companyId: 'company001',
      bankId: 'bank001'
    }
  ],
  // 永辉相关
  yhHeadOffice: [
    {
      id: 'yhHeadOffice001',
      name: '上海永辉集团',
      managerName: '蔡健雅',
      telephone: '021-12345678',
      mobile: '13052029063'
    }
  ],
  district: [
    {
      id: 'SHA-0001',
      name: '上海徐汇区美罗城',
      brief: '徐汇美罗城',
      socialCreditNum: '123456789abcdef',
      address: '上海市肇嘉浜路1111号',
      tel: '021-12345678',
      bankName: '中国农业银行',
      bankAccount: '12345678234566788',
      managerName: '周杰伦',
      mobile: '13052029063',
      telephone: '13052029063',
      position: '总经理',
      businessLicense: ''
    }
  ],
  yhStore: [
    {
      id: 'YHSH0001',
      name: '上海徐汇区超级物种牛排店',
      brief: '上海徐汇牛排店',
      province: '上海',
      city: '上海',
      county: '徐汇区',
      address: '凯旋路3130号',
      managerName: '孙燕姿',
      mobile: '021-12345678',
      telephone: '13052029063',
      yhHeadOfficeId: 'yhHeadOffice001',
      districtId: 'SHA-0001'
    }
  ],
  yhWorkShop: [
    {
      id: 'GF01',
      name: '上海美罗城',
      managerName: '姚明',
      mobile: '13052029063',
      telephone: '0211-88888888',
      position: '总经理'
    }
  ],
  yhPartner: [
    {
      id: 'YHSH0001-001',
      name: '王力宏',
      gender: 'Male',
      birthday: '1977-08-24',
      mobile: '13052029063',
      telephone: '13052029063',
      post: '255000',
      email: 'lihome@qq.com',
      idType: '身份证',
      idNum: '37030317708242255',
      idPlace: '中国山东省淄博市西二路金地小区',
      bankName: '中国银行',
      accountNum: '488899889889889898',
      remark: '',
      yhStoreId: 'YHSH0001',
      yhWorkShopId: 'GF01',
      districtId: 'SHA-0001'
    }
  ],

  // 税金计算器相关
  baseBounds: [
    {
      validDate: '2017-04-01',
      city: cfg.cityArr.ShangHai,
      baseType: cfg.baseType.socialSecurity,
      baseMax: 19512,
      baseMin: 3902,
      averageWage: 6504
    },
    {
      validDate: '2017-07-01',
      city: cfg.cityArr.ShangHai,
      baseType: cfg.baseType.housingFund,
      baseMax: 19512,
      baseMin: 3902,
      averageWage: 6504
    }
  ],

  insuranceRates: [
    // 个人社保率
    {
      validDate: '2017-01-01',
      city: cfg.cityArr.ShangHai,
      payorType: cfg.payorType.individual,
      details: [
        {
          insuranceType: cfg.insuranceType.housingFund,
          rate: 0.07
        },
        {
          insuranceType: cfg.insuranceType.retirementInsurance,
          rate: 0.08
        },
        {
          insuranceType: cfg.insuranceType.healthInsurance,
          rate: 0.02
        },
        {
          insuranceType: cfg.insuranceType.unemploymentInsurance,
          rate: 0.005
        }
      ]
    },
    {
      // 公司社保率
      validDate: '2017-01-01',
      city: cfg.cityArr.ShangHai,
      payorType: cfg.payorType.company,
      details: [
        {
          insuranceType: cfg.insuranceType.housingFund,
          rate: 0.07
        },
        {
          insuranceType: cfg.insuranceType.retirementInsurance,
          rate: 0.21
        },
        {
          insuranceType: cfg.insuranceType.healthInsurance,
          rate: 0.095
        },
        {
          insuranceType: cfg.insuranceType.unemploymentInsurance,
          rate: 0.005
        },
        {
          insuranceType: cfg.insuranceType.injuryInsurance,
          rate: 0.003
        },
        {
          insuranceType: cfg.insuranceType.maternityInsurance,
          rate: 0.01
        }
      ]
    }
  ],

  taxRates: [
    {
      // 个人-劳务
      validDate: '2017-01-01',
      city: cfg.cityArr.ShangHai,
      calculatorType: cfg.calculatorType.soleLabor,
      details: [
        {
          min: 0,
          max: 20000,
          rate: 0.2,
          deduction: 0
        },
        {
          min: 20000,
          max: 50000,
          rate: 0.3,
          deduction: 2000
        },
        {
          min: 50000,
          max: cfg.bigNum,
          rate: 0.4,
          deduction: 7000
        }
      ]
    },
    {
      // 个人-工资
      validDate: '2017-01-01',
      city: cfg.cityArr.ShangHai,
      calculatorType: cfg.calculatorType.soleSalary,
      details: [
        {
          min: 0,
          max: 1500,
          rate: 0.03,
          deduction: 0
        },
        {
          min: 1500,
          max: 4500,
          rate: 0.1,
          deduction: 105
        },
        {
          min: 4500,
          max: 9000,
          rate: 0.2,
          deduction: 555
        },
        {
          min: 9000,
          max: 35000,
          rate: 0.25,
          deduction: 1005
        },
        {
          min: 35000,
          max: 55000,
          rate: 0.30,
          deduction: 2755
        },
        {
          min: 55000,
          max: 80000,
          rate: 0.35,
          deduction: 5505
        },
        {
          min: 80000,
          max: cfg.bigNum,
          rate: 0.45,
          deduction: 13505
        }
      ]
    },
    {
      // 独资-公司
      validDate: '2017-01-01',
      city: cfg.cityArr.ShangHai,
      calculatorType: cfg.calculatorType.soleCompany,
      details: [
        {
          min: 0,
          max: 15000,
          rate: 0.05,
          deduction: 0
        },
        {
          min: 15000,
          max: 30000,
          rate: 0.1,
          deduction: 750
        },
        {
          min: 30000,
          max: 60000,
          rate: 0.2,
          deduction: 3750
        },
        {
          min: 60000,
          max: 100000,
          rate: 0.3,
          deduction: 9750
        },
        {
          min: 100000,
          max: cfg.bigNum,
          rate: 0.35,
          deduction: 14750
        }
      ]
    }
  ]
}

function nameBatchDetail30 () {
  let container = []

  for (let i = 1; i < 31; i++) {
    container.push({
      id: `nbd00${i}`,
      index: i,
      buildName: `呐弄${i}`,
      spell: 'nà,nòng',
      name: '上海岚智呐弄网络科技有限公司',
      flowStatus: 'Failed',
      nameBatchId: '0001-陈亮'
    })
  }

  return container
}
