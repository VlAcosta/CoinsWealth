module.exports = {
    async execute(req, res, random_gen, random_gen1, dispatch_request, getRandomInt, transporter, merchantId) {
        let token = req.body.token;
        let userid = req.body.userid;

        let package_id = req.body.package_id;
        let count = req.body.count;
        let autosub = req.body.autosub;
        

        let package = db.prepare('SELECT * FROM packages_list WHERE id = ?').get(package_id);

        if (package == undefined) return res.json({status: 'package_not_find'})

        
        let timestamp = Math.floor(Date.now()/1000);
        let row = db.prepare('SELECT * FROM tokens WHERE token = ?').all(token);
        let userdata = db.prepare('SELECT * FROM users WHERE id = ?').get(userid);

        if (userdata.balance - count < 0) {
            return res.json({status: 'balance_low'})
        }

        if (row.length == 1 && row[0].expired > timestamp) {

            let buyed_packages = db.prepare('SELECT * FROM packets WHERE user_id = ? AND package_id = ? AND status = ?').all(userid, package_id, 0);

            if (buyed_packages.length > 0) return res.json({status: 'package_buyed'})

            if ((package.max_slots - package.slots) < 1)  return res.json({status: 'slots_full'})

            let percent = Math.round((((count - package.min_amount) / (package.max_amount - package.min_amount)) * (package.max_apr - package.min_apr) + package.min_apr ) * 10) / 10;

            db.prepare(`INSERT INTO packets ('user_id', 'name', 'package_id', 'duration', 'count', 'autosub', 'percent', 'status', 'time') VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`)
            .run(userid, package.name, package_id, package.duration, count, autosub ? 1 : 0, percent, 0, timestamp);

            db.prepare('UPDATE packages_list SET "slots" = ? WHERE "id" = ?').run(Number(package.slots)+1, package_id);

            db.prepare('UPDATE users SET "balance" = ? WHERE "id" = ?').run(Number(userdata.balance) - Number(count), userid);
            
            db.prepare(`INSERT INTO wallet ('user_id', 'count', 'time', 'by', 'reason') VALUES (?, ?, ?, ?, ?);`)
            .run(userid, -Number(count), timestamp, `User`, 'Buy Package')

            res.json({status: 'success'})
        } else {
            res.json({status: 'token_expired'})
        }
    }
}