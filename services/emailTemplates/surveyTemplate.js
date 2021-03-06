const keys = require("../../config/keys");

module.exports = (survey) => {
  return `
    <html>
      <body>
        <div style="text-align: center">
          <h3>
            We'd love your feedback!
          </h3>
          <p>
            Please answer the following question:
          </p>
          <p>
            ${survey.body}
            <div>
              <a href=${keys.redirectDomain}/api/surveys/${survey.id}/yes>Yes</a>
            </div>
            <div>
              <a href=${keys.redirectDomain}/api/surveys/${survey.id}/no>No</a>
            </div>
          </p>
        </div>
      </body>
    </html>
    `;
};
