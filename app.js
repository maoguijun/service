const express = require('express'),
  models = require('./models'),
  logger = require('morgan'), // HTTP request logger middleware for node.js
  cookieParser = require('cookie-parser'), // cookie 解析
  bodyParser = require('body-parser'), // body 解析
  session = require('express-session'),
  MySQLStore = require('express-mysql-session')(session),
  flash = require('connect-flash'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  Passport = require('./components').Passport,
  cors = require('cors'),
  config = require('config'),
  router = express.Router(),
  app = express(),
  routes = require('./routes'),
  accessValidator = require('./components').RBAC,
  cluster = require('cluster'),
  http = require('http'),
  numCPUs = require('os').cpus().length;

require('./components/common/prototype'); // 原型链注册
/* global vars */
global.__components = require('path').join(process.cwd(), 'components');
/* global vars */

// session 配置
let MySQLOptions = {
  host: config.mysql.options.host,
  port: config.mysql.options.port,
  user: config.mysql.username,
  password: config.mysql.password,
  database: config.mysql.database
};

let sessionStore = new MySQLStore(MySQLOptions);

// cors 配置
let whiteList = [
  'http://192.168.1.120:4000',
  'http://localhost:4000',
  'http://localhost:3000',
  'chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop', // 用于 postman
  'http://118.190.105.26:7788',
  'http://118.190.105.26:4000',
  undefined // 用于 postman
];
let corsOpts = {
  origin: (origin, cb) =>
    whiteList.includes(origin) ?
      cb(null, true) :
      cb(new Error(`not allowed by CORS: ${origin}`)),
  optionsSuccessStatus: 200,
  credentials: true
};

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors(corsOpts));
app.use(
  session({
    secret: 'loncus2017',
    store: sessionStore,
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// app.set('views', `${__dirname}/views`);
// app.set('view engine', 'ejs');
app.use(
  '/uploadFile',
  express.static('uploadFile', {setHeaders: res => res.set('Content-Disposition', 'inline;')})
);
// app.use('/static', express.static('views'));

// passport 配置
passport.use(
  new LocalStrategy(
    {passReqToCallback: true, usernameField: 'id'},
    Passport.login
  )
);
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(Passport.find);

app.use('/', router);

/**
 * 创建数据库
 * 创建 RBAC
 * 加入路由
 */
(async () => {
  await models.sequelize.sync();
  console.log('DataBase Connection Has Been Established Successfully!\n');
  await accessValidator.buildRBACArgs();
  routes(router, passport, accessValidator);
})().catch(err => console.error('Error:', err));

if (!config.cluster) {
  http
    .createServer(app)
    .listen(config.port, () =>
      console.log(`FBI warning: App listening at port: ${config.port}\n`)
    );
} else {
  if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.warn(`worker ${worker.process.pid} died, 立刻重启`);
    });
  } else {
    http
      .createServer(app)
      .listen(config.port, () =>
        console.log(`FBI warning: App listening at port: ${config.port}`)
      );
  }
}

module.exports = app;
