module.exports = {
    async execute(req, res, random_gen, random_gen1, dispatch_request, getRandomInt, transporter, merchantId) {
        let token = req.body.token;
        let userid = req.body.userid;
        let packages_list = req.body.packages_list;

        
        let timestamp = Math.floor(Date.now()/1000);
        let row = db.prepare('SELECT * FROM tokens WHERE token = ?').all(token);

        if (row.length == 1 && row[0].expired > timestamp && userid == row[0].user_id) {
            let userdata = db.prepare('SELECT * FROM users WHERE id = ?').get(userid);
            if (userdata.is_admin >= 2) {
                for (let item of packages_list) {
                    if (item.delete && item.new) continue;

                    if (item.delete) db.prepare(`DELETE FROM packages_list WHERE id = ?`).run(item.id)
                    else if (item.new) db.prepare(`INSERT INTO packages_list ('name', 'duration', 'min_apr', 'max_apr', 'slots', 'max_slots', 'min_amount', 'max_amount') VALUES (?, ?, ?, ?, ?, ?, ?, ?);`).run(item.name, item.duration, item.min_apr, item.max_apr, 0, item.max_slots, item.min_amount, item.max_amount)
                    else db.prepare('UPDATE packages_list SET "name" = ?, "duration" = ?, "min_apr" = ?, "max_apr" = ?, "max_slots" = ?, "min_amount" = ?, "max_amount" = ? WHERE "id" = ?').run(item.name, item.duration, item.min_apr, item.max_apr, item.max_slots, item.min_amount, item.max_amount, item.id)
                }

                return res.json({status: 'success'})
            } else return res.json({status: 'no_admin'})
           

        } else {
            res.json({status: 'token_expired'})
        }
    }
}

