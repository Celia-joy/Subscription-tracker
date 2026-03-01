import {Router} from 'express';
import {signUp} from '../Controllers/auth.controllers.js';
import {signIn} from '../Controllers/auth.controllers.js';
import {signOut} from '../Controllers/auth.controllers.js';
const authRouter = Router();

authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', signIn);
authRouter.post('/sign-out', signOut);
export default authRouter;