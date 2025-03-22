module.exports = {
    async execute(req, res, random_gen, random_gen1, dispatch_request, getRandomInt, transporter, merchantId) {
        let token = req.body.token
        let email = req.body.email
        let count = req.body.count
        let userid = req.body.userid;

        
        let timestamp = Math.floor(Date.now()/1000);
        let row = db.prepare('SELECT * FROM tokens WHERE token = ?').all(token);

        if (row.length == 1 && row[0].expired > timestamp && userid == row[0].user_id) {
            let userdata = db.prepare('SELECT * FROM users WHERE "id" = ?').get(userid);
            if (userdata.balance >= count) {
                db.prepare(`INSERT INTO withdrawal ('user_id', 'count', 'time', 'state', 'state_binance', 'email_binance') VALUES (?, ?, ?, ?, ?, ?);`)
                .run(`${userid}`, `${count}`, `${timestamp}`, `0`, `0`, `${email}`)
                
                db.prepare('UPDATE users SET "balance" = ? WHERE "id" = ?').run(userdata.balance - count, userid)
                return res.json({status: 'success'})
            } else {
                return res.json({status: 'balance_low'})
            }

        } else {
            res.json({status: 'token_expired'})
        }
    }
}

