module.exports = {
    async execute(req, res, random_gen, random_gen1, dispatch_request, getRandomInt, transporter, merchantId) {
        let code = req.body.code
        let newpass = req.body.newpass;

        
        let timestamp = Math.floor(Date.now()/1000);
        let row = db.prepare('SELECT * FROM users WHERE resetpass_code = ?').all(code);

        if (row.length == 1) {
            if ((Number(row[0].resetpass_time)+(24*60*60)) < timestamp) {
                db.prepare('UPDATE users SET "resetpass_code" = ?, "resetpass_time" = ? WHERE "resetpass_code" = ?').run(null, null, code);
                return res.json({status: 'url_expired'})
            } else {
                db.prepare('UPDATE users SET "password" = ?, "resetpass_code" = ?, "resetpass_time" = ? WHERE "resetpass_code" = ?').run(`${newpass}`, null, null, code);
                return res.json({status: 'success'})
            }
        } else return res.json({status: 'url_expired'})
    }
}