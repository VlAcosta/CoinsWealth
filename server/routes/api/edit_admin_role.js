async function send_email(transporter, email_to, code, role) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Coin Wealth" <info@coinwealth.group>', // sender address
      to: `${email_to}`, // list of receivers
      subject: `Сoinwealth inviting you to be an ${role} on coinweath.group`, // Subject line
      text: `HI, DEAR USER!
      To confirm, please click on the following button:
      <https://coinwealth.group/confirm-admin/${code}>
      If the link above doesn't work, copy and paste the address below into a new browser window:
      https://coinwealth.group/confirm-admin/${code}
      Best regards,
      Coin Wealth Group`, // plain text body
      html: `<br>
      <table style="width:100%;padding:16px 24px 0px;font-family:Poppins,sans-serif;font-size:14px;line-height:20px;background-color:rgb(12,14,27);color:rgb(248,248,248)">
        <tbody style="font-family:Poppins,sans-serif">
          <tr style="font-family:Poppins,sans-serif">
            <td style="font-family:Poppins,sans-serif">
              <table style="width:100%;margin-bottom:32px;font-family:Poppins,sans-serif">
                <tbody style="font-family:Poppins,sans-serif">
                  <tr style="font-family:Poppins,sans-serif">
                    <td style="font-family:Poppins,sans-serif">
                      <img src="https://coinwealth.group/static/logo.png" width="246" style="font-family: Poppins, sans-serif;">
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr style="font-family:Poppins,sans-serif">
            <td style="font-family:Poppins,sans-serif">
              <table style="width:100%;font-family:Poppins,sans-serif">
                <tbody style="font-family:Poppins,sans-serif">
                  <tr style="font-family:Poppins,sans-serif">
                    <td style="font-family:Poppins,sans-serif">
                      <div style="font-size:16px;font-weight:700;line-height:22px;font-family:Poppins,sans-serif;margin:0px 0px 12px;width:100%;max-width:550px;color:rgb(248,248,248)"> HI, DEAR USER! </div>
                    </td>
                  </tr>
                  <tr style="font-family:Poppins,sans-serif">
                    <td style="font-family:Poppins,sans-serif">
                      <div style="margin:0px 0px 12px;font-size:14px;font-weight:400;line-height:20px;font-family:Poppins,sans-serif;width:100%;max-width:550px;color:rgb(248,248,248)">To confirm, please click on the following button: </div>
                    </td>
                  </tr>
                  <tr style="font-family:Poppins,sans-serif">
                    <td style="font-family:Poppins,sans-serif">
                      <div style="margin:0px 0px 20px;padding:11px 32px;width:160px;display:block;text-align:center;border-radius:2px;font-family:Poppins,sans-serif;background-color:rgb(185,247,0)">
                        <a href="https://coinwealth.group/confirm-admin/${code}" style="text-decoration:none;font-family:Poppins,sans-serif;color:rgb(12,14,27)" target="_blank">
                          <span style="font-family:Poppins,sans-serif;font-weight:600;line-height:18px;font-size:14px">Confirm Permission</span>
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr style="font-family:Poppins,sans-serif">
                    <td style="font-family:Poppins,sans-serif">
                      <div style="margin:0px 0px 4px;font-size:14px;font-weight:400;line-height:20px;font-family:Poppins,sans-serif;width:100%;max-width:550px;color:rgb(248,248,248)"> If the link above doesn&#39;t work, copy and paste the address below into a new browser window: </div>
                    </td>
                  </tr>
                  <tr style="font-family:Poppins,sans-serif">
                    <td style="font-family:Poppins,sans-serif">
                      <div style="margin:0px 0px 4px;width:100%;max-width:550px;font-family:Poppins,sans-serif">
                        <a style="font-family:Poppins,sans-serif;font-weight:400;line-height:18px;font-size:14px;text-decoration:none;color:rgb(25,112,247)">https://coinwealth.group/confirm-admin/${code}</a>
                      </div>
                    </td>
                  </tr>
                  <tr style="font-family:Poppins,sans-serif">
                    <td style="font-family:Poppins,sans-serif">
                      <div style="margin:0px;font-size:14px;font-weight:400;line-height:20px;font-family:Poppins,sans-serif;width:100%;max-width:550px;color:rgb(248,248,248)"> Best regards, <br> Coin Wealth Group </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr style="font-family:Poppins,sans-serif">
            <td style="font-family:Poppins,sans-serif">
              <table style="width:100%;margin-top:16px;font-family:Poppins,sans-serif">
                <tbody style="font-family:Poppins,sans-serif">
                  <tr style="font-family:Poppins,sans-serif">
                    <td style="font-family:Poppins,sans-serif">
                      <div style="width:100%;line-height:18px;padding-top:8px;border-top-width:1px;border-top-style:solid;text-align:center;font-family:Poppins,sans-serif;border-top-color:rgb(79,83,100)">
                        <span style="text-decoration:none;font-size:12px;font-weight:400;font-family:Poppins,sans-serif;color:rgb(79,83,100)">
                          <a style="text-decoration:none;font-family:Poppins,sans-serif;color:rgb(79,83,100)" rel="noopener" href="https://coinwealth.group" target="_blank">coinwealth.group</a> © ${new Date().getFullYear()} All rights reserved </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
      </div>`,
    });
  
    //console.log("Message sent: %s", info.messageId);
  }

module.exports = {
    async execute(req, res, random_gen, random_gen1, dispatch_request, getRandomInt, transporter, merchantId) {
        let token = req.body.token;
        let userid = req.body.userid;
        let email = req.body.email;
        let level = Number(req.body.level);

        
        let timestamp = Math.floor(Date.now()/1000);
        let row = db.prepare('SELECT * FROM tokens WHERE token = ?').all(token);

        if (row.length == 1 && row[0].expired > timestamp && userid == row[0].user_id) {
            let userdata = db.prepare('SELECT * FROM users WHERE id = ?').get(userid);
            if (userdata.is_admin >= 3) {
                let useremail = db.prepare('SELECT is_admin FROM users WHERE email = ?').all(email);
                if (useremail.length == 0) {
                    return res.json({status: 'user_not_defined'})
                } else if (useremail.length > 1) {
                    return res.json({status: 'users_too_much'})
                } else {
                    if (useremail[0].is_admin > 3) return res.json({status: 'permission_denied'})

                    if (level > 0 && level <= 3 && useremail[0].is_admin == 0) {
                        let email_code = random_gen(30);
                        send_email(transporter, `${email}`, `${email_code}`, `${['Viewer', 'Editor', 'Admin'][level-1]}`).catch(console.error);
                        db.prepare('UPDATE users SET admin_code = ?, admin_req_level = ? WHERE "email" = ?').run(`${email_code}`, level, `${email}`);
                    } else if (level == 0 || useremail[0].is_admin != 0) {
                        db.prepare('UPDATE users SET is_admin = ? WHERE "email" = ?').run(level, `${email}`);
                    } else return res.json({status: 'level_error'})
                
                    return res.json({status: 'success'})
                }
            } else return res.json({status: 'no_admin'})
           

        } else {
            res.json({status: 'token_expired'})
        }
    }
}

