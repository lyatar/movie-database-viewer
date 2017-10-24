var express = require('express');
var app = express();
var request = require("request");

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function(req, res){
    res.render('pages/search');
});

app.get("/results", function(req, res) {
    var query = req.query.search;
    request("http://www.omdbapi.com/?s=" + query + "&apikey=thewdb", function(error, response, body){
        if(!error && response.statusCode == 200){
                var data = JSON.parse(body);
                console.log(data);
                res.render("pages/landing", { data: data });
            }
    });
});



// App listening on http://127.0.0.1:8000/
app.listen(8000, function() {
    console.log('Example app listening on port 8000!');
});