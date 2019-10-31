const axios = require('axios');
const handlebars = require('express-handlebars');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require ('path');
const cheerio = require('cheerio');
const request = require('request');
const bodyParser = require('body-parser');


app.engine('.hbs', handlebars({
    extname: '.hbs',
    defaultLayout: null
}));

app.set('PORT', PORT);

app.use(express.static(path.join(__dirname, 'assets')));

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', '.hbs');

//// user body parser 
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get('/', function (req, res) {
    let url = `https://drudgereport.com`;
    axios({
        method: 'get',
        url
    })
    .then(function (response) {
        const $ = cheerio.load(response.data);
        let data = [];
        $('a').each(function (i, element) {
            let head = $(this)
            .text()
            .trim();

            let hyperLink = $(this)
            .attr('href');

            let img = $('a.find')
            .children('img')
            .attr('src');

            let headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
            let hyperLinkNeat = hyperLink.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

            let dataToPush = {
                head: headNeat,
                hyperLink: hyperLinkNeat,
                img: img
            }

            data.push(dataToPush);
                
            console.log(img);

        })

        res.render('index', { title:'Scrapy Scraper', data: data });

    })
    .catch(function(err){

        console.log(err);

    });
    
});

app.listen(app.get('PORT'), function () {
    console.log('Server started on PORT ' + 
        app.get('PORT') + '; press control + c to stop');
});

