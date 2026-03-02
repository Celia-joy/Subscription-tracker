import transporter from '../config/mailer.js';

const sendWelcomeEmail =  async(email,User )=>{

  const mailerOptions = {

    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to Subscription Tracker',
    html: `

    <div style="background-color: rgba(0,0,0,0.25),padding: 0 0 2 4, color: #1578">

    <h3>The subscription tracker</h3>

    <p>Your email  have been registered for account</p>

    </div>

    `
  }  

}

// let us send the emial 

try{
   await transporter.sendMail(mailerOptions)
}catch(error){
    console.log(`The emial was not sent to due to  the following errors \n ${error}`)
}

// const resetPasswordEmail = async(email,user)

export default sendWelcomeEmail;