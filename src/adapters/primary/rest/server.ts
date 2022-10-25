import * as express from "express";
import {Express} from "express";
import {configureBookingController} from "./controllers/bookingController";
import {easyDevDependencies} from "./dependencies/easyDevDependencies";
import {devDependencies} from "./dependencies/devDependencies";
import bodyParser = require("body-parser");

const cors = require('cors');
const app: Express = express();
if (process.env.NODE_ENV !== 'production')
    require('dotenv').config();
const port = process.env.PORT || 3001;
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

if (process.env.EASY_DEV === 'true') {
    console.log("EASY DEV MODE!!!!!");
    configureBookingController(app, easyDevDependencies());
}
else {
    console.log("DEV MODE!!!!!");
    configureBookingController(app, devDependencies());
}

app.listen(port, () => console.log(`Started App on port: ${port}!`));
