const nodemailer = require("nodemailer");


async function sendEmail(req,res,next) {
  
  /*
    The request should come in this form
    {
      maillist: ['****.bram@****.com','****.shah@****.com','****.styles@****.com',],
      subject: "The Subject goes here",
      message: 'The text of the message'
    }
    this maillist can come from req.body and we can set this array as a value to the key to:

    const { maillist } = req.body;
    for example:  ['****.bram@****.com','****.shah@****.com','****.styles@****.com',];
  */

  // First, define send settings by creating a new transporter: 
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
    port: 465, // Port for SMTP (usually 465)
    secure: true, // Usually true if connecting to port 465
    auth: {
      user: process.env.EMAIL_ADDRESS, // Your email address
      pass: process.env.EMAIL_PASSWORD, // Password (for gmail, your app password)
      // ⚠️ For better security, use environment variables set on the server for these values when deploying
    },
  });
  // Define and send message inside transporter.sendEmail() and await info about send from promise:
  const { maillist, subject, message } = req.body
  try{
    let info = await transporter.sendMail({
      from: process.env.EMAIL_ADDRESS,
      to: maillist,
      subject: subject,
      text: message,
    });

    res.status(200).json({ message: "Email has been sent" }); 
    console.log(info.messageId); // Random ID generated after successful send (optional)
  }catch(err){
    next(err)
  }
}

async function sendResetEmail(req,res,next) {
  
  /*
    the request should come in this form
    {
      to: 'something@****.com',
    }
  */

  // First, define send settings by creating a new transporter: 
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
    port: 465, // Port for SMTP (usually 465)
    secure: true, // Usually true if connecting to port 465
    auth: {
      user: process.env.EMAIL_ADDRESS, // Your email address
      pass: process.env.EMAIL_PASSWORD, // Password (for gmail, your app password)
      // ⚠️ For better security, use environment variables set on the server for these values when deploying
    },
  });
  // Define and send message inside transporter.sendEmail() and await info about send from promise:
  const {to, subject } = req.body
  try{
    let info = await transporter.sendMail({
      from: process.env.EMAIL_ADDRESS,
      to,
      subject,
      //This is only when we need to reset the password.
      html: ` 
        <h1>Hello there</h1>
        <p>Click the link to reset your password</p>
        <a>${req.body.resetUrl}</a>
        <p>The reset password link will be valid 10 minutes</p>
      `,
    });

    res.status(200).json({ message: "Email has been sent" }); 
    console.log(info.messageId); // Random ID generated after successful send (optional)
  }catch(err){
    next(err)
  }
}


module.exports = {sendEmail, sendResetEmail};