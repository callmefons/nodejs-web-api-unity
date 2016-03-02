
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("UserData", function(request, response) {
  
  var userid = request.object.get('userid');

  if(userid != 'xx'){
  	response.success();
  }else{
  	response.error("result user id is empty");
  }

  //response.success("Hello world!");
});
