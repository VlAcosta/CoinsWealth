module.exports = {
    async execute(req, res, random_gen, random_gen1, dispatch_request, getRandomInt, transporter, merchantId) {
        let token = req.body.token
        let count = req.body.count;
        let usermail = req.body.usermail;

        let userid = req.body.userid;


        
        let timestamp = Math.floor(Date.now()/1000);
        let row = await db.prepare('SELECT * FROM tokens WHERE token = ?').all(token);
        let userdata = await db.prepare('SELECT * FROM users WHERE id = ?').get(row[0].user_id);
        if (row.length == 1 && row[0].expired > timestamp) {
            if (userdata.is_admin >= 3) {
                let userdeposit = db.prepare('SELECT * FROM users WHERE email = ?').all(usermail);
                if (userdeposit.length == 0) {
                    return res.json({status: 'user_not_defined'})
                } else if (userdeposit.length > 1) {
                    return res.json({status: 'users_too_much'})
                } else {
                    if (Number(count) == 0) return res.json({status: 'value_null'});

                    reason = Number(count) > 0 ? 'Deposit' : 'Withdraw'
                    db.prepare(`INSERT INTO wallet ('user_id', 'count', 'time', 'by', 'admin_id', 'reason') VALUES (?, ?, ?, ?, ?, ?);`)
                    .run(`${userdeposit[0].id}`, `${count}`, `${timestamp}`, `Admin`, userdata.id, `${reason}`)
                    
                    db.prepare('UPDATE users SET "balance" = ? WHERE "id" = ?').run(Number(userdeposit[0].balance) + Number(count), userdeposit[0].id)
                    return res.json({status: 'success'})
                }
            } else {
                res.json({status: 'not_admin'})
            }
        } else {
            res.json({status: 'token_expired'})
        }
    }
}