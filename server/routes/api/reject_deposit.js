module.exports = {
  async execute(req, res) {
    
    let token = req.body.token;
    let request_id = req.body.request_id;  // Используем request_id вместо userid

    if (!token || !request_id) {
      console.log("Некорректные данные");
      return res.status(400).json({ status: "error", message: "Некорректные данные" });
    }

    // Проверка наличия токена
    let row = await db.prepare('SELECT * FROM tokens WHERE token = ?').all(token);
    if (!row.length) {
      console.log("Токен не найден");
      return res.status(403).json({ status: "error", message: "Токен истёк" });
    }

    // Попытка обновления статуса заявки
    const result = await db.prepare("UPDATE approval SET status = -1 WHERE id = ?").run(request_id);  // Используем request_id
    console.log("Результат обновления статуса заявки:", result);

    // Проверка, изменились ли строки в базе
    if (result.changes === 0) {
      console.log("Запрос с таким ID не найден или статус не был изменен");
      return res.status(404).json({ status: "error", message: "Запрос не найден" });
    }

    return res.status(200).json({ status: "success", message: "Заявка отклонена" });
  }
};
