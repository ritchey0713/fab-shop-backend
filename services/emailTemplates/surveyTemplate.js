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
            ${survey}
          </p>
        </div>
      </body>
    </html>
    `;
};
