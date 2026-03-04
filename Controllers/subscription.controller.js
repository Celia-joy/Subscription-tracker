import Subscription from '../Models/subscription.model.js';
import {Client} from '@upstash/qstash';

export const createSubscription = async (req, res, next)=>{
    try{
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        });
        const client = new Client({
            token:process.env.QSTASH_TOKEN
        });
        await client.publishJSON({
            url:`${process.env.SERVER_URL}/api/v1/workflow/subscription/reminder`,
            body:{
                subscriptionId: subscription._id
            }
        });
        res.status(201).json({
            success: true,
            data: subscription
        });
    }
    catch (error){
        next (error);
    }
}
export const getUserSubscriptions = async(req, res, next)=>{
    try {
        if(req.user.id != req.params.id){
            const error = new Error('You are not the owner of this account');
            error.status = 401;
            throw error;
        }
        const subscriptions = await Subscription.find({user: req.params.id});
        res.status(200).json({
            success:true,
            data: subscriptions
        });

    }
    catch(error){
        next(error);
    }

}
export const getAllSubscriptions = async (req, res, next)=>{
    try{
        const Allsubscriptions = await Subscription.find();
        res.status(200).json({
            success:true,
            data:Allsubscriptions
        });
    }
    catch (error){
        next(error)
    }
}
