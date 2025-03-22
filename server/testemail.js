const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  host: "vip57.hostiman.ru",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "info@coinwealth.group",
    pass: "0fmcvf5IWnITOuRP",
  },
});

async function sendEmail(){
    const info = await transporter.sendMail({
        from: '"Coin Wealth" <info@coinwealth.group>', // sender address
        to: `maxon4ik102@mail.ru`, // list of receivers
        subject: "test", // Subject line
        text: `asd`, // plain text body
        html: `asd`,
      });
    console.log("Message sent: %s", info.messageId);
}

sendEmail()
  
  