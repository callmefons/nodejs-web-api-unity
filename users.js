var Parse = require('parse/node');
Parse.initialize("Your Application ID", "Your .NET Key");

var UserData = Parse.Object.extend("UserData");

function GetUser(callback){

	var users = new Parse.Query(UserData);

	users.find({
		success: function(results){
			var data = [];
			console.log('----------------------------------');
			for(var i in results){
				var userid = results[i].get("userid");
				var username = results[i].get("username");
				var name = results[i].get("name");
				var position = results[i].get("position");

				console.log('user id ' + userid);
				console.log('username ' + username);
				console.log('name  ' + name);
				console.log('position ' + position);
				console.log('----------------------------------');
			
				data.push(
					{
						userid: userid,
						username: username,
						name: name,
						position: position
					}
				);
			}

			callback (data);
		},
		error: function(error){
			console.log('error' + error);
			callback (error.message);
		}
	});

}


function GetUserById(id, callback){
	
	var userById = new Parse.Query(UserData);
	userById.equalTo("userid",id.toString());

	userById.find({
		success: function(results){
			var data = [];
			console.log('----------------------------------');
			
				var userid = results[0].get("userid");
				var username = results[0].get("username");
				var name = results[0].get("name");
				var position = results[0].get("position");

				console.log('user id ' + userid);
				console.log('username ' + username);
				console.log('name  ' + name);
				console.log('position ' + position);
				console.log('----------------------------------');
			
				data.push(
					{
						userid: userid,
						username: username,
						name: name,
						position: position
					}
				);

			callback (data[0]);
		},
		error: function(error){
			console.log('error' + error);
			callback (error.message);
		}
	});
}


function CreateUser(userid, username, name, position, callback){
	var  newUser = new UserData();

	newUser.set("userid", userid);
	newUser.set("username", username);
	newUser.set("name", name);
	newUser.set("position", position);

	newUser.save({
		success:function(){
			console.log('Create New User From Parse');
			callback("{ result:success }");
		},error:function(error){
			console.log('error' + error);
			callback('"{ error:result user id is empty }"');

		}
	});
}

/*CreateUser("3","hamii","hami","student");
console.log('Loading User From Parse');

var users = [
	{
		"id" : 1,
		"username" : "callmefons",
		"name" : "tittaya",
		"position" : "junior"
	},
	{
		"id" : 2,
		"username" : "nattafahh",
		"name" : "nattaya",
		"position" : "junior"
	},
	{
		"id" : 3,
		"username" : "nufocus",
		"name" : "pichaya",
		"position" : "senior"
	},
	{
		"id" : 4,
		"username" : "rampaichi",
		"name" : "rampai",
		"position" : "manager"
	}
];*/

exports.findAll = function(callback){
	
	GetUser(function(data){
		callback(data);
	});
	//return users;
}

exports.findById = function(id, callback){
	GetUserById(id,function(data){
		callback(data);
	});
}


exports.saveUser = function(id, username,name, position, callback){
	CreateUser(id,username,name,position,function(data){
		callback(data);
	});
}




