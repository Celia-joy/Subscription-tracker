import {serve} from "@upstash/workflow/express";
import Subscription from "../Models/subscription.model.js";
import {sendRenewalReminderEmail} from "../utils/emails2.js";

export const sendReminders = serve (async(context)=>{
    const {subscriptionId} = context.requestPayload;
    const subscription = await context.run("get-subscription", async()=>{
        return (await Subscription.findById(subscriptionId)).populated("user", "email name" );
    });
    if(!subscription || subscription.status !== "active"){
        return;
    }
    const {user, name, renewalDate, price, frequency} = subscription;
    const renewalTime = new Date(renewalDate);
    const now = Date.now();
    const daysUntilRenewal = Math.ceil((renewalTime - now) / (1000 * 60 * 60 * 24));
    const reminders = [7, 5, 2, 1];
    for( const day of reminders){
        const waitTime = renewalTime - now - day *24 * 60 * 60 * 1000;
        if(waitTime <= 0){
            continue;
        }
        await context.sleep(`wait-${day}-days`, Math.floor(waitTime / 1000));
        await context.run(`send-${day}-day-reminder`,async()=>{
            await sendRenewalReminderEmail(user.email, user.name, subscription);
            console.log(`${day}-day reminder sent to ${user.email} for ${name}`);
        });
    }
});