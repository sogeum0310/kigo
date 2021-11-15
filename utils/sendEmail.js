const nodemailer = require('nodemailer')
const config = require('../config')


const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: config.account.service,
      auth: {
          user: config.account.email,
          pass: config.account.password
      },
    });

    await transporter.sendMail({
      from: config.account.email,
      to: email,
      subject: subject,
      text: text,
    });

    console.log("등록된 이메일로 비밀번호 수정 링크를 발송했습니다");
  } catch (error) {
      console.log(error, "error: email not sent");
  } 
}


module.exports = sendEmail