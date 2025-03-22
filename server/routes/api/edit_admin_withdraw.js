module.exports = {
    async execute(req, res, random_gen, random_gen1, dispatch_request, getRandomInt, transporter, merchantId) {
        let token = req.body.token;
        let userid = req.body.userid;
        let state = req.body.state;
        let with_id = req.body.with_id;

        
        let timestamp = Math.floor(Date.now()/1000);
        let row = db.prepare('SELECT * FROM tokens WHERE token = ?').all(token);

        if (row.length == 1 && row[0].expired > timestamp && userid == row[0].user_id) {
            let userdata = db.prepare('SELECT * FROM users WHERE id = ?').get(userid);
            if (userdata.is_admin >= 3) {
                let request = db.prepare('SELECT * FROM withdrawal WHERE "id" = ?').get(with_id);
                let userdata2 = db.prepare('SELECT * FROM users WHERE id = ?').get(request.user_id);

                switch(state) {
                    case 1:
                    {
                        db.prepare('UPDATE withdrawal SET "state" = ? WHERE "id" = ?').run(state, with_id);
                        db.prepare('UPDATE users SET "balance" = ? WHERE "id" = ?').run(Number(userdata2.balance) + Number(request.count), userdata2.id)
                        return res.json({status: 'success'})
                        break;
                    }
                    case 2: 
                    {

                        let randnum = random_gen1(24)

                        dispatch_request(
                            'POST', 
                            '/binancepay/openapi/payout/transfer',
                            {
                              'requestId': `${randnum}`,
                              'batchName': 'Withdraw by userid: test',
                              'currency': 'USDT',
                              'totalAmount': `${request.count}`,
                              'totalNumber': 1,
                              'transferDetailList': [
                                {
                                    'merchantSendId': `${randnum}`,
                                    'receiveType': 'EMAIL',
                                    'receiver': `${request.email_binance}`,
                                    'transferAmount': `${request.count}`,
                                    'transferMethod': 'FUNDING_WALLET',
                                    'remark': `Withdraw by userid: ${request.user_id}`
                                }
                              ]
                            }
                          ).then(response => {
                            let row3 = db.prepare('UPDATE withdrawal SET "state" = ? WHERE "id" = ?').run(state, with_id);

                            db.prepare(`INSERT INTO wallet ('user_id', 'count', 'time', 'by', 'reason') VALUES (?, ?, ?, ?, ?);`)
                            .run(`${userdata2.id}`, `-${request.count}`, `${timestamp}`, `-`, `Withdraw`);

                            return res.json({status: 'success'})
                          })
                          .catch(error => {
                            if (error.response.data.code != '400611') console.log(error)
                            return res.json({status: 'binance_error', code: error.response.data.code, errorMessage: error.response.data.errorMessage })
                          })
                        break;
                    }
                }
                
            } else return res.json({status: 'no_admin'})
           

        } else {
            res.json({status: 'token_expired'})
        }
    }
}

