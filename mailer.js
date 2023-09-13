const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const submitButton = document.getElementById('submitButton')


function checkChar(string){
    for (const char of string) {
        if(char == ' '){
            return true;
        }
    }
    return false;
}

nameInput.addEventListener('input', () => {
    value1 = nameInput.value;
    if (checkChar(value1) && nameInput.value == ' '){
        nameInput.value = '';
    }
    console.log(value1)

});
emailInput.addEventListener('input', () => {
    value2 = emailInput.value;
    if (checkChar(value2)){
        emailInput.value = '';
    } 
});


submitButton.addEventListener('submit', function(event) {
    event.preventDefault();
    let emailValue = emailInput.value;
    let nameValue = nameInput.value 
    console.log(emailValue)
    console.log(nameValue)
    const nodemailer = require('nodemailer');

    // Create a transporter object using Gmail's SMTP server
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
        }
    });

    // Email content
    const mailOptions = {
        from: '1gugre@gmail.com',
        to: emailValue,
        subject: 'Automated Email',
        text: 'Hello, ' + nameValue + '\n  Your email has been captured and collected'
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });

});