import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({

    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
 
});

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Mailer connected !');
    }
});

export default transporter;
