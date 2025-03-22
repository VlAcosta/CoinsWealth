module.exports = {
    async execute(req, res, random_gen, random_gen1, dispatch_request, getRandomInt, transporter, merchantId) {
        let token = req.body.token;
        let userid = req.body.userid;

        
        let timestamp = Math.floor(Date.now()/1000);
        let row = db.prepare('SELECT * FROM tokens WHERE token = ?').all(token);

        if (row.length == 1 && row[0].expired > timestamp && userid == row[0].user_id) {
            let userdata = db.prepare('SELECT * FROM users WHERE id = ?').get(userid);

            let packages_list = db.prepare('SELECT * FROM packets WHERE user_id = ? AND status = ?').all(userid, 0);
            let packages_history = db.prepare('SELECT * FROM packets WHERE user_id = ? AND status = ?').all(userid, 1);
           
            return res.json({status: 'success', packages_list: packages_list, packages_history: packages_history})
        } else {
            res.json({status: 'token_expired'})
        }
    }
}

