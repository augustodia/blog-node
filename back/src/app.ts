import express, {Application, Request, Response} from 'express';
import dotenv from 'dotenv'

import authController from '@application/controllers/auth/routes'

const app: Application = express();

dotenv.config();

app.use(authController.basePath, authController.router)
app.use('/', (req: Request, res: Response)=> {
    res.send('pong')
})

export default app;