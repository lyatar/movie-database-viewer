var express = require('express');
var app = express();
var request = require("request");

var port = process.env.PORT || 8080;

var search="apple";

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function(req, res){
    res.render('pages/index');
});

app.get("/results", function(req, res) {
    var query = req.query.search;
    request("http://www.omdbapi.com/?s=" + query + "&apikey=cbd2abb1", function(error, response, body){
        if(!error && response.statusCode == 200){
                var data = JSON.parse(body);
                console.log(data);
                res.render("pages/results", { data: data });
            }
    });
});



app.get('/jquery/jquery.js', function(req, res) {
    res.sendfile(__dirname + '/node_modules/jquery/dist/jquery.min.js');
});



app.listen(port, function() {
    console.log('Example app listening on http://localhost:' + port);
});
