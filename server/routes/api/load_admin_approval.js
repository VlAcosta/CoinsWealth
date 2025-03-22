module.exports = {
    async execute(req, res, random_gen, random_gen1, dispatch_request, getRandomInt, transporter, merchantId) {
        let token = req.body.token;
        let userid = req.body.userid;

        
        let timestamp = Math.floor(Date.now()/1000);
        let row = db.prepare('SELECT * FROM tokens WHERE token = ?').all(token);

        if (row.length == 1 && row[0].expired > timestamp && userid == row[0].user_id) {
            let userdata = db.prepare('SELECT * FROM users WHERE id = ?').get(userid);
            if (userdata.is_admin >= 3) {
                let requests_list = db.prepare('SELECT * FROM approval WHERE "status" = ?').all('0');

                for (let i in requests_list) {
                    requests_list[i].name = db.prepare('SELECT * FROM users WHERE id = ?').get(requests_list[i].user_id).name;
                }
                return res.json({status: 'success', requests_list: requests_list})
            } else return res.json({status: 'no_admin'})
           

        } else {
            res.json({status: 'token_expired'})
        }
    }
}
