module.exports = {
    async execute(req, res, random_gen, random_gen1, dispatch_request, getRandomInt, transporter, merchantId) {
        let token = req.body.token;
        let userid = req.body.userid;

        
        let timestamp = Math.floor(Date.now()/1000);
        let row = db.prepare('SELECT * FROM tokens WHERE token = ?').all(token);

        if (row.length == 1 && row[0].expired > timestamp && userid == row[0].user_id) {
            let history_list = db.prepare('SELECT * FROM wallet WHERE "user_id" = ?').all(userid);
            let requests_list = db.prepare('SELECT * FROM withdrawal WHERE "user_id" = ? AND ("state" = ? OR "state" = ?)').all(userid, 0, 1);
            return res.json({status: 'success', history_list: history_list, requests_list: requests_list})

        } else {
            res.json({status: 'token_expired'})
        }
    }
}

