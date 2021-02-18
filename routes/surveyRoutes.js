const mongoose = require("mongoose");
const requireCredits = require("../middlewares/requireCredits");
const requireLogin = require("../middlewares/requireLogin");
const Survey = mongoose.model("surveys");
const Mailer = require("../services/Mailer");
const template = require("../services/emailTemplates/surveyTemplate");
const { Path } = require("path-parser");
const { URL } = require("url");
const { uniqBy } = require("lodash");

module.exports = (app) => {
  app.get("/api/surveys/thanks", (req, res) => {
    res.send("thanks for voting!");
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body.values;
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.map((email) => ({ email: email.recipient })),
      // recipients: recipients.map((email) => {
      //   console.log("IN SURVEY NEW", email);
      // }),
      _user: req.user.id,
      dateSent: Date.now(),
    });
    // send emails
    const mailer = new Mailer(survey, template(survey));
    try {
      await mailer.send();
      // sendMail(template(survey), subjectt, recipients)
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send({ survey, user });
    } catch (err) {
      res.status(422).send(err);
    }
  });

  // this goes off to sendgrid
  app.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice");
    const events = req.body.map(({ url, email }) => {
      const match = p.test(new URL(url).pathname);
      if (match) {
        return {
          email,
          surveyId: match.surveyId,
          choice: match.choice,
        };
      }
    });

    const compactEvents = events.filter(Boolean);
    const uniqEvents = uniqBy(compactEvents, "email", "surveyId");

    const updatedEvents = uniqEvents.forEach(({ surveyId, email, choice }) => {
      Survey.updateOne(
        {
          _id: surveyId,
          recipients: {
            // has to match the email and responded (much faster, and doesnt update or touch data is doenst need to)
            $elemMatch: { email: email, responded: false },
          },
        },
        {
          //update the survey, adding 1 to choice and setting the recipeint email to know it responded
          $inc: { [choice]: 1 },
          $set: { "recipients.$.responded": true },
        }
      ).exec();
    });

    res.send({});
  });
};
