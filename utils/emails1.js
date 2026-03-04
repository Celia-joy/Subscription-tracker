import transporter from '../config/mailer.js';

export const sendWelcomeEmail = async (email, name) => {
  const mailerOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to Subscription Tracker',
    html: `
    <div style="background-color: #f8f9fa; padding: 20px; color: #333; font-family: Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h3 style="color: #007bff; margin-bottom: 20px;">Welcome to Subscription Tracker! 🎉</h3>
        <p>Hi <strong>${name}</strong>,</p>
        <p>Your email <strong>${email}</strong> has been successfully registered for your Subscription Tracker account.</p>
        <p>You can now start tracking all your subscriptions in one place and never miss a renewal date again!</p>
        <div style="margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 5px;">
          <h4 style="color: #28a745; margin-bottom: 10px;">What's next?</h4>
          <ul style="color: #666;">
            <li>Add your first subscription</li>
            <li>Set renewal reminders</li>
            <li>Track your monthly spending</li>
          </ul>
        </div>
        <p style="margin-top: 30px; color: #6c757d;">Best regards,<br>The Subscription Tracker Team</p>
      </div>
    </div>
    `
  };

  try {
    await transporter.sendMail(mailerOptions);
    console.log(`Welcome email sent successfully to ${email}`);
  } catch (error) {
    console.log(`The email was not sent due to the following errors:\n ${error}`);
  }
};
export default sendWelcomeEmail;