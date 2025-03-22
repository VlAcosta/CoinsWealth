module.exports = {
    async execute(req, res, random_gen, random_gen1, dispatch_request, getRandomInt, transporter, merchantId) {
        let code = req.body.code

        if (code == null || code == undefined) return res.json({status: 'link_invalid'})
        
        let timestamp = Math.floor(Date.now()/1000);
        let row = db.prepare('SELECT * FROM users WHERE email_code = ?').all(code);

        if (row.length == 1) {
            await db.prepare('UPDATE users SET "email_code" = ? WHERE "email_code" = ?').run(null, code)
            return res.json({status: 'success'})
        } else return res.json({status: 'link_invalid'})
    }
}