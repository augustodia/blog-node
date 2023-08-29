import {Router, Response, Request} from "express";
const router =  Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).send('Maoe');
})

export default {basePath: '/auth', router}