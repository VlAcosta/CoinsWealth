module.exports = {
    async execute(req, res, random_gen, random_gen1, dispatch_request, getRandomInt, transporter, merchantId) {
        console.log(req.body.email, req.body.password);
        let row = db.prepare('SELECT * FROM users WHERE email = ? AND password = ?').all(req.body.email.toLowerCase(), req.body.password);

        if (row.length == 1) {
            let token = await random_gen(64);
            let created = Math.floor(Date.now()/1000);
            let expired = created + (24 * 60 * 60);
            if (row[0].email_code != null) return res.json({ status: 'email_not_confirm'});
            db.prepare(`INSERT INTO tokens ('token', 'user_id', 'created', 'expired') VALUES (?, ?, ?, ?);`)
            .run(`${token}`, row[0].id, created, expired);

            return res.json({ status: 'success', token: `${token}`, user: { id: row[0].id, name: row[0].name, email: row[0].email, reg_date: row[0].reg_time, balance: row[0].balance, admin: row[0].is_admin, avatar: row[0].avatar } })
        } else {
            return res.json({ status: 'user_not_find'})
        }
    }
}

