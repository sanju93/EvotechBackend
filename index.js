import {config} from 'dotenv'
import express from 'express';
import router from './routes/index.js';
import connect from './config/database.js';
import './config/passport_jwt.js';
config();

let app = express();

const port = 8000 || process.env.port;
app.use(express.urlencoded());
app.use(express.json());
app.use('/', router);

app.listen(port,function(err){
    if (err){
        console.log(err);
        return;
    }
    connect();

    console.log("server running on port :",port);
})


