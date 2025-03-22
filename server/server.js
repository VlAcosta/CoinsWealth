const express = require('express');
const morgan = require('morgan');
const path = require('path');

var sqlite = require("better-sqlite3");
global.db = new sqlite("./server/db.sqlite3");

const app = express();

app.set('port', 5000);

app.listen(app.get('port'), () => {
    console.log(`[OK] Server is running on localhost:${app.get('port')}`);
});

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//app.use(morgan('dev'));

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "vip57.hostiman.ru",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "info@coinwealth.group",
    pass: "0fmcvf5IWnITOuRP",
  },
});


//app.use('/api/signin', require('./routes/signin'));

const pages = [
    '/',
    '/sign-in',
    '/sign-up',
    '/forgot-password',
    '/reset-password/*',
    '/confirm_email/*',
    '/referral-program',
    '/privacy',
    '/terms',
    '/profile',
    '/profile/account-details',
    '/profile/account-statistics',
    '/wallet',
    '/wallet/deposit',
    '/wallet/withdraw',
    '/wallet/deposit/qr',
    '/faq',
    '/about',
    '/admin',
    '/market',
    '/well-done',
    '/static',
    '*'
]

app.use('/confirm-admin', async (req, res) => {
  let code = req.originalUrl.split('/')[2]
  user = await db.prepare('SELECT * FROM users WHERE "admin_code" = ?').get(code)
  await db.prepare('UPDATE users SET "admin_code" = ?, "admin_req_level" = ?, "is_admin" = ? WHERE "admin_code" = ?').run(null, 0, user.admin_req_level, code)
  if (user != undefined) await res.redirect("/admin")
})

for (const item of pages) {
  if (item == '/static') app.use(`${item}`, express.static(path.join(__dirname, 'static')));
  else app.use(`${item}`, express.static(path.join(__dirname, '../dist')));
}




function random_gen(len) {
    chrs = 'abdehkmnpswxzABDEFGHKMNPQRSTWXZ123456789_.';
    var str = '';
    for (var i = 0; i < len; i++) {
        var pos = Math.floor(Math.random() * chrs.length);
        str += chrs.substring(pos,pos+1);
    }
    return str;
}

function random_gen1(len) {
    chrs = '0123456789';
    var str = '';
    for (var i = 0; i < len; i++) {
        var pos = Math.floor(Math.random() * chrs.length);
        str += chrs.substring(pos,pos+1);
    }
    return str;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const crypto = require('crypto');
const hex = require('hex');
const hmac = require('hmac');
const axios = require('axios');



const apiKey = 'fbqtlfniy5bk43vf2rrmojdgkz4qgtpqglo4p9hsc2eigrqmuxfpcurjz2dwkj9c';
const apiSecret = 'ht9o9lms0wlkkejrecovuovkmmplcslaky5rqhkb7jknw2levczymmzqvtdzn8bn';
const merchantId = '225063867';
const baseURL = 'https://bpay.binanceapi.com'


// ===== functions ======

function hash_signature(query_string) {
  return crypto
      .createHmac('sha512', apiSecret)
      .update(query_string)
      .digest('hex');
}

function random_string() {
  return crypto.randomBytes(32).toString('hex').substring(0,32);
}

function dispatch_request(http_method, path, payload = {}) {
    const timestamp = Date.now()
    const nonce = random_string()
    const payload_to_sign = timestamp + "\n" + nonce + "\n" + JSON.stringify(payload) + "\n"
    const url = baseURL + path
    const signature = hash_signature(payload_to_sign)
    return axios.create({
      baseURL,
      headers: {
        'content-type': 'application/json',
        'BinancePay-Timestamp': timestamp,
        'BinancePay-Nonce': nonce,
        'BinancePay-Certificate-SN': apiKey,
        'BinancePay-Signature': signature.toUpperCase()
      }
    }).request({
      'method': http_method,
      url,
      data: payload
    })
}

// ===== functions ======


// Query Order
 
// POST /binancepay/openapi/order/query
// https://developers.binance.com/docs/binance-pay/api-order-query
function query_order() {
  dispatch_request(
    'POST', 
    '/binancepay/openapi/order/query',
    {
      'merchantId': merchantId,
      'merchantTradeNo': '189746540971808165189538'
    }
  ).then(response => console.log(response.data.data.status)).catch(error => console.log(error))
}

//query_order()


// Create Order
//
// POST /binancepay/openapi/order
// https://developers.binance.com/docs/binance-pay/api-order-create
async function create_order(deposit_id, count) {
  dispatch_request(
    'POST', 
    '/binancepay/openapi/order',
    {
      'merchantId': merchantId,
      'merchantTradeNo': deposit_id,
      'tradeType': 'WEB',
      'totalFee': `${count}`,
      'currency': 'BTC',
      'productType': 'deposit',
      'productName': 'Deposit on wallet'
    }
  ).then(response => {
    return response.data.data.universalUrl
  }).catch(error => console.log(error))
}

//create_order()


//const row = db.prepare('SELECT * FROM users');
//console.log(row.all());

//let row2 =  db.prepare(`INSERT INTO users (name, email, password, reg_time, balance) VALUES (?, ?, ?, ?, ?);`);
//let result =  row2.run(`Armat`, `armatov@gmail.com`, `asdsadasd`, `28 Nov 2023`, 0)


const fs = require("fs");

const routesPath = path.join(__dirname, 'routes');
const routesFiles = fs.readdirSync(routesPath);

const routesList = []

for (const routeFile of routesFiles) {
    if (routeFile.endsWith('.js')) {
        routesList.push(`/${routeFile}`.replace('.js', ''))
    } else {
        const routesPath2 = path.join(__dirname, 'routes', routeFile);
        const routesFiles2 = fs.readdirSync(routesPath2).filter(file => file.endsWith('.js'));
        for (const routeFile2 of routesFiles2) {
            routesList.push(`/${routeFile}/${routeFile2}`.replace('.js', ''))
        }
    }
}

for (const link of routesList) {
    try {
        const route = require(`./routes${link}.js`);
        app.post(`${link}`, async (req, res) => route.execute(req, res, random_gen, random_gen1, dispatch_request, getRandomInt, transporter, merchantId))
    } catch (err) { console.error(err); }
}




setInterval(() => {
  let row = db.prepare('SELECT * FROM deposit WHERE status != ? AND status != ? AND status != ?').all("PAID", "ERROR", "EXPIRED");
  //console.log(row);
  for (const item of row) {

    dispatch_request(
      'POST', 
      '/binancepay/openapi/order/query',
      {
          'merchantId': merchantId,
          'merchantTradeNo': item.deposit_id
      }
      ).then(response => {
        let timestamp = Math.floor(Date.now()/1000);

        let userdata = db.prepare('SELECT * FROM users WHERE id = ?').get(item.user_id);

        if (response.data.status == "FAIL") return;

        console.log( item.status, response.data.data.status)

        switch (response.data.data.status) {
          case "PAID":
          {
              db.prepare(`INSERT INTO wallet ('user_id', 'count', 'time', 'by', 'binance_deposit_id', 'reason') VALUES (?, ?, ?, ?, ?, ?);`)
              .run(`${item.user_id}`, `${item.count}`, `${timestamp}`, `Binance`, `${item.id}`, 'Deposit')
              db.prepare('UPDATE users SET "balance" = ? WHERE "id" = ?').run(userdata.balance + item.count, item.user_id);
              db.prepare('UPDATE deposit SET "status" = ? WHERE "id" = ?').run(response.data.data.status, item.id);
              
              break;
          }
      
          default:
          {
              db.prepare('UPDATE deposit SET "status" = ? WHERE "id" = ?').run(response.data.data.status, item.id);
              break;
          }
        }
      }).catch(error => console.log(error))
  }
}, 1 * 60 * 1000);


setInterval(() => {
  let timestamp = Math.floor(Date.now()/1000);
  let row = db.prepare('SELECT * FROM packets WHERE status = ?').all(0);
  //console.log(row);
  for (const item of row) {
    if (timestamp < (Number(item.time)+(Number(item.duration)*24*60*60))) continue;
    let userdata = db.prepare('SELECT * FROM users WHERE id = ?').get(item.user_id);
    db.prepare('UPDATE packets SET "status" = ? WHERE "id" = ?').run(1, item.id);
    if (item.autosub == 0) {
      db.prepare('UPDATE users SET "balance" = ? WHERE "id" = ?')
        .run(userdata.balance + Math.round(item.count * ((100+item.percent)/100)), item.user_id);
      db.prepare(`INSERT INTO wallet ('user_id', 'count', 'time', 'by', 'reason') VALUES (?, ?, ?, ?, ?);`)
        .run(item.user_id, item.count * ((100+item.percent)/100), Math.floor(Date.now()/1000), `Coin Wealth`, 'Package')
    } else {
      db.prepare('UPDATE users SET "balance" = ? WHERE "id" = ?')
        .run(userdata.balance + Math.round(item.count * (item.percent/100)), item.user_id);
      db.prepare(`INSERT INTO wallet ('user_id', 'count', 'time', 'by', 'reason') VALUES (?, ?, ?, ?, ?);`)
        .run(item.user_id, Number(item.count) * (Number(item.percent)/100), Math.floor(Date.now()/1000), `Coin Wealth`, 'Package')
      
      db.prepare(`INSERT INTO packets ('user_id', 'name', 'package_id', 'duration', 'count', 'autosub', 'percent', 'status', 'time') VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`)
        .run(item.user_id, item.name, item.package_id, item.duration, item.count, item.autosub, item.percent, 0, Math.floor(Date.now()/1000));
    }
  }
}, 1 * 60 * 1000);




/*dispatch_request(
    'POST', 
    '/binancepay/openapi/payout/transfer',
    {
      'requestId': '12312311',
      'batchName': 'Withdraw by userid: test',
      'currency': 'USDT',
      'totalAmount': `1`,
      'totalNumber': 1,
      'transferDetailList': [
        {
            'merchantSendId': '12312311',
            'receiveType': 'EMAIL',
            'receiver': 'maxon4ik102@gmail.com',
            'transferAmount': `1`,
            'transferMethod': 'FUNDING_WALLET',
            'remark': 'Withdraw by userid: test'
        }
      ]
    }
  ).then(response => console.log(response))
  .catch(error => console.log(error))*/




module.exports = app;
