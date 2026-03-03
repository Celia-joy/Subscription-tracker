import {Router} from 'express';
import authorize from '../middleware/auth.middleware.js';
const userRouter = Router();
import {getUsers, getUser} from '../Controllers/user.controllers.js';
userRouter.get('/', getUsers);

userRouter.get('/:id',authorize, getUser);
  
userRouter.post('/', (req, res)=>{
    res.send({title:'Create a new  user'});
 });

  userRouter.put('/:id', (req, res)=>{
    res.send({title:'Update the user'});
 });

  userRouter.delete('/:id', (req, res)=>{
    res.send({title:'Delete the user'});
 });

 export default userRouter;
 
