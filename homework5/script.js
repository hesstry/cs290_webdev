var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 5345);

app.get('/',function(req,res){
  res.render('home');
});

app.route('/request')

  .get(function(req,res){

  let query_params = {'data': []};

  let query = req.query;

  for (let key in query){
    query_params.data.push({'key':key, 'value':query[key]})
  }

  for (let each of query_params.data) console.log(each);

  console.log(query_params);

  res.render('get', query_params);
  })

  .post(function(req,res){
  let query_params = [];

  let query = req.query;

  for (let key in query){
    query_params.push({'key':key, 'value':query[key]})
  };

  let body_params = [];

  let body = req.body;

  for (let key in body) {
    body_params.push({'key':key, 'value':body[key]})
  };

  let data = {'query_data':query_params, 'body_data': body_params};

  console.log(data);

  // Sending local variables as objects means the keys will be the variable names, and the
  // values will be the respective value of each variable

  res.render('post', data);
  })

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), "http://flip1.engr.oregonstate.edu",function(){
  console.log('Express started on http://flip1.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});
