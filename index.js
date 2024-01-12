import express from 'express';
import bodyParser from 'body-parser';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import cors from 'cors';
// import NewsAPI from 'newsapi';
// import fs from 'fs';
// import https from 'https';

const app = express();
const port = 3000;
// const newsapi = new NewsAPI('cc4e82057511460fa37affd759119e03');
// const privateKey = fs.readFileSync("doch-privateKey.key", 'utf8');
// const certificate = fs.readFileSync('doch.crt', 'utf8');
// const credentials = { key: privateKey, cert: certificate};
// const httpsServer = https.createServer(credentials, app);
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
    res.render('tech.ejs',{"news1":"","news2":"","news3":""});
});

app.post("/submit",async(req, res)=>{
    var prompt=req.body['lat'];
    console.log(prompt);
    const news=await axios.get(`https://newsapi.org/v2/everything?q=${prompt}&pageSize=5&language=en&apiKey=cc4e82057511460fa37affd759119e03`);
    var newsdata=news.data;
    var article1=newsdata.articles[0].description;
    var img1=newsdata.articles[0].urlToImage;
    var article2=newsdata.articles[1].description;
    var img2=newsdata.articles[1].urlToImage;
    var article3=newsdata.articles[2].description;
    var img3=newsdata.articles[2].urlToImage;
    console.log(newsdata);
    console.log(img1);
    res.render('tech.ejs',{"news1":article1,"news2":article2,"news3":article3,"img1":img1,"img2":img2,"img3":img3});
})
