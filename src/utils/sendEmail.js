const { SendEmailCommand } = require("@aws-sdk/client-ses");
const sesClient = require("./sesClient");

const createSendEmailCommand = ({ to, subject, html, text }) => {
  return new SendEmailCommand({
    Destination: {
      ToAddresses: [to],
    },

    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: html,
        },

        Text: {
          Charset: "UTF-8",
          Data: text,
        },
      },

      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },

    Source: process.env.SES_FROM_EMAIL,
  });
};

const run = async ({ to, subject, html, text }) => {
  const sendEmailCommand = createSendEmailCommand({
    to,
    subject,
    html,
    text,
  });

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (caught) {
    if (caught instanceof Error && caught.name === "MessageRejected") {
      return caught;
    }

    throw caught;
  }
};

module.exports = { run };
