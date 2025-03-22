async function send_email(transporter, email_to, code) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Coin Wealth" <info@coinwealth.group>', // sender address
      to: `${email_to}`, // list of receivers
      subject: "Reset password on your Coin Wealth account", // Subject line
      text: `HI, DEAR USER!
      We have received a request to restore the password on your account!
      To restore, please click on the following button:
      <https://coinwealth.group/reset-password/${code}>
      If the link above doesn't work, copy and paste the address below into a new browser window:
      https://coinwealth.group/reset-password/${code}
      If you did not request a password reset, then just ignore this email!
      This link is valid for 24 hours!
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
                      <div style="margin:0px 0px 12px;font-size:14px;font-weight:400;line-height:20px;font-family:Poppins,sans-serif;width:100%;max-width:550px;color:rgb(248,248,248)"> We have received a request to restore the password on your account! <br> To restore, please click on the following button: </div>
                    </td>
                  </tr>
                  <tr style="font-family:Poppins,sans-serif">
                    <td style="font-family:Poppins,sans-serif">
                      <div style="margin:0px 0px 20px;padding:11px 32px;width:160px;display:block;text-align:center;border-radius:2px;font-family:Poppins,sans-serif;background-color:rgb(185,247,0)">
                        <a href="https://coinwealth.group/reset-password/${code}" style="text-decoration:none;font-family:Poppins,sans-serif;color:rgb(12,14,27)" target="_blank">
                          <span style="font-family:Poppins,sans-serif;font-weight:600;line-height:18px;font-size:14px">Reset Password</span>
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
                        <a style="font-family:Poppins,sans-serif;font-weight:400;line-height:18px;font-size:14px;text-decoration:none;color:rgb(25,112,247)">https://coinwealth.group/reset-password/${code}</a>
                      </div>
                    </td>
                  </tr>
                  <tr style="font-family:Poppins,sans-serif">
                    <td style="font-family:Poppins,sans-serif">
                      <div style="margin:0px 0px 12px;font-size:14px;font-weight:400;line-height:20px;font-family:Poppins,sans-serif;width:100%;max-width:550px;color:rgb(248,248,248)"> If you did not request a password reset, then just ignore this email! <br> This link is valid for 24 hours! </div>
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

  const months_list = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
]

module.exports = {
    async execute(req, res, random_gen, random_gen1, dispatch_request, getRandomInt, transporter) {
        let row = db.prepare('SELECT * FROM users WHERE email = ?').all(req.body.email);
        
        if (row.length != 0) {
            let email_code = random_gen(24);

            let timestamp = Math.floor(Date.now()/1000);

            db.prepare('UPDATE users SET "resetpass_code" = ?, "resetpass_time" = ? WHERE "email" = ?').run(`${email_code}`, timestamp, req.body.email);

            send_email(transporter, `${req.body.email}`, `${email_code}`).catch(console.error);
        }
        res.json({ status: 'success' })
    }
}

