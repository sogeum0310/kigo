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

    console.log("email sent sucessfully");
  } catch (error) {
      console.log(error, "email not sent");
  } 
}


module.exports = sendEmail