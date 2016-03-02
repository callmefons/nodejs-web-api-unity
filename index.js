var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var users = require('./users');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : true
}));

app.set('port', process.env.PORT || 3000);

app.get('/', function(req,res){
	console.log("root is required");
	res.send("Hello Express");
});


app.get('/users', function(req,res){

	users.findAll(function(data){
		res.json(data);
	});
	//res.json(users.findAll()); 
});

app.get('/users/:id', function(req,res){
	
	var id = req.params.id;
	users.findById(id,function(data){
		res.json(data);
	});
});

//unity
app.post('/users',function(req,res){
	var json = req.body;

	users.findById(json.id,function(data){
		res.json(data);
	});

	console.log('Client Request Id ' + json.id);
	//res.json(users.findByID(json.id)); 
});

app.post('/newuser', function(req,res){
	var json = req.body;
	users.saveUser(json.userid,json.username,json.name,json.position, function(data){
		res.json(data);
	});
	//res.send("Add new " + json.name + " complete");
});

var server = app.listen(app.get('port'),function(){
	console.log('Express Server listening on port ' 
		+ server.address().port);
});


















