import {Router} from 'express';
 const userRouter = Router();
 userRouter.get('/users', (req, res)=>{
    res.send({title:'GET all users'});
 });

  userRouter.get('/:id', (req, res)=>{
    res.send({title:'GET users details'});
 });

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
 
