const express = require("express");
const router = express.Router();
const path = require("path");
const jwt = require("jsonwebtoken"),
  multer = require("multer");
const auth = require("../../middleware/auth");
/******** Main Mail *********/
const SparkPost = require("sparkpost");
const options = {
  endpoint: "https://dev.sparkpost.com:443",
};
const client = new SparkPost(
  "a193744fa3e4eb2386351a0c5e39aefb732bb13e",
  options
);
/***********  Backup Mail ************/

const api_key = "2883fd2f88d07523459b86e5c0822317-0f472795-8d8df013";
const DOMAIN =
  "https://app.mailgun.com/app/sending/domains/sandbox1e1c161b2b95402a9206d4457e6dad48.mailgun.org";
const mg = require("mailgun-js")({
  apiKey: api_key,
  domain: DOMAIN,
});

// router.use((req, res, next) => {
//   console.log(`${new Date()} - ${req.method} - ${req.url} - ${req.host}`);
//   next();
// });

/******************* SparkPost Mail********************/
function SparkPostMail(to, subject, message) {
  let sendMail = client.transmissions
    .send({
      options: {
        sandbox: true,
      },
      content: {
        from: "testing@sparkpostbox.com",
        subject: `${subject}`,
        html: `<html>
    <body>
    <p>${message}
    </p>
    </body>
    </html>`,
      },
      recipients: [{ address: `${to}` }],
    })
    .then((data) => {
      // console.log("success1");
      console.log(data);
      return "success";
    })
    .catch((err) => {
      // console.log("error");
      console.log(err);
      return mailGun(to, subject, message)
      // return "error";
    });

  return sendMail;
}

function mailGun(to, subject, message) {  

  const data = {
    from:
      "Mailgun Sandbox <postmaster@sandbox1e1c161b2b95402a9206d4457e6dad48.mailgun.org>",
    to: `${to}`,
    subject: `${subject}`,
    text: `${message}`,
  };
  
  let sendMail = mg.messages().send(data, function (error, body) {
    if (error) {
      console.log(error);
      return 'error'
    } else {
      console.log(body);
      return 'success'
    }
  });

  return sendMail
}


/**********************  End   ***********************/
router.post("/sendEmail", async (req, res) => {
  let { subject, message, to } = req.body.data;
  let mailSend = await SparkPostMail(to, subject, message);
  console.log("main", mailSend);
  return res.send({ message: mailSend });
});

module.exports = router;
