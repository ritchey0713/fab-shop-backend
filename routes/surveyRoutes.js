const mongoose = require("mongoose");
const requireCredits = require("../middlewares/requireCredits");
const requireLogin = require("../middlewares/requireLogin");
const Survey = mongoose.model("surveys");
const sendMail = require("../services/Mailer");
const template = require("../services/emailTemplates/surveyTemplate");

module.exports = (app) => {
  app.post("/api/surveys", requireLogin, requireCredits, (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map((email) => ({ email })),
      _user: req.user.id,
      dateSent: Date.now(),
    });
    // send emails
    // const mailer = new Mailer(survey, template(survey))
    // sendMail(template(survey), subjectt, recipients)
  });
};
