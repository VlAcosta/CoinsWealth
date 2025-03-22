module.exports = {
    async execute(req, res, random_gen, random_gen1, dispatch_request, getRandomInt, transporter, merchantId) {
        let token = req.body.token
        let count = req.body.count
        let userid = req.body.userid;
        let approval_id = random_gen1(24)
        
        let timestamp = Math.floor(Date.now()/1000);
        let row = db.prepare('SELECT * FROM tokens WHERE token = ?').all(token);

        if (row.length == 1 && row[0].expired > timestamp && userid == row[0].user_id) {
            let userdata = db.prepare('SELECT * FROM users WHERE "id" = ?').get(userid);
            if (userdata.balance >= count) {
                db.prepare(`INSERT INTO approval ('user_id', 'approval_id',  'time', 'count', 'status') VALUES (?, ?, ?, ?, ?);`)
                .run(`${userid}`, `${approval_id}`, `${timestamp}`, `${count}`, 0)
                
                return res.json({status: 'success'})
            } else {
                return res.json({status: 'balance_low'})
            }

        } else {
            res.json({status: 'token_expired'})
        }
    }
}

