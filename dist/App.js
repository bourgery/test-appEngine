"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const config_1 = require("./config/config");
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        admin.initializeApp({
            credential: admin.credential.cert(config_1.serviceAccount),
            databaseURL: config_1.databaseUrl
        });
        this.express = express();
        this.express.use(bodyParser.json());
        this.express.use(this.checkToken());
        this.routes();
    }
    checkToken() {
        return (req, res, next) => {
            if (!req.headers['authorization'] || req.headers['authorization'].toString().substr(0, 6) !== 'Bearer') {
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
        };
    }
    // Configure API endpoints.
    routes() {
        let router = express.Router();
        // placeholder route handler
        router.post('/updateCounter', (req, res, next) => {
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
exports.default = new App().express;
