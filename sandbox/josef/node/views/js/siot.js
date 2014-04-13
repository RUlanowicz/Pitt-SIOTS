
$(document).ready(function() {
  var owner = "jieunatbosch"; 
  $("#login_button").click(function(event){
    //alert('hello');
    var user = {
      username: $("#username").val(),
      password:$("#password").val(),
    }
       // alert ("username: " + username + "password: " + password); 
        //console.log (user); 

    $.ajax({
      dataType: "json",
      type: "POST", 
      url: "//localhost:3001/login", 
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(user), 
      success: function (msg) {
        console.log(JSON.stringify(msg));
        var obj = JSON.parse(JSON.stringify(msg));
        //redirect the page 
        var profile_url = "//localhost:3001/profile/" + user.username; 
        owner = user.username; 
        console.log (profile_url);
        if (obj.success) { 
            // this will load profile page with a proper username
            $.ajax({
                type:"GET",
                url: profile_url,
                error: function(data){
                  console.log("There was a problem");
                },
                success: function(data){
                  //alert("userprofile");
                  $('.container').html(data);
                } //success
              }) //ajax
         } //obj.success

          //window.location.replace("http://localhost:3001/views/profile.html");} 
        else if (!obj.success) {window.location.replace("http://localhost:3001/views/login.html");}
      } //success

    }); //ajax
    //console.log("I sent the request");
  }); //login

  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      console.log("fired");
      var target_url;
  		var target = $(e.target).attr("href") // activated tab
  		console.log(target);
      //document.write('<'); 
      //document.write('script>'); 
  		//var owner = '<%- JSON.stringify(username) %>'; 
  		//document.write('</script>');
      //var owner ="jieunatbosch";
  		switch(target){
  			case "#friends":
  				target_url = "//localhost:3001/friends/" + owner;
  				console.log(target_url);
  			break;
  			case "#devices":
  				target_url = "//localhost:3001/devices/" + owner;
  				console.log(target_url);
  			break;
  			case "#thriends":
  				target_url = "//localhost:3001/thriends/" + owner;
  				console.log(target_url);
  			break;
  		}
  		
  		$.ajax({
  			type:"GET",
  			url: target_url,
  			error: function(data){
  				console.log("There was a problem");
  			},
  			success: function(data){
          //var modify = document.getElementById(target); 
          //modify.innerHTML = data;

  				$(target).html(data);
  				/*
 				$(target).find("script").each(function(i) {
                    eval($(this).text());
  				})
*/
  			} //success
  		}) //ajax 

		}); //toggle tab

  $("#regis_button").click(function(event){
    console.log ("I am in regis_button action");
    //var owner = <%- JSON.stringify(username) %>; 
    //var owner = "jieunatbosch";
     console.log ("owner :" +owner);
     
     var device = {
      device_type:$("#device_type").val(),
       brand:$("#brand").val(),
       model:$("#model").val(),
       communication:$("#communication").val(), 
       belong_to: owner,
       indoor_location:$("#indoor_location").val(),
       device_name:$("#device_name").val()
     }
   $.ajax({
     dataType: "json",
     type: "POST", 
     url: "//localhost:3001/device_reg", 
     contentType: 'application/json; charset=utf-8',
     data: JSON.stringify(device), 
     success: function (msg) {
      console.log(JSON.stringify(msg));
      var obj = JSON.parse(JSON.stringify(msg));
      //redirect the page 
      var profile_url = "//localhost:3001/profile/" + obj.username ; 
       console.log (profile_url);
       if (obj.success) { 
        // this will load profile page with a proper username
        $.ajax({
         type:"GET",
         url: profile_url,
         error: function(data){
          console.log("There was a problem");
         },
          success: function(data){
            alert("device_reg"); 
            $('.container').html(data);
          }
        })
       } //obj.success

        //window.location.replace("http://localhost:3001/views/profile.html");} 
       else if (!obj.success) {
        window.location.replace("http://localhost:3001/views/login.html");
       }
      },
    error: function(e) {
      var obj=JSON.parse(JSON.stringify(e));
        if (obj.status == 200) { 
            alert ("I am 200 " + obj.status); 
         }
        else { 
          alert ("I have an error" + JSON.stringify(e));
          console.log(e);
        }
    } //error
  }); //ajax
  }); //register 

    $("#add_new_device_button").click(function(event){
        //var owner = "jieunatbosch";
        $.ajax({
            type: "GET", 
            url: "//localhost:3001/device_reg/" + owner, 
            error: function(data){
                console.log("There was a problem");
            },
            success: function(data){
                //console.log(data);
             $('#devices').html(data);
            } //success
        }) //ajax
    }); //radd_new_device_button
 
}) //document ready 
//document.writeln('</script>'); 