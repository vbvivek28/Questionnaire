const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const request = require('request');
const secretKey = '6LcJUxwmAAAAAMGMy96gVb9rHSbGcQwc4FwCJxUX';
require('dotenv').config();


const app = express();
var port = process.env.PORT || 8888;

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('public'));

// Serve the questionnaire page
app.get('/', (req, res) => {
  res.sendFile(__dirname+"/index.html");
});



// Handle form submission
app.post('/mail', async (req, res) => {

  const { name, Email, question1, question2 ,question3,question4,question5,question6,question7,question8,question9,question10,question11,question12,question13,question14} = req.body;
 
console.log(name);
const htmlBody = `
  <h1>Thank you for your submission, ${name}!</h1>
  <p>Here are your answers:</p>
  <ul>
    <li>Question 1: ${question1}</li>
    <li>Question 2: ${question2}</li>
    <li>Question 3: ${question3}</li>
    <li>Question 4: ${question4}</li>
    <li>Question 5: ${question5}</li>
    <li>Question 6: ${question6}</li>
    <li>Question 7: ${question7}</li>
    <li>Question 8: ${question8}</li>
    <li>Question 9: ${question9}</li>
    <li>Question 10: ${question10}</li>
    <li>Question 11: ${question11}</li>
    <li>Question 12: ${question12}</li>
    <li>Question 13: ${question13}</li>
    <li>Question 14: ${question14}</li>
  </ul>`;

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
   host:"smtp.gmail.com",
   service:"gmail",
   port:465,
   auth:{
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
   }
  });


  // Define the email options
  const mailOptions = {
   // Replace with your Gmail email address  varun@tractionshastra.com
    from: '"vb"<vbtest28@gmail.com>', // sender address
    to: [Email , `vb79798@gmail.com`], // list of receivers
    subject: "Questionnaire Response", // Subject line
    text: `Thank you for completing the questionnaire!`,
    html: htmlBody, // html body
  };

  // Send the email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log('Error occurred:', error.message);
//       res.send('error');
//     } else {
//       console.log('Email sent:', info.response);
//       res.send('success');
//     }
//   });
try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.send('success');
  } catch (error) {
    console.log('Error occurred:', error.message);
    res.send('error');
  }

});




app.post('/verifyCaptcha',(req,res)=>{
console.log("verify captcha");
  if(!req.body.captcha){
      console.log("err");
      return res.json({"success":false, "msg":"Capctha is not checked"});
     
  }

  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}`;

  request(verifyUrl,(err,response,body)=>{

      if(err){console.log(err); }

      body = JSON.parse(body);

      if(!body.success && body.success === undefined){
          return res.json({"success":false, "msg":"captcha verification failed"});
      }
      else if(body.score < 0.5){
          return res.json({"success":false, "msg":"you might be a bot, sorry!", "score": body.score});
         
      }
         
          // return json message or continue with your function. Example: loading new page, ect
          return res.json({"success":true, "msg":"captcha verification passed", "score": body.score});
          
         
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
