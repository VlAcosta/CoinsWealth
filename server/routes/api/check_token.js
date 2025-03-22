module.exports = {
    async execute(req, res, random_gen, random_gen1, dispatch_request, getRandomInt, transporter, merchantId) {
        let token = req.body.token
    
        let timestamp = Math.floor(Date.now()/1000);
        let row = db.prepare('SELECT * FROM tokens WHERE token = ?').all(token);

        if (row.length == 1 && row[0].expired > timestamp) {
            let row2 = db.prepare('SELECT * FROM users WHERE id = ?').all(row[0].user_id);
            
            let data = {
                id: row2[0].id,
                name: row2[0].name,
                email: row2[0].email,
                reg_date: row2[0].reg_time,
                balance: row2[0].balance,
                admin: row2[0].is_admin,
                avatar: row2[0].avatar
            }
            
            res.json({status: 'success', token: token, user: data})
        } else {
            res.json({status: 'invalid'})
        }
    }
}