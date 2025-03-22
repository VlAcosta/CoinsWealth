const { execute } = require("./buy_packet");

module.exports = {
    async execute(req, res) {

        let token = req.body.token;
        let request_id = req.body.request_id; 

        if (!token || !request_id) {
            console.log("Некорректные данные");
            return res.status(400).json({ status: "error", message: "Некорректные данные" });
        }
        let row = db.prepare('SELECT * FROM tokens WHERE token = ?').all(token);
        if (!row.length) {
            console.log("Токен не найден");
            return res.status(403).json({ status: "error", message: "Токен истёк" });
        }
    
        const deposits = db.prepare('SELECT user_id, count FROM approval WHERE id = ?').all(request_id);
        if (!deposits.length) {
            console.log("Запрос не найден");
            return res.status(404).json({ status: "error", message: "Запрос не найден" });
        }
        const deposit = deposits[0];
    
        const updateApproval = db.prepare('UPDATE approval SET status = 1 WHERE id = ?').run(request_id);
    
        const updateUserBalance = db.prepare('UPDATE users SET balance = balance + ? WHERE id = ?').run(deposit.count, deposit.user_id);
        console.log("Обновление баланса пользователя:", updateUserBalance);
    
        return res.json({ status: "success", message: "Баланс пополнен" });
    }
  };
  