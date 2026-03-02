import {Router} from 'express';
import authorize from '../middleware/auth.middleware.js';
import {createSubscription, getUserSubscriptions, getAllSubscriptions} from '../Controllers/subscription.controller.js'

const subscriptionRouter = Router();

subscriptionRouter.post('/',authorize, createSubscription);

subscriptionRouter.get('/',authorize, getAllSubscriptions)

subscriptionRouter.get('/:id', (req, res)=>{
    res.send({title:'Get  subscription details'});
});

subscriptionRouter.put('/:id', (req, res)=>{
    res.send({title:'Update subscription'});
});

subscriptionRouter.delete('/:id', (req, res)=>{
    res.send({title:'Delete subscriptions'});
});

subscriptionRouter.get('/users/:id', authorize, getUserSubscriptions);

subscriptionRouter.put('/:id/cancel', (req, res)=>{
    res.send({title:'Cancel subscriptions'});
});
subscriptionRouter.put('/upcoming-renewals', (req, res)=>{
    res.send({title:' Get upcoming renewals'});
});

export default subscriptionRouter;
