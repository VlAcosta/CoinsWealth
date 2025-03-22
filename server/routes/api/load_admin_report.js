module.exports = {
    async execute(req, res, random_gen, random_gen1, dispatch_request, getRandomInt, transporter, merchantId) {
        let token = req.body.token;
        let userid = req.body.userid;

        
        let timestamp = Math.floor(Date.now()/1000);
        let row = db.prepare('SELECT * FROM tokens WHERE token = ?').all(token);

        if (row.length == 1 && row[0].expired > timestamp && userid == row[0].user_id) {
            let userdata = db.prepare('SELECT * FROM users WHERE id = ?').get(userid);
            if (userdata.is_admin >= 1) {
                let requests_list = db.prepare('SELECT id, name, email, reg_time, balance, is_admin FROM users').all();

                for (let i in requests_list) {
                    requests_list[i].withdraw = db.prepare('SELECT count FROM wallet WHERE user_id = ? AND reason = ? AND NOT by = ?').all(requests_list[i].id, 'Withdraw', 'Admin').reduce(function(_this, val) {
                        return _this + val.count
                    }, 0);
                    requests_list[i].deposit = db.prepare('SELECT count FROM wallet WHERE user_id = ? AND reason = ?').all(requests_list[i].id, 'Deposit').reduce(function(_this, val) {
                        return _this + val.count
                    }, 0);
                    packages = [];
                    for (let j of db.prepare('SELECT name FROM packets WHERE user_id = ? AND status = ?').all(requests_list[i].id, 0)) {
                        packages.push(j.name)
                    }
                    requests_list[i].packages = packages.length > 0 ? packages.join(', ') + '.' : 'None.'

                    packages_history = [];
                    for (let j of db.prepare('SELECT name FROM packets WHERE user_id = ? AND status = ?').all(requests_list[i].id, 1)) {
                        packages_history.push(j.name)
                    }
                    requests_list[i].packages_history = packages_history.length > 0 ? packages_history.join(', ') + '.' : 'None.'
                }

                return res.json({status: 'success', report_list: requests_list})
            } else return res.json({status: 'no_admin'})
           

        } else {
            res.json({status: 'token_expired'})
        }
    }
}

