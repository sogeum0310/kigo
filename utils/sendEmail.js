const nodemailer = require('nodemailer')


const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'sogeum0310@gmail.com',
          pass: 'hyun0831**'
      },
    });

    await transporter.sendMail({
      from: 'sogeum0310@gmail.com',
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