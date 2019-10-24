const axios = require('axios');
const handlebars = require('express-handlebars');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require ('path');
const cheerio = require('cheerio');
const request = require('request');

app.engine('.hbs', handlebars({
    extname: '.hbs',
    defaultLayout: null
}));

app.set('PORT', PORT);

app.use(express.static(path.join(__dirname, 'assets')));

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', '.hbs');

app.get('/', function (req, res) {
    let url = `https://drudgereport.com`;
    axios({
        method: 'get',
        url
    })
    .then(function (response) {
        const $ = cheerio.load(response.data);
        let jobs = {$};
        $("<div>").each(function (i, element){
            let head = $(this)
            .children('font')
            .children('center')
            .children('table')
            .children('tbody')
            .children('tr')
            .children('td')
            .children('tt')
            .children('b')
            .text('a')
            console.log(this);

            var hyperlink = $(this)
                .children('font')
                .children('center')
                .children('table')
                .children('tbody')
                .children('tr')
                .children('td')
                .children('tt')
                .children('b')
                .text('a')
            console.log(hyperlink, response.data);
        })
        // let jobs = [response.data];
        res.render('index', { title:'Scrapy Scraper', jobs: response.data });
        
        console.log(jobs);
    })
    .catch(function(err){
        console.log(err);
    });
    
});

app.listen(app.get('PORT'), function () {
    console.log('Server started on PORT ' + 
        app.get('PORT') + '; press control + c to stop');
});

