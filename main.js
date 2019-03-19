//main.js
$(function(){
	

	var app_id = '2141714505905636'; //Aquí se sustituye por el id de desarrollo que porporciona Facebook
	var scopes = 'email, user_friends, user_hometown, user_birthday, user_location';
	
	var btn_login = '<a href="#" id="login" class="btn btn-primary">Inicia Sesion</a>';
	
	var div_session = "<div id='facebook-session'>"+
						"<strong></strong"+
						"<img>"+
						"<a href='#' id='logout' class='btn btn-danger' >Cerrar Sesion</a>"+
						"<div>";
	

						
	window.fbAsyncInit = function() {
	    FB.init({
	    	  appId      : app_id,
		      cookie     : true, 
		      status     : true,
		      xfbml      : true,
		      version    : 'v2.1'
	    });


	    FB.getLoginStatus(function(response) {
	      statusChangeCallback(response, function(){});
	    });
	  };
	  
	  var statusChangeCallback = function(response, callback) {
							  if (response.status === 'connected') {
							    	
							      getFacebookData();
								  //console.log("Response = "+response+", nombre="+response.name);
							    	//testAPI();
							    } else {
							    	callback(false);
							      //document.getElementById('status').innerHTML = 'Please log into this app.';
							    }
							  }
						  
						  var checkLoginState = function(callback) {
							  
							    FB.getLoginStatus(function(response) {
							      statusChangeCallback(response,function(data){
							    	  callback(data);
							      });
							    });
							  }
						        

						  var getFacebookData = function(){
							  FB.api('/me',function(response){
								  $('#login').after(div_session);
								  $('#login').remove();
								  $('#facebook-session strong').text('Bienvenido:'+response.name);
								  $('#facebook-session img').attr('src','http;//graph.facebook.com/'+response.id+'/picture?type=large');
								  document.getElementById("t1").innerHTML = response.name; 
								  document.getElementById("t2").innerHTML = response.user_birthday;
								  document.getElementById("t3").innerHTML = response.user_hometown;
								  document.getElementById("t4").innerHTML = response.user_location;
								  //Aqui puden agregarce mas parametros, los parametros estan determinados por
								  //los permisos que da y se determnana en facebook como desarrollador
							  });
						  }
						  
						  var facebookLogin = function(){
							  checkLoginState(function(response){
								  if(!response){
									  FB.login(function(response){
										  if(response.status === 'connected'){
											  getFacebookData();
										  }
									  }, {scope: scopes});
								  }
							  });
						  }
						  
						 
						  
						  $(document).on('click', '#login', function(e){
							  	e.preventDefault();
							  	facebookLogin();
						  })
						  
						  $(document).on('click', '#logout', function(e){
							  	e.preventDefault();
							  	FB.logout(function(response) {
						              // user is now logged out
						            });

						  })
});
