const axios = require('axios');
const handlebars = require('express-handlebars');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require ('path');
const cherrio = require('cherrio');

app.engine('.hbs', handlebars({
    extname: '.hbs',
    defaultLayout: null
}));

app.set('PORT', PORT);

app.use(express.static(path.join(__dirname, 'assets')));

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', '.hbs');

app.get('/', function (req, res) {
    let url = `https://indreed.herokuapp.com/api/jobs?q=web+developer&limit=50`;
    axios({
        method: 'get',
        url
    })
    .then(function (response) {

        let jobs = response.data;
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

