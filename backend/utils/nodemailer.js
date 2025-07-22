import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env', quiet: true });


sendUserEmail({
  email: "frominputfield",
  token: "waitbruh"
});


// Create a test account or replace with real credentials.
export const sendUserEmail = async({email, token}) => {
  const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user: process.env.NDM_USER,
      pass: process.env.NDM_PASSWORD
    },
  });

  const mailOptions = {
    from: {
      name: 'lila tester',
      address: process.env.NDM_USER,
    },
    to: email,
    subject: "INsys confirmation code TESTER",
    text: `Your verification code is:sda`,
    html: `<b>Your verification code is: asdasd</b>`,
  };
  
  const emailResponse = await transporter.sendMail(mailOptions);
  console.log("Message sent:", emailResponse.messageId);
}



