const nodemailer =  require('nodemailer');
const transporter =  nodemailer.createTransport({ 
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'midtermclassroom@gmail.com', 
        pass: 'nlggugahyytzkvkm'
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
})

module.exports={ 
    transporter
}