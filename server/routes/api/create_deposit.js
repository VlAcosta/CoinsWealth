module.exports = {
    async execute(req, res, random_gen, random_gen1, dispatch_request, getRandomInt, transporter, merchantId) {
        let token = req.body.token
        let count = req.body.count;
        let userid = req.body.userid;

        let deposit_id = random_gen1(24)

        
        let timestamp = Math.floor(Date.now()/1000);
        let row = db.prepare('SELECT * FROM tokens WHERE token = ?').all(token);
        let userdata = db.prepare('SELECT * FROM users WHERE id = ?').get(userid);

        if (row.length == 1 && row[0].expired > timestamp) {
            db.prepare(`INSERT INTO deposit ('user_id', 'deposit_id', 'count','time', 'status') VALUES (?, ?, ?, ?, ?);`)
            .run(`${userid}`, `${deposit_id}`, count, timestamp, "INITIAL");

            //let depositUrl = create_order(deposit_id, count)

            dispatch_request(
                'POST', 
                '/binancepay/openapi/order',
                {
                'merchantId': merchantId,
                'merchantTradeNo': deposit_id,
                'tradeType': 'WEB',
                'totalFee': `${count}`,
                'currency': 'USDT',
                'productType': 'deposit',
                'productName': 'Deposit on wallet'
                }
            ).then(response => {
                //console.log(response.data.data.universalUrl);
                return res.json({status: 'success', depositUrl: response.data.data.universalUrl})
            }).catch(error => console.log(error))

            //console.log(depositUrl);
            //res.json({status: 'success', depositUrl: depositUrl})
        } else {
            res.json({status: 'token_expired'})
        }
    }
}