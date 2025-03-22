module.exports = {
    async execute(req, res, random_gen, random_gen1, dispatch_request, getRandomInt, transporter, merchantId) {
        let token = req.body.token
        let oldpass = req.body.oldpass;
        let newpass = req.body.newpass;
        let userid = req.body.userid;

        
        let timestamp = Math.floor(Date.now()/1000);
        let row = db.prepare('SELECT * FROM tokens WHERE token = ?').all(token);

        if (row.length == 1 && row[0].expired > timestamp) {
            let row2 = db.prepare('SELECT * FROM users WHERE "id" = ? AND "password" = ?').all(userid, oldpass);
            if (row2.length == 0) return res.json({status: 'oldpass_invalid'})

            let row3 = db.prepare('UPDATE users SET "password" = ? WHERE "id" = ?').run(`${newpass}`, userid);

            res.json({status: 'success'})
        } else {
            res.json({status: 'token_expired'})
        }
    }
}