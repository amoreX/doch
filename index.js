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
    res.render('tech.ejs',{"news1":"","news2":"","news3":"","news4":"","news5":"","news6":"","news7":"","news8":"","url1":"","url2":"","url3":"","url4":"","url5":"","url6":"","url7":"","url8":"","place":"What are you craving?"});
});

app.post("/submit",async(req, res)=>{
    try {
        var prompt = req.body['lat'];
        console.log(prompt);
        
        const news = await axios.get(`https://newsapi.org/v2/everything?q=${prompt}&pageSize=9&language=en&apiKey=49d58dd4dc4d4b11b4a20e32911bd048`);
        console.log(news.data);
        if (!news.data.articles || news.data.articles.length === 0) {
            return res.status(404).render('tech.ejs',{"news1":"","news2":"","news3":"","news4":"","news5":"","news6":"","news7":"","news8":"","url1":"","url2":"","url3":"","url4":"","url5":"","url6":"","url7":"","url8":"","place":"damn that doesnt exist"});
        }

        var newsdata = news.data;
        var article1 = newsdata.articles[0].description;
        var img1 = newsdata.articles[0].urlToImage;
        var url1 = newsdata.articles[0].url;
        var article2 = newsdata.articles[1].description;
        var img2 = newsdata.articles[1].urlToImage;
        var url2 = newsdata.articles[1].url;
        var article3 = newsdata.articles[2].description;
        var img3 = newsdata.articles[2].urlToImage;
        var url3 = newsdata.articles[2].url;
        var article4 = newsdata.articles[3].description;
        var img4 = newsdata.articles[3].urlToImage;
        var url4 = newsdata.articles[3].url;
        var article5 = newsdata.articles[4].description;
        var img5 = newsdata.articles[4].urlToImage;
        var url5 = newsdata.articles[4].url;
        var article6 = newsdata.articles[5].description;
        var img6 = newsdata.articles[5].urlToImage;
        var url6 = newsdata.articles[5].url;
        var article7 = newsdata.articles[6].description;
        var img7 = newsdata.articles[6].urlToImage;
        var url7 = newsdata.articles[6].url;
        var article8 = newsdata.articles[7].description;
        var img8 = newsdata.articles[7].urlToImage;
        var url8 = newsdata.articles[7].url;

        console.log(newsdata);

        res.render('tech.ejs', {
            "news1": article1,
            "news2": article2,
            "news3": article3,
            "news4":article4,
            "news5": article5,
            "news6": article6,
            "news7": article7,
            "news8":article8,
            "img1": img1,
            "img2": img2,
            "img3": img3,
            "img4": img4,
            "img5": img5,
            "img6": img6,
            "img7": img7,
            "img8": img8,
            "url1": url1,
            "url2": url2,
            "url3": url3,
            "url4": url4,
            "url5": url5,
            "url6": url6,
            "url7": url7,
            "url8": url8,
            "place":"What are you craving?"
        });
        console.log(url1);
    } catch (error) {
        console.error("Error fetching data:", error.message);
        // Handle the error by sending an error response to the client
        res.status(500).render('tech.ejs',{"news1":"","news2":"","news3":"","news4":"","news5":"","news6":"","news7":"","news8":"","url1":"","url2":"","url3":"","url4":"","url5":"","url6":"","url7":"","url8":"","place":"Please enter valid query"});
    }
})
