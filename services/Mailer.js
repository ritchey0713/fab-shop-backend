const sgMail = require("@sendgrid/mail");
const keys = require("../config/keys");
sgMail.setApiKey(keys.sendGridKey);

class Mailer {
  constructor(survey, content) {
    const { subject, recipients } = survey;
    this.msg = {
      to: recipients.map((recipient) => recipient.email),

      from: keys.mailFrom,
      subject,
      html: content,
      trackingSettings: {
        clickTracking: {
          enable: true,
        },
        openTracking: {
          enable: true,
        },
        subscriptionTracking: {
          enable: true,
        },
      },
    };

    this.send = async () => {
      try {
        const response = await sgMail.sendMultiple(this.msg);
        return response;
      } catch (error) {
        console.error(error);
        if (error.response) {
          console.error(error.response.body);
        }
      }
    };
  }
}

module.exports = Mailer;
