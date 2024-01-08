import express from 'express';
import bodyParser from 'body-parser';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import cors from 'cors';

const app = express();
const port = 3000;
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