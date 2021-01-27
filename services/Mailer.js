// const sendgrid = require("sendgrid");
// const helper = sendgrid;

// class Mailer extends helper.Mail {}

// module.exports = Mailer;

const sgMail = require("@sendgrid/mail");
const keys = require("../config/keys");
sgMail.setApiKey(keys.sendGridKey);

module.exports = async (body, subject, recipients) => {
  const msg = {
    from: keys.mailFrom,
    subject,
    text: body,
    personalizations: recipients.map((recipient) => ({ to: [recipient] })),
  };

  try {
    const result = await sgMail.send(msg);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
