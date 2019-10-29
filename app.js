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
        $('table, tbody, tr, td, tt, b, a').each(function (i, element) {
            let head = $(this)
            .children('a')
            .text()
            .trim()

            console.log(head);

            let hyperlink = $(this)
                .children('A')
                .attr('href')
                
                // console.log(hyperlink);
            
            
        })
        
        res.render('index', { title:'Scrapy Scraper', data: data });
        
        // let jobs = [$];
        // console.log(jobs);
    })
    .catch(function(err){
        console.log(err);
    });
    
});

app.listen(app.get('PORT'), function () {
    console.log('Server started on PORT ' + 
        app.get('PORT') + '; press control + c to stop');
});

