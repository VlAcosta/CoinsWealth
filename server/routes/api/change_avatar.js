module.exports = {
    async execute(req, res, random_gen, random_gen1, dispatch_request, getRandomInt, transporter, merchantId) {
        let token = req.body.token
        let avatar = req.body.avatar;
        let userid = req.body.userid;

        
        let timestamp = Math.floor(Date.now()/1000);
        let row = db.prepare('SELECT * FROM tokens WHERE token = ?').all(token);

        if (row.length == 1 && row[0].expired > timestamp && row[0].user_id == userid) {
            
            let row3 = db.prepare('UPDATE users SET "avatar" = ? WHERE "id" = ?').run(`${avatar}`, userid);

            return res.json({status: 'success'})
        } else {
            res.json({status: 'token_expired'})
        }
    }
}