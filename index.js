import express from 'express';
import bodyParser from 'body-parser';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import cors from 'cors';
import fs from 'fs';
import https from 'https';

const app = express();
const port = 3000;
const privateKey = fs.readFileSync("doch-privateKey.key", 'utf8');
const certificate = fs.readFileSync('doch.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate};
const httpsServer = https.createServer(credentials, app);
const __dirname = dirname(fileURLToPath(import.meta.url));



app.use(express.static('public')); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.listen(process.env.PORT || port, ()=>{
    console.log(`listening on port ${port}`);
})

app.get('/', (req, res) => {
    res.render('index.ejs');
    console.log("Website loaded succesfully");
})

app.get('/tech', (req, res) =>{
    console.log('Getting tech');
    res.render('tech.ejs');
});