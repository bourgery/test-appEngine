import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as admin from 'firebase-admin';
import * as cors from 'cors';
import {serviceAccount, databaseUrl} from './config/config';
import {NextFunction, Request, Response} from "express";
import {Counter} from "./Counter";


// Creates and configures an ExpressJS web server.
class App {

    // ref to Express instance
    public express: express.Application;

    //Run configuration methods on the Express instance.
    constructor() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: databaseUrl
        });
        this.express = express();
        this.express.use(bodyParser.json());
        this.express.use(this.checkToken());
        this.routes();
    }

    private checkToken(): any {
        return (req: Request, res: Response, next: NextFunction) => {
            if(!req.headers['authorization'] || req.headers['authorization'].toString().substr(0, 6) !== 'Bearer'){
                res.sendStatus(403);
                return;
            }
            const idToken = req.headers['authorization'].toString().substr(7);
            admin.auth().verifyIdToken(idToken)
                .then(() => next())
                .catch(error => {
                    res.sendStatus(401);
                    return;
                });
        }
    }
    // Configure API endpoints.
    private routes(): void {
        let router = express.Router();
        // placeholder route handler
        router.post('/updateCounter', (req: Request, res: Response, next: NextFunction) => {
            res.json({
               message: "coucou"
            });
            // const counter: Counter = new Counter(req.body.path);
            // counter.update(req.body.date, req.body.up).then(() => res.sendStatus(200))
            //     .catch(() => res.sendStatus(500));
        });
        this.express.use('/', router);
    }

}

export default new App().express;
