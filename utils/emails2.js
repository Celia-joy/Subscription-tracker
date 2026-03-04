import transporter from '../config/mailer.js';

export const sendRenewalReminderEmail = async (email, name, subscription)=>{
  const mailerOptions = {
    from: process.env.EMAIL_USER,
    to:email,
    subject:`Reminder: Your ${subscription.name} subscription renews in 7 days`,
    html: `
    <div style="background-color: #f8f9fa; padding: 20px; color: #333; font-family: Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h3 style="color: #ff6b35; margin-bottom: 20px;">⏰ Subscription Renewal Reminder</h3>
        <p>Hi <strong>${name}</strong>,</p>
        <p>This is a friendly reminder that your <strong>${subscription.name}</strong> subscription will renew in <strong>7 days</strong>.</p>

        <div style="margin-top: 20px; padding: 20px; background-color: #fff3cd; border-left: 4px solid #ffc107; border-radius: 5px;">
          <h4 style="color: #856404; margin-bottom: 10px;">📋 Subscription Details</h4>
          <p style="margin: 5px 0;"><strong>Service:</strong> ${subscription.name}</p>
          <p style="margin: 5px 0;"><strong>Renewal Date:</strong> ${new Date(subscription.renewalDate).toDateString()}</p>
          <p style="margin: 5px 0;"><strong>Amount:</strong> $${subscription.price} / ${subscription.frequency}</p>
        </div>

        <div style="margin-top: 20px; padding: 20px; background-color: #f8f9fa; border-radius: 5px;">
          <h4 style="color: #333; margin-bottom: 10px;">What would you like to do?</h4>
          <ul style="color: #666;">
            <li>Keep your subscription — no action needed</li>
            <li>Cancel before the renewal date to avoid being charged</li>
            <li>Log in to manage your subscriptions</li>
          </ul>
        </div>

        <p style="margin-top: 30px; color: #6c757d;">Best regards,<br>The Subscription Tracker Team</p>
      </div>
    </div>
    `
  };
  try{
    await transporter.sendEmail(mailerOptions);
    console.log(`Renewal reminder sent successfully to ${email}`);

  }
  catch(error){
    console.log(`Reminder email failed: ${error}`);
    next(error);
  }
} 
export default sendRenewalReminderEmail;